var comboStore = new Ext.data.JsonStore({
		fields:['id','idFuncional'],
    	autoload:true,
    	proxy: {
        	type: 'ajax',
        	url: 'objetivosTrabajoJson'
    	},
       id: 'id'
	    
	});

	function onEditActivities(btn, ev) {
		var selection = Ext.getCmp('treePanel').getSelectionModel().getSelection()[0];
		comboStore.load();
		//var index = comboStore.find("id",selection.data.idOT.toString(),null,null,null,true); 
		//var tem = selection.data.idOT.toString();
		//alert(index);
		//comboObjT.setValue(index);
		if (selection && selection.data.id!=0) {
		    var simple = new Ext.FormPanel({
		    url:'editActividad',
			id:'simple',	        
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
                	allowBlank:false,
                	value: selection.data.idFuncional
            	},{
            		xtype: 'textareafield',
            		fieldLabel: 'Descripcion',
                	name: 'descripcion',
                	allowBlank:false,
                	value: selection.data.descripcion
            	},{
                	fieldLabel: 'Responsable',
                	name: 'responsable',
                	allowBlank:false,
                	value: selection.data.responsable
            	},{
                	fieldLabel: 'Participantes',
                	name: 'participantes',
                	allowBlank:false,
                	value: selection.data.participantes
            	},{
                	fieldLabel: 'Recursos',
                	name: 'recursos',
                	value: selection.data.recursos
            	}
            	,{
            		xtype:          'combo',
            		id:				'OTCombo',
                    value: 			selection.data.idOT,
                    triggerAction:  'all',
                    forceSelection: true,
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
                    store: comboStore
                }, 
                {
                	xtype:          'combo',
                	id: 			'seccionCombo',
                    value:          '-1',
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
                    	autoload:true,
                    	proxy: {
                        	type: 'ajax',
                        	url: 'seccionesJson'
                    	}
                    })
                },{
                	xtype:          'combo',
                    mode:           'local',
                    value:		    selection.data.observacionId.toString(),
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    fieldLabel:     'Observacion',
                    name:           'observacion',
                    displayField:   'descripcion',
                    valueField:     'id',
                    queryMode: 'local',
                    store:          Ext.create('Ext.data.Store', {
                        fields : ['descripcion', 'id'],
                        autoload:true,
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
                        	allowBlank:false,
                        	value: selection.data.fechaInicio
                    	},{
                    		xtype: 'datefield',
                    		fieldLabel: 'Fecha Final',
                        	name: 'fechaFinal',
                        	allowBlank:false,
                        	value: selection.data.fechaFinal
                    	}
                    ]
            	}
        	],
	        buttons: [{
	            text: 'Editar',
	            handler: function() {
	                var form = this.up('form').getForm();
	                if (form.isValid()) {
	                    form.submit({
	                    	params: {
                                id: selection.data.id
                             },
	                        success: function(form, action) {
	                        	Ext.MessageBox.show({
	                                title:'Exito',
	                                msg: action.result.msg,
	                                buttons: Ext.MessageBox.OK,
	                                icon: Ext.MessageBox.INFO
	                            });	
	                           win.close();
	                           Ext.getCmp('treePanel').getStore().load();
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
	        	{
	            	text: 'Cancelar',
	           		handler: function (){
			        	simple.getForm().reset();
	   					win.close();
	            	}
	        	}
	        ]
	    });

		var win = new Ext.Window({
	        title: 'Editar Actividad',
	        modal: true,
	        closable:true,
	        width:560,
	        height:450,
	        plain:true,
	        layout: 'fit',

	        items: [simple]
	    });

	    win.show(this); 
		}
		else{
			Ext.MessageBox.show({
	        	title: 'Advertencia',
	        	msg: 'Debe seleccionar una actividad a editar',
	        	icon: Ext.MessageBox.WARNING,
	        	buttons: Ext.Msg.OK
	     	});
		}
	}