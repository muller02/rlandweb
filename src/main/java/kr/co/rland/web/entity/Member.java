package kr.co.rland.web.entity;

import java.util.Date;

import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    
    private long id;
    private String username;
    private String pwd;
    private String email;
    private Date regDate;
    
}
