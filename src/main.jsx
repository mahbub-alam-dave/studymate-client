import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './layouts/Root'
import ContextProvider from './Contextes/ContextProvider'
import Assignments from './pages/publicPages/Assignments'
import Home from './pages/publicPages/Home'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import PrivateRoute from './layouts/PrivateRoute'
import CreateAssignments from './pages/privatePages/CreateAssignments'
import AttemptedAssignments from './pages/privatePages/AttemptedAssignments'
import PendingAssignments from './pages/privatePages/PendingAssignments'
import Loader from './components/Loader'
import UpdateAssignment from './pages/privatePages/UpdateAssignment'
import AssignmentDetails from './pages/privatePages/AssignmentDetails'
import { assignmentDetails } from './apis/assignmentDetails'
import { pendingAssignments } from './apis/PendingAssignmentApi'
// import DataLoader from './apis/DataLoader'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
    path: '/',
    element: <Home />
  },
  {
    path: '/assignments',
    element: <Assignments />,
    loader: () => fetch('http://localhost:3000/assignments'),
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: "create-assignment",
    element: <PrivateRoute> <CreateAssignments /> </PrivateRoute>
  },
  {
    path: "update-assignment/:id",
    element: <PrivateRoute> <UpdateAssignment /> </PrivateRoute>,
    loader: ({params}) => fetch(`http://localhost:3000/assignments/${params.id}`),
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: "view-assignment-details/:id",
    element: <PrivateRoute> <AssignmentDetails /> </PrivateRoute>,
    // loader: ({params}) => fetch(`http://localhost:3000/assignments/${params.id}`),
    loader: assignmentDetails,
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: "pending-assignments",
    element: <PrivateRoute> <PendingAssignments /> </PrivateRoute>,
    // loader: () => fetch('http://localhost:3000/pending-assignments'),
    loader: pendingAssignments,
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: "my-attempted-assignment",
    element: <PrivateRoute> <AttemptedAssignments /></PrivateRoute>
  }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
