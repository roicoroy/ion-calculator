import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Waiter, Entry, Point } from '../models';
import { LanguageState } from './language/language.state';
import { PointsState } from './points/point.state';
import { ResultState } from './result/result.state';
import { ThemeState } from './theme/theme.state';
import { TutorialState } from './tutorial/tutorial.state';
import { WaitersState } from './waiters/waiter.state';


export interface IAppFacadeState {
    language: string;
    waitersList: Waiter[];
    isDarkMode: boolean;
    isTutorialComplete: boolean;
    resultList: Entry[];
    selectedResult: Entry;
    pointsList: any;
    selectedPoint: Point;
}

@Injectable({
    providedIn: 'root'
})
export class AppFacade {

    language$: Observable<string> = inject(Store).select(LanguageState.getLanguage);

    waitersList$: Observable<Waiter[]> = inject(Store).select(WaitersState.getWaiterList);

    isDarkMode$: Observable<boolean> = inject(Store).select(ThemeState.getisDarkMode);

    isTutorialComplete$: Observable<boolean> = inject(Store).select(TutorialState.getIsTutorialComplete);

    resultList$: Observable<Entry[]> = inject(Store).select(ResultState.getResultList);

    selectedResult$: Observable<Entry> = inject(Store).select(ResultState.getSelectedResult);

    pointsList$: Observable<any[]> = inject(Store).select(PointsState.getPointsList);

    selectedPoint$: Observable<Point> = inject(Store).select(PointsState.getSelectedPoint);

    readonly viewState$: Observable<IAppFacadeState>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.language$,
                this.waitersList$,
                this.isDarkMode$,
                this.isTutorialComplete$,
                this.resultList$,
                this.selectedResult$,
                this.pointsList$,
                this.selectedPoint$,
            ]
        ).pipe(
            map((
                [
                    language,
                    waitersList,
                    isDarkMode,
                    isTutorialComplete,
                    resultList,
                    selectedResult,
                    pointsList,
                    selectedPoint,

                ]
            ) => ({
                language,
                waitersList,
                isDarkMode,
                isTutorialComplete,
                resultList,
                selectedResult,
                pointsList,
                selectedPoint,
            }))
        );
    }
}
