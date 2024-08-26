import { Routes } from '@angular/router';
import {TabsPage} from "./tabs/tabs.page";
import {RotasUtil} from "../util/RotasUtil";

export const routes: Routes = [
  {
    path: RotasUtil.login,
    loadComponent: () => import('./page/autenticacao/login/login.page').then( m => m.LoginPage)
  },
  {
    path: RotasUtil.cadastro,
    loadComponent: () => import('./page/autenticacao/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: RotasUtil.tabs.path,
    component: TabsPage,
    children: [
      {
        path: RotasUtil.tabs.children.contatos,
        loadComponent: () => import('./page/contatos/contatos.page').then((m) => m.ContatosPage),
      },
      {
        path: RotasUtil.tabs.children.inicio,
        loadComponent: () => import('./page/inicio/inicio.page').then( m => m.InicioPage)
      },
    ],
  },
  {
    path: '',
    redirectTo: RotasUtil.login,
    pathMatch: 'full',
  },
];
