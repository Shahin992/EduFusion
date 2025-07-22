import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Student from '../components/Students/Student';
import Dashboard from '../components/Dashboard/Dashboard';
import Academics from '../components/Academics/Academics';
import Teacher from '../components/Teachers/Teacher';
import Exams from '../components/Exams/Exams';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      { path: '/', element: <Dashboard/> },
      { path: '/academics', element: <Academics/> },
      { path: 'students', element: <Student/> },
      {path: '/teachers', element: <Teacher/>},
      {path: '/exams', element: <Exams/>},
    ],
  },
]);

export default router;
