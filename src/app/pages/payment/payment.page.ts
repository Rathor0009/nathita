import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment/payment.service';

import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl;

declare var Razorpay: any

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentStatus: any;
  status: 2;
  usertype: string="shop"

  constructor(private toastCtrl: ToastController, private http: HttpClient, private paymentHistory: PaymentService) { }

  ngOnInit() {
  }
  buy(plan) {
    let name, price, theme, param

    if (plan == 'basic') {

      name = "Base_Plan";
      price = "30000"
      theme = "#8F46EE"
      param = "payment"
    }
    this.http.get(AUTH_API + param).subscribe(res => {
      var options = {
        "key": 'rzp_test_nWQ8aWt5I8GrCt',
        "name": name,
        "discription": "Testing puspose",
        "amount": price,
        "currency": "INR",
        "image": "/assets/img/",
        "order_id": res["id"],
        "handler": (response) => {
          this.presentToast()
          console.log(response);
          this.paymentStatus = response
      
        },
        "theme": {
          "color": theme
        }

      }
      this.initPay(options);
    

    })
  }
  initPay(options: any) {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  async presentToast() {
  
    const toast = await this.toastCtrl.create({
      message: "payment Successful",
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   cssClass: 'secondary',
        //   handler: () => {
        //     console.log('Confirm Cancel');
        //   }
        // },
        {
          text: 'save',
          handler: () => { //takes the data 
            this.paymentHistory.userPayment(this.status, this.usertype, this.paymentStatus).subscribe({
              next: data => {
                console.log(data)
                this['router'].navigate(['/shop-user-profile'])
              }
            })
              }
            }
      
            
      ]
    })
    toast.present()
  }
}
