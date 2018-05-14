$(document).ready(function($) {

	$.getJSON("https://api.myjson.com/bins/jl20u", function(data) {
			$.each(data, function(i) {
				if (i == "messages") {
				$.each(this, function (key, value) {
					$('.messages').append("<li class='message'><div class='inner_wrap'><h3 class='launch'>" + (value['subject']) + "</h3><h3 class='launch sender_email'>" + (value['sender']) + "</h3><div class='body'>" + (value['body']) + "</div><p>Date: " + (value['date']) + "</p><p class='tags'>Tags: " + (value['tags']) + "</p></div><input type='checkbox' class='checkbox'/><button class='remove_btn'> Delete </button> <button class='reply_btn'> Reply </button><div class='modal hide'><h2>Message</h2><h3 class='launch'>" + (value['subject']) + "</h3><h4>Sender:  " + (value['sender']) + "</h4><p>" + (value['body']) + "</p></div><div class='modal_reply hide'><h2>Reply</h2><label>To: </label><input class='to_email' type='text' value='" + (value['sender']) + "'/><textarea class='reply_area'></textarea><button class='send_btn'> Send </button></div></li>");
				  });
				}
			});
		});

	$(document).on('click', '.checkbox', function(e){
		if ($(this).parent().hasClass("checked")) {
			$(this).parent().removeClass('star_meessage read');
		}
		$(this).parent().toggleClass("checked");
	});

	$(document).on('click', '#delete', function() {
		  $('.checked').remove();
	});

	$(document).on('click', '#markRead', function() {
		  $('.checked').removeClass('star_message').addClass('read');
	});
	$(document).on('click', '#starred', function() {
		  $('.checked').removeClass('read').addClass('star_meessage');
	});


	//Toggle View
	$('.view_btn').on('click', function() {
		$('.view_btn').removeClass('active');
		$(this).addClass('active');
	});
	$('#gridView').on('click', function() {
	   $('.message').addClass('grid');
	   $('.message .inner_wrap').addClass('grid_in');
	});
	$('#listView').on('click', function() {
	   $('.message').removeClass('grid');
	   $('.message .inner_wrap').removeClass('grid_in');
	});

	//Grid View content
	$(document).on('click', '.inner_wrap.grid_in', function() {
		$(this).parent('.message').removeClass('animateShow animateHide');
		$('.modal_back').removeClass('hide');
		$(this).siblings('.modal').removeClass('hide');
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});
	$('.modal_back').on('click', function() {
		$(this).addClass('hide');
		$('.modal').addClass('hide');
	});


	$(document).on('click', '.remove_btn', function() {
		$(this).parent().remove();
	});

	$('.filter_btn_travel').on('click', function() {
		   $('.message').removeClass('animateShow').addClass('animateHide').hide();
		   $('.message').each(function() {
			   if($(this).find('.tags').text().indexOf('travel') > -1) {
			$(this).removeClass('animateHide').addClass('animateShow').show();
			   }
		  });
	});
	$('.filter_btn_work').on('click', function() {
		   $('.message').removeClass('animateShow').addClass('animateHide').hide();
		   $('.message').each(function() {
			   if($(this).find('.tags').text().indexOf('work') > -1) {
			$(this).removeClass('animateHide').addClass('animateShow').show();
			   }
		  });
	});
	$('.filter_btn_all').on('click', function() {
		$('.message').addClass('animateShow').removeClass('animateHide').show();
	});


	//Sticky nav

	var stickyTop = $('.tabs').offset().top;

	$(window).on( 'scroll', function(){
			if ($(window).scrollTop() >= stickyTop) {
				$('.tabs').css({top: "15px"});
			} else {
				$('.tabs').css({top: "auto"});
			}
		});


	//Search filter

	$.expr[":"].contains = $.expr.createPseudo(function(arg) {
		return function( elem ) {
			return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});

	$('#messageSearch').on('keyup', function() {
		let value = $(this).val();
		$( ".message").hide();
		$( ".message:contains('"+value+"')" ).show();

	});


	//Reply button

	$(document).on('click', '.reply_btn', function() {
		$(this).siblings('.modal_reply').toggleClass('hide');
	});

	$(document).on('click', '.send_btn', function() {
		var replyEmail = $(this).siblings('.reply_area').val();
		var dt = new Date();
		if (!replyEmail) {
			$(this).parent('.modal_reply').prepend("<h4 class='red'> Message is empty! Failed to send.</h4>");
		}
		else {
			$(this).parent('.modal_reply').parent('.message').append("<div class='sent_message'><h4 class='sent_message_title'> Message is sent! </h4><p><b>You Replied:</b> " + replyEmail + "</p><p>On: " + dt + "</p></div>");
			$(this).parent('.modal_reply').remove();
		}

	});

});
