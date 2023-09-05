import SideBar from "./layout/SideBar.tsx";
import Header from "./layout/Header.tsx";
import { Outlet } from "react-router-dom";

export function LayOut(){
  return <div style={{display: 'flex', flexDirection: 'column'}}>
    <Header/>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <SideBar/>
      <Outlet/>
    </div>
    <footer/>
  </div>
}
