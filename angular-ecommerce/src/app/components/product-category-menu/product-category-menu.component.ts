import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  //Define our property
  productCategories: ProductCategory[];

  //inject the service
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    //invoke the service
    this.productService.getProductCategories().subscribe(
        data => {
          console.log('Product Categories=' + JSON.stringify(data));//log data retured from service
          this.productCategories=data;
        }
    );
  }

}
