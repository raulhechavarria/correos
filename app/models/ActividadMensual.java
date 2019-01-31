package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="actividadAnual")
public class ActividadMensual extends Model {
	
	public int numero;
	public String fecha;
	public String hora;
	public String lugar;
	public String descripcion;
	public String participantes;
	@ManyToOne
	public PlanMensual planMensual;
	
	
	public ActividadMensual(int numero, String fecha, String hora, String lugar,
			String descripcion, String participantes, PlanMensual planMensual) {
		this.numero=numero;
		this.fecha = fecha;
		this.hora = hora;
		this.lugar = lugar;
		this.descripcion = descripcion;
		this.participantes = participantes;
		this.planMensual = planMensual;
	}
	
}
