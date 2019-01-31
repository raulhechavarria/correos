package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="rol")
public class Rol extends Model {
	public String rol;

	public Rol(String rol) {
		this.rol = rol;
	}
}
