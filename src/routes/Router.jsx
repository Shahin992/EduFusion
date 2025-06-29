import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Student from '../components/Students/Student';
import Dashboard from '../components/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      { path: '/', element: <Dashboard/> },
      { path: 'students', element: <Student/> },
    ],
  },
]);

export default router;
