import React, { useState } from 'react'; // Assurez-vous d'importer useState ici
import styles from './card.module.css';

const Card = ({ imageSrc, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
        className={styles.card}
        onMouseEnter={()=> setIsHovered(true)}
        onMouseLeave={()=> setIsHovered(false)}
        > {}
            <img src={imageSrc} alt={title} className={styles.cardImage} /> {}
            {isHovered === true &&(
                     <div className={styles.cardContent}> 
                     <button className={styles.button}>Download</button>
                     <h2 className={styles.cardTitle}>{title}</h2>
                     <p className={styles.cardDescription}>{description}</p>
                 </div>
                )}
        </div>
        
    );
};

export default Card;
