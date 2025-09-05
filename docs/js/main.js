
var showRezultSearch;
var showSuccessPopup;
var contactsDescrSlider;
/*Событие клика по крестику должно привязываться через функцию или через документ*/
var closeModal;

$(window).load(function() {
  $('#preloader').find('i').fadeOut().end().delay(400).fadeOut('slow');
});

$(document).ready(function($) {

  // опции промотра на странице аренды авто
  var attrLightBox = $('a').attr('lightbox');
  if ( typeof attrLightBox !== typeof undefined && attrLightBox !== false ) {  
    lightbox.option({
      'showImageNumberLabel': false,
    })
  }

  if ( $('.wow').length ) {
    new WOW().init();
  }
  e();
  var domSpctrImgSlider,
      screenWidth,
      domServicesSpectrBtn = $('.js-services-spectransport-slider').find('.services__spectr-btn');
      

  $(window).resize(function(event) {
    e();
    initSwiper();  
    initLightSwiper();
    initThreeSwiper(); 
    initTwoSwiper(); 
    screenWidth = $(window).width();
  });

  function e(){
    $(".js-documents-carousel").next('.documents__block-btn-left').trigger('click');
    $('.promo-item-plug').css({height: $('.promo-grid').find('.swiper-slide:last').prev().height() });
  }

    // слайдер документов на странице ABOUT
    if ( $(".js-documents-carousel").length ) {  
      var carousel = $(".js-documents-carousel").featureCarousel({
        smallFeatureHeight:   500,
        largeFeatureWidth :   0,
        largeFeatureHeight:   0,
        autoPlay:             false,
        smallFeatureWidth:    .8,
        smallFeatureHeight:   .8,
        topPadding:           0,
        sidePadding:          0,
        smallFeatureOffset:   50,
        leftButtonTag:        '.documents__block-btn-left',
        // selector for the right arrow of the carousel
        rightButtonTag:       '.documents__block-btn-right',
      });
    } 

    var eqFourSlider = new Swiper('.js-four-slider', {
      slidesPerView: 4,
      spaceBetween: 30,
      autoplay: {
        delay: 50000,
      },
      clickable: true,
      watchOverflow: true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true, 
      },
      navigation: {
        nextEl: '.swiper-news-button-next',
        prevEl: '.swiper-news-button-prev',
      },     
      breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,

      },  
      850: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      550: {
        slidesPerView: 1,
        spaceBetween: 30,
      } }
    });

