import React, { useState } from 'react';
import styles from './card.module.css';
import MyButton from './BtnDL';

const Card = ({ imageSrc, compressfile }) => {
    const [isHovered, setIsHovered] = useState(false);

    const Downloading = () => {
        // Créer un lien temporaire pour le téléchargement
        const link = document.createElement('a');
        link.href = `/CompressPicture/${compressfile}`;
        link.setAttribute('download',compressfile ); // Nom du fichier téléchargé
        document.body.appendChild(link);
        link.click(); // Simuler le clic pour télécharger
        document.body.removeChild(link); // Nettoyer le lien
    };

    return (
        <div 
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={imageSrc} className={styles.cardImage} alt="Image" />
            {isHovered && (
                <div className={styles.cardContent}> 
                    <MyButton
                        label="Download"
                        onClick={Downloading}
                    />
                </div>
            )}
        </div>
    );
};

export default Card;
