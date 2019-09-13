import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { serie } from '../../pages/models/serie/serie';
import { AuthService } from '../../services/AuthService';

@Injectable()
export class SerieProvider {
  nombre=this.auth.getEmail().split("@");
  mail=this.auth.getEmail().replace(".","");
  listaSeries=this.db.list<serie>('listaSeries'+this.mail);

  constructor( private auth:AuthService,private db:AngularFireDatabase) {
    
  }

  addItem(p:serie){
    return this.listaSeries.push(p);
  }

  getItemList(){
    return this.listaSeries;
  }

  editItem(p:serie){
    return this.listaSeries.update(p.key,p);
  }

  borrarItem(p:serie){
    return this.listaSeries.remove(p.key);
  }
}