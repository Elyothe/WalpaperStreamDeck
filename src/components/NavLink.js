import styles from './NavLink.module.css';  // Importation du module CSS

const NavLink = () => {
    const handleButtonClick = (page) => {
        // Vous pouvez remplacer cette alerte par la logique de navigation réelle plus tard
        alert(`Naviguer vers ${page}`);
    };

    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}>Walpaper StreamDeck</h1>
            <ul className={styles.menu}>
                <li className={styles.item}>
                    <button 
                        className={styles.button} 
                        onClick={() => handleButtonClick('Home')}
                    >
                        Home
                    </button>
                </li>
                <li className={styles.item}>
                    <button 
                        className={styles.button} 
                        onClick={() => handleButtonClick('My wallpaper')}
                    >
                        My Wallpaper
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavLink;
