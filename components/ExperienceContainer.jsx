import { motion, useScroll, useSpring } from 'framer-motion';
    import styled, { keyframes } from 'styled-components';
    import { useState } from 'react';
    import { FaBriefcase, FaCalendar, FaBuilding, FaTasks } from 'react-icons/fa';

    const gradientAnimation = keyframes`
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    `;

    const ExperienceSection = styled.section`
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%);
      min-height: 100vh;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #00c6ff, #0072ff, #00c6ff);
        background-size: 200% 200%;
        animation: ${gradientAnimation} 6s linear infinite;
      }
    `;

    const ExperienceContent = styled.div`
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    `;

    const SectionTitle = styled(motion.h2)`
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      background: linear-gradient(45deg, #0072ff, #00c6ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      display: inline-block;
      left: 50%;
      transform: translateX(-50%);

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #0072ff, #00c6ff);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }

      &:hover::after {
        transform: scaleX(1);
      }
    `;

    const ExperienceItem = styled(motion.div)`
      margin-bottom: 2rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(180deg, #0072ff, #00c6ff);
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.3s ease;
      }

      &:hover::before {
        transform: scaleY(1);
      }
    `;

    const ExperienceHeader = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    `;

    const Title = styled.h3`
      font-size: 1.5rem;
      color: #1a1a1a;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: #0072ff;
      }
    `;

    const Company = styled.div`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-weight: 500;

      svg {
        color: #0072ff;
      }
    `;

    const Period = styled.div`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #888;
      font-size: 0.9rem;

      svg {
        color: #0072ff;
      }
    `;

    const Description = styled.div`
      color: #444;
      line-height: 1.6;
      margin-top: 1rem;
    `;

    const Skills = styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    `;

    const Skill = styled(motion.span)`
      padding: 0.3rem 0.8rem;
      background: rgba(0, 114, 255, 0.1);
      color: #0072ff;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #0072ff;
        color: white;
      }
    `;

    const ProgressBar = styled(motion.div)`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: #0072ff;
      transform-origin: 0%;
    `;

    const ExperienceContainer = ({ experiences }) => {
      const [expandedId, setExpandedId] = useState(null);
      const { scrollYProgress } = useScroll();
      const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      });

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: 0.3
          }
        }
      };

      const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      };

      return (
        <ExperienceSection>
          <ProgressBar style={{ scaleX }} />
          <ExperienceContent
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <SectionTitle
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Professional Experience
            </SectionTitle>

            {experiences.map((experience, index) => (
              <ExperienceItem
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setExpandedId(expandedId === index ? null : index)}
              >
                <ExperienceHeader>
                  <Title>
                    <FaBriefcase /> {experience.title}
                  </Title>
                  <Company>
                    <FaBuilding /> {experience.company}
                  </Company>
                  <Period>
                    <FaCalendar /> {experience.period}
                  </Period>
                </ExperienceHeader>

                <Description>
                  <motion.div
                    initial={false}
                    animate={{ height: expandedId === index ? "auto" : "80px" }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    {experience.description}
                  </motion.div>
                </Description>

                <Skills>
                  {experience.skills?.map((skill, skillIndex) => (
                    <Skill
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </Skill>
                  ))}
                </Skills>
              </ExperienceItem>
            ))}
          </ExperienceContent>
        </ExperienceSection>
      );
    };

    export default ExperienceContainer;
