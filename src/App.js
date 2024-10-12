import React, { useState } from 'react';
import axios from 'axios';
import ButtonAdd from './components/ButtonAdd';
import NavLink from './components/NavLink';
import Card from './components/card';

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

    // Données pour les cartes
    const cardsData = [
        {
            img: 'https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png', // Ajoutez une image valide ici
            title: 'Test',
            description: 'Ceci est une description de test.',
        },
        {
            img: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', // Exemple d'image supplémentaire
            title: 'Paysage',
            description: 'Un magnifique paysage.',
        },
        {
            img: 'https://images.unsplash.com/photo-1541981208-4c4a11e2d9e4', // Exemple d'image supplémentaire
            title: 'Mer',
            description: 'Vue sur l\'océan.',
        },
    ];

    return (
        <div>
            <NavLink /> {/* Affichage de la navigation */}
            <ButtonAdd 
                onClick={fetchMessage} 
                label={'Import'} 
                disabled={loading} 
            />
            {loading && <p>Chargement...</p>} {/* Affiche un message pendant le chargement */}
            {data && <p>Données: {data}</p>} {/* Affiche les données récupérées */}

            {/* Affichage des cartes */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {cardsData.map((card, index) => (
                    <Card 
                        key={index} 
                        imageSrc={card.img} // Utiliser imageSrc au lieu de img
                        title={card.title} 
                        description={card.description} 
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
