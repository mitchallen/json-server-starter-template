// Author:  Mitch Allen
// File: uptime.js

const calcUptime = function () {

    // Borrowed from @mitchallen/uptime
  
    function pad(s) {
      return (s < 10 ? '0' : '') + s;
    }
  
    const t = process.uptime();
  
    var hours = Math.floor(t / (60 * 60));
    var minutes = Math.floor(t % (60 * 60) / 60);
    var seconds = Math.floor(t % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  }
  
  module.exports = {
    calcUptime,
  }