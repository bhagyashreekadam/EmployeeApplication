Ext.define('Employee', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'int',
            useNull: true
        },
        {
            name: 'name'
        },
        {
            name: 'salary',
            type: 'int'
        }]
});
Ext.onReady(function() {
    var store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Employee',
        proxy: {
            type: 'rest',
            url: 'employees',
            format: 'json',
            headers: {
                'Content-Type': 'application/json'
            },
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json'
            },
            api: {
                create: 'employees/create/',
                read: '',
                update: 'employees/edit/',
                destroy: 'employees/delete/'
            }
        }
    });

    var panelwindow=Ext.create('Ext.form.Panel', {
        id: 'panelId',
        store: store,
        title: 'Login Window',
        closable: false,
        height:500,
        width:500,
        align: 'center',
        style: 'margin:0 auto;margin-top:100px;',
        pack: 'center',
        autoShow: true,
        renderTo:document.body, // Div id where the grid has to be rendered
        viewModel: {
            type: 'Employee'
        },
        items: {
            xtype: 'form',
            store: store,
            reference: 'form',
            items: [{
                xtype: 'textfield',
                bind: '{name}',
                name: 'name',
                fieldLabel: 'Name',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'salary',
                bind: '{salary}',
                fieldLabel: 'Salary',
                allowBlank: false
            }],
            buttons: [{
                text: 'Create Employee',
                formBind: true,
                listeners: {
                    click: function() {
                        //this == the button, as we are in the local scope
                        //this.setText('I was clicked!');
                        store.add(panelwindow.getForm().getValues());
                        store.load();
                        panelwindow.close();
                        welcomewindow.showAt(200);
                    }}
            }]
        }
    });

    var welcomewindow=Ext.create('Ext.form.Panel', {
        id: 'welcomeId',
        store: store,
        title: 'Welcome Window',
        closable: false,
        height:500,
        width:500,
        align: 'center',
        style: 'margin:0 auto;margin-top:100px;',
        pack: 'center',
        autoShow: true,
        renderTo:document.body, // Div id where the grid has to be rendered
        viewModel: {
            type: 'Employee'
        },
        items: {
            xtype: 'form',
            store: store,
            reference: 'form',
            items: [{
                xtype: 'label',
                text:'welcome'
            },
                {
                    xtype: 'label',
                    bind: '{name}',
                    name: 'name',
                }],
            buttons: [{
                text: 'click to view all Employees',
                formBind: true,
                listeners: {
                    click: function() {
                        welcomewindow.close();
                        store.load();
                        grid.showAt(200);
                    }}
            }]
        }
    });


    var gridMenu = Ext.create('Ext.menu.Menu', {
        store: store,
        items: [
            {
                text:'Create',
                handler: function(){
                    var addPopUp= new Ext.form.Panel({
                        width: 400,
                        height: 400,
                        title: 'create new employee',
                        store:store,
                        floating: true,
                        region:'center',
                        modal:true,
                        closable:true,
                        viewModel: {
                            type: 'Employee'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                bind: '{name}',
                                name: 'name',
                                fieldLabel: 'Name'
                            },
                            {
                                xtype: 'textfield',
                                name: 'salary',
                                bind: '{salary}',
                                fieldLabel: 'Salary'
                            },
                            {
                                xtype: 'button',
                                width:50,
                                text: 'Add',
                                handler: function(){
                                    store.add(addPopUp.getForm().getValues());
                                    addPopUp.close();
                                    store.load();
                                }

                            }
                        ]
                    });
                    addPopUp.show();
                }
            },{
                text: 'Update',
                handler: function(){
                    var selectedItem = grid.getView().getSelectionModel().getSelection()[0];
                    var updatePopUP = new Ext.form.Panel({
                        width: 400,
                        height: 400,
                        title: 'Update employee',
                        store:store,
                        floating: true,
                        modal:true,
                        closable:true,
                        session: true,
                        viewModel: {
                            type: 'Employee'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                bind: '{name}',
                                name: 'name',
                                fieldLabel: 'Name'
                            },
                            {
                                xtype: 'textfield',
                                name: 'salary',
                                bind: '{salary}',
                                fieldLabel: 'Salary'
                            },
                            {
                                xtype: 'button',
                                width:50,
                                text: 'Save',
                                handler: function(){

                                    var record = updatePopUP.getForm().getRecord(),
                                        values = updatePopUP.getForm().getValues();
                                    record.set(values);
                                    updatePopUP.close();
                                }
                            }
                        ]
                    });
                    updatePopUP.loadRecord(selectedItem);
                    updatePopUP.show();
                }
            },{
                text: 'Delete',
                handler: function() {
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    var deletePopUP= new Ext.form.Panel({
                        width: 200,
                        height: 150,
                        title: 'Delete an employee',
                        store:store,
                        floating: true,
                        modal:true,
                        closable:true,
                        viewModel: {
                            type: 'Employee'
                        },
                        items: [
                            {
                                xtype: 'label',
                                bind: '{name}',
                                name: 'name',
                                fieldLabel: 'Do you want to delete this record???'
                            },
                            {
                                xtype: 'button',
                                width:50,
                                text: 'Yes',
                                handler: function(){
                                    store.remove(selection);
                                    deletePopUP.close();
                                }

                            },
                            {
                                xtype: 'button',
                                width:50,
                                text: 'No',
                                handler: function(){
                                    deletePopUP.close();
                                }

                            }
                        ]
                    });
                    deletePopUP.show();
                }

            }]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        xtype : 'employeegridview',
        renderTo: document.body,
        frame: true,
        style: 'margin:0 auto;margin-top:100px;',
        width:600,
        height:400,
        hidden:true,
        title: 'Employees',
        store: store,
        columns: [{
            text: 'ID',
            width: 40,
            sortable: true,
            dataIndex: 'id'
        }, {
            text: 'Name',
            flex: 1,
            sortable: true,
            dataIndex: 'name',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'Salary',
            width: 80,
            sortable: true,
            dataIndex: 'salary',
            field: {
                xtype: 'textfield'
            }
        }],
        listeners: {
            beforeitemcontextmenu: function(view, record, item, index, e)
            {
                e.stopEvent();
                gridMenu.showAt(e.getXY());
                //var detailView = Ext.ComponentQuery.query('mvvm-DetailView')[0];
                //detailView.getViewModel().setData({ rec: record });
            }
        }
    });
});