

function onDetailActivities(btn, ev) {
	var selection = Ext.getCmp('treePanel').getSelectionModel().getSelection()[0];
	if(selection.data.idOT!=-1){
		var simple = Ext.create('Ext.form.Panel', {
			width: 275,
		    height: 120,
		    frame:true,
		    bodyPadding: 10,
		    items: [{
		    	xtype: 'displayfield',
		        fieldLabel: 'Numero',
		        name: 'idFuncional',
		        value: selection.data.idFuncional
		    },{
		        xtype: 'displayfield',
		        fieldLabel: 'Descripcion',
		        name: 'descripcion',
		        value: selection.data.descripcion
		    },
		    {
		    	xtype: 'displayfield',
		        fieldLabel: 'Fecha Inicio',
		        name: 'fechaInicio',
		        value: selection.data.fechaInicio
		    }, {
		        xtype: 'displayfield',
		        fieldLabel: 'Fecha Final',
		        name: 'fechaFinal',
		        value: selection.data.fechaFinal
		    }, {
		        xtype: 'displayfield',
		        fieldLabel: 'Responsable',
		        name: 'responsable',
		        value: selection.data.responsable
		     }, {
		        xtype: 'displayfield',
		        fieldLabel: 'Participantes',
		        name: 'participantes',
		        value: selection.data.participantes
		     },
		     {
			     xtype: 'displayfield',
			     fieldLabel: 'Recursos',
			     name: 'recursos',
			     value: selection.data.recursos
			 },
			 {
			 	 xtype: 'displayfield',
		 	     fieldLabel: 'Objetivo Trabajo',
		 	     name: 'OTDescripcion',
		 	     value: selection.data.OTDescripcion
			 },
		     {
		 	    xtype: 'displayfield',
	 	        fieldLabel: 'Cumplimiento',
	 	        name: 'observacionId',
	 	        value: selection.data.observacionDescripcion
		 	 }, 
		     ]
		});
	}
	
	if(selection.data.seccionId!=-1){
		var simple = Ext.create('Ext.form.Panel', {
			width: 275,
		    height: 120,
		    frame:true,
		    bodyPadding: 10,
		    items: [{
		    	xtype: 'displayfield',
		        fieldLabel: 'Numero',
		        name: 'idFuncional',
		        value: selection.data.idFuncional
		    },{
		        xtype: 'displayfield',
		        fieldLabel: 'Descripcion',
		        name: 'descripcion',
		        value: selection.data.descripcion
		    },
		    {
		    	xtype: 'displayfield',
		        fieldLabel: 'Fecha Inicio',
		        name: 'fechaInicio',
		        value: selection.data.fechaInicio
		    }, {
		        xtype: 'displayfield',
		        fieldLabel: 'Fecha Final',
		        name: 'fechaFinal',
		        value: selection.data.fechaFinal
		    }, {
		        xtype: 'displayfield',
		        fieldLabel: 'Responsable',
		        name: 'responsable',
		        value: selection.data.responsable
		     }, {
		        xtype: 'displayfield',
		        fieldLabel: 'Participantes',
		        name: 'participantes',
		        value: selection.data.participantes
		     },
		     {
			     xtype: 'displayfield',
			     fieldLabel: 'Recursos',
			     name: 'recursos',
			     value: selection.data.recursos
			 },
			 {
			 	 xtype: 'displayfield',
		 	     fieldLabel: 'Seccion',
		 	     name: 'seccionDescripcion',
		 	     value: selection.data.seccionDescripcion
			 },
		     {
		 	    xtype: 'displayfield',
	 	        fieldLabel: 'Cumplimiento',
	 	        name: 'observacionId',
	 	        value: selection.data.observacionDescripcion
		 	 }, 
		     ]
		});
	}
	var win = new Ext.Window({
		title: 'Detalles Actividad',
	    modal: true,
	    closable:true,
	    width:360,
	    height:300,
	    plain:true,
	    layout: 'fit',
	    items: [simple]
	});
    win.show(this); 
};
