import styles from "./NavBar.module.css";

const NavBar = ({ lastRefresh }) => {
	const formattedTime = lastRefresh ? lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "N/A";

	return (
		<nav className={styles.navbar}>
			<a href="/" className={styles.logoContainer}>
				<img src="../../public/logo.svg" alt="Logo" />
				<h1>Arbie</h1>
			</a>
			<div className={styles.hContainer}>
				<p>Last refresh: {formattedTime}</p>
				<a href="https://the-odds-api.com/" target="_blank" rel="noopener noreferrer">
					Odds Api
				</a>
			</div>
		</nav>
	);
};

export default NavBar;
