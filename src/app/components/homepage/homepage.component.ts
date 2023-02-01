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
      {name: 'keywords', content: 'gaming pc, prebuilt pc, cheap, assembled, best'},
      {property: "og:title", content:"Buy Prebuilt Gaming PC Starting From Rs.20,000"},
      {property: "og:site_name", content:"GamingCPU"},
      {property: "og:url", content:"https://gamingcpu.in"},
      {property: "og:description", content:"Buy gaming pc from our customized category of PC. GamingCPU is a leading company for best prebuilt gaming pc at lowest price in India."},
      {property: "og:type", content:"website"},
      {property: "og:image", content:"https://gamingcpu.in/assets/logo.png"},
    ])
    this.title.setTitle('Best Assembled Gaming PC in India Under 30000 - GamingCPU')
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
