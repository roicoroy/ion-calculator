import { Waiter } from "../../models";

export namespace WaiterActions {
    export class PopulateWaitersList {
        static readonly type = '[Waiter] Populate Waiters List';
    }

    export class GetWaitersList {
        static readonly type = '[Waiter] Get Waiters List';
    }

    export class Get {
        static readonly type = '[Waiter] Get';
    }

    export class AddWaiter {
        static readonly type = '[Waiter] Add Waiter to waitersList';
        constructor(public payload: Waiter) { }
    }

    export class Update {
        static readonly type = '[Waiter] Update';
        constructor(public payload: Waiter, public id?: number) {
        }
    }

    export class Delete {
        static readonly type = '[Waiter] Delete waiter from waitesList';
        constructor(public waiter: Waiter, public index: any) {
        }
    }

    export class SetSelected {
        static readonly type = '[Waiter] Set';
        constructor(public payload: Waiter) {
        }
    }

}
