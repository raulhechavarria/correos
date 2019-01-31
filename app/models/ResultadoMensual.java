package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="resultado_mensual")
public class ResultadoMensual extends Model {
    public String responsable;
    public String resultado;
    public PlanMensual planMensual;
	
    public ResultadoMensual(String responsable, String resultado,
			PlanMensual planMensual) {
		this.responsable = responsable;
		this.resultado = resultado;
		this.planMensual = planMensual;
	}
    
    
}
