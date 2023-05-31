import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { API_ROUTES } from "../helpers/utility";
import CardList from "../components/CardList";

const Certificados = () => {
  const data = [
    {
      "id": 111,
      "fecha_donacion": "2022-11-22",
      "user": {
        "id": 47,
        "name": "M",
        "surname": "Lugo",
        "fecha_nacimiento": "1998-12-09",
        "email": "asd@gmail.com",
        "email_verified_at": null,
        "nro_cedula": "127645342",
        "created_at": "2022-12-28T15:40:53.000000Z",
        "updated_at": "2023-05-31T14:39:45.000000Z",
        "sexo": "M",
        "ult_vez_donado": "2022-11-22"
      },
      "local_donacion": "EL CANTARO"
    }
  ]

  const [listaCertificados, setListaCertificados] = useState(data)

  const token = "355|CQoIjLk22W2cRYMECEkXqTdImu0MTscUtGqOlgBQ"

  useEffect(() => {

    axios.get(API_ROUTES.CERTIFICADOS, {}, {headers: {'Authorization': `Bearer ${token}`}})
      .then(response => {
        // let data = response.data.data;
        console.log(response)
        // setListaCertificados(data)
      })
      .catch(error => console.log("Error", error))
  }, [])

  return (
    <>
      <PageTitle title={"Certificados"} />
      {/* <CardList listaCertificados={listaCertificados} /> */}
    </>
  )
}

export default Certificados