import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class CacheProvider {

  mail=null;
  pass=null;
  oscuro=null;

  constructor(private plataforma: Platform) {

    }

  recuperar_mail(){
    let promesa = new Promise ((resolv, reject) =>{
      if (this.plataforma.is("cordova")){ //estamos en el móvil
          this.mail=JSON.parse(window.localStorage.getItem("mail"));
          this.pass=JSON.parse(window.localStorage.getItem("pass"));
        } else { //estamos en el navegador
          if( localStorage.getItem("mail")){
            this.mail = JSON.parse(localStorage.getItem("mail"));
            this.pass = JSON.parse(localStorage.getItem("pass"));
          }
          resolv();
      }
    });
    return promesa;
  }

  recuperar_pass(){
    let promesa = new Promise ((resolv, reject) =>{
      if (this.plataforma.is("cordova")){ //estamos en el móvil
          this.pass=JSON.parse(window.localStorage.getItem("pass"));
        } else { //estamos en el navegador
          if( localStorage.getItem("pass")){
            this.pass = JSON.parse(localStorage.getItem("pass"));
          }
          resolv();
      }
    });
    return promesa;
  }

  guardar_mail(email:string){
    if (this.plataforma.is("cordova")){ 
      /*this.storage.ready()
        .then(()=>{ this.storage.set("mail",JSON.stringify(email))}
      );*/
      window.localStorage.setItem("mail",JSON.stringify(email));
    } else {
      localStorage.setItem("mail", JSON.stringify(email) ); 
    }
  }

  guardar_pass(password:string){
    if (this.plataforma.is("cordova")){ 
      /*this.storage.ready()
        .then(()=>{ this.storage.set("pass",JSON.stringify(password))}
      );*/
      window.localStorage.setItem("pass",JSON.stringify(password));
    } else {
      localStorage.setItem("pass", JSON.stringify(password) ); 
    }
  }

  modo_oscuro(){
    if (this.plataforma.is("cordova")){ 
      let oscure=JSON.parse(window.localStorage.getItem("oscuremod"));
      if(oscure!="active"){
        window.localStorage.setItem("oscuremod",JSON.stringify("active"));
      }else{
        window.localStorage.setItem("oscuremod",JSON.stringify("noactive"));
      }      
    } else {
      let oscure=JSON.parse(localStorage.getItem("oscuremod"));
      if(oscure!="active"){
        localStorage.setItem("oscuremod",JSON.stringify("active"));
      }else{
        localStorage.setItem("oscuremod",JSON.stringify("noactive"));
      }  
    }
  }

  recuperar_modo(){
    let promesa = new Promise ((resolv, reject) =>{
      if (this.plataforma.is("cordova")){ //estamos en el móvil
          this.oscuro=JSON.parse(window.localStorage.getItem("oscuremod"));
        } else { //estamos en el navegador
          if( localStorage.getItem("oscuremod")){
            this.oscuro = JSON.parse(localStorage.getItem("oscuremod"));
          }
          resolv();
      }
    });
    return promesa;
  }
}
