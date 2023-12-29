# BuildWhiz README
<div style="width:100px;height:100px;">
    ![Icon](icon.png)
</div>
BuildWhiz helps in simplifying the build creation and deployment process. Our aim is to provide total customizability to the users. Generally, running build commands or writing a shell script for these process is tedious.
So we thought of creating a extension to use Ant and finish all the build processes within a single click of a button from your IDE.

Overall, this is a UI button to execute the 'ant' command in the current workspace.

## Features

Execute ant command and run the processes defined in the build.xml file of your project. Additional Information from the processes will be logged in the debug console of the project.
You can perform all actions supported by Apache Ant using the build.xml file.

## Requirements

Apache Ant - Please install ant and set it as a environment variable that can be accessed from all directories.

## Extension Settings

This extension contributes the following settings:

* `buildwhiz.buildDirectory`: Specify the directory of the build.xml file. By default, it is the 'build' directory under the workspace.

Thanks for using BuildWhiz!