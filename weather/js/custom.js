$(function(){
    $(window).on('load', function(){
        $('.wrapper').css({
            'background-image':'url(imgs/main001d.jpg)'
            
        })
    })
    daySlide();
    
//    $('.seach').click(function(){
//        $('.searchbox').css("display","block");
//    })
    $('.btn').click(function(e){
        e.preventDefault;
        let w = $('.searchbox').css('width')
        if(w != '350px'){
            $('.searchbox').css({
                opacity:1,
                width: '350px'
            })
        }else{
            $('.searchbox').css({
                opacity:0,
                width: '40px'
            })
        }
    })

})

function daySlide(){
    $('.five-day').slick({
        slidesToShow: 3,
        centerMode:true,
        centerPadding:'20px',
        slidesToScroll: 2,
        arrows: false,
        dots: false,
        //autoplay: true,
        autoplaySpeed: 2000
    })
}