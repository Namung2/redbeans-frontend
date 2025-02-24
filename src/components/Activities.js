// components/Activities.js
import React, { useState } from 'react';
import { ArrowLeft, Plus, Book, Code, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Activities() {
    const navigate = useNavigate();
    
    // 가상의 활동 데이터 상태 관리
    const [activities, setActivities] = useState([
        {
            id: 1,
            year: '신입생',
            title: '백준 알고리즘 스터디',
            description: '코딩 테스트 대비를 위한 백준 알고리즘 문제 풀이와 스터디 활동',
            icon: Book,
            members: 12,
            achievements: ['solved.ac Class 3 달성', '주 2회 스터디 진행', '알고리즘 기초 완성'],
            color: 'bg-green-100 text-green-800'
        },
        {
            id: 2,
            year: '고학년',
            title: '웹서비스 프로젝트',
            description: '실제 사용 가능한 웹 서비스를 기획부터 배포까지 경험하는 팀 프로젝트',
            icon: Code,
            members: 8,
            achievements: ['React/Spring 기반 풀스택 개발', '깃허브 협업 경험', '포트폴리오 작품 제작'],
            color: 'bg-blue-100 text-blue-800'
        },
        {
            id: 3,
            year: '고학년',
            title: 'AI 논문 스터디',
            description: '최신 AI 기술 트렌드를 파악하고 논문을 함께 리뷰하는 심화 스터디',
            icon: FileText,
            members: 5,
            achievements: ['주요 AI 논문 리뷰', '모델 구현 실습', '연구 방법론 학습'],
            color: 'bg-purple-100 text-purple-800'
        }
    ]);

    // 새 프로젝트 상태 관리
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [newProject, setNewProject] = useState({
        year: '신입생',
        title: '',
        description: '',
        members: 0,
        achievements: ['']
    });

    // 뒤로가기 처리
    const handleBack = () => {
        navigate('/');
    };

    // 새 프로젝트 추가 폼 토글
    const toggleAddProject = () => {
        setIsAddingProject(!isAddingProject);
    };

    // 입력 필드 변경 처리
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({
            ...newProject,
            [name]: value
        });
    };

    // 성과 항목 변경 처리
    const handleAchievementChange = (index, value) => {
        const updatedAchievements = [...newProject.achievements];
        updatedAchievements[index] = value;
        setNewProject({
            ...newProject,
            achievements: updatedAchievements
        });
    };

    // 성과 항목 추가
    const addAchievement = () => {
        setNewProject({
            ...newProject,
            achievements: [...newProject.achievements, '']
        });
    };

    // 새 프로젝트 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 빈 성과 항목 제거
        const filteredAchievements = newProject.achievements.filter(item => item.trim() !== '');
        
        // 아이콘은 기본값으로 설정
        const newProjectWithIcon = {
            ...newProject,
            id: activities.length + 1,
            icon: Book,
            achievements: filteredAchievements,
            color: 'bg-yellow-100 text-yellow-800' // 기본 색상
        };
        
        // 활동 목록에 추가
        setActivities([...activities, newProjectWithIcon]);
        
        // 폼 초기화
        setNewProject({
            year: '신입생',
            title: '',
            description: '',
            members: 0,
            achievements: ['']
        });
        
        // 폼 닫기
        setIsAddingProject(false);
    };

    return (
        <div className="min-h-screen bg-[#F9F7F7]">
            {/* 헤더 */}
            <header className="bg-[#B82132] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={handleBack}
                                className="p-2 rounded-full hover:bg-[#B82132] transition-colors duration-300"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-2xl font-bold">RedBeans 활동</h1>
                        </div>
                        <button 
                            onClick={toggleAddProject}
                            className="flex items-center space-x-1 bg-[#D2665A] hover:bg-[#971b29] px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                            <Plus className="w-5 h-5" />
                            <span>프로젝트 추가</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 학년별 활동 섹션 */}
                <div className="space-y-10">
                    {/* 신입생 섹션 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">신입생 활동</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities
                                .filter(activity => activity.year === '신입생')
                                .map(activity => (
                                    <ActivityCard key={activity.id} activity={activity} />
                                ))
                            }
                        </div>
                    </section>

                    {/* 고학년 섹션 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">고학년 활동</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities
                                .filter(activity => activity.year === '고학년')
                                .map(activity => (
                                    <ActivityCard key={activity.id} activity={activity} />
                                ))
                            }
                        </div>
                    </section>
                </div>
            </main>

            {/* 프로젝트 추가 기능 */}
            {isAddingProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">새 프로젝트 추가</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* 학년 선택 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">학년</label>
                                <select 
                                    name="year"
                                    value={newProject.year}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B82132] focus:border-[#B82132]"
                                >
                                    <option value="신입생">신입생</option>
                                    <option value="고학년">고학년</option>
                                </select>
                            </div>
                            
                            {/* 프로젝트 제목 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 제목</label>
                                <input 
                                    type="text"
                                    name="title"
                                    value={newProject.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B82132] focus:border-[#B82132]"
                                    placeholder="예: 백준 알고리즘 스터디"
                                />
                            </div>
                            
                            {/* 설명 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                                <textarea 
                                    name="description"
                                    value={newProject.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B82132] focus:border-[#B82132]"
                                    placeholder="프로젝트 설명을 입력하세요"
                                ></textarea>
                            </div>
                            
                            {/* 참여 인원 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">참여 인원</label>
                                <input 
                                    type="number"
                                    name="members"
                                    value={newProject.members}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B82132] focus:border-[#B82132]"
                                />
                            </div>
                            
                            {/* 성과 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">주요 성과</label>
                                <div className="space-y-2">
                                    {newProject.achievements.map((achievement, index) => (
                                        <input 
                                            key={index}
                                            type="text"
                                            value={achievement}
                                            onChange={(e) => handleAchievementChange(index, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B82132] focus:border-[#B82132]"
                                            placeholder="성과 항목"
                                        />
                                    ))}
                                    <button 
                                        type="button"
                                        onClick={addAchievement}
                                        className="text-sm text-[#B82132] hover:text-[#971b29] flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> 성과 추가
                                    </button>
                                </div>
                            </div>
                            
                            {/* 버튼 그룹 */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={toggleAddProject}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B82132]"
                                >
                                    취소
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#B82132] hover:bg-[#971b29] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B82132]"
                                >
                                    추가하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// 활동 카드 컴포넌트
function ActivityCard({ activity }) {
    const { title, description, icon: Icon, members, achievements, color } = activity;
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-duration-300">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${color}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{description}</p>
                
                <div className="text-sm text-gray-500 mb-4">
                    참여 인원: {members}명
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">주요 성과</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        {achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-[#B82132] mr-2">•</span>
                                <span>{achievement}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Activities;