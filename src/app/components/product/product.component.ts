import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product:any;
  productId:string = '';
  selectedTab:'settings' | 'games' | 'info' = 'settings'
  isPageLoading:boolean = true;

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
      this.isPageLoading = false;
    })
  }

}
