import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home"
import NavBar from "./NavBar";
import About from "./About";
import Clients from "./Clients";
import Sponsors from "./Sponsors";
import Shows from "./Shows";
import ShowDetails from "./ShowDetails";
import Testimonials from "./Testimonials";
import Login from "./Login";

function App() {

  return (
    <>
    <header>  
      <NavBar />
    </header>
    <main>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/shows">
          <Shows />
        </Route>
        <Route exact path="/shows/:id">
          <ShowDetails />
        </Route>
        <Route exact path="/testimonials">
          <Testimonials />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </main>
    </>
  );
}

export default App;
