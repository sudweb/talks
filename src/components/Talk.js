import React, { Component } from "react";
import moment from "moment";
import md5 from "js-md5";
import { isPK } from "../selectors/Talks";

import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import CommunicationEmail from "material-ui/svg-icons/communication/email";
import {
  lightGreen500,
  lightBlack,
  orange500,
  teal500
} from "material-ui/styles/colors";
import Chip from "material-ui/Chip";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";

import CONFIG from "../config";
import Notes from "../containers/Notes";

class Talk extends Component {
  getDate(date) {
    console.log(date);
    
    return moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");
  }

  getText(text) {
    if (!text) {
      return false;
    }

    const paragraphs = text.match(/[^\r\n]+/g);
    if (paragraphs === null) {
      return false;
    }
    return paragraphs.map((p, key) => <p key={key}>{p}</p>);
  }

  getAvatar(email) {
    const hash = md5(email.toLowerCase());
    if (email) {
      return <Avatar src={`https://www.gravatar.com/avatar/${hash}`} />;
    }

    return null;
  }

  sendMail(email) {
    window.location = `mailto:${email}`;
  }

  getProfile(talk) {
    if (!talk.email || talk.email === " ") {
      return (
        <ListItem
          disabled={true}
          primaryText={
            (
              <span>
                {talk[CONFIG.fields.name]}
                <span style={{ color: lightBlack }}>
                  , le {this.getDate(talk[CONFIG.fields.timestamp])}
                </span>
              </span>
            )
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
        <CommunicationEmail color={lightGreen500} />
      </IconButton>
    );

    return (
      <ListItem
        disabled={true}
        primaryText={
          (
            <span>
              {talk[CONFIG.fields.name]}
              <span style={{ color: lightBlack }}>
                , le {this.getDate(talk[CONFIG.fields.timestamp])}
              </span>
            </span>
          )
        }
        secondaryText={talk.email}
        leftAvatar={this.getAvatar(talk.email)}
        rightIcon={iconButtonElement}
      />
    );
  }

  render() {
    const { talk } = this.props;
    if (talk === null) {
      return null;
    }

    const formatStyle = {
      backgroundColor: isPK(talk.formats) ? teal500 : orange500,
      marginTop: ".85em"
    };

    return (
      <section className="Wrapper">
        <div className="Talk">
          <h2>{talk[CONFIG.fields.title]}</h2>
          <Chip labelColor="white" style={formatStyle}>{talk.formats}</Chip>
          <Notes />

          <Divider />
          <List>
            {this.getProfile(talk)}
          </List>
          <Divider />
          <h3>Description</h3>
          {this.getText(talk[CONFIG.fields.description])}

          <h3>Durée de ton intervention</h3>
          {this.getText(
            talk.duree_de_ton_intervention
          )}

          <h3>As-tu besoin d’aide concernant ta venue, ta proposition ou n’importe quel autre aspect de ce Sud Web (ça ne sera pas publié sur le site) ?</h3>
          {this.getText(talk.as_tu_besoin_daide_concernant_ta_venue_ta_proposition_ou_nimporte_quel_autre_aspect_de_ce_sud_web_ca_ne_sera_pas_publie_sur_le_site)}
        </div>
      </section>
    );
  }
}

export default Talk;
