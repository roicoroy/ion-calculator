import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Waiter } from '../../models';
import { IAppFacadeState, AppFacade } from '../../store/app.facade';

@Component({
  selector: 'app-waiters-list',
  templateUrl: './waiters-list.component.html',
  styleUrls: ['./waiters-list.component.scss'],
})
export class WaitersListComponent {

  viewState$: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  avatarUrl = '../assets/shapes.svg';

  waitersArray: Waiter[] = [];

  readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.viewState$ = this.facade.viewState$;
  }

}

