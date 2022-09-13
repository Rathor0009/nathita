import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-service-user',
  templateUrl: './service-user.page.html',
  styleUrls: ['./service-user.page.scss'],
})
export class ServiceUserPage implements OnInit {
  user: any;
  param: any;
  
  constructor(private auth:AuthService,private alertController: AlertController,private route: ActivatedRoute,private router: Router) { }

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
  async presentAlert() {
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
              
          }
      }
      ],
      inputs: [
        {
          name:'name',
          placeholder: 'Name',
          min:3,
          max:20,
          value:''
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
