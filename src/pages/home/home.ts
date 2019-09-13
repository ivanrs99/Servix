import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
import {RegistroPage} from '../registro/registro'
import { user } from '../models/user/user';
import { PrincipalPage } from '../principal/principal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
//import { AppVersion } from '@ionic-native/app-version';
import { CacheProvider } from './../../providers/cache/cache';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  u:user={
    Usuario:"",
    pass:""
  }
  //protected versionNumber: string;
  loginForm:FormGroup;
  loginError:string;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public navParams:NavParams, public platform:Platform,
            private auth:AuthService, private cache: CacheProvider,fb:FormBuilder, private toast:ToastController) {
        this.loginForm = fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });  
        //if(this.platform.is("cordova")){
          //this.appVersion.getVersionNumber().then(version=>{
            //this.versionNumber=version;
          //});
        //} 
  }

  login(u:user){
    if(u.Usuario=="" || u.pass==""){
      this.mensaje("Campos incompletos.");
    }else{
      this.auth.signInWithEmail(u.Usuario,u.pass).then(
				() => this.iniciarSesionCache(),
				error => this.mensaje("Error de inicio de sesión.")
			);
    }
  }

  iniciarSesionCache(){
    let loading = this.loadingCtrl.create({
      //content: "Espere por favor..."
    })
    loading.present();

    let promesa = new Promise((resolv,reject) =>{
      setTimeout(() => {
        resolv (true);
        loading.dismiss();
        this.cache.guardar_mail(this.u.Usuario);
        this.cache.guardar_pass(this.u.pass);
        this.navCtrl.setRoot(PrincipalPage)        
      }, 1000);
    } );
    return promesa;
      
  }

  irRegistro(){
    this.navCtrl.push(RegistroPage);
  }

  mensaje (texto:string)
  {
    const toast = this.toast.create({
      message: texto,
      duration: 3000
    });
    toast.present();
  }
}
