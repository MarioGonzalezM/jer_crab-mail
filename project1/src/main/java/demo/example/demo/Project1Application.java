package demo.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Project1Application  implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(
			WebSocketHandlerRegistry registry) {
		registry.addHandler(gameHandler(), "/juego")
				.setAllowedOrigins("*");
	}
	@Bean
	public WebSocketGame gameHandler() {
		return new WebSocketGame();
	}
	public static void main(String[] args)
	{
		SpringApplication.run(Project1Application.class, args);
	}

}
