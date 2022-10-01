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
        handler: () => {
          // this.handlerMessage = 'Alert canceled';
        },
      }, {
        text: 'ADD',
        handler: (alertData) => { //takes the data 

          console.log(alertData.quantity);

          this.shopProduct.createShopProduct(alertData.name, alertData.price, alertData.quantity,alertData.description).subscribe({
            next: data => {
              console.log(data)
              this.message = data.message

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
  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          // this.handlerMessage = 'Alert canceled';
        },
      }, {
        text: 'yes',
        handler: () => {
          this.shopProduct.deleteShopProduct(this.product._id).subscribe({
            next: data => {
              this.message = data.message
              this.presentToast('top')
            }
          })
        }
      }],
    });

    await alert.present();
  }

  statusUpdate(event, index) {
    console.log("toggle index",index);
    console.log("product before",this.product[index]);
    this.product[index].status = !this.product[index].status; 
    console.log("product after",this.product[index]);
  }
}
