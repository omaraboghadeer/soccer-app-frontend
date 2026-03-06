import { ApplicationRef, createComponent, DOCUMENT, EnvironmentInjector, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ToastComponent } from './toast.component';
import { isPlatformBrowser } from '@angular/common';

export type ToastTypes = "success" | "error" | "info";

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private readonly _appRef = inject(ApplicationRef);
    private readonly _injector = inject(EnvironmentInjector);
    private readonly _platformId = inject(PLATFORM_ID);
    private readonly _document = inject(DOCUMENT);


    show( toastInfo: { message: string, type: ToastTypes, duration?: number } ) {
        if (!isPlatformBrowser(this._platformId)) {
            return; // Prevent SSR crash
        }
        
        const componentRef = createComponent(ToastComponent, {environmentInjector: this._injector});

        // ON DESTROY
        let timeoutId: any;
        const destroyToast = () => {
            this._appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        };

        // Passing data to toast component
        componentRef.setInput("message", toastInfo.message);
        componentRef.setInput("type", toastInfo.type);
        componentRef.setInput('onClose', () => {
            clearTimeout(timeoutId);
            destroyToast();
        });

        this._appRef.attachView(componentRef.hostView);
        
        const domEle = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
        this._document.body.appendChild(domEle);
        
        // Auto Remove
        timeoutId = setTimeout(() => destroyToast(), toastInfo.duration ? toastInfo.duration : 4000);
    }

}
