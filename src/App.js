import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';
import Expanse from './Expanse';
import Incomes from './Incomes';
import {findLastIndex} from 'lodash';


const DateButton = styled.button`
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  background-color: transparent;
  width: 32px;
  height: 32px;
  margin: 3px;
  cursor: pointer;
  text-align: center;
  `;

const DateLine = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled.span`
  font-family: 'Marmelad';
  cursor: pointer;
  color: white;
  margin: 0 8px;
  border-bottom: ${({selected}) => (selected ? '2px solid white' : 'none')};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 25px;
  padding: 40px 0 15px;
`;

const Table = styled.table`
  width: 300px;
  text-align: right;
  padding-top: 30px;
  margin: 0 auto;
`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      navSelected: 'expanse',
      transactions: []
    };
  }

  handleAddDay = () => {
    this.setState({date: this.state.date.add(1, 'day')});
  };

  handleSubtractDay = () => {
    this.setState({date: this.state.date.subtract(1, 'day')});
  };

  handleNavClick = event => {
     this.setState({navSelected: event.target.getAttribute('name')});
  };

  handleSubmitTransaction = (sum, category) => {
    const {date: TodayDate, transactions} = this.state;

    const newTransaction = {
      date: TodayDate.format('DD.MM.YYYY'),
      category: category,
      sum: sum,
    };

    const index = findLastIndex(transactions, ({date}) => {
      const transactionDate = moment(date, 'DD.MM.YYYY');
      return (
        TodayDate.isBefore(transactionDate, 'day') ||
        TodayDate.isSame(transactionDate, 'day')
        );
      });

    const newTransactions = [ ... transactions];
    newTransactions.splice(
      index === -1 ? transactions.length : index, 0, newTransaction,
      );
    this.setState({transactions: newTransactions});
    };
  

  render() {
    const {date, navSelected, transactions} = this.state;

    return  (
      <section>
        <header>
          <h1>Реактивный бюджет</h1>
          <DateLine>
            <p>{date.format('DD.MM.YYYY')}</p>
            <DateButton onClick={this.handleSubtractDay}>-</DateButton>
            <DateButton onClick={this.handleAddDay}>+</DateButton>
          </DateLine>
        </header>
        <main>
          <Nav>
            <Link name="expanse" onClick={this.handleNavClick} selected={navSelected === 'expanse'}>
              Расходы
            </Link>
            <Link name="incomes" onClick={this.handleNavClick} selected={navSelected === 'incomes'}>
              Доходы
            </Link>
          </Nav>

          {navSelected === 'expanse' ? (
          <Expanse onSubmit={this.handleSubmitTransaction} />
          ) : (
          <Incomes onSubmit={this.handleSubmitTransaction} />
          )}

          <Table>
          <tbody>
            {transactions
              .filter(({date: transactionDate}) => moment(transactionDate, 'DD.MM.YYYY').isSame(date, 'month'))
              .map(({date, sum, category}, index) => (
                <tr key={index}>
                  <td>{date}</td>
                  <td>{sum} руб</td>
                  <td>{category}</td>
                </tr>
              ))}
          </tbody>
          </Table>
        </main>
      </section>
    );
  }
}

export default App;
