import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Users, TrendingUp, Award, BookOpen } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Demo testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Computer Science Student",
      university: "MIT",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c5b2?w=150&h=150&fit=crop&crop=face",
      quote: "Reviewing others' assignments on EduMate taught me so much! I discovered different approaches to coding problems and improved my own solutions. The peer feedback system is incredibly valuable.",
      achievement: "Reviewed 50+ assignments",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Pre-Med Student",
      university: "Stanford University",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "I submitted my biology research assignment and got amazing feedback from peers worldwide. The community helped me identify gaps I never noticed. My final grade improved by two letter grades!",
      achievement: "Received 25+ peer reviews",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Business Major",
      university: "Harvard Business School",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The assignment community on EduMate is incredible. I participate in challenges regularly, learn from diverse perspectives, and my analytical skills have improved dramatically through peer reviews.",
      achievement: "Top contributor this month",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "Engineering Student",
      university: "UC Berkeley",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "Submitting my assignments to EduMate's community was game-changing. Getting constructive feedback from students across different universities broadened my perspective and improved my work quality.",
      achievement: "Submitted 30+ assignments",
      rating: 5
    }
  ];

  // Stats data
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "50,000+",
      label: "Active Students",
      color: "text-blue-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: "125,000+",
      label: "Assignments Submitted",
      color: "text-green-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "300,000+",
      label: "Peer Reviews Given",
      color: "text-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "92%",
      label: "Improved Through Feedback",
      color: "text-orange-600"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    // bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]
    <section className="py-20  px-4 sm:px-5 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Award className="w-6 h-6 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-4">
            Success Stories That
            <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]"> Inspire</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] max-w-3xl mx-auto">
            Join thousands of students who've enhanced their learning through peer collaboration, assignment sharing, and community feedback
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark] rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4">
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl  font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-2">{stat.number}</div>
              <div className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 w-full ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-3xl shadow-xl  p-8 md:p-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      
                      {/* Quote Section */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-6">
                          <Quote className="w-12 h-12 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] opacity-50" />
                        </div>
                        
                        <blockquote className="text-lg md:text-xl text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed mb-6 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        <div className="inline-flex items-center justify-center bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] rounded-full px-6 py-3">
                          <TrendingUp className="w-5 h-5 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mr-2" />
                          <span className="font-semibold text-[var(--color-text-primary-dark)]">{testimonial.achievement}</span>
                        </div>
                      </div>
                      
                      {/* Profile Section */}
                      <div className="flex-shrink-0 text-center">
                        <div className="relative mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-32 h-32 rounded-full object-cover shadow-xl mx-auto"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        
                        <h4 className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] mb-2">{testimonial.name}</h4>
                        <p className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] font-semibold mb-1">{testimonial.role}</p>
                        <p className="text-gray-500">{testimonial.university}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-primary-dark)]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-primary-dark)]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary-dark)] mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join the community where students submit, review, and learn from each other's work
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-[var(--color-text-primary-dark)] text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Start Your Journey Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;