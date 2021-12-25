'use strict';

// This code changes dropdown label into
// text of selected variant

const listItems = document.querySelectorAll('.dropdown-menu li');

for (const element of listItems) {
  element.addEventListener('click', (event) => {
    const { target } = event;
    const buttonLabel = target.parentNode.previousElementSibling;
    buttonLabel.innerHTML = target.textContent + ' <span class="caret"></span>';
  });
}
