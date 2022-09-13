import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
user:any
  ServiceName: any;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    this.auth.getuser().subscribe({
      next:data=>{
        console.log(data.getUser)
        console.log(data.ServiceName)
        this.user=data.getUser
        this.ServiceName=data.ServiceName
      }
    })
  }
  signOut(): void {
    window.sessionStorage.clear();
    this['router'].navigate(['home'])
  }

}
