// Helsingin sää
fetch('https://api.openweathermap.org/data/2.5/weather?lang=fi&q=helsinki&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28')
    .then(function (response) {
        return response.json();
    })
    .then(function (responseJson) {
        saa(responseJson, 'helsinki');
    })
    .catch(function (error) {
        document.getElementById("vastaus1").innerHTML =
            "<p>Tietoa ei pystytä hakemaan Helsingin säästä</p>";
    });

// Tampereen sää
fetch('https://api.openweathermap.org/data/2.5/weather?lang=fi&q=tampere&units=metric&APPID=665ecd56dfc08dbb50feb8b8f5034e28')
    .then(function (response) {
        return response.json();
    })
    .then(function (responseJson) {
        saa(responseJson, 'tampere');
    })
    .catch(function (error) {
        document.getElementById("vastaus2").innerHTML =
            "<p>Tietoa ei pystytä hakemaan Tampereen säästä</p>";
    });

function saa(data, city){
    var teksti = ""; 

    // otsikko
    teksti = "<h3>" + data.name + "</h3>";

    // taulukko
    teksti = teksti + "<ul>";
    teksti = teksti + "<li><p>Kaupunki: " + data.name + "</p></li>";
    teksti = teksti + "<li><p>Sää: " + data.weather[0].description + "</p></li>";
    teksti = teksti + "<li><p>Lämpötila: " + data.main.temp + " °C</p></li>";
    teksti = teksti + "<li><p>Tuulen nopeus: " + data.wind.speed + " m/s</p></li>";
    teksti = teksti + "</ul>";

    // Kuva
    var kuva = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    teksti = teksti + "<p><img src='" + kuva + "' alt='Sääkuva'></p>";

    // tarkistetaan, kumpi kaupunki on kyseessä
    if (city === 'helsinki') {
        document.getElementById("vastaus1").innerHTML = teksti; // Helsinki
    } else {
        document.getElementById("vastaus2").innerHTML = teksti; // Tampere
    }
}
