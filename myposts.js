const apiUrl = "https://x0t22jrakh.execute-api.us-east-1.amazonaws.com/Prod"; // API Gateway URL

// Function to fetch and display the current user's posts
async function fetchMyPosts() {
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    if (!userId) {
        alert("User not logged in");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/getMyPosts?userId=${userId}`);
        const data = await response.json();

        const myPostsList = document.getElementById("myPostsList");
        myPostsList.innerHTML = ""; // Clear old posts

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
