import Login from './pages/login'
import Navbar from './components/homecomponent/Navbar'
import Home from './pages/Home'
import Register from './pages/register'
import {Switch,Route} from 'react-router-dom'
import Product from './pages/Product'
import './App.css'
// import Footer from './components/Footer'
import Admin from './pages/admin/adminpage'
function App() {
  return (
    <>
   <Navbar/>
   <Switch>
   <Route exact path='/' component={Home}/>
   <Route exact path='/Login' component={Login}/>
   <Route exact path='/Register' component={Register}/>
    <Route exact path='/products' component={Product}/>
    <Route exact path='/admin' component={Admin}/>
   </Switch>
   
   </>
  );
}

export default App;
