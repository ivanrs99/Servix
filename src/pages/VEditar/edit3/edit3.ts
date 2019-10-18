import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { libro } from '../../../pages/models/libro/libro';
import { LibroProvider } from '../../../providers/libro/libro';
import { accion } from '../../models/accion/accion';
import { AccionProvider } from '../../../providers/accion/accion';

@IonicPage()
@Component({
  selector: 'page-edit3',
  templateUrl: 'edit3.html',
})
export class Edit3Page {
  l:libro={
    Titulo: "",
    Puntuacion:"",
    Categoria:""
  };
  a:accion={
    evento:""
  }
  constructor(public navCtrl: NavController,public viewCtrl : ViewController,private alerta:AlertController, public navParams: NavParams, private libros:LibroProvider,private accion:AccionProvider, private toast:ToastController) {
    this.l = this.navParams.get('data');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  guardar(l:libro){
    if(this.l.Titulo=="" || this.l.Puntuacion=="" || this.l.Categoria==""){
      let alert=this.alerta.create({
        title:'¡ERROR!',
        subTitle:'Has dejado algún campo sin completar',
        buttons:['OK']
      });
      alert.present();
    }else{
      this.libros.editItem(l);
      this.a.evento="Has editado el libro "+this.l.Titulo;
      this.accion.addItem(this.a);
      this.viewCtrl.dismiss();
      this.mensaje("Libro editado correctamente");
    }
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
