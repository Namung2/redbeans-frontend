import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TodaySchedule from './components/TodaySchedule';
import MemberProfile from './components/MemberProfile';
import Activities from './components/Activities';

function App(){
  //멤버 데이터 -> 나중에 백엔드나 데이터 베이스로 이동
  const members = [
    {
      name:"조남웅",
      role:"회장",
      githubUrl:"https://github.com/Namung2",
      imageUrl:"/api/placeholder/150/150"
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-[#D2665A]">
            <Navbar />
            <HeroSection/>
            <TodaySchedule/>
            <section id="members" className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">RedBeans 멤버들</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member, index)=> (
                    <MemberProfile key={index} {...member}/>
                  ))}
                </div>
              </div>
            </section>
          </div>
        } />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </Router>
  );
}

export default App;