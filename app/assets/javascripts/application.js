// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'gi'), replacement);
};

// Remove inappropriate words from song lyrics
cleanse = function(str) {
  bannedWords = ['shit', 'motherfucker', 'fuck', 'cunt', 'cock', 'nigga', 'nigger', 'faggot', 'fag', 'pussy', 'bitch']
  bannedWords.forEach(function(word) {
    replacement = new Array(word.length).join('*');
    replacement = word[0] + replacement
    str = str.replaceAll(word, replacement);
  });
  return str;
}

displayLyrics = function() {
  if($('#myonoffswitch').is(':checked')) {
    $('.lyrics-section .lyrics').html(cleanse(window.lyrics));
  } else {
    $('.lyrics-section .lyrics').html(window.lyrics);
  }
}

ready = function() {
  $('.artist-tile, .encore-button').click(function() {
    artist_name = $(this).data('artist');
    if(artist_name == 'other_artist') {
      alert('We will be adding more artists in the future!');
    } else {
      $('.lyrics-section').hide();
      $('.loading-section').show();
      loadParticles();

      $('html, body').animate({
        scrollTop: $(".loading-section").offset().top
      }, 1000);

      $.ajax({
        type: "POST",
        url:  '/lyrics.json',
        data: {"artist": artist_name},
        success: function(data) {
          var lyrics = data.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br />');
          window.lyrics = lyrics

          // Empty out the artist title image section
          $('.lyrics-section .artist').empty();

          // Load the artists image
          var artist_image_url = $('*[data-artist="'+artist_name+'"] img')[0].src;
          var img = $('<img>');
          img.attr('src', artist_image_url);
          img.appendTo('.lyrics-section .artist');

          // Load the artist name into a title
          var artist = $('<span class="name">').append(artist_name.replace('_', ' '));
          artist.appendTo('.lyrics-section .artist');


          // Add the bot text
          var bot = $('<span class="bot">').append("bot");
          bot.appendTo('.lyrics-section .artist');

          // Update the encore button
          $('.encore-button').data('artist', artist_name);

          // Load the lyrics
          displayLyrics();


          setTimeout(function() {
            $('.loading-section').hide();
            $('.lyrics-section').fadeIn();
          }, Math.floor((Math.random() * 5000) + 3500));
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Error, status = " + textStatus + ", " +
                "error thrown: " + errorThrown
          );
        }
      });
    }
    $('#myonoffswitch').click(function() {
      displayLyrics();
    })
  });

loadParticles = function() {
    // Particles.js
  particlesJS("particles-js", {
    "particles":{
        "number":{
           "value":20,
           "density":{
              "enable":true,
              "value_area":150
           }
        },
        "color":{
           "value":"#aaa"
        },
        "shape":{
           "type":"circle",
           "stroke":{
              "width":0,
              "color":"#000000"
           },
           "polygon":{
              "nb_sides":5
           },
           "image":{
              "src":"img/github.svg",
              "width":100,
              "height":100
           }
        },
        "opacity":{
           "value":0.5,
           "random":false,
           "anim":{
              "enable":false,
              "speed":1,
              "opacity_min":0.1,
              "sync":false
           }
        },
        "size":{
           "value":5,
           "random":true,
           "anim":{
              "enable":false,
              "speed":40,
              "size_min":0.1,
              "sync":false
           }
        },
        "line_linked":{
           "enable":true,
           "distance":150,
           "color":"#ccc",
           "opacity":0.4,
           "width":1
        },
        "move":{
           "enable":true,
           "speed":1,
           "direction":"none",
           "random":false,
           "straight":false,
           "out_mode":"out",
           "bounce":false,
           "attract":{
              "enable":false,
              "rotateX":600,
              "rotateY":1200
           }
        }
     },
     "retina_detect":true
  });
}
}

$(ready)

