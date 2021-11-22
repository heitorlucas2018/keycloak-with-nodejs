import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter, Routes, Route, useNavigate, Navigate  } from 'react-router-dom';

//Components


//Pages
import App from '../App'
import SearchCep from '../page/search-cep'

export default function RouterApp() {
    
    const { initialized, keycloak } = useKeycloak()

    console.log(initialized, keycloak)

    if (!initialized) {
      return <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Navigate to={'/'} replace={true} />} />
                <Route path="/protected" element={keycloak?.authenticated ? <SearchCep /> : <Navigate to={'/'} replace={true} />}/>
            </Routes>
        </BrowserRouter>
    )
}
