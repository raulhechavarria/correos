package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="area_resultado_clave")
public class AreaResultadoClave extends Model {
	public String idFuncional;
	public String descripcion;

	public AreaResultadoClave(String idFuncional, String descripcion) {
		this.idFuncional=idFuncional;
		this.descripcion = descripcion;
	}
	
	
    
}
