import {actionCreator, isType} from "../actionCreator";

describe("actionCreator", () => {
    test("has a type extended string", () => {
        actionCreator("T");
    });

    test("returns a function", () => {
        const af = actionCreator("T");
        expect(typeof af === "function");
    });

    test("payload action creator will return payload and type", () => {
        const ac = actionCreator("AC")<string>();
        const action = ac("data");

        expect(action.type).toBe("AC");
        expect(action.payload).toBe("data");
    });

    test("action creator should be customizable through a function", () => {
        const ac = actionCreator("AC", (type) => {
            return (data) => ({
                type,
                data,
            });
        });

        const act = ac("data-01");
        expect(act.data).toBe("data-01");
        expect(act.type).toBe("AC");
    });
});

describe("isType", () => {
    test("should be true for correct type", () => {
        const creator = actionCreator("ACTION_1")<string>();
        const action = creator("data");
        expect(isType(action, creator)).toBeTruthy();
    });

    test("should be true for custom implementations", () => {
        const creator = actionCreator("ACTION_1", (type) => {
            return (data) => ({
                type,
                payload: data,
            })
        });
        const action = creator("data");
        expect(isType(action, creator)).toBeTruthy();
    });
});
