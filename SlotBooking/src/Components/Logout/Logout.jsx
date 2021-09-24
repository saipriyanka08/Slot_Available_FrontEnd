import React, { Component } from 'react'

export class Logout extends Component {
    componentDidMount(){
        localStorage.clear()
        window.location.href='./'
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
