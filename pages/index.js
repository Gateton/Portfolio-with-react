import React from 'react';
    import IntroContainer from '../components/IntroContainer';
    import ExperienceContainer from '../components/ExperienceContainer';
    import { userData } from '../config/userData';

    export default function Home() {
      return (
        <div>
          <IntroContainer userData={userData} />
          <ExperienceContainer experiences={userData.experiences} />
        </div>
      );
    }
