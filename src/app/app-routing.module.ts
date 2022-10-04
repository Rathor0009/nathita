import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurds/auth.gaurd';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'user-profile',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'service-user',
    loadChildren: () => import('./pages/service-user/service-user.module').then( m => m.ServiceUserPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'shop-register',
    loadChildren: () => import('./pages/shop-register/shop-register.module').then( m => m.ShopRegisterPageModule)
  },
  {
    path: 'shop-login',
    loadChildren: () => import('./pages/shop-login/shop-login.module').then( m => m.ShopLoginPageModule)
  },
  {
    path: 'shop-user-profile',
    // canLoad:[AuthGuard],


    loadChildren: () => import('./pages/shop-user-profile/shop-user-profile.module').then( m => m.ShopUserProfilePageModule)
  },
  {
    path: 'payment',
    // canLoad:[AuthGuard],


    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'product-details',
    // canLoad:[AuthGuard],


    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'shop-product-details',
    loadChildren: () => import('./pages/shop-product-details/shop-product-details.module').then( m => m.ShopProductDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
