import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Router } from '@reach/router';
import Dashboard from './components/Dashboard';
import Form from './components/Form';

function App() {

  return (
    <div className="container">
      <Router>
        <Dashboard path="/"/>
        <Form path="/projects/new"/>
      </Router>
    </div>
  );
}

export default App;
