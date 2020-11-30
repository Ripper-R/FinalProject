import Login from './pages/login'
import Header from './components/Headers'
import Home from './pages/Home'
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <>
   <Header/>
   <Switch>
   <Route exact path='/' component={Home}/>
   <Route exact path='/Login' component={Login}/>


   </Switch>
   
   </>
  );
}

export default App;
