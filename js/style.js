$(function () {

	var $window = $(window),
		oHeight = $window.height(),
		oWidth = $window.width(),
		cWidth = oHeight * (750 / 1206),
		$starClass = $('.star'),
		$startId = $('.container'),
		$container = $('.container');
		$container.css('width', cWidth);
		$container.css('height', oHeight);
	$window.resize(function(){
		var oHeight = $window.height();
			cWidth = oHeight * (750 / 1206);
		$container.css('width',cWidth);
		$container.css('height',oHeight);
	});

	var value2 = 0;

	$('body').on('touchstart', function(e){
	    startX = e.originalEvent.changedTouches[0].pageX;
	});
	$('body').rotate({
	    bind: {
	      mousewheel: function(){
	            if(event.wheelDelta > 0){
	            	value2 -=240;
	              	$starClass.rotate({
	                  	animateTo: value2
	            	});
	              
	              addAnimate(value2);
	            } 
	            else {
	              	value2 +=240;
	              	$starClass.rotate({
	              	    animateTo: value2
	              	});
	              
	              	addAnimate(value2);
	            }
	        }
	    }
	});
	$startId.rotate({
	    bind: {
	        touchend: function(e){
	            e.preventDefault();
	            var moveEndX = e.originalEvent.changedTouches[0].pageX,
	            	X = moveEndX - startX;
	            console.log(X);
	            if(X > 0) {
	              	value2 += 240;
	            } 
	            else {
	              	value2 -= 240;
	            }
	            
	            $starClass.rotate({
	                animateTo: value2
	            });
	            addAnimate(value2);
	            e.stopPropagation();
	        }    
	    }
	});


	function addAnimate(value) {
  		var i = value / 240,
  			$java = $('.java'),
  			$frontend = $('.FrontEnd'),
  			$android = $('.android'),
  			$cpp = $('.c'),
  			$ios = $('.ios'),
  			$php = $('.php');
		  console.log(i);
		  if(i<-5 || i>5) {
		  	i = i%6;
		  }
		  switch(i) {
			  	case 0: $frontend.css('display','block').addClass('animate')
				    		 .siblings('div').removeClass('animate')
				    		 .css('display','none');
				    	break;
					case 1: $android.css('display','block').addClass('animate')
			    				 .siblings('div').removeClass('animate')
			    				 .css('display','none');
			    		break;
			    case 2: $cpp.css('display','block').addClass('animate')
		    				    .siblings('div').removeClass('animate')
		    				    .css('display','none');
		    			break;
		    	case 3: $ios.css('display','block').addClass('animate')
		    			 	.siblings('div').removeClass('animate')
		    			 	.css('display','none');
		    			break;
		    	case 4: $php.css('display','block').addClass('animate')
		    				 .siblings('div').removeClass('animate')
		    				 .css('display','none');
		    			break;
		    	case 5: $java.css('display','block').addClass('animate')
		    				.siblings('div').removeClass('animate')
		    				.css('display','none');
		    			break;
		    	case -5: $android.css('display','block').addClass('animate')
		    					  .siblings('div').removeClass('animate')
		    					  .css('display','none');
		    			break;
		    	case -4: $cpp.css('display','block').addClass('animate')
		    					 .siblings('div').removeClass('animate')
		    				   .css('display','none');
		    			 break;
		    	case -3: $ios.css('display','block').addClass('animate')
		    				 .siblings('div').removeClass('animate')
		    				 .css('display','none');
		    			 break;
		    	case -2: $php.css('display','block').addClass('animate')
		    				 .siblings('div').removeClass('animate')
		    				 .css('display','none');
		    			 break;
		    	case -1: $java.css('display','block').addClass('animate')
		    				  .siblings('div').removeClass('animate')
		    				  .css('display','none');
		  }
	}
	
});		