import dayjs from "dayjs";
import { convertTypeOfVaccineToASpanishString, Vaccine } from "../../domain/Vaccine";

import './VaccineCard.css'

interface PropsVaccineCard{
    vaccine:Vaccine
}

export function VaccineCard({vaccine}:PropsVaccineCard){
    const aplicationDate = dayjs(vaccine.applicationDate).format('DD/MM/YYYY')
    const expirationDate = dayjs(vaccine.expirationDate).format('DD/MM/YYYY')

    return(
        <div className="content__data--item">
            <div className="vaccine__item--title">
                <h3 className="vaccine--title">Vacuna</h3>
                <i className="fa-solid fa-paw logo__image vaccine--logo"></i>
            </div>
            <div className="vaccine__container">
                <div className="vaccine__data">
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Lote</label>
                        <p className="vaccine__item--p">{vaccine.batchNumber}</p>
                    </div>
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Contra</label>
                        <p className="vaccine__item--p">{convertTypeOfVaccineToASpanishString(vaccine.type)}</p>
                    </div>
                </div>
                <div className="vaccine__data">
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Aplicacion</label>
                        <p className="vaccine__item--p">{aplicationDate}</p>
                    </div>
                    <div className="vaccine__item">
                        <label className="vaccine__item--label">Vencimiento</label>
                        <p className="vaccine__item--p">{expirationDate}</p>
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