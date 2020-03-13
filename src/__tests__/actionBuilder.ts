import {actionBuilder, payloadAction} from "../actionBuilder";

describe("actionBuilder", () => {
    test("should return an object", () => {
        const builder = actionBuilder();
        expect(builder).not.toBeNull();
    });
});

describe("payloadAction", () => {
    test("created action should have the given prefix", () => {
        const builder = actionBuilder("@@app/");
        const action = builder.payloadAction<number>("ACTION");

        expect(action.type).toBe("@@app/ACTION")
    });

    test("action should have given prefix if its executed in another context", () => {
        const builder = actionBuilder("@@app/");

        const obj = {
            __prefix: "a"
        };
        const pa = builder.payloadAction;
        expect(pa.call(obj,"ACTION").type).toBe("@@app/ACTION");
    });

    test("must be able to call directly without prefix", () => {
        const action = payloadAction("NAME");

        expect(action.type).toBe("NAME")

    });
});

