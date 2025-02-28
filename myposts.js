const apiUrl = "https://x0t22jrakh.execute-api.us-east-1.amazonaws.com/Prod";

async function fetchMyPosts() {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    if (!userId) {
        alert("User not logged in");
        return;
    }

    const requestUrl = `${apiUrl}/getMyPosts?userId=${userId}`;
    console.log("Fetching posts from:", requestUrl); // ✅ Debugging log

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseBody = await response.text(); // Read raw response
        console.log("Raw response:", responseBody); // ✅ Debugging log

        const data = JSON.parse(responseBody); // Convert response body to JSON

        if (!Array.isArray(data)) {
            console.error("Unexpected response format:", data);
            return;
        }

        const myPostsList = document.getElementById("myPostsList");
        myPostsList.innerHTML = "";

        if (data.length === 0) {
            myPostsList.innerHTML = "<p>No posts found!</p>";
            return;
        }

        data.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.imageUrl ? `<img src="${post.imageUrl}" width="200">` : ""}
                <hr>
            `;
            myPostsList.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching my posts:", error);
    }
}

// Fetch posts when the page loads
window.onload = fetchMyPosts;
