(function ($) {
"use strict";


$(window).on('load', function () {
	$('.torun-preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({ 'overflow': 'visible' });
})

    /*======================================
    Mobile Menu Js
    ========================================*/
	$("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "991",
        meanExpand: ['<i class="fa-regular fa-angle-right"></i>'],
    });

    $("#mobile-menu-2").meanmenu({
        meanMenuContainer: ".mobile-menu-2",
        meanScreenWidth: "4000",
        meanExpand: ['<i class="fa-regular fa-angle-right"></i>'],
    });


	$('.info-bar').on('click', function () {
		$('.extra-info').addClass('info-open');
	})

	$('.close-icon').on('click', function () {
		$('.extra-info').removeClass('info-open');
	})

	/*--------------------------------------
	Sidebar Toggle
	---------------------------------------*/

	$(".offcanvas__close,.offcanvas__overlay").on("click", function () {
		$(".offcanvas__area").removeClass("info-open");
		$(".offcanvas__overlay").removeClass("overlay-open");
	});
	$(".sidebar__menu").on("click", function () {
		$(".offcanvas__area").addClass("info-open");
		$(".offcanvas__overlay").addClass("overlay-open");
	});

	$(".search-open-btn").on("click", function () {
		$(".search__popup").addClass("search-opened");
	});

	
	$(".search-close-btn").on("click", function () {
		$(".search__popup").removeClass("search-opened");
	});




	// sticky
	var wind = $(window);
	var sticky = $('#sticky-header');
	wind.on('scroll', function () {
		var scroll = wind.scrollTop();
		if (scroll < 100) {
			sticky.removeClass('sticky');
		} else {
			sticky.addClass('sticky');
		}
	});

// data - background
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})



	// mainSlider
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: true,
			autoplaySpeed: 10000,
			dots: false,
			fade: true,
			prevArrow: '<button type="button" class="slick-prev"> <i class="far fa-chevron-left"></i> </button>',
			nextArrow: '<button type="button" class="slick-next"> <i class="far fa-chevron-right"></i> </button>',
			arrows: true,
			responsive: [
				{ breakpoint: 767, settings: { dots: false, arrows: false } }
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	mainSlider();



	

/* project-acive */
$('.project-active').owlCarousel({
    stagePadding: 380,
    loop:true,
	center: true,
    nav:true,
	margin: 30,
	dots:true,
	autoplay:false,
	items:1,
	navText: ['<i class="far fa-long-arrow-left"></i>', '<i class="far fa-long-arrow-right"></i>'],
    responsive:{
        0:{
            stagePadding: 0,
			items: 1,
			nav: false,
        },
        768:{
            items: 2,
            stagePadding: 0,

        },
        992:{
            items: 2,
            stagePadding: 0,

        },
        1200:{
			stagePadding: 380,
        },
        1500:{
			stagePadding: 430,
        }
    }
})

/* testimonial-active */
$('.testimonial-active').owlCarousel({
	loop: true,
	nav: true,
	dots: false,
	margin:0,
	autoplay: false,
	navText: ['<i class="far fa-long-arrow-right"></i>', '<i class="far fa-long-arrow-left"></i>'],
	responsive: {
		0: {
			items: 1,
			nav: false,
		},
		576: {
			items: 1,
			nav: false,
		},
		768: {
			items: 1,
			nav: false,
		},
		992: {
			items: 1
		},
		1200: {
			items: 1
		}
	}
})
/* client-active */
$('.client-active').owlCarousel({
	loop: true,
	nav: true,
	dots: false,
	margin: 30,
	autoplay: false,
	navText: ['<i class="far fa-angle-left"></i>', '<i class="far fa-angle-right"></i>'],
	responsive: {
		0: {
			items: 1,
			nav: false,
		},
		576: {
			items: 1,
			nav: false,
		},
		768: {
			items: 2,
			nav: false,
		},
		992: {
			items: 3
		},
		1200: {
			items: 3
		}
	}
})


/* brand-active */
$('.brand-active').owlCarousel({
	loop: true,
	nav: false,
	dots: false,
	autoplay: true,
	navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	responsive: {
		0: {
			items: 1
		},
		576: {
			items: 2
		},
		768: {
			items: 3
		},
		992: {
			items: 4
		},
		1200: {
			items: 6
		}
	}
})	

/* testimonial-2-active */
$('.testimonial-2-active').owlCarousel({
	loop: true,
	nav: true,
	dots: true,
	margin:0,
	autoplay: false,
	navText: ['<i class="far fa-angle-left"></i>', '<i class="far fa-angle-right"></i>'],
	responsive: {
		0: {
			items: 1,
			nav: false,
		},
		576: {
			items: 1,
			nav: false,
		},
		768: {
			items: 1,
			nav: false,
		},
		992: {
			items: 1
		},
		1200: {
			items: 1
		}
	}
})

//  team-active

var productTwo = new Swiper('.team_active', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    observer: true,
    observeParents: true,
	autoplay:false,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".team_button-next",
        prevEl: ".team_button-prev",
    },
    breakpoints: {
        '1400': {
            slidesPerView: 3,
        },
        '1200': {
            slidesPerView: 3,
        },
        '992': {
            slidesPerView: 3,
        },
        '768': {
            slidesPerView: 2,
        },
        '576': {
            slidesPerView: 2,
        },
        '0': {
            slidesPerView: 1,
        },
    },
});


