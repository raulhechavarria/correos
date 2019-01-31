
Ext.define('ObjetivoTrabajo', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',type: 'int'},{name: 'idFuncional',type: 'string'},{name: 'descripcion',type: 'string'}, 
            {name: 'responsable', type: 'string'}, {name: 'fechaInicio', type: 'string'},{name: 'fechaFinal', type: 'string'}, 
            {name: 'idOE', type: 'int'},{name: 'idFuncionalOE', type: 'string'}
        ]
});

Ext.define('ObjetivoEstrategico', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'int'},{name: 'idFuncional',type: 'string'},{name: 'descripcion',type: 'string'}, 
        {name: 'idARC', type: 'int'},{name: 'areaDescripcion', type: 'string'}, {name: 'anho', type: 'int'}
    ]
});

var objetivoTStore = new Ext.data.JsonStore({
		model:'ObjetivoTrabajo',
    	proxy: {
        	type: 'ajax',
        	url: 'objetivosTrabajoJson'
    	},
       id: 'objetivoTStore'
	    
	});

function onManageOT(btn, ev) { 
	objetivoTStore.load({ params: {anhoId: Ext.getCmp('anhoCombo').getValue()}});
	var gridOT = Ext.create('Ext.form.Panel', {
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
                	id:'objetivoTForm',
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
                            	blankText:'Este campo es requerido',
                            	allowBlank:false
                            },
                            {
                            	xtype: 'textareafield',
                            	fieldLabel: 'Descripcion',
                            	name: 'descripcion',
                            	blankText:'Este campo es requerido',
                            	allowBlank:false
                            },
                            {
                            	fieldLabel: 'Responsable',
                            	name: 'responsable',
                            	blankText:'Este campo es requerido',
                            	allowBlank:false
                            },
                            {
                            	fieldLabel: 'Objetivo Estrategico',
                            	name: 'idFuncionalOE',
                            	blankText:'Este campo es requerido',
                            	allowBlank:false
                            },
                            {
                            	xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio',
                             	name: 'fechaInicio',
                             	blankText:'Este campo es requerido',
                             	allowBlank:false
                            },
                            {
                            	xtype: 'datefield',
                        		fieldLabel: 'Fecha Final',
                        		blankText:'Este campo es requerido',
                            	name: 'fechaFinal',
                            	allowBlank:false
                            }
                    ],
                    buttons: [
                        {	text: 'Adicionar',
                        	handler: function() {
                        		var form = this.up('form').getForm();
                        		if (form.isValid()) {
                        			form.submit({
                        				url:'addObjetivoT',
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
                        				url:'editObjetivoT',
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
                    		            			url: 'deleteObjetivoT',
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
                	store: objetivoTStore,
                	width: 626,
                	height: 280,
                	title:'Listado Objetivos Trabajo',
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
                				width    : 150,
                				sortable : true,
                				dataIndex: 'descripcion'
                			},
                			{
                				text   : 'Responsable',
                				sortable : true,
                				dataIndex: 'responsable'
                			},
                			{
                				text   : 'Objetivo Estrategico',
                				width    : 110,
                				sortable : true,
                				dataIndex: 'idFuncionalOE'
                			},
                			{
                				text   : 'Fecha Inicio',
                				width    : 75,
                				sortable : true,
                				dataIndex: 'fechaInicio'
                			},
                			{
                				text   : 'Fecha Final',
                				width    : 75,
                				sortable : true,
                				dataIndex: 'fechaFinal'
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
		 title: 'Gestionar Objetivos de Trabajo',
	     modal: true,
	     closable:true,
	     width:660,
	     height:600,
	     plain:true,
	     layout: 'fit',

	     items: [gridOT]
	});
	win.show(this); 
	gridOT.child('gridpanel').getSelectionModel().select(0);
}
