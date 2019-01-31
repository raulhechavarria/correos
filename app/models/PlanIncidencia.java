package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import org.joda.time.DateTime;

import java.util.*;

@Entity
@Table(name="usuario")
public class PlanIncidencia extends Model {
    public Date fecha;
    public Date hora;
    public String lugar;
    public String actividad;
    public String praticipantes;
    public String entregarA;
    public String responsables;
    public String titulo;
    @ManyToOne
    public TipoIncidencia tipoIncidencia;
    
    
}
