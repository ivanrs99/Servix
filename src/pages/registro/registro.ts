import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { user } from '../models/user/user';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  u:user={
    Usuario:"",
    pass:""
  }
  passwordRep:string;
  form: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthService, fb:FormBuilder, private toast:ToastController) {
    this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  addUsuario(u:user){
    if(u.Usuario=="" || u.pass=="" || this.passwordRep==""){
      this.mensaje("Campos incompletos.");
    }else{
      if(u.pass==this.passwordRep){
        this.auth.signUp(u.Usuario,u.pass).then(
          () => this.navCtrl.setRoot(HomePage) && this.mensaje("Usuario registrado"),
				  error => this.mensaje(error)
        );
      }else{
        this.mensaje("Contraseñas no coinciden.");
      }
    }
  }
  
  ionViewCanLeave(){
    /**let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    })
    loading.present();

    let promesa = new Promise((resolv,reject) =>{
      setTimeout(() => {
        resolv (true);
        loading.dismiss();        
      }, 1000);
    } );
    return promesa; */
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
