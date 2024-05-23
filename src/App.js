import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import TodoTemplate from './components/todo/TodoTemplate';
import Login from './components/user/Login';
import Join from './components/user/Join';
import { AuthContextProvider } from './utils/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import KakaoLoginHandler from './components/user/KakaoLoginHandler';

function App() {
  return (
    // 데이터를 전달하고자 하는 자식 컴포넌트를 Provider로 감쌉니다.
    <AuthContextProvider>
      <Header />

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<TodoTemplate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/oauth/kakao" element={<KakaoLoginHandler />} />
        </Routes>
      </div>

      <Footer />
    </AuthContextProvider>
  );
}

export default App;
