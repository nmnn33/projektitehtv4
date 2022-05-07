React sovellus, joka toimii Frontend:nä projektitehtävä 3:lle, joka löytyy repositorystani https://github.com/nmnn33/Projektitehtava3.

Tämä sovellus luo paikallisen serverin ja saa kaiken mongoDB logiikkansa projektitehtava 3:sta. SIKSI ET VOI TEHDÄ TÄTÄ SOVELLUSTA OMASSA PAIKALLISELLA LAITTEELLASI, joudut lisäämään itse oman mongoDB käyttäjän- ja kokoelman tiedot.

<strong>Miten etenene tämän sovelluksen kanssa:</strong>

1. Cloonaa https://github.com/nmnn33/Projektitehtava3 ja käynnistä se npm start- komennolla. (Voi olla, että joudut npm install- komentoa käyttämään saadaksesi kaikki riippuvuudet).

2. Cloonaa https://github.com/nmnn33/projektitehtv4 ja käynnistä se npm start- komennolla. (Voi olla, että joudut npm install- komentoa käyttämään saadaksesi kaikki riippuvuudet).

3. Selaimessasi on nyt kaksi aukinaista sivua, localhost:8083 ja localhost:3000. Voit sulkea localhost:8083, käytämme vain localhost:3000.

4. Olet valmis ohjelman käyttöön!

5. "Hae:" input kohdalla voi syöttää oikeita kokoelman ID:tä. Kelvot ID:t ovat esim. tässä:

- 5ca4bbcea2dd94ee58162a69
- 5ca4bbcea2dd94ee58162a7e
- 5ca4bbcea2dd94ee58162ab8
- 5ca4bbcea2dd94ee58162b02

Kun olet syöttänyt oikean ID:n, paina "Submit" nappulaa, ja sovellus tuo esiin taulukon, jossa on hakemasi ID:n kaikki tiedot.

6. "Hae Kaikki" nappula tuo esiin 20 ensimmäistä kappeletta mongoDb kokoelmastani ja niiden kaikki tiedot.

7. "Lisää" nappi lisää yhden käyttäjän kokoelmaan hakukentistä syötettyjen tietojen avulla. username jää antamatta, sillä sitä ei ollut alkuperäisessä backendissä.

8. "Päivitä" nappi muuttaa ID:n perusteella nimen Junior:ksi.

9. "Poista" nappi poistaa ID:n perusteella kappaleen kokoelmasta, eli tietokannasta katoaa yksi tietue.

Minun muistiin panoni:
Miten Rest APi toimii React
https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests
