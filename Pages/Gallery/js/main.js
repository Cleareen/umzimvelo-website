document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const videoItems = document.querySelectorAll('.video-item');
    const lightbox = document.querySelector('.gallery-lightbox');
    const expandedImg = document.getElementById('expanded-img');
    const expandedVideo = document.getElementById('expanded-video');
    const closeBtn = document.querySelector('.close-btn');
    const filterButtons = document.querySelectorAll('.category-nav button');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Image lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const mediaSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-overlay h3').textContent;
            
            expandedImg.src = mediaSrc;
            expandedImg.alt = caption;
            expandedImg.style.display = 'block';
            expandedVideo.style.display = 'none';
            expandedVideo.pause();
            
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Video lightbox functionality
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoElement = this.querySelector('video');
            const videoSrc = videoElement.querySelector('source').src;
            const caption = this.querySelector('.video-overlay p').textContent;
            
            expandedVideo.querySelector('source').src = videoSrc;
            expandedVideo.load();
            expandedImg.style.display = 'none';
            expandedVideo.style.display = 'block';
            
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Play video when lightbox opens
            setTimeout(() => {
                expandedVideo.play();
            }, 300);
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', function() {
        closeLightbox();
    });
    
    // Close when clicking outside content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        expandedVideo.pause();
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Auto-play video previews on hover
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
    
    // Parallax effects for gallery sections
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Hero parallax
        const hero = document.querySelector('.gallery-hero');
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        // Video section parallax
        const videoSection = document.querySelector('.video-gallery');
        if (videoSection) {
            videoSection.style.backgroundPositionY = scrollPosition * 0.3 + 'px';
        }
    });
});