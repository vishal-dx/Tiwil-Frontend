import { Route, Routes } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import ProtectedRoute from "./privateRoute/ProtectedRoute";
import AddInformation from "./pages/AddInfomation";
import Dashboard from "./pages/Dashboard";
import EventDetail from "./pages/EventDetail";
import FamilyInformation from "./pages/FamilyInformation";
import Notifications from "./pages/Notifications";
import EventDetails from "./components/invitation/EventDetails";
import WishlistDetails from "./components/invitation/WishlistDetails";
import PoolingPage from "./components/invitation/Pooling";
import InviteUsersPage from "./components/invitation/PoolInvite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ Profile Setup */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ✅ Onboarding Page */}
      <Route
        path="/add-information"
        element={
          <ProtectedRoute>
            <AddInformation />
          </ProtectedRoute>
        }
      />

      {/* ✅ Dashboard & Other Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account-setting"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event-detail/:eventId"
        element={
          <ProtectedRoute>
            <EventDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/familyInfo"
        element={
          <ProtectedRoute>
            <FamilyInformation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
    {/* For Invitaion view */}
      <Route
        path="/event/:eventId"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist/:id"
        element={ 
          <ProtectedRoute>
            <WishlistDetails />
          </ProtectedRoute>
        }
      />

<Route path="/pooling" element={  <ProtectedRoute><PoolingPage /></ProtectedRoute>} />
<Route path="/pool-invite" element={ <ProtectedRoute><InviteUsersPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
