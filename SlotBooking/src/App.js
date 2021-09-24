import './App.css';
import { BrowserRouter,Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Components/Header/Menu'
import Login from './Components/Login/Login'
import Planner from './Components/Planner/Planner'
import SignUp from './Components/SignUp/SignUp';
import Path from './Components/Path';
import schedule from './Components/Schedule/schedule';
function App() {
  return (
    <div className="App">
 <Menu></Menu>
 <BrowserRouter>
 <Route path='/plan' component={Planner}></Route>
 <Route path='/login' component={Login}></Route>
 <Route path='/signup' component={SignUp}></Route>
 <Route path='/schedule' component={schedule}></Route>
 <Route exact path='/' component={Path}></Route>
 </BrowserRouter>
    </div>
  );
}

export default App;