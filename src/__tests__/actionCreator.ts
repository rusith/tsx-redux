import {actionCreator} from "../actionCreator";

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