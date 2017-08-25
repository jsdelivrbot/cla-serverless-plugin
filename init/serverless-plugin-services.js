var reg = require('cla/reg');

reg.register('service.serverless.script', {
    name: 'Run a serverless script',
    icon: 'plugin/cla-serverless-plugin/icon/serverless.svg',
    form: '/plugin/cla-serverless-plugin/form/serverless-form.js',

    handler: function(ctx, params) {

        var log = require('cla/log');
        var ci = require('cla/ci');
        var reg = require('cla/reg');
        var errorsType = params.errors || 'fail';
        var command = '';
        var customParams = params.custom;

        if (params.accessKey && params.secretKey) {
            command = 'export AWS_ACCESS_KEY_ID=' + params.accessKey + ';export AWS_SECRET_ACCESS_KEY=' + params.secretKey + ';';
        }
        if (params.args) {
            if (params.args != 'create') {
                command += 'cd ' + params.path + ';serverless ' + params.args + ' ' + customParams.join(" ");
            } else {
                command += 'serverless ' + params.args + ' ' + customParams.join(" ");
            }
        }

        var output = reg.launch('service.scripting.remote', {
            name: 'Run a serverless script',
            config: {
                errors: params.type,
                server: params.server,
                user: params.user,
                home: params.home,
                path: command,
                output_error: params.output_error,
                output_warn: params.output_warn,
                output_capture: params.output_capture,
                output_ok: params.output_ok,
                meta: params.meta,
                rc_ok: params.ok,
                rc_error: params.error,
                rc_warn: params.warn
            }
        });
        return output;
    }
});