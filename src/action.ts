export interface Metadata {
    [k: string]: any;
}

export interface BaseAction {
    readonly type: any;
}

export interface Action<T extends string> extends BaseAction {
    readonly payload?: any;
    readonly type: T;
    readonly meta?: Metadata;
    readonly error?: boolean;
}

export type GenericActionCreator<T extends string> = (...args: any[]) => Action<T>;

export interface IActionCreator<T extends string> extends GenericActionCreator<T> {
    type: T;

    match(action: BaseAction): action is Action<T>;
}

function isActionCreator<T extends string>(builder: GenericActionCreator<T>): builder is IActionCreator<T> {
    return (
        typeof builder === 'function' && 'match' in builder && 'type' in builder
    );
}

export function action<T extends string>(type: T): <P = void>() => (payload: P) => { type: T; payload: P; };
export function action<T extends string,
    InnerCreator extends GenericActionCreator<T>>(type: T, customCreatorCallback: (type: T) => InnerCreator): InnerCreator;

export function action<T extends string, InnerCreator extends GenericActionCreator<T>, >
    (originalType: T, customCreatorCallback?: (type: T) => InnerCreator) {
    const prefix = this.__prefix ? `${this.__prefix}/` : '';
    const type = `${prefix}${originalType}`;

    const typeAndMatcherFn = {
        type,
        match(act: BaseAction): act is ReturnType<InnerCreator> {
            return act.type === this.type;
        }
    };
    if (customCreatorCallback) {
        return Object.assign(customCreatorCallback(type as T), typeAndMatcherFn);
    }
    return <P = void>() => Object.assign(
        (payload: P) => ({type, payload}),
        typeAndMatcherFn
    );
}

export function isType<
    T extends string,
    Builder extends GenericActionCreator<T>
    >(act: BaseAction, creator: Builder): act is ReturnType<Builder> {
    return isActionCreator(creator) && creator.match(act);
}


