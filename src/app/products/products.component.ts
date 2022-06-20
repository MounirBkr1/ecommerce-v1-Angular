import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;


  constructor(public catalogueService:CatalogueService,
              private activatedRoute:ActivatedRoute,
              public router:Router) {}


  ngOnInit(): void {
//IMPORTANT:changement de route sur meme url(..//products/2/2 ,../products/2/3)
    this.router.events.subscribe((val)=> {
      //une fois fin de navigation
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.activatedRoute.snapshot.params['p1'];

        if (p1 == 1) {
          //recuperer les produits selectionés==wich selected=true
          this.getProducts("/products/search/selectedproducts");
        } else if (p1 == 2) {
          //chercher a afficher les produit par categories
          let idCategorie = this.activatedRoute.snapshot.params['p2'];
          //donne les produits de la categorie 1 => spring data rest
          this.getProducts('/categories/' + idCategorie + '/products');
        }
        }
      });
    let p1 = this.activatedRoute.snapshot.params['p1'];
    if (p1 == 1) {
      //recuperer les produits selectionés==wich selected=true
      this.getProducts("/products/search/selectedproducts");
    }
  }





  private getProducts(url:string) {
    this.catalogueService.getRessources(url)
      .subscribe(data => {
        this.products=data;
      },error=>{
        console.log(error);
      })
  }
}
