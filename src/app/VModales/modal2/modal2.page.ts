import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { serie } from '../../models/serie/serie';
import { SerieProvider } from '../../services/serie/serie';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AccionProvider } from '../../services/accion/accion';
import { accion } from '../../models/accion/accion';

@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.page.html',
  styleUrls: ['./modal2.page.scss'],
})
export class Modal2Page implements OnInit {

  titulo:string;
  puntuacion:string;
  cat:string;

  s:serie={
    Titulo:"",
    Puntuacion:"",
    Categoria:""
  }
  a:accion={
    evento:""
  }
  list:Observable<serie[]>;
  
  constructor(public alerta:AlertController, public navParams: NavParams,private modalCtrl: ModalController, private serie:SerieProvider, private accion:AccionProvider, private toast:ToastController) {
    this.list=this.serie.getItemList().snapshotChanges().pipe (map ( changes => {
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
        this.s.Titulo=this.titulo;
        this.s.Puntuacion=this.puntuacion;
        this.s.Categoria=this.cat;
        this.a.evento="Has añadido la serie "+this.s.Titulo;
        this.mensaje("Serie añadida correctamente.");
        this.serie.addItem(this.s);
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
