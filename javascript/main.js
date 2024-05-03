 /*
* ----------------------------------------------------------------------------------------
Author        : Rama Hardian Sidik
Template Name : Joreact - personal onepage bootstrap portfolio for designer 
Version       : 1.1
* ----------------------------------------------------------------------------------------
*/
"use strict";
var doc = document.documentElement;
var w = $(window);
var list = $('.list-navigation li');
var listmidscreen = $('.navigation-midscreen li');
var navigation = $('.list-navigation li, .navigation-midscreen li');
var content = $('.left-side_wrap');
var portfolioFilter = $('.filter li'); 
var vSection = $('.section-wrap');
var preload = $('.inner-load');
/* filter portfolio */
var $grid = $('.masonry').isotope({
    itemSelector: '.masonry-item',
    layoutMode: 'masonry',
    filter: '*',
    animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
    }
});
w.on('load', function () {
   var hashTag = window.location.hash; 
   if(hashTag){
   vSection.removeClass('showin');
   list.removeClass('active');
   listmidscreen.removeClass('active');
   $(hashTag).addClass('showin').addClass('moving');
   $(".list-navigation li a[href$='"+hashTag+"']").parent().addClass("active");
   $(".navigation-midscreen li a[href$='"+hashTag+"']").parent().addClass("active");
   }
   if(hashTag != "#section-wrap-heromain"){
       $('#particles-js').fadeOut();
    }else {
        $('#particles-js').fadeIn();
    }
   setTimeout(function () {
       $grid.isotope('layout');
       if(!hashTag) {
        $('#particles-js').fadeIn();
       }
   }, 500);
   preload.fadeOut(600);
});
// documennt ready
$(document).ready(function () {
/* section navigator */
navigation.on('click', function () {
   var element = $(this);
   var myHref = element.find('a').attr('href');
   setTimeout(function () {
       $grid.isotope('layout');
   }, 500);
   if (!element.hasClass('active')) {
       list.removeClass('active');
       listmidscreen.removeClass('active');
       $(".list-navigation li a[href$='" + myHref + "']").parent().addClass("active");
       $(".navigation-midscreen li a[href$='" + myHref + "']").parent().addClass("active");
       vSection.removeClass('showin');
       $(myHref).addClass('showin').addClass('moving');
   }
   if(myHref != "#section-wrap-heromain"){
      $('#particles-js').fadeOut();
   }else{
      $('#particles-js').fadeIn();
   }
    });
    // owl caraousel
    $('#partner').owlCarousel({
       loop: true,
       items: 4,
       lazyLoad: false,
       margin: 50,
       autoplay: true,
       autoplayTimeout: 7000,
       rtl: false,
       dots: true,
       nav: false,
       navSpeed: true,
       responsive: {
           0: {
               items: 1
           },
           480: {
               items: 2
           },
           768: {
               items: 3
           },
           1040: {
               items: 3
           },
           1200: {
               items: 3
           },
           1600: {
               items: 4
           },
           1920: {
               items: 4
           }
       }
   });
   // typed text  effect 
   new Typed('#typed-text', {
       strings: ["Sem", "Vika", "Yan"],
       typeSpeed: 50,
       backSpeed: 50,
       backDelay: 4000,
       startDelay: 1000,
       loop: true,
       showCursor: true
   });
    // filter items on button click
    $(portfolioFilter).on('click', function () {
        var filterValue = $(this).attr('data-filter');
        $('.masonry').isotope({
            filter: filterValue
        });
    });
    //Add/remove class on filter list
    $(portfolioFilter).on('click', function () {
        $(this).addClass('aktip').siblings().removeClass('aktip');
    });
    // magnific image init ----------------------
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    if ($('.image-popup').length > 0) {
        $('.image-popup').magnificPopup({
            type: 'image',
            fixedContentPos: true,
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade'  
        });
    }
    //Video Popup init
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
    });
    //Video Popup init
    if ($('.video-popup').length > 0) {
        $('.video-popup').magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    };
    $('#form-contact').submit(function (e) {
       e.preventDefault();
   }).validate({
       rules: {
           email: {
               required: true,
               email: true
           },
           name: {
               required: true,
               minlength: 5
           },
           message: {
               required: true
           }
       },
       messages: {
           email: {
               required: 'Check your email input '
           },
           name: {
               required: 'Please check your first name input'
           },
           message: {
               required: 'Please write something for us'
           }
       },
       submitHandler: function (form) {
           $.ajax({
               type: "POST",
               url: "https://mailpostexample.herokuapp.com/",
               data: $(form).serialize(),
               beforeSend: function () {
                   $('#postbutton').html('SENDDING...');
                   $('.flashinfo').hide();
                   $('input, textarea').attr('readonly', "readonly");
               },
               success: function (msg) {
                   if (msg == 'your message send') {
                       $('#form-contact').trigger("reset");
                       $('#postbutton').html('SEND NOW');
                       $('.flashinfo').slideDown(500).delay(2000).slideUp(500);
                       $('input, textarea').removeAttr('readonly'); 
                       $('.flashinfo').html('<span class="material-icons">info</span>Your message has been sent, I will reply to you shortly');
                   } else {
                       $('input, textarea').removeAttr('readonly');
                       $('#form-contact').trigger("reset"); 
                       $('.flashinfo').slideDown(500).delay(2000).slideUp(500);
                       $('.flashinfo').html('<span class="material-icons">info</span>something unknown error');
                   }
               }
           });
           return false;
       }
   });
});