import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'principal', loadChildren: './principal/principal.module#PrincipalPageModule' },
  { path: 'peliculas', loadChildren: './VPrincipales/peliculas/peliculas.module#PeliculasPageModule' },
  { path: 'series', loadChildren: './VPrincipales/series/series.module#SeriesPageModule' },
  { path: 'libros', loadChildren: './VPrincipales/libros/libros.module#LibrosPageModule' },
  { path: 'edit', loadChildren: './VEditar/edit/edit.module#EditPageModule' },
  { path: 'edit2', loadChildren: './VEditar/edit2/edit2.module#Edit2PageModule' },
  { path: 'edit3', loadChildren: './VEditar/edit3/edit3.module#Edit3PageModule' },
  { path: 'modal', loadChildren: './VModales/modal/modal.module#ModalPageModule' },
  { path: 'modal2', loadChildren: './VModales/modal2/modal2.module#Modal2PageModule' },
  { path: 'modal3', loadChildren: './VModales/modal3/modal3.module#Modal3PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
