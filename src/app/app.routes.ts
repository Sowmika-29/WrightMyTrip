import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DomesticComponent } from './pages/domestic/domestic.component';
import { InternationalComponent } from './pages/international/international.component';
import { TripDetailsComponent } from './pages/trip-details/trip-details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'domestic', component: DomesticComponent },
  { path: 'international', component: InternationalComponent },
  { path: 'trip/:id', component: TripDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'home' }
];
