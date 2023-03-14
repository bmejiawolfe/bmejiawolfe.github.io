videojs.registerPlugin('publicEndDate', function () {
  Date.daysBetween = function (date1, date2) {
    var oneDay = 1000 * 60 * 60 * 24;

    var date1Ms = date1.getTime();
    var date2Ms = date2.getTime();

    var differenceMs = date2Ms - date1Ms;

    return Math.round(differenceMs / oneDay);
  }

  var $ = jQuery;
  var myPlayer = this;
  var today = new Date();

  var ModalDialog = videojs.getComponent('ModalDialog');

  var modal = new ModalDialog(myPlayer, {
    temporary: false,
    content: 'The 30-day limit for this video has expired.'
  });

  myPlayer.addChild(modal);

  myPlayer.on('loadstart', function () {
    let pubDate = new Date(myPlayer.mediainfo.publishedAt);
    if (Date.daysBetween(pubDate, today) > 30) {
      myPlayer.pause();
      myPlayer.bigPlayButton.hide();
      myPlayer.controlBar.hide();
      modal.open();
    } else {
      myPlayer.bigPlayButton.show();
      myPlayer.controlBar.show();
      modal.close();
    }
  });

  myPlayer.on('play', function () {
    let pubDate = new Date(myPlayer.mediainfo.publishedAt);
    if (Date.daysBetween(pubDate, today) > 30) {
      myPlayer.pause();
      modal.open();
    } else {
      myPlayer.play();
    }
  });

  myPlayer.on("seeking", function () {
    let pubDate = new Date(myPlayer.mediainfo.publishedAt);
    if (Date.daysBetween(pubDate, today) > 30 && myPlayer.currentTime()) {
      myPlayer.currentTime(currentTime);
    }
  });

  myPlayer.on("seeked", function () {
    let pubDate = new Date(myPlayer.mediainfo.publishedAt);
    if (Date.daysBetween(pubDate, today) > 30 && myPlayer.currentTime()) {
      myPlayer.currentTime(currentTime);
    }
  });

  $('#gen-video').on({
    'click': function () {
      var inputValue = $("#input-video-id").val();
      myPlayer.catalog.getVideo(inputValue, function (error, video) {
        //deal with error
        myPlayer.catalog.load(video);
      });
    }
  });
});
