import React, { useEffect, useState } from "react";
import {  Clock,  ArrowUpRight, Users } from 'lucide-react';

function TodaySchedule() {
    const [events, setEvents] = useState({
        currentEvents: [],
        upcomingEvents: [],
        pastEvents: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 현재 시간 기준으로 일정 상태 확인
    const getEventStatus = (event) => {
        const now = new Date();
        // 오늘 날짜를 Date 객체로 생성
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // event.eventDate를 Date 객체로 변환
        const eventDate = new Date(event.eventDate);
        eventDate.setHours(0, 0, 0, 0);
        
        // 날짜 비교
        if (eventDate.getTime() !== today.getTime()) {
            return eventDate.getTime() < today.getTime() ? 'past' : 'upcoming';
        }
        
        // 오늘 날짜라면 시간 정보를 이용하여 상태를 구분
        const startTime = new Date(`${event.eventDate}T${event.startTime}`);
        const endTime = event.endTime ? new Date(`${event.eventDate}T${event.endTime}`) : null;
        
        if (endTime && now > endTime) return 'ended';
        if (now >= startTime && (!endTime || now <= endTime)) return 'current';
        if (now < startTime) return 'upcoming';
        
        return 'past';
    };

    // 일정 데이터 가져오기
    useEffect(() => {

        const API_BASE_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:8080/api' 
        : 'https://redbeans-backend-production.up.railway.app/api';

        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                //http://redbeans-backend-production.up.railway.app/api/notion/events/today
                const response = await fetch(`${API_BASE_URL}/notion/events/today`);
                const result = await response.json();
                // 응답 상태 확인 및 로깅
                console.log('응답 상태:', response.status);
                if (!result.success) {
                    throw new Error(result.error || '일정을 불러오는데 실패했습니다.');
                }

                // 응답이 JSON이 아닌 경우에도 텍스트로 확인
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('API 오류 응답:', errorText);
                    throw new Error(`API 오류: ${response.status} - ${errorText}`);
                }
                
                
                console.log('API 응답 데이터:', result);

                if (!result.success) {
                    throw new Error(result.error || '일정을 불러오는데 실패했습니다.');
                }

                // 일정 분류
                const sorted = result.data.reduce((acc, event) => {
                    const status = getEventStatus(event);
                    if (status === 'current') acc.currentEvents.push(event);
                    else if (status === 'upcoming') acc.upcomingEvents.push(event);
                    else acc.pastEvents.push(event);
                    return acc;
                }, { currentEvents: [], upcomingEvents: [], pastEvents: [] });

                console.log('현재 일정:', sorted.currentEvents.length);
                console.log('예정된 일정:', sorted.upcomingEvents.length);
                console.log('종료된 일정:', sorted.pastEvents.length);

                // 각 카테고리 내에서 시간순 정렬
                ['currentEvents', 'upcomingEvents', 'pastEvents'].forEach(category => {
                    sorted[category].sort((a, b) => 
                        new Date(a.fullStartDateTime) - new Date(b.fullStartDateTime)
                    );
                });

                setEvents(sorted);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('일정을 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    
    }, []);

    // 카테고리 스타일
    const getCategoryStyle = (category) => {
        switch (category?.toLowerCase()) {
            case 'study':
                return 'bg-[#A9B5DF] text-[#FFF2F2]';
            case 'meeting':
                return 'bg-[#9DC08B] text-[#F8F5E9]';
            default:
                return 'bg-[#a25f7e] text-[#F6DED8]';
        }
    };


    // 일정 카드 컴포넌트
    const EventCard = ({ event, status }) => {

        const getStatusStyle = () => {
            switch (status) {
                case 'current':
                    return 'border-l-4 border-green-500';
                case 'upcoming':
                    return 'border-l-4 border-[#121212]';
                case 'ended':
                    return 'border-l-4 border-[#121212] opacity-65';
                default:
                    return 'opacity-60';
            }
        };

        // 날짜 포맷팅 함수
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            }).format(date);
        };

        // 상대적 날짜 계산 함수
        const getRelativeDate = (dateString) => {
            const eventDate = new Date(dateString);
            const today = new Date();
            const diffTime = eventDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return '오늘';
            if (diffDays === -1) return '어제';
            if (diffDays > 0) return `${diffDays}일 후`;
            return `${Math.abs(diffDays-1)}일 전`;
        };

        return (
            <div className={`bg-[#B82132] rounded-lg shadow-md p-6 hover:shadow-lg transition-duration-300 ${getStatusStyle()}`}>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-[#F9F7F7]">{event.title}</h3>
                            <div className="text-sm text-[#F9F7F7] opacity-80 mt-1">
                                {formatDate(event.eventDate)} ({getRelativeDate(event.eventDate)})
                            </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getCategoryStyle(event.category)}`}>
                        {event.category}
                    </span>
                </div>
                <div className="space-y-2 text-[#F9F7F7]">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#F9F7F7]"/>
                        <span>
                            {event.startTime} - {event.endTime}
                        </span>
                    </div>
                    {event.peoples && (
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#F9F7F7]"/>
                            <span>{event.peoples}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 섹션 헤더 컴포넌트
    const SectionHeader = ({ title, count }) => (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#F9F7F7]">{title}</h3>
            
            <span className="px-3 py-1 bg-[#f6ded830] rounded-full text-sm text-[#F9F7F7]">
                {count}개의 일정
            </span>
        </div>
    );

    return (
        <section className="py-12 bg-[#D2665A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-[#F9F7F7]">오늘의 일정</h2>
                        <p className="text-[#F9F7F7] mt-2">
                            {new Date().toLocaleDateString('ko-KR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                weekday: 'long'
                            })}
                        </p>
                    </div>
                    <a
                        href="https://www.notion.so/19f993a7d8b0802cb633c010972a7926?v=19f993a7d8b080ddb22c000c64258ddc&pvs=4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#F6DED8] hover:text-[#F9F7F7] transition-colors duration-300"
                    >
                        <span>전체 일정 보기</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>

                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="text-[#F6DED8]">일정을 불러오는 중...</div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <div className="text-[#F6DED8]">{error}</div>
                    </div>
                ) : (
                    <div className="space-y-8 ">
                        {/* 현재 진행 중인 일정 */}
                        {events.currentEvents.length > 0 && (
                            <div>
                                <SectionHeader title="진행 중인 일정" count={events.currentEvents.length} />
                                <div className="space-y-4">
                                    {events.currentEvents.map((event, index) => (
                                        <EventCard 
                                            key={`current-${index}`} 
                                            event={event} 
                                            status="current"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 예정된 일정 */}
                        {events.upcomingEvents.length > 0 && (
                            <div>
                                <SectionHeader title="예정된 일정" count={events.upcomingEvents.length} />
                                <div className="space-y-4">
                                    {events.upcomingEvents.map((event, index) => (
                                        <EventCard 
                                            key={`upcoming-${index}`} 
                                            event={event} 
                                            status="upcoming"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 종료된 일정 */}
                        {events.pastEvents.length > 0 && (
                            <div>
                                <SectionHeader title="종료된 일정" count={events.pastEvents.length} />
                                <div className="space-y-4">
                                    {events.pastEvents.map((event, index) => (
                                        <EventCard 
                                            key={`past-${index}`} 
                                            event={event} 
                                            status="ended"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 일정이 없는 경우 */}
                        {events.currentEvents.length === 0 && 
                         events.upcomingEvents.length === 0 && 
                         events.pastEvents.length === 0 && (
                            <div className="text-center py-8">
                                <div className="text-[#F9F7F7]">오늘 예정된 일정이 없습니다</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default TodaySchedule;