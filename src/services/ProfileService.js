import {requestPeople} from './GoogleAPI';

export const getProfile = result => {
  return new Promise((resolve, reject) => {
    requestPeople()
    .then(result => {
      let profile = {};
      if (result.names) {
        profile.name = result.names[0].displayName;
      }
      if (result.emailAddresses) {
        profile.email = result.emailAddresses[0].value;
      }

      if (result.photos) {
        profile.img = result.photos[0].url;
      }
      resolve(profile);
    }, error => reject(error))
  })
}