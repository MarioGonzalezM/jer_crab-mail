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
    
    public UserController(UserService userService) {
        this.userService = new UserService();
    }

    @PostMapping("/login") 
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
       
        ResponseEntity loginStatus = userService.authenticateLogin(username, password);
        return loginStatus;
    }
    
    @GetMapping("/listaUsuarios")
    public List<String> showUsers()
    {
        return new ArrayList<>(this.userService.getRegisters().keySet());
    	
    }
    
    @PostMapping("/register") 
    public ResponseEntity register(@RequestBody LoginRequest loginRequest) {
        
    		String username = loginRequest.getUsername();
        	String password = loginRequest.getPassword();  
        
        	var d = this.userService.getRegisters();

        return userService.authenticateRegister(username, password);
    
    }
    
    @PutMapping("/actualizar")
    public ResponseEntity updatePassword(@RequestBody UpdatePasswordRequest request)
    {
    	if(this.userService.checkPassword(request.getUsername(), request.getOldPassword()))
    	{
    		this.userService.updatePassword(request.getUsername(),request.getNewPassword());
    		return ResponseEntity.ok("actualizada");
    	}    	
    	return ResponseEntity.ok("Contraseña actual invalida");
    	
    }
    
    @DeleteMapping("/borrarCuenta")
    public ResponseEntity deleteUser(@RequestBody LoginRequest request)
    {   	
    	this.userService.delete(request.getUsername());
    	return ResponseEntity.ok("Usuario borrado");
    }
}
