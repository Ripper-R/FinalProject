import Login from './pages/login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/register'
import {Switch,Route} from 'react-router-dom'
import './App.css'
function App() {
  return (
    <>
   <Navbar/>
   <Switch>
   <Route exact path='/' component={Home}/>
   <Route exact path='/Login' component={Login}/>
   <Route exact path='/Register' component={Register}/>

   </Switch>
   
   </>
  );
}

export default App;
