package controllers;

import static pdf.RenderPDF.renderPDF;

import java.util.List;

import models.ActividadAnual;
import models.ActividadMensual;
import models.AnhoPlan;
import models.AreaResultadoClave;
import models.ObjetivoEstrategico;
import models.ObjetivoTrabajo;
import models.ObservacionCumplimiento;
import models.PlanMensual;
import models.SeccionActividades;
import play.mvc.Controller;
import responses.PlanAnualResponse;
import responses.ResponseDTO;

public class AmbienteControl extends Controller {

    public static void index() {
        render();
    }
    public static void planAnual(){
    	render();
    }
    
    public static void planMensual(){
    	render();
    }
    
    public static void generatePlanAnualPDF(){
    	ActividadAnual tarea= ActividadAnual.findById(1L);
    	renderPDF(tarea);
    }
    
    public static void planAnualJson(Long anho){
    	if(!params._contains("anho")){
    		anho=1L;
    	}
    	AnhoPlan anhoModel= AnhoPlan.findById(anho);
    	List<AreaResultadoClave> area= AreaResultadoClave.findAll();
    	List<SeccionActividades> secciones= SeccionActividades.findAll();
    	List<ObjetivoEstrategico> objetivosE= ObjetivoEstrategico.find("anho.id=?", anho).fetch();
    	List<ObjetivoTrabajo> objetivosT= ObjetivoTrabajo.findAll();
    	List<ActividadAnual> tareaAnual= ActividadAnual.findAll();
    	
    	PlanAnualResponse response= new PlanAnualResponse(Integer.toString(anhoModel.anho),area, objetivosE, objetivosT, 
    			tareaAnual, secciones);
    	render(response);
    }
    
    public static void planMensualJson(Long anho, String mes, Long dptoId){
    	List<ActividadMensual> actividades= ActividadMensual.find(
    			"planMensual.anho.id=? and planMensual.mes like ? and planMensual.dpto.id=?" 
    			, anho, mes, dptoId).fetch();
    	render(actividades);
    }
    
    public static void objetivosTrabajoJson(Long anhoId){
    	List<ObjetivoTrabajo> objetivosT=ObjetivoTrabajo.find("objetivoEstrategico.anho.id=?", anhoId).fetch();
    	render(objetivosT);
    }
    public static void objetivosEstrategicosJson(Long anhoId){
    	List<ObjetivoEstrategico> objetivosE=ObjetivoEstrategico.find("anho.id=?", anhoId).fetch();
    	render(objetivosE);
    }
    
    public static void areasJson(){
    	List<AreaResultadoClave> areas=AreaResultadoClave.findAll();
    	renderJSON(areas);
    }
    public static void seccionesJson(){
    	List<SeccionActividades> secciones=SeccionActividades.findAll();
    	renderJSON(secciones);
    }
    public static void anhosJson(){
    	List<AnhoPlan> anhos=AnhoPlan.findAll();
    	renderJSON(anhos);
    }
    public static void addActividad(String idFuncional, String descripcion, String responsable, String participantes,
    		String recursos, Long objetivoT, Long seccion, Long observacion, String fechaInicio, String fechaFinal){
    	
    	ActividadAnual tarea;
    	//validando que no me inserten una tarea que ya existe
    	if(ActividadAnual.find("idFuncional=?", idFuncional).first()!=null){
    		renderJSON(new ResponseDTO(false, "Esta actividad ya esta insertada en la Base de Datos"));
    	}
    	
    	//salvando tareas que esten dentro de un OT
    	if(params._contains("objetivoT")){
    		ObjetivoTrabajo objetivo= ObjetivoTrabajo.findById(objetivoT);
        	tarea= new ActividadAnual(idFuncional, descripcion,
        				fechaInicio, fechaFinal, responsable, participantes, recursos, objetivo);
        	if(observacion!=-1){
        		tarea.setObservacion((ObservacionCumplimiento)ObservacionCumplimiento.findById(observacion));
        	}
        	tarea.save();
        	renderJSON(new ResponseDTO(true, "La actividad fue anhadida satisfactoriamente"));
    	}
    	
    	//salvando tareas que esten dentro de una Seccion
    	if(params._contains("seccion")){
    		SeccionActividades seccionAct= SeccionActividades.findById(seccion);
        	tarea= new ActividadAnual(idFuncional, descripcion,
        				fechaInicio, fechaFinal, responsable, participantes, recursos, seccionAct);
        	if(observacion!=-1){
        		tarea.setObservacion((ObservacionCumplimiento)ObservacionCumplimiento.findById(observacion));
        	}
        	tarea.save();
        	renderJSON(new ResponseDTO(true, "La actividad fue anhadida satisfactoriamente"));
    	}
    	 
    }
    
