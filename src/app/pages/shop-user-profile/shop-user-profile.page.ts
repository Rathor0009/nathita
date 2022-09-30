import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './shop-user-profile.page.html',
  styleUrls: ['./shop-user-profile.page.scss'],
})
export class ShopUserProfilePage implements OnInit {
user:any
  ServiceName: any;
  showPayment: boolean=true
  showPlan: boolean=false
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.auth.getShopuser().subscribe({
      next:data=>{
        console.log(data.getUser)
        this.user=data.getUser
        if (this.user.status == 2) {
          this.showPayment = false
          this.showPlan = true
        }
        this.ServiceName=data.ServiceName
      }
    })
  }
  signOut() {
    window.sessionStorage.clear();
    this['router'].navigate(['home'])
  }

}
