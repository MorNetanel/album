package com.example.album_project.job;

import com.example.album_project.beans.UserSession;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;

@Component
@AllArgsConstructor
public class SessionRemover {

    private HashMap<String, UserSession> sessions;






    @Scheduled(fixedRate = 1000*60)
    public void removeSession(){
        Date now = new Date(System.currentTimeMillis());
        //remove session
        sessions.entrySet().removeIf(session -> now.getTime() > session.getValue().getLastActive() + (1000 *10));
        //print all sessions
        System.out.println(sessions.size());

        //print if hashmap is empty
        System.out.println(sessions.isEmpty()?"empty":"not empty");
    }


}
