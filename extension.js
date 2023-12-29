const vscode = require('vscode');
const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');


function activate(context) {
    // Create a status bar item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

    // Use the 'Go Live' button icon (replace with your desired icon)
    statusBarItem.text = "$(rocket) Build";

    // Tooltip for better user understanding
    statusBarItem.tooltip = "Click to build your project";

    // Set up command to execute when the button is clicked
    statusBarItem.command = 'buildwhiz.build';

    statusBarItem.show();

    // Register the command handler
    let disposable = vscode.commands.registerCommand('buildwhiz.build', async () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace found!');
            return;
        }

        // Use the first workspace folder in the list
        const workspaceFolderPath = workspaceFolders[0].uri.fsPath;

		// Using the user configured build directory
		const buildDirectory = vscode.workspace.getConfiguration().get('buildwhiz.buildDirectory', 'build');

		// Define the build directory path
		const buildPath = path.join(workspaceFolderPath, buildDirectory);

		try {
            const exists = await fs.promises.stat(buildPath);
            if (!exists.isDirectory()) {
                vscode.window.showErrorMessage('Build directory does not exist.');
                return;
            }
        } catch (error) {
            vscode.window.showErrorMessage('Error accessing build directory.');
            return;
        }

		const buildXmlPath = path.join(buildPath, 'build.xml');

        try {
            const buildXmlExists = await fs.promises.stat(buildXmlPath);
            if (!buildXmlExists.isFile()) {
                vscode.window.showErrorMessage('build.xml not found.');
                return;
            }
        } catch (error) {
            vscode.window.showErrorMessage('Error accessing build.xml.');
            return;
        }


		const antProcess = exec('ant -f build.xml', { cwd: buildDirectory });

		antProcess.stdout.on('data', (data) => {
            const antOutput = Buffer.from(data).toString(); // Convert Buffer to string
            vscode.window.showInformationMessage(`Build created successfully!`);
			console.log(antOutput)
        });

        antProcess.stderr.on('data', (data) => {
            const antError = Buffer.from(data).toString(); // Convert Buffer to string
            vscode.window.showErrorMessage(`Error during build creation!`);
			console.error(antError);
        });

        antProcess.on('error', (error) => {
            vscode.window.showErrorMessage(`Failed to create build!`);
			console.error(error.message);
        });

        antProcess.on('exit', (code) => {
            if (code === 0) {
				console.log('Ant command executed successfully in the build directory!');
            } else {
                console.error(`Ant command exited with code ${code}`);
            }
        });
        // Execute your ant command logic here
    });

    // Add the disposable to the context so it can be disposed when the extension is deactivated
    context.subscriptions.push(statusBarItem, disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};