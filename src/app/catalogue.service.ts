import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
// @ts-ignore
import {Observable} from "rxjs/dist/types";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string="http://localhost:8080"

  constructor(private http:HttpClient) { }

  public getRessources(url:string){
    return this.http.get(this.host+url)
  };

  //IMPORTANT: UPLOAD PHOTO
  uploadPhotoProduct(file: File, idProduct: string): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    //envoyer formdData qui contient le fichier
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true, //pr recevoir la progression
      responseType: 'text'  //reponse http de type text,si on met rien il return format json par default
    });
    return this.http.request(req);
  }
}
