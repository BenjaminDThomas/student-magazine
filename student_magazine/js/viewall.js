fetch("../student_magazine/data/articles.json")
.then(res => res.json())
.then(articles => {
    const container = document.querySelector("#articles-list");
    articles.forEach(article => {
        const card = document.createElement("section");
        card.innerHTML = `<img src="${article.sections.find(s => s.type === 'image')?.src}" /> <h3>${article.title}</h3> <a href="article.html?id=${article.id}">Read More</a>`;
        container.appendChild(card);
    });
});