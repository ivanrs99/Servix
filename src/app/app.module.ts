import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { PrincipalPage } from '../pages/principal/principal';
import { PeliculaProvider } from '../providers/pelicula/pelicula';
import { TooltipsModule, TooltipController } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SerieProvider } from '../providers/serie/serie';
import { LibroProvider } from '../providers/libro/libro';
import { EditPageModule } from '../pages/VEditar/edit/edit.module';
import { PeliculasPageModule } from '../pages/VPrincipales/peliculas/peliculas.module';
import { AuthService } from '../services/AuthService';
import { SeriesPageModule } from '../pages/VPrincipales/series/series.module';
import { LibrosPageModule } from '../pages/VPrincipales/libros/libros.module';
import { AccionProvider } from '../providers/accion/accion';
import { CacheProvider } from '../providers/cache/cache';


export const firebaseConfig = {
  apiKey: "AIzaSyBtlb7hOj-EAWmaysIOKpxNMhtES2n50Yc",
  authDomain: "catalogator-39019.firebaseapp.com",
  databaseURL: "https://catalogator-39019.firebaseio.com",
  projectId: "catalogator-39019",
  storageBucket: "catalogator-39019.appspot.com",
  messagingSenderId: "71378506063"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    TooltipsModule,
    BrowserAnimationsModule,
    EditPageModule,
    PeliculasPageModule,
    SeriesPageModule,
    LibrosPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistroPage,
    PrincipalPage
  ],
  providers: [
    IonicStorageModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeliculaProvider,
    SerieProvider,
    LibroProvider,
    AuthService,
    AngularFireAuth,
    AccionProvider,
    CacheProvider,
    TooltipController
  ]
})
export class AppModule {}
