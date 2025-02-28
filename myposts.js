const apiUrl = "https://x0t22jrakh.execute-api.us-east-1.amazonaws.com/Prod";

async function fetchMyPosts() {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    if (!userId) {
        console.error("❌ User ID is missing in local storage!");
        alert("User not logged in");
        return;
    }

    const requestUrl = `${apiUrl}/getMyPosts?userId=${encodeURIComponent(userId)}`;
    console.log("📢 Fetching posts from:", requestUrl);

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const responseBody = await response.text();
        console.log("📢 Raw response:", responseBody);

        const data = JSON.parse(responseBody);

        if (!Array.isArray(data)) {
            console.error("❌ Unexpected response format:", data);
            return;
        }

        // Display posts
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
        console.error("❌ Error fetching my posts:", error);
    }
}

// Fetch posts when the page loads
window.onload = fetchMyPosts;
