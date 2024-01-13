
let episodes = [];

const printEpisodes = async () => {
    mainContainer.innerHTML = "";
    episodes = [];
    await loadEpisodes();

    const episodesBySeason = mapDataEpisodesBySeason(episodes); 

    const episodesBySeasonHTML = formatEpisodesBySeason(episodesBySeason);
    const sectionContainer = document.querySelector('.section__container');
    sectionContainer.innerHTML = episodesBySeasonHTML; 

    addEventsToEpisodesLinks(episodesBySeason);
};

const loadEpisodes = async () => {
    let result;
    let currentPage = 1;
    const processPage = async (page) => {
        result = await getEpisodes(page);
        episodes = episodes.concat(result.episodes);
        if (result.next) {
            await processPage(page + 1);
        }
    };

    await processPage(currentPage);

    let episodesCards = formatEpisodesBySeason(mapDataEpisodesBySeason(episodes));

    mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">EPISODIOS</h3>
            <section class="section__container">
                ${episodesCards}
            </section>
        </section>
    `;
};

const getEpisodes = async (page) => {
    let url = URL_BASE + `/episode?page=${page}`;
    let response = await fetch(url);
    let data = await response.json();
    return {
        episodes: mapDataEpisodes(data.results),
        next: data.info.next,
        
    };
    
}

const addEventsToEpisodesLinks = (episodesBySeason) => {
    document.querySelectorAll('.card__link').forEach((element) => {
        element.addEventListener('click', (event) => {

            const seasonNumber = element.getAttribute('data-season');
            const episodeName = element.textContent;
            const clickedEpisode = episodesBySeason[seasonNumber].find(episode => episode.name === episodeName);

            if (clickedEpisode && clickedEpisode.urlDetail) {
                printPage('EPISODES', clickedEpisode.urlDetail);
            }
        });
    });
};

const mapDataEpisodesBySeason = (episodes) => {
    const episodesBySeason = {};

    episodes.forEach(episode => {
        const seasonNumber = episode.season.substring(1, 3);
        
        if (!episodesBySeason[seasonNumber]) {
            episodesBySeason[seasonNumber] = [];
        }

        episodesBySeason[seasonNumber].push(episode);
    });

    return episodesBySeason;
};

const mapDataEpisodes = (data) => {
    return data.map(episode => ({
        id: episode.id,
        name: episode.name,
        season: episode.episode,
        episode: episode.episode,
        date: episode.air_date,
        urlDetail: episode.url
    }));
} 

const formatEpisodesBySeason = (episodesBySeason) => {
    let template = '';

    Object.keys(episodesBySeason).forEach(seasonNumber => {
        const seasonEpisodes = episodesBySeason[seasonNumber];

        const firstEpisodeDate = seasonEpisodes[0].date;
        const lastEpisodeDate = seasonEpisodes[seasonEpisodes.length - 1].date;

        template += `
            <div class="card">
                <div class="card__header">
                    <h4 class="card__name card__info--link card__info--header card__info--weight">
                        SEASON ${seasonNumber}
                    </h4>
                </div>
                <div class="card__info card__info--align-center">
                    <div class="card__info-container">
                        <p class="card__info-title"> DATE </p>
                        <p class="card__info-description">${firstEpisodeDate} - ${lastEpisodeDate}</p>
                        <p class="card__info-title"> EPISODES </p>
                        ${seasonEpisodes.map((episode, index) => `<a class="card__link card__link--margin" data-season="${seasonNumber}" href="#">${episode.name}</a>`).join('')}
                    </div>
                </div>
            </div>`;
    });

    return template;
};






