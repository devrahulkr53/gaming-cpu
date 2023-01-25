import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public show = false;
  public message:string = 'This is snackbar';
  public type:string = 'success'
  private snackbarSubscription: any;
  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.snackbarSubscription = this.snackbarService.snackbarState.subscribe(state=>{
      if(state.type){
        this.type = state.type;
      }else{
        this.type = 'Success'
      }
      this.message = state.message;
      this.show = state.show;
      setTimeout(() => {
        this.show = false;
      }, 5000);
    })
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.snackbarSubscription.unsubscribe()
  }

}
