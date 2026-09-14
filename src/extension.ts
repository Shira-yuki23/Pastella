import * as vscode from 'vscode';//API ney
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "shira-yuki23" is now active!');
	const disposable = vscode.commands.registerCommand('shira-yuki23.helloWorld', () => {
		vscode.window.showInformationMessage('Pastella started!');
	});
	const editorListener = vscode.window.onDidChangeActiveTextEditor(async editor => {
	if (!editor) {return;}
	//lang detct kore
	const lang = editor.document.languageId;
	console.log("Language Detected:", lang);	
	if(lang =='javascript')
	{
		const config= vscode.workspace.getConfiguration('workbench');
		try{
			await config.update(
				'colorTheme', 
				'Default Dark+', 
				vscode.ConfigurationTarget.Global
			);
			console.log('Theme changed for JS!');
		}catch(error){
			console.error('Couldnt change theme:', error);
		}
	}
	if(lang =='python')
	{
		const config= vscode.workspace.getConfiguration('workbench');
		try{
			await config.update(
				'colorTheme', 
				'Huacat Pink Theme', 
				vscode.ConfigurationTarget.Global
			);
			console.log('Theme changed for JS!');
		}catch(error){
			console.error('Couldnt change theme:', error);
		}
	}
	});
	//theme detc
	const config= vscode.workspace.getConfiguration('workbench');
	const currentTheme= config.get<string>('colorTheme');
	console.log("Current Theme:", currentTheme);
	context.subscriptions.push(editorListener);
	context.subscriptions.push(disposable);
}
export function deactivate() {}
