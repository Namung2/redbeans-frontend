import  React from 'react';
import { ArrowRight,Code2, Terminal, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
//첫 화면 UI
function HeroSection() {
    //애니메이션 배경 그라데이션 스타일 색깔 바꿔야함
    

    //동아리 feature 카드데이터 이거 icon은 좀더 어울리는거 찾아보자
    //
    const features =[
        {
            icon: Code2,
            title: '실전 프로젝트',
            description: '서비스 기획 및 프로젝트 경혐',
        },
        {
            icon: Terminal,
            title:'알고리즘 스터디',
            description:'코딩 테스트 대비 알고리즘 학습',
        },
        {
            icon: Coffee,
            title:'개발자 네트워킹',
            description:'선배 개발자들과의 만남과 경험 공유',
        },
    ];

    return (
        <section className="relative overflow-hidden">
            {/**배경 */}
            <div
             className="absolute inset-0 z-0 bg-[#121212]"
             //style={grandientStyle}
             />

             {/**메인 */}
             <div className="relative z-10 px-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="max-w-7xl mx-auto">
                    {/**Hero text Section 색깔은 좀 고민해보자*/}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F9F7F7] mb-6 tracking-tight"  >
                            {/**text-4xl sm:text-5xl lg:text-6xl  // 화면 크기에 따라 제목 크기 변경 */}
                         <span className="text-[#B82132]">RedBeans :</span><br className="sm:hidden"/> 끊임없이 성장하는 열정의 씨앗
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-[#F9F7F7] mb-8">
                        단국대학교 컴퓨터 공학과 학술 동아리
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4"> {/** flex-col sm:flex-row: 모바일에서는 세로로, 데스크톱에서는 가로로 배치*/}
                            
                            <a href="https://naver.me/GOPwN9CO" target="_blank" rel="noopener noreferrer">
                                <button className="bg-[#B82132] hover:bg-[#b8213375] text-[#F9F7F7] px-8 py-3 rounded-lg font-semibold transition-colors duration-500">
                                    가입 신청하기
                                </button>
                            </a>
                            <Link to="/activities">
                            <button className="border border-[#F6DED8] text-[#F9F7F7] hover:bg-[#B82132] px-8 py-3 rounded-lg font-semibold transition-colors duration-500">
                                활동 둘러보기
                            </button>
                            </Link>
                        </div>
                    </div>


                    {/**feature 카드 영역 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {features.map((feature,index)=>(
                            <div
                                key={index}
                                className="bg-[#D2665A] bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-[#F9F7F7] hover:bg-opacity-20 transition-all duration-200"
                                >
                                <feature.icon className="w-12 h-12 text-[#B82132] mb-4" />
                                <h3 className="text-xl font-semibold text-[#F9F7F7] mb-2">{feature.title}</h3>
                                <p className="text-[#F9F7F7]">{feature.description}</p>
                                </div>
                            ))}
                    </div>
                </div>
             </div>
        </section>
    );
}

export default HeroSection;