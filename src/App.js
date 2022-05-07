import { useState } from "react";

import './App.css';

function App() {

  const [kysely, setKysely] = useState('');
  const [tulos, setTulos] = useState([]);
  const [ilmoitus, setIlmoitus] = useState('');


  //Kun submit tehdään
  const handleSubmit = (e) => {
    e.preventDefault();
    if (kysely === "") {
      console.log("Error, ei löydy hakusanaa");

    } else {
      console.log("Tapahtuman käynnisti: ", e.target);
      console.log("Hakusana: ", kysely);
      asiakasHaku(kysely);
    }
  };

  //Kun Haetaan kaikki asiakkaat
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Tapahtuman käynnisti: ", e.target)
    asiakasKaikki();
  }

  //Kun submit tehdään osa2
  const asiakasHaku = (kysely) => {
    fetch("http://localhost:8083/api/" + kysely)
      .then((results) => {
        return results.json(); //json tiedostona palautetaan tähän
      })
      .then((data) => {
        console.log("Yksi asiakas ", data);
        setTulos(data);
      });
  };

  //Kun Haetaan kaikki asiakkaat osa2
  const asiakasKaikki = () => {
    fetch("http://localhost:8083/api/getall")
      .then((results) => {
        return results.json(); //json tiedostona palautetaan tähän
      })
      .then((data) => {
        console.log(data);
        setTulos(data);
      });
  };
  //Kun tehdään PUT tyyppinen REST pyyntö, eli update
  const paivita = (e) => {
    e.preventDefault();
    if (kysely === "") {
      console.log("Error, ei löydy hakusanaa");

    } else {
      console.log("Tapahtuman käynnisti: ", e.target);
      console.log("Hakusana: ", kysely);
      junior(kysely);
    }
  };

  //Kun tehdään PUT tyyppinen REST pyyntö, eli update osa2
  const junior = (kysely) => {
    fetch('http://localhost:8083/api/update/' + kysely, {
      method: 'PUT'
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        console.log(JSON.stringify(data));
        setIlmoitus(JSON.stringify(data));
      });
  };

  //Kun tehdään POST tyyppinen REST pyyntö, eli add
  const add = (e) => {
    e.preventDefault();
    console.log("Tapahtuman käynnisti: ", e.target)
    addUser();
  };

  //Kun tehdään POST tyyppinen REST pyyntö, eli add osa2
  const addUser = () => {
    const nimi = document.getElementById("nimi").value;
    const osoite = document.getElementById("osoite").value;
    const email = document.getElementById("email").value;
    console.log(nimi, osoite, email);
    fetch('http://localhost:8083/api/add/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nimi,
        address: osoite,
        email: email
      }),
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        console.log(JSON.stringify(data));
        setIlmoitus(JSON.stringify(data));
      });
  };

  //Kun tehdään DELETE tyyppinen REST pyyntö, eli delete
  const poista = (e) => {
    e.preventDefault();
    if (kysely === "") {
      console.log("Error, ei löydy hakusanaa");

    } else {
      console.log("Tapahtuman käynnisti: ", e.target);
      console.log("Hakusana: ", kysely);
      poistaYksi(kysely);
    }
  };

  //Kun tehdään PUT tyyppinen REST pyyntö, eli update osa2
  const poistaYksi = (kysely) => {
    fetch('http://localhost:8083/api/delete/' + kysely, {
      method: 'DELETE'
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        console.log(JSON.stringify(data));
        setIlmoitus(JSON.stringify(data));
        console.log(ilmoitus);
      });
  };

  //Sisältää json tulleet tiedot tauluun lisänä meidän JSX alkuperäistä
  const AsiakasLista = (props) => {
    const { data } = props;
    return (
      <div>
        <table className="asiakasTaulu">
          <thead>
            <tr key={props.id}>
              <th scope="col">username</th>
              <th scope="col">name</th>
              <th scope="col">address</th>
              <th scope="col">email</th>
            </tr>
          </thead>
          <tbody>

            {data.map((item, i) => (
              <tr>
                <td> {item.username}</td>
                <td> {item.name}</td>
                <td> {item.address}</td>
                <td> {item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  };

  //PUT ja DELETE tyyppisille pyynnöile ilmoitus
  const Ilmoitus = (props) => {
    return (
      <div>
        <h3>{props.data}</h3>
      </div>
    )
  };

  //JSX muotoinen palaute, joka on tulee root-div sisälle
  return (
    <div>
      <div className="paadiv">
        <h1>Käyttäjien mongoDb hallinta työkalu: the frontend edicion</h1>
        <form onSubmit={handleSubmit}>
          <div className="lomake">
            <label>Hae: </label>
            <input
              type="search"
              value={kysely}
              onChange={(event) => setKysely(event.target.value)}
              name="kysely">
            </input>
          </div>
          <div className="napit">
            <button type="submit" className="submitBnt">Submit</button>
            <button type="button" classname="haeBtn" onClick={handleClick}>Hae Kaikki</button>
            <button type="button" className="haeBtn" onClick={paivita}>Junior säde!</button>
            <button type="button" className="haeBtn" onClick={poista}>Poista</button>
          </div>
        </form>
        <br></br>
        <form>
          <div className="lomakeLisaa">
            <label>Uusi käyttäjä:</label>
            <br></br>
            <label>nimi:</label>
            <input
              type="text"
              placeholder="Peter"
              name="nimi"
              id="nimi">
            </input>
            <label>osoite:</label>
            <input
              type="text"
              placeholder="Hiekkaharju 22I"
              name="osoite"
              id="osoite">
            </input>
            <label>email:</label>
            <input
              type="email"
              placeholder="Peter22@yahoo.fi"
              name="email"
              id="email">
            </input>
          </div>
          <div className="nappiLisaa">
            <button type="button" classname="haeBtn" onClick={add}>Lisää käyttäjä</button>
          </div>
        </form>
        <br></br>
      </div>
      <AsiakasLista data={tulos} />
      <Ilmoitus data={ilmoitus} />
    </div>
  );
};

export default App;
