function onAddActivities(btn, ev) {
		var simple = new Ext.form.Panel({
			url:'addActividad',
			id:'addActivities',	        
	        frame:true,
	     	bodyStyle:'padding:5px 5px 0',
	     	width: 350,
	     	fieldDefaults: {
		        msgTarget: 'side',
	    		labelWidth: 75
	 		},
	     	defaultType: 'textfield',
	     	defaults: {
	        	anchor: '100%'
	        },	        
	        defaultType: 'textfield',
	        items: [{
	                fieldLabel: 'Numero',
	                name: 'idFuncional',
	                blankText:'Este campo es requerido',
	                allowBlank:false
	            },{
	            	xtype: 'textareafield',
	            	fieldLabel: 'Descripcion',
	                name: 'descripcion',
	                blankText:'Este campo es requerido',
	                allowBlank:false
	            },{
	                fieldLabel: 'Responsable',
	                name: 'responsable',
	                blankText:'Este campo es requerido',
	                allowBlank:false
	            },{
	                fieldLabel: 'Participantes',
	                name: 'participantes',
	                blankText:'Este campo es requerido',
	                allowBlank:false
	            },{
	                fieldLabel: 'Recursos',
	                name: 'recursos'
	            },{
                    xtype:          'combo',
                    value:          '-1',
                    id:				'OTCombo',
                    editable:       false,
                    fieldLabel:     'Objetivo Trabajo',
                    name:           'objetivoT',
                    displayField:   'idFuncional',
                    valueField:     'id',
                    listeners:{
                        select: function(combo, record, index){
                        	Ext.getCmp('seccionCombo').setDisabled(true);
                        }
                    },
                    store: Ext.create('Ext.data.Store', {
                    	fields:['id','idFuncional'],
                    	proxy: {
                        	type: 'ajax',
                        	url: 'objetivosTrabajoJson'
                    	}
                    })
                },{
                    xtype:          'combo',
                    value:          '-1',
                    id:             'seccionCombo',
                    editable:       false,
                    fieldLabel:     'Seccion',
                    name:           'seccion',
                    displayField:   'descripcion',
                    valueField:     'id',
                    listeners:{
                        select: function(combo, record, index){
                        	Ext.getCmp('OTCombo').setDisabled(true);
                        }
                    },
                    store: Ext.create('Ext.data.Store', {
                    	fields:['id','descripcion'],
                    	proxy: {
                        	type: 'ajax',
                        	url: 'seccionesJson'
                    	}
                    })
                },{
                    xtype:          'combo',
                    mode:           'local',
                    value:          '-1',
                    triggerAction:  'all',
                    editable:       false,
                    fieldLabel:     'Observacion',
                    name:           'observacion',
                    displayField:   'descripcion',
                    valueField:     'id',
                    queryMode: 'local',
                    store:          Ext.create('Ext.data.Store', {
                        fields : ['descripcion', 'id'],
                        data   : [
                            {descripcion : 'Cumplido',   id: '1'},
                            {descripcion : 'Incumplido',  id: '2'},
                            {descripcion : 'En Proceso', id: '3'}
                        ]
                    })
                },{
                    xtype:'fieldset',
                    title: 'Plazo',
                    collapsible: true,
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items :[
                        {
                            xtype: 'datefield',
                        	
                            fieldLabel: 'Fecha Inicio',
                        	name: 'fechaInicio',
                        	blankText:'Este campo es requerido',
                        	allowBlank:false
                    	},{
                    		xtype: 'datefield',
                    		fieldLabel: 'Fecha Final',
                    		blankText:'Este campo es requerido',
                        	name: 'fechaFinal',
                        	allowBlank:false
                    	}
                    ]
            	}
	        ],

	        buttons: [{
	            text: 'Guardar',
	            handler: function() {
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                    form.submit({
	                        success: function(form, action) {
	                        	Ext.MessageBox.show({
	                                title:'Exito',
	                                msg: action.result.msg,
	                                buttons: Ext.MessageBox.OK,
	                                icon: Ext.MessageBox.INFO
	                            });	
	                          // Ext.Msg.alert('Exito', action.result.msg);
	                           win.close();
	                           var temp = Ext.getCmp('treePanel');
	                           temp.getStore().load();
	                        },
	                        failure: function(form, action) {
	                        	Ext.MessageBox.show({
	                                title:'Fallo',
	                                msg: action.result.msg,
	                                buttons: Ext.MessageBox.OK,
	                                icon: Ext.MessageBox.ERROR
	                            });	
	                            //Ext.Msg.alert('Fallo', action.result.msg);
	                        }
	                    });
	                }
	            }
	        },{
	            text: 'Cancelar',
	            handler: function (){
			        simple.getForm().reset();
			        Ext.getCmp('OTCombo').setDisabled(false);
			        Ext.getCmp('seccionCombo').setDisabled(false);
	            }
	        }]
	    });
	    var win = new Ext.Window({
	        title: 'A&ntilde;adir Nueva Actividad',
	        modal: true,
	        closable:true,
	        width:560,
	        height:450,
	        plain:true,
	        layout: 'fit',

	        items: [simple]
	    });

	    win.show(this); 
	};
