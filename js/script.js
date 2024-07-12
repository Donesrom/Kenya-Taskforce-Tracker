const targetDateKey = "taskforceTargetDate"; // Key for localStorage

// Check if a target date is stored in localStorage
let targetDate = localStorage.getItem(targetDateKey);

// If no target date is found, create a new one 3 months from July 5, 2024, 3:00 PM
if (!targetDate) {
  const baseDate = new Date(2024, 6, 5, 15, 0); // July 5, 2024, 3:00 PM base date
  baseDate.setMonth(baseDate.getMonth() + 3); // Add 3 months to the base date
  targetDate = baseDate.getTime();
  localStorage.setItem(targetDateKey, targetDate.toString()); // Store the target date in localStorage
} else {
  // Parse the stored target date from localStorage
  targetDate = parseInt(localStorage.getItem(targetDateKey));
}

const countdownInterval = setInterval(() => {
  const now = new Date();
  const timeDifference = targetDate - now.getTime();

  // Calculate remaining time in milliseconds, seconds, minutes, hours, days, and months
  const secondsRemaining = Math.floor(timeDifference / 1000) % 60;
  const minutesRemaining = Math.floor(timeDifference / (1000 * 60)) % 60;
  const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 30; // Adjust for approximate months (assuming 30 days/month)
  const monthsRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

  // Update the display elements with the calculated values
  const monthsElement = document.getElementById("months");
  monthsElement.textContent = monthsRemaining.toString().padStart(2, "0"); // Pad with leading zeros

  const daysElement = document.getElementById("days");
  daysElement.textContent = daysRemaining.toString().padStart(2, "0");

  const hoursElement = document.getElementById("hours");
  hoursElement.textContent = hoursRemaining.toString().padStart(2, "0");

  const minutesElement = document.getElementById("minutes");
  minutesElement.textContent = minutesRemaining.toString().padStart(2, "0");

  const secondsElement = document.getElementById("seconds");
  secondsElement.textContent = secondsRemaining.toString().padStart(2, "0");

  if (timeDifference < 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").innerHTML = "Taskforce Countdown Ended!";
  }
}, 1000);
