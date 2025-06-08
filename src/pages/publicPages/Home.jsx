import React from 'react';
import Banner from '../../components/homeComponents/Banner';
import FeatureSection from '../../components/homeComponents/FeatureSection';
import FrequentQuestionSection from '../../components/homeComponents/FrequentQuestionSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeatureSection />
            <FrequentQuestionSection />
        </div>
    );
};

export default Home;