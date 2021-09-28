import React, { Component } from 'react';
import './schedule.css'
import axios from 'axios'
class schedule extends Component {
    state={
        Title:[],
        itr:0,
        Morning:[],
        Afternoon:[[]],
        Evening:[[]],
        EndPoint:'https://slotbooking1.herokuapp.com/api/',
        load:false,
        slot:[],
       
    }
    componentDidMount()
    {
      var token=localStorage.getItem("Admin")
      if(!token)
      {
        alert("Illegal Access")
        window.location.href='./login'
      }
      var someDate = new Date();
      someDate.setDate(someDate.getDate()+1); 
      if((someDate.getMonth()+1)<10)
      var month="0"+(someDate.getMonth()+1)
    else
      var month=someDate.getMonth()+1
    var EndDate=[]
    EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+someDate.getDate())
    someDate = new Date();
      someDate.setDate(someDate.getDate()+2); 
      if((someDate.getMonth()+1)<10)
      var month="0"+(someDate.getMonth()+1)
    else
      var month=someDate.getMonth()+1
 
    EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+someDate.getDate())
    someDate = new Date();
      someDate.setDate(someDate.getDate()+3); 
      if((someDate.getMonth()+1)<10)
      var month="0"+(someDate.getMonth()+1)
    else
      var month=someDate.getMonth()+1
 
    EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+someDate.getDate())
    someDate = new Date();
      someDate.setDate(someDate.getDate()+4); 
      if((someDate.getMonth()+1)<10)
      var month="0"+(someDate.getMonth()+1)
    else
      var month=someDate.getMonth()+1

    EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+someDate.getDate())

        var Title=[]
        Title[0]="Today"
        Title[1]="Tomorrow"
        console.log(EndDate)
        let newDate = new Date()
        let date = newDate.getDate();
         month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var date1=EndDate[1].split('-')
        date1=date1[2]+'-'+date1[1]+'-'+date1[0]
        var date2=EndDate[2].split('-')
        date2=date2[2]+'-'+date2[1]+'-'+date2[0]
        var date3=EndDate[3].split('-')
        console.log(EndDate[3])
        date3=date3[2]+'-'+date3[1]+'-'+date3[0]
        Title[2]=date1
        Title[2]=date1
        Title[3]=date2
        Title[4]=date3
        this.setState({Title:Title})
        this.GetData()
    }
async GetData(){
  var someDate = new Date();
  someDate.setDate(someDate.getDate()+1); 
  if((someDate.getMonth()+1)<10)
  var month="0"+(someDate.getMonth()+1)
else
  var month=someDate.getMonth()+1
var EndDate=[]
var date1=someDate.getDate()
if(date1<10)
date1="0"+date1
EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+date1)
someDate = new Date();
  someDate.setDate(someDate.getDate()+2); 
  var date1=someDate.getDate()
  if(date1<10)
  date1="0"+date1
  if((someDate.getMonth()+1)<10)
  var month="0"+(someDate.getMonth()+1)
else
  var month=someDate.getMonth()+1

EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+date1)
someDate = new Date();
  someDate.setDate(someDate.getDate()+3); 
  if((someDate.getMonth()+1)<10)
  var month="0"+(someDate.getMonth()+1)
else
  var month=someDate.getMonth()+1
  var date1=someDate.getDate()
  if(date1<10)
  date1="0"+date1
EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+date1)
someDate = new Date();
  someDate.setDate(someDate.getDate()+4); 
  console.log(someDate)
  if((someDate.getMonth()+1)<10)
  var month="0"+(someDate.getMonth()+1)
else
  var month=someDate.getMonth()+1
  var date1=someDate.getDate()
  if(date1<10)
  date1="0"+date1
