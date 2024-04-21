package kr.co.rland.web.service;

import java.util.List;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

public interface MenuService {

    List<MenuView> getList(Long memberId, Integer page);

    List<MenuView> getList(Long memberId, Integer page, Long categoryId);
    
    List<MenuView> getList(Long memberId, Integer page, String query);
    
    Menu getById(Long id);
    
    int getCount();
    int getCount(Long categoryId);
    int getCount(String query);

    void add(Menu menu);

    
}
