import config from './client-config';
export default CS1=>{AFRAME.registerComponent('game', {
  schema: {mode:{type: 'string',default:'standard'}},
  init: function () {
    CS1.game = this;
    this.hasBegun = false;
    this.name = config.gameName;
    this.welcomeDelay = config.voice.welcomeDelay;
    document.querySelector('#scene-container').style.display='block';
    document.querySelector('#loading-screen').style.display='none';
    CS1.myPlayer = document.querySelector('#my-player');
    CS1.myPlayer.pause();
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
    
  },
  tick: function (time,dt) {
    
  },
  start: function () {
    CS1.sounds.playerJoined.play();
    CS1.myPlayer.play();
  }
});}