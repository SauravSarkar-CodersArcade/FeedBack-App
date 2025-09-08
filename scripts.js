document.addEventListener('DOMContentLoaded', function() {
    // Initialize ratings
    updateOverallRating();
    
    // Form submission handling
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            // Add loading state for better user experience
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.8';
            
            // Re-enable button after 5 seconds in case submission fails
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 5000);
        });
    }
});

// Update individual rating value display
function updateRating(slider) {
    const valueDisplay = document.getElementById(slider.id + 'Value');
    valueDisplay.textContent = slider.value;
    updateOverallRating();
}

// Calculate and update overall rating
function updateOverallRating() {
    const topics = parseInt(document.getElementById('topics').value) || 0;
    const concepts = parseInt(document.getElementById('concepts').value) || 0;
    const interaction = parseInt(document.getElementById('interaction').value) || 0;
    const delivery = parseInt(document.getElementById('delivery').value) || 0;
    
    const overallRating = (topics + concepts + interaction + delivery) / 4;
    const roundedRating = overallRating.toFixed(1);
    
    document.getElementById('overallRating').textContent = roundedRating;
    
    // Update rating comment based on score for 1-5 scale
    const commentElement = document.getElementById('ratingComment');
    if (overallRating >= 4.5) {
        commentElement.textContent = 'Excellent!';
    } else if (overallRating >= 4.0) {
        commentElement.textContent = 'Very Good';
    } else if (overallRating >= 3.0) {
        commentElement.textContent = 'Good';
    } else if (overallRating >= 2.0) {
        commentElement.textContent = 'Average';
    } else if (overallRating >= 1.5) {
        commentElement.textContent = 'Below Average';
    } else {
        commentElement.textContent = 'Poor';
    }
}