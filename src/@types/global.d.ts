export {};

declare global {
    interface Window {
        BASE_URL: string;
    }

    const BASE_URL: string;
}
