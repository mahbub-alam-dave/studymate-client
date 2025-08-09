import React from 'react';
import Banner from '../../components/homeComponents/Banner';
import FeatureSection from '../../components/homeComponents/FeatureSection';
import FrequentQuestionSection from '../../components/homeComponents/FrequentQuestionSection';
import TestimonialsSection from '../../components/homeComponents/TestimonialsSection';

const Home = () => {
    return (
        <div className='w-full'>
            <Banner />
            <FeatureSection />
            <FrequentQuestionSection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;