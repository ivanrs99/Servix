import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/AuthService';
import { AccionProvider } from '../../providers/accion/accion';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

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
        }
      )
      ).reverse()
  }
  )
  )
  }
}
