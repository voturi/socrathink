'use client';

import { useState } from 'react';
import { Calculator, Ruler, PieChart, Triangle, Square, Zap, BookOpen, TrendingUp } from 'lucide-react';
import ClassSelector from './ClassSelector';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  icon: any;
  questionsCount: number;
  estimatedTime: string;
  classId: string;
}

const allTopics: Topic[] = [
  // Elementary Math
  {
    id: 'elem-1',
    title: 'Counting & Numbers',
    description: 'Learn to count, recognize numbers, and understand place value',
    difficulty: 1,
    icon: BookOpen,
    questionsCount: 12,
    estimatedTime: '15 mins',
    classId: 'elementary'
  },
  {
    id: 'elem-2',
    title: 'Addition & Subtraction',
    description: 'Master basic addition and subtraction with fun exercises',
    difficulty: 1,
    icon: Calculator,
    questionsCount: 15,
    estimatedTime: '20 mins',
    classId: 'elementary'
  },
  {
    id: 'elem-3',
    title: 'Shapes & Patterns',
    description: 'Identify shapes, create patterns, and understand geometry basics',
    difficulty: 1,
    icon: Square,
    questionsCount: 10,
    estimatedTime: '15 mins',
    classId: 'elementary'
  },
  {
    id: 'elem-4',
    title: 'Simple Fractions',
    description: 'Introduction to fractions with visual aids and real-world examples',
    difficulty: 2,
    icon: PieChart,
    questionsCount: 12,
    estimatedTime: '18 mins',
    classId: 'elementary'
  },
  
  // Middle School Math
  {
    id: 'middle-1',
    title: 'Fractions & Decimals',
    description: 'Advanced fraction operations and decimal conversions',
    difficulty: 2,
    icon: PieChart,
    questionsCount: 15,
    estimatedTime: '20 mins',
    classId: 'middle'
  },
  {
    id: 'middle-2',
    title: 'Basic Algebra',
    description: 'Introduction to variables, equations, and solving for unknowns',
    difficulty: 3,
    icon: Calculator,
    questionsCount: 12,
    estimatedTime: '25 mins',
    classId: 'middle'
  },
  {
    id: 'middle-3',
    title: 'Geometry Fundamentals',
    description: 'Area, perimeter, angles, and basic geometric proofs',
    difficulty: 2,
    icon: Triangle,
    questionsCount: 18,
    estimatedTime: '30 mins',
    classId: 'middle'
  },
  {
    id: 'middle-4',
    title: 'Ratios & Proportions',
    description: 'Understanding ratios, proportions, and percentage calculations',
    difficulty: 2,
    icon: TrendingUp,
    questionsCount: 14,
    estimatedTime: '22 mins',
    classId: 'middle'
  },
  
  // High School Math
  {
    id: 'high-1',
    title: 'Algebra II',
    description: 'Quadratic equations, polynomials, and advanced algebraic concepts',
    difficulty: 3,
    icon: Calculator,
    questionsCount: 20,
    estimatedTime: '35 mins',
    classId: 'high-school'
  },
  {
    id: 'high-2',
    title: 'Geometry & Trigonometry',
    description: 'Advanced geometric theorems and introduction to trigonometric functions',
    difficulty: 3,
    icon: Triangle,
    questionsCount: 18,
    estimatedTime: '40 mins',
    classId: 'high-school'
  },
  {
    id: 'high-3',
    title: 'Statistics & Probability',
    description: 'Data analysis, probability distributions, and statistical inference',
    difficulty: 3,
    icon: TrendingUp,
    questionsCount: 16,
    estimatedTime: '30 mins',
    classId: 'high-school'
  },
  {
    id: 'high-4',
    title: 'Functions & Graphing',
    description: 'Linear, quadratic, and exponential functions with graphing techniques',
    difficulty: 3,
    icon: Zap,
    questionsCount: 22,
    estimatedTime: '45 mins',
    classId: 'high-school'
  },
  
  // College Prep
  {
    id: 'college-1',
    title: 'Pre-Calculus',
    description: 'Advanced functions, limits, and preparation for calculus',
    difficulty: 4,
    icon: Zap,
    questionsCount: 25,
    estimatedTime: '50 mins',
    classId: 'college-prep'
  },
  {
    id: 'college-2',
    title: 'Advanced Statistics',
    description: 'Hypothesis testing, regression analysis, and advanced probability',
    difficulty: 4,
    icon: TrendingUp,
    questionsCount: 20,
    estimatedTime: '45 mins',
    classId: 'college-prep'
  },
  {
    id: 'college-3',
    title: 'Discrete Mathematics',
    description: 'Logic, set theory, combinatorics, and graph theory',
    difficulty: 4,
    icon: Square,
    questionsCount: 18,
    estimatedTime: '40 mins',
    classId: 'college-prep'
  }
];

const getDifficultyColor = (difficulty: number) => {
  switch (difficulty) {
    case 1: return 'bg-chart-4/20 text-chart-4 border-chart-4/20';
    case 2: return 'bg-chart-1/20 text-chart-1 border-chart-1/20';
    case 3: return 'bg-chart-2/20 text-chart-2 border-chart-2/20';
    case 4: return 'bg-chart-5/20 text-chart-5 border-chart-5/20';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

const getDifficultyLabel = (difficulty: number) => {
  switch (difficulty) {
    case 1: return 'Beginner';
    case 2: return 'Easy';
    case 3: return 'Medium';
    case 4: return 'Advanced';
    default: return 'Unknown';
  }
};

export default function TopicSelector() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
    setSelectedTopic(null); // Reset topic selection when class changes
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    // TODO: Navigate to tutoring session
    console.log('Selected topic:', topicId);
  };

  // Filter topics based on selected class
  const filteredTopics = selectedClass 
    ? allTopics.filter(topic => topic.classId === selectedClass)
    : [];

  return (
    <div className="space-y-6">
      {/* Class Selector */}
      <div className="mb-6">
        <ClassSelector 
          selectedClass={selectedClass}
          onClassSelect={handleClassSelect}
        />
      </div>

      {/* Topics Section */}
      {selectedClass && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Choose Your Math Topic</h2>
            <p className="text-muted-foreground">Select a topic to start your AI-powered learning session</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => {
              const IconComponent = topic.icon;
              const isSelected = selectedTopic === topic.id;
              
              return (
                <div
                  key={topic.id}
                  className={`card cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                    isSelected ? 'ring-2 ring-sidebar-primary bg-sidebar-accent' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => handleTopicSelect(topic.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      isSelected ? 'bg-sidebar-primary' : 'bg-muted'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${
                        isSelected ? 'text-sidebar-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{topic.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                          {getDifficultyLabel(topic.difficulty)}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 text-sm">{topic.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{topic.questionsCount} questions</span>
                        <span>{topic.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <button className="btn-primary w-full">
                        Start Learning Session
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {!selectedTopic && filteredTopics.length > 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-sidebar-primary rounded-full animate-pulse"></div>
                <span>Click on any topic above to get started</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Initial State - No Class Selected */}
      {!selectedClass && (
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-sidebar-primary rounded-full animate-pulse"></div>
            <span>Please select your grade level to see available topics</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { allTopics };
