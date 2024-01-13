
const printHome = () => {
    mainContainer.innerHTML = `
        <section class="section-home">
            <h3 class="section-home__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </h3>
            <div class="section-home__separator"></div>
        </section>
        <section class="section-home section-home--navigation">
            <nav class="nav">
                <a href="#" class="nav__link">Characters</a>
                <a href="#" class="nav__link">Episodes</a>
                <a href="#" class="nav__link">Locations</a>
            </nav>
        </section>
    `;

    addEventsToHomeLinks();
}