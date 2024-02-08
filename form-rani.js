
let currentStep = 1;
const maxSteps = 7; // Assuming you have 7 steps

var additionalServicesCheckboxes = document.querySelectorAll('input[name="additionalServices[]"]');

// Get the hidden input element
var hiddenInput = document.getElementById('selectedAdditionalServices');

// Function to update the hidden input with selected services
function updateSelectedServices() {
    // Create an array to store the selected values
    var selectedServicesArray = [];

    // Iterate over the checkboxes and push the values of the checked ones to the array
    additionalServicesCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedServicesArray.push(checkbox.value);
        }
    });

    // Set the value of the hidden input to the selected services array joined as a string
    hiddenInput.value = selectedServicesArray.join(', ');

    // Optionally, you can log the selected services for debugging
    console.log("Selected Additional Services: " + hiddenInput.value);
}

// Add an event listener to each checkbox
additionalServicesCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateSelectedServices);
});

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

    backBtn.style.display = (step > 1) ? 'block' : 'none'; // Show back button if step is greater than 1
    nextBtn.style.display = (step < maxSteps) ? 'block' : 'none'; // Show next button if step is less than maxSteps
}

function updateProgressBar(step) {
    const progressBar = document.getElementById('progress-bar');
    const percentage = ((step - 1) / (maxSteps - 1)) * 100;
    progressBar.style.width = percentage + '%';
}

// Function to toggle selection for step 3
function selectOption(element) {
    element.classList.toggle('selected'); // Toggle the 'selected' class on and off
}

// ... [rest of your JavaScript code]

// Initialize the form with the first step
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);

    // Event listeners for selection boxes in step 5
    document.querySelectorAll('#step-5 .selection-box').forEach(box => {
        box.addEventListener('click', function(event) {
            // Find the radio button inside the clicked selection box
            const radio = box.querySelector('.hidden-radio');
            // Check the radio button
            radio.checked = true;
            // Clear previously selected options
            box.closest('.form-step').querySelectorAll('.selection-box').forEach(innerBox => {
                innerBox.classList.remove('selected');
            });
            // Add 'selected' class to the parent .selection-box
            box.classList.add('selected');
        });
    });

    // Event listeners for selection boxes in step 6
document.querySelectorAll('#step-6 .selection-box').forEach(box => {
    box.addEventListener('click', function(event) {
        // Find the radio button inside the clicked selection box
        const radio = box.querySelector('.hidden-radio');
        // Check the radio button
        radio.checked = true;
        // Clear previously selected options
        box.closest('.form-step').querySelectorAll('.selection-box').forEach(innerBox => {
            innerBox.classList.remove('selected');
        });
        // Add 'selected' class to the parent .selection-box
        box.classList.add('selected');
    });
});


    // Attach event listeners to the choice buttons in step 1 for auto-advance
    document.querySelectorAll('#step-1 .choice-button').forEach(button => {
        button.addEventListener('click', function(event) {
            // Auto-advance on step 1

            // Get the data-type value
            const type= event.currentTarget.dataset.type;
            console.log(type); // Use dataTypeValue as needed
            const property = document.getElementById(type);
            property.checked = true;
            
            const selectedOption = event.currentTarget.id.replace('choice-', '');
            document.querySelectorAll('#step-1 .choice-button').forEach(btn => btn.classList.remove('selected'));
            event.currentTarget.classList.add('selected');
            setTimeout(nextStep, 200); // Delay to show the click effect
        });
    });

    // Attach event listeners to the choice buttons in step 3 for multiple selections
    document.querySelectorAll('#step-3 .choice-button').forEach(button => {
        button.addEventListener('click', function(event) {
            // Allow multiple selections on step 3
            const type= event.currentTarget.dataset.type;
            console.log(type);
            const service = document.getElementById(type);
            service.checked = true;
            selectOption(event.currentTarget);
        });
    });

    // Add an event listener to the confirm button in Step 2
    const zipConfirmBtn = document.getElementById('zip-confirm');
    if(zipConfirmBtn) {
        zipConfirmBtn.addEventListener('click', nextStep);
    }
    // $(document).ready(function(){
    //     $(document).on('submit',".multistepForm", function(e){
    //         var formData = $(this).serialize();
    //         e.preventDefault();
    //         console.log(formData);
    //     })
    // })

    // document.addEventListener('submit', function(e) {
    //     if (e.target.classList.contains('multistepForm')) {
    //         e.preventDefault();
    //         const name = document.getElementById('name').value;
    //         const phone = document.getElementById('phone').value;
    //         const address = document.getElementById('address').value;
    //         const email = document.getElementById('email').value;
    //         const additionalMessage = document.getElementById('additionalMessage').value;
    //         const agreeToContact = document.getElementById('agree-to-contact').checked;

    //         var formData = new FormData(e.target);
    //             formData.append('name', name);
    //             formData.append('phone', phone);
    //             formData.append('address', address);
    //             formData.append('email', email);
    //             formData.append('additionalMessage', additionalMessage);
    //             formData.append('agreeToContact', agreeToContact);
    //             console.log(formData);
    //             // return false;
    //         fetch('https://script.google.com/macros/s/AKfycbyBGFXEKGv492uoiiZiBoPaWWxNBBCJ9fTc6q9rxdSO0JHjy5Ek-W4DiHpqny8BvZzp/exec', {
    //             method: 'POST',
    //             mode: 'cors', // Add this line
    //             body: formData,
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //             }
    //             return response.text();
    //         })
    //         .then(data => {
    //             console.log(data);
    //             // Process the response as needed
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    //     }
    //   });
});

