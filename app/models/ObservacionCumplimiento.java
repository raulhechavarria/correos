package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="observacion_cumplimiento")
public class ObservacionCumplimiento extends Model {
    public String observacion;

	public ObservacionCumplimiento(String observacion) {
		this.observacion = observacion;
	}
    
    
}
