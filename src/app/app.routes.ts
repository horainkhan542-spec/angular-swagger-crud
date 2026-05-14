import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'students',
    loadComponent: () => import('./pages/students/students').then((m) => m.Students),
  },
  {
    path: 'teachers',
    loadComponent: () => import('./pages/teachers/teachers').then((m) => m.Teachers),
  },
  {
    path: 'classes',
    loadComponent: () => import('./pages/Classes/Classes').then((m) => m.Classes),
  },
  {
    path: 'subjects',
    loadComponent: () => import('./pages/subjects/subjects').then((m) => m.Subjects),
  },
  {
    path: 'attendance',
    loadComponent: () => import('./pages/attendance/attendance').then((m) => m.Attendance),
  },
  {
    path: 'fees',
    loadComponent: () => import('./pages/fees/fees').then((m) => m.Fees),
  },
  {
    path: 'results',
    loadComponent: () => import('./pages/results/results').then((m) => m.Results),
  },
];
