import Login from './pages/login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <>
   <Navbar/>
   <Switch>
   <Route exact path='/' component={Home}/>
   <Route exact path='/Login' component={Login}/>


   </Switch>
   
   </>
  );
}

export default App;
