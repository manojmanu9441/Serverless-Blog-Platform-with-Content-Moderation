const apiGatewayUrl = "https://x0t22jrakh.execute-api.us-east-1.amazonaws.com/Prod/";

document.addEventListener("DOMContentLoaded", fetchBlogs);

async function fetchBlogs() {
    try {
        const response = await fetch(`${apiGatewayUrl}getBlogs`);
        const rawData = await response.json();
        const data = typeof rawData.body === "string" ? JSON.parse(rawData.body) : rawData;

        const container = document.getElementById("postsContainer");
        container.innerHTML = "";

        if (!data.success || !Array.isArray(data.blogs)) {
            return;
        }

        data.blogs.forEach((blog) => {
            const postElement = document.createElement("div");
            postElement.classList.add("blog-post");
            postElement.innerHTML = `
                <h3>${blog.title}</h3>
                <p><strong>By:</strong> ${blog.userId}</p>
                <p>${blog.content}</p>
                ${blog.imageUrl ? `<img src="${blog.imageUrl}" alt="Blog Image">` : ""}
            `;
            container.appendChild(postElement);
        });
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
    }
}
