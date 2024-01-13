
const printEpisodesDetail = (url) => {
    getEpisode(url).then(response => {

        let episodeDetail = formatEpisodeDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">EPISODE DETAIL</h3>
                <section class="section__container">
                    ${episodeDetail}
                </section>
            </section>
        `;
        addEventsToEpisodeLinks(response);
    });
}

const getEpisode = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataEpisode(data);

    return data;
}

const formatDataEpisode = (data) => {
    
    let dataFormated = {
        name: data.name,
        date: data.air_date,
        episode: data.episode,
        characters: data.characters.map((characterUrl) => ({
            url: characterUrl,
            imageLastNumber: 'https://rickandmortyapi.com/api/character/avatar/'+extractLastNumber(characterUrl)+'.jpeg',
        })),
    };

    return dataFormated;
};

const formatEpisodeDetail = (episode) => {

    const allCharacters = episode.characters.map((characters) => `
            <p class="detail__info">
                <a class="detail__link" href="#"><img src="${characters.imageLastNumber}" alt="${episode.characters.name}"></a>
            </p>
        `).join('');

    return `
        <div class="detail">
            <div class="detail__header detail__header--locations">
                <h4 class="detail__title detail__title--locations">${episode.name}</h4>
            </div>
            <div class="detail__info-container">
                <div class="detail__specifications">
                    <div class="detail__info-specs">
                        <p class="detail__info-title">EPISODE</p>
                        <p class="detail__info">${episode.episode}</p>
                    </div>
                    <div class="detail__info-specs">
                        <p class="detail__info-title">DATE</p>
                        <p class="detail__info">${episode.date}</p>
                    </div>
                </div>
                <div class="detail__info-residents">
                    <p class="detail__info-title">CHARACTERS</p>
                    <div class="detail__info-links">
                        ${allCharacters}
                    </div>
                </div>
            </div>
        </div>
    `;
}