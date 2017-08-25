(function(params) {

    var data = params.data || {};

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: data.server || '',
        class: 'BaselinerX::CI::generic_server',
        fieldLabel: _('Server'),
        allowBlank: false,
        with_vars: 1
    });

    var args = Cla.ui.comboBox({
        name: 'args',
        fieldLabel: _('Functions'),
        value: data.args || [],
        data: [
            ['config', 'config'],
            ['create', 'create'],
            ['install', 'install'],
            ['package', 'package'],
            ['deploy', 'deploy'],
            ['invoke', 'invoke'],
            ['logs', 'logs'],
            ['info', 'info'],
            ['rollback', 'rollback'],
            ['remove', 'remove']
        ],
        singleMode: true,
        allowBlank: true
    });

    args.on('addItem', function() {
        var v = args.getValue();
        if (v == 'deploy') {
            credentials.show();
            pathService.show();
            credentials.doLayout();
        } else {
            credentials.hide();
        }
    });

    var credentials = Cla.ui.panel({
        layout: 'column',
        fieldLabel: _('Credentials AWS'),
        frame: true,
        hidden: !(data.args == 'deploy'),
        items: [{
            layout: 'form',
            columnWidth: .50,
            labelAlign: 'top',
            frame: true,
            items: {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: _('Access Key'),
                name: 'accessKey',
                value: data.accessKey || ''
            }
        }, {
            layout: 'form',
            columnWidth: .50,
            labelAlign: 'top',
            frame: true,
            items: {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: _('Secret Key'),
                name: 'secretKey',
                value: data.secretKey || ''
            }
        }]
    });

    var customParams = Cla.ui.arrayGrid({
        name: 'custom',
        fieldLabel: _('Custom Params'),
        value: data.custom,
        description: _('Custom commands or arguments'),
        default_value: '.'
    });

    var pathService = Cla.ui.textField({
        name: 'path',
        fieldLabel: _('Service Path'),
        value: data.path || '',
        hidden: data.args == 'create',
    });


    var errors = Cla.ui.errorManagementBox({
        errorTypeName: 'type',
        errorTypeValue: params.data.type || 'warn',
        rcOkName: 'ok',
        rcOkValue: params.data.ok,
        rcWarnName: 'warn',
        rcWarnValue: params.data.warn,
        rcErrorName: 'error',
        rcErrorValue: params.data.error,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverCombo,
            args,
            credentials,
            pathService,
            customParams,
            errors,
        ]
    });

    return panel;
})