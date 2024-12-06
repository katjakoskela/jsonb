fetch('https://api.visittampere.com/api/v1/visittampere/event/published/all/?format=json&lang=fi')

// Muunnetaan vastaus JSON muotoon
.then(function (response) {
return response.json();
})

// Käsitellään muunnettu (eli JSON muotoinen) vastaus
.then(function (responseJson) {
// Kutsutaan funktiota ja välitetään sille json-vastaus
tapahtumat(responseJson)
})

// Jos tuli jokin virhe
.catch(function (error) {
document.getElementById("vastaus").innerHTML =
"<p>Tietoa ei pystytä hakemaan </p>"+ error;
})

function tapahtumat(data){
    var teksti = "";

    // Otsikko
    teksti = teksti + "<h1>Tampereen Tapahtumat</h1>";

    // Muodostetaan taulukko
    teksti = teksti + "<ul>";

    for(var i = 0; i < data.length; i++) {
    //hae tapahtuman nimi, kuvaus ja url-osoite
    teksti = teksti + "<h3>Tapahtuma: " + data[i].slug + "</h3>";
    teksti = teksti + "<p>Tapahtuman kuvaus: " + data[i].description + "</p>";
    teksti += "<p>Linkki tapahtumaan: <a href='" + data[i].url + "' target='_blank'>" + data[i].url + "</a></p>";
    }
    // Suljetaan taulukko
    teksti = teksti + "</ul>";


    // Tulosta teksti
    document.getElementById("vastaus").innerHTML = teksti;
    }