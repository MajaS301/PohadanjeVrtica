import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import SkupinaService from "../../services/SkupinaService";
import { useEffect, useState } from "react";


export default function SkupinaoviPromjena(){

    const navigate = useNavigate();
    const [skupina,setSkupina] = useState({});
    const routeParams = useParams();

    async function dohvatiSkupina(){
        const odgovor = await SkupinaService.getBySifra(routeParams.sifra)
        setSkupina(odgovor)
    }

    useEffect(()=>{
        dohvatiSkupina();
    },[])

    async function promjena(skupina){
        const odgovor = await SkupinaService.promjena(routeParams.sifra,skupina);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.SKUPINA_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        promjena(
            {
                naziv: podaci.get('naziv'),
                prostorija: podaci.get('prostorija')
            }
        );
    }

    return(
    <>
    Promjena skupinaa
    <Form onSubmit={odradiSubmit}>

    <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required  defaultValue={skupina.naziv}/>
        </Form.Group>

        <Form.Group controlId="prostorija">
            <Form.Label>prostorija</Form.Label>
            <Form.Control type="text" name="prostorija"  defaultValue={skupina.prostorija} />
        </Form.Group>

    

        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.SKUPINA_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Promjeni skupina
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}