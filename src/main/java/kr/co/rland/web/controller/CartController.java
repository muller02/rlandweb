package kr.co.rland.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.service.MenuService;

@Controller
@RequestMapping("cart")
public class CartController {

    @Autowired
    private MenuService menuService;

    @GetMapping("list")
    public String list(
    @CookieValue(required = false) String menus
    , Model model){

        // 스프링 요녀석이 알아서 디코딩 해주는구나^^
        // 근데 공백은 인코딩할때 이미 +로 대체하는 되어 있다는 점,,, decode 쓰자...
        System.out.println("머임???"+menus);

        // new
        // 바로 사용하지 않고 Decode 사용하여 변환 후 파싱
        String menusStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
        List<Menu> menuList = new Gson().fromJson(menusStr, List.class);

        System.out.println(menuList.toString());

        return "cart/list";
    }
    
    @PostMapping("add-menu")
    public String addMenu(
        Long id
        , @CookieValue(required = false) String menus
        , HttpServletResponse rep
    ){
        System.out.println("id = "+id);
        // 1차
        // 반복적인 문자열 더하기는 += 쓰면 안돼~
        // String data = "";
        // data += id;
        
        // 2차
        // StringBuilder menus = new StringBuilder();
        // menus.append("-");
        // menus.append(menu.getId());
        // menus.append(",");
        // menus.append(menu.getKorName());

        List<Menu> menuList;
        {
            // 쿠키가 없는 경우
            if(menus == null)
                menuList = new ArrayList<>();
            // 쿠키가 있는 경우
            else{
                String menusStr = URLDecoder.decode(menus, Charset.forName("utf-8"));
                menuList = new Gson().fromJson(menusStr, List.class);
                
                Menu menu  = menuService.getById(id);
                menuList.add(menu);
            }  
        }

        {
            // 3차
            // menu -> GSON
            String menuStr = new Gson().toJson(menuList);
            String menuEncoded="";
            
            try {
                menuEncoded = URLEncoder.encode(menuStr, "utf-8");
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            Cookie menuCookie = new Cookie("menus",menuEncoded);
            menuCookie.setPath("/");
            Cookie menuCookie2 = new Cookie("menusss",menuEncoded);
            menuCookie2.setPath("/");
            rep.addCookie(menuCookie);
            rep.addCookie(menuCookie2);
        }

        return "redirect:/menu/list";
    }
}
