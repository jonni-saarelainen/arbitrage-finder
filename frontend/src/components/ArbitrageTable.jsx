import styles from "./ArbitrageTable.module.css";
import ArbitrageCard from "./ArbitrageCard.jsx";

const ArbitrageTable = (props) => {
	const { opportunities, wager } = props;

	return (
		<div className={styles.content}>
			{opportunities.map((opportunity, index) => (
				<ArbitrageCard key={index} arbitrageOpportunity={opportunity} wager={wager} />
			))}
		</div>
	);
};

export default ArbitrageTable;
