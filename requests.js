console.log("Requests JavaScript loaded!");

// ==========================================
// GET CURRENT LOGGED-IN USER
// ==========================================

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

// ==========================================
// REQUEST LIST ELEMENT
// ==========================================

const requestList = document.getElementById("requestList");

// ==========================================
// GET USER ID SAFELY
// ==========================================

const userId = currentUser
    ? (currentUser.id || currentUser._id)
    : null;

// ==========================================
// CHECK LOGIN
// ==========================================

if (!currentUser || !userId) {

    alert("Please login first.");

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

} else {

    console.log("Logged-in user:", currentUser);
    console.log("User ID:", userId);

}


// ==========================================
// LOAD RECEIVED REQUESTS
// ==========================================

async function loadRequests() {

    if (!userId) {
        return;
    }

    requestList.innerHTML = `
        <p>Loading requests...</p>
    `;

    try {

        console.log(
            "Loading requests for user:",
            userId
        );

        const response = await fetch(
            `/api/requests/${userId}`
        );

        console.log(
            "Request API status:",
            response.status
        );

        const data = await response.json();

        console.log(
            "Requests received:",
            data
        );


        // ======================================
        // SERVER ERROR
        // ======================================

        if (!response.ok) {

            requestList.innerHTML = `
                <div class="no-requests">
                    <h3>Error Loading Requests</h3>
                    <p>${data.message || "Something went wrong."}</p>
                </div>
            `;

            return;
        }


        // ======================================
        // NO REQUESTS
        // ======================================

        if (!Array.isArray(data) || data.length === 0) {

            requestList.innerHTML = `
                <div class="no-requests">
                    <h3>No Connection Requests</h3>
                    <p>
                        You don't have any connection requests yet.
                    </p>
                </div>
            `;

            return;
        }


        // ======================================
        // CLEAR LOADING
        // ======================================

        requestList.innerHTML = "";


        // ======================================
        // DISPLAY REQUESTS
        // ======================================

        data.forEach(request => {

            const card = document.createElement("div");

            card.className = "request-card";


            // ==================================
            // SENDER INFORMATION CHECK
            // ==================================

            if (!request.sender) {

                card.innerHTML = `
                    <h3>Connection Request</h3>
                    <p>
                        Sender information is unavailable.
                    </p>
                `;

                requestList.appendChild(card);

                return;
            }


            const sender = request.sender;


            // ==================================
            // PENDING REQUEST
            // ==================================

            if (request.status === "pending") {

                card.innerHTML = `

                    <h3>
                        ${sender.name || "Unknown Student"}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${sender.email || "Not available"}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${sender.department || "Not available"}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${sender.year || "Not available"}
                    </p>

                    <p>
                        <strong>Can Teach:</strong>
                        ${
                            Array.isArray(sender.teachSkills)
                                ? sender.teachSkills.join(", ")
                                : "Not specified"
                        }
                    </p>

                    <p>
                        <strong>Wants to Learn:</strong>
                        ${
                            Array.isArray(sender.learnSkills)
                                ? sender.learnSkills.join(", ")
                                : "Not specified"
                        }
                    </p>

                    <p>
                        <strong>Status:</strong>
                        Pending
                    </p>

                    <div class="request-actions">

                        <button
                            class="accept-button"
                            onclick="acceptRequest('${request._id}')">
                            Accept
                        </button>

                        <button
                            class="reject-button"
                            onclick="rejectRequest('${request._id}')">
                            Reject
                        </button>

                    </div>
                `;
            }


            // ==================================
            // ACCEPTED REQUEST
            // ==================================

            else if (request.status === "accepted") {

                card.innerHTML = `

                    <h3>
                        ${sender.name || "Unknown Student"}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${sender.email || "Not available"}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${sender.department || "Not available"}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${sender.year || "Not available"}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        Accepted
                    </p>

                `;
            }


            // ==================================
            // REJECTED REQUEST
            // ==================================

            else if (request.status === "rejected") {

                card.innerHTML = `

                    <h3>
                        ${sender.name || "Unknown Student"}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${sender.email || "Not available"}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${sender.department || "Not available"}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${sender.year || "Not available"}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        Rejected
                    </p>

                `;
            }


            // ==================================
            // ADD CARD
            // ==================================

            requestList.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Load requests error:",
            error
        );

        requestList.innerHTML = `
            <div class="no-requests">

                <h3>Unable to Load Requests</h3>

                <p>
                    Cannot connect to the server.
                    Please try again.
                </p>

            </div>
        `;
    }
}


// ==========================================
// ACCEPT REQUEST
// ==========================================

async function acceptRequest(requestId) {

    if (!requestId) {
        alert("Invalid request ID.");
        return;
    }

    const confirmAccept = confirm(
        "Do you want to accept this request?"
    );

    if (!confirmAccept) {
        return;
    }

    try {

        const response = await fetch(
            `/api/requests/${requestId}/accept`,
            {
                method: "PUT"
            }
        );

        const data = await response.json();

        console.log(
            "Accept response:",
            data
        );


        if (response.ok) {

            alert(
                "Request accepted successfully!"
            );

            await loadRequests();

        } else {

            alert(
                data.message || "Unable to accept request."
            );

        }

    } catch (error) {

        console.error(
            "Accept request error:",
            error
        );

        alert(
            "Cannot connect to the server."
        );

    }
}


// ==========================================
// REJECT REQUEST
// ==========================================

async function rejectRequest(requestId) {

    if (!requestId) {
        alert("Invalid request ID.");
        return;
    }

    const confirmReject = confirm(
        "Do you want to reject this request?"
    );

    if (!confirmReject) {
        return;
    }

    try {

        const response = await fetch(
            `/api/requests/${requestId}/reject`,
            {
                method: "PUT"
            }
        );

        const data = await response.json();

        console.log(
            "Reject response:",
            data
        );


        if (response.ok) {

            alert(
                "Request rejected successfully!"
            );

            await loadRequests();

        } else {

            alert(
                data.message || "Unable to reject request."
            );

        }

    } catch (error) {

        console.error(
            "Reject request error:",
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

    window.location.href = "login.html";
}


// ==========================================
// START
// ==========================================

if (currentUser && userId) {

    loadRequests();

}
