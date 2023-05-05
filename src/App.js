import logo from './logo.svg';
import './App.css';
import { RamIndexLayout } from "@ram-sc/ram-components-package";
import Adrg from "./pages/Adrg";


function App() {
  const MenuVoices =
  {
    top:
      [
        {
          name: "TEST",
          list:
            [
              { id: 19, name: "Rilevazione Presenze", icon: <></>, path: "/riple", permission: 2, component: <Adrg /> },
              { id: 20, name: "Cosa 2", icon: <></>, path: "ModuleTest", permission: 2, component: <></> },
              { id: 56, name: "Cosa 3", icon: <></>, path: "ListTest", permission: 2, component: <></> },
            ],
        },
      ],
    bottom:
      [
        { id: 18, name: "Logout", icon: <></>, path: "/", permission: 2 }
      ]

  }
  sessionStorage.setItem("user", JSON.stringify({ username: "k", password: "k", permission: 3 }));

  const CheckShowFunction = (permission) => {
    return true;
  }

  return (
    <div className="App">
      <RamIndexLayout CheckShowFunction={CheckShowFunction} MenuVoices={MenuVoices} loginPage="/" />

    </div >
  );
}

export default App;
