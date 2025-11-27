import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // const skills = ['Java', 'Python', 'Git', 'Spring Framework', 'Spring Boot', 'eGovFramework', 'Django', 'FastAPI', 'Html/Css', 'Jsp', 'JavaScript', 'jQuery', 'TypeScript', 'React', 'MySQL/MariaDB', 'OracleDB', 'Tibero', 'PostegreSQL', 'SEO', '웹표준', '웹접근성', 'SSL', 'Linux', 'CentOS', 'RockyLinux', 'Ubuntu', 'NGINX', 'Docker', 'Apache', 'Tomcat', 'Mybatis', 'JPA', 'Spring Security',];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              안녕하세요 인프라와 애플리케이션의 경계를 넘나들며 안정적인 서비스를 만드는 개발자,
              백세빈입니다.
            </p>
            <p>
              폐쇄망 환경에서 서버를 직접 구성하고 배포 파이프라인을 설계한 경험을 통해, 시스템
              안정성과 운영 효율을 동시에 확보했습니다.
            </p>
            <p>
              데이터 구조 리디자인과 API 성능 개선을 진행하며, 실제 사용자 경험 중심의 개발을
              실현했습니다.
            </p>
            <p>
              앞으로도 서버부터 코드 레벨까지 아우르는 통합적인 시야로, 견고하면서도 유연한 백엔드
              시스템을 구축하겠습니다
            </p>
          </div>
          <p></p>
          <p>Backend</p>
          <ul className="skills-list">
            <li>Java</li>
            <li>Python</li>
          </ul>
          <p></p>
          <p>Frontend</p>
          <ul className="skills-list">
            <li>Html/Css</li>
            <li>Jsp</li>
            <li>JavaScript</li>
            <li>jQuery</li>
            <li>TypeScript</li>
            <li>React</li>
          </ul>
          <p></p>
          <p>Framworks / Libraries</p>
          <ul className="skills-list">
            <li>Spring Framework</li>
            <li>Spring Boot</li>
            <li>eGovFramework</li>
            <li>Django</li>
            <li>FastAPI</li>
            <li>Mybatis</li>
            <li>JPA</li>
            <li>Spring Security</li>
          </ul>
          <p></p>
          <p>Server</p>
          <ul className="skills-list">
            <li>CentOS</li>
            <li>LockyLinux</li>
            <li>Ubuntu</li>
            <li>Apache</li>
            <li>Tomcat</li>
            <li>NGINX</li>
            <li>Docker</li>
          </ul>
          <p></p>
          <p>Database</p>
          <ul className="skills-list">
            <li>MySQL/MariaDB</li>
            <li>OracleDB</li>
            <li>Tibero</li>
            <li>PostegreSQL</li>
          </ul>
          {/* <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul> */}
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
