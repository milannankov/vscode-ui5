'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { SnippetConfig, SnippetProcessingOptions } from './core';
import { JsSnippetList, ManifestGlobPattern, ConfigurationOptionKeys, Messages, XmlSnippetList } from './config';

let manifestPattern: vscode.RelativePattern = null;
let manifestNamespace = null;
let fileWatcher: vscode.FileSystemWatcher;
let extensionPath = "";
let jsCompletionItems: Array<vscode.CompletionItem> = [];
let xmlCompletionItems: Array<vscode.CompletionItem> = [];

export function activate(context: vscode.ExtensionContext) {

    extensionPath = context.extensionPath;
    manifestPattern = new vscode.RelativePattern(vscode.workspace.rootPath, path.normalize(ManifestGlobPattern));

    let files = vscode.workspace.findFiles(manifestPattern).then(results => {
        if (results.length >= 0) {
            initFromManifest(results[0].fsPath);
            fileWatcher = vscode.workspace.createFileSystemWatcher(results[0].fsPath);
            fileWatcher.onDidChange(onManifestChange);
            fileWatcher.onDidDelete(onManifestDelete);
        }
    });

    vscode.workspace.onDidChangeConfiguration(onConfigurationChanged);

    function initFromManifest(manifestPath) {

        updateManifestData(manifestPath);
        refreshCompletionItems();

        vscode.languages.registerCompletionItemProvider('xml', {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
                return xmlCompletionItems;
            }
        });

        vscode.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
                return jsCompletionItems;
            }
        });
    }

    function updateManifestData(manifestPath) {
        manifestNamespace = null;

        try {
            const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
            manifestNamespace = manifest["sap.app"] ? manifest["sap.app"].id : null;

        } catch (e) {
            vscode.window.showInformationMessage(Messages.InvalidManifest);
        }
    }

    function onManifestChange(e: vscode.Uri) {
        updateManifestData(e.fsPath);
        refreshCompletionItems();
    }

    function onManifestDelete(e: vscode.Uri) {
        manifestNamespace = null;
        fileWatcher.dispose();
        fileWatcher = null;
        refreshCompletionItems();
    }

    function onConfigurationChanged(e: vscode.ConfigurationChangeEvent) {
        var hasNewDefaultNamespace = e.affectsConfiguration(ConfigurationOptionKeys.DefaultNamespace);
        var hasNewUseSingleQuotesJs = e.affectsConfiguration(ConfigurationOptionKeys.UseSingleQuotesJs);

        if (hasNewDefaultNamespace || hasNewUseSingleQuotesJs) {
            refreshCompletionItems();
        }
    }

    function refreshCompletionItems() {
        let options = getProcessingOptions();
        jsCompletionItems = JsSnippetList.map(sc => createJsSnippetItem(sc, options));
        xmlCompletionItems = XmlSnippetList.map(sc => createXmlSnippetItem(sc, options));
    }

    function getProcessingOptions(): SnippetProcessingOptions {
        let configuration = vscode.workspace.getConfiguration();
        let namespaceConfig = configuration.get<string>(ConfigurationOptionKeys.DefaultNamespace);
        let namespace = namespaceConfig;

        if (namespaceConfig === "manifest.json") {
            namespace = manifestNamespace;
        }

        return {
            useSingleQuotes: configuration.get<boolean>(ConfigurationOptionKeys.UseSingleQuotesJs),
            namespace: namespace
        }
    }

    function createJsSnippetItem(snippet: SnippetConfig, options: SnippetProcessingOptions): vscode.CompletionItem {

        let item = new vscode.CompletionItem(snippet.label, vscode.CompletionItemKind.Snippet);
        let snippetText = fs.readFileSync(path.join(extensionPath, snippet.filePath), "utf8");

        if (options.namespace) {
            snippetText = snippetText.replace("namespace", options.namespace);
        }

        if (options.useSingleQuotes) {
            snippetText = snippetText.replace(/"/g, "'");
        }

        item.insertText = new vscode.SnippetString(snippetText);
        item.documentation = snippet.description;

        return item;
    }

    function createXmlSnippetItem(snippet: SnippetConfig, options: SnippetProcessingOptions): vscode.CompletionItem {

        let item = new vscode.CompletionItem(snippet.label, vscode.CompletionItemKind.Snippet);
        let snippetText = fs.readFileSync(path.join(extensionPath, snippet.filePath), "utf8");

        if (options.namespace) {
            snippetText = snippetText.replace("namespace", options.namespace);
        }

        item.insertText = new vscode.SnippetString(snippetText);
        item.documentation = snippet.description;

        return item;
    }
}

export function deactivate() {
    if(fileWatcher) {
        fileWatcher.dispose();
    }
}