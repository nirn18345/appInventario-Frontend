import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'products', loadComponent: ()=> import('./components/Producto/producto-lista/producto-lista.component').then(m=> m.ProductoListaComponent)},
    {path: 'products/edit/:id', loadComponent: ()=> import('./components/Producto/producto-formulario/producto-formulario.component').then(m=> m.ProductoFormularioComponent)},
    {path: 'products/new', loadComponent: ()=> import('./components/Producto/producto-formulario/producto-formulario.component').then(m=> m.ProductoFormularioComponent)},
    { path: '**', redirectTo: 'productos' },
];
