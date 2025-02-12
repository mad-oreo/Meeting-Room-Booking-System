function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Insert favicon into <head>
function loadFavicon() {
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/x-icon';
    faviconLink.href = "/public/img/Coat_of_Arms_of_Kuala_Lumpur.svg"; // update this path as needed
    document.head.appendChild(faviconLink);
}
loadFavicon();
// Call the function to load the header
loadHeader();
// Call the function to load the footer
loadFooter();