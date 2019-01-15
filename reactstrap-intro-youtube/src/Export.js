import React, { Component } from 'react';
import ReactIntl  from 'react-intl';
import { Container, Row, Col } from 'reactstrap';

import { InputGroup, InputGroupAddon, FormGroup, Label, Input } from 'reactstrap';
import PeopleCard from './PeopleCard';

import LeftArrow from './image/left-arrow.png';
import RightArrow from './image/right-arrow.png';

class Export extends Component {
  constructor() {
    super();
    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


  const fetchGetConfig = {
      method: 'GET',
      headers: {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDYwMzUxNjQsImV4cCI6MTU0NjEyMTU2NH0.6tXwod8l_CCfMFRDOTD1KHMPl_2X7UyapmSRD2MvWVg',
          'Content-Type': 'application/json',
      }
  };
    this.state = {
        today: date,
        fromDate: '08:30',
        toDate: '18:00',
        mail: '',
        fetchGetConfig: fetchGetConfig
    }


  }

 /* removePerson(id) {
    this.setState({ people: this.state.people.filter(person => person.id !== id)});
  }*/

    handleChangeFromDate(event) {
        this.setState({fromDate: event.target.value});
        console.log(" fromDate" +this.state.fromDate);
    }
    handleChangeToDate(event) {
        this.setState({toDate: event.target.value});
        console.log(" toDate" +this.state.toDate);
    }
    handleChangeMail(event) {
        this.setState({mail: event.target.value});
        console.log(" mail" +this.state.mail);
    };


    downloadFile = () => {
        console.debug("downloadFile method");
        console.log('this is:', this);
        console.log('this is:', this.state.fetchGetConfig);
        fetch('http://localhost:9890/secureApi/export?date_debut=2018-12-01&date_fin=2018-12-13', this.state.fetchGetConfig)
            .then(res => {
            console.log(res);
            return res;
        }).catch(err => err);
    };

    /*downloadFile = () => {
        console.debug("downloadFile method");
        console.log('this is:', this);
        fetch('http://localhost:9890/secureApi/export?date_debut=2018-12-01&date_fin=2018-12-13' +, {
            method: 'GET',
            headers: {
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDU5NDgzMjEsImV4cCI6MTU0NjAzNDcyMX0.hHrbI9WqJ8LxwX9c64EcppBEsRgNNI_t1kn295DXxu0',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date_debut: '2018-12-01',
                date_fin: '2018-12-13',
            })
        }).then(res => {
            console.log(res);
            return res;
        }).catch(err => err);
    };*/



  render () {
    return (
      <Container fluid>
          <h1>Exporter les données</h1>
        <Row>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Du</InputGroupAddon>
                <Input value={this.state.fromDate} name="fromDate" type="date" onChange={this.handleChangeFromDate.bind(this)} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Au</InputGroupAddon>
                <Input value={this.state.toDate} name="toDate" type="date" onChange={this.handleChangeToDate.bind(this)} />
            </InputGroup>
        </Row>
         <Row>
             <button onClick={this.downloadFile}>Télécharger</button>
         </Row>
          <Row>
              <p>ou</p>
          </Row>
          <Row>
              <InputGroup>
                  <Input value={this.state.mail} name="mail" type="mail" onChange={this.handleChangeMail.bind(this)} />
              </InputGroup>
              <button>Envoyer par mail</button>
          </Row>
      </Container>
    )
  }
}

export default Export;
