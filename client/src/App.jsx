import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from './Components/Commons/Navbar';
import Footer from './Components/Commons/Footer';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Landing from './Pages/Landing/Landing';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Error from './Pages/Error/Error';
import Admin from './Pages/Admin/Admin';
import ProfileCard from './Pages/profile/ProfileCard';
import ProfileComplete from './Pages/profile/ProfileComplete';
import Payment from './Pages/Payment/Payment';
import Success from './Pages/Payment/Success';
import Fail from './Pages/Payment/Fail';
import GetUser from './Components/Admin/GetUser';
import GetMessage from './Components/Admin/GetMessage';
import EditUser from "./Components/Admin/EditUser";
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import AdminAuth from './Pages/Admin/AdminAuth';
import ComplaintPage from './Pages/Complaint/Complaint';
import GetComplaint from './Components/Admin/GetComplaint';
import AddOrganization from './Components/Admin/AddOrganization';
import GetEmployees from './Components/Admin/GetEmployees';
import AddEmployee from './Components/Admin/AddEmployees';
import GetAllOrganizations from './Components/Admin/GetAllOrhanization';
import DashboardEmployee from './Pages/employee/DashboardEmployee';
import ComplaintResponsePage from './Pages/Complaint/ComplaintResponsePage';
import ComplaintTracker from './Pages/user/UserDashboard';
import ReportAnalysis from './Components/ReportAnalysis/ReportAnalysis';
import ChatBot from './Components/Commons/ChatBot';
import AssignTask from './Components/Admin/AssignTask';



const App = () => {
  return (
    <>
    
      <Navbar />
        
          <Routes>

            {/* Non-private routes*/}
            <Route path='/' element={<Landing />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='*' element={<Error/> } />
            <Route path='/complaint' element={<ComplaintPage />} />
            <Route path='/chatbot'element ={<ChatBot />} />

            {/* User routes */}
            <Route path='/signin' element={<SignIn />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/complete_profile' element={<ProtectedRoute Component = {ProfileComplete} />} />
            <Route path='/profile' element={<ProtectedRoute Component = {ProfileCard} />} />

            {/* Payment Routes  */}
            <Route path='/payment' element = {<ProtectedRoute Component = {Payment} />} />
            <Route path='/payment_success' element= {<ProtectedRoute Component = {Success} />} />
            <Route path='/payment_failed' element= {<ProtectedRoute Component = {Fail }/>} />
            <Route path='/reportAnalysis' element = {<ReportAnalysis />} />
            

            {/*System Admin Routes */}

            <Route path='/admin' element={<AdminAuth component = {Admin} />} />
            <Route path='/admin/getAllUser' element={<AdminAuth component = {GetUser} /> } />
            <Route path='/admin/getAllComplaint' element={<AdminAuth component = {GetComplaint} />} />
            <Route path='/admin/getAllMessage' element={<AdminAuth component = {GetMessage} />} />
            <Route path='/admin/editUser' element={<AdminAuth component = {EditUser} />} />
            <Route path='/admin/addOrganization'element={<AdminAuth component = {AddOrganization} />} />
            <Route path='/admin/getAllEmployees'element={<AdminAuth component = {GetEmployees}/>}/>
            <Route path="/admin/addEmployee" element={<AdminAuth component = {AddEmployee} />} />
            <Route path='/admin/getallorgainzation' element={ <AdminAuth component ={GetAllOrganizations} />} />
            <Route path='/employee/dashboard' element= {<DashboardEmployee />} />
            <Route path='/ComplaintResponsePage/:id' element= {<ComplaintResponsePage />} />
            <Route path='/TrackerPage' element = {<ComplaintTracker />} />
            <Route path='/assign/task' element = {<AssignTask />} />

          </Routes>
        
      <Footer />
    </>
  );
}

export default App;