//стр CAR слайдер превью

  $('.slider').each(function(index) { 
    var slider = $(this),
        sliderItem,
        options;
        slider.addClass('sl-' + index ); 
        slider.next('.swiper-button-middle').find('.swiper-news-button-next').addClass('slb-' + index);
        slider.next('.swiper-button-middle').find('.swiper-news-button-prev').addClass('slb-' + index);
        options = 
          {
            watchOverflow: true,
            slidesPerView: 4,
            spaceBetween: 20,

            loop: true,           
            pagination: {
                el: '.swiper-pagination',
                          clickable: true, 
            },
            navigation: {
              nextEl: '.swiper-news-button-next.slb-' + index,
              prevEl: '.swiper-news-button-prev.slb-' + index,
            },       
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
            }
          }

        sliderItem = new Swiper('.sl-' + index , options); 
  });

  var eqLightKSlider = undefined;
  initLightSwiper();

  function initLightSwiper() {
    var screenWidth = $(window).width();
    if (screenWidth < 1200 && eqLightKSlider == undefined && $('.js-equipments-light-k-slider').length) {
     eqLightKSlider = new Swiper('.js-equipments-light-k-slider', {
        slidesPerView: 1,
        spaceBetween: 15,
        watchOverflow: true,
        autoplay: {
          delay: 50000,
        },
        slidesPerColumn: 3,
        slidesPerColumnFill: 'row',
        watchOverflow: true,
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerColumnFill: 'column',
            slidesPerColumn: 1,          
          },

          850: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerColumn: 3                
          },
          560: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerColumn: 3            
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerColumn: 3           
          }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, 
        },
        navigation: {
          nextEl: '.swiper-news-button-next',
          prevEl: '.swiper-news-button-prev',
        } 
      });
    } else if (screenWidth > 1200 && eqLightKSlider != undefined) {
      eqLightKSlider.destroy();
      eqLightKSlider = undefined;
      $('.js-equipments-light-k-slider').find('.swiper-wrapper').removeAttr('style');
      $('.js-equipments-light-k-slider').find('.swiper-slide').removeAttr('style');
    }
  }


  // стр conatacts слайдер карточек на карте
  contactsDescrSlider = new Swiper('.js-conatacts-map-descr-slider', {
    init: false,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: false,
    setWrapperSize: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true, 
        },
        navigation: {
          nextEl: '.swiper-news-button-next',
          prevEl: '.swiper-news-button-prev',
        },    
    });

  // стр FULL SOLUTIONS слайдер карточек
  var fullSolutionsSlider = new Swiper('.js-full-solutions-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    setWrapperSize: true,
    watchOverflow: true,
    slidesPerColumn: 3,
    slidesPerColumnFill: 'row',
      autoplay: {
        delay: 50000,
      },
    pagination: {
            el: '.swiper-pagination',
            clickable: true, 
    },
    navigation: {
      nextEl: '.swiper-news-button-next',
      prevEl: '.swiper-news-button-prev',
    },     
      breakpoints: {
        850: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerColumn: 2        
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesPerColumn: 2       
        }        
      }
  });


  // стр conatacts слайдер карточек
  var contactsSlider = new Swiper('.js-conatacts-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    setWrapperSize: true,
    watchOverflow: true,
    autoplay: {
      delay: 50000,
    },

      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
          },
          navigation: {
            nextEl: '.swiper-news-button-next',
            prevEl: '.swiper-news-button-prev',
          },     
        }
      }
  });


  // стр equipments слайдер карточек
  var equipmentsSlider = new Swiper('.js-equipments-slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    setWrapperSize: true,
    watchOverflow: true,
    slidesPerColumn: 4,
    slidesPerColumnFill: 'row',
      autoplay: {
        delay: 50000,
      },
      pagination: {
            el: '.swiper-pagination',
            clickable: true, 
      },
      navigation: {
        nextEl: '.swiper-news-button-next',
        prevEl: '.swiper-news-button-prev',
      },     
      scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
      },
      breakpoints: {
        900: {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerColumn: 3                
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesPerColumn: 3            
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesPerColumn: 3           
        }
      }
  });

  // стр PROJECTS слайдер проектов 


  $('.js-projects-slider').each(function () {
      var _self = $(this);
        setProjectSlide = {           
          slidesPerView: 4,
            spaceBetween: 30,
            watchOverflow: true,
            pagination: {
            el: '.swiper-pagination',
            clickable: true, 
            },
            navigation: {
              nextEl: '.swiper-news-button-next',
              prevEl: '.swiper-news-button-prev',
            },     
            autoplay: {
              delay: 50000,
            },

            breakpoints: {
              1100: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              800: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              525: {
                slidesPerView: 1,
                spaceBetween: 10,
              }
            }
          }
      var projectsSlider = new Swiper( _self , setProjectSlide);
  });

  // стр SERVICES слайдер картинок 
  var partnerSlider = new Swiper('.js-spectransport-gallery', {
    slidesPerView: 4,
    spaceBetween: 20,
    setWrapperSize: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.swiper-news-button-next',
      prevEl: '.swiper-news-button-prev',
    },   
    autoplay: {
      delay: 50000,
    },

    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }
  });


  // стр SERVICES слайдер спецтранспорт  
  var partnerSlider = new Swiper('.js-services-spectransport-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    setWrapperSize: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.swiper-spctr-button-next',
      prevEl: '.swiper-spctr-button-prev',
    },   
    autoplay: {
      delay: 50000,
    }
  });

  // ресайз изображений в окне с задаными размерами
  if ( $('.js-img-cover').length ) {
    $('.js-img-cover').liCover({
        parent: $('.wrap-img'),
        position:'absolute' 
    });
  }
  // стр ABOUT слайдер партнеров  
  var partnerSlider = new Swiper('.js-partner-slider', {
    slidesPerView: 5,
    spaceBetween: 30,
    setWrapperSize: true,
    watchOverflow: true,
    autoplay: {
      delay: 50000,
    },
    pagination: {
            el: '.swiper-pagination',
            clickable: true, 
    }, 
    breakpoints: {
      900: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-news-button-next',
          prevEl: '.swiper-news-button-prev',
        }, 
      
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }
  });


  //прилипание дат ABOUT
    if ( $('.event__project .sticky').length ) {
      $('.event__project .sticky').stick_in_parent();
    }

  //смещение контента на ГЛАВНОЙ
    var domContainer = $('.container'),
        leftPosContainer,
        rightPosContainer,
        containerOffset; 
        setPositionBlock();
    $(window).on('resize', function () { 
  
      setPositionBlock()
    });

    function setPositionBlock(){
      leftPosContainer = domContainer.offset().left; 
      rightPosContainer = domContainer.offset().right; 
      widthContainerOffset = $('.js-container-offset').width();
      widthContainer = domContainer.width();
      widthContainerOffset = widthContainer - leftPosContainer;

/*      console.log(rightPosContainer , leftPosContainer)*/

      $('.js-left-offset').css({'margin-left': leftPosContainer}); 
      $('.js-right-offset').css({'margin-right': leftPosContainer}); 
     
/*      $('.js-container-offset').css({
        'max-width': widthContainerOffset
      });*/
      $('.js-container-offset-left').css({
        'padding-right': leftPosContainer / 2
      });
      $('.js-container-offset-right').css({
        'padding-left': leftPosContainer / 2 + 15
      });

    }


