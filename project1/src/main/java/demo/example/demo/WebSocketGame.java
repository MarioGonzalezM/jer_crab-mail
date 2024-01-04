package demo.example.demo;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
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
        public boolean t;
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
    public static class ObjectInfo implements Serializable{
        public Object obj;
        public boolean estaEnCinta;
        public int id;
        public float x;
        public float y;
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
        ObjectMapper objectMapper = new ObjectMapper();
        TextMessage newMessage = null;
        try {
            PlayerInfo playerInfo = objectMapper.readValue(message.getPayload(), PlayerInfo.class);
            newMessage = new TextMessage(objectMapper.writeValueAsString(playerInfo));

        }catch (UnrecognizedPropertyException ignored){

            ObjectInfo objectInfo = objectMapper.readValue(message.getPayload(), ObjectInfo.class);
            newMessage = new TextMessage(objectMapper.writeValueAsString(objectInfo));

        }finally {
            for (WebSocketSession webSocketSession : sessions){
                if(webSocketSession.equals(session)){
                    continue;
                }
                webSocketSession.sendMessage(newMessage);
            }
        }

    }


}
