import {actionSet} from "../actionSet";

describe("actionSet.action", () => {
    test("will have the correct type with prefix", () => {
        const set = actionSet("prefix");
        const action = set.action("ACTION")<string>();

        const result = action("data");
        expect(result.type).toBe("prefix/ACTION");
    });
});

describe("actionSet.empty", () => {
    test("will create an empty action", () => {
        const set = actionSet("prefix");
        const action = set.empty("ACTION");

        const result = action();
        expect(result.type).toBe("prefix/ACTION");
    });
});
