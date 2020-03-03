/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import {Engine} from "../../components/Engine/Engine";
import Header from "../../components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="container is-fluid content-spaces ">
        <div className="box box-color">
          <Engine
            backgroundColor={0xf2f2f2}
            lights={[{ color: 0xffffff, position: { x: 1, y: 0.75, z: 0.5 } }]}
            grid={{ size: 30000, dimensions: 60 }}
          />
        </div>
      </div>
    </div>
  );
}
