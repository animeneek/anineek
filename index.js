function initializeSearchAndRandom() {
    const searchButton = document.getElementById("searchButton");
    const randomButton = document.getElementById("randomButton");
    const searchBox = document.getElementById("searchBox");

    searchButton.addEventListener("click", () => {
        const query = searchBox.value;
        applyFiltersAndSearch(query);
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
            const query = searchBox.value;
            applyFiltersAndSearch(query);
        }
    });

    document.getElementById("applyFilterButton").addEventListener("click", () => {
        const query = searchBox.value;
        applyFiltersAndSearch(query);
    });
}

function applyFiltersAndSearch(query) {
    const genreFilter = document.getElementById("genreFilter").selectedOptions;
    const themeFilter = document.getElementById("themeFilter").selectedOptions;
    const demographicFilter = document.getElementById("demographicFilter").selectedOptions;
    const yearFilter = document.getElementById("yearFilter").value;
    const typeFilter = document.getElementById("typeFilter").value;
    const statusFilter = document.getElementById("statusFilter").value;

    const genres = Array.from(genreFilter).map(option => option.value).join(",");
    const themes = Array.from(themeFilter).map(option => option.value).join(",");
    const demographics = Array.from(demographicFilter).map(option => option.value).join(",");

    let searchUrl = `search.html?q=${query}`;
    if (genres) searchUrl += `&genre=${genres}`;
    if (themes) searchUrl += `&theme=${themes}`;
    if (demographics) searchUrl += `&demographic=${demographics}`;
    if (yearFilter) searchUrl += `&year=${yearFilter}`;
    if (typeFilter) searchUrl += `&type=${typeFilter}`;
    if (statusFilter) searchUrl += `&status=${statusFilter}`;

    window.location.href = searchUrl;
}
