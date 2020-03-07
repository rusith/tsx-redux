import {createAction} from "../action";

describe("createAction", () => {
    test("fails if type is null", () => {
        expect(() => createAction(null)).toThrowError();
    });

    test("an action must be callable", () => {
        const action = createAction("SomeAction");
        expect(() => { (action as any)(); })
            .not.toThrow();
    });


    test("result of an action must have the given type", () => {
        const action = createAction<number>("SomeAction");
        expect(action(0).type).toBe("SomeAction");
    });


    test("an action should redirect the payload", () => {
        const action = createAction<number>("SomeAction");
        const result = action(1500);
        
        expect(result).toEqual({ payload: 1500, type: "SomeAction"});
    });
    
    test("action should have the given type", () => {
        const action = createAction<number>("SomeAction");
        expect(action.type).toBe("SomeAction");
    });
});
