import React, { Component } from 'react'

export class Path extends Component {
    componentDidMount()
    {
        var Name=localStorage.getItem('Name')
        var Token=localStorage.getItem('Token')
        if(Name&&Token)
        {
            
            window.location.href="/schedule"
        }
        else
        window.location.href="/login"
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Path
