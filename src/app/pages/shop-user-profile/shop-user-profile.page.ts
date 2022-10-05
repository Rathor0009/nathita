import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { ShopProductService } from 'src/app/services/shop-product/shop-product.service';

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
  message: any;
  constructor(private toastController: ToastController,private shopProduct:ShopProductService,private auth: AuthService, private router: Router, private payment: PaymentService,private alertController: AlertController) { }

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
          console.log(data);
          
          let startdate = new Date(data.createdAt);
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
    this.router.navigate(['/home']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please enter Product info',
      buttons: [{
        text: 'ADD',
        handler: (alertData) => { //takes the data 
          
          console.log(alertData.quantity);
          
          this.shopProduct.createShopProduct(alertData.name, alertData.price, alertData.quantity,alertData.description).subscribe({
            next: data => {
              console.log(data)
              this.message=data.message
              
              this.presentToast('top')
            }
          })
        }
      }],
      inputs: [
        {
          name: 'name',
          placeholder: 'Product-Name',
        },
       
        {
          name: ' price',
          type: 'number',
          placeholder: 'Price',
         
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          
        },
        {
          name: 'description',
          type: 'number',
          placeholder: 'description',
          
        }
       
      ],
    });

    await alert.present();
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
