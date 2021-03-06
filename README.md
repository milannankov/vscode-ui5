# Visual Studio Code Extensions for UI5

-------------------

This extension contains code snippets for the SAP UI5 framework.

## Installation

In order to install an extension you need to launch the Command Pallete (Ctrl + Shift + P or Cmd + Shift + P) and type Extensions.
There you have either the option to show the already installed snippets or install new ones.

Launch VS Code Quick Open (Ctrl + P or Cmd + P), paste the following command, and press enter.

`ext install vscode-ui5`

Alternatively you can open the extensions panel and search for 'UI5 Extension'.

## Supported languages (file extensions)

* JavaScript (.js)
* XML (.xml)

## JavaScript Snippets

Below is a list of all available JavaScript snippets and the triggers of each one. The "->" means the `TAB` key.

| Trigger  | Content |
| -------: | ------- |
| `ui5controller->` | UI5 View Controller |
| `ui5cc->` | UI5 Custom control |
| `ui5cca->` | UI5 Custom with advanced features |
| `ui5co->` | UI5 Custom object |

## XML Snippets

Below is a list of all available XML snippets and the triggers of each one. The "->" means the `TAB` key.

| Trigger  | Content |
| -------: | ------- |
| `ui5app->` | UI5 Application View |
| `ui5view->` | UI5 View |
| `ui5-d-ttl->` | UI5 Title control |
| `ui5-d-ttl_a->` | UI5 Title control with additional properties |
| `ui5-d-lbl->` | UI5 Label control |
| `ui5-d-txt->` | UI5 Text control |
| `ui5-d-img->` | UI5 Image control |

## Settings

Settings to control extension behavior.

| Setting  | Description |
| -------: | ------- |
| ui5.snippets.useSingleQuotesJs | Specifies wheather single or double quotes are used for JavaScript snippets. |
| ui5.snippets.defaultNamespace | Specifies the default namespace for snippets. If manfest.json is specified, sap.app.id from manifest.json is used. |  

## License

MIT
