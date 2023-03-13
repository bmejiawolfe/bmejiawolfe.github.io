(function (window, videojs) {
  'use strict';
  publicEndDate = function () {
    Date.daysBetween = function (date1, date2) {
      //Get 1 day in milliseconds
      var oneDay = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var date1Ms = date1.getTime();
      var date2Ms = date2.getTime();

      // Calculate the difference in milliseconds
      var differenceMs = date2Ms - date1Ms;

      // Convert back to days and return
      return Math.round(differenceMs / oneDay);
    }

    drawDateGate = function() {
      myPlayer.el().removeChild(document.getElementById('vjs-date-gate'));

      var gate = document.createElement('div');
      gate.id = 'vjs-date-gate';

      var title = document.createElement('h3');
      title.innerHTML = "Public-Facing Link has expired.";
    }

    var myPlayer = this;
    var letPlay = false;

    var today = new Date();
    var pubDate = new Date(this.mediainfo.publishedAt);

    if (Date.daysBetween(pubDate, today) < 30) {
      letPlay = true;
    }

    myPlayer.on('play', function () {
      if (letPlay) { myPlayer.play(); }
      else { drawDateGate(); myPlayer.pause(); }
    });
  }

  videojs.plugin('publicEndDate', publicEndDate);
}(window, window.videojs));