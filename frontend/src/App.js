import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

//import Users from './users/pages/Users';
//import Auth from './users/pages/Auth';
//import NewPlace from './places/pages/NewPlace';
//import UpdatePlace from './places/pages/UpdatePlace';
//import UserPlaces from './places/pages/UserPlaces';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./users/pages/Users'));
const Auth = React.lazy(() => import('./users/pages/Auth'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));

function App() {
  const { token, login, logout, userId } = useAuth();
  
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/:userId/places" element={<UserPlaces />}></Route>
        <Route path="/places/new" element={<NewPlace />}></Route>
        <Route path="/places/:placeId" element={<UpdatePlace />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/:userId/places" element={<UserPlaces />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main><Suspense fallback={<div className="center"><LoadingSpinner /></div>}>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;