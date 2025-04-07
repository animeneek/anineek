document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const page = parseInt(urlParams.get("page")) || 1;
    const genres = urlParams.get("genres") ? urlParams.get("genres").split(",") : [];
    const themes = urlParams.get("themes") ? urlParams.get("themes").split(",") : [];
    const demographics = urlParams.get("demographics") ? urlParams.get("demographics").split(",") : [];
    const seasons = urlParams.get("seasons") ? urlParams.get("seasons").split(",") : [];
    const types = urlParams.get("types") ? urlParams.get("types").split(",") : [];
    const statuses = urlParams.get("statuses") ? urlParams.get("statuses").split(",") : [];
    const animeResults = document.getElementById("animeResults");
    const pagination = document.getElementById("pagination");
    const searchTitle = document.getElementById("searchTitle");
    const RESULTS_PER_PAGE = 25;

    if (!query) {
        animeResults.innerHTML = "<p>No search query provided.</p>";
        return;
    }

    searchTitle.innerText = `Results for: ${query}`;

    let apiURL = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=${RESULTS_PER_PAGE}`;

    // Append filters to API URL
    if (genres.length) apiURL += `&genres=${genres.join(",")}`;
    if (themes.length) apiURL += `&themes=${themes.join(",")}`;
    if (demographics.length) apiURL += `&demographics=${demographics.join(",")}`;
    if (seasons.length) apiURL += `&seasons=${seasons.join(",")}`;
    if (types.length) apiURL += `&types=${types.join(",")}`;
    if (statuses.length) apiURL += `&statuses=${statuses.join(",")}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            animeResults.innerHTML = "";
            if (data.data.length === 0) {
                animeResults.innerHTML = "<p>No results found.</p>";
                return;
            }
            fetch("animeneek.json")
                .then(response => response.json())
                .then(animeData => {
                    data.data.forEach(anime => {
                        const episodes = anime.episodes !== null ? `${anime.episodes} EPS` : "? EPS";
                        const status = anime.status === "Finished Airing" ? "Fin" : anime.status === "Currently Airing" ? "Airing" : "Soon";
                        const hentai = anime.type === "Hentai" ? `<span class="detail-box hen">HEN</span>` : "";
                        const sources = animeData.find(item => item["data-mal-id"] == anime.mal_id)?.episodes || [];
                        const sub = sources.some(ep => ep["data-ep-lan"].toLowerCase() === "sub") ? `<span class="detail-box sub">SUB</span>` : "";
                        const dub = sources.some(ep => ep["data-ep-lan"].toLowerCase() === "dub") ? `<span class="detail-box dub">DUB</span>` : "";
                        const raw = sources.some(ep => ep["data-ep-lan"].toLowerCase() === "raw") ? `<span class="detail-box raw">RAW</span>` : "";

                        const animeItem = document.createElement("div");
                        animeItem.className = "anime-item";
                        animeItem.innerHTML = `
                            <a href="info.html?id=${anime.mal_id}">
                                <div class="poster-container">
                                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="anime-poster" data-mal-id="${anime.mal_id}">
                                    <div class="overlay"></div>
                                    <div class="play-button"><i class="fa-solid fa-play"></i></div>
                                </div>
                            </a>
                            <div class="anime-title">${anime.title}</div>
                            <div class="anime-details">
                                ${hentai}
                                <span class="detail-box">${anime.type}</span>
                                <span class="detail-box">${episodes}</span>
                                ${sub}
                                ${dub}
                                ${raw}
                                <span class="detail-box">${status}</span>
                            </div>
                        `;
                        animeResults.appendChild(animeItem);
                    });

                    // Pagination
                    const totalResults = data.pagination.items.total;
                    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
                    pagination.innerHTML = "";
                    if (page > 1) {
                        const prevLink = document.createElement("a");
                        prevLink.href = `search.html?q=${query}&page=${page - 1}`;
                        prevLink.className = "pagination-link";
                        prevLink.textContent = "<";
                        pagination.appendChild(prevLink);
                    }
                    for (let i = page - 2; i <= page + 2; i++) {
                        if (i > 0 && i <= totalPages) {
                            const pageLink = document.createElement("a");
                            pageLink.href = `search.html?q=${query}&page=${i}`;
                            pageLink.className = "pagination-link";
                            pageLink.textContent = i;
                            if (i === page) {
                                pageLink.style.backgroundColor = "#555";
                            }
                            pagination.appendChild(pageLink);
                        }
                    }
                    if (page < totalPages) {
                        const nextLink = document.createElement("a");
                        nextLink.href = `search.html?q=${query}&page=${page + 1}`;
                        nextLink.className = "pagination-link";
                        nextLink.textContent = ">";
                        pagination.appendChild(nextLink);
                    }
                })
                .catch(error => {
                    console.error("Error fetching animeneek.json:", error);
                    animeResults.innerHTML = "<p>Failed to load sources. Please try again later.</p>";
                });
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            animeResults.innerHTML = "<p>Failed to load search results. Please try again later.</p>";
        });
});
