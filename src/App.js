import Login from './pages/login'
import Navbar from './components/homecomponent/Navbar.jsx'
import Home from './pages/Home'
import Register from './pages/register/register'
import {Switch,Route} from 'react-router-dom'
import Product from './pages/Product'
import './App.css'
// import Footer from './components/Footer'
import Admin from './pages/admin/adminpage'
import NotFound from './pages/notfound'
import Productde from './pages/productdetails'
function App() {
  return (
    <>
   <Navbar/>
   <Switch>
   <Route exact path='/' component={Home}/>
   <Route exact path='/Login' component={Login}/>
   <Route exact path='/register' component={Register}/>
    <Route exact path='/products' component={Product}/>
    <Route exact path='/productdetails' component={Productde}/>
    <Route exact path='/admin' component={Admin}/>
    <Route path='*' component={NotFound} />
   </Switch>
   
   </>
  );
}

export default App;
