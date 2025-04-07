// Fetch data for filters and populate dropdowns
function populateDropdowns() {
    fetch("https://api.jikan.moe/v4/genres/anime")
        .then(response => response.json())
        .then(data => {
            populateSelect(data.data, "genreDropdown");
        });

    fetch("https://api.jikan.moe/v4/themes/anime")
        .then(response => response.json())
        .then(data => {
            populateSelect(data.data, "themeDropdown");
        });

    fetch("https://api.jikan.moe/v4/demographics/anime")
        .then(response => response.json())
        .then(data => {
            populateSelect(data.data, "demographicDropdown");
        });

    fetch("https://api.jikan.moe/v4/seasons")
        .then(response => response.json())
        .then(data => {
            populateSelect(data.data, "seasonDropdown");
        });

    fetch("https://api.jikan.moe/v4/types/anime")
        .then(response => response.json())
        .then(data => {
            populateSelect(data.data, "typeDropdown");
        });

    fetch("https://api.jikan.moe/v4/status/anime")
        .then(response => response.json())
        .then(data => {
            populateSelect(data.data, "statusDropdown");
        });
}

function populateSelect(items, selectId) {
    const select = document.getElementById(selectId);
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.name || item.title || item.type || item.status;
        option.textContent = item.name || item.title || item.type || item.status;
        select.appendChild(option);
    });
}

// Initialize filters and dropdowns
function initializeFilters() {
    populateDropdowns();

    const searchButton = document.getElementById("searchButton");
    const randomButton = document.getElementById("randomButton");
    const searchBox = document.getElementById("searchBox");
    const clearFiltersButton = document.getElementById("clearFiltersButton");

    searchButton.addEventListener("click", () => {
        applyFilters();
    });

    randomButton.addEventListener("click", () => {
        fetchPopularAnime().then(anime => {
            if (anime.length > 0) {
                const randomAnime = anime[Math.floor(Math.random() * anime.length)];
                window.location.href = `info.html?id=${randomAnime.mal_id}`;
            }
        });
    });

    searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            applyFilters();
        }
    });

    clearFiltersButton.addEventListener("click", () => {
        clearFilters();
    });
}

// Apply filters based on dropdown selections
function applyFilters() {
    const query = document.getElementById("searchBox").value;
    const genres = Array.from(document.getElementById("genreDropdown").selectedOptions).map(option => option.value);
    const themes = Array.from(document.getElementById("themeDropdown").selectedOptions).map(option => option.value);
    const demographics = Array.from(document.getElementById("demographicDropdown").selectedOptions).map(option => option.value);
    const seasons = Array.from(document.getElementById("seasonDropdown").selectedOptions).map(option => option.value);
    const types = Array.from(document.getElementById("typeDropdown").selectedOptions).map(option => option.value);
    const statuses = Array.from(document.getElementById("statusDropdown").selectedOptions).map(option => option.value);

    let url = `search.html?q=${query}`;
    if (genres.length) url += `&genres=${genres.join(",")}`;
    if (themes.length) url += `&themes=${themes.join(",")}`;
    if (demographics.length) url += `&demographics=${demographics.join(",")}`;
    if (seasons.length) url += `&seasons=${seasons.join(",")}`;
    if (types.length) url += `&types=${types.join(",")}`;
    if (statuses.length) url += `&statuses=${statuses.join(",")}`;

    window.location.href = url;
}

// Clear all filters
function clearFilters() {
    document.getElementById("genreDropdown").selectedIndex = -1;
    document.getElementById("themeDropdown").selectedIndex = -1;
    document.getElementById("demographicDropdown").selectedIndex = -1;
    document.getElementById("seasonDropdown").selectedIndex = -1;
    document.getElementById("typeDropdown").selectedIndex = -1;
    document.getElementById("statusDropdown").selectedIndex = -1;
}

// Ensure the function is called on all pages where the header is loaded
document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            // Initialize search and random functionality after loading the header
            initializeSearchAndRandom();
            initializeFilters();
        });
});
