import styles from "./Dashboard.module.css";
import { useArbitrage } from "../hooks/useArbitrage";
import ArbitrageTable from "../components/ArbitrageTable.jsx";
import refreshIcon from "../assets/icons/refresh_arrows.svg";
import { useState } from "react";

const Dashboard = ({ setLastRefresh }) => {
	const { data, loading, error, refresh } = useArbitrage();
	const [wagerInput, setWagerInput] = useState("200");

	const wager = Number(wagerInput) || 0;

	const handleWagerChange = (e) => {
		const next = e.target.value;
		if (next === "" || /^[0-9]*$/.test(next)) setWagerInput(next);
	};

	const handleRefresh = () => {
		refresh();
		setLastRefresh(new Date());
	};

	return (
		<div className={styles.bg}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h2 className={styles.title}>Arbitrage Opportunities</h2>
					<div className={styles.controls}>
						<h3>Wager</h3>
						<input className={styles.wagerInput} type="number" value={wagerInput} onChange={handleWagerChange} name="wager"></input>
						<button className={`${styles.refreshButton} ${loading ? styles.refreshing : ""}`} onClick={handleRefresh} disabled={loading}>
							<img className={styles.refreshIcon} src={refreshIcon} alt="Refresh" />
						</button>
					</div>
				</div>
				{loading && <h1>Loading arbitrage opportunities...</h1>}
				{error && <h1>Error loading data</h1>}
				{!loading && !error && (data === null || data.length === 0) && <h1>No arbitrage opportunities found. Try refreshing.</h1>}
				{!loading && !error && data && data.length > 0 && <ArbitrageTable opportunities={data} wager={wager} />}
			</div>
		</div>
	);
};

export default Dashboard;
