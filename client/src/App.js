import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/NavigationBar";
import Pokemon from "./pages/Pokemon";
import Battles from "./pages/Battles";
import Trainers from "./pages/Trainers";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Types from "./pages/Types";
import TrainerToPokemon from "./pages/TrainerToPokemon";



function App() {
  return (
      <Router>
          <Navbar />
              <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route  path='/pokemon'  element={<Pokemon />} />
                  <Route  path='/battles'  element={<Battles />} />
                  <Route  path='/trainers'  element={<Trainers />} />
                  <Route  path='/stats'  element={<Stats />} />
                  <Route  path='/types'  element={<Types />} />
                  <Route  path='/trainertopokemon'  element={<TrainerToPokemon />} />
              </Routes>
      </Router>

  )
}

export default App;

