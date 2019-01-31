package responses;

import java.util.ArrayList;
import java.util.List;

import models.AreaResultadoClave;
import models.ObjetivoEstrategico;
import models.ObjetivoTrabajo;
import models.SeccionActividades;
import models.ActividadAnual;

public class PlanAnualResponse {
	public List<AreaResultadoClave> area;
	public List<ObjetivoEstrategico> objetivosE;
	public List<ObjetivoTrabajo> objetivosT;
	public List<ActividadAnual> tareas;
	public List<SeccionActividades> secciones;
	public String substring;
	public  String anho;
	
	public PlanAnualResponse(String anho,List<AreaResultadoClave> area, List<ObjetivoEstrategico> objetivosE,List<ObjetivoTrabajo> objetivosT,
								List<ActividadAnual> tareas, List<SeccionActividades> secciones){
		this.anho=anho;
		this.area=area;
		this.objetivosE=objetivosE;
		this.objetivosT=objetivosT;
		this.tareas=getTareasAtYear(anho, tareas);
		this.secciones=secciones;
	}
	
	public List<ActividadAnual> getTareasAtYear(String anho, List<ActividadAnual> tareas){
		List<ActividadAnual> result= new ArrayList<ActividadAnual>();
		for(ActividadAnual t: tareas){
			substring=t.fechaInicio.substring(6,10);
			if(t.fechaInicio.substring(6,10).equals(anho))
				result.add(t);
		}
		return result;
	}

}
