/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import {Engine} from "../../components/Engine/Engine";
import Header from "../../components/Header";
import {sceneData} from "../../utils/scene.data";
import {layoutControl} from "../../utils/scene.data";

export default function HomePage() {
  const { showHeader } = layoutControl;

  const header = () => {
    if(showHeader) {
      return <Header  />;
    }
  };
  return (
    <div>
      {header()}
      <div className="container is-fluid content-spaces ">
        <div className="box box-color">
          <Engine settings={sceneData.settings} grid={sceneData.grid} />
        </div>
      </div>
    </div>
  );
}
