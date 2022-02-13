import $ from 'jquery'
import ymaps from 'ymaps'
import 'slick-carousel'

$(function() {
    $('.js-news-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: $('.js-news-arrow-next'),
        prevArrow: $('.js-news-arrow-prev'),
        infinite: false,
        centerMode: false,
        
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

    $('.js-services-slider').each(function() {
        $(this).find('.js-services-slider-list').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: $(this).find('.js-services-arrow-next'),
            prevArrow: $(this).find('.js-services-arrow-prev'),
            infinite: false,
            lazyLoad: true,
        })
    })

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

    $('.js-tabs').each(function() {
        let self = this
        $(this).find('.js-tabs-nav').on('click', function(e) {
            e.preventDefault()
            $(self).find('.js-tabs-nav').removeClass('active')
            $(this).addClass('active')

            $(self).find('.js-tabs-content').removeClass('active')
            $(self).find(`.js-tabs-content[data-item="${$(this).attr('data-target')}"]`).addClass('active')

            $('.js-contacts-slider').each(function() {
                $(this).find('.js-contacts-slider-list').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: $(this).find('.js-contacts-arrow-next'),
                    prevArrow: $(this).find('.js-contacts-arrow-prev'),
                    infinite: false,
                    lazyLoad: true,
                })
            })
        })
    })

    $('.js-maps').each(async function() {
        try {
            const maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?load=package.full&apikey=38a5b311-25a9-4c36-955e-bca7691fd2fb&lang=ru_RU')
            const map = await new maps.Map(this, {
                center: [55.641964, 37.402288],
                zoom: 12,
                controls: []
            })
            const placemark = await new maps.Placemark([55.641964, 37.402288],
                {
                    iconCaption: 'Ледовая арена Солнцево'
                },
            )
            map.geoObjects.add(placemark)
        } catch(error) {
            console.log(error)
        }
    })
})