export interface SnippetProcessingOptions {
    useSingleQuotes: boolean;
    namespace: string | null;
}

export interface SnippetConfig {
    filePath: string;
    label: string;
    description: string;
}