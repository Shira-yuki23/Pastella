import * as vscode from 'vscode';

type LanguageThemes = Record<string, string>;

export class LanguageThemePanel {
    private static currentPanel: LanguageThemePanel | undefined;

    private constructor(
        private readonly panel: vscode.WebviewPanel
    ) {
        this.panel.webview.html = this.getHtml();

        this.panel.onDidDispose(() => {
            LanguageThemePanel.currentPanel = undefined;
        });

        this.panel.webview.onDidReceiveMessage(async message => {
            if (message.command !== 'save') {
                return;
            }

            const languageThemes = message.languageThemes as LanguageThemes;

            await vscode.workspace
                .getConfiguration('pastella')
                .update(
                    'languageThemes',
                    languageThemes,
                    vscode.ConfigurationTarget.Global
                );

            void vscode.window.showInformationMessage(
                'Pastella language themes saved!'
            );
        });
    }

    public static show(): void {
        if (LanguageThemePanel.currentPanel) {
            LanguageThemePanel.currentPanel.panel.reveal();
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'pastellaLanguageThemes',
            'Pastella Language Themes',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        LanguageThemePanel.currentPanel = new LanguageThemePanel(panel);
    }

    private getHtml(): string {
        const languageThemes = vscode.workspace
            .getConfiguration('pastella')
            .get<LanguageThemes>('languageThemes', {});

        const savedRules = JSON.stringify(languageThemes).replace(/</g, '\\u003c');

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        body {
            color: var(--vscode-foreground);
            font-family: var(--vscode-font-family);
            max-width: 800px;
            margin: 0 auto;
            padding: 28px;
        }

        h1 {
            margin-top: 0;
        }

        p {
            color: var(--vscode-descriptionForeground);
        }

        .rule {
            display: grid;
            grid-template-columns: 1fr 1fr auto;
            gap: 10px;
            margin: 12px 0;
        }

        input,
        button {
            box-sizing: border-box;
            font: inherit;
            padding: 9px;
        }

        input {
            color: var(--vscode-input-foreground);
            background: var(--vscode-input-background);
            border: 1px solid var(--vscode-input-border);
        }

        button {
            border: 0;
            cursor: pointer;
            color: var(--vscode-button-foreground);
            background: var(--vscode-button-background);
        }

        button:hover {
            background: var(--vscode-button-hoverBackground);
        }

        .remove {
            color: var(--vscode-button-secondaryForeground);
            background: var(--vscode-button-secondaryBackground);
        }

        .actions {
            display: flex;
            gap: 10px;
            margin-top: 22px;
        }

        #status {
            min-height: 20px;
            margin-top: 14px;
            color: var(--vscode-testing-iconPassed);
        }
    </style>
</head>

<body>
    <h1>Pastella Language Themes</h1>

    <p>
        Add a VS Code language ID and the exact name of an installed colour theme.
        Examples: <code>javascript</code>, <code>python</code>, <code>cpp</code>.
    </p>

    <div id="rules"></div>

    <div class="actions">
        <button id="addRule">Add language</button>
        <button id="saveRules">Save changes</button>
    </div>

    <p id="status"></p>

    <script>
        const vscode = acquireVsCodeApi();
        const rulesContainer = document.getElementById('rules');
        const status = document.getElementById('status');

        function addRule(language = '', theme = '') {
            const rule = document.createElement('div');
            rule.className = 'rule';

            rule.innerHTML = \`
                <input class="language"
                    placeholder="Language ID, e.g. cpp"
                    value="\${language}">

                <input class="theme"
                    placeholder="Theme name, e.g. Abyss"
                    value="\${theme}">

                <button class="remove">Remove</button>
            \`;

            rule.querySelector('.remove').addEventListener('click', () => {
                rule.remove();
            });

            rulesContainer.appendChild(rule);
        }

        const savedRules = ${savedRules};

        for (const [language, theme] of Object.entries(savedRules)) {
            addRule(language, theme);
        }

        if (Object.keys(savedRules).length === 0) {
            addRule();
        }

        document.getElementById('addRule').addEventListener('click', () => {
            addRule();
        });

        document.getElementById('saveRules').addEventListener('click', () => {
            const languageThemes = {};

            for (const rule of document.querySelectorAll('.rule')) {
                const language = rule.querySelector('.language').value.trim();
                const theme = rule.querySelector('.theme').value.trim();

                if (!language || !theme) {
                    status.textContent = 'Every rule needs both a language ID and theme name.';
                    return;
                }

                languageThemes[language] = theme;
            }

            vscode.postMessage({
                command: 'save',
                languageThemes
            });

            status.textContent = 'Saved! Switch to a matching file to test it.';
        });
    </script>
</body>
</html>
        `;
    }
}