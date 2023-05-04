import { useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MenuLeft from "./components/layout/MenuLeft";
import MenuAC from "./components/acccount/MenuAC";
import React from "react";
function App(props) {
  let params1 = useLocation();
   return (
    <div className="App">
      <Header/>
      <section>
            <div className="container">
              <div className="row">
                {params1['pathname'].includes("account") ? (
                  <MenuAC />
                ) : (params1['pathname'].includes("user/my-product") || params1['pathname'].includes("/cart")) ? null : (
                  <MenuLeft />
                )}
                  
                {props.children}
              </div>
            </div>
        </section>
      <Footer/>
    </div>
  );
}

export default App;
