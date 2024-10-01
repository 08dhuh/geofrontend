import './App.css';
import InputForm from './components/InputForm';

function App() {
  return (
    <div id="root" className="app">
      <h1 style={{ marginBottom: '0px' }}>Wellbore Cost Estimation & Specifications</h1>
      <p><strong>Click on the interactive map to analyze wellbore cost and specifications for the selected location.</strong></p>
        <InputForm />

    </div>
  );
}

export default App;
