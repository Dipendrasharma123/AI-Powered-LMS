// Home Section Starts
var menuBtn = document.querySelector('.main-navbar .menu-btn');
var menuList = document.querySelector('.main-navbar .nav-list');
var menuListItems = document.querySelectorAll('.nav-list li a');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menuList.classList.toggle('active');
});

for(var i = 0; i < menuListItems.length; i++){
	menuListItems[i].addEventListener('click', menuItemClicked);
}
function menuItemClicked(){
	menuBtn.classList.remove('active');
	menuList.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', pageScrollFunction);
window.addEventListener('load', pageScrollFunction);

function pageScrollFunction(){
	if(window.scrollY > 120){
		homeSection.classList.add('active');
	}
	else{
		homeSection.classList.remove('active');
	}
}
// Home Section Ends

//Signup section Starts
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent page reload

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Validate inputs
            if (name === "" || email === "" || password === "" || confirmPassword === "") {
                alert("Please fill in all fields.");
                return;
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }

            try {
                // API Call for Signup
                const response = await fetch("http://localhost:5000/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, confirmPassword }),
                });

                const data = await response.json();
                alert(data.message);

                if (response.ok) {
                    window.location.href = "login.html"; // Redirect to login page
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
            }
        });
    }
});
//Signup section Ends

// Login section Starts
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent page reload

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            try {
                // API Call for Login
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.message || "Invalid credentials!");
                    return;
                }

                const data = await response.json();
                localStorage.setItem("token", data.token);

                // ✅ Direct Redirect to Dashboard (No Alert)
                window.location.replace("dashboard.html");

            } catch (error) {
                console.error("Login Error:", error);
            }
        });
    }
});

// Login section Ends

document.addEventListener("DOMContentLoaded", function () {
    const courses = [
        { id: "development", name: "Development", page: "course-category.html?course=development" },
        { id: "designing", name: "Designing", page: "course-category.html?course=designing" },
        { id: "photography", name: "Photography", page: "course-category.html?course=photography" },
        { id: "video-editing", name: "Video Editing", page: "course-category.html?course=video-editing" },
        { id: "html-css", name: "HTML & CSS", page: "course-details.html?course=html-css" },
        { id: "javascript", name: "JavaScript", page: "course-details.html?course=javascript" },
        { id: "cloud-computing", name: "Cloud Computing", page: "course-details.html?course=cloud-computing" },
        { id: "ai", name: "Artificial Intelligence", page: "course-details.html?course=ai" },
        { id: "machine-learning", name: "Machine Learning", page: "course-details.html?course=machine-learning" }
    ];

    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchResults = document.getElementById("search-results");

    function searchCourse() {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = ""; // Clear previous results

        if (query === "") {
            searchResults.style.display = "none";
            return;
        }

        // Filter courses based on search input
        const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(query));

        if (filteredCourses.length === 0) {
            searchResults.innerHTML = "<div class='search-item'>No courses found</div>";
        } else {
            filteredCourses.forEach(course => {
                const courseItem = document.createElement("div");
                courseItem.classList.add("search-item");
                courseItem.innerHTML = `<a href="${course.page}">${course.name}</a>`;
                searchResults.appendChild(courseItem);

                // Redirect to course page when clicking the result
                courseItem.addEventListener("click", () => {
                    window.location.href = course.page;
                });
            });
        }

        searchResults.style.display = "block"; // Show search results
    }

    // Trigger search on typing
    searchInput.addEventListener("keyup", searchCourse);

    // Trigger search on clicking the search icon
    searchBtn.addEventListener("click", searchCourse);

    // Hide search results when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchResults.contains(event.target) && event.target !== searchInput) {
            searchResults.style.display = "none";
        }
    });
});
