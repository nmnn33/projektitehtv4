import { useState } from "react";

import './App.css';

function App() {

  const [kysely, setKysely] = useState('');
  const [tulos, setTulos] = useState([]);

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
          </div>
        </form>
      </div>
      <AsiakasLista data={tulos} />
    </div>
  );
}

export default App;
