import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AuthService } from '../services/Auth/AuthService';
import { AccionProvider } from '../services/accion/accion';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario:string;
  list:Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthService,public acciones:AccionProvider) {
    let nombre=this.auth.getEmail().split("@");
    this.usuario=nombre[0];
    this.list=this.acciones.getItemList().snapshotChanges().pipe (map ( changes => {
      return changes.map ( c=>(
        {
          key: c.payload.key,
          ...c.payload.val(),
        })
      ).reverse()
    }))
  }

  ngOnInit() {
  }
}
