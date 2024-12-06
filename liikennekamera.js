// Hakee tiedot liikennekamerasta
fetch('https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507')
    .then(function(response) {
        return response.json(); // Muutetaan vastaus JSON-muotoon
    })
    .then(function(data) {
        console.log(data); // Tulostetaan konsoliin vastaus (tarkistetaan mitä dataa saamme)
        naytaKuvat(data); // Kutsutaan funktiota, joka näyttää kuvat
    })
    .catch(function(error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan liikennekameran tiedoista</p>";
    });

// Funktio joka näyttää liikennekameran kuvat ja tiedot
function naytaKuvat(data) {
    var teksti = "";

    // Käydään läpi kaikki "presets" (sijainnit ja kuvat)
    for (var i = 0; i < data.properties.presets.length; i++) {
        var preset = data.properties.presets[i];
        
        // Tämä tulostaa konsoliin presetin tiedot
        console.log(preset);

        // Jos presetillä on imageUrl, käytetään sitä kuvan näyttämiseen
        if (preset.imageUrl) {
            teksti = teksti + "<h3>" + data.properties.dataUpdatedTime + "</h3>";
            teksti = teksti + "<p>Näkymä " + preset.presentationName + "</p>";
            teksti = teksti + "<p><img src='" + preset.imageUrl + "' alt='Liikennekamera'></p>";
        } else {
            teksti = teksti + "<p>Ei kuvaa saatavilla</p>";
        }
    }

    // Asetetaan saatu teksti HTML-elementtiin id:llä 'vastaus'
    document.getElementById("vastaus").innerHTML = teksti;
}
