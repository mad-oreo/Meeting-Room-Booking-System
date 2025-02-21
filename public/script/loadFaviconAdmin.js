//Insert favicon into <head>
 export function loadFavicon() {
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/x-icon';
    faviconLink.href = "/public/img/Coat_of_Arms_of_Kuala_Lumpur.svg"; // update this path as needed
    document.head.appendChild(faviconLink);
}
loadFavicon();