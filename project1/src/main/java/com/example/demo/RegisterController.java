package com.example.demo;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {

    private LoginService authService;
    public RegisterController(LoginService authService) {
        
    	this.authService = authService;
    }
    
    @PostMapping("/register") 
    public String register(@RequestBody LoginRequest loginRequest) {
        
    	String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();  
        
       Map<String,String> d = this.authService.getRegisters();
       
        if(!d.containsKey(username))	
        {
        	authService.addRegisters(username, password);
        	System.out.println("Registro exitoso");
        return "Registro exitoso";
       }
        System.out.println("Usuario ya registrado");
        return "Usuario ya registrado";
    
    }
	
}
