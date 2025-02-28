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

        console.log("📢 Response Status:", response.status);

        // Check if response is successful
        if (!response.ok) {
            console.error(`❌ Error: ${response.status} ${response.statusText}`);
            alert(`Failed to fetch posts: ${response.statusText}`);
            return;
        }

        // Read response as text (to debug issues)
        const responseBody = await response.text();
        console.log("📢 Raw Response:", responseBody);

        let data;
        try {
            data = JSON.parse(responseBody);
        } catch (jsonError) {
            console.error("❌ JSON Parse Error:", jsonError);
            alert("Invalid JSON response from server.");
            return;
        }

        if (!Array.isArray(data)) {
            console.error("❌ Unexpected response format:", data);
            alert("Unexpected response from the server.");
            return;
        }

        // Display posts
        const myPostsList = document.getElementById("myPostsList");
        myPostsList.innerHTML = ""; // Clear previous content

        if (data.length === 0) {
            myPostsList.innerHTML = "<p>No posts found!</p>";
            return;
        }

        data.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.imageUrl ? `<img src="${post.imageUrl}" width="200" loading="lazy">` : ""}
                <hr>
            `;
            myPostsList.appendChild(li);
        });

    } catch (error) {
        console.error("❌ Network or API Error:", error);
        alert("An error occurred while fetching posts.");
    }
}

// ✅ Ensure function runs after page fully loads
window.onload = () => {
    console.log("🚀 Page loaded, fetching posts...");
    fetchMyPosts();
};
