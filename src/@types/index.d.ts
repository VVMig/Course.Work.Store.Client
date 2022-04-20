declare module '*.css' {
    const content: Record<string, string>;

    export default content;
}

declare module '*.scss' {
    const content: Record<string, string>;

    export default content;
}

declare module '*.png' {
    const content: string;

    export default content;
}

declare module '*.jpeg' {
    const content: string;

    export default content;
}

declare module '*.webp' {
    const content: string;

    export default content;
}
