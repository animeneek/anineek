document.addEventListener("DOMContentLoaded", function () {
    initializeSearchAndRandom();
    initializeFilters();
});

function initializeSearchAndRandom() {
    const searchButton = document.getElementById("searchButton");
    const randomButton = document.getElementById("randomButton");
    const searchBox = document.getElementById("searchBox");

    searchButton.addEventListener("click", () => {
        const query = searchBox.value;
        if (query) {
            window.location.href = `search.html?q=${query}`;
        } else {
            fetchAllAnime();
        }
    });

    randomButton.addEventListener("click", () => {
        fetchPopularAnime().then(anime => {
            if (anime.length > 0) {
                const randomAnime = anime[Math.floor(Math.random() * anime.length)];
                window.location.href = `info.html?id=${randomAnime.mal_id}`;
            }
        });
    });
}

function initializeFilters() {
    const dropdowns = {
        genres: document.getElementById("genres"),
        themes: document.getElementById("themes"),
        demographics: document.getElementById("demographics"),
        seasons: document.getElementById("seasons"),
        types: document.getElementById("types"),
        status: document.getElementById("status")
    };

    // Fetch and populate dropdowns
    fetchGenres(dropdowns.genres);
    fetchThemes(dropdowns.themes);
    fetchDemographics(dropdowns.demographics);
    fetchSeasons(dropdowns.seasons);
    fetchTypes(dropdowns.types);
    fetchStatus(dropdowns.status);

    // Add event listeners for filtering
    Object.values(dropdowns).forEach(dropdown => {
        dropdown.addEventListener("change", () => filterResults());
    });

    document.getElementById("clearFilters").addEventListener("click", clearFilters);
}

// Example function to fetch genres
function fetchGenres(dropdown) {
    fetch('https://api.jikan.moe/v4/genres/anime')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(genre => {
                const option = document.createElement("option");
                option.value = genre.mal_id;
                option.textContent = genre.name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching genres:', error));
}

// Implement similar fetch functions for themes, demographics, seasons, types, and status

function clearFilters() {
    const dropdowns = document.querySelectorAll("#filters select");
    dropdowns.forEach(dropdown => {
        dropdown.selectedIndex = 0; // Reset to default
    });
    fetchAllAnime(); // Optionally fetch and display all results again
}

// Implement the fetchAllAnime and fetchFilteredAnime functions as needed
