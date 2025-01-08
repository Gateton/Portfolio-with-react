import { motion } from 'framer-motion';
    import styled from 'styled-components';

    const IntroSection = styled.section`
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
      color: #ffffff;
    `;

    const IntroContent = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      max-width: 1200px;
      width: 100%;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
    `;

    const IntroText = styled(motion.div)`
      h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      h2 {
        font-size: 2rem;
        color: #4ECDC4;
        margin-bottom: 2rem;
      }

      p {
        font-size: 1.2rem;
        line-height: 1.6;
        color: #f0f0f0;
        margin-bottom: 2rem;
      }
    `;

    const ProfileImage = styled(motion.div)`
      position: relative;
      
      img {
        width: 100%;
        max-width: 400px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 20px;
        border: 2px solid #4ECDC4;
        transform: translate(15px, 15px);
        z-index: -1;
      }
    `;

    const SocialLinks = styled(motion.div)`
      display: flex;
      gap: 1rem;
      margin-top: 2rem;

      a {
        padding: 0.5rem 1rem;
        border: 2px solid #4ECDC4;
        border-radius: 25px;
        color: #4ECDC4;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background: #4ECDC4;
          color: #1a1a1a;
        }
      }
    `;

    const IntroContainer = ({ userData }) => {
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
        hidden: { y: 20, opacity: 0 },
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
        <IntroSection>
          <IntroContent
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <IntroText variants={itemVariants}>
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {userData.name}
              </motion.h1>
              <motion.h2 variants={itemVariants}>
                {userData.title}
              </motion.h2>
              <motion.p variants={itemVariants}>
                {userData.bio}
              </motion.p>
              <SocialLinks variants={itemVariants}>
                {userData.socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </SocialLinks>
            </IntroText>

            <ProfileImage
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={userData.profileImage}
                alt={userData.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </ProfileImage>
          </IntroContent>
        </IntroSection>
      );
    };

    export default IntroContainer;
