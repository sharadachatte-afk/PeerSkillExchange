console.log("Login JavaScript loaded!");

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;


    // Check empty fields
    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }


    try {

        // Send login request to backend
        const response = await fetch("/api/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });


        const data = await response.json();


        // Login successful
        if (response.ok) {

            alert("Login successful!");

            // Save logged-in user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            // Go to dashboard
            window.location.href = "dashboard.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("Login error:", error);

        alert(
            "Cannot connect to the server. Please make sure the backend is running."
        );
    }

});
