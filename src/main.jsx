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
import { updateAssignment } from './apis/updateAssignmentApi'
import MyBookMark from './pages/privatePages/MyBookMark'
import NotFound from './pages/NotFound'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/dashboard/Overview'
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
    hydrateFallbackElement: <Loader /> 
    //     loader: () => fetch(`${import.meta.env.VITE_api_url}/assignments`),
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
    loader: updateAssignment,
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: "view-assignment-details/:id",
    element: <PrivateRoute> <AssignmentDetails /> </PrivateRoute>,
    loader: assignmentDetails,
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: "pending-assignments",
    element: <PrivateRoute> <PendingAssignments /> </PrivateRoute>,
    loader: pendingAssignments,
    hydrateFallbackElement: <Loader /> 
  },
  {
    path: "my-attempted-assignment",
    element: <PrivateRoute> <AttemptedAssignments /> </PrivateRoute>,
  },
  {
    path: "my-bookmarked-assignment",
    element: <PrivateRoute> <MyBookMark /></PrivateRoute>,
  }
  ]
  },
    {
        path: '*',
        element: <NotFound />
  },
  {
    path: 'dashboard',
    element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
    children: [
      {
        // index: true,
        // path: 'overview',
        element: <Overview />
      },
      {
        // index: true,
        path: "create-assignment",
        element: <CreateAssignments />
      },
      {
        path: "update-assignment/:id",
        element: <UpdateAssignment />,
        loader: updateAssignment,
        hydrateFallbackElement: <Loader />
      },
      {
        path: "pending-assignments",
        element: <PendingAssignments />,
        loader: pendingAssignments,
        hydrateFallbackElement: <Loader /> 
      },
      {
        path: "my-attempted-assignment",
        element: <AttemptedAssignments />
      },
      {
        path: "my-bookmarked-assignments",
        element: <MyBookMark />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </StrictMode>,
)

