import styles from './NavLink.module.css';  // Importation du module CSS

const NavLink = () => {
    return (
        <nav className={styles.nav}>
            <h1 className={styles.title}>Walpaper StreamDeck</h1>
            <ul className={styles.menu}>
                <li className={styles.item}>Home</li>
                <li className={styles.item}>My walpaper</li>

                
            </ul>
        </nav>
    );
};

export default NavLink;
