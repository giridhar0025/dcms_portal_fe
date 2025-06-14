import { lazy } from 'react';
import { Role } from '../constants/roles';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const Settings = lazy(() => import('../pages/Settings'));
const Patients = lazy(() => import('../pages/Patients'));
const PatientProfile = lazy(() => import('../pages/PatientProfile'));
const Appointments = lazy(() => import('../pages/Appointments'));
const NewAppointment = lazy(() => import('../pages/NewAppointment'));
const Billing = lazy(() => import('../pages/Billing'));
const Payments = lazy(() => import('../pages/Payments'));
const Reports = lazy(() => import('../pages/Reports'));
const Inventory = lazy(() => import('../pages/Inventory'));
const ClinicalCharting = lazy(() => import('../pages/ClinicalCharting'));
const Treatments = lazy(() => import('../pages/Treatments'));
const Imaging = lazy(() => import('../pages/Imaging'));
const PatientRegister = lazy(() => import('../pages/PatientRegister'));
const Waitlist = lazy(() => import('../pages/Waitlist'));
const Communication = lazy(() => import('../pages/Communication'));
const SchedulingReports = lazy(() => import('../pages/SchedulingReports'));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  roles: Role[];
}

export const appRoutes: AppRoute[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    roles: [Role.Admin, Role.Dentist, Role.Receptionist]
  },
  {
    path: '/users',
    element: <Users />,
    roles: [Role.Admin]
  },
  {
    path: '/settings',
    element: <Settings />,
    roles: [Role.Admin]
  },
  {
    path: '/patients',
    element: <Patients />,
    roles: [Role.Admin, Role.Dentist, Role.Receptionist]
  },
  {
    path: '/patients/:id',
    element: <PatientProfile />,
    roles: [Role.Admin, Role.Dentist]
  },
  {
    path: '/appointments',
    element: <Appointments />,
    roles: [Role.Admin, Role.Dentist, Role.Receptionist]
  },
  {
    path: '/appointments/new',
    element: <NewAppointment />,
    roles: [Role.Admin, Role.Dentist, Role.Receptionist]
  },
  {
    path: '/billing',
    element: <Billing />,
    roles: [Role.Admin, Role.Receptionist]
  },
  {
    path: '/billing/payments',
    element: <Payments />,
    roles: [Role.Admin, Role.Receptionist]
  },
  {
    path: '/reports',
    element: <Reports />,
    roles: [Role.Admin, Role.Dentist, Role.Receptionist]
  },
  {
    path: '/inventory',
    element: <Inventory />,
    roles: [Role.Admin]
  },
  {
    path: '/clinical/charting',
    element: <ClinicalCharting />,
    roles: [Role.Dentist]
  },
  {
    path: '/treatments',
    element: <Treatments />,
    roles: [Role.Dentist]
  },
  {
    path: '/imaging',
    element: <Imaging />,
    roles: [Role.Dentist]
  },
  {
    path: '/patients/register',
    element: <PatientRegister />,
    roles: [Role.Receptionist]
  },
  {
    path: '/appointments/waitlist',
    element: <Waitlist />,
    roles: [Role.Receptionist]
  },
  {
    path: '/communication',
    element: <Communication />,
    roles: [Role.Admin, Role.Dentist, Role.Receptionist]
  },
  {
    path: '/reports/scheduling',
    element: <SchedulingReports />,
    roles: [Role.Receptionist]
  }
];
