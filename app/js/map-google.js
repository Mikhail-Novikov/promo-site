jQuery(document).ready(function($) {

  	var cartAdress = $('#map'),
  		markerIcon = $('#map').data('marker');
 		
	setTimeout(function() {

		cartAdress.css({
			opacity: '1'
		});
	 }, 3600)

	var map;
	initMap();
	function initMap(){
	     	
        var uluru_center = {lat: cartAdress.data('lat-center') , lng: cartAdress.data('lng-center')};

        var setMap = {
          zoom: 15,
          center: uluru_center,
          zoomControl: false,
          scaleControl: false,
          mapTypeControl: false,
          fullscreenControl: false,        	
        }
        map = new google.maps.Map(document.getElementById('map'), setMap);
        var marker = new google.maps.Marker({
          position: uluru_center,
          map: map,
          icon: markerIcon,
          disableDefaultUI: true
        });


		contactsDescrSlider.init();
		contactsDescrSlider.on('init slideChange', function () {
  			var cartAdressItem = $('.js-conatacts-map-descr-slider').find('.swiper-slide');
        	var uluru_item = {lat: cartAdressItem.eq(contactsDescrSlider.activeIndex).data('lat') , lng: cartAdressItem.eq(contactsDescrSlider.activeIndex).data('lng')};	

			var latLng = new google.maps.LatLng(uluru_item);
			map.panTo(latLng);

	        marker = new google.maps.Marker({
	          position: uluru_item,
	          map: map,
	          icon: markerIcon,
	          disableDefaultUI: true
	        });
			
        	console.log(map, marker.position);	
		});        
   
         var styledMapType = new google.maps.StyledMapType( 
			[
			    {
			        "featureType": "all",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "saturation": 36
			            },
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 40
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 17
			            },
			            {
			                "weight": 1.2
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 21
			            }
			        ]
			    },
			    {
			        "featureType": "road",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#00ebff"
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 29
			            },
			            {
			                "weight": 0.2
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 18
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 19
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    }
			],
            {name: 'Styled Map'});

        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

    }


});  