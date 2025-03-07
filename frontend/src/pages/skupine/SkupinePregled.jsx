import { useEffect, useState } from "react"
import SkupinaService from "../../services/SkupinaService"
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function SkupinePregled(){

    const[skupine, setSkupine] = useState();
    const navigate = useNavigate();

    async function dohvatiSkupinaove(){
        const odgovor = await SkupinaService.get()
        setSkupine(odgovor)
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Skupine
    useEffect(()=>{
        dohvatiSkupinaove();
    },[])



    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeSkupinaa(sifra);
    }

    async function brisanjeSkupinaa(sifra) {
        const odgovor = await SkupinaService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiSkupinaove();
    }


    return(
        <>
        <Link
        to={RouteNames.SKUPINA_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi skupina</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>prostorija</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {skupine && skupine.map((skupina,index)=>(
                    <tr key={index}>
                        <td>
                            {skupina.naziv}
                        </td>
                        <td>
                            {skupina.prostorija}
                        </td>
                       
                        <td>
                            <Button
                            onClick={()=>navigate(`/skupine/${skupina.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(skupina.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}