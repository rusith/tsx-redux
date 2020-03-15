import {actionSet} from "../actionSet";

describe("actionSet.actionCreator", () => {
    test("will have the correct type with prefix", () => {
        const set = actionSet("prefix");
        const action = set.action("ACTION")<string>();

        const result = action("data");
        expect(result.type).toBe("prefix/ACTION");
    });
});