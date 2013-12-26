;(function(){
	function setEqualHeight(columns) {
	    var tallestcolumn = 0;

	    columns.each(function() {
	        currentHeight = $(this).height();
	        if(currentHeight > tallestcolumn) {
	            tallestcolumn  = currentHeight;
	            }
	        }
	    );

		columns.height(tallestcolumn);
	}

	var delay = (function(){
		var timer = 0;
		
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();

	var app = {
		init: function(){
			// Smooth scroll and auto close the menu
			$('a[href^="#"]').bind('click.smoothscroll',function (e) {
				e.preventDefault();

				var target = this.hash,
				$target = $(target);

				if($target.offset() == undefined) return;

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top-0
				}, 900, 'swing').promise().done(function(){
					if($('body').hasClass('auto-close-menu') && $('.menu-open').length > 0){
						$('#menuToggle, #menuToggleLeft').click();
					}
					window.location.hash = target;
				});
			});

			// Menu settings default
			$('#menuToggle, .menu-close').on('click', function(){
				$('#menuToggle').toggleClass('active');
				$('body').toggleClass('body-push-toleft');
				$('#theMenu').toggleClass('menu-open');
			});

			// Scrollable menu on small devices
			$(window).bind("load resize", function(){
				if($(window).height() < 400){
					$(".menu").css("overflow-y","scroll");
				}
				else {
					$(".menu").css("overflow-y","hidden");
				}
			});

			// Preload the fullscreen images
			$('.fullscreen-image:not(:first)').each(function(){
				var img = $('<img />'),
					bgSrc = $(this).css('backgroundImage').match(/[^"]+\.(gif|jpg|jpeg|png)/g);

				if(bgSrc && bgSrc.length){
					img.attr('src', bgSrc[0]);
				}
			});

			$(document).on('animating.slides', function(a){
				// Fittxt
				setTimeout(function(){
					$('.fittext').fitText(0.78, { minFontSize: '40px', maxFontSize: '100px' });
					$('.hugetext').fitText(0.5, { minFontSize: '100px', maxFontSize: '180px' });
					$('.fitticker').fitText(2, { minFontSize: '16px', maxFontSize: '50px' });
				}, 100)
			});

			$('.fittext').fitText(0.78, { minFontSize: '40px', maxFontSize: '100px' });
			$('.hugetext').fitText(0.5, { minFontSize: '100px', maxFontSize: '180px' });
			$('.fitticker').fitText(2, { minFontSize: '16px', maxFontSize: '50px' });

			// Superslides fullscreen slider
			$('#slides').superslides({
				animation: 'fade' // Choose between slide or fade
			});

			// Sudoslider services slider
			$("#services-slider").sudoSlider({
				customLink:'a.servicesLink',
				speed: 400,
				responsive: true,
				prevNext: true,
				prevHtml: '<a href="#" class="services-arrow-prev"><i class="fa fa-angle-left"></i></a>', 
				nextHtml: '<a href="#" class="services-arrow-next"><i class="fa fa-angle-right"></i></a>', 
				useCSS: true,
				continuous: true,
				updateBefore: true
			});
		},
		domReady: function(){},
		windowLoad: function(){
			$('#loader').fadeOut();
			
			$('a.popup').each(function(){
                var t = $(this),
                    img = $('<img />');
                 
                    img.attr('src', t.attr('href'));
            });
			
			// IE9 text-ticker animation
            if($('html').hasClass('no-cssanimations')){
            	var count = 0;
            	setInterval(function(){
            		var margin = $('.text-ticker ul').css('marginTop') == '-200px' ? 0 : '-=50px';

            		$('.text-ticker ul').animate({
            			marginTop: margin
            		}, 200);

            		if(count == 4){
            			count = 0;
            		}
            	}, 1000);
            }
		}
	};

	app.init();
	$(function(){
		app.domReady();

		$(window).load(app.windowLoad);
	});

	$(window).resize(function() {
	    delay(function(){
	        $('.same-height').css('height','auto'); //solve for all you browser stretchers out there!
	        setEqualHeight($('.same-height'));
	    }, 500);
	});

})(jQuery)