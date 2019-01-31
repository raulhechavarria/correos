package models;

import play.*;
import play.db.jpa.*;

import javax.persistence.*;

import java.util.*;

@Entity
@Table(name="usuario")
public class Usuario extends Model {
    public String usuario;
    public String contrasenha;
    @ManyToOne
    public Rol rol;
    
	public Usuario(String usuario, String contrasenha, Rol rol) {
		this.usuario = usuario;
		this.contrasenha = contrasenha;
		this.rol = rol;
	}
    
    
}
