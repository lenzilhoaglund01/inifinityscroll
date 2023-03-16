const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = 'bHtKGbL6fTFwwLOJFiWNZmAezGxzwR49LI43WcdUkBw';
const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Help Funciton to Set Attribut on DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> (anchor element) to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(unsplashApiUrl);
        photosArray = await response.json();
        displayPhotos();

        // Add event listener to check when the user has scrolled to the bottom of the page
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
                getPhotos();
            }
        });
    } catch (error) {
        // Catch Error Here
    }
}


// On Load
 
getPhotos();
