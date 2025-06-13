import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PointActions } from './point.action';
import { Point } from '../../models';

export class PointsStateModel {
    points: any;
    selectedPoint?: any;
}

@State<PointsStateModel>({
    name: 'point'
})
@Injectable()
export class PointsState {


    @Selector()
    static getPointsList(state: PointsStateModel): any {
        return state.points;
    }

    @Selector()
    static getSelectedPoint(state: PointsStateModel) {
        return state.selectedPoint;
    }

    @Action(PointActions.PopulatePoints)
    PopulatePoints(ctx: StateContext<PointsStateModel>) {
        return ctx.patchState({
            points: [
                new Point({
                    id: '125',
                    label: 'Run_drinks',
                    type: 'radio',
                    value: 0.5,
                }),
                new Point({
                    id: '123',
                    label: 'Serve_Wine',
                    type: 'radio',
                    value: 1,
                }),
                new Point({
                    id: '124',
                    label: 'Serve_Food',
                    type: 'radio',
                    value: 1,
                }),
                new Point({
                    id: '126',
                    label: 'Take_orders',
                    type: 'radio',
                    value: 1.5,
                }),
            ],
        });
    }

    @Action(PointActions.AddPoint)
    addPoint(ctx: StateContext<PointsStateModel>, { payload }: PointActions.AddPoint) {
        const state = ctx.getState();
        return ctx.patchState({
            points: [
                ...state.points,
                payload
            ]
        });
    }

    @Action(PointActions.UpdatePoint)
    updatePoint(ctx: StateContext<PointsStateModel>, { payload, id }: PointActions.UpdatePoint) {
        const state = ctx.getState();
        const points = [...state.points];
        const index = points.findIndex((item) => item.id === id);
        points[index] = payload;
        return ctx.setState({
            ...state,
            points,
        });
    }

    @Action(PointActions.DeletePoint)
    deletePoint(ctx: StateContext<PointsStateModel>, { point }: PointActions.DeletePoint) {
        const state = ctx.getState();
        return state.points.forEach((value: any, index: any) => {
            if (value == point) {
                state.points.splice(index, 1);
            }
        });
    }

    @Action(PointActions.SetSelectedPoint)
    setSelectedPointId(ctx: StateContext<any>, { payload }: PointActions.SetSelectedPoint) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            selectedPoint: payload
        });
    }
    
}
