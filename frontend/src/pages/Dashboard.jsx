import styles from "./Dashboard.module.css";
import { useArbitrage } from "../hooks/useArbitrage";
import ArbitrageTable from "../components/ArbitrageTable.jsx";
import refreshIcon from "../assets/icons/refresh_arrows.svg";
import { useState } from "react";

const sample = {
	event: "Barcelona vs FC Copenhagen",
	eventStartTime: "2026-01-28T20:00:00Z",
	league: "UEFA Champions League",
	roi: 2.450533203309324,
	totalImpliedProbability: 0.9760808155244411,
	bestOdds: {
		Barcelona: {
			bookmakerKey: "onexbet",
			bookmaker: "1xBet",
			price: 1.18,
			link: "https://1xbet.com",
		},
		"FC Copenhagen": {
			bookmakerKey: "betfair_ex_eu",
			bookmaker: "Betfair",
			price: 24,
			link: "https://www.betfair.com/exchange/plus/football/market/1.252786364",
		},
		Draw: {
			bookmakerKey: "betfair_ex_eu",
			bookmaker: "Betfair",
			price: 11.5,
			link: "https://www.betfair.com/exchange/plus/football/market/1.252786364",
		},
	},
	sport: "Soccer",
};

const Dashboard = () => {
	const { data, loading, error, refresh } = useArbitrage();
	const [wager, setWager] = useState(200);

	const handleRefresh = () => {
		refresh();
	};

	return (
		<div className={styles.bg}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h2 className={styles.title}>Arbitrage Opportunities</h2>
					<div className={styles.controls}>
						<h3>Wager</h3>
						<input className={styles.wagerInput} value={wager} onChange={(e) => setWager(Number(e.target.value))}></input>
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
