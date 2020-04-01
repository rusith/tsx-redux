import { action as RootAction, isType as RootIsType } from "../index";
import { action, isType } from "../action"


describe("Index", () => {
    test("Should export action", () => {
        expect(RootAction).toBe(action);
    });

    test("Should export isType", () => {
        expect(RootIsType).toBe(isType);
    });
});