import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-v1-Angular';

  public categories:any ;

  constructor(private catalogueService:CatalogueService){}

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
}
