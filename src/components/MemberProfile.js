// components/MemberProfile.js
import React from 'react';
import { Github } from 'lucide-react';

function MemberProfile({ name, role, githubUrl, imageUrl }) {
    return (
        <div className="bg-[#121212] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="aspect-square relative w-5 h-3">
                
            </div>
            
            <div className="p-6 bg-gradient-to-t from-[#121212] to-transparent">
                <h3 className="text-xl font-semibold text-[#F9F7F7]">{name}</h3>
                <p className="text-[#F6DED8] mt-1">{role}</p>
                
                {githubUrl && (
                    <a 
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-[#D2665A] hover:text-[#F9F7F7] transition-colors duration-300"
                    >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default MemberProfile;