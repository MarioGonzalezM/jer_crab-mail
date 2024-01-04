package demo.example.demo;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.io.Serializable;
import java.time.Clock;
import java.util.*;

public class WebSocketGame extends TextWebSocketHandler {

    private final long MAX_IDLE_TIME = 1500;
    private final HashMap<String,Timer> timers = new HashMap<>();

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
        public float rot;
    }

    private final List<WebSocketSession> sessions = new ArrayList<>();


    private int onlineUsers = 0;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        Timer timer = getTimer(session);

        timers.put(session.getId(),timer);

        sessions.add(session);
        ObjectMapper objectMapper = new ObjectMapper();

        Init initInfo = new Init(onlineUsers, session.getId());

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(initInfo)));
        //session.sendMessage(new TextMessage("Mi id es: "+ session.getId() + ":" + onlineUsers));
        onlineUsers++;
    }

    private Timer getTimer(WebSocketSession session) {
        Timer timer = new Timer(session.getId());
        TimerTask task = new TimerTask() {
            public void run() {
                System.out.println("User " + session.getId() + " has overstayed their welcome and is therefore sentenced to die\n");
                timers.remove(session.getId());
                try {
                    session.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                sessions.remove(session);
            }
        };
        timer.schedule(task, MAX_IDLE_TIME);
        return timer;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Timer timer = timers.get(session.getId());
        if(timer != null) {
            timer.cancel();
            timer = getTimer(session);
            timers.replace(session.getId(),timer);
        }


        ObjectMapper objectMapper = new ObjectMapper();
        TextMessage newMessage = null;
        try {
            PlayerInfo playerInfo = objectMapper.readValue(message.getPayload(), PlayerInfo.class);
            newMessage = new TextMessage(objectMapper.writeValueAsString(playerInfo));

        }catch (UnrecognizedPropertyException ignored){

            var obj = objectMapper.readTree(message.getPayload());
            newMessage = message;
            System.out.println(newMessage.getPayload());

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
