package kr.co.rland.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.service.MemberService;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private MemberService service;

    @GetMapping("signin")
    public String signin(){
        return "user/signin";
    }

    // @PostMapping("signin")
    // public String signin(
    //         String username, 
    //         String password,
    //         // HttpSession session
    //         HttpServletResponse res
    //         ){

    //     boolean valid = service.validate(username, password);

    //     if(!valid)
    //         return "redirect:signin?error";
       

    //     Cookie uidCookie = new Cookie("uid", "1");
    //     Cookie usernameCookie = new Cookie("username", "으내");
        
    //     uidCookie.setPath("/");
    //     usernameCookie.setPath("/");
        
        
    //     res.addCookie(uidCookie);
    //     res.addCookie(usernameCookie);


    //     // session.setAttribute("username", username);

    //     return "redirect:/index";
    // }

}
