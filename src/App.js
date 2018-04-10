import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    };
  }
  render() {
    const {date} = this.state;

    return  (
      <section>
        <header>
          <h1>Реактивный бюджет</h1>
          <p>{date.format('DD.MM.YYYY')}</p>
        </header>
      </section>
    );
  }
}

export default App;
