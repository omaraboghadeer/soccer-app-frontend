import { ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';

export type ToastTypes = "success" | "error" | "info";

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private readonly _appRef = inject(ApplicationRef);
    private readonly _injector = inject(EnvironmentInjector);


    show( toastInfo: { message: string, type: ToastTypes, duration?: number } ) {
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
        document.body.appendChild(domEle);
        
        // Auto Remove
        timeoutId = setTimeout(() => destroyToast(), toastInfo.duration ? toastInfo.duration : 4000);
    }

}