// отзывы на главной
    var adviseSwiper = new Swiper('.js-advise-slider', {
      slidesPerView: 3,
      spaceBetween: 30,
      watchOverflow: true,
      autoplay: {
        delay: 50000,
      },
      pagination: {
            el: '.swiper-pagination',
            clickable: true, 
      },
      navigation: {
        nextEl: '.swiper-news-button-next',
        prevEl: '.swiper-news-button-prev',
      },     
      breakpoints: {
        
      961: {
        slidesPerView: 1,
        spaceBetween: 30,

      },
      360: {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        slidesOffsetBefore: 0,
      },      
      }
    }); 

  // портфолио в блоке промо на главной
  var eqLightSlider = undefined;
  initSwiper();
  

  setTimeout(function() {

  var domPromoPlug = $('.promo-grid').find('.promo-item-plug'),
      heightSwSlide = $('.promo-grid').find('.swiper-slide:last').prev().height();
      domPromoPlug.css({height: heightSwSlide }); 
   }, 1200)

  function initSwiper() {
    var screenWidth = $(window).width();
    $('.promo-grid').find('.promo-item-plug').css({height: $('.promo-grid').find('.swiper-slide:last').prev().height() });
    
    if (screenWidth < 500 && eqLightSlider == undefined && $('.js-promo-home-slider').length) { 
      eqLightSlider = new Swiper('.js-promo-home-slider', {
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
        autoplay: {
        delay: 50000,
        },
        scrollbar: {
            el: '.swiper-pagination',
            clickable: true, 
            hide: false,
        },
        navigation: {
          nextEl: '.swiper-news-button-next',
          prevEl: '.swiper-news-button-prev',
        } 
      });
    } else if (screenWidth > 500 && eqLightSlider != undefined) {
      eqLightSlider.destroy();
      eqLightSlider = undefined;
      $('.js-promo-home-slider').find('.swiper-wrapper').removeAttr('style');
      $('.js-promo-home-slider').find('.swiper-slide').removeAttr('style');
     
    }
  }

  var eqThreeSlider = undefined;
  initThreeSwiper();

  function initThreeSwiper() {
    var screenWidth = $(window).width();
    if (screenWidth < 850 && eqThreeSlider == undefined && $('.js-three-slider').length) {
      eqThreeSlider = new Swiper('.js-three-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        watchOverflow: true,
        autoplay: {
        delay: 50000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, 
        },
        navigation: {
          nextEl: '.swiper-news-button-next',
          prevEl: '.swiper-news-button-prev',
        } 
      });
    } else if (screenWidth > 850 && eqThreeSlider != undefined) {
      eqThreeSlider.destroy();
      eqThreeSlider = undefined;
      $('.js-three-slider').find('.swiper-wrapper').removeAttr('style');
      $('.js-three-slider').find('.swiper-slide').removeAttr('style');
    }
  }

  var eqTwoSlider = undefined;
  initTwoSwiper();

  function initTwoSwiper() {
    var screenWidth = $(window).width();
    if (screenWidth < 800 && eqTwoSlider == undefined && $('.js-two-slider').length) {
      eqTwoSlider = new Swiper('.js-two-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        watchOverflow: true,
        autoplay: {
          delay: 50000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, 
        },
        navigation: {
          nextEl: '.swiper-news-button-next',
          prevEl: '.swiper-news-button-prev',
        } 
      });
    } else if (screenWidth > 800 && eqTwoSlider != undefined) {
      eqTwoSlider.destroy();
      eqTwoSlider = undefined;
      $('.js-two-slider').find('.swiper-wrapper').removeAttr('style');
      $('.js-two-slider').find('.swiper-slide').removeAttr('style');
    }
  }
