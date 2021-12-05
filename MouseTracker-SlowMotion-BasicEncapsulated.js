import React, { useState, useEffect } from 'react';

class Cat extends React.Component {
    render() {
      return (
        <img src="/cat.png" style={{ 
            width:'150px', 
            position: 'absolute', 
            left: this.props.mouse.x, 
            top: this.props.mouse.y
        }} />
      );
    }
}
  
class MouseWithCat extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
        setTimeout(() => {
            this.setState({
              x: event.clientX,
              y: event.clientY
            });
        }, 250)
    }
  
    render() {
      return (
        <div style={{ width: '100%', height: '100vh' }} onMouseMove={this.handleMouseMove}>
          <Cat mouse={this.state} />
        </div>
      );
    }
}
  
class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <MouseWithCat />
        </div>
      );
    }
}

export default MouseTracker
