import React from 'react';
import './App.css';
import Header from "./components/layout/header";
import Content from "./components/layout/content";
import Footer from "./components/layout/footer";
import {Provider} from "react-redux";
import configureStore from "./store/configure.store";


const initialState = {};
const store = configureStore(initialState);

function App() {
  return (
      <Provider store={store}>
          <>
            <Header />
            <Content />
            <Footer />
          </>
      </Provider>
  );
}

export default App;
