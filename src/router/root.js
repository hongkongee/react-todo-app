import { createBrowserRouter } from 'react-router-dom';
import Main from '../Main';
import Join from '../components/user/Join';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Login } from '@mui/icons-material';
import Chat from '../components/chat/Chat';
import MainPage from '../components/MainPage';
import boardRoutes from './board/boardRouter';

const root = createBrowserRouter([
  {
    path: '',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/todo',
        element: <TodoTemplate />,
      },
      {
        path: '/join',
        element: <Join />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/board',
        children: boardRoutes,
      },
    ],
  },
]);

export default root;
