import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import {NotFound} from './pages/NotFound';
import {ProtectedRoute} from './components/common/ProtectedRoute';
import './App.css'
import { useAppDispatch } from './store/hooks';
import { checkAuth } from './features/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch=useAppDispatch();
   useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])
  return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Home/>} />
      <Route path="listings" element={<Listings/>} />
      <Route path="listings/:id" element={<ListingDetail/>} />
      {/*Auth*/}
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="verify-email" element={<Verify/>} />
      <Route path="forgot-password" element={<ForgotPassword/>} />
      <Route path="reset-password" element={<ResetPassword/>} />
      {/*Protected Routes*/}
      <Route element={<ProtectedRoute />}>
      <Route path="my-listings" element={<MyListings/>} />
      <Route path="users/:id" element={<UserProfile/>} />
      <Route path="favorites" element={<Favorites/>} />
      <Route path="chat" element={<Chat/>} />
      <Route path="notifications" element={<Notifications/>} />
      <Route path="profile" element={<Profile/>} />
      <Route path="create-listing" element={<CreateListing/>} />
      </Route>

      <Route path="*" element={<NotFound/>} />
      </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
