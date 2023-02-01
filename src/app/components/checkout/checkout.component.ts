import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  stateList: string[] = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]
  billingForm: FormGroup = new FormGroup({})
  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  product: any;
  productId: string = '';
  constructor(
    public authService: AuthService,
    private checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTags([
      {name: 'description', content: ''},
      {name: 'author', content: ''},
      {name: 'keywords', content: ''}
    ])
    this.title.setTitle('Checkout - GamingCPU')
    
    route.queryParams.subscribe(res=>{
      this.productId = res["id"]
      this.getProduct(this.productId)  
    })
  }

  ngOnInit(): void {
    this.billingForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      address: new FormControl('', [Validators.required, Validators.max(200)]),
      address2: new FormControl('', Validators.max(200)),
      state: new FormControl('', [Validators.required, Validators.max(40)]),
      city: new FormControl('', [Validators.required, Validators.max(40)]),
      zip: new FormControl('', [Validators.required, Validators.max(999999)]),
    })
  }

  get controls(): any {
    return this.billingForm.controls
  }

  onSubmit() {
    this.billingForm.markAllAsTouched();
    if(this.billingForm.invalid) return;
    let payload = {
      ...this.billingForm.value,
      userId: this.authService.userData.value.data.uid,
      productId: this.productId,
      phoneNumber: this.authService.userData.value.data.phoneNumber
    }
    this.checkoutService.placeOrder(payload).subscribe((res:any)=>{
      if(res){
        this.router.navigate([`/success`],{
          queryParams: { 
            id: this.productId, 
            data: JSON.stringify({...payload, orderId: res.name})
          }
        })
      }
    })
    // let payload = {
    //   description: "Why settle for mediocrity Leap forward into AMD Ryzen 5 5600 with the architectures from AMD and Nvidia. Powered by an AMD Ryzen Processors, this unlocked six-core great performance with a base speed of 3.5 Ghz and capable of overclocking to 4.4 Ghz with provided cooling setup.Gaming Series the better range performance value in present gaming rig in the market. This Gaming PC brings you immersive graphics that is powered by Nvidia RTX 30 Series. This rig is optimized for HD gaming. DDR4 3200 MHz memory, your PC will be performing at a much faster speed with higher FPS in games compared to other gaming.",
    //   marketPrice: "38,448",
    //   name: "EXTREME GAMING",
    //   productImage: "assets/pc-images/extreme/8.png",
    //   productName: "i3 10th Generation, 8GB RAM, NVIDIA 2GB Graphics, 128GB SSD, 2TB Hard Disk",
    //   seller: "GamingCPU",
    //   sellingPrice: "29,898",
    //   specification: {
    //     graphics: "NVIDIA 2GB Graphics",
    //     harddrive: "2TB Hard drive",
    //     height: "20cm",
    //     processor: "Intel i3 10th Generation processor",
    //     ram: "8GB RAM",
    //     ssd: "128GB SSD",
    //     width: "30cm"
    //   }
    // }
    // this.checkoutService.createProduct(payload).subscribe((res: any) => {
    //   if (res) {
    //     this.router.navigate([`/success?productId=${this.productId}`], {
    //       queryParams: { data: JSON.stringify({ ...payload, orderId: res.name }) }
    //     })
    //   }
    // })
  }

  getProduct(id: string) {
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
    })
  }

}
