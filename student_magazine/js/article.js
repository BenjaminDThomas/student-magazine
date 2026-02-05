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

    document.querySelector("#article-title").textContent = article.title;       // returns first matching element for 'article-title'
    document.querySelector("#article-author").textContent = article.author;     // returns first matching element for 'article-author'
    
    const contentSection = document.querySelector("#article-content");          // returns first matching element for 'article-content'
    contentSection.innerHTML = "";
    let imageCount = 0;
    
    for (let i = 0; i < article.sections.length; i++) {                         // for loop to go through the amount of sections stored
        const section = article.sections[i];
        
        if(section.type === "paragraph") {                                      // checks each stored article if the section has the type 'paragraph'
            const p = document.createElement("p");                              // creates paragraph
            p.innerHTML = section.text;                                         // lets html link tags work from json
            contentSection.appendChild(p);                                      // appends content to paragraph
        }
        else if(section.type === "heading") {                                   // checks each stored article if the section has the type 'heading'
            const h2 = document.createElement("h2");                            // creates heading
            h2.textContent = section.text;                                        
            contentSection.appendChild(h2);                                     // appends content to heading
        }
        else if(section.type === "subheading") {                                // checks each stored article if the section has the type 'subheading'
            const h3 = document.createElement("h3");                            // creates subheading
            h3.textContent = section.text;                                        
            contentSection.appendChild(h3);                                     // appends content to subheading
        }
        else if(section.type === "image") {                                     // checks each stored article if the section has the type 'image'
            imageCount++;
            
            if(imageCount === 1) {
                const img = document.createElement("img");                      // creates image element
                img.src = section.src;
                img.classList.add("article-banner");
                contentSection.appendChild(img);                                // appends content to image
            }
            else {
                const row = document.createElement("div");                      // creates a div for the image
                row.classList.add("media-row");
                row.classList.add((imageCount - 2) % 2 === 0 ? "left" : "right");   // keeps track of imageCount to set image either left or right

                const img = document.createElement("img");                      // creates image element
                img.src = section.src;
                img.classList.add("media-img");                                 // assigns class 'media-img' to the image element

                const text = document.createElement("div");
                text.classList.add("media-text");                               // assigns class 'media-text' to the element

                let consumed = 0;                                               // tracks paragraphs consumed
                while (consumed < 2) {                                          // loops till it has consumed 2 paragraphs or runs out
                    const next = article.sections[i + 1];                       // looks at next section
                    if (!next || next.type !== "paragraph") break;              // stops if no more sections or next isn't a paragraph

                    const p = document.createElement("p");                      // creates element 'p'
                    p.innerHTML = next.text;
                    text.appendChild(p);                                        // appends to 'text' element
                    i++;                                                        // increments to skip this section in main loop
                    consumed++;                                                 // increments consumed counter
                }
                
                row.appendChild(img);                                           // appends image to row                          
                row.appendChild(text);                                          // appends text to row
                contentSection.appendChild(row);                                // appends row to content section
            }
        }
    }
    console.log(article);                                                       // articles outputs the array of article objects (connection test)
});