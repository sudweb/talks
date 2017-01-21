import Tabletop from 'tabletop';


const SpreadsheetService = {
  init: () => {

    return new Promise((resolve, reject) => {
      Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1I8mJSe6PgrUBmpGHCqtDWcxsSfLWPN11Ezi14bmJ1Iw/pubhtml',
        callback: function (data, tabletop) {
          console.log(data)
          resolve(data);
        },
        simpleSheet: true,
        prettyColumnNames: false
      });
    })
  }
}

export default SpreadsheetService;