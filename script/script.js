// Get elements
const startButton = document.getElementById('Start');
const stopButton = document.getElementById('Stop');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const timePickerModal = document.getElementById('timePickerModal');
const timePickerInput = document.getElementById('timePicker');
const confirmTimeButton = document.getElementById('confirmTime');
const closeModalButton = document.getElementById('closeModal');

// Initialize variables for the countdown
let countdownTimer;  // This will hold the interval ID for the countdown
let timeLeftInSeconds = 0; // This will hold the time left in seconds
let initialTimeInSeconds = 0; // This will store the initial time in seconds for resetting

// Load the alarm sound using a relative path
const alarmSound = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');  // Adjust this path as necessary

// Show the modal when "Start" button is clicked
startButton.addEventListener('click', () => {
    console.log("Start button clicked!");
    timePickerModal.style.display = 'block'; // Show the modal
});

// Close the modal when "Cancel" button is clicked
closeModalButton.addEventListener('click', () => {
    console.log("Close modal clicked!");
    timePickerModal.style.display = 'none'; // Hide the modal
});

// Confirm selected time and start the countdown
confirmTimeButton.addEventListener('click', () => {
    const selectedTime = timePickerInput.value;
    console.log(`Selected time: ${selectedTime}`);  // Log the selected time

    // Close the modal after confirming the time
    timePickerModal.style.display = 'none';
    
    // Parse the selected time into hours and minutes
    if (selectedTime) {
        const [hours, minutes] = selectedTime.split(':');
        
        // Convert hours and minutes into total seconds
        timeLeftInSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60;
        initialTimeInSeconds = timeLeftInSeconds; // Save the initial time for reset
        
        console.log(`Time in seconds: ${timeLeftInSeconds}`);  // Log the time in seconds to confirm it's correct

        // Start the countdown
        startCountdown();
    } else {
        console.log("No time selected!");  // Log if no time was selected
    }
});

// Start the countdown timer
function startCountdown() {
    // Update the timer display initially
    updateTimerDisplay();
    
    // Clear any existing countdown (in case a new one is started)
    clearInterval(countdownTimer);

    // Set a new countdown interval
    countdownTimer = setInterval(() => {
        if (timeLeftInSeconds <= 0) {
            clearInterval(countdownTimer); // Stop the countdown when it reaches 0
            alarmSound.play(); // Play the alarm sound
            alert('Time is up!'); // Alert message after timer ends
        } else {
            timeLeftInSeconds--; // Decrease the time by one second
            updateTimerDisplay(); // Update the timer display
        }
    }, 1000); // Update every second
}

// Update the timer display in hh:mm:ss format
function updateTimerDisplay() {
    const hours = Math.floor(timeLeftInSeconds / 3600);
    const minutes = Math.floor((timeLeftInSeconds % 3600) / 60);
    const seconds = timeLeftInSeconds % 60;

    // Display in hh:mm:ss format with leading zeros
    timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Add event listener to the "Stop" button to stop the countdown
stopButton.addEventListener('click', () => {
    console.log("Stop button clicked!");
    clearInterval(countdownTimer); // Stop the countdown
    alert('Timer stopped');
});

// Add event listener to the "Reset" button to reset the timer
resetButton.addEventListener('click', () => {
    console.log("Reset button clicked!");
    clearInterval(countdownTimer); // Stop any running countdown
    
    // Reset the timer back to the initial time (default 25:00 if not set)
    if (initialTimeInSeconds === 0) {
        timeLeftInSeconds = 25 * 60; // Default 25 minutes in seconds
    } else {
        timeLeftInSeconds = initialTimeInSeconds; // Reset to the initial selected time
    }
    
    updateTimerDisplay(); // Update the timer display to the reset value
});
