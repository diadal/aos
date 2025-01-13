declare global {
    interface Window {
        opera: string;
    }
}
declare class Detector {
    phone(): boolean;
    mobile(): boolean;
    tablet(): boolean;
    ie11(): boolean;
}
declare const _default: Detector;
export default _default;
