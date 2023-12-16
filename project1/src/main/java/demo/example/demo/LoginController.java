package demo.example.demo;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

@RestController

public class LoginController{

    private LoginService authService;
    
    public LoginController(LoginService authService) {
        this.authService = authService;
        this.authService.addRegisters("lenin", "guapo");
    }

    @PostMapping("/login") 
    public String login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        
         String loginStatus = authService.authenticate(username, password);
         System.out.println("resultado : " + loginStatus);
        return loginStatus;
    }
}
