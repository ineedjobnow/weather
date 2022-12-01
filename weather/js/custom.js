$(function(){

    let myLat ='' , myLng = '', key = '';
    if(key == ''){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                myLat =position.coords.latitude;
                myLng = position.coords.longitude;
                getWeather(myLat, myLng, '')
            })
            
        }
    }

    $('#search').on('keypress',function(e){
        
      if(e.keyCode == 13){
       let key = $(this).val();
          $(this).val('');
          $('.searchbox').css({
            opacity:0,
            width:'0px'
          })
          $('.five-day').slick('unslick');    
          getWeather('','',key);
       }
    })

$('#search').on('blur keyup',function(){
    $(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,''))
})
    

    
   
    
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
            $('#search').focus();
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
        slidesToScroll: 3,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000
    })
}


function getWeather(lat, lon, city){
        let url = '//api.openweathermap.org/data/2.5/forecast?' ;
        let apikey = '1ee29b137155ca59f7024c3c28747f01';
        let wdata ;
        if(city == ''){
            wdata={
                lat: lat,
                lon: lon,
                appid: apikey,
                units:'metric',
                lang:'kr'
            }
        }else{
            wdata={
                q : city,
                appid: apikey,
                units:'metric',
                lang:'kr'
            }
        }
        $.ajax({
            url: url,
            dataType:'json',
            type:'GET',
            data:wdata,
            success: function(data, status, xhr){
                console.log(data);
                //도시명


                backgroundImg()


                let cityname = data.city.name;
                $('#city').text(cityname)


                let tempurl = data.list[0].main;
                //기온
                $('#temp').text(tempurl.temp.toFixed(1))
                // 최고온도
                $('#tempmax').text(tempurl.temp_max.toFixed(1))
                // 최저온도
                $('#tempmin').text(tempurl.temp_min.toFixed(1))
                // 체감온도
                $('#tempfeels').text(tempurl.feels_like.toFixed(1))
                //습도
                $('#humidity').text(tempurl.humidity.toFixed(1))
                //바람
                $('#wind').text(data.list[0].wind.speed)
                // 설명
                $('#descript').html(data.list[0].weather[0].description)

                let str = '', ftime, iconList, listTemp;
                let week =[ '일','월','화','수' ,'목','금', '토' ]
                for(let i = 0; i< data.list.length; i++){
                    //날짜
                    ftime = new Date(data.list[i].dt*1000);
                    ftime = ftime.getDate() + "일("+ week[ftime.getDay()]+")"+
                            ftime.getHours()+"시";
                            
                    str += '<div class="three-times">';
                    str +=  ' <div class="five-date">'+ftime+'</div>';
                    str += '<div class="five-times">00시 24분</div>';
                    str += '<div class="five-icon">';
                    str +=     '<img src="imgs/'+data.list[i].weather[0].icon+'.png" alt="'+data.list[i].weather[0].icon+'">';
                    str += '</div>';
                    str += '<p class="five-temp">'+data.list[i].main.temp+'</p>';
                    str += '<p class="five-descript">'+data.list[i].weather[0].description+'</p>';
                    str += '</div>';
                    
                }
                $('.five-day').html(str)

 daySlide();

                // 해뜨는  시각 ,해 지는시각
                // unix time to 현재시간 => new Date(unixtime*1000)
                backgroundImg();
                let sr = new Date(data.city.sunrise*1000)
                let ss = new Date(data.city.sunset*1000)
                sr = transTime(sr.getHours()) + ":" + sr.getMinutes();
                ss = transTime(ss.getHours()) + ":" + ss.getMinutes();
                $('#sunrise').text(sr);
                $('#sunset').text(ss);

            },
            error: function(xhr,status,error){
                console.log(error);
            }
        })
        console.log(wdata)
    }

function backgroundImg(icon){
    if(icon == '01d' || icon == '02d'||icon == '03d'|| icon == '04d'||
    icon == '05d'|| icon == '50d'){
        img = './imgs/main001d.jpg'
    }else if(icon == '01n' || icon == '02n'||icon == '03n'|| icon == '04n'||
    icon == '05n'|| icon == '50n'){
        img = './imgs/main001n.jpg'
    }
    else if(icon == '09d' || icon == '10d'){
        img = './imgs/main003.jpg'
    }
    else if(icon == '09n' || icon == '10n'){
        img = './imgs/main003.jpg'
    }
    else if(icon == '11n' || icon == '11d'){
        img = './imgs/main003.jpg'
    }
    else if(icon == '13n'){
        img = './imgs/main002n.jpg'
    }else if(icon == '13d'){
        img = './imgs/main002d.jpg'
    }
    $('.wrapper').css({
        'background-image':'url(imgs/main001d.jpg)'
        
    })
}

function transTime(t){
    t = Number(t);
    if( t < 12){
        t = "AM" + t;
    }else if(t > 12 && t < 24){
        t = "PM"+ t;
    }else{
        t = "AM 00"
    }
    return t;
}