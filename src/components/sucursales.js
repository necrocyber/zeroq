import React, { Component } from 'react';
import { InputGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
//import sucursales from '../sucursales/sucursales.json';


class Sucursales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursales : [],
            query : '',
            error : false
        }
    } 

    componentDidMount() {
        fetch('https://boiling-mountain-49639.herokuapp.com/desafio-frontend')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            this.setState({ sucursales : result });
        })
    }

    

    
    handleInputChange = (event) => {
        
        this.setState({ query: event.target.value }) 
        
    }
    
    
    render() {
        const branches = this.state.sucursales.map((entry) => {
            const search = this.state.query;
            if(search !== "" && entry.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                return null;
            }

            let waiting = 0;
            let clock = 0;

            // Calculo de Oficinas
            let oficinas = Object.keys(entry.lines);
            oficinas.filter((oficina) => {
                waiting += entry.lines[oficina].waiting;
                clock += entry.lines[oficina].elapsed;
                return true;
            });

            // Transformar el tiempo transcurrido a hora, minuto, segundo
            const date = new Date(null);
            date.setSeconds(clock);
            let timeString = date.toISOString().substr(11, 8);

            return (
                <div className="col-sm-4 col-md-3">
                    <div className="card mb-4 border">
                        <div className="card-header blue border h-200">
                            <strong> { entry.name }  </strong>
                        </div>
                        <div className="card-body green border h-40"> 
                            <div className="item-icon">
                                <FontAwesomeIcon color="white" icon={faUser} />
                                <span> { waiting } </span>
                            </div>
                            <div className="item-icon">
                                <FontAwesomeIcon color="white" icon={faClock} />
                                <span> { timeString } </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        

        return (
            <div>
                <div className="search">
                <InputGroup size="sm" className="group-search col-sm-4 offset-sm-1">
                    <span className="input-group-append">
                        <div className="input-group-text buscador">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </span>
                    <Input onChange={this.handleInputChange} className="input-search" placeholder="Buscar Sucursal" />
                </InputGroup>
                </div>
                <div className="col-sm-10 offset-sm-1">
                    <div className="row mt-4">
                        { branches }
                    </div>
                </div>
            </div>
            
        )
    }

}

export default Sucursales;
