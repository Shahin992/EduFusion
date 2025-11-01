import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';
import Student from '../components/Students/Student';
import Dashboard from '../components/Dashboard/Dashboard';
import Academics from '../components/Academics/Academics';
import Teacher from '../components/Teachers/Teacher';
import Exams from '../components/Exams/Exams';
import MarksEntry from '../components/Exams/MarksEntry/MarksEntry';
import StudentFees from '../components/StudentFees/StudentFees';

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
      {path: '/exam/marks-entry/:id', element: <MarksEntry/> },
      {path: '/student/fees', element:<StudentFees/>}
    ],
  },
]);

export default router;
