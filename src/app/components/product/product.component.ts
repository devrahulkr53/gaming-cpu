import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Slick } from 'ngx-slickjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product:any;
  productId:string = '';
  productList:any;
  selectedTab:'settings' | 'games' | 'info' = 'settings'
  isPageLoading:boolean = true;

  arrayLength = 10;
  config: Slick.Config = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    // mouseWheelMove: false,
    responsive: [
      { 
        breakpoint: 800, 
        settings: {
          slidesToShow: 2,
          mouseWheelMove: true
        } 
      },
      { 
        breakpoint: 1500, 
        settings: {
          slidesToShow: 3,
          mouseWheelMove: true
        } 
      }
    ]
  }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private meta: Meta,
    private title: Title
  ) {
    route.queryParams.subscribe(res=>{
      this.productId = res["id"]
      this.getProduct(this.productId)  
      this.title.setTitle(res["name"])
      this.meta.addTags([
        {name: 'description', content: ''},
        {name: 'keywords', content: ''},
        {property: "og:title", content:res["name"]},
        {property: "og:site_name", content:"GamingCPU"},
        {property: "og:url", content:"https://gamingcpu.in/product?id=" + res["id"]},
        {property: "og:description", content:""},
        {property: "og:type", content:"website"},
        {property: "og:image", content:res["productImage"]},
      ])
    })
  }

  ngOnInit(): void {
  }
  
  getProduct(id:string){
    this.productService.getProductById(id).subscribe((res:any)=>{
      this.product = res;
      this.getRelatedProducts(res?.name)
      this.isPageLoading = false;
    })
  }

  getRelatedProducts(name:string){
    this.productService.getProductByName(name).subscribe((res:any)=>{
      this.productList = this.mergeKeyValues(res);
      this.isPageLoading = false;
    })
  }
  
  mergeKeyValues(obj:any){
    let keys = Object.keys(obj)
    let values:any = Object.values(obj)
    return values.map((value:any,index:any)=>{
      return {...value,id:keys[index]}
    })
  }
}
