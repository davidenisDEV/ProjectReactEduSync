import 'bootstrap/dist/css/bootstrap.min.css';
import { Signin } from './pages/Signin';
import { Footer } from './components/Footer';
import { CoursePage } from './pages/CoursePage';
import { CreateCourse } from './pages/CreateCourse';
import { CreateQuiz } from './pages/CreateQuiz';
import { FAQ } from './pages/FAQ';
import { Homepage } from './pages/Homepage';
import { CourseSubscription } from './pages/CourseSubscription';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage';
import { EditCourse } from './pages/EditCourse';


const routes = [
  {
    path:'/',
    element: <Homepage/>
  },
  {
    path:'/faq',
    element: <FAQ/>
  },
  {
    path:'/signin',
    element: <Signin/>
  },
  {
    path:'/course/:courseId',
    element: <CoursePage/>
  },
  {
    path:'/create-course',
    element: <CreateCourse/>
  },
  {
    path:'/edit-course/:courseId',
    element: <EditCourse/>
  },
  {
    path: '/profile/:userId',
    element: <ProfilePage/>
  },
  {
    path: '/subscription-page/:courseId',
    element: <CourseSubscription/>
  },
  {
    path:'create-quiz/:courseId',
    element:<CreateQuiz/>
  }

]

function App() {

  return (
    <>
      <Router>
        <Routes>
          {routes.map( (r, i) => <Route key={i} path={r.path} element={r.element}/>)}
        </Routes>
      </Router>
    </>
  )
}

export default App
