import { Vaccine } from "../../domain/Vaccine";

import './VaccineCard.css'

interface PropsVaccineCard{
    vaccine:Vaccine
}

export function VaccineCard({vaccine}:PropsVaccineCard){
    return(
        <div className="content__data--item">
            <div className="vaccine__item--title">
                <h3 className="vaccine--title">Vacuna</h3>
                <i className="fa-solid fa-paw logo__image recipe--logo"></i>
            </div>

            <div className="vaccine__container">
                <div className="vaccine__data">
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Lote</label>
                        <p className="vaccine__item--p">{vaccine.batchNumber}</p>
                    </div>
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Nombre</label>
                        <p className="vaccine__item--p">{vaccine.name}</p>
                    </div>
                </div>
                <div className="vaccine__data">
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Aplicacion</label>
                        <p className="vaccine__item--p">{vaccine.aplicationDate}</p>
                    </div>
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Vencimiento</label>
                        <p className="vaccine__item--p">{vaccine.expirationDate}</p>
                    </div>
                </div>
                <div className="vaccine__data vaccine__description--container">
                    <div className="vaccine__item vaccine__item--description">
                        <label className="vaccine__item--label">Descripcion</label>
                        <p className="vaccine__item--p">{vaccine.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}