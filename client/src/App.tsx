import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import {NotFound} from './pages/NotFound';
import './App.css'

function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Home/>} />
      <Route path="/listings" element={<Listings/>} />
      {/*Auth*/}
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/verify-email" element={<Verify/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      {/*Protected Routes*/}
      <Route path="/my-listings" element={<MyListings/>} />
      <Route path="listing/:id" element={<ListingDetail/>} />
      <Route path="user/:id" element={<UserProfile/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/notifications" element={<Notifications/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/create-listing" element={<CreateListing/>} />

      <Route path="*" element={<NotFound/>} />
      </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
