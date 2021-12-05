import React from 'react';

class Cat extends React.Component {
    render() {
      return (
            <img alt="cat" src="/cat.png" style={{ 
                width:'100px', 
                position: 'absolute', 
                left: this.props.mouse.x, 
                top: this.props.mouse.y
            }} />
      );
    }
}

class Mouse extends React.Component {
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
            {this.props.render(this.state)}
        </div>
      );
    }
}

class WindowSize extends React.Component{
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 }
    }

    handleWindowResize = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }
    
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render(){
        return (
            <>
                {this.props.render(this.state)}
            </>
        );
    }
}

const FoodRow = props => {
    return (
        <div style={{ 
            minWidth: '10px', minHeight: '10px', 
            backgroundColor: 'red', 
            position: 'absolute',
            top: props.top + 'px',
            left: props.left + 'px',
            borderRadius: '50%'
        }} />
    )
}

class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = { horizontal: 0, vertical: 0, width: props.window.width, height: props.window.height }
    }

    /*
    * parçalar 100px'lik boşluklarla sıralanacak
    */
    calculateArea = () => {
        return {
            horizontal: Math.floor(this.props.window.width / 100),
            vertical: Math.floor((this.props.window.height - 300) / 100)
        }
    }

    componentDidUpdate = (previousProps, previousState) => {
        if(previousProps.window.width !== this.props.window.width) {
            this.setState(this.calculateArea())
        }
    }

    render(){
        /*
        TODO: FoodRow iki foreach içerisinde döndürülmeli
        ilkinde left, ikincisinde top ötelenecek
        kalana göre sıfırlama vb. gerekebilir
        */
        return (
        <>
            <FoodRow top="500" left="500" />
        </>)
    }
}


class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <WindowSize render={window => (
              <>
                {window.width} - {window.height}
                <Food window={window} />
              </>
          )
          } />
          <Mouse render={mouse => (
            <>
                <p>The mouse position is {mouse.x}, {mouse.y}</p>
                <Cat mouse={mouse} />
            </>
          )}/>
        </div>
      );
    }
}

export default MouseTracker
