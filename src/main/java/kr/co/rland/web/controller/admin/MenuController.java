package kr.co.rland.web.controller.admin;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.rland.web.entity.Category;
import kr.co.rland.web.entity.Menu;
import kr.co.rland.web.entity.MenuView;
import kr.co.rland.web.service.CategoryService;
import kr.co.rland.web.service.MenuService;

@Controller("adminMenuController")
@RequestMapping("admin/menu")
public class MenuController {
    
    @Autowired
    private MenuService service;
    @Autowired
    private CategoryService cateService;

    @GetMapping("list")
    public String list( @RequestParam(name = "c", required = false) Long categoryId, 
                        @RequestParam(name = "q", required = false) String query, 
                        @RequestParam(name = "p", required = false, defaultValue = "1") Integer page,
                        @CookieValue(value = "menus", required = false) String menusCookie, 
                        Model model){


                            
        List<MenuView> menus = new ArrayList<>();
        
        // System.out.println("c = " + categoryId);
        // System.out.println("q = " + query);
        // System.out.println("p = " + page);

        List<Category> categories = cateService.getList();
        
        int count = 0;
        if(categoryId!=null){
            menus = service.getList(page, categoryId);
            count = service.getCount(categoryId);
        }
        else if(query!=null){
            menus = service.getList(page, query);
            count = service.getCount(query);
        }
        else{
            
            menus = service.getList(page);
            count = service.getCount();
        }

        model.addAttribute("categories", categories);
        model.addAttribute("menus", menus);
        model.addAttribute("count", count!=0? count:1);

        return "admin/menu/list";
    }

    @PostMapping("reg")
    public String save(
                        // String korName
                        // , String engName
                        // , MultipartFile img
                        // , Integer price
                        Menu menu
                        , @RequestParam("img-file") List<MultipartFile> imgFiles
                        , HttpServletRequest req
                        // , Principal principal
                        ) throws IllegalStateException, IOException{
        
        // Menu menu = Menu.builder()
        //                 .korName(korName)
        //                 .engName(engName)
        //                 .price(price)
        //                 .img(img.getOriginalFilename())
        //                 .build();

        List<String> fileNames= new ArrayList<>();

        for(MultipartFile imgFile : imgFiles)
        {
            String fileName = "";
            if(imgFile !=null && !imgFile.isEmpty())
            // 파일 저장
            {
                fileName = imgFile.getOriginalFilename();

                String path = "/image/menu";
                String realPath = req.getServletContext().getRealPath(path);

                File pathFile = new File(realPath);

                if(!pathFile.exists())
                    pathFile.mkdirs();

                File file = new File(realPath + File.separator + fileName);
                imgFile.transferTo(file);

                System.out.println("realPath = "+realPath);

                fileNames.add(fileName);
            }
       
            menu.setRegMemberId(2);
            menu.setCategoryId(1);
            menu.setImg(fileName);
        }
        service.add(menu);

        System.out.println("fileNames = "+fileNames.toString());

        System.out.println("getId = "+menu.getId());

        return "redirect:list";
    }
    
    @GetMapping("reg")
    public String reg(){

        return "admin/menu/reg";

    }
}

