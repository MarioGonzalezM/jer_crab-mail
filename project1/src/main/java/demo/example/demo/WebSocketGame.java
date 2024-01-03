package demo.example.demo;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class WebSocketGame extends TextWebSocketHandler {

    public static class PlayerInfo implements Serializable {
        PlayerInfo(int sender, float xxx, float yyy, float rot){
            this.sender = sender;
            x = xxx;
            y = yyy;
            rotation = rot;
        }
        PlayerInfo(){}
        public int sender;
        public float x;
        public float y;
        public float rotation;
        public String timer;
    }
    public static class Init implements Serializable{

        Init(int n, String playerID){
            playerN = n;
            id = playerID;
            init = true;
        }
        public int playerN;
        public String id;
        public boolean init;
    }
    private final List<WebSocketSession> sessions = new ArrayList<>();

    private int onlineUsers = 0;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        sessions.add(session);
        ObjectMapper objectMapper = new ObjectMapper();


        Init initInfo = new Init(onlineUsers, session.getId());

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(initInfo)));
        //session.sendMessage(new TextMessage("Mi id es: "+ session.getId() + ":" + onlineUsers));
        onlineUsers++;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println(message.getPayload());
        ObjectMapper objectMapper = new ObjectMapper();
        PlayerInfo playerInfo = objectMapper.readValue(message.getPayload(), PlayerInfo.class);

        TextMessage newMessage = new TextMessage(objectMapper.writeValueAsString(playerInfo));

        for (WebSocketSession webSocketSession : sessions){
            if(webSocketSession.equals(session)){
                System.out.println("eQUALAS");
                continue;
            }
            webSocketSession.sendMessage(newMessage);
        }
    }


}
