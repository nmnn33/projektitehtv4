import { useState } from "react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

function App() {

  const [kysely, setKysely] = useState('');
  const [tulos, setTulos] = useState([]);
  const [ilmoitus, setIlmoitus] = useState('');

  const [show, setShow] = useState(false);
  const [alerttiShow, setAlerttiShow] = useState(false);


  //Kun submit tehdään
  const handleSubmit = (e) => {
    e.preventDefault();
    if (kysely === "" || kysely.length !== 24) {  //24 kirjaiminen ID
      console.log("Error, ei löydy hakusanaa");
      document.getElementById('kysely').style.borderColor = "red";
      setShow(true);
    } else {
      document.getElementById('kysely').style.borderColor = "";
      setShow(false);
      console.log("Tapahtuman käynnisti: ", e.target);
      console.log("Hakusana: ", kysely);
      asiakasHaku(kysely);
    }
  };

  //Kun Haetaan kaikki asiakkaat
  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
    document.getElementById('kysely').style.borderColor = "";
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
    if (kysely === "" || kysely.length !== 24) {
      console.log("Error, ei löydy hakusanaa");
      document.getElementById('kysely').style.borderColor = "red";
      setShow(true);
    } else {
      document.getElementById('kysely').style.borderColor = "";
      setShow(false);
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
    if (document.getElementById("nimi").value.length < 3 || document.getElementById("osoite").value.length < 4 || document.getElementById("email").value.length < 6) {
      setAlerttiShow(true);
    } else {
      setAlerttiShow(false);
      console.log("Tapahtuman käynnisti: ", e.target)
      addUser();
    }
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
    if (kysely === "" || kysely.length !== 24) {
      console.log("Error, ei löydy hakusanaa");
      document.getElementById('kysely').style.borderColor = "red";
      setShow(true);
    } else {
      document.getElementById('kysely').style.borderColor = "";
      setShow(false);
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
      <div className="container asiaKasTauluDiv">
        <Table striped bordered hover>
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

        </Table>
      </div>
    )
  };

  //PUT ja DELETE tyyppisille pyynnöile ilmoitus
  const Ilmoitus = (props) => {
    return (
      <div className="container ilmoitusDiv border border-primary">
        <h2>Viesti backend serveriltämme: </h2>
        <div className="container ilmoitusDivAla">
          <h3>{props.data}</h3>
        </div>
      </div>
    )
  };

  //Alert kun hae osio tarkastetaan virheellinen
  function Alertti() {

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Virhe haussa!</Alert.Heading>
          <p>
            ID on 24 merkkiä pitkä, tarkista uudestaan ID.
          </p>
        </Alert>
      );
    }
    return null;
  }

  //Alert lisätään asiakas virheellinen
  function AlerttiLisaa() {

    if (alerttiShow) {
      return (
        <Alert variant="danger" onClose={() => setAlerttiShow(false)} dismissible>
          <Alert.Heading>Hakijaa lisättäessä!</Alert.Heading>
          <p>
            Nimi täytyy olla vähintään 4 merkkiä, osoite 5 ja email 7.
          </p>
        </Alert>
      );
    }
    return null;
  }

  //JSX muotoinen palaute, joka on tulee root-div sisälle
  return (
    <div>
      <div className="container paadiv">
        <h1>Käyttäjien mongoDb hallinta työkalu: the frontend edicion</h1>
        <form onSubmit={handleSubmit}>
          <div className="lomake">
            <label>Hae: </label>
            <input
              type="search"
              value={kysely}
              onChange={(event) => setKysely(event.target.value)}
              name="kysely"
              id="kysely">
            </input>
          </div>
          <div className="napit">
            <button type="submit" className="submitBnt">Submit</button>
            <button type="button" classname="haeBtn" onClick={handleClick}>Hae Kaikki</button>
            <button type="button" className="haeBtn" onClick={paivita}>Junior säde!</button>
            <button type="button" className="haeBtn" onClick={poista}>Poista</button>
          </div>
        </form>
        <Alertti />
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
        <AlerttiLisaa />
        <br></br>
      </div>
      <AsiakasLista data={tulos} />
      <br></br><br></br>
      <Ilmoitus data={ilmoitus} />
    </div>
  );
};

export default App;
