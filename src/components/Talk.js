import React, { Component } from 'react';
import SpreadsheetService from '../services/SpreadsheetService';
import moment from 'moment';
import md5 from 'js-md5';

import { List, ListItem } from 'material-ui/List';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {red500, lightBlack, amber500} from 'material-ui/styles/colors';

class Talk extends Component {
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
      return <Avatar backgroundColor={red500}>PK</Avatar>
    }
    if (format === 'Lightning Talk : 5 minutes') {
      return <Avatar backgroundColor={amber500}>LT</Avatar>
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

  render() {
    const {talk} = this.props;

    if (talk === null) {
      return null;
    }

    return (
      <Card className="Talk">
        <CardTitle>
          <h2>{talk.titredetaprésentation}</h2>
        </CardTitle>
        <CardText>
          <List>
            <ListItem
              onTouchTap={() => this.sendMail(talk.email)}
              primaryText={
                <span>{talk.prénometnom}<span style={{color: lightBlack}}>, le {this.getDate(talk.timestamp)}</span></span>
              }
              secondaryText={talk.email}
              leftAvatar={this.getAvatar(talk.email)}
              rightIcon={<CommunicationEmail color={red500} />}
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
    );
  }
}

export default Talk;
