export {};

declare global {
    interface Window {
        example: string;
        ethereum: ExternalProvider | JsonRpcFetchFunc;
    }
}
