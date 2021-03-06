/* ----------------------------------------------------------------------------------------
* Author        : Awaiken
* Template Name : Folder - Freelancer One Page Portfolio & Resume Html5 Template
* File          : Folder Custom JS
* Version       : 1.0
* ---------------------------------------------------------------------------------------- */
(function ($) {
  'use strict';

  const $window = $(window);

	/* Preloader Effect */
  $window.load(() => {
	    $('.preloader').fadeOut(500);
  });

	/* Parallax Effect */
  const $parallax = $('.parallax');
  if ($parallax.length) {
    $parallax.parallax('50%', 0.5);
  }

	/* Top Menu */
  $('#navigation ul li a').on('click', function () {
    const id = $(this).attr('href');
    const h = parseFloat($(id).offset().top);
    $('body,html').stop().animate({
    scrollTop: h - 70
  }, 800);
    $('.navbar-collapse').collapse('hide');

    return false;
  });

	/* Typed subtitle */
  $('.typed-title').typed({
    stringsElement: $('.typing-title'),
    backDelay: 2000,
    typeSpeed: 0,
    loop: true
  });

	/* Animated skills Bars */
  $('#about').waypoint(() => {
    $('.skillbar').each(function () {
    $(this).find('.count-bar').animate({
			  width: $(this).attr('data-percent')
  }, 2000);
  });
  }, {
  offset: '35%'
});

	/* Init Counter */
  $('.counter').counterUp({ delay: 4, time: 1000 });

    /* OwlCarousels testimonial Start*/
  $('#testimonial-carousel').owlCarousel({
    loop: true,
    items: 1,
    margin: 10,
    responsiveClass: true,
  });

	/* Sticky header */
  $window.scroll(() =>  {
    	if ($window.scrollTop() > 200) {
      $('.navbar').addClass('sticky-header');
    } else {
      $('.navbar').removeClass('sticky-header');
    }
  });

	/* Portfolio (filtering) */
	/* Init Isotope */
  const $portfolio = $('.portfolio-boxes').isotope({
    itemSelector: '.portfolio-box',
    layoutMode: 'masonry'
  });

	/* Set initial filtering */
  $window.load(() =>  {
    $portfolio.isotope({ filter: '*' });
  });

	/* Filter items on click */
  const $portfolionav = $('.portfolio-nav li a');
  $portfolionav.on('click', function (e) {
    const filterValue = $(this).attr('data-filter');
    $portfolio.isotope({
    filter: filterValue
  });

    $portfolionav.removeClass('active-portfolio');
    $(this).addClass('active-portfolio');
    e.preventDefault();
  });

	/* Portfolio magnific popup */
  $('.has-popup').magnificPopup({
    type: 'inline',
    overflowY: 'auto',
    closeBtnInside: true,
    mainClass: 'mfp-fade'
  });

	/* Load google map */
  google.maps.event.addDomListener(window, 'load', initMap);
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 36.1498927, lng: -86.7768174 },
    zoom: 12,
    scrollwheel: false,
    styles: [{ elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] }, { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] }, { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] }, { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }, { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] }, { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] }, { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }, { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] }, { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] }],
  });
  }

	/* Contact form validation */
  const $contactform = $('#contactForm');
  $contactform.validator({ focus: false }).on('submit', (event) => {
    if (!event.isDefaultPrevented()) {
    event.preventDefault();
    submitForm();
  }
  });

  function submitForm() {
		/* Initiate Variables With Form Content*/
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    $.ajax({
    type: 'POST',
    url: 'form-process.php',
    data: `name=${  name  }&email=${  email  }&message=${  message}`,
    success(text) {
    if (text == 'success') {
  formSuccess();
} else {
  submitMSG(false, text);
}
  }
  });
  }

  function formSuccess() {
    $contactform[0].reset();
    submitMSG(true, 'Message Sent Successfully!');
  }

  function submitMSG(valid, msg) {
    if (valid) {
    var msgClasses = 'h3 text-center text-success';
  } else {
    var msgClasses = 'h3 text-center text-danger';
  }
    $('#msgSubmit').removeClass().addClass(msgClasses).text(msg);
  }
	/* Contact form validation end */
})(jQuery);
