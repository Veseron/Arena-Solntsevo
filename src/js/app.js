import $ from 'jquery'
import 'slick-carousel'

$(function() {
    $('.js-news-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: $('.js-news-arrow-next'),
        prevArrow: $('.js-news-arrow-prev'),
        infinite: false,
        
        responsive: [
            {
                breakpoint: 991,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                }
            }
        ]
    });

    $('.js-menu-trigger').on('click', function(e) {
        e.preventDefault()
        if ($('.js-menu').hasClass('active')) {
            $('.js-menu').removeClass('active')
            $('body').removeClass('fixed')
        } else {
            $('.js-menu').addClass('active')
            $('body').addClass('fixed')
        }
    });

    $('body').not('.js-menu-trigger').on('click', function(e) {
        let trigger = $('.js-menu-trigger')
        let menu = $('.js-menu')
        if ((!menu.is(e.target) && menu.has(e.target).length === 0) && (!trigger.is(e.target) && trigger.has(e.target).length === 0)) {
            $('.js-menu').removeClass('active')
            $('body').removeClass('fixed')
        }
    })

    $('.js-menu-close').on('click', function(e) {
        e.preventDefault()
        $('.js-menu').removeClass('active')
        $('body').removeClass('fixed')
    })

    $('.js-to-top').on('click', function(e) {
        e.preventDefault()
        $('html, body').animate({ scrollTop: 0 }, 1000);
    })
})