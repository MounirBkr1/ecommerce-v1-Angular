import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../services/catalogue.service";
import {Product} from "../model/product.model";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // @ts-ignore
  currentProduct:Product;
  selectedFiles: any;
  progress: number=0;
  currentFileUpload: any;
  public currentTime: number=0;
  public  editPhoto: boolean=false;
  public  mode: number=0;

  constructor(private  router:Router,
              private activatedRoute:ActivatedRoute,
              public  catalogueService:CatalogueService,
              public authService:AuthenticationService) { }

  ngOnInit(): void {


    let url= atob(this.activatedRoute.snapshot.params['url']); //envoie: http://localhost:8080/products/2 en atob

    this.catalogueService.getProduct(url).subscribe((data: Product)=>{

      this.currentProduct=data;
    },(err:any)=>console.log(err));
  }

  onAddProductToCaddy(currentProduct: Product) {

  }

  onEditPhoto(p:Product) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile($event: Event) {
    // @ts-ignore
    this.selectedFiles =event.target.files; //ensemble des fichiers selectionnées
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    // @ts-ignore
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },(err:any)=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }




  getTS() {
    return this.currentTime;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }


  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data:any) {
    /*
    let url=this.currentProduct._links.self.href;
    this.catalogueService.patchResource(url,data)
      .subscribe((d:any)=>{
        this.currentProduct=d;
        this.mode=0;
      },(err:any)=>{
        console.log(err);
      })

     */
  }
}
