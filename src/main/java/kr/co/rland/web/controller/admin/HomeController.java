package kr.co.rland.web.controller.admin;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("adminHomController")
@RequestMapping("admin")
public class HomeController {

    @GetMapping("index")
    public String index(
        Principal principal
        ){


            System.out.println(principal.getName());

        

        return "admin/index";
    }
}
