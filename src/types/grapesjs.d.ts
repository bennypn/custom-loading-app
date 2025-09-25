declare module 'grapesjs' {
    interface Editor {
        DomComponents: any;
        BlockManager: any;
        destroy(): void;
        getHtml(): string;
        getCss(): string;
        addComponents(content: string): void;
    }

    interface GrapesJSConfig {
        container: HTMLElement;
        height?: string;
        fromElement?: boolean;
        storageManager?: any;
        plugins?: any[];
        pluginsOpts?: any;
        canvas?: any;
    }

    interface GrapesJSStatic {
        init(config: GrapesJSConfig): Editor;
    }

    const grapesjs: GrapesJSStatic;
    export = grapesjs;
}

declare module 'grapesjs-preset-webpage' {
    const preset: any;
    export = preset;
}

// Global namespace declaration
declare namespace grapesjs {
    interface Editor {
        DomComponents: any;
        BlockManager: any;
        destroy(): void;
        getHtml(): string;
        getCss(): string;
        addComponents(content: string): void;
    }
}