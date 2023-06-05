// import React from 'react'

import Card from "./card"

const CardList = ({ listaSolicitudes, listaCertificados, setListaSolicitudes }) => {


  return (
    <>
      <main id="container-solicitudes"
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mb-3 text-center mt-3">
        {listaSolicitudes && listaSolicitudes.map((item, index) => (<Card key={index} solicitud={item} listaSolicitudes={listaSolicitudes} setListaSolicitudes={setListaSolicitudes}></Card>))}
        {listaCertificados && listaCertificados.map((item, index) => (<Card key={index} certificado={item}></Card>))}
      </main>
    </>
  )
}

export default CardList