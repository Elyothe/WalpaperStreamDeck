import React, { useState } from 'react';
import axios from 'axios';
import ButtonAdd from './components/ButtonAdd';
import NavLink from './components/NavLink';
import Card from './components/card';

import cardsData from './cardsData'; // Importer le fichier contenant les données

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchMessage = () => {
        setLoading(true);
        axios.get('http://localhost:5216/api/example/hello')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <NavLink /> {/* Affichage de la navigation */}
            
            {loading && <p>Chargement...</p>} {/* Affiche un message pendant le chargement */}
            {data && <p>Données: {data}</p>} {/* Affiche les données récupérées */}

            {/* Affichage des cartes */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {cardsData.map((card, index) => (
                    <Card 
                        key={index} 
                        imageSrc={card.img} // Utiliser imageSrc
                        compressfile={card.compressfile} // Passer compressfile
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
