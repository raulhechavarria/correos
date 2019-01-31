package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="anho_Plan")
public class AnhoPlan extends Model {
	public int anho;

	public AnhoPlan(int anho) {
		this.anho = anho;
	}
}
