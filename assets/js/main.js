(function ($) {
    "use strict";

    $(window).on('load', function () {
        //===== Prealoder
        $("#preloader").delay(400).fadeOut();
    });

    $(document).ready(function () {

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 600) {
                $('.back-to-top').fadeIn(200)
            } else {
                $('.back-to-top').fadeOut(200)
            }
        });

        //Animate the scroll to yop
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0,
            }, 900);
        });



        // hamburger_btn
        $('.hamburger_btn').on('click', function (event) {
            $('body').toggleClass("menu_toggled");
            $(this).toggleClass("active")
        });


        // ====== site_header ======= //
        $(document).ready(function () {
            function checkScroll() {
                if ($(window).scrollTop() >= 100) {
                    $('.site_header').addClass('fixed_menu');
                } else {
                    $('.site_header').removeClass('fixed_menu');
                }
            }

            // Check the scroll position on page load
            checkScroll();

            // Check the scroll position on scroll
            $(window).on('scroll', function () {
                checkScroll();
            });
        });



        // ======================== logo_reposition ========================= //
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 50) {
                $('.homepage body').addClass('logo_reposition');
            } else {
                $('.homepage body').removeClass('logo_reposition');
            }
        });

        // Trigger the scroll event on page load
        $(window).trigger('scroll');


        // ====================== Fakts area ==================== //
        $(document).ready(function () {
            var $bottle1 = $('.fakt_bottle1'); // First bottle
            var $bottle2 = $('.fakt_bottle2'); // Second bottle

            var speed1 = 0.05; // Speed for the first bottle
            var speed2 = 0.02; // Speed for the second bottle

            // Read initial positions from CSS
            var currentPos1 = parseFloat($bottle1.css('left'));
            var currentPos2 = parseFloat($bottle2.css('left'));

            var targetPos1 = currentPos1;
            var targetPos2 = currentPos2;

            function updatePosition() {
                // Smoothly interpolate between the current and target positions for both bottles
                currentPos1 += (targetPos1 - currentPos1) * speed1;
                currentPos2 += (targetPos2 - currentPos2) * speed2;

                $bottle1.css('left', currentPos1 + 'px');
                $bottle2.css('left', currentPos2 + 'px');

                requestAnimationFrame(updatePosition);
            }

            $('.fakts_area').mousemove(function (event) {
                var sectionWidth = $(this).width();
                var sectionOffset = $(this).offset();
                var cursorPos = event.pageX - sectionOffset.left;

                targetPos1 = cursorPos - 60; // Adjust for bottle1
                targetPos2 = cursorPos + 60; // Adjust for bottle2

                // Calculate restricted positions
                var maxLeft = sectionWidth / 2 - 50 * 16; // 50rem to the left
                var maxRight = sectionWidth / 2 + 50 * 16; // 50rem to the right
                targetPos1 = Math.max(maxLeft, Math.min(targetPos1, maxRight));
                targetPos2 = Math.max(maxLeft, Math.min(targetPos2, maxRight));
            });

            // Start the animation loop
            updatePosition();
        });


        // ================ stack area ============== //
        $(document).ready(function () {
            $(window).on('scroll', function () {
                // Check if .stack_img_area is in the viewport
                if ($('.stack_img_area').is(':visible')) {
                    fadeInImages();
                }
            });

            // If the user loads directly into the position
            if ($('.stack_img_area').is(':visible')) {
                fadeInImages();
            }

            function fadeInImages() {
                // Fade in the images one after another
                $('.stack_img_area .stack_img_box').each(function (index) {
                    $(this).delay(500 * index).fadeIn(1000);
                });
            }

            // Initially hide all the images
            $('.stack_img_area .stack_img_box').hide();
        });

        // ================ Increase Decrease button ============== //
        $(document).ready(function () {
            // Increase button click event
            $('.increase_btn').click(function () {
                var $numberElement = $(this).siblings('.increase_decrease_number');
                var currentValue = parseInt($numberElement.text(), 10);
                $numberElement.text(currentValue + 1);
            });

            // Decrease button click event
            $('.decrease_btn').click(function () {
                var $numberElement = $(this).siblings('.increase_decrease_number');
                var currentValue = parseInt($numberElement.text(), 10);

                if (currentValue > 1) {
                    $numberElement.text(currentValue - 1);
                }
            });
        });


        // ========================= slider ======================== //
        $(document).ready(function () {
            var owl = $('.slider1');
            var dragBtn = $('.drag_btn');
            var dragStartX, dragMoveX, dragDistance;
            var threshold = 100; // Lowered threshold for smoother dragging

            owl.owlCarousel({
                loop: false,
                margin: 100,
                nav: false,
                dots: false,
                autoplay: true,
                autowidth: false,
                items: 2,
                smartSpeed: 700,
                responsive: {
                    0: {
                        items: 1.4,
                        margin: 0,
                        autoplay: false,
                    },
                    576: {
                        items: 1.6,
                        margin: 0,
                        autoplay: false,
                    },
                    768: {
                        items: 2,
                        margin: 60,
                    },
                    992: {
                        items: 2,
                        margin: 100,
                    }
                },
            });

            dragBtn.on('mousedown touchstart', function (e) {
                e.preventDefault();
                dragStartX = e.pageX || e.originalEvent.touches[0].pageX;
                $(document).on('mousemove touchmove', onDragMove);
                $(document).on('mouseup touchend', onStopDrag);
            });

            function onDragMove(e) {
                dragMoveX = e.pageX || e.originalEvent.touches[0].pageX;
                dragDistance = dragMoveX - dragStartX;

                // Apply easing to the drag button movement
                dragBtn.css('transform', 'translateX(' + dragDistance + 'px)').css('transition', 'transform 0.2s ease-out');

                // Slide the carousel when dragging exceeds certain thresholds
                if (dragDistance > threshold) {
                    owl.trigger('next.owl.carousel');
                    dragStartX = dragMoveX; // Reset drag start position to avoid abrupt jumps
                } else if (dragDistance < -threshold) {
                    owl.trigger('prev.owl.carousel');
                    dragStartX = dragMoveX;
                }
            }

            function onStopDrag() {
                // Reset drag button to default position with easing
                dragBtn.css('transform', 'translateX(0)').css('transition', 'transform 0.3s ease-out');
                $(document).off('mousemove touchmove', onDragMove);
                $(document).off('mouseup touchend', onStopDrag);
            }
        });

        // slider2
        $('.slider2').owlCarousel({
            loop: false,
            nav: false,
            dots: false,
            autoplay: false,
            // autoWidth: true,
            smartSpeed: 700,
            touchDrag: false,
            mouseDrag: false,
            items: 5,
            responsive: {
                0: {
                    margin: 25,
                    autoWidth: true,
                    touchDrag: true,
                    mouseDrag: true,
                },
                768: {
                    margin: 25,
                    autoWidth: true,
                    touchDrag: true,
                    mouseDrag: true,
                },
                992: {
                    margin: 15,
                    touchDrag: false,
                    autoWidth: true,
                    mouseDrag: false,
                },
                1440: {
                    margin: 20,
                    touchDrag: false,
                    mouseDrag: false,
                }
            },
        });

        // slider3
        $('.slider3').owlCarousel({
            loop: false,
            nav: false,
            dots: false,
            autoplay: false,
            // autoWidth: false,
            items: 3,
            smartSpeed: 700,
            touchDrag: false,
            mouseDrag: false,
            responsive: {
                0: {
                    margin: 30,
                    autoWidth: true,
                    touchDrag: true,
                    mouseDrag: true,
                },
                768: {
                    margin: 0,
                    items: 3,
                    touchDrag: false,
                    mouseDrag: false,
                },
                991: {
                    margin: 0,
                    touchDrag: false,
                    mouseDrag: false,
                },
                1440: {
                    margin: 40,
                    touchDrag: false,
                    mouseDrag: false,
                }
            },
        });


        // slider4
        $('.slider4').owlCarousel({
            loop: false,
            nav: false,
            dots: false,
            autoplay: false,
            autoWidth: true,
            items: 5,
            smartSpeed: 700,
            touchDrag: false,
            mouseDrag: false,
            responsive: {
                0: {
                    margin: 30,
                    autoWidth: true,
                    touchDrag: true,
                    mouseDrag: true,
                },
                768: {
                    margin: 20,
                    autoWidth: true,
                    touchDrag: true,
                    mouseDrag: true,
                },
                991: {
                    margin: 30,
                    touchDrag: false,
                    mouseDrag: false,
                }
            },
        });

        // slider5
        $('.slider5').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            autoplay: false,
            items: 1,
            smartSpeed: 700
        });

        // Add "dot1" class by default on load
        $('.owl-dots').addClass('dot1');

        // Add an event listener for the 'changed.owl.carousel' event
        $('.slider5').on('changed.owl.carousel', function (event) {
            // Remove all existing dot classes from .owl-dots
            $('.owl-dots').removeClass(function (index, className) {
                return (className.match(/(^|\s)dot\d+/g) || []).join(' ');
            });

            // Get the total number of items (slides)
            var totalItems = event.page.count;

            // Get the current slide index within the looped items
            var currentIndex = event.page.index;

            // Calculate the dot class, ensuring it starts from "dot1"
            var dotClass = 'dot' + ((currentIndex % totalItems) + 1);

            // Add the calculated dot class to .owl-dots
            $('.owl-dots').addClass(dotClass);
        });



        // product
        $(".product").hover(
            function () {
                // On mouse enter
                $(".products_area").addClass("items_fade_in");
            },
            function () {
                // On mouse leave
                $(".products_area").removeClass("items_fade_in");
            }
        );

        // choose_product
        $('.choose_product').on('click', function (event) {
            $('.choose_product').not(this).removeClass('active');
            $(this).toggleClass("active");
            var product_quantity = $(this).find(".product_quantity").html();
            $('.increase_decrease_number').html(product_quantity);
        });

        // checkbox
        $('.checkbox').on('click', function (event) {
            $(this).toggleClass("active");
        });

    });

})(jQuery);