import React from 'react';
import MapBox from "@/components/custom/MapBox.jsx";
import HeaderBar from "@/components/custom/HeaderBar.jsx";
import MainPageContent from "@/components/custom/MainPageContent.jsx";

function App() {
  return (
    <main className="bg-base-200/40 min-h-screen">
      <HeaderBar />
        <div className={"max-w-7xl mx-auto"}>
            <MainPageContent />
        </div>
    </main>
  )
}

export default App
