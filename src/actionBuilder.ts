import {createAction} from "./action";

export function payloadAction<PayloadType>(type: string) {
    return createAction<PayloadType>((this.__prefix ?? "") + type)
}

type ActionBuilder = {
    payloadAction<PayloadAction>(type: string);
}

export const actionBuilder = (prefix?: string): ActionBuilder => {
    const builder = {__prefix: prefix};
    return {
        payloadAction: payloadAction.bind(builder),
    };
};

