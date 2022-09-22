package com.dh.Wesped;

import com.dh.Wesped.Model.Category;
import com.dh.Wesped.Service.CategoryService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @Test
    public void listCategories() {
        List<Category> categories = categoryService.listAll();
        Assert.assertTrue(!categories.isEmpty());
        Assert.assertTrue(categories.size() == 4);
    }
}