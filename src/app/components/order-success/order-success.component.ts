import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  product:any;
  productId:string = '';
  billingAddress:any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    route.queryParams.subscribe((res:any)=>{
      this.billingAddress = JSON.parse(res?.data)
      this.productId = res["id"]
      this.getProduct(this.productId)  
    })
  }

  ngOnInit(): void {
  }

  getProduct(id:string){
    this.productService.getProductById(id).subscribe(res=>{
      this.product = res;
    })
  }

}
