// Enhanced Parallax and Stats Animation
$(document).ready(function() {
    // Initialize elements
    $('.parallax').each(function() {
        $(this).attr('data-speed', $(this).data('speed') || 30);
    });

    // Set initial state for stats
    $('.stat-number').css('opacity', '0').css('transform', 'translateY(20px)');

    // Throttle scroll events for better performance
    let lastScroll = 0;
    const scrollThrottle = 100; // milliseconds

    $(window).on('scroll', function() {
        const now = Date.now();
        if (now - lastScroll >= scrollThrottle) {
            lastScroll = now;
            handleScrollEffects();
        }
    });

    // Initial check on page load
    handleScrollEffects();
});

function handleScrollEffects() {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();

    // Parallax effect
    $('.parallax').each(function() {
        const $element = $(this);
        const speed = $element.data('speed');
        const elementOffset = $element.offset().top;
        const elementHeight = $element.outerHeight();

        // Only calculate when element is in viewport
        if (scrollPosition + windowHeight > elementOffset &&
            scrollPosition < elementOffset + elementHeight) {
            const yPos = -((scrollPosition - elementOffset) * speed / 100);
            $element.css('background-position', `center ${yPos}px`);
        }
    });

    // Stats animation
    $('.stat-number').each(function() {
        const $stat = $(this);
        const position = $stat.offset().top;
        const elementHeight = $stat.outerHeight();

        if (scrollPosition + windowHeight * 0.8 > position &&
            !$stat.hasClass('animated')) {

            $stat.addClass('animated')
                .css('opacity', '1')
                .css('transform', 'translateY(0)');

            // Get animation values
            const rawText = $stat.text();
            const countTo = parseInt(rawText.replace(/[^0-9]/g, '')) || 0;
            const suffix = rawText.match(/%|\+/) ? rawText.match(/%|\+/)[0] : '';
            const duration = Math.min(2000, Math.max(500, countTo * 10)); // Dynamic duration

            // Animate counting
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: duration,
                easing: 'swing',
                step: function() {
                    $stat.text(Math.floor(this.countNum) + suffix);
                },
                complete: function() {
                    $stat.text(countTo + suffix);
                }
            });
        }
    });
}