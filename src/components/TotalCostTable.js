
const renderTotalCostTable = (responseData) => {
    if (!responseData) return null;

    const totalCostTable = responseData.data.cost_results.total_cost_table;
    const stages = ["Drilling Rates", "Materials", "Others", "Time Rates", "Total Cost"];
    return (
        <table>
            <thead>
                <tr>
                    <th>Stage</th>
                    <th>Low</th>
                    <th>Base</th>
                    <th>High</th>
                </tr>
            </thead>
            <tbody>
                {stages.map((stage, index) => (
                    <tr key={stage}>
                        <td>{stage}</td>
                        <td>{Math.round(totalCostTable.low[index])}</td>
                        <td>{Math.round(totalCostTable.base[index])}</td>
                        <td>{Math.round(totalCostTable.high[index])}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

};