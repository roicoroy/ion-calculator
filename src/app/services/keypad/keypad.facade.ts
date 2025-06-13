import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { KeyboardState } from '../../store/keyboard/keyboard.state';

@Injectable({
    providedIn: 'root'
})
export class KeypadFacade {
    keyboardIsOpen$: Observable<boolean> = inject(Store).select(KeyboardState.isOpen);
}
