const newsContent = document.getElementById("newsContent");

db.collection("news").onSnapshot((snapshot) => {
    newsContent.innerHTML = ""; // Limpia las noticias anteriores
    snapshot.forEach((doc) => {
        const data = doc.data();
        const article = document.createElement("article");
        article.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p>`;
        newsContent.appendChild(article);
    });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
});
