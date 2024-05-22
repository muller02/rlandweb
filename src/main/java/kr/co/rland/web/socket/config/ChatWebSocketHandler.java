package kr.co.rland.web.socket.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    List<WSUser> users = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
       
        // users.add(session);
        // System.out.println("Connected from "+session.getRemoteAddress());
        // session.sendMessage(new TextMessage("welcome"));
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        WSData data = new Gson().fromJson(message.getPayload(), WSData.class);
        
        if(data.getType() == 1){
            WSUser user = new WSUser();
            user.setSession(session);
            user.setUsername(data.getUsername());
            users.add(user);

            System.out.println(user);
            return;
        }

        for(WSUser user : users){

            WSData sendData = new WSData();
            sendData.setType(2);
            sendData.setUsername(user.getUsername());
            sendData.setContent(data.getContent());
            String textMessage = new Gson().toJson(sendData);

            user.getSession().sendMessage(new TextMessage(textMessage));
        }
    }
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        users.remove(session);
        System.out.println("Closed from "+session.getRemoteAddress());
    }


}
