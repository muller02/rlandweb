package kr.co.rland.web.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.MenuService;
/**
    /api/menus
    /api/menus/1 
    /api/stores/3/menus/4
    POST, PUT, DELETE는 Req 매핑 그대로
 */
@RestController("apiMenuController")
@RequestMapping("api/menus")
public class MenuController {
    
    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<MenuView> list(
        @RequestParam(name = "c", required = false) Long categoryId, 
        @RequestParam(name = "q", required = false) String query, 
        @RequestParam(name = "p", required = false, defaultValue = "1") Integer page, 
        Model model){

        List<MenuView> menus = new ArrayList<>();

        if(categoryId!=null)
            menus = menuService.getList(page, categoryId);
        else if(query!=null)
            menus = menuService.getList(page, query);
        else
            menus = menuService.getList(page);


        return menus;
    }

    @PostMapping("1")
    public Menu get(Long id) {
        Menu menu = new Menu();
        return menu;
    }

    @PutMapping
    public Menu edit(Menu menu) {
        return null;
    }

    @DeleteMapping
    public String delete(Long id) {
        return null;
    }
}
