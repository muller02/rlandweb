package kr.co.rland.web.service;

import java.util.List;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

public interface MenuService {

    List<MenuView> getList(int page);

    List<MenuView> getList(int page, Long categoryId);
    
    List<MenuView> getList(int page, String query);
    
    Menu getById(Long id);
    
    int getCount();
    int getCount(Long categoryId);
    int getCount(String query);

    void add(Menu menu);

    
}
