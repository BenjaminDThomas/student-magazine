/*
----------------------
Read URL ID
----------------------
*/

const paramater = new URLSearchParams(window.location.search);                  // read id from url
const articleId = paramater.get("id");                                          // extract id value from search

/*
----------------------
Retrieve Article File
----------------------
*/

fetch("../student_magazine/data/articles.json")
.then(response => response.json())                                              // converts json to js
.then(articles => {
    let article = articles.find(a => a.id == articleId);                        // loops through articles so article id matches
    if(!article){
        article = articles[0];                                                  // if no matches found, shows first article
    }

    document.querySelector("#article-title").textContent = article.title;       // returns first matching element for 'article-content'
    document.querySelector("#article-author").textContent = article.author;     // returns first matching element for 'article-author'
    
    const contentSection = document.querySelector("#article-content");          // returns first matching element for 'article-content'
    article.sections.forEach(section => {
        if(section.type === "paragraph") {                                      // checks each stored article if the section has the type 'paragraph'
            const p = document.createElement("p");                              // creates paragraph
            p.innerHTML = section.text;                                         // lets html link tags work from json
            contentSection.appendChild(p);                                      // appends content to paragraph
        }
        if(section.type === "heading") {                                        // checks each stored article if the section has the type 'heading'
            const h2 = document.createElement("h2");                            // creates heading
            h2.textContent = section.text;                                        
            contentSection.appendChild(h2);                                     // appends content to heading
        }
        if(section.type === "subheading") {                                     // checks each stored article if the section has the type 'subheading'
            const h3 = document.createElement("h3");                            // creates subheading
            h3.textContent = section.text;                                        
            contentSection.appendChild(h3);                                     // appends content to subheading
        }
        if(section.type === "image") {                                          // checks each stored article if the section has the type 'image'
            const img = document.createElement("img");                          // creates image
            img.src = section.src;                                        
            contentSection.appendChild(img);                                    // appends content to image
        }
    });
    console.log(article);                                                       // articles outputs the array of article objects (connection test)
});