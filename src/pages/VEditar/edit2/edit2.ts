import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, AlertController } from 'ionic-angular';
import { serie } from '../../models/serie/serie';
import { SerieProvider } from '../../../providers/serie/serie';
import { AccionProvider } from '../../../providers/accion/accion';
import { accion } from '../../models/accion/accion';


@IonicPage()
@Component({
  selector: 'page-edit2',
  templateUrl: 'edit2.html',
})
export class Edit2Page {
  s:serie={
    Titulo: "",
    Puntuacion:"",
    Categoria:""
  };
  a:accion={
    evento:""
  }
  constructor(public navCtrl: NavController, public viewCtrl : ViewController, private alerta:AlertController, public navParams: NavParams, private series:SerieProvider,private accion:AccionProvider, private toast:ToastController) {
    this.s = this.navParams.get('data');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  guardar(s:serie){
    if(this.s.Titulo=="" || this.s.Puntuacion=="" || this.s.Categoria==""){
      let alert=this.alerta.create({
        title:'¡ERROR!',
        subTitle:'Has dejado algún campo sin completar',
        buttons:['OK']
      });
      alert.present();
    }else{
      this.series.editItem(s);
      this.a.evento="Has editado la serie "+this.s.Titulo;
      this.accion.addItem(this.a);
      this.viewCtrl.dismiss();
      this.mensaje("Serie editada correctamente");
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
