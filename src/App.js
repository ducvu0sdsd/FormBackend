
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LinkManagerPage from './LinkDownloadPage/LinkManagerPage'
import HomePage from './HomePage';
import ModPage from './ModPage/ModPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/manage-links' element={<LinkManagerPage />} />
          <Route path='/manage-mods' element={<ModPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
