

import {ItemProduct} from "./ItemProduct.model";
import {Client} from "./Client.model";

export class Pannier{

  constructor(name:string){this.name=name;}

  public name:string;

  //map (key= id du produit, value=ItemProduct(class intermediaire qui contienet(id + name+ price + quantity)
  public items:Map<number,ItemProduct>=new Map();

  // @ts-ignore
  public client:Client;
}
