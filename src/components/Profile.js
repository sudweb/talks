import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import { ListItem } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

class Profile extends Component {
  render() {
    const { profile, signout } = this.props;

    if (!profile) {
      return null;
    }

    const styleProfile = {
      color: "white",
      paddingTop: !profile.email ? 24 : 14,
      paddingBottom: !profile.email ? 4 : 14,
      paddingRight: 42
    };

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="top-right"
        style={{ paddingRight: 0, width: 32 }}
      >
        <MoreVertIcon color="white" />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={signout}>Déconnexion</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem
        disabled={true}
        innerDivStyle={styleProfile}
        primaryText={profile.name || ""}
        secondaryText={profile.email || " "}
        leftAvatar={
          (
            <Avatar
              style={{ top: 12 }}
              src={profile.img}
              backgroundColor="white"
            />
          )
        }
        rightIconButton={rightIconMenu}
      />
    );
  }
}

export default Profile;
