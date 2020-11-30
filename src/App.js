import Login from './pages/login'
import Header from './components/Headers'
import Home from './pages/Home'
import Register from './pages/register'
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <>
   <Header/>
   <Switch>
   <Route exact path='/' component={Home}/>
   <Route exact path='/Login' component={Login}/>
   <Route exact path='/Register' component={Register}/>

   </Switch>
   
   </>
  );
}

export default App;
