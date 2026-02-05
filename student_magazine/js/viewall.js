/*
----------------------
Retrieve Article File
----------------------
*/

fetch("../student_magazine/data/articles.json")                                         // converts json to js
.then(res => res.json())
.then(articles => {
    const container = document.querySelector("#articles-list");
    articles.forEach(article => {                                                       // for loop for each article stored
        const card = document.createElement("div");
        card.classList.add("article-card");                                             // creates a wrapper for an article
        const imageSection = article.sections.find(s => s.type === "image");            // finds first found article image for the banne
        const introSection = article.sections.find(s => s.type === "paragraph");        // finds first paragraph for info regarding the article
        card.innerHTML = `<a href="article.html?id=${article.id}" class="card-link">
        <img src="${imageSection ? imageSection.src : ""}" />
        <section class="overlay">
            <h3>${article.title}</h3>
            <p>${introSection ? introSection.text.slice(0, 120) + "..." : ""}</p>
            <span class="read-more">Read More</span>
        </section></a>`;                                                                // limits overlay section to 120 characters to not extend the length with 'Read More' after the displayed content
        document.querySelector("#articles-list").appendChild(card);                     // appends the list of article to the wrapper 'card'
    });
});