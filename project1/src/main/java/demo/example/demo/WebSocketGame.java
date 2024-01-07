package demo.example.demo;

import ch.qos.logback.core.joran.sanity.Pair;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.Serializable;
import java.time.Clock;
import java.util.*;

public class WebSocketGame extends TextWebSocketHandler {

    WebSocketGame(){
        rooms.add(new ArrayList<>());
    }

    private final long MAX_IDLE_TIME = 6000;
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
        public int roomID;
    }
    public static class RoomInfo implements Serializable{
        RoomInfo(){}
        RoomInfo(int roomStatus_){
            roomStatus = roomStatus_;
        }
        RoomInfo(int roomStatus_, int roomID_){
            roomStatus = roomStatus_;
            roomID = roomID_;
        }
        public boolean roomInfo = true;
        public int roomID = -1;
        public int roomStatus;
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
    private final int MAX_ROOMS = 5;
    private final int PLAYERS_PER_ROOM = 2;
    private final List<List<WebSocketSession>> rooms = new ArrayList<>();
    private final List<String> ReadyPlayers = new ArrayList<>();
    private int onlineUsers = 0;

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        int roomID;
        boolean isHere = false;
        for (roomID = 0; roomID < rooms.size(); roomID++) {
            for(int i = 0; i < rooms.get(roomID).size(); i++){
                var room = rooms.get(roomID).get(i);
                isHere = room.getId().equals(session.getId());
                if(isHere) {
                    rooms.get(roomID).get(1-i).close();
                    rooms.get(roomID).clear();
                    break;
                }
            }
            if(isHere) break;
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {


        Timer timer = getTimer(session);

        timers.put(session.getId(),timer);
        ObjectMapper objectMapper = new ObjectMapper();
        RoomInfo rInfo = new RoomInfo();
        //sessions.add(session);
        boolean succes = false;
        for (int i = 0; i < rooms.size(); i++){
            var room = rooms.get(i);
            if(room.size() < PLAYERS_PER_ROOM){
                System.out.println("Room: " + i + "with " + room.size() + " items has been assigned to " + session.getId() + " room.");
                succes = true;
                rInfo.roomStatus = 3;
                rInfo.roomID = i;
                room.add(session);
                if(rooms.size() < MAX_ROOMS) {
                    rooms.add(new ArrayList<>());
                }
                break;
            }
        }
        if(!succes){
            rInfo.roomStatus = 4;
            sessions.add(session);

        }
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(rInfo)));
    }

    private Timer getTimer(WebSocketSession session) {
        Timer timer = new Timer(session.getId());
        TimerTask task = new TimerTask() {
            public void run() {
                System.out.println("User " + session.getId() + " has overstayed their welcome and is therefore sentenced to die\n");

                timers.remove(session.getId());
                /**/ try{
                    session.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }//*/

            }
        };
        timer.schedule(task, MAX_IDLE_TIME);
        return timer;
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //Resetea el tiempo que le queda al jugador para desconectarlo.
        Timer timer = timers.get(session.getId());
        if(timer != null) {
            timer.cancel();
            timer = getTimer(session);
            timers.replace(session.getId(),timer);
        }


        int roomID = -1;

        ObjectMapper objectMapper = new ObjectMapper();
        TextMessage newMessage = null;
        try {
            PlayerInfo playerInfo = objectMapper.readValue(message.getPayload(), PlayerInfo.class);
            newMessage = new TextMessage(objectMapper.writeValueAsString(playerInfo));
            roomID = playerInfo.roomID;
        }catch (NullPointerException|JsonParseException | MismatchedInputException ex){

            var obj = objectMapper.readTree(message.getPayload());
            if(message == null) return;
            roomID = obj.get("roomID").asInt();


            try{
                if (obj.get("roomInfo").asBoolean()) {

                    if (rooms.get(roomID).size() != PLAYERS_PER_ROOM) {
                        return;
                    }

                    int id = rooms.get(roomID).get(0).getId().equals(session.getId()) ? 0 : 1;
                    String otherPlayer = rooms.get(roomID).get(1 - id).getId();
                    //IF THE PLAYER IS READY CHECK IF THE OTHER IS READY TOO. IF BOTH ARE READY, SEND STATUS 0 (start game) ELSE, SEND STATUS 1 (only 1 player ready)
                    if (obj.get("isReady").asBoolean()) {
                        ReadyPlayers.add(session.getId());

                        if (ReadyPlayers.contains(otherPlayer)) {
                            ReadyPlayers.remove(otherPlayer);
                            RoomInfo rInfo = new RoomInfo(0);
                            newMessage = new TextMessage(objectMapper.writeValueAsString(rInfo));
                            for (int i = 0; i < PLAYERS_PER_ROOM; i++) {
                                rooms.get(roomID).get(i).sendMessage(newMessage);
                            }
                            //for (WebSocketSession webSocketSession : rooms.get(roomID)) {
                            //    webSocketSession.sendMessage(newMessage);
                            //    return;
                            //}
                        } else {
                            ReadyPlayers.add(session.getId());
                            RoomInfo rInfo = new RoomInfo(1);
                            rooms.get(roomID).get(1 - id).sendMessage(new TextMessage(objectMapper.writeValueAsString(rInfo)));
                            return;
                        }
                    }
                    //IF THE PLAYER IS NOT READY, NOTIFY THE OTHER PLAYER WITH STATUS 2
                    else {
                        ReadyPlayers.remove(rooms.get(roomID).get(id).getId());

                        RoomInfo rInfo = new RoomInfo(2);
                        rooms.get(roomID).get(1 - id).sendMessage(new TextMessage(objectMapper.writeValueAsString(rInfo)));
                        return;
                    }
                }
            }catch(NullPointerException e){
                try {
                    if (obj.get("initGame").asBoolean()) {
                        int id = rooms.get(roomID).get(0).getId().equals(session.getId()) ? 0 : 1;
                        Init init = new Init(id, session.getId());
                        newMessage = new TextMessage(objectMapper.writeValueAsString(init));
                    }
                }catch (NullPointerException o){
                    newMessage = message;
                }
            }


        }
        if(roomID < 0){
            return;
        }
        if(newMessage != null) {
            for (WebSocketSession webSocketSession : rooms.get(roomID)) {
                if (webSocketSession.equals(session)) {
                    continue;
                }
                webSocketSession.sendMessage(newMessage);
            }
        }
    }


}
