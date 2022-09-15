import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConsumerService } from 'src/app/services/consumer/consumer.service';

@Component({
  selector: 'app-service-user',
  templateUrl: './service-user.page.html',
  styleUrls: ['./service-user.page.scss'],
})
export class ServiceUserPage implements OnInit {
  user: any;
  param: any;
  
  constructor(private consumer:ConsumerService,private auth:AuthService,private alertController: AlertController,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params)
        this.param=params.serviceValue
        console.log(this.param)
      }
    });
    this.auth.getservice(this.param).subscribe({
      next: data=>{
        this.user=data
        console.log(this.user)
      }
    })
  }
  async presentAlert(id:any) {
    console.log(id)
    let user=id
    const alert = await this.alertController.create({
      header: 'Please enter basic info',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
              console.log('Confirm Cancel');
          }
      }, 
      { 
          text: 'call',
          handler: (alertData) => { //takes the data 
              console.log(alertData.name,alertData.phone);
              let name=alertData.name;let phone=alertData.phone
              this.consumer.consumer(name,phone,user).subscribe({
                next:data=>{
                  console.log(data)
                }
              })
          }
      }
      ],
      inputs: [
        {
          name:'name',
          placeholder: 'Name',
          min:3,
          max:20,
          value:'',
          
        },
       
        {
          name:'phone',
          type: 'number',
          placeholder: 'Mobile No.',
          min: 10,
          max: 10,
          value:''
        },
        
      ],
    });

    await alert.present();
  }
}
