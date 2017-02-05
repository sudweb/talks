import React, { Component } from 'react';
import moment from 'moment';
import md5 from 'js-md5';
import { isPK } from '../selectors/Talks';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import { red500, lightBlack, orange500, teal500 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Notes from '../containers/Notes';

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

  getProfile(talk) {
    if (!talk.email || talk.email === ' ') {
      return (
        <ListItem
          disabled={true}
          primaryText={
            <span>{talk.prenom_et_nom}<span style={{ color: lightBlack }}>, le {this.getDate(talk.timestamp)}</span></span>
          }
          leftAvatar={this.getAvatar(talk.email)}
          />
      );
    }

    const iconButtonElement = (
      <IconButton
        onClick={() => this.sendMail(talk.email)}
        touch={true}
        tooltipPosition="top-right"
        style={{ padding: 0, width: 32 }}
        >
        <CommunicationEmail color={red500} />
      </IconButton>
    );

    return (
      <ListItem
        disabled={true}
        primaryText={
          <span>{talk.prenom_et_nom}<span style={{ color: lightBlack }}>, le {this.getDate(talk.timestamp)}</span></span>
        }
        secondaryText={talk.email}
        leftAvatar={this.getAvatar(talk.email)}
        rightIcon={iconButtonElement}
        />
    );
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

        <Notes />

        <Divider />
        <List>
          {this.getProfile(talk)}
        </List>
        <Divider />
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
