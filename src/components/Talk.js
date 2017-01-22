import React, { Component } from 'react';
import moment from 'moment';
import md5 from 'js-md5';
import { isPK } from '../services/FormatService';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import {red500, lightBlack, orange500, teal500} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';

class Talk extends Component {
  getDate(date) {
    return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
  }

  getText(text) {
    if (!text) {
      return false;
    }

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
      return <Avatar backgroundColor={orange500}>LT</Avatar>
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

    const formatStyle = {
      backgroundColor: isPK(talk.formats) ? teal500 : orange500,
      marginTop: '.85em'
    }

    return (
      <section className="Talk">
        <h2>{talk.titre_de_ta_presentation}</h2>
        <Chip labelColor='white' style={formatStyle}>{talk.formats}</Chip>
        <List>
          <ListItem
            onTouchTap={() => this.sendMail(talk.email)}
            primaryText={
              <span>{talk.prenom_et_nom}<span style={{color: lightBlack}}>, le {this.getDate(talk.timestamp)}</span></span>
            }
            secondaryText={talk.email}
            leftAvatar={this.getAvatar(talk.email)}
            rightIcon={<CommunicationEmail color={red500} />}
            />
        </List>
        <h3>Description</h3>
        {this.getText(talk.description_de_ta_presentation)}


        <h3>Si le public ne devait retenir qu'une chose, ce serait...</h3>
        {this.getText(talk.si_le_public_ne_devait_retenir_quune_chose_ce_serait)}

        <h3>Tu veux ajouter quelque chose ?</h3>
        {this.getText(talk.tu_veux_ajouter_quelque_chose)}
      </section>
    );
  }
}

export default Talk;
