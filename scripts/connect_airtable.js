module.exports = {

  find:function(msg, search_text){
    var Airtable = require('airtable');

    if(process.env.AIRTABLE_APIKEY == undefined || process.env.AIRTABLE_BASE == undefined){
      // console.log('記得先設 env 變數');
      msg.send('記得先設 env 變數');
    }

    var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(process.env.AIRTABLE_BASE);
    var is_found = false;

    base('Table 1').select({
        // Selecting the first 3 records in Main View:
        maxRecords: 10,
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
            id = record.id;
            if(record.get('Name').match(search_text) !== null && record.get('Name').match(search_text).length > 0){
              // console.log(record.get('Notes'));
              msg.send(record.get('Notes'));
              is_found = true;
            }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(error) {
        if(!is_found){
          // console.log("沒找著");
          msg.send('沒找著');
        }
        if (error) {
            console.log(error);
        }
    });

  },

}

