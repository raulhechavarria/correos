package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="seccion_actividades")
public class SeccionActividades extends Model {
	public String idFuncional;
    public String descripcion;

	public SeccionActividades(String idFuncional, String seccion) {
		this.idFuncional=idFuncional;
		this.descripcion = seccion;
	}
	
	public void setSeccion(String idFuncional, String seccion) {
		this.idFuncional=idFuncional;
		this.descripcion = seccion;
	}
    
    
}
