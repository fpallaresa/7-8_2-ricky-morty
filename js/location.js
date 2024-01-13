
const printLocationsDetail = (url) => {
    getLocation(url).then(response => {

        let locationDetail = formatLocationDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">LOCATION DETAIL</h3>
                <section class="section__container">
                    ${locationDetail}
                </section>
            </section>
        `;
        addEventsToLocationLinks(response);
    });
}

const getLocation = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataLocation(data);

    return data;
}

const formatDataLocation = (data) => {
    
    let dataFormated = {
        name: data.name,
        type: data.type,
        dimension: data.dimension,
        residents: data.residents.map((residentUrl) => ({
            url: residentUrl,
            imageLastNumber: 'https://rickandmortyapi.com/api/character/avatar/'+extractLastNumber(residentUrl)+'.jpeg',
        })),
    };

    return dataFormated;
};

const formatLocationDetail = (location) => {

    const allResidents = location.residents.map((residents) => `
            <p class="detail__info">
                <a class="detail__link" href="#"><img src="${residents.imageLastNumber}" alt="${location.name}"></a>
            </p>
        `).join('');

    return `
        <div class="detail">
            <div class="detail__header detail__header--locations">
                <h4 class="detail__title detail__title--locations">${location.name}</h4>
            </div>
            <div class="detail__info-container">
                <div class="detail__specifications">
                    <div class="detail__info-specs">
                        <p class="detail__info-title">TYPE</p>
                        <p class="detail__info">${location.type}</p>
                    </div>
                    <div class="detail__info-specs">
                        <p class="detail__info-title">DIMENSION</p>
                        <p class="detail__info">${location.dimension}</p>
                    </div>
                </div>
                <div class="detail__info-residents">
                    <p class="detail__info-title">RESIDENTS</p>
                    <div class="detail__info-links">
                        ${allResidents}
                    </div>
                </div>
            </div>
        </div>
    `;
}