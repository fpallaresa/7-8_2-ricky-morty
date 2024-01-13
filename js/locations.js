
let locations = [];

const printLocations = async (searchValue, refresh) => {
    currentPage = 1;
    currentSearchTerm = searchValue;
    if (!searchValue) {mainContainer.innerHTML = "";}
    await loadLocations(searchValue);
    addEventsToLocationsLinks(locations); 
}

const loadLocations = async (searchValue) => {
    let result;
    result = await getLocations(currentPage, searchValue);
    
    locations = result.locations; 
    let locationsCards = formatLocationsCards(locations);
    
    if (!searchValue) {
        search("LOCATIONS");
    }
    
    const sectionFinder = document.querySelector('.section__finder');

    let sectionCards = `
        <section class="section">
            ${printSectionLocation(locationsCards, result.next)}
        </section>
    `;
    
    sectionFinder.insertAdjacentHTML('afterend', sectionCards);
}

const printSectionLocation = (locationsCards, hasNext) => {
    const sectionContainer = document.querySelector('.section');

    if (sectionContainer) {
        sectionContainer.innerHTML = '';
    }

    return `
        <section class="section__container">
            ${locationsCards}
        </section>
        ${hasNext ? `<button class="section__link" onclick="loadMoreLocations()"> + MORE </button>` : ''}
    `;
};

const loadMoreLocations= async () => {
    currentPage++;
    const result = await getLocations(currentPage, currentSearchTerm);
    locations = result.locations;
    let locationsCards = formatLocationsCards(locations);
    appendLocationsToContainer(locationsCards);

    if (!result.next) {
        hideMoreButton();
    }
}

const appendLocationsToContainer = (locationsCards) => {
    document.querySelector('.section__container').innerHTML += locationsCards;
}

const getLocations = async (page, searchValue) => {
    let url = URL_BASE + `/location?page=${page}`;
    if (searchValue) {
        url += `&name=${searchValue}` 
    } 
    
    let response = await fetch(url);
    let data = await response.json();
    return {
        locations: mapDataLocations(data.results),
        next: data.info.next,    
    };
}

const addEventsToLocationsLinks = (locations) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            if (locations && locations.length > i) {
                printPage('LOCATIONS', locations[i].urlDetail);
            }
        });
    });
}

const mapDataLocations = (data) => {
    return data.map(location => ({
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        urlDetail: location.url
    }));
}

const formatLocationsCards = (locations) => {
    let templateLocation = locations.map(location => {

        return `
            <div class="card">
                <div class="card__header">
                    <h4 class="card__name card__info--link card__info--header">
                        <a class="detail__link" href="">${location.name}</a>
                    </h4>
                </div>
                <div class="card__info card__info--location">
                    <div class="card__info-container card__info-container--flex-row">
                        <div class="card__info-column">
                            <p class="card__info-title"> TYPE </p>
                            <p class="card__info-description card__info-description--no-margin"> ${location.type} </p>
                        </div>
                        <div class="card__info-column">
                            <p class="card__info-title"> DIMENSION </p>
                            <p class="card__info-description card__info-description--no-margin"> ${location.dimension} </p>
                        </div>
                    </div>
                </div>
                <a class="card__link" href="#"> +MORE DETAILS </a>
            </div>
        `;
    }).join('');

    return templateLocation;
}