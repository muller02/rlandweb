package kr.co.rland.web.controller;

import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import kr.co.rland.web.config.security.WebUserDetails;
import kr.co.rland.web.entity.Category;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.CategoryService;
import kr.co.rland.web.service.MenuService;

@Controller
@RequestMapping("menu")
public class MenuController {

    @Autowired
    private MenuService service;
    @Autowired
    private CategoryService cateService;

    @GetMapping("list")
    public String list(
        @RequestParam(name = "c", required = false) Long categoryId, 
        @RequestParam(name = "q", required = false) String query, 
        @RequestParam(name = "p", required = false, defaultValue = "1") Integer page,
        @CookieValue(value = "menus", required = false) String menusCookie, 
        Model model,
        @AuthenticationPrincipal WebUserDetails userDetails){

    

        List<MenuView> menus = new ArrayList<>();
        
        // System.out.println("c = " + categoryId);
        // System.out.println("q = " + query);
        // System.out.println("p = " + page);

        List<Category> categories = cateService.getList();
        Long memberId = null;
        if(userDetails != null)
            memberId = userDetails.getId();
            
        int count = 0;
        if(categoryId!=null){
            menus = service.getList(memberId, page, categoryId);
            count = service.getCount(categoryId);
        }
        else if(query!=null){
            menus = service.getList(memberId, page, query);
            count = service.getCount(query);
        }
        else{
            
            menus = service.getList(memberId, page);
            count = service.getCount();
        }
        System.out.println(menus.get(0).isLiked());
        
        model.addAttribute("categories", categories);
        model.addAttribute("menus", menus);
        model.addAttribute("count", count!=0? count:1);




        int cartTotalPrice=0;
        int cartCount=0;

        // if(menusCookie!=null){

            // String menusStr = URLDecoder.decode(menusCookie, Charset.forName("utf-8"));
            // System.out.println(menusStr);
        //     Type menuListType = new TypeToken<List<Menu>>(){}.getType();
        //     List<Menu> menuList = new Gson().fromJson(menusStr, menuListType);

        //     for(Menu m : menuList)
        //         cartTotalPrice+=m.getPrice();

        //     cartCount= menuList.size();

        //     model.addAttribute("cartTotalPrice", cartTotalPrice);
        //     model.addAttribute("cartCount", cartCount);
        // }

        // if(menusCookie!=null){
        //     Type menuListType = new TypeToken<List<Menu>>(){}.getType();
        //     List<Menu> cartList = new Gson().fromJson(menusCookie, menuListType);


        //     cartCount = cartList.size();


        //     for(Menu m :cartList)
        //         cartTotalPrice += m.getPrice();


        //     model.addAttribute("cartTotalPrice", cartTotalPrice);
        //     model.addAttribute("cartCount", cartCount);
        // }
        // if(menusCookie!=null){
        //     String menusStr = URLDecoder.decode(menusCookie, Charset.forName("utf-8"));
        //     List<Object> menuList = new Gson().fromJson(menusStr, List.class);

        //     cartCount = menuList.size();
            
        //     for(int i = 0; i < menuList.size(); i++){
        //         // System.out.println(menuList.get(i).toString());


        //         String arr[] = menuList.get(i).toString().split(", ");
        //         String price = arr[3].substring(6);

        //         cartTotalPrice += Integer.parseInt(price);
        //     }

        //     model.addAttribute("cartTotalPrice", cartTotalPrice);
        //     model.addAttribute("cartCount", cartCount);
        // }

        if(query!=null)
            model.addAttribute("query", query);
        
        return "menu/list";
    }

    @GetMapping("detail")
    public String detail(Long id, Model model) {
        Menu menu = service.getById(id);
        model.addAttribute("menu", menu);
        return "menu/detail";
    }
    
}
