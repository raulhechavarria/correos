package models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
@Table(name="objetivo_estrategico")
public class ObjetivoEstrategico extends Model {
	public String idFuncional;
	public String descripcion;
	@ManyToOne
	public AreaResultadoClave area;
	@ManyToOne
	public AnhoPlan anho;
	
	public ObjetivoEstrategico(String idFuncional, String descripcion, AreaResultadoClave area, AnhoPlan anho) {
		this.idFuncional = idFuncional;
		this.descripcion = descripcion;
		this.anho=anho;
		this.area = area;
	}
	
	public void setObjetivoEstrategico(String idFuncional, String descripcion, AreaResultadoClave area, AnhoPlan anho){
		this.idFuncional = idFuncional;
		this.descripcion = descripcion;
		this.anho=anho;
		this.area = area;
	}
	
}
