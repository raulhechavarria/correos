package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import play.db.jpa.Model;

@Entity
@Table(name="plan_mensual")
public class PlanMensual extends Model {
	
	public String mes;
	public AnhoPlan anho;
	@ManyToOne
	public Dpto dpto;
	
	public PlanMensual(String mes, AnhoPlan anho, Dpto dpto) {
		this.mes = mes;
		this.anho = anho;
		this.dpto = dpto;
	}
	
	
}
