function initializeSearchAndRandom() {
    const searchButton = document.getElementById("searchButton");
    const randomButton = document.getElementById("randomButton");
    const searchBox = document.getElementById("searchBox");

    searchButton.addEventListener("click", () => {
        const query = searchBox.value;
        if (query) {
            window.location.href = `search.html?q=${query}`;
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

    // Initialize filters
    initializeFilters();
}

function initializeFilters() {
    const genresDropdown = document.getElementById("genres");
    const themesDropdown = document.getElementById("themes");
    const demographicsDropdown = document.getElementById("demographics");
    const seasonsDropdown = document.getElementById("seasons");
    const typesDropdown = document.getElementById("types");
    const statusDropdown = document.getElementById("status");

    // Fetch and populate dropdowns with data from MyAnimeList API
    fetchGenres(genresDropdown);
    fetchThemes(themesDropdown);
    fetchDemographics(demographicsDropdown);
    fetchSeasons(seasonsDropdown);
    fetchTypes(typesDropdown);
    fetchStatus(statusDropdown);

    // Add event listeners for filtering
    const dropdowns = [genresDropdown, themesDropdown, demographicsDropdown, seasonsDropdown, typesDropdown, statusDropdown];
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", () => filterResults());
    });

    document.getElementById("clearFilters").addEventListener("click", clearFilters);
}

function filterResults() {
    // Get selected values from dropdowns
    const selectedGenres = Array.from(document.getElementById("genres").selectedOptions).map(option => option.value);
    const selectedThemes = Array.from(document.getElementById("themes").selectedOptions).map(option => option.value);
    const selectedDemographics = Array.from(document.getElementById("demographics").selectedOptions).map(option => option.value);
    const selectedSeasons = Array.from(document.getElementById("seasons").selectedOptions).map(option => option.value);
    const selectedTypes = Array.from(document.getElementById("types").selectedOptions).map(option => option.value);
    const selectedStatus = Array.from(document.getElementById("status").selectedOptions).map(option => option.value);

    // Implement filtering logic based on selected values
    // Update the displayed results accordingly
}

function clearFilters() {
    const dropdowns = document.querySelectorAll("#filters select");
    dropdowns.forEach(dropdown => {
        dropdown.selectedIndex = 0; // Reset to default
    });
    // Optionally fetch and display all results again
}

// Functions to fetch dropdown options from MyAnimeList API
function fetchGenres(dropdown) {
    // Fetch genres from MyAnimeList API and populate dropdown
}

function fetchThemes(dropdown) {
    // Fetch themes from MyAnimeList API and populate dropdown
}

function fetchDemographics(dropdown) {
    // Fetch demographics from MyAnimeList API and populate dropdown
}

function fetchSeasons(dropdown) {
    // Fetch seasons from MyAnimeList API and populate dropdown
}

function fetchTypes(dropdown) {
    // Fetch types from MyAnimeList API and populate dropdown
}

function fetchStatus(dropdown) {
    // Fetch status from MyAnimeList API and populate dropdown
}
