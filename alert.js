// ==UserScript==
// @name        DXP alert - aca.lt
// @namespace   Violentmonkey Scripts
// @match       http://ttstats.aca.lt/
// @grant       none
// @version     1.0
// @author      Firewall
// @description Script is executed every 15s to check if any server has DXP, in which case a sound is played
// ==/UserScript==


(async function() {
  'use strict';
  var alerted = false;
  var active_servers = [];
  var dxp_on = false;
  setInterval(async function() {
    document.getElementsByClassName("refresh")[0].click();
    var player_start = document.createElement('audio');
    var player_end = document.createElement('audio');
    player_start.preload = "auto";
    player_end.preload = "auto";
    
    player_start.src = 'https://proxy.notificationsounds.com/notification-sounds/deduction-588/download/file-sounds-1135-deduction.mp3';
    player_end.src = 'https://proxy.notificationsounds.com/notification-sounds/clearly-602/download/file-sounds-1143-clearly.mp3';
    await new Promise(r => setTimeout(r, 3000));
    var servers = document.getElementsByClassName("dxp");
    var counter = 0

    servers.forEach(function(entry) {
      counter++;

      if (entry.textContent != "-") {
        dxp_on = true;
        if (!active_servers.includes(counter)) {
          active_servers.push(counter);
          console.log("=> DXP started on S" + counter);
          player_start.play();
          alerted = true;
        }
      } else {
        if (active_servers.includes(counter)){
          active_servers = active_servers.filter(function(item) {
              return item !== counter
          })
          console.log("<= DXP ended on S" + counter);          
          player_end.play();
          if (active_servers.length === 0){
            dxp_on = false;
          }
        }
      };
      
      if (!dxp_on) {
        alerted = false;
        active_servers = [];
      };

    });
    
    //console.log(JSON.stringify(active_servers, null, "  "));
    
  }, 17000);
})();