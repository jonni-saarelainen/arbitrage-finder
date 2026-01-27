import styles from "./NavBar.module.css";

const NavBar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.logoContainer}>
				<img src="../../public/logo.svg" alt="Logo" />
				<h1>Arbie</h1>
			</div>
			<div className={styles.hContainer}>
				<p>Last update: 00:00</p>
				<a href="https://the-odds-api.com/" target="_blank" rel="noopener noreferrer">Odds Api</a>
			</div>
		</nav>
	)
};

export default NavBar;