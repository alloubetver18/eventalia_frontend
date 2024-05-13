import { Routes } from '@angular/router';

export const routes: Routes = [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'registerorg',
        loadComponent: () => import('./pages/register-organization/register-organization.component').then((m) => m.RegisterOrganizationComponent),
      },
      {
        path: 'listaeventos',
        loadComponent: () => import('./pages/lista-eventos/lista-eventos.component').then((m) => m.ListaEventosComponent),
      },
      {
        path: 'administracion',
        loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'datosEvento',
        loadComponent: () => import('./pages/datos-evento/datos-evento.component').then((m) => m.DatosEventoComponent),
      },
      {
        path: 'datosOrganizacion',
        loadComponent: () => import('./pages/datos-organizacion/datos-organizacion.component').then((m) => m.DatosOrganizacionComponent),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      }
];
