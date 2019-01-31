
Ext.define('ObjetivoEstrategico', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',type: 'int'},{name: 'idFuncional',type: 'string'},{name: 'descripcion',type: 'string'}, 
            {name: 'idARC', type: 'int'},{name: 'areaDescripcion', type: 'string'}, {name: 'anho', type: 'int'}
        ]
});

Ext.define('Area', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'int'},{name: 'idFuncional',type: 'string'},{name: 'descripcion',type: 'string'}
    ]
});

var objetivoEStore = new Ext.data.JsonStore({
		model:'ObjetivoEstrategico',
    	proxy: {
        	type: 'ajax',
        	url: 'objetivosEstrategicosJson'
    	},
       id: 'objetivoEStore'
	});

function onManageOE(btn, ev) { 
	objetivoEStore.load({ params: {anhoId: Ext.getCmp('anhoCombo').getValue()}});
	var gridOE = Ext.create('Ext.form.Panel', {
        id: 'form',
        frame: true,
        bodyPadding: 5,
        width: 750,
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
                	id:'objetivoEForm',
                	bodyStyle:'padding:6px 6px 0',
                	frame:true,
                    defaults: {
                    	width: 606,
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
                            	xtype: 'textareafield',
                            	fieldLabel: 'Descripcion',
                            	name: 'descripcion',
                            	allowBlank:false
                            },
                            {
                            	fieldLabel: 'ARC',
                            	name: 'areaDescripcion',
                            	allowBlank:false
                            },{
                            	fieldLabel: 'Anho',
                            	name: 'anho',
                            	allowBlank:false
                            }
                    ],
                    buttons: [
                        {	text: 'Adicionar',
                        	handler: function() {
                        		var form = this.up('form').getForm();
                        		if (form.isValid()) {
                        			form.submit({
                        				url:'addObjetivoE',
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
                        				url:'editObjetivoE',
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
                    			Ext.MessageBox.confirm('Confirmar', 'Esta usted seguro que desea eliminar el objetivo?',
                    					function showResult(btn){			            		
                    		            	if(btn == 'yes'){
                    		            		Ext.Ajax.request({
                    		            			url: 'deleteObjetivoE',
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
                	store: objetivoEStore,
                	width: 626,
                	height: 280,
                	title:'Listado Objetivos Estrategicos',
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
                				width    : 290,
                				sortable : true,
                				dataIndex: 'descripcion'
                			},
                			{
                				text   : 'Area Resultado Clave',
                				width    : 175,
                				sortable : true,
                				dataIndex: 'areaDescripcion'
                			},
                			{
                				text   : 'Anho',
                				width    : 75,
                				sortable : true,
                				dataIndex: 'anho'
                			},
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
		 title: 'Gestionar Objetivos Estrategicos',
	     modal: true,
	     closable:true,
	     width:660,
	     height:600,
	     plain:true,
	     layout: 'fit',

	     items: [gridOE]
	});
	win.show(this); 
	gridOE.child('gridpanel').getSelectionModel().select(0);
}