//---------   VALIDATOR   -------------


    $(".js-mask").mask("+7 (999) 999-9999");
    var formValidateSet = {
      rules: {
        nic: {
          required: true,
          minlength: 4,
          maxlength: 120,
        },
        phone: {
          required: true,
          minlength: 9,
          maxlength: 17,
        },
        textarea: {
          required: true,
          minlength: 3,
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        nic: {
          required: "Ваше имя",
          minlength: "Логин должен быть минимум 3 символа",
          maxlength: "Максимальное число символо - 120",
        },
        phone: {
          required: "Ваш телефон",
          minlength: "Телефон должен быть минимум 9 символа",
          maxlength: "Телефон должен быть максимум 17 символов",
        },
        textarea: "Опишите Вашу задачу",
        email: {
          required: "Ваш e-mail",
          email: "Email введён не правильно",
        }
      },
      errorElement: "i"
    }

    if ( $(".js-form-validate").length ) {

      var formCallBack = $(".js-form-validate").validate(formValidateSet);
      
     $('.js-form-validate .form-control ').on('keyup blur click', function() {
      $('.js-form-send').prop('disabled', false);

        if( !$(this).val() ) { 
           $('.js-form-send').prop('disabled', 'disabled');    
        }  
        setTimeout(resetFormValid, 2000);

      });
    }
    function resetFormValid(){
      $("i.error").remove();
      $(".error").removeClass("error");
      formCallBack.resetForm();
    }

//------  поиск  -----

  $('.js-search-input').click(function(event) {
    event.preventDefault();
    $('.overlay').fadeIn(400, function() {
      $('.js-show-search').css('display', 'block').animate({
        opacity: 1,
        top: '0'
      }, 200);
    });
    $('body').addClass('no-scroll');
  });

  showRezultSearch = function(){
    $('.tag_rezult').fadeOut('300', function() {
      $('.content_rezult').fadeIn(300);
    });
    $('.js-content-rezult').find('.swiper-wrapper').css({opacity: 0});
      setTimeout(function() {
             
        var projectsSlider = new Swiper('.js-content-rezult' , {
          slidesPerView: 4,
          spaceBetween: 30,
          watchOverflow: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true, 
          },
          navigation: {
            nextEl: '.swiper-news-button-next',
            prevEl: '.swiper-news-button-prev',
          },     
          autoplay: {
            delay: 50000,
          },

          breakpoints: {
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            750: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            482: {
              slidesPerView: 1,
              spaceBetween: 10,
            }            
          }
        });

        $('.js-content-rezult').find('.swiper-wrapper').css({opacity: 1});   
      }, 700)
  }

