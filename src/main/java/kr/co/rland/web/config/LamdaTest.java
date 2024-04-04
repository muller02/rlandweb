package kr.co.rland.web.config;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import kr.co.rland.web.entity.Menu;

public class LamdaTest {
    public static void main(String[] args) {
        List<Menu> list = new ArrayList<>();
        list.add(Menu.builder().id(1).korName("어옹").build());
        list.add(Menu.builder().id(7).korName("어훙").build());
        list.add(Menu.builder().id(3).korName("어몽").build());
        list.add(Menu.builder().id(2).korName("어동").build());

     /*
      * 
      * 익명 클래스 anonymous class*/


        // Comparator<Menu> aaa = new Comparator<Menu>() {
        //     @Override
        //     public int compare(Menu o1, Menu o2) {
        //         return (int)(o1.getId()-o2.getId());
        //     }
        // };

        Comparator<Menu> bbb1 = (Menu o1, Menu o2) -> {
                    return (int)(o1.getId()-o2.getId());
                };

        Comparator<Menu> bbb = (o1, o2) -> (int)(o1.getId()-o2.getId());
        // list.sort(bbb);


        list.sort((o1, o2)-> (int)(o1.getId()-o2.getId()));


        System.out.println(list);
    }
}
