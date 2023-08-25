import React from "react";
import Create from "./Create";
import Auth from "./Auth";

export default function App() {
  return (
    <>
      <Auth />
      <br /> <br /> <br />
      <h1 style={{textAlign:"center"}}>----------------------------------------</h1>
      <br /> <br /> <br />
      <Create />
    </>
  );
}
