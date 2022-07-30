import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
   templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //set a property here for array of products
  products: Product[];
  //currentCategoryId: number;
  currentCategoryId: number=1;
  previousCategoryId: number=1;
  currentCategoryName: string;
  //searchMode: boolean;
  searchMode: boolean=false;


  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;


  previousKeyword: string = null;



  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }//inject the dependency here of Product Service
           //Inject the ActivatedRoute,it is the current active route that loaded the component
           //it is useful for accessing route parameters.


  ngOnInit(): void {
    //this.listProducts();
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    //Similar to our @PostConstruct
  }

 listProducts() {

     this.searchMode = this.route.snapshot.paramMap.has('keyword');

     if(this.searchMode){
       this.handleSearchProducts();
     }else{
      this.handleListProducts();
     }



 }

 handleSearchProducts(){

   const theKeyword: string = this.route.snapshot.paramMap.get('keyword');


   //
   //if we have different keyword than previous
   //then set thePageNumber to 1

   if(this.previousKeyword != theKeyword){
     this.thePageNumber = 1;
   }

   this.previousKeyword = theKeyword;

   console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

   //now search for the products using keyword
  //  this.productService.searchProducts(theKeyword).subscribe(
  //    data => {
  //      this.products = data;
  //    }
  //  )
       this.productService.searchProductsPaginate(this.thePageNumber -1,this.thePageSize,theKeyword).subscribe(
                     this.processResult());

 }

 handleListProducts(){
   //  check if "id" parameter is available
   const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

   if ( hasCategoryId ){
       //get the "id" param string. convert string to a number using "+" symbol
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

       // get the "name" param string
       this.currentCategoryName = this.route.snapshot.paramMap.get('name');
   }
   else{
     //no category id available ... default to category id 1
     this.currentCategoryId = 1;

     this.currentCategoryName = 'Books';
   }

   //
   // Check if we have a different category than previous
   // Note: Angular will reuse a component if it is currently being viewed
   //

   // if we have a different category id than previous
   // then set thePageNumber back to 1
   if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
   }

   this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

   //this.productService.getProductList().subscribe(//method is invoked once you "subscribe"
   //now get the products for the given category id
  //  this.productService.getProductList(this.currentCategoryId).subscribe(
  //    data => {
  //      this.products = data; //Assign results to the product array
  //    }
  //  )
  this.productService.getProductListPaginate(this.thePageNumber - 1,
                                             this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());

 }
  processResult(){
     return data => {
       this.products = data._embedded.products;
       this.thePageNumber = data.page.number + 1;
       this.thePageSize = data.page.size;
       this.theTotalElements = data.page.totalElements;

     };
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    //ToDo ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

  }
}
