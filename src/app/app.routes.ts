import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.HomePage),
    title: 'Manar Al Batin International School',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.AboutPage),
    title: 'About · Manar Al Batin',
  },
  {
    path: 'aim',
    loadComponent: () => import('./features/aim/aim').then((m) => m.AimPage),
    title: 'Mission & Vision · Manar Al Batin',
  },
  {
    path: 'academics',
    loadComponent: () => import('./features/academics/academics').then((m) => m.AcademicsPage),
    title: 'Academics · Manar Al Batin',
  },
  {
    path: 'faculty',
    loadComponent: () => import('./features/faculty/faculty').then((m) => m.FacultyPage),
    title: 'Faculty · Manar Al Batin',
  },
  {
    path: 'facilities',
    loadComponent: () => import('./features/facilities/facilities').then((m) => m.FacilitiesPage),
    title: 'Facilities · Manar Al Batin',
  },
  {
    path: 'facilities/:slug',
    loadComponent: () => import('./features/facilities/facility-detail').then((m) => m.FacilityDetailPage),
    title: 'Facility · Manar Al Batin',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/gallery').then((m) => m.GalleryPage),
    title: 'Gallery · Manar Al Batin',
  },
  {
    path: 'admissions',
    loadComponent: () => import('./features/admissions/admissions').then((m) => m.AdmissionsPage),
    title: 'Admissions · Manar Al Batin',
  },
  {
    path: 'admissions/fees',
    loadComponent: () => import('./features/admissions/fees').then((m) => m.FeesPage),
    title: 'Fee Structure · Manar Al Batin',
  },
  {
    path: 'admissions/requirements',
    loadComponent: () => import('./features/admissions/requirements').then((m) => m.RequirementsPage),
    title: 'Requirements · Manar Al Batin',
  },
  {
    path: 'admissions/register',
    loadComponent: () => import('./features/admissions/register').then((m) => m.RegisterPage),
    title: 'Registration · Manar Al Batin',
  },
  {
    path: 'resources',
    loadComponent: () => import('./features/resources/resources').then((m) => m.ResourcesPage),
    title: 'Downloads · Manar Al Batin',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.ContactPage),
    title: 'Contact · Manar Al Batin',
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/login').then((m) => m.AdminLoginPage),
    title: 'Staff Login · Manar Al Batin',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/dashboard/dashboard').then((m) => m.AdminDashboardPage),
    title: 'Admin · Manar Al Batin',
  },
  { path: '**', redirectTo: '' },
];
