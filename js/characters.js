
let characters = [];

const printCharacters = async (searchValue, refresh) => {
    currentPage = 1;
    currentSearchTerm = searchValue;
    if (!searchValue) {mainContainer.innerHTML = "";}
    await loadCharacters(searchValue);
    addEventsToCharactersLinks(characters);
}

const loadCharacters = async (searchValue) => {
    let result;
    result = await getCharacters(currentPage, searchValue);

    characters = result.characters; 
    let charactersCards = formatCharactersCards(characters);
    
    if (!searchValue) {
        search("CHARACTERS");
    }
    
    const sectionFinder = document.querySelector('.section__finder');

    let sectionCards = `
        <section class="section">
            ${printSectionCharacters(charactersCards, result.next)}
        </section>
    `;
    
    sectionFinder.insertAdjacentHTML('afterend', sectionCards);
}

const printSectionCharacters = (charactersCards, hasNext) => {
    const sectionContainer = document.querySelector('.section');

    if (sectionContainer) {
        sectionContainer.innerHTML = '';
    }

    return `
        <section class="section__container">
            ${charactersCards}
        </section>
        ${hasNext ? `<button class="section__link" onclick="loadMoreCharacters()"> + MORE </button>` : ''}
    `;
};

const loadMoreCharacters = async () => {
    currentPage++;
    const result = await getCharacters(currentPage, currentSearchTerm);
    characters = result.characters;
    let charactersCards = formatCharactersCards(characters);
    appendCharactersToContainer(charactersCards);

    if (!result.next) {
        hideMoreButton();
    }
}

const appendCharactersToContainer = (charactersCards) => {
    document.querySelector('.section__container').innerHTML += charactersCards;
}

const getCharacters = async (page, searchValue) => {
    let url = URL_BASE + `/character/?page=${page}`;
    if (searchValue) {
        url += `&name=${searchValue}`
        
    } 

    let response = await fetch(url);
    let data = await response.json();
    return {
        characters: mapDataCharacters(data.results),
        next: data.info.next
    };
}

const addEventsToCharactersLinks = () => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            if (characters && characters.length > i) {
                printPage('CHARACTERS', characters[i].urlDetail);
            }
        });
    });
}

const mapDataCharacters = (data) => {
    return data.map(character => ({
        name: character.name,
        status: character.status,
        img: character.image,
        gender: character.gender,
        species: character.species,
        origin: character.origin.name,
        location: character.location.name,
        urlDetail: character.url
    }));
}

const formatCharactersCards = (characters) => {
    let templateCharacter = characters.map(character => {
        let statusClass = '';

        if (character.status === 'Dead') {
            statusClass = 'card__status--option-dead';
        } else if (character.status === 'unknown') {
            statusClass = 'card__status--option-unknown';
        }

        return `
            <div class="card">
                <div class="card__header">
                    <h4 class="card__name">${character.name}</h4>
                    <span class="card__status ${statusClass}">${character.status}</span>
                </div>
                <div class="card__info">
                    <img class="card__img" src="${character.img}">
                    <div class="card__info-container">
                        <p class="card__info-title"> SPECIES </p>
                        <p class="card__info-description"> ${character.species} </p>
                        <p class="card__info-title"> GENDER </p>
                        <p class="card__info-description"> ${character.gender} </p>
                        <p class="card__info-title"> ORIGIN </p>
                        <p class="card__info-description"> ${character.origin} </p>
                        <p class="card__info-title"> LOCATION</p>
                        <p class="card__info-description"> ${character.location}</p>
                    </div>
                </div>
                <a class="card__link" href="#"> +MORE DETAILS </a>
            </div>
        `;
    }).join('');

    return templateCharacter;
}
