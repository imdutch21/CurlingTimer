import { Routes } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { TimerComponent } from './components/timer/timer.component';

export const routes: Routes = [
    { path: 'timer', component: TimerComponent },
    { path: '**', component: SetupComponent }

];
