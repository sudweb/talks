import Tabletop from 'tabletop';


const SpreadsheetService = {
  init: () => {

    return new Promise((resolve, reject) => {
      Tabletop.init({
        key: '1I8mJSe6PgrUBmpGHCqtDWcxsSfLWPN11Ezi14bmJ1Iw',
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