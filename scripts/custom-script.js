
module.exports = function(robot){
  robot.respond(/我是(.*)/i, function(msg){
    msg.send(msg.match[1]+`你好，現在用的 pid 是 ${process.pid}`);
  });

  robot.respond(/((?:工作室|百味|阿德|阿勇|統編|統一編號).+)/i, function(msg){
    connect_airtable = require('./connect_airtable');
    connect_airtable.find(msg, msg.match[1]);
  });

  robot.respond(/(pokemon(?: (.+))?)/i, function(msg){
    var pokemon = require('pokemon');
    var request = require('request');
    var cheerio = require('cheerio');

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