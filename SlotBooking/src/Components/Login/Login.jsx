import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export class Login extends Component {
    state={
        UserName:'',
        Password:'',
        EndPoint:'https://slotbooking1.herokuapp.com/api/',
        isLoggedIn:false
        
    }
    componentDidMount()
    {
 
        var Name=localStorage.getItem('Name')
        var Token=localStorage.getItem('Token')
        if(Name&&Token)
        {
            this.setState({isLoggedIn:true})
        }
    }
    UserNameChange(event)
    {
        this.setState({UserName:event})
    }
    PasswordChange(event)
    {
        this.setState({Password:event})
        
    }
    async Login()
    {
        if(!this.state.UserName)
            alert("Enter the Employee ID")
        else if(!this.state.Password)
            alert("Enter the Password")
        else
        {
            var res;
            var flag=1;
            try{
         res=await axios.get(this.state.EndPoint+'login',{
            auth:{
                "username":this.state.UserName,
                "password":this.state.Password
            }
        });
    }
    catch(err)
    {
        flag=2
    
    }
        if(flag==1)
        {
            var Token=res.data.Token
            localStorage.setItem("Token",Token)
            
            const Data=await axios.get(this.state.EndPoint+'user',{
                headers:{
                    "x-access-token":Token
                }
            })

            var Name=Data.data.Users.Name
            localStorage.setItem("Name",Name)
            var Is_Admin=Data.data.Users.Is_Admin
            
            if(Is_Admin)
            {
                localStorage.setItem("Admin",true)
                window.location.href='./plan'

            }
            else
            {
                localStorage.setItem("Admin",false)
                window.location.href='./schedule'
            }
        }
        else
        {
            alert("Wrong Employee ID or Password")
        }
        }
    }
    
    redirect()
    {
        var Is_Admin=localStorage.getItem("Admin")
            
        if(Is_Admin)
        {
            localStorage.setItem("Admin",true)
            window.location.href='./plan'

        }
        else
        {
            localStorage.setItem("Admin",false)
            window.location.href='./schedule'
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ? this.redirect()
                : 
                <div>
                <h1>Login</h1>
                <div>
                    <div class="mb-3" >
                        <label for="exampleInputEmail1" class="form-label">Employee ID</label>
                        <br></br>
                        <input type="email" value={this.state.UserName} onChange={(e)=>{this.UserNameChange(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"></input>

                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label><br></br>
                        <input type="password" value={this.state.Password} onChange={(e)=>{this.PasswordChange(e.target.value)}} id="exampleInputPassword1"></input>
                    </div>
                    
                    <button type="submit" onClick={()=>{this.Login()}} class="btn btn-primary">Login</button><br></br>
                    <a href='./signup' >No account?Click here to create account</a>
                    </div>
                </div>
    }
            </div>
        )
    }
}

export default Login
