'use strict';

// This code changes dropdown label into
// text of selected variant

$('.dropdown-menu li').click(function() {
    const selectedText = $(this).text();
    $(this)
        .parents('.btn-group')
        .find('.dropdown-toggle')
        .html(selectedText + ' <span class="caret"></span>');
});
