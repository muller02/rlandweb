package kr.co.rland.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.repository.MenuRepository;

@Service
public class MenuServiceImp implements MenuService {

    @Autowired
    private MenuRepository repository;

    @Override
    public List<MenuView> getList(Long memberId, Integer page) {
        return getList(memberId, page, null, null);
    }

    @Override
    public List<MenuView> getList(Long memberId, Integer page, Long categoryId) {
        return getList(memberId, page, categoryId, null);
    }
    
    @Override
    public List<MenuView> getList(Long memberId, Integer page, String query) {
        return getList(memberId, page, null, query);
    }

    public List<MenuView> getList(Long memberId, Integer page, Long categoryId, String query) {

        int size = 6;
        int offset = (page-1)*size;

        List<MenuView> list = 
            repository.findAll(memberId, categoryId, query, offset, size);
    return list;
    }

    @Override
    public Menu getById(Long id) {
        Menu menu = repository.findById(id);
        return menu;
    }

    @Override
    public int getCount() {
        return getCount(null, null);
    }
    
    @Override
    public int getCount(String query) {
        // TODO Auto-generated method stub
        return getCount(null, query);
    }
    
    @Override
    public int getCount(Long categoryId) {
        return getCount(categoryId, null);
    }

    public int getCount(Long categoryId, String query) {
        return repository.count(categoryId, query);
    }

    @Override
    public void add(Menu menu) {
       repository.save(menu);
    }

    @Override
    @Transactional
    public void test2(){
        Menu menu1 = repository.findById(3L);
        System.out.println("menu1 = "+menu1);
        try {
            Thread.sleep(5000);
            Menu menu2 = repository.findById(3L);
            System.out.println("menu2 = "+menu2);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void test() {
        Menu menu2 = Menu
                    .builder()
                    .id(3L)
                    .korName("밍밍라떼")
                    .build();
        repository.update(menu2);
        System.out.println("업데이트완료");
        // menu.setId(17L);
        // menu.setKorName("바밤바");
        // repository.update(menu);
    }

}
