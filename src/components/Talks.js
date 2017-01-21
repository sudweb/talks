import React, { Component } from 'react';
import SpreadsheetService from '../services/SpreadsheetService';
import moment from 'moment';
import md5 from 'js-md5';

import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {red, yellow, redLight} from '../services/Colors';

class Talks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talks: null
    }
  }

  componentDidMount() {
    SpreadsheetService.init()
    .then(talks => this.setState({talks: talks}))
  }

  getDate(date) {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
  }

  getText(text) {
    const paragraphs = text.match(/[^\r\n]+/g);
    if (paragraphs === null) {
      return false;
    }
    return paragraphs.map((p, key) => <p key={key}>{p}</p>)
  }

  getFormat(format) {
    if (format === 'Pecha Kucha : 20 images x 20 secondes') {
      return <Avatar backgroundColor={red}>PK</Avatar>
    }
    if (format === 'Lightning Talk : 5 minutes') {
      return <Avatar backgroundColor={yellow}>LT</Avatar>
    }

    return null;
  }

  getAvatar(email) {
    const hash = md5(email.toLowerCase());
    if (email) {
      return <Avatar src={`https://www.gravatar.com/avatar/${hash}`} />
    }

    return null;
  }

  sendMail(email) {
    window.location = `mailto:${email}`;
  }

  getTalk(talk, i) {

    return (
      <Paper style={{margin: 20}} zDepth={1} key={i}>
        <Card>
            <CardHeader
              title={talk.titredetaprésentation}
              subtitle={`Proposé par ${talk.prénometnom} le ${this.getDate(talk.timestamp)}`}
              actAsExpander={true}
              showExpandableButton={true}
              avatar={this.getFormat(talk.formats)}
            />
            <CardText expandable={true}>
              <List>
                <ListItem
                  onTouchTap={() => this.sendMail(talk.email)}
                  hoverColor={redLight}
                  primaryText={talk.prénometnom}
                  secondaryText={talk.email}
                  leftAvatar={this.getAvatar(talk.email)}
                  rightIcon={<CommunicationEmail color={red} />}
                />
              </List>
              <h3>Description</h3>
              {this.getText(talk.descriptiondetaprésentation)}
              

              <h3>Si le public ne devait retenir qu'une chose, ce serait...</h3>
              {this.getText(talk['silepublicnedevaitretenirquunechoseceserait...'])}

              <h3>Tu veux ajouter quelque chose ?</h3>
              {this.getText(talk.tuveuxajouterquelquechose)}
            </CardText>
        </Card>
      </Paper>
    )
  }

  render() {
    console.log(this.state)
    const {talks} = this.state;

    if (talks === null) {
      return <p>Loading...</p>;
    }

    return (
      <section className="Talks">
        {talks.map((talk, i) => this.getTalk(talk, i))}
      </section>
    );
  }
}

export default Talks;
