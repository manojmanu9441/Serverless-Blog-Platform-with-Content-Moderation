const apiGatewayUrl = "https://x0t22jrakh.execute-api.us-east-1.amazonaws.com/Prod/";

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
    }

    document.getElementById("postForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const content = document.getElementById("content").value.trim();
        const imageFile = document.getElementById("imageUpload").files[0];
        const userId = localStorage.getItem("userId");  // ✅ Get logged-in user ID

        if (!userId) {
            alert("You are not logged in. Please log in again.");
            window.location.href = "login.html";
            return;
        }

        if (!title || !content) {
            alert("Please enter a title and content.");
            return;
        }

        let base64Image = "";
        if (imageFile) {
            base64Image = await convertToBase64(imageFile);
        }

        const requestData = { userId, title, content, image: base64Image };

        try {
            const response = await fetch(`${apiGatewayUrl}uploadBlog`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (data.success) {
                alert("Blog posted successfully!");
                document.getElementById("postForm").reset();
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            alert("Upload failed: " + error.message);
        }
    });
});

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
    });
}
