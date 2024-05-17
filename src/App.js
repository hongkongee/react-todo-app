import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import TodoTemplate from './components/todo/TodoTemplate';
import Login from './components/user/Login';
import Join from './components/user/Join';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TodoTemplate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
