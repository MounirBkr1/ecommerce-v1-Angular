import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./services/catalogue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {PannierService} from "./services/pannier.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-v1-Angular';

  public categories:any ;
  currentCategorie:any;


  constructor(private catalogueService:CatalogueService,
              private router:Router,
              private authService:AuthenticationService,
              public panierService:PannierService ){}

  ngOnInit(): void {
    //s'il trouve l'user il le charge et sait que vs etes authentifié et connait les roles
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();

  }

  private getCategories() {
    this.catalogueService.getRessources("/categories")
      .subscribe(data => {
        this.categories = data;
        },
      error=>{console.log(error)});
  }

  getProductByCategorie(c: any) {
    this.currentCategorie==c;
    this.router.navigateByUrl('/products/2/'+c.id)
  }

//afficher les produits selectionnés
  onSelectedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  //afficher les produits en promotion
  onProductPromo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  //afficher les produit disponibles
  onProductDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  //logOut
  onLogout() {
    //supprimr user et initialiser local storage
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl("login");
  }
}
