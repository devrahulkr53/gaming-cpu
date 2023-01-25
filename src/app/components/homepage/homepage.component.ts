import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  productList:any;
  isPageLoading:boolean = true;
  constructor(
    private productService: ProductService,
    private meta: Meta,
    private title: Title
  ) { 
    this.meta.addTags([
      {name: 'description', content: 'Buy gaming pc from our customized category of PC. GamingCPU is a leading company for best prebuilt gaming pc at lowest price in India.'},
      {name: 'author', content: ''},
      {name: 'keywords', content: ''}
    ])
    this.title.setTitle('Buy Prebuilt Gaming PC in India Starting From Rs.20,000')
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
