import { Entry } from "../../models";


export namespace ResultActions {
    export class SetResult {
        static readonly type = '[Result] Set Result';
        constructor(public payload: Entry,) { }
    }
    export class RemoveResult {
        static readonly type = '[Result] Remove Result';
        constructor(public payload: Entry) { }
    }
    export class SetSelectedResult {
        static readonly type = '[Result] Set Selected Result';
        constructor(public payload: Entry,) { }
    }
    export class RemoveSelectedResult {
        static readonly type = '[Result] Remove Selected Result';
    }
}