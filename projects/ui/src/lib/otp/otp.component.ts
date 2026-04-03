import { Component, computed, DestroyRef, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { NgxOtpInputComponent, OtpStatus } from 'ngx-otp-input';
import { Subscription, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'lib-otp',
    imports: [NgxOtpInputComponent],
    standalone: true,
    template: `
       <div class="d-flex flex-column align-items-start">
            <!-- <button type="button" class="btn px-0 text-secondary mb-4" (click)="onClickBack.emit(true)">
                <i class="icon-arrow-left me-1"></i>
                Back
            </button>   -->
            <div>
                <h3>
                    {{title()}}
                </h3>
    
                <p class="text-muted mb-4">
                    {{subtitle()}}
                </p>
            </div>

            <ngx-otp-input
                [length]="4"
                (otpChange)="onOtpChange($event)"
                (otpInvalid)="onOtpInvalid($event)">
            </ngx-otp-input>

            <button type="button" class="btn px-0 text-secondary border-0"
                [disabled]="timeLeft() > 0" (click)="start()"
            >
                <i class="icon-rotate me-1"></i>
                Resend code in {{ minutes() }}:{{ seconds() }}
            </button>

            <!-- <div class="align-self-end mt-4">
                <button type="button" class="btn btn-primary" (click)="onValidate.emit('1234')">
                    Confirm
                </button>
            </div> -->
            
       </div>
    `,
})
export class OtpComponent implements OnInit {
    duration = input.required<number>();
    title = input.required<string>();
    subtitle = input<string>();
    onResend = output<any>();
    onValidate = output<any>();
    onClickBack = output<boolean>();

    private _destroyRef = inject(DestroyRef);
    private sub?: Subscription;
    timeLeft = signal(0);
    minutes = computed(() =>
        Math.floor(this.timeLeft() / 60).toString().padStart(2, '0')
    );

    seconds = computed(() =>
        (this.timeLeft() % 60).toString().padStart(2, '0')
    );

    start() {
        this.timeLeft.set(this.duration());

        this.sub = timer(0, 1000)
        .pipe(
            takeUntilDestroyed(this._destroyRef)
        )
        .subscribe(() => {
        const current = this.timeLeft();

        if (current <= 0) {
            this.sub?.unsubscribe();
            return;
        }

        this.timeLeft.set(current - 1);
        });
    }


    status: OtpStatus = 'error';
    onOtpComplete(code: string): void {
        // verify code and update this.status
    }
    onOtpChange(code: any): void {
        if (!code.isComplete) {
            this.onValidate.emit('invalid');
            return
        }

        this.onValidate.emit(code);
    }
    onOtpInvalid(code: any): void {
        // verify code and update this.status
        console.log("🚀 ~ OtpComponent ~ onOtpChange ~ code:", code)
    }

    
    ngOnInit(): void {
        this.start();
    }
}