    public static void editActividad(Long id, String idFuncional, String descripcion, String responsable, String participantes,
    		String recursos, Long objetivoT, Long seccion, Long observacion, String fechaInicio, String fechaFinal){
    	
    	ActividadAnual tarea=ActividadAnual.findById(id);
    	//validando que no me inserten una tarea que ya existe
    	if(!(tarea.idFuncional.equals(idFuncional)) && ActividadAnual.find("idFuncional=?", idFuncional).first()!=null){
    		renderJSON(new ResponseDTO(false, "Esta actividad ya esta insertada en la Base de Datos"));
    	}
    	
    	//salvando tareas que esten dentro de un OT
    	if(params._contains("objetivoT")){
    		ObjetivoTrabajo objetivo= ObjetivoTrabajo.findById(objetivoT);
        	tarea.setValuesWithOT(idFuncional, descripcion,
        				fechaInicio, fechaFinal, responsable, participantes, recursos, objetivo);
        	if(observacion!=-1){
        		tarea.setObservacion((ObservacionCumplimiento)ObservacionCumplimiento.findById(observacion));
        	}
    	}
    	
    	//salvando tareas que esten dentro de una Seccion
    	if(params._contains("seccion")){
    		SeccionActividades seccionAct= SeccionActividades.findById(seccion);
        	tarea.setValuesWithSeccion(idFuncional, descripcion,
        			fechaInicio, fechaFinal, responsable, participantes, recursos, seccionAct);
        	if(observacion!=-1){
        		tarea.setObservacion((ObservacionCumplimiento)ObservacionCumplimiento.findById(observacion));
        	}
    	}
    	tarea.save();
    	renderJSON(new ResponseDTO(true, "La actividad fue modificada satisfactoriamente"));
    }
    
