async function fetchMyPosts() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("❌ User ID is missing in local storage!");
        alert("User not logged in. Please log in to view your posts.");
        window.location.href = "login.html";
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

        if (!response.ok) {
            console.error(`❌ Error: ${response.status} ${response.statusText}`);
            alert(`Failed to fetch posts: ${response.statusText}`);
            return;
        }

        // Parse response as JSON
        const data = await response.json();
        console.log("📢 API Response Data:", data);

        // ✅ Fix: Extract the actual posts array from `data.body`
        const posts = typeof data.body === "string" ? JSON.parse(data.body) : data.body;

        if (!Array.isArray(posts)) {
            console.error("❌ Unexpected response format:", posts);
            alert("Unexpected response from the server.");
            return;
        }

        // Display posts
        const myPostsList = document.getElementById("myPostsList");
        myPostsList.innerHTML = "";

        if (posts.length === 0) {
            myPostsList.innerHTML = "<p>No posts found!</p>";
            return;
        }

        posts.forEach(post => {
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
