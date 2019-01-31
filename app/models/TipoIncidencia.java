package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="tipo_incidencia")
public class TipoIncidencia extends Model {
	public String tipo;

	public TipoIncidencia(String tipo) {
		this.tipo = tipo;
	}
    
}
