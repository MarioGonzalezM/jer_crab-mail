package demo.example.demo;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketGame extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();

    private int onlineUsers = 0;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        sessions.add(session);
        session.sendMessage(new TextMessage("Mi id es: "+session.getId() + ":" + onlineUsers));
        onlineUsers++;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Message received: " +
                message.getPayload()+"id cliente "+ session.getId());
        String msg = message.getPayload();

        for(int i=0;i<sessions.size();i++)
        {
            sessions.get(i).sendMessage(new TextMessage(session.getId() + ":" + msg));
        }

    }


}
