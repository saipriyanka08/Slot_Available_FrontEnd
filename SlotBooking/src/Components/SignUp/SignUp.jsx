import React, { Component } from 'react'
import axios from 'axios'
class SignUp extends Component {
    state={
        Name:'',
        Email:'',
        Password:'',
        ConfirmPassword:'',
        EndPoint:'https://slotbooking1.herokuapp.com/api/',
        Mobile:'',
    }
    componentDidMount()
    {
        var Name=localStorage.getItem('Name')
        var Token=localStorage.getItem('Token')
        if(Name&&Token)
        {
            window.location.href='./schedule'
        }
    }
    UserNameChange(event)
    {
        this.setState({Name:event})
    }
    PasswordChange(event)
    {
        this.setState({Password:event})
    }
    UserEmployeeChange(event)
    {
        this.setState({Email:event})
    }
    ConfirmPasswordChange(event)
    {
        this.setState({ConfirmPassword:event})
        
    }
    MobileChange(event)
    {
        this.setState({Mobile:event})
    }
    async Signup()
    {
        var Password=this.state.Password;
        var ConfirmPassword=this.state.ConfirmPassword
        var Name=this.state.Name
        var Email=this.state.Email
        
        if(!Name)
        {
            alert("Please Enter Name")
        }
        else if(!Email)
        {
            alert("Please Enter Employee ID")
        }
        else if(!Password)
        {
            alert("Please Enter the Password")
        }
        else if(!ConfirmPassword)
        {
            alert("Please Enter the Confirm Password")

        }
        else if(Password!=ConfirmPassword)
        {
            alert("Password and Confirm Password MisMatched")
        }
        else if(Password.includes(Name))
        {
            alert("Name shouldnt be present in Password")
        }
     
        else if(Password.length<8)
        {
            alert("Password length should be more 7 letters")
        }
        else
        {
            var hasNumber = /\d/;
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
         
          if(!(hasNumber.test(Password)))
            {
                alert("Password must atleast one contain number")
            }
            else if(!format.test(Password))
            {
                alert("Password should contain atleast one special character")
            }
            else if(!(/[A-Z]/.test(Password)))
            {
                alert("Password should contain atleast one Capital letter")
            }
            else if(!(/[a-z]/.test(Password)))
            {
                alert("Password should contain atleast one small letter")
            }
            else
            {
                var data={
        
                    "Employee_ID":Email,
                    "Name":Name,
                    "Password":Password,
                    "Address":"#",
                    "Mobile":this.state.Mobile,
                    "Is_Admin":false
                }
                try{
                var result=await axios.post(this.state.EndPoint+'user',data)
                }
                catch(err)
                {
                    alert("Employee ID exist or Contact Admin")
                }
                if(result)
                {
                if(result.status==200)
                {
                    alert("Account Created")
                    const res=await axios.get(this.state.EndPoint+'login',{
                        auth:{
                            "username":this.state.Email,
                            "password":this.state.Password
                        }
                    });
                
                if(res.status==200)
                {
                    var Token=res.data.Token
                    localStorage.setItem("Token",Token)
                    localStorage.setItem("Admin",false)
                    const Data=await axios.get(this.state.EndPoint+'user',{
                        headers:{
                            "x-access-token":Token
                        }
                    })
                    var Name=Data.data.Users.Name
                    localStorage.setItem("Name",Name)
                    window.location.href='/schedule'
                }
                }
            }
        }}

    }
    render() {
        return (
            <div>
            {this.state.isLoggedIn ? this.redirect()
            : 
            <div>
            <h1>Sign Up</h1>
            <div>
            <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <br></br>
                    <input type="text" value={this.state.Name} onChange={(e)=>{this.UserNameChange(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                  
                </div>
                <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">Employee ID</label>
                    <br></br>
                    <input type="email" value={this.state.Email} onChange={(e)=>{this.UserEmployeeChange(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                  
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label><br></br>
                    <input type="password" value={this.state.Password} onChange={(e)=>{this.PasswordChange(e.target.value)}} id="exampleInputPassword1"></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label><br></br>
                    <input type="password" value={this.state.ConfirmPassword} onChange={(e)=>{this.ConfirmPasswordChange(e.target.value)}} id="exampleInputPassword1"></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Mobile</label><br></br>
                    <input type="number" value={this.state.Mobile} onChange={(e)=>{this.MobileChange(e.target.value)}} id="exampleInputPassword1"></input>
                </div>
                <button type="submit" onClick={()=>{this.Signup()}} class="btn btn-primary">Sign Up</button>
                </div>
            </div>
}
        </div>
        )
    }
}

export default SignUp