//------  теги  ------
 var m = [];
$('.tag__rezult-item').click(function(event) {
  var item = $(this);
  t = item.context.lastChild.textContent;
  m.push(' ' + t);

  $('.js-btn-form-search-rezult').val(m);

});

$('.input-search-rezult-wrap').click(function(event) {
   console.log(event.target.tagName )
  if (event.target.tagName == 'DIV') {
    showRezultSearch();
  }
});

//------  отправка резюме  -----

  $('.js-callback-job-modal').click(function(event) {
    event.preventDefault();
    $('.overlay').fadeIn(400, function() {
      $('.js-show-job').css('display', 'block').animate({
        opacity: 1,
        top: '0'
      }, 200);
    });
    $('body').addClass('no-scroll');
  });


//------  аренда авто  -----

  $('.js-callback-arenda-modal').click(function(event) {
    event.preventDefault();
    $('.overlay').fadeIn(400, function() {
      $('.js-show-arenda').css('display', 'block').animate({
        opacity: 1,
        top: '0'
      }, 200);
    });
    $('body').addClass('no-scroll');
  });

//------  обратный звонок  -----

  $('.js-callback-modal').click(function(event) {
    event.preventDefault();
    $('.overlay').fadeIn(400, function() {
      $('.js-show-callback').css('display', 'block').animate({
        opacity: 1,
        top: '0'
      }, 200);
    });
    $('body').addClass('no-scroll');
  });

//----------   MENU   --------------
    $('.js-btn-open-menu').click( function(event){
        event.preventDefault();

        if ($('.js-btn-open-menu').hasClass('open')) {

           $('.js-show-modal-menu ').animate({opacity: 0, top: '0'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                    $('.js-btn-open-menu').removeClass('open'); 
                    $('.js-vision-open-menu').fadeOut(0).css('opacity', '0');
                    $('body').removeClass('open-menu'); 

                }
            );
        }else{

          $('.overlay').fadeIn(400,
              function(){ 
                  $('.js-show-modal-menu ') 
                      .css('display', 'block')
                      .animate({opacity: 1, top: '0'}, 200);
                  $('.js-vision-open-menu').fadeIn(0).css('opacity', '1');
                  $('.js-btn-open-menu').addClass('open');

          });
              $('body').addClass('open-menu'); 
        }

    });

