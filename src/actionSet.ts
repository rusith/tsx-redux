import {action} from "./action";

export function actionSet(prefix: string): { action: typeof action } {
    const meta = {
        __prefix: prefix,
    };
    return {
        action : action.bind(meta),
    }
}