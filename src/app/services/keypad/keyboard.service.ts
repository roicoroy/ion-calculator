import { Injectable, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Keyboard, KeyboardInfo } from '@capacitor/keyboard';
import { IKeyboardService } from './IKeyboard';
import { blurActiveElement } from '../utils';
import { UpdateKeyboardStatus } from '../../store/keyboard/keyboard.actions';

@Injectable({
    providedIn: 'root'
})
export class KeyboardService implements IKeyboardService {
    @Output() keyboardWillShow = new EventEmitter<KeyboardInfo>();

    @Output() keyboardDidShow = new EventEmitter<KeyboardInfo>();

    @Output() keyboardWillHide = new EventEmitter<void>();

    @Output() keyboardDidHide = new EventEmitter<void>();

    private store = inject(Store);

    async initKeyboardListeners() {
        await Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
            this.keyboardWillShow.emit(info);
            this.store.dispatch(new UpdateKeyboardStatus(true));
        });

        await  Keyboard.addListener('keyboardWillHide', () => {
            this.keyboardWillHide.emit();
            this.store.dispatch(new UpdateKeyboardStatus(false));
        });

        await  Keyboard.addListener('keyboardDidShow', (info: KeyboardInfo) => {
            this.keyboardDidShow.emit(info);
        });

        await  Keyboard.addListener('keyboardDidHide', () => {
            blurActiveElement();
            this.keyboardDidHide.emit();
        });
    }

    async setAccessoryBarVisible(isBarVisible: boolean): Promise<void> {
        try {
            return await Keyboard.setAccessoryBarVisible({ isVisible: isBarVisible });
        } catch (error) {
            throw error;
        }
    }

    async hideKeyboard(): Promise<void> {
        try {
            return await Keyboard.hide();
        } catch (error) {
            throw error;
        }
    }

    async showKeyboard(): Promise<void> {
        try {
            return await Keyboard.show();
        } catch (error) {
            throw error;
        }
    }

    async setScroll(options: { isDisabled: boolean }): Promise<void> {
        try {
            return await Keyboard.setScroll(options);
        } catch (error) {
            throw error;
        }
    }
}
