package com.luv2code.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.luv2code.ecommerce.entity.Product;

@CrossOrigin("http://localhost:4200")//accept calls from web browser scripts for this origin 
public interface ProductRepository extends JpaRepository<Product, Long> {
   
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
	//behind the scene above function will work as SELECT * FROM product where category_id=? this is all those spring magic
	//and  also Spring data REST will automatically exposes endpoint
	//http://localhost:8080/api/products/search/findByCategoryId?id=2
	
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
