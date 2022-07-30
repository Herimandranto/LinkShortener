const form = document.querySelector('#shortenForm');
const shortenCard = document.querySelector('#shortenCard');
const inputUrl = document.querySelector('#url');
const btnShortenUrl = document.querySelector('#btnShortenUrl');


const URL_SHORTEN = '/ajax/shorten';
const errorMessages = {
    'INVALID_ARG_URL': "impossible de raccourcir ce lien, ce n'est pas une Url valide",
    'MISSING_ARG_URL': "veuillez fournir une Url Valide"
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(URL_SHORTEN, {
        method: 'POST',
        body: new FormData(e.target)
    })
        .then(response => response.json())
        .then(handleData)

})

const handleData = function (data) {
    if (data.statusCode >= 400) {
        return handleError(data);
    }

    inputUrl.value = data.link;
    btnShortenUrl.innerText = "copier";

    btnShortenUrl.addEventListener('click', function (e) {
        e.preventDefault();

        inputUrl.Select();
        document.execCommand('copy');

        this.innerText = "Réduire l'Url";
    }, { once: true });
}

const handleError = function (data) {
    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-danger', 'mt-2');
    alert.innerText = errorMessages[data.statusText];

    shortenCard.after(alert);
}