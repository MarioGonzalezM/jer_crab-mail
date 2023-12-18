package demo.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
	
	private List<String> textosChat = new ArrayList<>();

	 @PostMapping("/envioTexto")
	public ResponseEntity<String> login(@RequestBody String mensaje) {
		 textosChat.add(mensaje);
		 return ResponseEntity.ok("Mensaje incluido con exito en el chat");
	}

	@GetMapping("/recargarChat")
	public List<String> recargar() {
		return textosChat;
	}
}

