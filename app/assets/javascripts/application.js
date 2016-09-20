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
ready = function() {
  $('.carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '.arrow-prev',
    nextArrow: '.arrow-next',

    responsive: [
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 745,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

$(ready)


var ready = function() {
  $('.thumb a').click(function() {
    artist_name = $(this).data('artist');
    if(typeof artist_name != 'undefined') {
      $(".lyrics .subtitle").fadeIn(600)
      $(".lyrics .subtitle").html('Training...')
      $('html, body').animate({
        scrollTop: $(".lyrics .subtitle").offset().top
      }, 1000);
      $.post('/lyric', {artist: artist_name}, function(data) {
        lyrics = data.lyrics.replace('*BREAK*', '\n')
        $('.lyrics .subtitle').html(artist_name.replace('_', ' '))
        $('.lyrics .container').html(lyrics)
      })
    }
  })
}

$(ready)

