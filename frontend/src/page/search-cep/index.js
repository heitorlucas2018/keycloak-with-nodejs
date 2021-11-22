import React, { Component } from 'react'
import { Card, CardContent, CardHeader, Divider, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import './style.css';


export default class SearchCep extends Component {

    state = {
        data: null,
    }
    
    constructor(props) {
        super(props)
        this.handlerOnInput = this.handlerOnInput.bind(this);
    }

    async handlerOnInput({ target: { value } }) {
        if (value.length === 8) {
            const {data} = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
            this.setData(data)
        }
    }

    setData(value) {
        this.setState({data: value})
    }

    render() {
        console.log(this.state.data)
        return (
            <div className='App'>
                <header >
                    <div className="logo" />
                    <h3 style={{ color:'#fff' }}>Acesso privado</h3>
                </header>
                <Card style={{ width: 400, minHeight: 400  }}>
                    <Input placeholder='CEP' value={this.state?.inputCep} onInput={this.handlerOnInput} style={{ padding: '10px' }} />
                    <Divider />
                    <CardContent>
                        <div className='result'>
                                  <span><b>cep:</b> {this.state.data?.cep}</span>
                            <br/> <span><b>logradouro:</b> {this.state.data?.logradouro}</span>
                            <br/> <span><b>complemento:</b> {this.state.data?.complemento}</span>
                            <br/> <span><b>bairro:</b> {this.state.data?.bairro}</span>
                            <br/> <span><b>localidade:</b> {this.state.data?.localidade}</span>
                            <br/> <span><b>uf:</b> {this.state.data?.uf}</span>
                            <br/> <span><b>ibge:</b> {this.state.data?.ibge}</span>
                            <br/> <span><b>gia:</b> {this.state.data?.gia}</span>
                            <br/> <span><b>ddd:</b> {this.state.data?.ddd}</span>
                            <br/> <span><b>siafi:</b> {this.state.data?.siafi}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
