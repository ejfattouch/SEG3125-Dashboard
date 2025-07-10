import React from 'react';
import MapBox from "@/components/ui/MapBox.jsx";
import HeaderBar from "@/components/ui/HeaderBar.jsx";
import DataContainer from "@/components/ui/DataContainer.jsx";

function App() {
  return (
    <main className="bg-base-200/40">
      <HeaderBar />
        <div className={"max-w-7xl mx-auto"}>
            <DataContainer />
        </div>
    </main>
  )
}

export default App
