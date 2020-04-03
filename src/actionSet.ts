import {action, GenericActionCreator, PayloadAction} from "./action";

export interface IActionSet {
    action: typeof action,
    empty: <T extends string>(type: T) => GenericActionCreator<T>
}

export function actionSet(prefix: string): IActionSet {
    const meta = {
        __prefix: prefix,
    };
    
    return {
        action : action.bind(meta),
        empty: <T extends string>(type) => action.bind(meta)(type)(),
    }
}