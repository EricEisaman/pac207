export default CS1=>{
  let socket = CS1.socket = io();
  socket.on('connect',()=>{
    console.log(`socket connected with id: ${socket.id}`);
    console.log('Client.js can initialize my playerData now.');
    socket.playerData = {position:{},rotation:{},faceIndex:0};
    socket.lastPlayerData = {position:{},rotation:{},faceIndex:0};
    
    CS1.game.login = (un,pw)=>{
      socket.emit('login',{name:un,pw:pw});
    }
    socket.on('login-results',data=>{
      console.log(data);
      if(data.success) {
       document.querySelector('#login').style.zIndex = -1;
       document.querySelector('#login').style.display = 'none'; 
      }
      else document.getElementById('login-msg').innerHTML = data.msg;
      CS1.game.hasBegun = true;
      let playerData = {};
      let pos = CS1.player.getAttribute('position');
      pos.x = Number(pos.x.toFixed(2));
      pos.y = Number(pos.y.toFixed(2));
      pos.z = Number(pos.z.toFixed(2));
      playerData.position = pos;
      let rot = CS1.player.getAttribute('rotation');
      rot.x = Number(Number(rot.x).toFixed(1));
      rot.y = Number(Number(rot.y).toFixed(1));
      rot.z = Number(Number(rot.z).toFixed(1));
      playerData.rotation = rot;
      socket.emit('new-player',playerData);
    });
    
    socket.on('disconnect',e=>{
      
    });
    
  });
}