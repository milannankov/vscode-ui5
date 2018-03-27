import { SnippetConfig } from './core';

export const ManifestGlobPattern = "./**/manifest.json";

export const ConfigurationOptionKeys = {
    DefaultNamespace: "ui5.snippets.defaultNamespace",
    UseSingleQuotesJs: "ui5.snippets.useSingleQuotesJs"
}

export const Messages = {
    InvalidManifest: "Invalid manifest.json detected!"
}

export const JsSnippetList: Array<SnippetConfig> = [
    {
        filePath: "snippet-source/javascript/ui5controller.js.snippet",
        label: "ui5controller",
        description: "UI View Controller"
    },
    {
        filePath: "snippet-source/javascript/ui5cca.js.snippet",
        label: "ui5cca",
        description: "Advanced Custom Control"
    },
    {
        filePath: "snippet-source/javascript/ui5cc.js.snippet",
        label: "ui5cc",
        description: "Custom Control"
    },
    {
        filePath: "snippet-source/javascript/ui5co.js.snippet",
        label: "ui5co",
        description: "Custom Object"
    }
]

export const XmlSnippetList: Array<SnippetConfig> = [
    {
        filePath: "snippet-source/xml/ui5app.xml.snippet",
        label: "ui5app",
        description: "UI5 Application View"
    },
    {
        filePath: "snippet-source/xml/ui5view.xml.snippet",
        label: "ui5view",
        description: "UI5 View"
    },
]