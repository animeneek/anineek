(async function replaceAllMalImagesWithAniList() {
    async function fetchAniListImage(malId) {
        // Check if we have cached data
        const cachedData = localStorage.getItem(`aniListImages_${malId}`);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const query = `
            query ($idMal: Int) {
                Media(idMal: $idMal, type: ANIME) {
                    coverImage {
                        extraLarge
                        large
                        medium
                    }
                    bannerImage
                }
            }
        `;
        const variables = { idMal: malId };

        try {
            const res = await fetch('https://graphql.anilist.co', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables })
            });
            const data = await res.json();
            const media = data.data.Media;
            const aniImages = {
                banner: media.bannerImage,
                cover: media.coverImage.extraLarge || media.coverImage.large || media.coverImage.medium
            };
            
            // Cache the result
            localStorage.setItem(`aniListImages_${malId}`, JSON.stringify(aniImages));

            return aniImages;
        } catch (err) {
            console.warn("AniList fetch failed for MAL ID:", malId);
            return null;
        }
    }

    // Find elements with data-mal-id
    const elements = document.querySelectorAll('[data-mal-id]');
    for (const el of elements) {
        const malId = parseInt(el.dataset.malId);
        if (!malId) continue;

        const aniImages = await fetchAniListImage(malId);
        if (!aniImages) continue;

        // Replace <img> tag
        if (el.tagName === 'IMG') {
            el.src = aniImages.cover;
        }

        // Replace background image
        else if (getComputedStyle(el).backgroundImage.includes("cdn.myanimelist.net")) {
            el.style.backgroundImage = `url(${aniImages.banner || aniImages.cover})`;
        }
    }
})();
