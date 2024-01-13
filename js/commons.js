
currentPage = 1;

const hideMoreButton = () => {
    document.querySelector('.section__link').style.display = 'none';
}

const extractLastNumber = (url) => {
    const parts = url.split('/'); 
    const lastPart = parts.pop(); 
    const urlLastNumber = parseInt(lastPart, 10); 

    return isNaN(urlLastNumber) ? null : urlLastNumber; 
};

const addEventsToCharacterLinks = (character) => {
    let detailLocationLinks = [...document.getElementsByClassName('detail__link')];

    detailLocationLinks.forEach((element, i) => {
        const attr = element.getAttribute('attr');

        element.addEventListener('click', () => {
            switch (attr) {
                case 'location':
                    printPage('LOCATIONS', character.locationUrl);
                    break;
                case 'episode':
                    if (character && character.episode.length > 0) {
                        const episodeUrl = character.episode[Math.min(i, character.episode.length - 1)].url;
                        printPage('EPISODES', episodeUrl);
                    } 
                    break;
                default:
                    break;
            }
        });
    });
}

const addEventsToLocationLinks = (location) => {
    let detailLocationLinks = [...document.getElementsByClassName('detail__link')];
    detailLocationLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            if (location && location.residents.length > i) {
                printPage('CHARACTERS', location.residents[i].url);
            }
        });
    });
}

const addEventsToEpisodeLinks = (episode) => {
    let detailEpisodeLinks = [...document.getElementsByClassName('detail__link')];
    
    detailEpisodeLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            if (episode && episode.characters.length > i) {
                printPage('CHARACTERS', episode.characters[i].url);
            }
        });
    });
}

let stateHistory = [];

const saveState = (section, url) => {
    let currentState = {
        section: section,
        url: url
    };
    stateHistory.push(currentState);
}

const goBack = () => {
    if (stateHistory.length > 1) {
        stateHistory.pop();
        let previousState = stateHistory.pop();

        printPage(previousState.section, previousState.url);

    } else {
        printPage('HOME');
    }
}

document.querySelector('.header__back').addEventListener('click', goBack);


