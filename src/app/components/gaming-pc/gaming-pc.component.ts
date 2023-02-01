import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
    private productService: ProductService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      {name: 'description', content: 'Are you looking for gaming computers at lowest price. Find PC that suits best for your purpose.'},
      {name: 'keywords', content: ''}
    ])
    this.title.setTitle('Budget, Extreme and Streaming PC - GamingCPU')
    route.queryParams.subscribe((res:any)=>{
      console.log(res)
      this.selectedTab = res?.category || 'BUDGET GAMING';
    })
  }

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
