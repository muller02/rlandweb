package kr.co.rland.web.controller.admin;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.rland.web.config.security.WebUserDetails;

@Controller("adminHomController")
@RequestMapping("admin")
public class HomeController {

    @GetMapping("index")
    public String index(
        Principal principal
        , Authentication authentication
        ,@AuthenticationPrincipal WebUserDetails userDatails
        ){

            // CustomUserDetails 사용방법 2
            System.out.println(userDatails.getEmail());

            // CustomeUserDatils 사용방법 1
            // WebUserDetails userDetails = (WebUserDetails)authentication;
            // System.out.println(userDetails.getEmail());

            // 방법 1
            SecurityContext context = SecurityContextHolder.getContext();
            Authentication auth = context.getAuthentication();
            //String username = auth.getName();

            // 방법 2            
            String username = principal.getName();
            System.out.println(username);

        

        return "admin/index";
    }
}
