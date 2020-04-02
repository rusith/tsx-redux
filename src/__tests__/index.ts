import { action as RootAction, isType as RootIsType, BaseAction as RootBaseAction, actionSet as RootActionSet } from "../index";
import { action, isType, BaseAction } from "../action"
import {actionSet} from "../actionSet"


describe("Index", () => {
    test("Should export action", () => {
        expect(RootAction).toBe(action);
    });

    test("Should export isType", () => {
        expect(RootIsType).toBe(isType);
    });

    test("Should export BaseAction", () => {
        const r: RootBaseAction = { type : ""};
        expect(r == r as BaseAction).toBeTruthy();
    });
    
    test("Should export actionSet", () => {
        expect(RootActionSet).toBe(actionSet);
    });
});