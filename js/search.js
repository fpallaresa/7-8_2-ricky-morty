
const search = (name) => {
    const placeholderKeys = {
        CHARACTERS : "Search by character",
        LOCATIONS : "Search by location",
    }

    const titleKeys = {
        CHARACTERS : "CHARACTERS",
        LOCATIONS : "LOCATION",
    }

    mainContainer.innerHTML = `
    <h3 class="section__title">${titleKeys[name]} FINDER</h3>
    <section class="section__finder">
                    <div class="section__finder-content">
                        <button class="section__finder-icon icon-search" type="button" onclick="printSearch('${name}')"></button>
                        <input class="section__input" type="text" placeholder="${placeholderKeys[name]}">
                    </div>
                </section>`
}

const printSearch = (value) => {

    const valueSearchInput = document.querySelector('.section__input').value.trim();

    if (value === "CHARACTERS") {
        printCharacters(valueSearchInput, false);
    } else if (value === "LOCATIONS") {
        printLocations(valueSearchInput, false);
    }
}