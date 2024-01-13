
const printDetailCharacter = (url) => {
    getCharacter(url).then(response => {
        let characterDetail = formatCharacterDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">CHARACTER DETAIL</h3>
                <section class="section__container">
                    ${characterDetail}
                </section>
            </section>
        `;
        addEventsToCharacterLinks (response);
    });
}

const getCharacter = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataCharacter(data);

    return data;
}

const formatDataCharacter = (data) => {
    let dataFormated = {
        name: data.name.toUpperCase(),
        status: data.status,
        img: data.image,
        species: data.species,
        origin: data.origin.name,
        locationName: data.location.name,
        locationUrl: data.location.url,
        episode: data.episode.map((episodeUrl) => ({
            url: episodeUrl,
            urlLastNumber: extractLastNumber(episodeUrl),
        })),
    };

    return dataFormated;
};

const formatCharacterDetail = (character) => {
    
    const allEpisodes = character.episode.map((episode) => `
            <p class="detail__info detail__info--link">
                <a class="detail__link" href="#" attr="episode">${episode.urlLastNumber}</a>
            </p>
        `).join('');

        let aliveClass = "";
        let deadClass = "";
        let unknownClass = "";
    
        switch (character.status) {
            case "Alive":
                aliveClass = "detail__info--option-alive";
                break;
            case "Dead":
                deadClass = "detail__info--option-dead";
                break;
            case "unknown":
                unknownClass = "detail__info--option-unknown";
                break;
            default:
                break;
        }

    return `
        <div class="detail">
            <div class="detail__header">
                <img class="detail__img" src="${character.img}">
                <h4 class="detail__title detail__title--uppercase detail__title--border">${character.name}</h4>
            </div>
            <div class="detail__info-container">
                <p class="detail__info-title">STATUS</p>
                <div class="detail__info-status">
                    <p class="detail__info ${aliveClass}" attr="Alive">ALIVE</p>
                    <p class="detail__info ${deadClass}" attr="Dead">DEAD</p>
                    <p class="detail__info ${unknownClass}" attr="unknown">UNKNOWN</p>
                </div>
                <div class="detail__specifications">
                    <div class="detail__info-specs">
                        <p class="detail__info-title">SPECIES</p>
                        <p class="detail__info">${character.species}</p>
                    </div>
                    <div class="detail__info-specs">
                        <p class="detail__info-title">ORIGIN</p>
                        <p class="detail__info">${character.origin}</p>
                    </div>
                    <div class="detail__info-specs">
                        <p class="detail__info-title">LOCATION</p>
                        <p class="detail__info detail__info--link">
                            <a class="detail__link" href="#" attr="location">${character.locationName}</a>
                        </p>
                    </div>
                </div>
                <div class="detail__info-episodes">
                    <p class="detail__info-title">EPISODE</p>
                    <div class="detail__info-links">
                        ${allEpisodes}
                    </div>
                </div>
            </div>
        </div>
    `;
}