
Ext.define('Secciones', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',type: 'int'},{name: 'idFuncional',type: 'string'},{name: 'descripcion',type: 'string'}
        ]
});

var seccionesStore = new Ext.data.JsonStore({
		model:'Secciones',
    	proxy: {
        	type: 'ajax',
        	url: 'seccionesJson'
    	},
       id: 'seccionesStore'
	    
	});

function onManageSecciones(btn, ev) { 
	seccionesStore.load();
	var gridSeccion = Ext.create('Ext.form.Panel', {
        id: 'form',
        frame: true,
        bodyPadding: 5,
        width: 550,
        layout: 'vbox', 

        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'side'
        },

        items: [
                //panel del formulario
                {
                	margin: '0 0 10 0',
                	xtype: 'form',
                	id:'seccionesForm',
                	title:'Detalles Seccion Actividades',
                	bodyStyle:'padding:6px 6px 0',
                	frame:true,
                    defaults: {
                    	width: 406,
                    	labelWidth: 90
                    },
                    defaultType: 'textfield',
                    items: [
                            {
                            	fieldLabel: 'Numero',
                            	name: 'idFuncional',
                            	allowBlank:false
                            },
                            {
                            	fieldLabel: 'Descripcion',
                            	name: 'descripcion',
                            	allowBlank:false
                            }
                    ],
                    buttons: [
                        {	text: 'Adicionar',
                        	handler: function() {
                        		var form = this.up('form').getForm();
                        		if (form.isValid()) {
                        			form.submit({
                        				url:'addSeccion',
                        				success: function(form, action) {
                        					Ext.MessageBox.show({
                        						title:'Exito',
                        						msg: action.result.msg,
                        						buttons: Ext.MessageBox.OK,
                        						icon: Ext.MessageBox.INFO
                        					});	
                        					Ext.getCmp('gridPanel').getStore().load();
                        					Ext.getCmp('treePanel').getStore().load();
                        					form.reset();
                        				},
                        				failure: function(form, action) {
                        					Ext.MessageBox.show({
                        						title:'Fallo',
                        						msg: action.result.msg,
                        						buttons: Ext.MessageBox.OK,
                        						icon: Ext.MessageBox.ERROR
                        					});	
                        				}
                        			});
                        		}
                        	}
                        },
                    	{	text: 'Guardar',
                        	handler: function() {
                        		var form = this.up('form').getForm();
                        		if (form.isValid()) {
                        			form.submit({
                        				url:'editSeccion',
                        				params: {
                                            id: Ext.getCmp('gridPanel').getSelectionModel().getSelection()[0].data.id
                                         },
                        				success: function(form, action) {
                        					Ext.MessageBox.show({
                        						title:'Exito',
                        						msg: action.result.msg,
                        						buttons: Ext.MessageBox.OK,
                        						icon: Ext.MessageBox.INFO
                        					});	
                        					Ext.getCmp('gridPanel').getStore().load();
                        					Ext.getCmp('treePanel').getStore().load();
                        					form.reset();
                        				},
                        				failure: function(form, action) {
                        					Ext.MessageBox.show({
                        						title:'Fallo',
                        						msg: action.result.msg,
                        						buttons: Ext.MessageBox.OK,
                        						icon: Ext.MessageBox.ERROR
                        					});	
                        				}
                        			});
                        		}
                        	}
                    	},
                    	{	text: 'Eliminar',
                    		handler: function (){
                    			var form = this.up('form').getForm();
                    			Ext.MessageBox.confirm('Confirmar', 'Esta usted seguro que desea eliminar la seccion?',
                    					function showResult(btn){			            		
                    		            	if(btn == 'yes'){
                    		            		Ext.Ajax.request({
                    		            			url: 'deleteSeccion',
                    	                            params: {
                    	                                id: Ext.getCmp('gridPanel').getSelectionModel().getSelection()[0].data.id
                    	                             },
                    	                             success: function (response, options) {
                    	                                if(Ext.decode(response.responseText).success == true){
                    	                                   Ext.Msg.alert('Exito', Ext.decode(response.responseText).responseText);	
                    	                                   Ext.getCmp('treePanel').getStore().load();
                    	                                   Ext.getCmp('gridPanel').getStore().load();
                    	                                   form.reset();
                    	                                }
                    	                                else{
                    	                                	Ext.Msg.alert('Fallo', Ext.decode(response.responseText).responseText);
                    	                                }
                    	                             }
                    	                          });
                    		            	}
                    				    }
                    				);
                			}
                        },
                        {	text: 'Cancelar',
                    		handler: function (){
                    			this.up('form').getForm().reset();
                			}
                        }
                    ]
        		},
                //panel de la grid
                {
                	xtype: 'gridpanel',
                	id:'gridPanel',
                	store: seccionesStore,
                	width: 426,
                	height: 280,
                	title:'Listado Secciones Actividades',
                	//frame:true,
                	columns: [{
                	        	  id       :'idFuncional',
                	        	  text   : 'Numero',
                	        	  width    : 75,
                	        	  sortable : true,
                	        	  dataIndex: 'idFuncional'
                			},
                			{
                				text   : 'Descripcion',
                				width    : 330,
                				sortable : true,
                				dataIndex: 'descripcion'
                			}
                		],
                	/*plugins: [{
                		ptype: 'rowexpander',
                		rowBodyTpl : [
                		      '<p><b>Descripcion:</b> {descripcion}</p><br>'
                		]
                	}],*/
                	listeners: {
                		selectionchange: function(model, records) {
                			if (records[0]) {
                				this.up('form').getForm().loadRecord(records[0]);
                			}
                		}
                	}
                }
			]
    	});
	 var win = new Ext.Window({
		 title: 'Gestionar Secciones',
	     modal: true,
	     closable:true,
	     width:460,
	     height:400,
	     plain:true,
	     layout: 'fit',

	     items: [gridSeccion]
	});
	win.show(this); 
	gridSeccion.child('gridpanel').getSelectionModel().select(0);
}
