'use strict';

// Get the navbar elements
const links = document.querySelectorAll('.navbar-nav li a');
const { URL } = document;

for (const link of links) {
    // The id is the last word in path
    const id = link.href.split('/').pop();
    // The URL is broken into separate words
    // either by slash or minus
    const words = URL.split(/[?]/).shift().split(/[/-]/);
    if (words.includes(id)) {
        link.style.color = 'red';
    }
}

// This works only if the category ID
// is included into link
