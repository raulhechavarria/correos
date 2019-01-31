function onDeleteActivities(btn, ev){
    	var selection = Ext.getCmp('treePanel').getSelectionModel().getSelection()[0];
        if (selection && selection.data.id!=0){
            Ext.MessageBox.confirm('Confirmar', 'Esta usted seguro que desea eliminar la actividad?',
           		function showResult(btn){			            		
	            	if(btn == 'yes'){
	            		 Ext.Ajax.request({
                             url: 'deleteActividad',
                             params: {
                                id: selection.data.id
                             },
                             success: function (response, options) {
                                if(Ext.decode(response.responseText).success == true){
                                   Ext.Msg.alert('Exito', Ext.decode(response.responseText).responseText);	
                                   Ext.getCmp('treePanel').getStore().load();
                                }
                                else{
                                	Ext.Msg.alert('Fallo', Ext.decode(response.responseText).responseText);
                                }
                             },
                          });
	            	}
			    }
			);
          }else{
          	Ext.MessageBox.show({
	        	title: 'Advertencia',
	            msg: 'Debe seleccionar una actividad a eliminar',
	            icon: Ext.MessageBox.WARNING,
	            buttons: Ext.Msg.OK
	        });
          }  
    }