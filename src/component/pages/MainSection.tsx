import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  padding: 20px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const ProjectItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  cursor: pointer;
  will-change: opacity, transform;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  

  ${ProjectItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface Project {
  title: string;
  image: string;
  description: string;
}

const MainSection = () => {
  const projectRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    projectRefs.current.forEach((project, index) => {
      // GSAP 타임라인 생성
      const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

      // 로딩 시 fadeIn 애니메이션 (지연 시간 추가)
      tl.from(project, { opacity: 0, y: 20, delay: index * 0.1 });

      // 마우스 오버/아웃 시 slideDown/slideUp 애니메이션
      const overlay = project.querySelector('.ProjectOverlay') as HTMLElement;
      if (overlay) {
        tl.to(overlay, { y: 0, duration: 0.3, paused: true }).reverse(); // paused: true로 초기 상태 설정
        project.addEventListener('mouseenter', () => tl.play());
        project.addEventListener('mouseleave', () => tl.reverse());
      }
    });
  }, []);

  const projects: Project[] = [
    { title: 'Project 1', image: '/lantern-6826697_1280.jpg', description: 'Project 1 description' },
    { title: 'Project 2', image: '/lantern-6826697_1280.jpg', description: 'Project 2 description' },
    { title: 'Project 3', image: '/lantern-6826697_1280.jpg', description: 'Project 3 description' },
    // 더 많은 프로젝트 추가 가능
  ];

  return (
    <Container>
      <h1>My Portfolio</h1>
      <p>Welcome to my portfolio!</p>

      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            ref={(el) => {
              projectRefs.current[index] = el!;
            }}
          >
            <img src={project.image} alt={project.title} />
            <ProjectOverlay className="ProjectOverlay">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </ProjectOverlay>
          </ProjectItem>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default MainSection;