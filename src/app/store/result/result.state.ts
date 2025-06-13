import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ResultActions } from './result.action';
import { Entry, IWaiter } from '../../models';

export interface IResult {
    date: string;
    id: string;
    tipsMade: number;
    waiters: IWaiter[]
}

export class WaiterResultStateModel {
    results!: Entry[];
    selectedResult!: Entry | any;
}
@State<WaiterResultStateModel>({
    name: 'result',
})
@Injectable()
export class ResultState {

    @Selector()
    static getResultList(state: WaiterResultStateModel): Entry[] {
        return state.results;
    }

    @Selector()
    static getSelectedResult(state: WaiterResultStateModel): Entry {
        return state.selectedResult;
    }

    @Action(ResultActions.SetResult)
    setResult(ctx: StateContext<WaiterResultStateModel>, { payload }: ResultActions.SetResult) {
        const addResults: Entry[] = [];
        const savedResults = ctx.getState().results;
        if (savedResults != null) {
            savedResults.push(payload);
            ctx.patchState({
                results: savedResults,
            });
        } else {
            addResults.push(payload);
            ctx.patchState({
                results: addResults,
            });
        }
    }

    @Action(ResultActions.RemoveResult)
    removeResult(ctx: StateContext<WaiterResultStateModel>, { payload }: ResultActions.RemoveResult) {
        const state = ctx.getState();
        if (state) {
            return state.results.forEach((value: any, index: any) => {
                if (value.id == payload.id) {
                    state?.results?.splice(index, 1);
                }
            });
        }
    }

    @Action(ResultActions.SetSelectedResult)
    setSelectedResult(ctx: StateContext<WaiterResultStateModel>, { payload }: ResultActions.SetSelectedResult) {
        ctx.patchState({
            selectedResult: payload,
        });
    }

    @Action(ResultActions.RemoveSelectedResult)
    removeSelectedResult(ctx: StateContext<WaiterResultStateModel>) {
        ctx.patchState({
            selectedResult: null,
        });
    }

}

