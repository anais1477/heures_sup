import React, { Component } from 'react';
import ReactIntl  from 'react-intl';
import {Container, Row, Col, Table} from 'reactstrap';

import { InputGroup, InputGroupAddon, FormGroup, Label, Input } from 'reactstrap';

import LeftArrow from './image/left-arrow.png';
import RightArrow from './image/right-arrow.png';

class MainArea extends Component {
  constructor() {
    super();
    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
        today: date,
        entree: '08:30',
        sortie: '18:00',
        pause: '1h',
        heure_sup_en_cours:'00:00',
        heure_sup_125:'00:00',
        heure_sup_150:'00:00',
        heure_sup_200:'00:00',
        heure_sup_week_en_cours:'00:00',
        heure_sup_week_125:'00:00',
        heure_sup_week_150:'00:00',
        heure_sup_week_200:'00:00'
    }
  }

 /* removePerson(id) {
    this.setState({ people: this.state.people.filter(person => person.id !== id)});
  }*/

    handleChangeEntree(event) {
        this.setState({entree: event.target.value});
        console.log(" entree" +this.state.entree);
    }
    handleChangeSortie(event) {
        this.setState({value: event.target.value});
    }
    handleChangePause(event) {
        this.setState({value: event.target.value});
    }
    nextDay() {
        //TODO
        //A modifier ne fonctionne pas totalement
        var today = new Date();
        var nextDay = new Date(today.setTime( today.getTime() + 1 * 86400000 ));
        this.setState({today:  nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate()});
        console.log(" today" +this.state.today);
    }
    previousDay() {
        //TODO
        //A modifier ne fonctionne pas totalement
        var today = new Date();
        var nextDay = new Date(today.setTime( today.getTime() - 1 * 86400000 ));
        this.setState({today:  nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate()});
        console.log(" today" +this.state.today);
    }
  render () {
    /*let peopleCards = this.state.people.map(person => {
      return (
        <Col sm="4">
          <PeopleCard key={person.id} removePerson={this.removePerson.bind(this)} person={person} />
        </Col>
      )
    })*/
    return (
      <Container fluid>
          <Row>
              <Col sm={{ size: 10 }}>
                  <div><button onClick={this.previousDay.bind(this)}><img src={LeftArrow}/></button></div>
              </Col>
              <Col sm={{ size: 10 }}>
                  <div>
                      <Input value={this.state.today} name="today" type="date"  /></div>

              </Col>
              <Col sm={{ size: 10 }}>
                  <div><button onClick={this.nextDay.bind(this)}><img src={RightArrow}/></button></div>

              </Col>
          </Row>
        <Row>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Entrée</InputGroupAddon>
                <Input value={this.state.entree} name="entree" type="time" onChange={this.handleChangeEntree.bind(this)} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Sortie</InputGroupAddon>
                <Input value={this.state.sortie} name="sortie" onChange={this.handleChangeSortie.bind(this)} />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Pause</InputGroupAddon>
                <Input value={this.state.pause} name="pause" onChange={this.handleChangePause.bind(this)}  />
            </InputGroup>
        </Row>
         <Row>
             <FormGroup row>
                 <Col sm={{ size: 10 }}>
                     <FormGroup check>
                         <Label check>
                             <Input type="checkbox" id="checkbox2" />{' '}
                             En congé
                         </Label>
                     </FormGroup>
                 </Col>
             </FormGroup>
         </Row>
          <Row>
              <Table responsive style={{fontSize:"0.8rem"}}>
                  <thead>
                  <tr>
                      <th></th>
                      <th>En cours</th>
                      <th>125%</th>
                      <th>150%</th>
                      <th>200%</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th scope="row" style={{fontSize:"0.8rem"}}>Semaine</th>
                      <td>{this.state.heure_sup_en_cours}</td>
                      <td>{this.state.heure_sup_125}</td>
                      <td>{this.state.heure_sup_150}</td>
                      <td>{this.state.heure_sup_200}</td>
                  </tr>
                  <tr>
                      <th scope="row" style={{fontSize:"0.8rem"}}>Week-end</th>
                      <td>{this.state.heure_sup_week_en_cours}</td>
                      <td>{this.state.heure_sup_week_125}</td>
                      <td>{this.state.heure_sup_week_150}</td>
                      <td>{this.state.heure_sup_week_200}</td>
                  </tr>
                  </tbody>
              </Table>
          </Row>
      </Container>
    )
  }
}

export default MainArea;
