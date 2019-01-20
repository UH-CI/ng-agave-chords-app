import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SitesComponent } from './sites/sites.component';
import { SiteComponent } from './site/site.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { VariableComponent } from './variable/variable.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sites',
        component: SitesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'site',
        component: SiteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'instruments',
        component: InstrumentsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'instrument',
        component: InstrumentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'variable',
        component: VariableComponent,
        canActivate: [AuthGuard]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