    public static void deleteActividad(Long id){
    	ActividadAnual tarea= ActividadAnual.findById(id);
    	try{
    		tarea.delete();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO("Error al eliminar la actividad. Inténtelo nuevamente",false));
    	}
    	renderJSON(new ResponseDTO("La actividad fue eliminada satisfactoriamente",true));
    }
    
    public static void addObjetivoE(String idFuncional, String descripcion, String areaDescripcion, int anho){
    		AreaResultadoClave areaModel= AreaResultadoClave.find("descripcion like ?", areaDescripcion).first();
    		System.out.println(areaModel.id);
    		AnhoPlan anhoModel= AnhoPlan.find("anho=?", anho).first();
    		System.out.println(anhoModel.id);
    		//validando que no me inserten un objetivo que ya existe
        	if(ObjetivoEstrategico.find("idFuncional=?", idFuncional).first()!=null){
        		renderJSON(new ResponseDTO(false, "Este objetivo ya esta insertado en la Base de Datos"));
        	}
        	ObjetivoEstrategico objetivo= new ObjetivoEstrategico(idFuncional, descripcion, areaModel, anhoModel);
        	try{
        		objetivo.save();
        	}catch (Exception e){
        		renderJSON(new ResponseDTO(false,"Error al anhadir el objetivo. Inténtelo nuevamente"));
        	}
        	renderJSON(new ResponseDTO(true, "El objetivo estrategico fue anhadido satisfactoriamente"));
    }
    
    public static void editObjetivoE(Long id, String idFuncional, String descripcion, String areaDescripcion, int anho){
    	ObjetivoEstrategico objetivo= ObjetivoEstrategico.findById(id);
    	AreaResultadoClave areaModel= AreaResultadoClave.find("descripcion like ?", areaDescripcion).first();
		AnhoPlan anhoModel= AnhoPlan.find("anho = ?", anho).first();
		
		//validando que no me inserten un objetivo que ya existe
    	if(!(objetivo.idFuncional.equals(idFuncional)) && ObjetivoEstrategico.find("idFuncional=?", idFuncional).first()!=null){
    		renderJSON(new ResponseDTO(false, "Este objetivo ya esta insertado en la Base de Datos"));
    	}
		objetivo.setObjetivoEstrategico(idFuncional, descripcion, areaModel, anhoModel);
		try{
    		objetivo.save();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO(false,"Error al editar el objetivo. Inténtelo nuevamente"));
    	}
    	renderJSON(new ResponseDTO(true, "El objetivo estrategico fue modificado satisfactoriamente"));
    }
    
    public static void deleteObjetivoE(Long id){
    	ObjetivoEstrategico objetivo= ObjetivoEstrategico.findById(id);
    	try{
    		objetivo.delete();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO("Error al eliminar el objetivo. Inténtelo nuevamente",false));
    	}
    	renderJSON(new ResponseDTO("El objetivo fue eliminado satisfactoriamente",true));
    }
    
    public static void addObjetivoT(String idFuncional, String descripcion, String responsable, 
    			String idFuncionalOE, String fechaInicio, String fechaFinal){
		ObjetivoEstrategico objetivoE= ObjetivoEstrategico.find("idFuncional like ?", idFuncionalOE).first();
		System.out.println(objetivoE.id);
		//validando que no me inserten un objetivo que ya existe
    	if(ObjetivoTrabajo.find("idFuncional=?", idFuncional).first()!=null){
    		renderJSON(new ResponseDTO(false, "Este objetivo ya esta insertado en la Base de Datos"));
    	}
    	ObjetivoTrabajo objetivo= new ObjetivoTrabajo(idFuncional, descripcion, fechaInicio, fechaFinal,
    			responsable, objetivoE);
    	try{
    		objetivo.save();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO(false,"Error al anhadir el objetivo. Inténtelo nuevamente"));
    	}
    	renderJSON(new ResponseDTO(true, "El objetivo de trabajo fue anhadido satisfactoriamente"));
    }

    public static void editObjetivoT(Long id, String idFuncional, String descripcion, String responsable, 
			String idFuncionalOE, String fechaInicio, String fechaFinal){
    	ObjetivoTrabajo objetivo= ObjetivoTrabajo.findById(id);
    	ObjetivoEstrategico objetivoE= ObjetivoEstrategico.find("idFuncional like ?", idFuncionalOE).first();
	
		//validando que no me inserten un objetivo que ya existe
		if(!(objetivo.idFuncional.equals(idFuncional)) && ObjetivoTrabajo.find("idFuncional like ?", idFuncional).first()!=null){
			renderJSON(new ResponseDTO(false, "Este objetivo ya esta insertado en la Base de Datos"));
		}
		objetivo.setObjetivoTrabajo(idFuncional, descripcion, fechaInicio, fechaFinal,responsable, objetivoE);
		try{
			objetivo.save();
		}catch (Exception e){
			renderJSON(new ResponseDTO(false,"Error al editar el objetivo. Inténtelo nuevamente"));
		}
		renderJSON(new ResponseDTO(true, "El objetivo de trabajo fue modificado satisfactoriamente"));
    }

    public static void deleteObjetivoT(Long id){
    	ObjetivoTrabajo objetivo= ObjetivoTrabajo.findById(id);
    	try{
    		objetivo.delete();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO("Error al eliminar el objetivo. Inténtelo nuevamente",false));
    	}
    	renderJSON(new ResponseDTO("El objetivo fue eliminado satisfactoriamente",true));
    }	
    
    public static void addSeccion(String idFuncional, String descripcion){

    	//validando que no me inserten una seccion que ya existe
    	if(SeccionActividades.find("idFuncional like ?", idFuncional).first()!=null){
    		renderJSON(new ResponseDTO(false, "Esta seccion ya esta insertada en la Base de Datos"));
    	}
    	SeccionActividades seccion= new SeccionActividades(idFuncional, descripcion);
    	try{
    		seccion.save();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO(false,"Error al anhadir la seccion. Inténtelo nuevamente"));
    	}
    	renderJSON(new ResponseDTO(true, "La seccion fue anhadida satisfactoriamente"));
    }

    public static void editSeccion(Long id, String idFuncional, String descripcion){
    	SeccionActividades seccion= SeccionActividades.findById(id);

    	//validando que no me inserten una seccion que ya existe
    	if(!(seccion.idFuncional.equals(idFuncional)) && SeccionActividades.find("idFuncional like ?", idFuncional).first()!=null){
    		renderJSON(new ResponseDTO(false, "Esta seccion ya esta insertada en la Base de Datos"));
    	}
    	seccion.setSeccion(idFuncional, descripcion);
    	try{
    		seccion.save();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO(false,"Error al editar la seccion. Inténtelo nuevamente"));
    	}
    	renderJSON(new ResponseDTO(true, "La seccion fue modificada satisfactoriamente"));
    }

    public static void deleteSeccion(Long id){
    	SeccionActividades seccion= SeccionActividades.findById(id);
    	try{
    		seccion.delete();
    	}catch (Exception e){
    		renderJSON(new ResponseDTO("Error al eliminar la seccion. Inténtelo nuevamente",false));
    	}
    	renderJSON(new ResponseDTO("La seccion fue eliminada satisfactoriamente",true));
    }	
}
