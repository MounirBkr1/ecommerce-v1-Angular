import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;
  public editPhoto: boolean=false;
  public currentProduct: any;
  private selectedFiles: any;
  public progress: number=0;
  private currentFileUpload: any;
  public title:string='';
  public currentTime:number=0;


  constructor(public catalogueService:CatalogueService,
              private activatedRoute:ActivatedRoute,
              public router:Router,
              public authService:AuthenticationService) {}


  ngOnInit(): void {

    // @ts-ignore
    //alert("i m here"+ this.userAuthenticated.roles.idexOf('ADMIN'));

//IMPORTANT:changement de route sur meme url(..//products/2/2 ,../products/2/3)
    this.router.events.subscribe((val)=> {
      //une fois fin de navigation
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.activatedRoute.snapshot.params['p1'];

        if (p1 == 1) {
          this.title="produits selectionnés";
          //recuperer les produits selectionés==wich selected=true
          this.getProducts("/products/search/selectedproducts");
        } else if (p1 == 2) {
          //chercher a afficher les produit par categories
          let idCategorie = this.activatedRoute.snapshot.params['p2'];

          this.title="produits de la catégorie" +idCategorie;

          //donne les produits de la categorie 1 => spring data rest
          this.getProducts('/categories/' + idCategorie + '/products');
        }else if (p1 == 3) {
          this.title="produits en promotion";
          //donne les produits de la categorie 1 => spring data rest
          this.getProducts('/products/search/promoProducts');
        }else if (p1 == 4) {
          this.title="produits Disponibles";
          //donne les produits de la categorie 1 => spring data rest
          this.getProducts('/products/search/dispoProducts');
        }else if (p1 == 5) {
          this.title="produits Recherchés..";
          //donne les produits de la categorie 1 => spring data rest
          this.getProducts('/products/search/dispoProducts');
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

  onEditPhoto(p:any) {
    this.currentProduct=p;
    this.editPhoto=true;
  }


  onSelectFile(event: Event) {
    // @ts-ignore
    this.selectedFiles =event.target.files; //ensemble des fichiers selectionnées
  }


  //IMPORTANT :UPLOAD PHOTO
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)

    // @ts-ignore
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
      }
    },(error:any)=>{
      alert("Problème de chargement"+error);
    })



    this.selectedFiles = undefined
  }

  //get time pour actualiser automatiquement les photos
  getTS() {
    return this.currentTime;
  }

  //afficher des icons slm pour admin
  isAdmin() {
    return this.authService.isAdmin();
  }


}
