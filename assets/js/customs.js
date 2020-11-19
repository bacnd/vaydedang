$(document).ready(function() {

    'use strict';

    var navbar = $('header');

    $('#fullpage').fullpage({
        navigation: true,
        navigationPosition: 'right',
        scrollBar: true,
        afterRender: function(){
            setInterval(function(){
                    $.fn.fullpage.moveSectionDown();
            }, 5000);
        }
    });


    // click show menu
    $('#navLine').click(function() {
        $(this).toggleClass('active');
        $('.hd-right').toggleClass('nav-active');
    });

    $(window).scroll(function() {
        var $height = $(window).scrollTop();

        if($height > 50) {
            navbar.addClass("scroll-down");            
        } else {
            navbar.removeClass("scroll-down");
        }

        // Show btn DANG KY TU VAN
        if ($(".main-page-info").length > 0) {
            var mainpageHight = $('.main-page-info .btn-action').offset().top - 40;
            var windowHight = $(window).scrollTop();
            showBtnRegister(windowHight, mainpageHight);
        }
        if ($('.loan-detail').length > 0) {
            var mainpageHight = $('.loan-detail').offset().top - 40;
            var windowHight = $(window).scrollTop();
            showBtnRegister(windowHight, mainpageHight);
        }
    });

    // Click open faq
    $('.faq-item-title').click(function(){
        $(this).toggleClass('active');
        $(this).next('.faq-item-content').toggle();
    });

    $("#loan_month, #input-phone").on("keypress keyup blur",function (event) {    
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $('.result-title').click(function(){
        $(this).parent().html('<p>Chọn phương án khác để so sánh</p>');
    });

    $('.btn-more-result').click(function(){
        $('.result .result-detail').removeClass('dl-pc');
    });

    // Validate Form
    $("#form-register").validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 12
            }
        },
        messages: {
            name: {
                required: "Họ và tên không được để trống!"
            },
            phone: {
                required: "Số điện thoại không được để trống!",
                minlength: "Số điện thoại bạn nhập không chính xác!",
                maxlength: "Số điện thoại bạn nhập không chính xác!"
            }
        },
        submitHandler : function (form) {
            $("#btn-register-submit").attr("disabled", true);
            $('#form-register .spinner').append('<img src="assets/images/commons/ajax-loader.gif" />');
            $('.send-success').remove();
            setTimeout(function() {
                $('input').val('');
                $("#btn-register-submit").attr("disabled", false);
                $('option:selected', this).remove();
                $('select').val('').trigger("chosen:updated"); 
                $('#form-register .spinner').empty();
                $('<p class="send-success">Cảm ơn bạn, thông tin đã được gửi đi!</p>').insertAfter('#btn-register-submit');
            }, 3000);
        }
    });

    $("#send-question").validate({
        rules: {
            question_content: {
                required: true
            }
        },
        messages: {
            question_content: {
                required: "Nội dung câu hỏi không được để trống!"
            }
        },
        submitHandler : function (form) {
            $(".btn-send-question").attr("disabled", true);
            $('#send-question .spinner').append('<img src="assets/images/commons/ajax-loader.gif" />');
            $('.send-success').remove();
            setTimeout(function() {
                $('textarea').val('');
                $(".btn-send-question").attr("disabled", false);
                $('#send-question .spinner').empty();
                $('<p class="send-success">Cảm ơn bạn, thông tin đã được gửi đi!</p>').insertAfter('.btn-send-question');
            }, 3000);
        }
    });

    $("#loan-calculate").validate({
        rules: {
            amount: {
                required: true
            },
            month: {
                required: true
            }
        },
        messages: {
            amount: {
                required: "Số tiền vay không được để trống"
            },
            month: {
                required: "Thời hạn vay không được để trống",
                min: "Giá trị bạn nhập nhỏ hơn giá trị cho phép!",
                max: "Giá trị bạn nhập lớn hơn giá trị cho phép!"
            }
        },
        submitHandler : function (form) {
            $("#btn-cal-loan").attr("disabled", true);
            $('#loan-calculate .spinner').append('<img src="assets/images/commons/ajax-loader.gif" />');
            setTimeout(function() {
                $("#btn-cal-loan").attr("disabled", false);
                $('#loan-calculate .spinner').empty();
            }, 3000);
        }
    });
    // End validate form
});

$(function() {
    //----- OPEN
    $('[data-popup-open]').on('click', function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
});

// Function that validates email address through a regular expression.
function validateEmail(email) {
    var filter = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (filter.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function showBtnRegister(windowHight, mainpageHight){
    if (windowHight > mainpageHight) {
        $('.advisory-register').addClass('show-btn');
    } else {
        $('.advisory-register').removeClass('show-btn');
    }
}