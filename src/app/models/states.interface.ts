import { WaiterResultStateModel } from "../store/result/result.state";
import { WaiterStateModel } from "../store/waiters/waiter.state";
import { Point } from "./point.type";

export interface IStates {
    language: string,
    point: Point,
    results: WaiterResultStateModel,
    waiter: WaiterStateModel,
    tutorial: {
        isTutorialComplete: boolean,
    }
    theme: {
        isDarkMode: boolean,
    }
}