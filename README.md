# Serverless Plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-serverless-plugin@master/public/icon/serverless.svg?sanitize=true" alt="Serverless Plugin" title="Serverless Plugin" width="120" height="120">

Execute a Serverless script. Associate server agent will execute the script for AWS.

## Installing

To install the plugin place the cla-serverless-plugin folder inside `$CLARIVE_BASE/plugins`
directory in Clarive's instance.

### Run a serverless script

The various parameters are:

- **Server (variable name: server)** - Server that holds the remote file, server to connect to.
- **Functions (args)** - List of serverless parameters that you can use:
	- Config ("config")
	- Create ("create")
	- Install ("install")
	- Package ("package")
	- Deploy ("deploy")
	- Invoke ("invoke")
	- Logs ("logs")
	- Info ("info")
	- Rollback ("rollback")
	- Remove ("remove")
- **AWS Credentials** - Add the credentials for AWS. Only for Deploy function.
	- **Access Key (access_key)** - Access key for the Amazon Web Service.
	- **Secret Key (secret_key)** - Secret key for the Amazon Web Service.
- **Service Path (path)** - Full path to service directory. Not needed for Create function.
- **Custom Params (custom_args)** - You can add parameters to the existing functions.

**Only Clarive EE**

- **Errors and Output** - These two fields deal with managing control errors. The options are:
   - **Fail and Output Error** - Search for the configured error pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Warning and Output warning** - Search for the configured warning pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Custom** - If combo box errors is set to custom, a new form is displayed to define the behavior with these
     fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
   - **Warn** - Range of return code values to warn the user. A warning will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
     monitor.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Create example:

```yaml
    Server: Serverless-Server
    Functions: Create
    Custom Params: 	
    	--template aws-nodejs
        --path myService
``` 

Deploy example:

```yaml
    Server: Serverless-Server
    Functions: Deploy
    AWS Credentials
    	Access Key: 443fdf34fwfwef
    	Secret Key: fn558g954ng45h9
    Service Path: /path/to/service/directory/
    Custom Params: 	
    	--package /path/to/package/directory
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Create example:

```yaml
do:
   - serverless_script:
       server: 'serverless_server'          	# Required. Use the mid set to the resource you created
       args: 'create'				# Required.
       custom_args: ['--template aws-nodejs', '--path myService']
``` 

Deploy example:

```yaml
do:
   - serverless_script:
       server: 'serverless_server'          	# Required. Use the mid set to the resource you created
       args: 'deploy'				# Required.
       access_key: '443fdf34fwfwef'
       secret_key: 'fn558g954ng45h9'
       path: '/path/to/service/directory/'
       custom_args: ['--package /path/to/package/directory']
```

##### Outputs

###### Success

The service will return the response from the console output.

###### Possible configuration failures

**Task failed**

You will get the error from the console output.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "serverless_script": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Server` not available for op "serverless_script"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
