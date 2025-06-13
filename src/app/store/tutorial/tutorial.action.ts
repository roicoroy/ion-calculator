

export namespace TutorialActions {
    export class SetTutorialComplete {
        static readonly type = '[Tutorial] Set Tutorial Complete';
        constructor(public payload: boolean) { }
    }
}
