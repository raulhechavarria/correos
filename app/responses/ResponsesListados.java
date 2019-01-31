package responses;

import java.util.List;

import com.google.gson.Gson;

import play.db.jpa.Model;

public class ResponsesListados {
	List<Model> genericList;

	public ResponsesListados(List<Model> genericList) {
		this.genericList = genericList;
	}
	
	public String toString(){
		return new Gson().toJson(this);
	}
}
