import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private baseUrl = 'http://localhost:8080/api/products?size=100'; //URL for our Springboot Rest API
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { } //and now we will inject the httpclient

  getProduct(theProductId: number):Observable<Product> {

    //need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number):Observable<GetResponseProducts> {
    // @TODO: need to build URL Based on category id ... will come back to this!
    //need to build URL based on category id,page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;
    //http://localhost:8080/api/products/search/findByCategoryId?id=2
    //return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  //method ProductList returns an Observable of product Array and Map te JSON data from SPring Data REST to Product array
  getProductList(theCategoryId: number):Observable<Product[]> {
    // @TODO: need to build URL Based on category id ... will come back to this!
    //need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    //http://localhost:8080/api/products/search/findByCategoryId?id=2
    //return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      return this.getProducts(searchUrl);
  }


  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword: string):Observable<GetResponseProducts> {
    //need to build URL based on keyword,page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
              + `&page=${thePage}&size=${thePageSize}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyword: string) :Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
      return this.getProducts(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    //http://localhost:8080/api/products/search/findByCategoryId?id=2
    //return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

//we will also add a supporting interface to help it in mapping,Unwraps the JSON from Spring Data RSET _embedded entry
interface GetResponseProducts {
  //this interface will get response to help us unwrap the JSON data from the Spring data rest api and make use of that _embedded entry that comes back from the Spring data rest api and we will access the array of products.
  _embedded:{
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number

  }
}

//we will also add a supporting interface to help it in mapping,Unwraps the JSON from Spring Data RSET _embedded entry
interface GetResponseProductCategory {
  //this interface will get response to help us unwrap the JSON data from the Spring data rest api and make use of that _embedded entry that comes back from the Spring data rest api and we will access the array of products.
  _embedded:{
    productCategory: ProductCategory[];
  }
}
