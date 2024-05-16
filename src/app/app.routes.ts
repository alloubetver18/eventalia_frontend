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
        path: 'datosEvento/:id',
        loadComponent: () => import('./pages/datos-evento/datos-evento.component').then((m) => m.DatosEventoComponent),
      },
      {
        path: 'datosOrganizacion/:id',
        loadComponent: () => import('./pages/datos-organizacion/datos-organizacion.component').then((m) => m.DatosOrganizacionComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil-usuario/perfil-usuario.component').then((m) => m.PerfilUsuarioComponent),
      },
      {
        path: 'añadirevento',
        loadComponent: () => import('./pages/add-evento/add-evento.component').then((m) => m.AddEventoComponent),
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
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
