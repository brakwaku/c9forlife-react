import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ContactScreen from './screens/ContactScreen';
import AboutScreen from './screens/AboutScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ArchiveScreen from './screens/ArchiveScreen';
import AdminScreen from './screens/AdminScreen';
import UserEditScreen from './screens/UserEditScreen';
import ActivitySuggestionsScreen from './screens/ActivitySuggestionsScreen';
import MotivationScreen from './screens/MotivationScreen';
import InternalErrorScreen from './screens/InternalErrorScreen';
import NotFoundScreen from './screens/NotFoundScreen';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<SignupScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset/:id/:token" element={<ResetPasswordScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/activities" element={<ActivitiesScreen />} />
          <Route path="/archive" element={<ArchiveScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/admin/users/:id/edit" element={<UserEditScreen />} />
          <Route path="/admin/suggestions" element={<ActivitySuggestionsScreen />} />
          <Route path="/motivation" element={<MotivationScreen />} />
          <Route path="/internal-error" element={<InternalErrorScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
