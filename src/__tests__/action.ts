import {createAction} from "../action";

describe("createAction", () => {
    test("fails if type is null", () => {
        expect(() => createAction(null)).toThrowError();
    });
});