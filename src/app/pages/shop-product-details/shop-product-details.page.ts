import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopProductService } from 'src/app/services/shop-product/shop-product.service';

@Component({
  selector: 'app-shop-product-details',
  templateUrl: './shop-product-details.page.html',
  styleUrls: ['./shop-product-details.page.scss'],
})
export class ShopProductDetailsPage implements OnInit {
  productData: any;


  constructor(private route: ActivatedRoute, private router: Router,private shopProduct:ShopProductService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
    console.log(params);
    this.shopProduct.getShopProductById(params.shopUser_id,params.shop_id).subscribe({
  next:data=>{
    console.log(data);

    this.productData=data
    
  }
      
    })
    
      }
    });
  }


}
