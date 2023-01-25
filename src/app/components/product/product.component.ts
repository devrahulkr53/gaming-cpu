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
  isPageLoading:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      {name: 'description', content: 'Buy gaming pc from our customized category of PC. GamingCPU is a leading company for best prebuilt gaming pc at lowest price in India.'},
      {name: 'author', content: ''},
      {name: 'keywords', content: ''}
    ])
    
    route.queryParams.subscribe(res=>{
      this.productId = res["id"]
      this.getProduct(this.productId)  
    })
  }

  ngOnInit(): void {
  }
  
  getProduct(id:string){
    this.productService.getProductById(id).subscribe((res:any)=>{
      this.product = res;
      this.title.setTitle(res?.productName)
      this.isPageLoading = false;
    })
  }

}
