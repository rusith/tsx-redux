type Action<PayloadType> = ((payload: PayloadType) => { type: string, payload: PayloadType }) & { type: string};

export const createAction = <PayloadType>(type: string) : Action<PayloadType> => {
    if (!type) {
        throw new Error("type is required to create an action");
    }
    
    const action = (payload: PayloadType) => ({
        type,
        payload
    });
    action.type = type;
    
    return action;
};