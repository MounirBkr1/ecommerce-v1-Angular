import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users:any[] =[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER','ADMIN']},
    {username:'user2',password:'1234',roles:['USER']},
  ];

  public isAutheticated:boolean=false;
  public userAuthenticated:undefined;
  constructor() { }


  //LOGIN
  public login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user=u;
      }
    });
    if(user){
      this.isAutheticated=true;
      this.userAuthenticated=user;
    }else{
      this.isAutheticated=false;
      this.userAuthenticated=undefined;
    }
  }

  //ADMIN
  // @ts-ignore
  public isAdmin(){
    if(this.userAuthenticated){
      // @ts-ignore
      if(this.userAuthenticated.roles.idexOf('ADMIN')>-1 ) //retoune position où existe
          return true;
    }
  }
}
