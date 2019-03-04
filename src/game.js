import config from './client-config';
export default CS1=>{AFRAME.registerComponent('game', {
  schema: {mode:{type: 'string',default:'standard'}},
  init: function () {
    CS1.game = this;
    this.hasBegun = false;
    this.config = config;
    document.querySelector('#scene-container').style.display='block';
    document.querySelector('#loading-screen').style.display='none';
    CS1.player = document.querySelector('#player');
  },
  tick: function (time,dt) {
    
  }
});}