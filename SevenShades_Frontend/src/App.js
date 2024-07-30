import {BrowserRouter,Routes,Route} from 'react-router-dom'
 
import AdminLOgin from './administrator/screens/AdminLogin';
import AdminDashboard from './administrator/screens/AdminDashboard';
import Home from './userinterface/screens/Home';
import ProductsHome from './userinterface/screens/ProductsHome'
import ProductDetailDisplay from './userinterface/screens/ProductDetailDisplay'
import MyBagDisplay from './userinterface/screens/MyBagDisplay'
import SignInDisplay from './userinterface/screens/SignInDisplay';
import JoinInDisplay from './userinterface/screens/JoinInDisplay'
import DisplayCheckOut from './userinterface/screens/DisplayCheckOut'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route  element={<Home />} path={"/home"} /> 
      <Route  element={<ProductsHome />} path={"/productshome"} /> 
      <Route  element={<ProductDetailDisplay />} path={"/productdetaildisplay"} /> 
        <Route  element={<AdminLOgin />} path={"/adminlogin"} />
        <Route  element={<AdminDashboard />} path={"/admindashboard/*"} />
        <Route  element={<MyBagDisplay />} path={"/mybagdisplay"} />
        
        <Route  element={<SignInDisplay />} path={"/signindisplay"} /> 
      <Route  element={<JoinInDisplay />} path={"/joinindisplay"} /> 
      <Route  element={<DisplayCheckOut />} path={"/displaycheckout"} />
        
        
        
      </Routes>
      </BrowserRouter>
     
      
    </div>
  );
}

export default App;
