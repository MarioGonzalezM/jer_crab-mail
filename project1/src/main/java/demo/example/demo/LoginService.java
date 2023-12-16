package demo.example.demo;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

	private Map<String,String> registers = new HashMap<>();
	
	
	public  String authenticate(String username, String password) {
		
        if(!this.registers.containsKey(username)) 
        {
        	return "Usuario no encontrado";
        }
        if(this.registers.get(username).equals(password))
        {
        	return "Login Exitoso";
        }else {
        
        return "Contraseña incorrecta";
        }
    }
	
	public Map<String,String> getRegisters()
	{
		return this.registers;
	}
	public void addRegisters(String username,String password) 
	{
		this.registers.put(username, password);
	}
}
