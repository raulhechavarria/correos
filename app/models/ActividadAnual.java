package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="actividadAnual")
public class ActividadAnual extends Model {
	
	public String idFuncional;
	public String descripcion;
	public String fechaInicio;
	public String fechaFinal;
	public String responsable;
	public String participantes;
	public String recursos;
	@ManyToOne
	public ObjetivoTrabajo objetivoTrabajo;
	@ManyToOne
	public ObservacionCumplimiento observacion;
	@ManyToOne
	public SeccionActividades seccion;
	
	public ActividadAnual(String idFuncional, String tarea, String fechaInicio, String fechaFinal, 
			String responsable, String participantes, String recursos, ObjetivoTrabajo objetivoTrabajo) {
		this.idFuncional=idFuncional;
		this.descripcion = tarea;
		this.fechaInicio=fechaInicio;
		this.fechaFinal=fechaFinal;
		this.responsable = responsable;
		this.participantes=participantes;
		this.recursos = recursos;
		this.objetivoTrabajo = objetivoTrabajo;
	}

	public ActividadAnual(String idFuncional, String tarea, String fechaInicio, String fechaFinal, 
				String responsable, String participantes,	String recursos, SeccionActividades seccion) {
		this.idFuncional=idFuncional;
		this.descripcion = tarea;
		this.fechaInicio=fechaInicio;
		this.fechaFinal=fechaFinal;
		this.responsable = responsable;
		this.participantes=participantes;
		this.recursos = recursos;
		this.seccion = seccion;
	}
    
	public void setObservacion(ObservacionCumplimiento observacion){
		this.observacion=observacion;
	}
	
	public void setValuesWithSeccion(String idFuncional, String tarea, String fechaInicio, String fechaFinal, 
			String responsable, String participantes,	String recursos, SeccionActividades seccion) {
		this.idFuncional=idFuncional;
		this.descripcion = tarea;
		this.fechaInicio=fechaInicio;
		this.fechaFinal=fechaFinal;
		this.responsable = responsable;
		this.participantes=participantes;
		this.recursos = recursos;
		this.seccion = seccion;
		this.objetivoTrabajo=null;
		this.observacion=null;
	}
	
	public void setValuesWithOT(String idFuncional, String tarea, String fechaInicio, String fechaFinal, 
			String responsable, String participantes, String recursos, ObjetivoTrabajo objetivoTrabajo) {
		this.idFuncional=idFuncional;
		this.descripcion = tarea;
		this.fechaInicio=fechaInicio;
		this.fechaFinal=fechaFinal;
		this.responsable = responsable;
		this.participantes=participantes;
		this.recursos = recursos;
		this.objetivoTrabajo = objetivoTrabajo;
		this.seccion=null;
		this.observacion=null;
	}
	
}
