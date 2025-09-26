document.addEventListener('DOMContentLoaded', function() {
    // Initialize ratings
    updateOverallRating();
    updateAllLabels();

    // Form submission handling
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            // Save feedback data to localStorage before submission
            const data = {
                submittedBy: document.getElementById('submittedBy').value,
                usn: document.getElementById('usn').value,
                contact: document.getElementById('contact').value,
                email: document.getElementById('email').value,
                department: document.getElementById('department').value,
                semester: document.getElementById('semester').value,
                college: document.getElementById('college').value,
                trainerName: document.getElementById('trainerName').value,
                topics: document.getElementById('topics').value,
                concepts: document.getElementById('concepts').value,
                interaction: document.getElementById('interaction').value,
                delivery: document.getElementById('delivery').value
            };
            localStorage.setItem('feedbackData', JSON.stringify(data));

            // Show sending spinner
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.8';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 5000);
        });
    }
});

// Ratings labels
const labels = {
    1: "Poor",
    2: "Below Average",
    3: "Average",
    4: "Good",
    5: "Very Good"
};

// Update individual rating value and overall rating
function updateRating(element) {
    const valueDisplay = document.getElementById(element.id + 'Value');
    valueDisplay.textContent = element.value;

    // Update overall rating
    updateOverallRating();

    // Update min/max labels
    updateLabels(element.id);
}

// Update overall rating
function updateOverallRating() {
    const topics = parseInt(document.getElementById('topics').value) || 0;
    const concepts = parseInt(document.getElementById('concepts').value) || 0;
    const interaction = parseInt(document.getElementById('interaction').value) || 0;
    const delivery = parseInt(document.getElementById('delivery').value) || 0;
    
    const overallRating = (topics + concepts + interaction + delivery) / 4;
    const roundedRating = overallRating.toFixed(1);
    
    document.getElementById('overallRating').textContent = roundedRating;
    
    const commentElement = document.getElementById('ratingComment');
    if (overallRating >= 4.5) {
        commentElement.textContent = 'Very Good';
    } else if (overallRating >= 3.5) {
        commentElement.textContent = 'Good';
    } else if (overallRating >= 2.5) {
        commentElement.textContent = 'Average';
    } else if (overallRating >= 1.5) {
        commentElement.textContent = 'Below Average';
    } else {
        commentElement.textContent = 'Poor';
    }
}

// Update labels for a specific rating category
function updateLabels(id) {
    const labelMin = document.getElementById(id + 'Label');
    const labelMax = document.getElementById(id + 'LabelMax');
    labelMin.textContent = `1 (${labels[1]})`;
    labelMax.textContent = `5 (${labels[5]})`;
}

// Initialize all labels on page load
function updateAllLabels() {
    ['topics', 'concepts', 'interaction', 'delivery'].forEach(updateLabels);
}
