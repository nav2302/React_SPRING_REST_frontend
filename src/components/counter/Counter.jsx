import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

class Counter extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this)
    }

    render() {
        return (
            <div className="counter">
                <CounterButton incrementMethod = {this.increment}/>
                <CounterButton by={5} incrementMethod = {this.increment}/>
                <CounterButton by={4} incrementMethod = {this.increment}/>
                <span className="count">{this.state.counter}</span>
            </div>
        )
    }

    increment(count) {
        this.setState({
            counter: this.state.counter + count
        });
    }
}

class CounterButton extends Component {

    constructor() {
        super();

        this.increment = this.increment.bind(this)
    }

    render() {
        return (
            <div className="counter">
                <button onClick={this.increment}>
                    +{this.props.by}
                </button>
                {/*<span className="count">{this.state.counter}</span>*/}
            </div>
        )
    }

    increment() {

        // Only value which is passed in setState is only modified rest variables are not modified
        this.props.incrementMethod(this.props.by)
    }
}

CounterButton.defaultProps = {
    by: 1
}
CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter