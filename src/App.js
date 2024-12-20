import './App.css';
import { GlobalConfigProvider } from './context/GlobalConfigContext';
import WellboreCostApp from './components/WellboreCostApp';

function App() {
  return (
    <div className="container-fluid p-3">
      <div className="text-center mb-4">
        <h2 className="custom-title">BoreCost-LTA</h2>
        <div className="disclaimer-container">
          <p className="custom-lead">
            <strong className="highlighted-text">
              Use the interactive map to explore wellbore installation costs and specifications for locations within the Lower Tertiary Aquifer (LTA) in Victoria. The shaded area highlights the extent of the LTA layer across the region. Adjust the well parameters as needed, then click Submit.
            </strong>
          </p>
        </div>


      </div>
      <GlobalConfigProvider>
        <WellboreCostApp />
      </GlobalConfigProvider>
    </div>
  );
}

export default App;
