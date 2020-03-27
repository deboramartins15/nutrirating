import React from "react"

function Historico(props){
    const { match: { params } } = props;

    return(
        <>
            <h1>Historico {params.cod_pac}</h1>
        </>
    )
}

export default Historico;