import { createBrowserRouter } from 'react-router-dom'

import Login from '../Pages/auth/Login'
import ForgetPassword from '../Pages/auth/ForgetPassword'
import VerifyCode from '../Pages/auth/VerifyCode'
import SetNewPassword from '../Pages/auth/SetNewPassword'

import AdminRoute from '../ProtectedRoute/AdminRoute'
import Dashboard from '../Pages/layout/Dashboard'
import DashboardHome from '../Pages/dashboardHome/DashboardHome'
import PrivacyPolicy from '../Pages/privacyPolicy/PrivacyPolicy'
import TermsAndConditions from '../Pages/termsAndConditions/TermsAndConditions'
import Profile from '../Pages/profile/Profile'
import ErrorBoundary from '../ErrorBoundary'
import UserManagement from '../Pages/userManagement/UserManagement'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: '/user-management',
        element: <UserManagement />,
      },

      {
        path: '/settings/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/settings/terms-and-condition',
        element: <TermsAndConditions />,
      },
      {
        path: '/settings/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '/verify-code',
    element: <VerifyCode />,
  },
  {
    path: '/reset-password',
    element: <SetNewPassword />,
  },
])
export default router
