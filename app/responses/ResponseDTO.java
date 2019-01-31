package responses;

import java.util.List;


import com.google.gson.Gson;


public class ResponseDTO {

	public boolean success;
	public String msg;
	public String responseText;
	
	public ResponseDTO(boolean success, String msg) {
		super();
		this.success = success;
		this.msg = msg;
	}
	
	public ResponseDTO(String responseText, boolean success) {
		super();
		this.success = success;
		this.responseText = responseText;
	}
	
	public String toJson(){
		return new Gson().toJson(this);
	}
	
}
