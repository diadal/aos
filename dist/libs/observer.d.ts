interface MutationObs extends MutationObserverInit {
    removedNodes: boolean;
}
declare global {
    interface Window {
        MutationObserverInit: MutationObs;
        WebKitMutationObserver: MutationObserver;
        MozMutationObserver: MutationObserver;
    }
}
declare function isSupported(): boolean;
declare function ready(_selector: unknown, fn: () => void): void;
declare const _default: {
    isSupported: typeof isSupported;
    ready: typeof ready;
};
export default _default;
