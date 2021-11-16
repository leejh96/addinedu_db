import './App.css';
import About from './components/About';
import Home from './components/Home';
import BoardWrite from './board/BoardWrite';
import BoardList from './board/BoardList';
import BoardEdit from './board/BoardEdit';

import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link className="item" to="/">홈</Link>
        <Link className="item" to="/about">소개</Link>
        <Link className="item" to="/board/1">게시판</Link>
        <hr />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/:page" element={<BoardList />} />
        <Route path="/board/edit/:id" element={<BoardEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;