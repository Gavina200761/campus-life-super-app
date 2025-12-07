
//This function will display the calculated number of days until these important dates.
// Get output element
const results = document.querySelector('.results');

// Academic deadlines
const deadlines = {
    register: [
        { term: "Fall", date: "August 25 2025" },
        { term: "Winter", date: "December 9 2025" },
        { term: "Spring", date: "January 20 2026" }
    ],

    withdraw: [
        { term: "Fall", date: "October 14 2025" },
        { term: "Winter", date: "December 18 2025" },
        { term: "Spring", date: "March 24 2026" }
    ],

    end: [
        { term: "Fall", date: "December 7 2025" },
        { term: "Winter", date: "January 4 2026" },
        { term: "Spring", date: "May 3 2026" }
    ]
};

// Time difference calculation (days/hours/min/sec)
function timeRemaining(dateString) {
    const now = new Date();
    const target = new Date(dateString);

    const diff = target - now;

    if (diff <= 0) return false;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
}

// This regenerates the display every second
let interval = null;

// Build the HTML message
function buildMessage(type) {
    let html = "";

    deadlines[type].forEach(entry => {
        const t = timeRemaining(entry.date);

        if (!t) {
            html += `
                <strong>${entry.term}:</strong> Deadline has passed.<br>
                <em>${entry.date}</em><br><br>
            `;
        } else {
            html += `
                <strong>${entry.term}:</strong>
                ${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s<br>
                <em>Deadline: ${entry.date}</em><br><br>
            `;
        }
    });

    return html;
}

// Start updating every second
function startCountdown(type) {
    // Clear previous timer
    if (interval) clearInterval(interval);

    // Immediately show new result
    results.innerHTML = buildMessage(type);

    // Update every second
    interval = setInterval(() => {
        results.innerHTML = buildMessage(type);
    }, 1000);
}

// Button event listeners
document.getElementById("registerBtn").addEventListener("click", () => {
    startCountdown("register");
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
    startCountdown("withdraw");
});

document.getElementById("endBtn").addEventListener("click", () => {
    startCountdown("end");
});
