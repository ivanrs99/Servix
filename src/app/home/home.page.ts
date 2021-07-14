import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { user } from '../models/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth/AuthService';
import { CacheProvider } from '../services/cache/cache';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  u:user={
    Usuario:"",
    pass:""
  }
  loginForm:FormGroup;
  loginError:string;

  constructor(private route:Router, private loadingCtrl: LoadingController,
            private auth:AuthService, private cache: CacheProvider,fb:FormBuilder, private toast:ToastController) {
        this.loginForm = fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });  
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
    this.loadingCtrl.create({
    }).then((res)=>{
      res.present();
    })

    let promesa = new Promise((resolv,reject) =>{
      setTimeout(() => {
        resolv (true);
        this.loadingCtrl.dismiss();
        this.cache.guardar_mail(this.u.Usuario);
        this.cache.guardar_pass(this.u.pass);
        this.route.navigate(['principal'])        
      }, 1000);
    } );
    return promesa;
      
  }

  irRegistro(){
    this.route.navigate(['registro'])  
  }

  mensaje (texto:string)
  {
    this.toast.create({
      message: texto,
      duration: 3000
    }).then((toastData)=>{
      toastData.present();
    });
  }
}
