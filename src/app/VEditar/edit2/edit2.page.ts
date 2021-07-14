import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { serie } from '../../models/serie/serie';
import { SerieProvider } from '../../services/serie/serie';
import { AccionProvider } from '../../services/accion/accion';
import { accion } from '../../models/accion/accion';

@Component({
  selector: 'app-edit2',
  templateUrl: './edit2.page.html',
  styleUrls: ['./edit2.page.scss'],
})
export class Edit2Page implements OnInit {
  s:serie={
    Titulo: "",
    Puntuacion:"",
    Categoria:""
  };
  a:accion={
    evento:""
  }
  constructor(private modalCtrl:ModalController, private alerta:AlertController, public navParams: NavParams, private series:SerieProvider,private accion:AccionProvider, private toast:ToastController) {
  }

  async cerrarModal(){
    await this.modalCtrl.dismiss();
  }

  guardar(s:serie){
    if(this.s.Titulo=="" || this.s.Puntuacion=="" || this.s.Categoria==""){
      this.alert();
    }else{
      this.series.editItem(s);
      this.a.evento="Has editado la serie "+this.s.Titulo;
      this.accion.addItem(this.a);
      this.cerrarModal();
      this.mensaje("Serie editada correctamente.");
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
    this.s = this.navParams.data.object;
  }
}
