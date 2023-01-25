import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({})
  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  constructor() { }

  ngOnInit(): void {
    
    this.contactForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.max(10)]),
      message: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    console.log(this.contactForm.value)
  }

}