//---------- CLOSE MODAL -----------------
    closeModal = function(){
      $('.js-btn-close-modal, .overlay').trigger('click');
    }

    // закрытие модального окна
    $('.js-btn-close-modal, .overlay').click( function(){
      
        $('.content_rezult').fadeOut('300', function() {
          $('.tag_rezult').fadeIn(300);
        });

        $('.js-show-callback , .js-show-modal-menu, .js-show-search , .js-show-arenda, .js-show-job')
            .animate({opacity: 0, top: '0'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('.overlay').fadeOut(400);
                    $('.js-btn-open-menu').removeClass('open');
                    $('body').removeClass('no-scroll'); 
                }
            );

            $('.js-vision-open-menu').fadeOut(0).css('opacity', '0');         
    });  


  showSuccessPopup = function show_success_popup() {
    //сначало закроем все мод окна
    $('.js-btn-close-modal').trigger('click');

    // скажем что успешно
     $('.overlay-success').fadeIn(200, function() {
      $('.js-show-modal-success').css('display', 'block').animate({
        opacity: 1
      }, 200);
    });        
  

    //запустим валидацию форм снова
    $(".js-mask").mask("+7 (999) 999-9999");
    if ((".js-form-validate").length) {
      $(".js-form-validate").validate(formValidateSet);
    }

    // Установка disabled кнопки отправить
    $('.js-form-validate .form-control ').on('keyup blur click', function() {
      $('.js-form-send').prop('disabled', false);
      if( !$(this).val() ) {                      
         $('.js-form-send').prop('disabled', 'disabled');    
      }  

      setTimeout(resetFormValid, 2000);
    });

    // закроем окно успешно
    function closeSuccessWindow(){
      $('.js-show-modal-success').css({
        display: 'none',
        opacity: '0'
      });;
      $('.overlay-success').fadeOut(400);  
    }
    $('.close-success').click(closeSuccessWindow);    
    setTimeout(closeSuccessWindow, 6000)

  }

//---------- Фиксируем МЕНЮ ---------------------

  $(window).scroll(function() {
      if ($(this).scrollTop() > 110){  
          $('.header').addClass("sticky");
      }
      else{
          $('.header').removeClass("sticky");
      }
  });



//------  страница ABOUT просмотр документа  -----
  $('.js-fhoto-modal').click(function() {
    var c = $('.fhoto-content');
    var cItem = c.find('.fhoto-content-item');
    var modalBox = $('<div class="box-modal" />');
    modalBox.html( c.html() );
    modalBox.prepend('<div class="box-modal_close arcticmodal-close icon-close-modal"></div>');
    $.arcticmodal({
      content: modalBox,
      afterClose: function(data, el) {
          $('body').css({
            'overflow-y': 'auto',
            'margin-left': 'auto'
          });
      }
    });
  });



//-----------------

  function footerToBottom() {
      var browserHeight = $(window).height(),
          footerOuterHeight = $('.js-footer').outerHeight(true),
          hh = $('header').outerHeight(true),
          mainHeightMarginPaddingBorder = $('main').outerHeight(true) - $('main').height();
      $('main').css({
          'min-height': browserHeight - footerOuterHeight - mainHeightMarginPaddingBorder - hh,
      });

  };

  footerToBottom();
  $(window).resize(function() {
      footerToBottom();
  });

//-------------------
  if ($( ".projects__calc" ).length) {

    var handle_hour = $( ".js-custom-handle-hour" ),
        handle_day = $( ".js-custom-handle-day" ),
        checboxSum,
        $adds = $( ".custom-control-input" );

    function addSpaces(nStr) {
        nStr += "";
        var x = nStr.split(".");
        var x1 = x[0];
        var x2 = x.length > 1 ? "." + x[1] : "";
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, "$1" + " " + "$2");
        }
        return x1 + x2;
    };

    $( ".js-slider-hour" ).slider({
      range: "min",
      value: 12,
      min: 1,
      max: 48,
      create: function() {
        handle_hour.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle_hour.text( ui.value );
        calculate(0);
      }
    });

    $( ".js-slider-day" ).slider({
      range: "min",
      value: 42,
      min: 1,
      max: 60,
      create: function() {
        handle_day.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle_day.text( ui.value );
        calculate(0);
      }
    });

    function calculate(adds) {
      console.log(adds)
      var summa = parseInt($(".js-slider-hour").text().replace(/\s+/g, "") * 200) + 
                  parseInt($(".js-slider-day").text().replace(/\s+/g, "") * 150) + adds;

      jQuery(".calc-rezult-item").text( addSpaces(summa) );

    }

    $adds.change(function () {
      var sum = 0;
      $adds.each(function () {
        if(this.checked) sum += parseInt(this.value);
      });
      calculate(sum);
    });
  }
});