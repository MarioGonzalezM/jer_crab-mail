package demo.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class UserController{

    private UserService userService;
    private LoginRequest currentUser;
    
    public UserController(UserService userService) {
        this.userService = new UserService();     
        this.currentUser = new LoginRequest();
    }

    @PostMapping("/login") 
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
       
        ResponseEntity loginStatus = userService.authenticateLogin(username, password);
        if(loginStatus.equals(ResponseEntity.ok("Login exitoso"))) 
        {
        	 currentUser.setUsername(username);
             currentUser.setPassword(password);
        }      
        return loginStatus;
    }
    
    @GetMapping("/listaUsuarios")
    public List<String> showUsers()
    {
    	Map<String,String> d = this.userService.getRegisters();
    	List<String> userList = new ArrayList<>(d.keySet());
    	return userList;
    	
    }
    
    @PostMapping("/register") 
    public ResponseEntity register(@RequestBody LoginRequest loginRequest) {
        
    		String username = loginRequest.getUsername();
        	String password = loginRequest.getPassword();  
        
        	Map<String,String> d = this.userService.getRegisters();
       
        	ResponseEntity registerStatus = userService.authenticateRegister(username, password);
        	return registerStatus;
    
    }
    
    @PutMapping("/actualizar")
    public ResponseEntity updatePassword(@RequestBody LoginRequest passwords)
    {
    	Map<String,String> d = this.userService.getRegisters();
    	String currentPassword = passwords.getUsername();
    	String newPassword = passwords.getPassword();
    	
    	if(d.get(currentUser.getUsername()).equals(currentPassword)) 
    	{
    		d.put(currentUser.getUsername(),newPassword);
    		currentUser.setPassword(newPassword);    		
    		return ResponseEntity.ok("Contraseña actualizada");
    	}    	
    	return ResponseEntity.ok("Contraseña actual invalida");
    	
    }
    
    @DeleteMapping("/borrarCuenta")
    public ResponseEntity deleteUser() 
    {   	
    	Map<String,String> d = this.userService.getRegisters();
    	d.remove(currentUser.getUsername());
    	this.currentUser = new LoginRequest();
    	return ResponseEntity.ok("Usuario borrado");
    }
}
