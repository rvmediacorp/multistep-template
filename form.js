let currentStep = 1;
const maxSteps = 7; // Assuming you have 7 steps

function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= maxSteps; i++) {
        const el = document.getElementById(`step-${i}`);
        el.style.display = 'none'; // Hide the step
    }
    
    // Show the current step
    const currentEl = document.getElementById(`step-${step}`);
    currentEl.style.display = 'block'; // Show the step

    // Show submit button on the last step
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.style.display = (step === maxSteps) ? 'block' : 'none';

    // Update navigation buttons visibility
    updateNavigationButtons(step);

    // Update progress bar
    updateProgressBar(step);
}

function nextStep() {
    if (currentStep < maxSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function updateNavigationButtons(step) {
    const backBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    backBtn.style.display = (step >= 3 && step <= 6) ? 'block' : 'none';
    nextBtn.style.display = (step >= 3 && step <= 6) ? 'block' : 'none';
}

function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    const percentage = ((step - 1) / (maxSteps - 1)) * 100;
    progressBar.style.width = percentage + '%';
}

function selectOption(selectedOption) {
    const button = document.getElementById(`choice-${selectedOption}`);
    button.classList.toggle('selected'); // Toggle the 'selected' class on and off
}

function autoAdvance(selectedOption) {
    selectOption(selectedOption); // Highlight the selected option
    nextStep(); // Automatically go to the next step
}

// Initialize the form with the first step
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);

    // Attach event listeners to the choice buttons in step 1 for auto-advance
    document.querySelectorAll('#step-1 .choice-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const selectedOption = event.currentTarget.id.replace('choice-', '');
            autoAdvance(selectedOption);
        });
    });

    // Attach event listeners to the choice buttons in step 3 for multiple selections
    document.querySelectorAll('#step-3 .choice-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const selectedOption = event.currentTarget.id.replace('choice-', '');
            selectOption(selectedOption);
        });
    });

    // Add an event listener to the confirm button in Step 2
    const zipConfirmBtn = document.getElementById('zip-confirm');
    if(zipConfirmBtn) {
        zipConfirmBtn.addEventListener('click', nextStep);
    }
});
