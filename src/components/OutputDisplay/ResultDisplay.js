
const ResultDisplay = ({ flattenedData }) => {
    return (
        <div>

            <h3>Installation Results</h3>
            <table>
                <tbody>
                    {Object.keys(flattenedData).filter(key => !Array.isArray(flattenedData[key])).map((key, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{flattenedData[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <h3>Casing Stage Table</h3>
            <table>
                <thead>
                    <tr>
                        <th>Stage</th>
                        <th>Top</th>
                        <th>Bottom</th>
                        <th>Casing</th>
                        <th>Drill Bit</th>
                    </tr>
                </thead>
                <tbody>
                    {flattenedData.casing_stage_table.map((stage, index) => (
                        <tr key={index}>
                            <td>{stage.stage}</td>
                            <td>{stage.top}</td>
                            <td>{stage.bottom}</td>
                            <td>{stage.casing}</td>
                            <td>{stage.drill_bit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <h3>Cost Breakdown</h3>
            <table>
                <thead>
                    <tr>
                        <th>Stage</th>
                        <th>Component</th>
                        <th>Low</th>
                        <th>Base</th>
                        <th>High</th>
                    </tr>
                </thead>
                <tbody>
                    {flattenedData.cost_estimation_table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.stage}</td>
                            <td>{item.component}</td>
                            <td>{item.low}</td>
                            <td>{item.base}</td>
                            <td>{item.high}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultDisplay;