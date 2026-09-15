console.log("Profile JavaScript loaded!");


const profileForm =
    document.getElementById("profileForm");


// ==========================================
// GET CURRENT USER
// ==========================================

let currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// ==========================================
// CHECK LOGIN
// ==========================================

if (!currentUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==========================================
// DISPLAY CURRENT INFORMATION
// ==========================================

if (currentUser) {

    document.getElementById("profileName").value =
        currentUser.name || "";

    document.getElementById("profileEmail").value =
        currentUser.email || "";

    document.getElementById("profileDepartment").value =
        currentUser.department || "";

    document.getElementById("profileYear").value =
        currentUser.year || "";

    document.getElementById("profileTeachSkills").value =
        (currentUser.teachSkills || []).join(", ");

    document.getElementById("profileLearnSkills").value =
        (currentUser.learnSkills || []).join(", ");

}


// ==========================================
// SAVE PROFILE
// ==========================================

profileForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("profileName")
            .value.trim();

        const department =
            document.getElementById("profileDepartment")
            .value.trim();

        const year =
            document.getElementById("profileYear")
            .value.trim();


        const teachSkills =
            document.getElementById("profileTeachSkills")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");


        const learnSkills =
            document.getElementById("profileLearnSkills")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");


        try {

            const response = await fetch(
                `/api/users/${currentUser.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        department: department,

                        year: year,

                        teachSkills: teachSkills,

                        learnSkills: learnSkills

                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert("Profile updated successfully!");


                // Update localStorage
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(data.user)
                );


                // Update current user variable
                currentUser = data.user;

            } else {

                alert(data.message);

            }


        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );

            alert(
                "Cannot connect to the server."
            );

        }

    }
);
