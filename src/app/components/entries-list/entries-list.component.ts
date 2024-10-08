import { Component, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ModalController } from '@ionic/angular/standalone';
import { DetailsModal } from './details/details.modal';
import { Entry } from '../../models';
import { ResultActions } from '../../store/result/result.action';
import { IAppFacadeState, AppFacade } from '../../store/app.facade';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss'],
})
export class EntriesListComponent implements OnDestroy {

  viewState$!: Observable<IAppFacadeState>;

  private facade = inject(AppFacade);

  currency: string | undefined;

  entriesListState: any;

  showAddMessage: any = null;

  private store = inject(Store);

  private modalController = inject(ModalController);

  private readonly ngUnsubscribe = new Subject();

  constructor() {
    this.viewState$ = this.facade.viewState$;

    this.viewState$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((vs) => {
        this.currency = vs.language === 'en' ? 'GBP' : 'BRL';
      });
  }

  async details(entry: Entry) {
    const modal = await this.modalController.create({
      component: DetailsModal,
      componentProps: {
        entry,
      }
    });
    await modal.present();
  }

  remove(entry: Entry) {
    this.store.dispatch(new ResultActions.RemoveResult(entry));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}