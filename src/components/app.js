import React, { Component } from 'react';

export default class App extends Component {
      constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      loading: true
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
