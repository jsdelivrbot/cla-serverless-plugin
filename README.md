# Serverless Plugin

Execute a Serverless script. Associate server agent will execute the script for AWS.

## Installing

To install the plugin place the cla-serverless-plugin folder inside `CLARIVE_BASE/plugins`
directory in Clarive's instance.

## How to use

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service.

Form to configure has the following fields:

- **Server** - Server that holds the remote file, server to connect to.
- **Functions** - List of serverless parameters that you can use.
- **Credentials AWS** - Add the credentials AWS. Only with deploy function.
- **Service Path** - Add the path where is the service. Only with deploy function
- **Custom Params** - You can build a Serverless command with the parameters that you want or add parameters that are not in the list. Example:

          --template aws-nodejs
          --path myService

- **Errors and output** - These two fields are related to manage control errors. Options are:
   - **Fail and output error** - Search for configurated error pattern in script output. If found, an error message is displayed in monitor showing the match.
   - **Warn and output warn** - Search for configurated warning pattern in script output. If found, an error message is displayed in monitor showing the match.
   - **Custom** - In case combo box errors is set to custom a new form is showed to define the behavior with these fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in monitor.
      - **Warn** - Range of return code values to warn the user. A warn message will be displayed in monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in monitor.
   - **Silent** - Silent all errors found.


