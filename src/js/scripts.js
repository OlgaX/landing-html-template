"use strict";

//FIXED HEADER
//-------------------------------------------------
(function($){
  var fixedItem = $('#header'), fixedClass = 'site-header--fixed';

  if (!fixedItem.length) {
    return false;
  }

  var minMarginTop;

  function scrollTopValue () {
    return $(window).scrollTop();
  }

  function fixHeader () {
    fixedItem.addClass(fixedClass).css({top: 0});
    $('body').css({marginTop: minMarginTop});
  }

  function unfixHeader () {
    fixedItem.removeClass(fixedClass).css({top: -minMarginTop});
    $('body').css({marginTop: 0});
  }

  function toggleFixHeader () {
    minMarginTop = fixedItem.outerHeight();

    if ( scrollTopValue() > minMarginTop * 2 && $(window).width() >= 576) {
      fixHeader();
    } else if (scrollTopValue() === 0 && $(window).width() < 576 ) {
      unfixHeader();
    }
  }

  $(window).scroll(toggleFixHeader);
  $(window).resize(toggleFixHeader);
})(jQuery);

//SCROLL TOP BUTTON
//-------------------------------------------------
(function($){
  var findWindowHeight = function(){
    return windowHeight = $(window).height();
  };

  var addScrollButton = function(){
    if ($(window).scrollTop() > windowHeight && !$('#scrollButton').length) {
      var scrollButton = '<div id="scrollButton" class="scroll-button"/>';
      $('body').append(scrollButton);
    }else if($(window).scrollTop() < windowHeight && $('#scrollButton').length){
      $('#scrollButton').remove();
    }
  };

  var scrollPage = function(){
    $('body, html').animate({scrollTop : 0}, 800);
  };

  var windowHeight = findWindowHeight();

  $(window).scroll(addScrollButton);
  $(window).resize(findWindowHeight);

  $('body').on('click', '#scrollButton', scrollPage);
})(jQuery);

//INNER ANCHOR SCROLL
//-------------------------------------------------
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  var headerHeight = $('.site-header').outerHeight();

  $('body, html').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - headerHeight
  }, 800)
});

//PLUGIN INIT: jarallax
//-------------------------------------------------
(function($){
  $('.jarallax').jarallax({
    speed: 0.2
  });
})(jQuery);

//PLUGIN INIT: WOW Animation
//-------------------------------------------------
(function($){
  var wow = new WOW({
      boxClass: 'wow',          // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0,                // distance to the element when triggering the animation (default is 0)
      mobile: false             // trigger animations on mobile devices (true is default)
    });

  wow.init();
})(jQuery);
