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
        WSUser user = new WSUser();
        // users.add(session);
        // System.out.println("Connected from "+session.getRemoteAddress());
        // session.sendMessage(new TextMessage("welcome"));
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String mas = message.getPayload();
        WSData data = new Gson().fromJson(mas, WSData.class);

        for(WebSocketSession s : users)
            s.sendMessage(new TextMessage(message.getPayload()));
    }
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        users.remove(session);
        System.out.println("Closed from "+session.getRemoteAddress());
    }


}
