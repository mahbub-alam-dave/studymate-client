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
import { updateAssignment } from './apis/updateAssignmentApi'
import MyBookMark from './pages/privatePages/MyBookMark'
import NotFound from './pages/NotFound'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import AboutPage from './pages/publicPages/AboutPage'
import BlogPage from './pages/publicPages/BlogPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MyAssignments from './pages/privatePages/MyAssignments'
import BeATutor from './pages/privatePages/BeATutor'
import FindTutorPage from './pages/publicPages/FindTutors'
import { PaymentSuccess } from './pages/payment/PaymentSuccess'
import { PaymentError } from './pages/payment/PaymentError'
import { PaymentFailed } from './pages/payment/PaymentFailed'
import { PaymentCancelled } from './pages/payment/PaymentCancelled'
import MessagesPage from './pages/privatePages/MessagesPage'
import { SocketProvider } from './Contextes/SocketProvider'
// import DataLoader from './apis/DataLoader'

const queryClient = new QueryClient();

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
    path: '/about',
    element: <AboutPage />
  },
  {
    path: "/blogs",
    element: <BlogPage />
  },
  {
    path: "/find-tutors",
    element: <FindTutorPage />
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />
  },
  {
    path: "/payment/error",
    element: <PaymentError />
  },
  {
    path: "/payment/failed",
    element: <PaymentFailed />
  },
  {
    path: "/payment/cancelled",
    element: <PaymentCancelled />
  },
  {
    path: "messages",
    element: <MessagesPage />
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
    // loader: pendingAssignments,
    // hydrateFallbackElement: <Loader /> 
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
        path: 'overview',
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
        // loader: pendingAssignments,
        // hydrateFallbackElement: <Loader /> 
      },
      {
        path: "my-assignments",
        element: <MyAssignments />

      },
      {
        path: "my-attempted-assignment",
        element: <AttemptedAssignments />
      },
      {
        path: "my-bookmarked-assignments",
        element: <MyBookMark />
      },
      {
        path: "be-a-tutor",
        element: <BeATutor />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <SocketProvider>
      <RouterProvider router={router}/>
      </SocketProvider>
    </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)

