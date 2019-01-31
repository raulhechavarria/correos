package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="dpto")
public class Dpto extends Model {
    public String dpto;
    public String jefeDpto;

    public Dpto(String dpto, String jefeDpto) {
		this.dpto = dpto;
		this.jefeDpto = jefeDpto;
	}
    
    
}