EndDate.push(someDate.getFullYear()+"-"+(month)+'-'+date1)

  var Data=await axios.get(this.state.EndPoint+'createslot')
  Data=(Data.data)
  console.log(Data)
  var itr;
  var T,T1,T2,T3,T4
  var s=0, s1=0, s2=0, s3=0, s4=0
  var MD=[],AD=[],ED=[]
  var MD1=[],AD1=[],ED1=[]
  var MD2=[],AD2=[],ED2=[]
  var MD3=[],AD3=[],ED3=[]
  var MD4=[],AD4=[],ED4=[]
  let newDate = new Date()
  let date = newDate.getDate();
   month = newDate.getMonth() + 1;
  if(month<10)
  month="0"+month
  let year = newDate.getFullYear();
  T=year+'-'+month+'-'+date
  T1=EndDate[0]
  T2=EndDate[1]
  T3=EndDate[2]
  T4=EndDate[3]
 
  for(itr=0;itr<Data.length;itr++)
  {
     var Date1=Data[itr].Date
    var  Time=Data[itr].Time
    Time=Time.split(":")
    Time=Time[0]
    
    Time=parseInt(Time)
      if(T1==Date1)
      {
        if(Data[itr].Available=="True"||Data[itr].Available==true)
        {
          s1=s1+1
        }
            if(Time<12)
            MD1.push(Data[itr])
            else if(Time<18 &&Time>=12)
            AD1.push(Data[itr])
            else
            ED1.push(Data[itr])
      }
     else if(T2==Date1)
      {
        if(Data[itr].Available=="True"||Data[itr].Available==true)
        {
          s2=s2+1
        }
  
        if(Time<12)
          MD2.push(Data[itr])
        else if(Time<18 &&Time>=12)
          AD2.push(Data[itr])
        else
          ED2.push(Data[itr])
            
      }
     else if(T3==Date1)
      {
        if(Data[itr].Available=="True"||Data[itr].Available==true)
        {
          s3=s3+1
        }
        if(Time<12)
        MD3.push(Data[itr])
        else if(Time<18 &&Time>=12) 
        AD3.push(Data[itr])
        else
        ED3.push(Data[itr])
      }
    else  if(T4==Date1)
      {
        if(Data[itr].Available=="True"||Data[itr].Available==true)
        {
          s4=s4+1
        }
        if(Time<12)
        MD4.push(Data[itr])
        else if(Time<18 &&Time>=12)
        AD4.push(Data[itr])
        else
        ED4.push(Data[itr])
      }
     else if(T==Date1)
      {
        if(Data[itr].Available=="True"||Data[itr].Available==true)
        {
          s=s+1
        }
        if(Time<12)
        {
         MD.push(Data[itr])
        }
        else if(Time<18 && Time>=12)
        {
         AD.push(Data[itr])
        }
        else
        ED.push(Data[itr])
      }
      
    }
      //console.log(MD2)
      var Slot=[]
      Slot[0]=s
      Slot[1]=s1
      Slot[2]=s2
      Slot[3]=s3
      Slot[4]=s4
      var MFinalArray=[],AFinalArray=[],EFinalArray=[]
      MFinalArray[0]=MD
      MFinalArray[1]=MD1
      MFinalArray[2]=MD2
      MFinalArray[3]=MD3
      MFinalArray[4]=MD4
      AFinalArray[0]=AD
    AFinalArray[1]=AD1
    AFinalArray[2]=AD2
    AFinalArray[3]=AD3
    AFinalArray[4]=AD4
    EFinalArray[0]=ED
    EFinalArray[1]=ED1
    EFinalArray[2]=ED2
    EFinalArray[3]=ED3
    EFinalArray[4]=ED4
    this.setState({Morning:MFinalArray,Afternoon:AFinalArray,Evening:EFinalArray,Slot:Slot})
 
    this.Load()

}
Load()
{
  this.setState({itr:0})
  this.setState({load:true})
}
PreviousDay()
{
    var itr=this.state.itr-1
    this.setState({itr:itr})
   
}
NextDay()
{
    var itr=this.state.itr+1
    this.setState({itr:itr})
    
}
async Reserve(ID)
{
  if(window.confirm("Are you sure about scheduling your meeting with Manager?"))
  {
    var Body={
      "Date": "2021-09-26",
      "Time": "11:00"
  }
    try{
    var Token=localStorage.getItem("Token")
    console.log(Token)
    var Data=await axios.put(this.state.EndPoint+'createslot/'+ID,Body,{
      headers:{
          "x-access-token":Token
      }}
     
    )
    console.log(Data)
    if(Data.status==200)
    {
      alert("Booked Sucessfully")
    }
  }
  catch(err)
  {
    alert("Already Booked ")
  }
  
  }
}
NextItr()
{
  var itr=this.state.itr+1
  this.setState({itr:itr})
}
NextItr1()
{
  var itr=this.state.itr+2
  this.setState({itr:itr})
}
    render() {
        return (
            <div>
      {this.state.load&&

    <center>
    <div className="card vertical-center">
      <table>
        <center>
 <tr > {this.state.itr>=1&& <img style={{widht:"40px", height:"20px"}} src="https://w7.pngwing.com/pngs/964/501/png-transparent-computer-icons-arrow-scrolling-encapsulated-postscript-arrow-angle-text-logo.png" onClick={()=>{this.PreviousDay()}}></img>    }  
   <button type="button" class="btn btn-primary m-4">{" "}{this.state.Title[this.state.itr]} <br></br><span>{this.state.Slot[this.state.itr]} slots are available{" "}{" "}</span>
  
   </button>
  {(this.state.itr<4) && <button type="button" class="btn btn-info m-4" onClick={()=>{this.NextItr()}}> {this.state.Title[this.state.itr+1]} <br></br><span>{this.state.Slot[this.state.itr+1]} slots are available{" "}{" "}</span></button>

}
{(this.state.itr<3) &&<button type="button" class="btn btn-info m-4" onClick={()=>{this.NextItr1()}}> {" "}{this.state.Title[this.state.itr+2]} <br></br><span>{this.state.Slot[this.state.itr+2]} slots are available{" "}{" "}</span> </button>
    }
    {this.state.itr<2&&  <img style={{widht:"40px", height:"20px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GkFAbxSIuCSZGGRQS3QOuOJ5kwPyMIXWYg&usqp=CAU" onClick={()=>{this.NextDay()}}></img>  }</tr>
 
    </center>
    </table>
        <form className="form">
            <div className="form-group row">
              <table>

                 
                  <tr><th>Morning</th>
                  {this.state.Morning[this.state.itr].length==0? 
               <td style={{color:"red"}}>  No slots available</td> :
               this.state.Morning[this.state.itr].map((m1)=>
               <td> 
                  {m1.Available==true || m1.Available=="True"?
                  <button type="button" className="btn btn-outline-primary" onClick={()=>{this.Reserve(m1.ID)}}>{m1.Time}</button>
                    :
                     <button type="button" className="btn btn-outline-danger" onClick={()=>{this.Reserve(m1.ID)}}>{m1.Time}</button>
                  }</td>
                  )
               }
                  
                  </tr>
                  <br></br>
                  <tr><th>Afternoon</th>
                  {this.state.Afternoon[this.state.itr].length==0? 
               <td style={{color:"red"}}>  No slots available</td> :
               this.state.Afternoon[this.state.itr].map((m1)=>
               <td> 
               {m1.Available==true || m1.Available=="True"?
               <button type="button" className="btn btn-outline-primary" onClick={()=>{this.Reserve(m1.ID)}}>{m1.Time}</button>
                 :
                  <button type="button" className="btn btn-outline-danger" onClick={()=>{this.Reserve(m1.ID)}}>{m1.Time}</button>
               }</td>
              )
               }
                  
                  </tr>
                  <br></br>
                  <tr><th>Evening</th>
                  {this.state.Evening[this.state.itr].length==0? 
               <td style={{color:"red"}}>  No slots available</td>:
               this.state.Evening[this.state.itr].map((m1)=>
               <td> 
               {m1.Available==true || m1.Available=="True"?
               <button type="button" className="btn btn-outline-primary" onClick={()=>{this.Reserve(m1.ID)}}>{m1.Time}</button>
                 :
                  <button type="button" className="btn btn-outline-danger" onClick={()=>{this.Reserve(m1.ID)}}>{m1.Time}</button>
               }</td>
              )
               }
                  
                  </tr>
                  <br></br>
         
              </table>

                    
              </div>
        </form>
    </div>
</center>
    }
            </div>
          );
    }
}

export default schedule;