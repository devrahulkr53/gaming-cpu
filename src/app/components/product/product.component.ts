import { Component, OnInit } from '@angular/core';
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
    private productService: ProductService
  ) {
    route.queryParams.subscribe(res=>{
      this.productId = res["id"]
      this.getProduct(this.productId)  
    })
  }

  ngOnInit(): void {
  }

  getProduct(id:string){
    this.productService.getProductById(id).subscribe(res=>{
      this.product = res;
      this.isPageLoading = false;
    })
  }

}
