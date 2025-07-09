import React, { useEffect, useState } from 'react';
import MapBox from "@/components/ui/MapBox.jsx";
import { useTranslation } from "react-i18next";
import HeaderBar from "@/components/ui/HeaderBar.jsx";

function App() {
    const {t} = useTranslation();

  return (
    <>
      <HeaderBar />
      {/*<MapBox />*/}
        <p>{t('hello_world')}</p>
    </>
  )
}

export default App
