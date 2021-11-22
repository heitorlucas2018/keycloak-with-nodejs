import React, { useCallback } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'

import './App.css';
import { Button, Card } from '@material-ui/core';

function App() {

  const { keycloak } = useKeycloak()
  const navigate = useNavigate();

  const login = useCallback(() => {
    if(!keycloak?.authenticated) {
      keycloak?.login()
    } else {
      navigate('/protected')
    }
  }, [keycloak])

  if (!keycloak?.authenticated) {
    console.log('keycloak', keycloak)
    navigate('/login')
  }
    

  return (
    <div className="App">
      <header >
        <div className="logo" />
        <h3 style={{ color: '#fff' }}>Acesso Publico</h3>
      </header>
      <section>
        <Card style={{ padding: 5, width: 300, height: 50}}>
          <Button variant="contained" color='primary' onClick={login}>
            Login
          </Button>
        </Card>
      </section>
    </div>
  );
}

export default App;
