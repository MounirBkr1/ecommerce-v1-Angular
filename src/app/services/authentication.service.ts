import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users: any[] = [
    {username: 'admin', password: '1234', roles: ['ADMIN', 'USER']},
    {username: 'user1', password: '1234', roles: ['USER']},
    {username: 'user2', password: '1234', roles: ['USER']},
  ];

  public isAutheticated: boolean = false;
  public userAuthenticated: undefined;
  // @ts-ignore
  public token:string;


  constructor() {
  }


  //LOGIN
  public login(username: string, password: string) {
    let user;
    this.users.forEach(u => {
      if (u.username == username && u.password == password) {
        user = u;
        //create token une fois user existe,l'enregistrer en format string
        this.token = btoa(JSON.stringify({username: u.username, roles: u.roles}));
      }
    });
    if (user) {
      this.isAutheticated = true;
      this.userAuthenticated = user;
    } else {
      this.isAutheticated = false;
      this.userAuthenticated = undefined;
    }
  }

  //ADMIN
  // @ts-ignore
  public isAdmin() {
    if (this.userAuthenticated) {
      // @ts-ignore
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) //retoune position où existe
        return true;
    }
    return false;
  }

  //save données ds local storage,on enregistre pas l'utilisateur,on enregistre que le token
  public saveAuthenticatedUser() {
    if (this.userAuthenticated) {
      //JSON.stringify() method converts a JavaScript object or value to a JSON string , token est un objey
      //btoa() method encodes a string in base-64 url pr qu'il soit transmis via url
      //enregistrer le token avec nom: authToken
      localStorage.setItem('authToken', this.token);
    }
  }


  //recuperer données du local storage et se connecter automatiquement
  public loadAuthenticatedUserFromLocalStorage() {
    let t = localStorage.getItem('authToken');
    //ça devrait devenir un objet javascript
    //atob: decode fait l'inverse de btoa
      if (t) {
        let user = JSON.parse(atob(t));
        // @ts-ignore
        this.userAuthenticated = {username:user.username,roles:user.roles};

        this.isAutheticated = true;

        this.token=t;
    }
  }

  //detruire le token une fois logout
  public removeTokenFromLocalStorage(){
    localStorage.removeItem("authToken");
    this.isAutheticated=false;
    this.token='';
    this.userAuthenticated=undefined;
  }




}
