import React, { Component } from 'react'

class Content extends Component {
    render() {
        //console.log('--------> Content')
        //console.log(this.props.elements, this.props.elements.length)
        return(
            <main alt="content">
                {this.props.elements}
            </main>
        )
    }
}

export default Content;