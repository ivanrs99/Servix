import { Component, OnInit } from '@angular/core';
import { user } from '../models/user/user';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  u:user={
    Usuario:"",
    pass:""
  }
  passwordRep:string;
  form: FormGroup;
  
  constructor(private route:Router,private auth:AuthService, fb:FormBuilder, private toast:ToastController) {
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
          () => this.route.navigate(['home']) && this.mensaje("Usuario registrado"),
				  error => this.mensaje(error)
        );
      }else{
        this.mensaje("Contraseñas no coinciden.");
      }
    }
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

  ngOnInit() {
  }
}
