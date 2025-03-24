$(document).ready(function() {

    $(document).ready(function() {
        // Video Background Handling
        function setupVideoBackground() {
            const video = document.querySelector('.video-background video');
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (isMobile || prefersReducedMotion) {
                // Use fallback image on mobile or when reduced motion is preferred
                const videoContainer = document.querySelector('.video-background');
                videoContainer.innerHTML = '<div class="fallback-image" style="width:100%;height:100%;background:url(images/hero-fallback.jpg) center/cover no-repeat"></div>';
                return;
            }

            // Try to play video
            if (video) {
                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.log("Video autoplay prevented, showing fallback");
                        const videoContainer = document.querySelector('.video-background');
                        videoContainer.innerHTML = '<div class="fallback-image" style="width:100%;height:100%;background:url(images/hero-fallback.jpg) center/cover no-repeat"></div>';
                    });
                }
            }
        }

        // Initialize video background
        setupVideoBackground();

        // Rest of your existing JavaScript
        // Scroll indicator, navbar effects, etc.
    });

    // Scroll indicator
    $('.scroll-indicator').click(function() {
        $('html, body').animate({
            scrollTop: $('#about').offset().top
        }, 800);
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
            $('.scroll-indicator').fadeOut();
        } else {
            $('.navbar').removeClass('scrolled');
            $('.scroll-indicator').fadeIn();
        }
    });

    // Smooth scrolling for anchor links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800, 'swing', function() {
                    window.location.hash = target.selector;
                });
            }
        }
    });

    // Initialize carousels
    $('.carousel').carousel({
        interval: 5000,
        pause: 'hover',
        wrap: true
    });

    // Scroll animations
    function checkScroll() {
        $('.fade-in').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scroll + windowHeight * 0.7 > position) {
                $(this).addClass('visible');
            }
        });
    }

    // Check on scroll and on load
    $(window).on('scroll', checkScroll);
    checkScroll();

    // Form submission handling
    $('form').submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var submitBtn = form.find('button[type="submit"]');

        submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');

        // Simulate form submission
        setTimeout(function() {
            submitBtn.html('Message Sent!').removeClass('btn-primary-custom').addClass('btn-success');

            // Reset form after 3 seconds
            setTimeout(function() {
                form.trigger('reset');
                submitBtn.prop('disabled', false).html('Send Message').removeClass('btn-success').addClass('btn-primary-custom');
            }, 3000);
        }, 1500);
    });

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
});