import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;

  constructor(public catalogueService:CatalogueService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.catalogueService.getRessources("/products/search/selectedproducts")
      .subscribe(data => {
        this.products=data;
      },error=>{
        console.log(error);
      })
  }
}
