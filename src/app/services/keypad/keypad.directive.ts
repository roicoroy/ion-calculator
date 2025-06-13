import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeypadFacade } from './keypad.facade';

@Directive({
    selector: '[eqmHideWhenKeypadVisible]',
})
export class KeyPadDirective implements OnDestroy {

    private subscription: Subscription;

    constructor(
        private readonly targetElement: ElementRef,
        private readonly keypadFacade: KeypadFacade,
    ) {

        const originalStyle = this.targetElement.nativeElement.style.display;

        this.subscription = this.keypadFacade.keyboardIsOpen$
            .subscribe((keyboardStatus: boolean) => {
                setTimeout(() => {
                    this.targetElement.nativeElement.style.display = keyboardStatus ? 'none' : originalStyle;
                }, 25);
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
