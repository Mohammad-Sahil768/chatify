import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Rootlayout from './components/Rootlayout'
import Chatall from './components/chatall/Chatall';


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element: <Rootlayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path : "/Chatall",
          element : <Chatall/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      < RouterProvider  router = {router} />

    </div>
  );
}

export default App;
