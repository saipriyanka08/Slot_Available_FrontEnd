import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";
class Planner extends Component {
    state={
        Date:'',
        StartTime:'',
        EndTime:moment().format("YYYY-MM-DD"),
        EventCalendar:'',
        Loading:false,
        EndPoint:'https://slotbooking1.herokuapp.com/api/',
        isLoggedIn:true
    }
    componentDidMount()
    {
      var admin=localStorage.getItem("Admin")
      console.log(admin)
      if(admin!='true')
      {
        alert("Illegal Access")
        window.location.href='./schedule'
      }
      var someDate = new Date();
someDate.setDate(someDate.getDate()+4); 
if((someDate.getMonth()+1)<10)
      var month="0"+(someDate.getMonth()+1)
    else
    var month=someDate.getMonth()+1
    if(someDate.getDate()<10)
    {
      var Day="0"+someDate.getDate()
    }
    else
    {
      var Day=someDate.getDate()

    }
    var EndDate=someDate.getFullYear()+"-"+(month)+'-'+Day
  console.log(EndDate)
  this.setState({EndTime:EndDate})

    }
       //Inserting the Data to BackEnd
    async PostInfo(){
     
    if(!this.state.Date)
        alert("Enter the Date")
      else if(!this.state.StartTime)
        alert("Enter the StartTime")
      else
      {
        var Date=(moment().format("YYYY-MM-DD"))
        var EventNotOccured=true
        if(Date>this.state.Date)
        {
            alert("Event Date is already over")
            EventNotOccured=false
        }
        
 
        else if(Date==this.state.Date)
        {
          if(Date==this.state.Date)
          {
              var Time=(moment().format("HH:SS"))+":00"
              if(Time>this.state.StartTime)
              {
                  alert("Time already over")
                  EventNotOccured=false
              }
        }
      }
}       
        if(EventNotOccured)
        {
             
                var info={
                    "Date":this.state.Date,
                    "Time":this.state.StartTime,
                  
                }
                var Token=localStorage.getItem("Token")
                if(this.state.Date&&this.state.StartTime)
                {
                var res,flag=1;
                try{
                res=await axios.post(this.state.EndPoint+'createslot',info,{
                  headers:{
                      "x-access-token":Token
                  }
                })
                }
                catch(err)
                {
                  flag=2
                  alert("Duplicate Data or Illegal access")
                }
                this.setState({StartTime:'',Date:''})
                
                if(flag==1)
                  alert("Data Added")
               
                }}
      }     
  
    changeStartTime(event){
      if(event=='')
        this.setState({EndTime:''})
      else
         event=event+":00"
        this.setState({StartTime:event})
        console.log(event)
    }

    changeDate(event){
        var Year=event.split('-')
        Year=Year[0]
        if(Year>9999||Year<2000)
        {
          alert("Invalid Year")
        }
        else
        {
        this.setState({Date:event})
        }
    }

    render() {
       
        return (
            <div>
 
                <center>
                  <br></br><br></br>   <br></br>   
                <h2 style={{margin:"0% 0% 0% 7%"}}>Schedule slots For Employee</h2>             
<div style={{margin:"1% 30% 0% 30%"}} className="card vertical-center" > 
<br></br>     
<div class="form-group">
    Select Date:
    <input type="Date" onChange={(e)=>{this.changeDate(e.target.value)}} value={this.state.Date} class="form-control" placeholder="Age" id="Age" min={moment().format("YYYY-MM-DD")} max={this.state.EndTime} required></input> <br></br>
Start time:
<input type="Time" onChange={(e)=>{this.changeStartTime(e.target.value)}} value={this.state.StartTime} class="form-control" placeholder="Age" id="Age" required></input> <br></br>
<button class="btn btn-primary" onClick={()=>{this.PostInfo()}}>Add</button>
<br></br><br></br>
</div> 

</div>
            </center>
            </div>
        )
    }
  }

export default Planner
