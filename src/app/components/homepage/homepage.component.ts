import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Slick } from 'ngx-slickjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  productList:any;
  budgetPC:any;
  extremePC:any;
  streamingPC:any;
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
    this.productService.getAllProducts().subscribe((res:any)=>{
      // this.productList = this.mergeKeyValues(res);
      this.budgetPC = this.mergeKeyValues(res).filter((e:any)=>e.name === "BUDGET GAMING")
      this.extremePC = this.mergeKeyValues(res).filter((e:any)=>e.name === "EXTREME GAMING")
      this.streamingPC = this.mergeKeyValues(res).filter((e:any)=>e.name === "STREAMING")
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
