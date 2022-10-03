import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ShopProductService } from 'src/app/services/shop-product/shop-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  product: any;
  message: any;
  add: false;
  delete: false
  sausage: any;
  ischecked: boolean = true
  constructor(private shopProduct: ShopProductService, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
    this.shopProduct.getShopProduct().subscribe({
      next: data => {
        this.product = data.getShopProduct
        console.log(
          this.product
        );

      }
    })

  }
  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Please enter Product info',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alert-button-cancel',
        handler: () => {
          // this.handlerMessage = 'Alert canceled';
        },
      }, {
        text: 'ADD',
        cssClass: 'alert-button-cancel',
        handler: (alertData) => { //takes the data 

          console.log(alertData.quantity);

          this.shopProduct.createShopProduct(alertData.name, alertData.price, alertData.quantity, alertData.description).subscribe({
            next: data => {
              console.log(data)
              this.message = data.message

              this.presentToast('top')
              this.ngOnInit()
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
  async deleteAlert(p_id: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alert-button-cancel',
        handler: () => {
          // this.handlerMessage = 'Alert canceled';
        },
      }, {
        text: 'yes',
        cssClass: 'alert-button-cancel',
        handler: () => {
          this.shopProduct.deleteShopProduct(p_id).subscribe({
            next: data => {
              this.message = data.message
              this.ngOnInit()
              this.presentToast('top')
            }
          })
        }
      }],
    });

    await alert.present();
  }

  statusUpdate(event: any, p_id: any,i: number) {
   
    this.product[i].status = !this.product[i].status;
    console.log("product------",this.product[i])

    this.shopProduct.updateShopProductStatus( this.product[i].status,p_id).subscribe({
      next: data => {
        this.message = data.message
        this.ngOnInit()
        this.presentToast('top')
      }

    })
    
    // if (this.ischecked == true) {
      // this.shopProduct.updateShopProductStatus( 0,p_id).subscribe({
      //   next: data => {
      //     console.log(data);
      //     this.ischecked = false
      //     this.message = data.message
      //     this.ngOnInit()
      //     this.presentToast('top')
      //   }

      // })
    // }
    // if (this.ischecked == false) {
    //   this.shopProduct.updateShopProductStatus(1,p_id).subscribe({
    //     next: data => {
    //       console.log(data);
    //       this.ischecked = true
    //       this.message = data.message
          
    //           this.ngOnInit()
    //           this.presentToast('top')

    //     }
    //   })
    // }

  }
}
