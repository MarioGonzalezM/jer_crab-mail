package demo.example.demo;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private Map<String,String> registers = new HashMap<>();
	
	
	public  ResponseEntity authenticateLogin(String username, String password) {
		
        if(!this.registers.containsKey(username)) 
        {
        	return ResponseEntity.ok("Usuario no encontrado");
        }
        if(this.registers.get(username).equals(password))
        {
        	return ResponseEntity.ok("Login exitoso");
        }else {
        
        	return ResponseEntity.ok("Contraseña incorrecta");
        }
    }
	public ResponseEntity authenticateRegister(String username, String password) 
	{
	  if(!registers.containsKey(username))	
        {
        	addRegisters(username, password);      	
        	return ResponseEntity.ok("Registro exitoso");
        }      	
       return ResponseEntity.ok("Usuario ya registrado");
		
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
