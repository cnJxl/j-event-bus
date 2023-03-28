/**
 * EventBus
 */
export declare function useEventBus(): {
    subscribe: (key: string, callback: Function, once?: boolean) => void;
    subscribeList: (events: [key: string, callback: Function, once?: boolean | undefined][] | {
        key: string;
        callback: Function;
        once?: boolean | undefined;
    }[]) => void;
    unsubscribe: (...keys: string[]) => void;
    clear: () => void;
    dispatch: (key: string, ...args: any[]) => void;
    dispatchList: (events: [string, any][] | {
        key: string;
        args: any;
    }[]) => void;
};
//# sourceMappingURL=index.d.ts.map