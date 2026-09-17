import * as vscode from 'vscode';
import { LanguageThemePanel } from './languageThemePanel';

type LanguageThemes = Record<string, string>;

const DEFAULT_LANGUAGE_THEMES: LanguageThemes = {
    javascript: 'Abyss',
    python: 'Huacat Pink Theme'
};

let themeSwitchTimer: ReturnType<typeof setTimeout> | undefined;

function getLanguageThemes(): LanguageThemes {
    return vscode.workspace
        .getConfiguration('pastella')
        .get<LanguageThemes>('languageThemes', DEFAULT_LANGUAGE_THEMES);
}

async function applyThemeForEditor(
    editor: vscode.TextEditor | undefined
): Promise<void> {
    if (!editor) {
        return;
    }

    const languageId = editor.document.languageId;
    const selectedTheme = getLanguageThemes()[languageId];

    if (!selectedTheme) {
        return;
    }

    const workbenchConfig = vscode.workspace.getConfiguration('workbench');
    const currentTheme = workbenchConfig.get<string>('colorTheme');

    // Do nothing when the correct theme is already selected.
    if (currentTheme === selectedTheme) {
        return;
    }

    try {
        await workbenchConfig.update(
            'colorTheme',
            selectedTheme,
            vscode.ConfigurationTarget.Global
        );
    } catch (error) {
        console.error('Pastella could not change the theme:', error);
    }
}

function scheduleThemeSwitch(editor: vscode.TextEditor | undefined): void {
    if (themeSwitchTimer) {
        clearTimeout(themeSwitchTimer);
    }

    // Stops rapid tab-clicking from triggering many theme changes.
    themeSwitchTimer = setTimeout(() => {
        void applyThemeForEditor(editor);
    }, 150);
}

export function activate(context: vscode.ExtensionContext): void {
    console.log('Pastella is active.');

    const startPastella = vscode.commands.registerCommand(
        'shira-yuki23.helloWorld',
        () => {
            vscode.window.showInformationMessage('Pastella started!');
        }
    );

    const openPanel = vscode.commands.registerCommand(
        'pastella.openLanguageThemePanel',
        () => {
            LanguageThemePanel.show();
        }
    );

    const editorListener = vscode.window.onDidChangeActiveTextEditor(editor => {
        scheduleThemeSwitch(editor);
    });

    const settingsListener = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('pastella.languageThemes')) {
            scheduleThemeSwitch(vscode.window.activeTextEditor);
        }
    });

    context.subscriptions.push(
        startPastella,
        openPanel,
        editorListener,
        settingsListener
    );

    scheduleThemeSwitch(vscode.window.activeTextEditor);
}

export function deactivate(): void {}