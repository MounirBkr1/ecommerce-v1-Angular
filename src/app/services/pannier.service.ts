import { Injectable } from '@angular/core';
import {Client} from "../model/Client.model";
import {AuthenticationService} from "./authentication.service";
import {Pannier} from "../model/pannier.model";
import {ItemProduct} from "../model/ItemProduct.model";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class PannierService {

   public currentPannierName:string="Pannier1";
  //public listPanniers:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];
  public panniers:Map<string,Pannier>=new Map();

  constructor(){



    //charger au moins un panier au demmarage
    let pannier=new Pannier(this.currentPannierName);
    this.panniers.set(this.currentPannierName,pannier);
  }

  public addProductToPannier(product:Product):void{
    let pannier=this.panniers.get(this.currentPannierName);
    // @ts-ignore
    let productItem:ItemProduct=pannier.items.get(product.id);

    //if product existe
    if(productItem){
      productItem.quantity += product.quantity;
    }
    else{
      productItem=new ItemProduct();
      productItem.price=product.price;
      productItem.quantity=product.quantity;
      productItem.product=product;
      // @ts-ignore
      pannier.items.set(product.id,productItem);
      this.savePanniers();
    }
  }

  public savePanniers(){
    //save panniers in local storage
    localStorage.setItem('myPanniers',JSON.stringify(this.panniers))
  }

  public getCurrentPannier():Pannier{
    return <Pannier>this.panniers.get(this.currentPannierName);
  }


  public getTotal():number {
    let total=0;
    let items:Iterator<ItemProduct> = this.getCurrentPannier().items.values();
    // @ts-ignore
    for(let pi of items){
      total += pi.price * pi.quantity;
    }
    return total;
  }
}
