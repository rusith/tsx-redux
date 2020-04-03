import {action, getType, isType} from "../action";
import {actionSet} from "../actionSet";

describe("actionCreator", () => {
    test("has a type extended string", () => {
        action("T");
    });

    test("returns a function", () => {
        const af = action("T");
        expect(typeof af === "function");
    });

    test("payload action creator will return payload and type", () => {
        const ac = action("AC")<string>();
        const act = ac("data");

        expect(act.type).toBe("AC");
        expect(act.payload).toBe("data");
    });

    test("action creator should be customizable through a function", () => {
        const ac = action("AC", (type) => {
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
        const creator = action("ACTION_1")<string>();
        const act = creator("data");
        expect(isType(act, creator)).toBeTruthy();
    });

    test("should be true for custom implementations", () => {
        const creator = action("ACTION_1", (type) => {
            return (data) => ({
                type,
                payload: data,
            })
        });
        const act = creator("data");
        expect(isType(act, creator)).toBeTruthy();
    });


    test("should predict the payload type", () => {
        const creator = action("ACTION_1", (type) => {
            return (data) => ({
                type,
                payload: data,
                data
            })
        });
        const act = creator("data");
        if (isType(act, creator)) {
            expect(act.data).not.toBeNull();
        }
    });
});

describe("getType", () => {
    test("should return the type of the action for empty action", () => {
        const creator = action("ACTION_1")();
        const type = getType(creator);
        
        expect(type).toBe("ACTION_1");
    });
    
    test("Should return the type of the action for payload action", () => {
        const creator = action("ACTION_113")<number>();
        const type = getType(creator);

        expect(type).toBe("ACTION_113");
    });


    test("Should return the type of the action for action set action", () => {
        const set = actionSet("test");
        const creator = set.action("ACTION_113")<number>();
        const type = getType(creator);

        expect(type).toBe("test/ACTION_113");
    })
});



