flag = false;

module.exports = function(robot){
  if(!flag){
    robot.respond(/我是(.*)/, function(msg){
      msg.send(msg.match[1]+'你好');
      flag = true;
    });
  }
}