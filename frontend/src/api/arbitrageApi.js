import axios from "axios";

export const fetchArbitrageOpportunities = async (params = {}) => {
	const { data } = await axios.get("http://localhost:5000/api/arbitrage/arbitrageOpportunities", { params });

	return data;
};