//  case-active

var productTwo = new Swiper('.case_active', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    observer: true,
    observeParents: true,
	autoplay:false,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".case_button-prev",
        prevEl: ".case_button-next",
    },
    breakpoints: {
        '1400': {
            slidesPerView: 2,
        },
        '1200': {
            slidesPerView: 2,
        },
        '992': {
            slidesPerView: 2,
        },
        '768': {
            slidesPerView: 2,
        },
        '576': {
            slidesPerView: 1,
        },
        '0': {
            slidesPerView: 1,
        },
    },
});


// blog - active
$('.postbox__gallery').slick({
	dots: false,
	arrows: true,
	infinite: true,
	speed: 300,
	prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
	]
});

/* case-active */
$('.case-active').owlCarousel({
	loop: true,
	nav: false,
	dots: true,
	margin:30,
	autoplay: false,
	navText: ['<i class="far fa-long-arrow-left"></i>', '<i class="far fa-long-arrow-right"></i>'],
	responsive: {
		0: {
			items: 1,
			nav: false,
		},
		576: {
			items: 1,
			nav: false,
		},
		768: {
			items: 2,
			nav: false,
		},
		992: {
			items: 3
		},
		1200: {
			items: 3,
		},
		1600: {
			items: 5,
		}
	}
})

	/* counter */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	//  Create An Account Toggle Js
	$("#cbox").on("click", function () {
		$("#cbox_info").slideToggle(900);
	  });

  /*======================================
  MagnificPopup image view
  ========================================*/
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });


  /*======================================
  MagnificPopup video view
  ========================================*/
  $(".popup-video").magnificPopup({
    type: "iframe",
  });
$('#portfolio-grid').imagesLoaded(function () {
	// init Isotope
	var $grid = $('#portfolio-grid').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			// use outer width of grid-sizer for columnWidth
			columnWidth: '.grid-item'
		}
	});
	// filter items on button click
	$('.portfolio-menu').on('click', 'button', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});
});


//for menu active class
$('.portfolio-menu button').on('click', function (event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});


	// countdown
	$('[data-countdown]').each(function () {
		var $this = $(this), finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<div class="time-count">%D <span>days</span></div><div class="time-count">%H <span>hour</span></div><div class="time-count">%M <span>minute</span></div><div class="time-count">%S <span>Second</span></div>'));
		});
	});

	/* Circular Progress */
	$('.circular-progress').waypoint(function(){

		$('.circular-progress').easyPieChart({
			lineWidth: 3,
			trackColor: false,
			scaleLength: 0,
			barColor: '#fff'
		});

	}, {
		triggerOnce: true,
		offset: 'bottom-in-view'
	});

	// scrollToTop
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '300', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: '<i class="fas fa-angle-up"></i>', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});


	// nice select
	$('select').niceSelect();
	  
// WOW active
new WOW().init();


	/*-------------------------
		showlogin toggle function
	--------------------------*/
	$('#showlogin').on('click', function () {
		$('#checkout-login').slideToggle(900);
	});

	/*-------------------------
		showcoupon toggle function
	--------------------------*/
	$('#showcoupon').on('click', function () {
		$('#checkout_coupon').slideToggle(900);
	});

	/*-------------------------
		Create an account toggle function
	--------------------------*/


	$('#xbox').on('click', function () {
		$('#xbox_info').slideToggle(900);
	});

	/*-------------------------
		Create an account toggle function
	// --------------------------*/
	$('#ship-box').on('click', function () {
		$('#ship-box-info').slideToggle(1000);
	});


	// map
	function basicmap() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(-36.8509, 174.7645), // New York
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{ "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "weight": "2.00" }] }, { "featureType": "all", "elementType": "geometry.stroke", "stylers": [{ "color": "#9c9c9c" }] }, { "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#7b7b7b" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#c8d7d4" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#070707" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }]
		};
		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('contact-map');

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			title: 'Cryptox'
		});
	}
	if ($('#contact-map').length != 0) {
		google.maps.event.addDomListener(window, 'load', basicmap);
	}

})(jQuery);