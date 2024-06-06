console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Function to filter breeds based on selected letter
    function filterBreeds(letter) {
        const breedList = document.getElementById('dog-breeds');
        const breeds = breedList.getElementsByTagName('li');

        // Loop through all breeds and show/hide based on the selected letter
        for (const breed of breeds) {
            if (breed.textContent.startsWith(letter)) {
                breed.style.display = 'block';
            } else {
                breed.style.display = 'none';
            }
        }
    }

    // Fetch and display random dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            const breedList = document.getElementById('dog-breeds');
            for (const breed in breeds) {
                const li = document.createElement('li');
                li.textContent = breed;
                breedList.appendChild(li);
            }

            // Add event listener to dropdown for filtering breeds
            const dropdown = document.getElementById('breed-dropdown');
            dropdown.addEventListener('change', () => {
                const selectedLetter = dropdown.value;
                filterBreeds(selectedLetter);
            });
        })
        .catch(error => console.error('Error fetching breeds:', error));
});
