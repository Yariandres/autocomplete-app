const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// searh state.json and filter
const searchStates = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    // console.log(states);
    // get matches to current text inputs
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);

    });

    // emty results when there there is no charecters entered in the search field
    if (searchText.length === 0 ) {
        matches = [];
        matchList.innerHTML = '';
    }

    // console.log(matches);
    outputHtml(matches);
};
// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-4">
            <h4>${match.name} (${match.abbr} <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat } / Long: ${match.long}</small>
        </div>
        `).join('');

        matchList.innerHTML = html;
        // console.log(html);
    }
}


search.addEventListener('input', () => searchStates(search.value));