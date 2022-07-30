package com.luv2code.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.ProductCategory;

@CrossOrigin("http://localhost:4200")//accept calls from web browser scripts for this origin 
//here productCategory is the name of JSON entry and path means /product-category
@RepositoryRestResource(collectionResourceRel = "productCategory", path= "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{

}
