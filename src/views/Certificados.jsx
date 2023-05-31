import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import { API_ROUTES } from "../helpers/utility";
import CardList from "../components/CardList";

const Certificados = () => {
 
  const [listaCertificados, setListaCertificados] = useState(null)

  const token = '355|CQoIjLk22W2cRYMECEkXqTdImu0MTscUtGqOlgBQ'

  useEffect(() => {
    axios.get(API_ROUTES.CERTFICADOS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        let data = response.data.data;
        console.log(data)
        setListaCertificados(data)
      })
      .catch(error => console.log("Error", error))
  }, [])

  

  return (
    <>
      <PageTitle title={"Certificados"} icon={'bi-plus'} href={'/crear-certificado'}/>
      <CardList listaCertificados={listaCertificados} />
    </>
  )
}

export default Certificados