
const mainContainer = document.querySelector('.main');
const URL_BASE = "https://rickandmortyapi.com/api";

window.onload = () => {
    printHome('HOME');
}

const printPage = (section, url) => {
    saveState(section, url);
    adaptHeader(section);

    switch (section){
        case 'HOME':
            printHome();
            break;
        case 'CHARACTERS':
            url ? printDetailCharacter(url) : printCharacters();
            break;
        case 'EPISODES':
            url ? printEpisodesDetail(url) : printEpisodes();
            break;
        case 'LOCATIONS':
            url ? printLocationsDetail(url) : printLocations();
            break;
        default:
            printHome();
            break;
    }

    window.scrollTo(0,0);
}

const adaptHeader = (section) => {
    const header = document.querySelector('header');
    if (section === 'HOME'){
        header.classList.add('header--home');
    } else {
        header.classList.remove('header--home');
    }
}

const addEventsToHomeLinks = () => {
    const allLinks = [...document.getElementsByClassName('nav__link'), ...document.getElementsByClassName('footer__link')];
    
    allLinks.forEach( element => {
        element.addEventListener('click', () => {
            printPage(element.textContent.toLocaleUpperCase());
        });
        
    });
}