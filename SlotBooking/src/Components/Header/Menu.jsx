import React, { Component } from 'react'
import {Navbar,Container} from 'react-bootstrap'
import './Menu.css'
class Menu extends Component {
    state={
        Name:'',
        IsLoggedIn:false
    }
    componentDidMount()
    {
        var Name=localStorage.getItem('Name')
        var Token=localStorage.getItem('Token')
        if(Name&&Token)
        {
            this.setState({Name:Name,IsLoggedIn:true})
        }
      
    }
    Logout()
    {
        console.log("Working")
        localStorage.clear()
        window.location.href='./'
    }
    Login()
    {
        window.location.href='/login'
    }
    render() {
        return (
            <div>
       <nav class="navbar navbar-dark bg-primary" >
          <span id="Heading" className="Heading">Slot Planner</span>
        {this.state.IsLoggedIn ?
        <button class="btn btn-info" id="user"  onClick={()=>{this.Logout()}} style={{margin:"0 70px 0px 0px"}}>Logout({this.state.Name})</button>
        :
          <button class="btn btn-info"  onClick={()=>{this.Login()}} id="user" style={{margin:"0 70px 0px 0px"}}>Login</button>
        }
</nav>
 </div>
        )
    }
}

export default Menu
