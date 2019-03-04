import config from './client-config';
export default CS1=>{AFRAME.registerComponent('game', {
  schema: {mode:{type: 'string',default:'standard'}},
  init: function () {
    CS1.game = this;
    this.isRunning = false;
    this.name = config.gameName;
    this.welcomeDelay = config.voice.welcomeDelay;
    document.querySelector('#scene-container').style.display='block';
    document.querySelector('#loading-screen').style.display='none';
    CS1.myPlayer = document.querySelector('#my-player');
    CS1.cam = document.querySelector('#cam');
    CS1.myPlayer.spawnPos = CS1.myPlayer.getAttribute('position');
    CS1.myPlayer.spawnRot = CS1.myPlayer.getAttribute('rotation');
    CS1.myPlayer.startSpeed = CS1.myPlayer.components["movement-controls"].data.speed;
    this.pause();
    CS1.voices = window.speechSynthesis.getVoices();
    CS1.say = function(msg,name="none given") {
      var msg = new SpeechSynthesisUtterance(msg);
      if(name == "none given")
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == config.voice.name; })[0];
      else
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == name; })[0];
      msg.pitch = config.voice.pitch;
      msg.rate = config.voice.rate;
      msg.volume = config.voice.volume;
      speechSynthesis.speak(msg);
    }
    CS1.printVoices = ()=>{
      speechSynthesis.getVoices().forEach(v=>{
        console.log(v.name,v.lang);
      });
    }
    CS1.sounds = {};
    Object.keys(config.sounds).forEach(soundName=>{
      CS1.sounds[soundName] = new Audio(config.sounds[soundName].url);
      CS1.sounds[soundName].loop = config.sounds[soundName].loop || false;
      CS1.sounds[soundName].volume = config.sounds[soundName].volume || 1;
    });
    CS1.scene=AFRAME.scenes[0];
    CS1.myPlayer.components["movement-controls"].data.speed=0;
  },
  tick: function (time,dt) {
   
  },
  start: function () {
    CS1.sounds.playerJoined.onended = ()=>{
      CS1.myPlayer.components["movement-controls"].data.speed=CS1.myPlayer.startSpeed;
      this.isRunning=true;
    }
    CS1.sounds.playerJoined.play();
    
  },
  playerDistanceTo: function (entity) {
    return CS1.myPlayer.object3D.position.distanceTo(entity.object3D.position);
  }
});}