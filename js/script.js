
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
//facts that will be randomly selected.
const facts = [
    "Study in shorter, focused sessions, and review notes daily instead of cramming.",
    "College is the time to try new subjects, hobbies, and leadership roles. Expand your network.",
    "Reinhardt offers free tutoring for all subjects.",
    "It’s easy to join too many clubs or activities—focus on a few that matter most.",
    "Get sunlight early in the day to improve your sleep cycle.",
    "Professors expect students to come with questions—this builds relationships and clarifies tough material.",
    "Break large tasks into smaller steps and reward yourself for progress.",
    "Track expenses, avoid unnecessary debt, and use student discounts.",
    "Many scholarships are available beyond freshman year. Keep applying annually!",
    "Lack of rest hurts memory and focus more than most students realize.",
    "Focusing only on academics without building relationships can make college harder emotionally.",
];

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

// Button event listeners for the time left.
document.getElementById("registerBtn").addEventListener("click", () => {
    startCountdown("register");
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
    startCountdown("withdraw");
});

document.getElementById("endBtn").addEventListener("click", () => {
    startCountdown("end");
});
// Button event listener for the random fact.
const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");

if (factBtn && factText) {
    factBtn.addEventListener("click", function () {
        const random = Math.floor(Math.random() * facts.length);
        factText.textContent = facts[random];
    });
}
// Button event listener for random motivational quote.
const quoteBtn = document.getElementById("quoteBtn");
const quoteText = document.getElementById("quoteText");

if (quoteBtn && quoteText) {
    quoteBtn.addEventListener("click", async () => {
        quoteText.textContent = "Loading...";

        try {
            const res = await fetch("https://api.quotable.io/random");
            const data = await res.json();
            quoteText.textContent = `"${data.content}" — ${data.author}`;
        } catch (error) {
            quoteText.textContent = "Could not load a quote. Try again!";
        }
    });
}
