console.log("Dashboard JavaScript loaded!");

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ==========================================
// CHECK LOGIN
// ==========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==========================================
// DISPLAY USER INFORMATION
// ==========================================

if (currentUser) {

    document.getElementById("studentName").textContent =
        currentUser.name || "Student";

    document.getElementById("studentEmail").textContent =
        currentUser.email || "";

    document.getElementById("studentDepartment").textContent =
        currentUser.department || "";

    document.getElementById("studentYear").textContent =
        currentUser.year || "";


    // ======================================
    // DISPLAY TEACHING SKILLS
    // ======================================

    const teachContainer =
        document.getElementById("teachSkillsContainer");

    teachContainer.innerHTML = "";

    if (
        currentUser.teachSkills &&
        currentUser.teachSkills.length > 0
    ) {

        currentUser.teachSkills.forEach(skill => {

            const skillElement =
                document.createElement("span");

            skillElement.className = "skill-tag";

            skillElement.textContent = skill;

            teachContainer.appendChild(skillElement);

        });

    } else {

        teachContainer.innerHTML =
            "<p>No teaching skills added.</p>";

    }


    // ======================================
    // DISPLAY LEARNING SKILLS
    // ======================================

    const learnContainer =
        document.getElementById("learnSkillsContainer");

    learnContainer.innerHTML = "";

    if (
        currentUser.learnSkills &&
        currentUser.learnSkills.length > 0
    ) {

        currentUser.learnSkills.forEach(skill => {

            const skillElement =
                document.createElement("span");

            skillElement.className = "skill-tag";

            skillElement.textContent = skill;

            learnContainer.appendChild(skillElement);

        });

    } else {

        learnContainer.innerHTML =
            "<p>No learning skills added.</p>";

    }

}


// ==========================================
// LOAD RECOMMENDED MATCHES
// ==========================================

async function loadMatches() {

    const matchResults =
        document.getElementById("matchResults");

    if (!currentUser) {
        return;
    }

    matchResults.innerHTML =
        "<p>Finding suitable peers...</p>";

    try {

        const response = await fetch(
            `/api/matches/${currentUser.id}`
        );

        const matches = await response.json();


        if (!response.ok) {

            matchResults.innerHTML =
                `<p>${matches.message}</p>`;

            return;
        }


        matchResults.innerHTML = "";


        // No matches
        if (matches.length === 0) {

            matchResults.innerHTML = `
                <p>
                    No matching peers found yet.
                    Try adding more skills you want to learn.
                </p>
            `;

            return;
        }


        // Display matches
        matches.forEach(peer => {

            const card =
                document.createElement("div");

            card.className = "match-card";


            card.innerHTML = `
                <h3>${peer.name}</h3>

                <p>
                    <strong>Department:</strong>
                    ${peer.department}
                </p>

                <p>
                    <strong>Year:</strong>
                    ${peer.year}
                </p>

                <p>
                    <strong>Can Teach:</strong>
                    ${peer.teachSkills.join(", ")}
                </p>

                <p>
                    <strong>Matched Skills:</strong>
                    ${peer.matchedSkills.join(", ")}
                </p>

                <button
                    onclick="sendMatchRequest('${peer._id}')">
                    Send Request
                </button>
            `;

            matchResults.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Match loading error:",
            error
        );

        matchResults.innerHTML = `
            <p>
                Cannot connect to the server.
                Please make sure the backend is running.
            </p>
        `;

    }

}


// ==========================================
// SEND REQUEST FROM MATCH
// ==========================================

async function sendMatchRequest(peerId) {

    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }


    try {

        const response = await fetch(
            /api/requests",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    sender: currentUser.id,
                    receiver: peerId
                })
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Connection request sent successfully!"
            );

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(
            "Request error:",
            error
        );

        alert(
            "Cannot connect to the server."
        );

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("currentUser");

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}


// ==========================================
// START MATCHING
// ==========================================

loadMatches();
