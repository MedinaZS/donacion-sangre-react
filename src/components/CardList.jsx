// import React from 'react'

import Card from "./card"

const CardList = ({ listaSolicitudes }) => {


    return (
        <div className="container-fluid py-3 px-5">
            <main id="container-solicitudes" className="row row-cols-1 row-cols-md-3 row-cols-lg-4 mb-3 text-center mt-3">
                {listaSolicitudes && listaSolicitudes.map((item, index) => (<Card key={index} solicitud={item}></Card>))}
            </main>
        </div>
    )
}

export default CardList