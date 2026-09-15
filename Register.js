console.log("Register JavaScript loaded!");

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const department = document.getElementById("department").value.trim();
    const year = document.getElementById("year").value;

    const teachSkills = document.getElementById("teachSkills").value
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    const learnSkills = document.getElementById("learnSkills").value
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    const student = {
        name,
        email,
        password,
        department,
        year,
        teachSkills,
        learnSkills
    };

    try {

        const response = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (response.ok) {

            alert("Registration successful!");

            // Save user information for the dashboard
            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            window.location.href = "login.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("Registration error:", error);

        alert(
            "Cannot connect to the server. Make sure the backend is running."
        );

    }

});
