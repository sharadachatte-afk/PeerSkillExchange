console.log("Requests JavaScript loaded!");


// ==========================================
// GET CURRENT LOGGED-IN USER
// ==========================================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ==========================================
// REQUEST LIST ELEMENT
// ==========================================

const requestList =
    document.getElementById("requestList");


// ==========================================
// CHECK LOGIN
// ==========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==========================================
// LOAD RECEIVED REQUESTS
// ==========================================

async function loadRequests() {

    if (!currentUser) {
        return;
    }

    requestList.innerHTML = `
        <p>Loading requests...</p>
    `;


    try {

        const response = await fetch(
            `http://localhost:5000/api/requests/${currentUser.id}`
        );


        const requests =
            await response.json();


        // ======================================
        // CHECK SERVER RESPONSE
        // ======================================

        if (!response.ok) {

            requestList.innerHTML = `
                <p>${requests.message}</p>
            `;

            return;
        }


        // Clear loading message
        requestList.innerHTML = "";


        // ======================================
        // NO REQUESTS
        // ======================================

        if (requests.length === 0) {

            requestList.innerHTML = `
                <p>No connection requests yet.</p>
            `;

            return;
        }


        // ======================================
        // DISPLAY REQUESTS
        // ======================================

        requests.forEach(request => {

            const card =
                document.createElement("div");

            card.className = "request-card";


            // ==================================
            // CHECK SENDER
            // ==================================

            if (!request.sender) {

                card.innerHTML = `
                    <p>Sender information unavailable.</p>
                `;

                requestList.appendChild(card);

                return;
            }


            // ==================================
            // PENDING REQUEST
            // ==================================

            if (request.status === "pending") {

                card.innerHTML = `

                    <h3>
                        ${request.sender.name}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${request.sender.email}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${request.sender.department}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${request.sender.year}
                    </p>

                    <p>
                        <strong>Can Teach:</strong>
                        ${request.sender.teachSkills.join(", ")}
                    </p>

                    <p>
                        <strong>Wants to Learn:</strong>
                        ${request.sender.learnSkills.join(", ")}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        Pending
                    </p>

                    <button
                        onclick="acceptRequest('${request._id}')">
                        Accept
                    </button>

                    <button
                        onclick="rejectRequest('${request._id}')">
                        Reject
                    </button>
                `;

            }


            // ==================================
            // ACCEPTED REQUEST
            // ==================================

            else if (request.status === "accepted") {

                card.innerHTML = `

                    <h3>
                        ${request.sender.name}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${request.sender.email}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${request.sender.department}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${request.sender.year}
                    </p>

                    <p>
                        <strong>Matched Peer:</strong>
                        ${request.sender.name}
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
                        ${request.sender.name}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${request.sender.email}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${request.sender.department}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${request.sender.year}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        Rejected
                    </p>
                `;

            }


            // ==================================
            // ADD CARD TO PAGE
            // ==================================

            requestList.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Load requests error:",
            error
        );

        requestList.innerHTML = `
            <p>
                Cannot connect to the server.
                Please make sure the backend is running.
            </p>
        `;

    }
}


// ==========================================
// ACCEPT REQUEST
// ==========================================

async function acceptRequest(requestId) {

    const confirmAccept =
        confirm("Do you want to accept this request?");


    if (!confirmAccept) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/requests/${requestId}/accept`,
            {
                method: "PUT"
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Request accepted successfully!"
            );

            // Reload requests
            loadRequests();

        } else {

            alert(data.message);

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

    const confirmReject =
        confirm("Do you want to reject this request?");


    if (!confirmReject) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/requests/${requestId}/reject`,
            {
                method: "PUT"
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Request rejected successfully!"
            );

            // Reload requests
            loadRequests();

        } else {

            alert(data.message);

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
// START
// ==========================================

if (currentUser) {
    loadRequests();
}