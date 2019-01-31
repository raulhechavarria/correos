package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
@Table(name="objetivo_trabajo")
public class ObjetivoTrabajo extends Model {
    
	public String idFuncional;
	public String descripcion;
	public String fechaInicio;
	public String fechaFinal;
    public String responsable;
    @ManyToOne
    public ObjetivoEstrategico objetivoEstrategico;
    
	public ObjetivoTrabajo(String idFuncional, String descripcion, String fechaInicio, String fechaFinal,
			 String responsable, ObjetivoEstrategico objetivoEstrategico) {
		this.idFuncional = idFuncional;
		this.descripcion = descripcion;
		this.fechaInicio=fechaInicio;
		this.fechaFinal=fechaFinal;
		this.responsable = responsable;
		this.objetivoEstrategico = objetivoEstrategico;
	}
    
	public void setObjetivoTrabajo(String idFuncional, String descripcion, String fechaInicio, String fechaFinal,
			 String responsable, ObjetivoEstrategico objetivoEstrategico) {
		this.idFuncional = idFuncional;
		this.descripcion = descripcion;
		this.fechaInicio=fechaInicio;
		this.fechaFinal=fechaFinal;
		this.responsable = responsable;
		this.objetivoEstrategico = objetivoEstrategico;
	}
    
}
