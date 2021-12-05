import React from "react";
import logo from '../logo.svg';

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
        x: event.clientX,
        y: event.clientY
        });
    }

    render() {
        return (
        <div style={{ width: '100%', height: '100vh' }} onMouseMove={this.handleMouseMove}>
            <h1>Move the mouse around!</h1>
            <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
        );
    }
}

export default MouseTracker
