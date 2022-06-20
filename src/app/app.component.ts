import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private router:Router){}

  ngOnInit(): void {
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


  onSelectedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/1/0");
  }
}
