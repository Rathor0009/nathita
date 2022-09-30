import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './shop-user-profile.page.html',
  styleUrls: ['./shop-user-profile.page.scss'],
})
export class ShopUserProfilePage implements OnInit {
  user: any
  ServiceName: any;
  showPayment: boolean = true
  showPlan: boolean = false
  startDate: Date;
  endMonth: number;
  endYear: number;
  endDate: number;
  constructor(private auth: AuthService, private router: Router, private payment: PaymentService) { }

  ngOnInit() {
    this.auth.getShopuser().subscribe({
      next: data => {
        console.log(data.getUser)
        this.user = data.getUser
        if (this.user.status == 2) {
          this.showPayment = false
          this.showPlan = true
        }
        this.ServiceName = data.ServiceName
      }
    })
    if (this.user.status == 2) {
      this.showPayment = false
      this.showPlan = true
    }
    if (this.user.status == 2) {
      this.payment.PaymentRecord().subscribe({
        next: data => {
          // console.log(data);
          let startdate = new Date(data.getPayUser.createdAt);
          this.startDate = startdate
          let endMonth = new Date(data.message).getMonth()
          this.endMonth = endMonth
          console.log(endMonth);

          let endYear = new Date(data.message).getFullYear()
          this.endYear = endYear
          let enddate = new Date(data.message).getDate()
          this.endDate = enddate

        }

      })
    }
  }
  signOut() {
    window.sessionStorage.clear();
    this['router'].navigate(['home'])
  }

}
