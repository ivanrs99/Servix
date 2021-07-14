import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController, AlertController } from '@ionic/angular';
import { libro } from '../../models/libro/libro';
import { LibroProvider } from '../../services/libro/libro';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { accion } from '../../models/accion/accion';
import { AccionProvider } from '../../services/accion/accion';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.page.html',
  styleUrls: ['./modal3.page.scss'],
})
export class Modal3Page implements OnInit {
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
  
  constructor(public alerta:AlertController, public navParams: NavParams, private modalCtrl: ModalController, private libro:LibroProvider, private accion:AccionProvider, private toast:ToastController) {
    this.list=this.libro.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        }))
      }))
  }

  async cerrarModal(){
    await this.modalCtrl.dismiss();
  }

  guardar(){
    if(this.titulo!=null && this.puntuacion!=null && this.cat!=null){
      if(this.titulo!="" && this.puntuacion!="" && this.cat!=""){
        this.l.Titulo=this.titulo;
        this.l.Puntuacion=this.puntuacion;
        this.l.Categoria=this.cat;
        this.a.evento="Has añadido el libro "+this.l.Titulo;
        this.mensaje("Libro añadido correctamente.");
        this.libro.addItem(this.l);
        this.accion.addItem(this.a);
        this.cerrarModal();
      }else{
        this.alert();
      }      
    }else{
      this.alert();
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

  async alert(){
    const alert= await this.alerta.create({
      message:'¡ERROR!',
      subHeader:'Has dejado algún campo sin completar',
      buttons:['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }
}
