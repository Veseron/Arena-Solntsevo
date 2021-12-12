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
    })
})