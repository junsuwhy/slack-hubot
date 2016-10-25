
module.exports = function(robot){
  robot.respond(/我是(.*)/i, function(msg){
    msg.send(msg.match[1]+`你好，現在用的 pid 是 ${process.pid}`);
  });

  robot.respond(/(pokemon(?: (.+))?)/i, function(msg){
    var pokemon = require('pokemon');
    var request = require('request');
    var cheerio = require('cheerio');

    console.log(msg.match);

    if(msg.match[2] == undefined){
      p = pokemon.random('en').toLowerCase();
    }else if(msg.match[2].match(/^\d+$/i)){
      p = pokemon.getName(msg.match[2]).toLowerCase();
    }else{
      p = msg.match[2].toLowerCase();
    }

    msg.send(p);
    
    request('https://wiki.52poke.com/zh-hant/'+p, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(html);
        title = $('title').text();
        name = title.match(/(.+) - /i)[1];

        msg.send(name + "\n https://wiki.52poke.com/zh-hant/" + name);
      }
    });
  });
}