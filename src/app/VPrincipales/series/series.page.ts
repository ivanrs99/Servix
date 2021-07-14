import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { SerieProvider } from '../../services/serie/serie';
import { serie } from '../../models/serie/serie';
import { AccionProvider } from '../../services/accion/accion';
import { accion } from '../../models/accion/accion';
import { Modal2Page } from 'src/app/VModales/modal2/modal2.page';
import { Edit2Page } from 'src/app/VEditar/edit2/edit2.page';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  cat:string="Todos";
  a:accion={
    evento:""
  }
  lista:Observable<any[]>;
  
  constructor(public serie:SerieProvider,private toast:ToastController, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams,private accion:AccionProvider) {
    this.lista=this.serie.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        }
      )
      ).reverse()
    }))
  }

  categoriaElegida(){
    if(this.cat=='Todos'){
      this.lista=this.serie.getItemList().snapshotChanges().pipe (map ( changes => {
        return changes.map ( c=>(
          {
            key: c.payload.key,
            ...c.payload.val(),
          }
        ))
      }))
    }else{
      this.lista=this.lista.pipe(map(arr =>
        arr.filter( r => r.Categoria === this.cat )
      ))
    }
    
  }

  borrar(p:serie){
    this.serie.borrarItem(p);
    this.a.evento="Has borrado la serie "+p.Titulo;
    this.accion.addItem(this.a);
    this.mensaje("Serie borrada correctamente");
  }

  async abrirModal(){
    const mPage=await this.modalCtrl.create({
      component: Modal2Page
    });
    return await mPage.present();
  }

  async abrirModalEdit(item:serie){
    const mPage=await this.modalCtrl.create({
      component: Edit2Page,
      componentProps:{
        "object":item
      }
    });
    return await mPage.present();
  }

  mensaje (texto:string)
  {
    this.toast.create({
      message: texto,
      duration: 1300
    }).then((toastData)=>{
      toastData.present();
    });
  }

  ngOnInit() {
  }

}
