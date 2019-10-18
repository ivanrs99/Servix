import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { libro } from '../../models/libro/libro';
import { LibroProvider } from '../../../providers/libro/libro';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { accion } from '../../models/accion/accion';
import { AccionProvider } from '../../../providers/accion/accion';

@IonicPage()
@Component({
  selector: 'page-modal3',
  templateUrl: 'modal3.html',
})
export class Modal3Page {
  titulo:string;
  puntuacion:string;
  cat:string;

  l:libro={
    Titulo:"",
    Puntuacion:"",
    Categoria:""
  }
  a:accion={
    evento:""
  }

  list:Observable<libro[]>;
  constructor(public navCtrl: NavController, public alerta:AlertController, public navParams: NavParams,public viewCtrl : ViewController, private libro:LibroProvider, private accion:AccionProvider, private toast:ToastController) {
    this.list=this.libro.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        }
      )
      )
  }
  )
  )
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  guardar(){
    if(this.titulo!=null && this.puntuacion!=null && this.cat!=null){
      if(this.titulo!="" && this.puntuacion!="" && this.cat!=""){
        this.l.Titulo=this.titulo;
        this.l.Puntuacion=this.puntuacion;
        this.l.Categoria=this.cat;
        this.a.evento="Has añadido el libro "+this.l.Titulo;
        this.mensaje("Libro añadido correctamente");
        this.libro.addItem(this.l);
        this.accion.addItem(this.a);
        this.viewCtrl.dismiss();
      }else{
        let alert=this.alerta.create({
          title:'¡ERROR!',
          subTitle:'Has dejado algún campo sin completar',
          buttons:['OK']
        });
        alert.present();
      }      
    }else{
      let alert=this.alerta.create({
        title:'¡ERROR!',
        subTitle:'Has dejado algún campo sin completar',
        buttons:['OK']
      });
      alert.present();
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

