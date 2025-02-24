import React,{ useState } from "react";
import { Menu, X, Home, Calendar, Users } from 'lucide-react'

function Navbar() {
    //모바일 메뉴 open/close state
    const [isOpen, setIsOpen] = useState(false);

    //Navigation Menu 항목들
    const menuItems = [
        { name:'홈', href: '#home', icon: Home},
        { name:'일정', href: '#schedule', icon: Calendar},
        { name:'멤버', href: '#members', icon: Users},
    ];

    return (
        <nav className="bg-[#D2665A] text-[#B82132] stcky top-0 z-50"> {/**Navigation Bar를 상단에 고정정 */}
            <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


               {/** 상단 네비게이션 바 */}
               <div className="flex item-center justify-between h-16">


                {/**동아리 로고 */}
                <div className="flex-shrink-0 flex items-center">
                    <img src="/logo-transparent2.png" alt="RedBeans Logo" className="w-6 h-"/>
                    <span className="ml-2 text-xl font-bold text-[#B82132]">RedBeans</span>
                </div>

                {/* 데스크톱 메뉴 */}
                <div className="hidden md:flex items-center space-x-8">
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-2 hover:text-[#121212] transition-colors duration-300"
                        >
                            <item.icon className="w-5 h-5"/>
                            <span>{item.name}</span>
                        </a>
                    ))}
                </div>

                
                {/**모바일 화면  및 버튼 */}
                <div className="md:hidden">
                    <button
                        onClick={() =>setIsOpen(!isOpen)} 
                        className="p-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >{/** 키보드 사용자를 위한 이벤트 반응 focus:outline-none:는 키보드 tab으로 버튼 인식시 기본 테두리를 제거하는 표현, 그리고 ring-2는 2px두께의 테두리 적용용*/} 
                        {isOpen ? (
                            <X className="w-6 h-6" aria-hidden="true"/>
                            ) : (
                            <Menu className="w-6 h-6" aria-hidden="true"/>
                        )}
                    </button>
                </div>
            </div>
            
                {/**모바일 화면에서 툴바 */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item)=>(
                                <a
                                key={item.name}
                                href={item.href}
                                className="flex item-center space-x-2 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors duration-200"
                                onClick={()=> setIsOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </a>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    </nav>
    );
}

export default Navbar;