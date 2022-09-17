import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConsumerService } from 'src/app/services/consumer/consumer.service';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-service-user',
  templateUrl: './service-user.page.html',
  styleUrls: ['./service-user.page.scss'],
})
export class ServiceUserPage implements OnInit {
  user: any;
  user1: any;
  serviceData: any;
  form:any={
    service:''
  }
  errorMessage: any;
  selectedService: any;

  
  constructor(private service: ServiceService,private consumer:ConsumerService,private auth:AuthService,private alertController: AlertController,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params)
        this.selectedService=params.serviceValue;
        
       
        console.log("yyyyyyyyyyyyy",this.form.service)
      }
    });
    this.auth.getservice(this.selectedService).subscribe({
      next: data=>{
        this.user=data.getUser
        // this.user1=data.getserviceName
        // console.log(this.user)
        // console.log(this.user1.name)
      }
    })
    this.service.services().subscribe({
      next: (data) => {
        this.serviceData = data.data
        // console.log(this.serviceData)
        this.form.service = this.selectedService;
      }
    })
  }
  onSubmit(){

    const { service } = this.form;
console.log(this.form)
    this.auth.getservice(service).subscribe({
      next: data => {
this.user=data.getUser
        console.log(data.getUser)
        // console.log(data.service)
        

      },
      error: err => {
        this.errorMessage = err.error.message;

      }
    });
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
