import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-gaming-pc',
  templateUrl: './gaming-pc.component.html',
  styleUrls: ['./gaming-pc.component.scss']
})
export class GamingPcComponent implements OnInit {

  selectedPC:number = 0;
  productList:any;
  isPageLoading:boolean = true;
  selectedTab:string = 'BUDGET GAMING';
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(res=>{
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
