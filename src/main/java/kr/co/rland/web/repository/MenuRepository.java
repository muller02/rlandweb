package kr.co.rland.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;

@Mapper
public interface MenuRepository {
    // @Select("SELECT * FROM menu")
    List<MenuView> findAll(Long memberId,Long categoryId, String query, int offset, int size);
    
    Menu findById(Long id);
    List<Menu> findAllByName(String name);

    void add(Menu menu);
    void update(Menu menu);
    void delete(Long id);

    int count(Long categoryId, String query);

    void save(Menu menu);

}
