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