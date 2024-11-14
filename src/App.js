import './App.css';
import { GlobalConfigProvider } from './context/GlobalConfigContext';
//import InputForm from './components/InputForm/InputForm';
import WellboreCostApp from './components/WellboreCostApp';

function App() {
  return (
    <div id="root" className="app">
      <h1 style={{ marginBottom: '0px' }}>Wellbore Cost Estimation & Specifications</h1>
      <p><strong>Click on the interactive map to analyze wellbore cost and specifications for the selected location.</strong></p>
        <GlobalConfigProvider>
            {/*<InputForm />*/}
            <WellboreCostApp />
        </GlobalConfigProvider>

    </div>
  );
}

export default App;
