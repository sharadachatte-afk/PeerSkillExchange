console.log("Find Peers JavaScript loaded!");


// ==========================================
// GET CURRENT USER
// ==========================================

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
// GET HTML ELEMENTS
// ==========================================

const searchInput =
    document.getElementById("skillSearch");

const peerResults =
    document.getElementById("peerResults");

const resultTitle =
    document.getElementById("resultTitle");


// ==========================================
// SEARCH PEERS
// ==========================================

async function searchPeers() {

    const skill =
        searchInput.value.trim();


    if (!skill) {

        alert("Please enter a skill to search.");

        return;
    }


    peerResults.innerHTML =
        "<p>Searching...</p>";


    try {

        const response = await fetch(
            `/api/peers?skill=${encodeURIComponent(skill)}`
        );


        const peers =
            await response.json();


        if (!response.ok) {

            peerResults.innerHTML =
                `<p>${peers.message}</p>`;

            return;
        }


        resultTitle.textContent =
            `Peers who can teach "${skill}"`;


        peerResults.innerHTML = "";


        // ======================================
        // NO PEERS FOUND
        // ======================================

        if (peers.length === 0) {

            peerResults.innerHTML = `
                <p>
                    No peers found for "${skill}".
                </p>
            `;

            return;
        }


        // ======================================
        // DISPLAY PEERS
        // ======================================

        peers.forEach(peer => {

            const card =
                document.createElement("div");

            card.className =
                "peer-card";


            card.innerHTML = `

                <h3>
                    ${peer.name}
                </h3>

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
                    <strong>Wants to Learn:</strong>
                    ${peer.learnSkills.join(", ")}
                </p>

                <button
                    onclick="sendRequest('${peer._id}')">
                    Send Request
                </button>

            `;


            peerResults.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Search error:",
            error
        );

        peerResults.innerHTML = `
            <p>
                Cannot connect to the server.
                Please make sure the backend is running.
            </p>
        `;
    }
}


// ==========================================
// SEND CONNECTION REQUEST
// ==========================================

async function sendRequest(peerId) {

    // Make sure user is logged in
    if (!currentUser) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    // ======================================
    // GET SENDER ID
    // ======================================

    const senderId =
        currentUser.id || currentUser._id;


    // ======================================
    // CHECK IDs
    // ======================================

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", peerId);


    if (!senderId) {

        alert(
            "Your user ID was not found. Please login again."
        );

        return;
    }


    if (!peerId) {

        alert(
            "Peer ID was not found."
        );

        return;
    }


    // ======================================
    // SEND REQUEST TO BACKEND
    // ======================================

    try {

        const response = await fetch(
            "/api/requests",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    sender: senderId,

                    receiver: peerId

                })
            }
        );


        const data =
            await response.json();


        // ==================================
        // SUCCESS
        // ==================================

        if (response.ok) {

            alert(
                "Request sent successfully!"
            );

        }


        // ==================================
        // ERROR
        // ==================================

        else {

            alert(data.message);

        }


    } catch (error) {

        console.error(
            "Send request error:",
            error
        );

        alert(
            "Cannot connect to the server. Please make sure the backend is running."
        );

    }
}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

searchInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            searchPeers();

        }

    }
);
