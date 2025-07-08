'use client';

import { useState } from 'react';
import { ChevronDown, BookOpen, PenTool, Target, Zap } from 'lucide-react';

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  icon: any;
  content: string;
}

const topics: Topic[] = [
  {
    id: 'algebra',
    name: 'Algebra',
    description: 'Variables, equations, and algebraic expressions',
    icon: Target
  },
  {
    id: 'probability',
    name: 'Probability',
    description: 'Chance, statistics, and data analysis',
    icon: Zap
  },
  {
    id: 'fractions',
    name: 'Fractions',
    description: 'Parts of a whole, decimals, and percentages',
    icon: PenTool
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Shapes, angles, and spatial relationships',
    icon: BookOpen
  },
  {
    id: 'calculus',
    name: 'Calculus',
    description: 'Limits, derivatives, and integrals',
    icon: Target
  }
];

const sections: Section[] = [
  {
    id: 'introduction',
    name: 'Introduction',
    description: 'Learn the fundamental concepts and theory',
    icon: BookOpen,
    content: 'Welcome to the introduction section! Here we will cover the basic concepts and foundational knowledge you need to understand this topic.'
  },
  {
    id: 'practice',
    name: 'Practice',
    description: 'Work through guided examples and problems',
    icon: PenTool,
    content: 'Time to practice! In this section, you will work through carefully crafted problems that help reinforce your understanding.'
  },
  {
    id: 'exercises',
    name: 'Exercises',
    description: 'Test your knowledge with challenging problems',
    icon: Target,
    content: 'Challenge yourself with these exercises! These problems will test your mastery of the concepts and push your understanding further.'
  },
  {
    id: 'extension',
    name: 'Extension',
    description: 'Explore advanced concepts and real-world applications',
    icon: Zap,
    content: 'Ready for more? This extension section explores advanced topics and real-world applications of what you have learned.'
  }
];

interface SimplifiedTopicSelectorProps {
  selectedTopic: string | null;
  selectedSection: string | null;
  onTopicSelect: (topicId: string) => void;
  onSectionSelect: (sectionId: string) => void;
}

export default function SimplifiedTopicSelector({ 
  selectedTopic, 
  selectedSection,
  onTopicSelect, 
  onSectionSelect 
}: SimplifiedTopicSelectorProps) {
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

  const selectedTopicData = topics.find(topic => topic.id === selectedTopic);

  return (
    <div className="space-y-6">
      {/* Topic Dropdown */}
      <div className="relative">
        <label className="block text-sm font-medium text-sidebar-foreground mb-2">
          Select Topic
        </label>
        
        <div className="relative">
          <button
            type="button"
            className="w-full input-field flex items-center justify-between text-left bg-sidebar-accent border-sidebar-border"
            onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
            aria-expanded={isTopicDropdownOpen}
          >
            <div className="flex items-center space-x-3">
              {selectedTopicData && (
                <div className="p-2 bg-sidebar-primary rounded-lg">
                  <selectedTopicData.icon className="h-4 w-4 text-sidebar-primary-foreground" />
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-sidebar-foreground">
                  {selectedTopicData ? selectedTopicData.name : 'Choose a topic'}
                </div>
                {selectedTopicData && (
                  <div className="text-xs text-sidebar-foreground/70">
                    {selectedTopicData.description}
                  </div>
                )}
              </div>
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-sidebar-foreground/70 transition-transform duration-200 ${
                isTopicDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {isTopicDropdownOpen && (
            <div className="absolute top-full left-0 right-0 z-[100] mt-1 bg-sidebar border border-sidebar-border rounded-lg shadow-xl backdrop-blur-sm">
              <div className="p-1 max-h-64 overflow-y-auto">
                {topics.map((topic) => {
                  const IconComponent = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      className={`w-full text-left p-3 rounded-md transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                        selectedTopic === topic.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'
                      }`}
                      onClick={() => {
                        onTopicSelect(topic.id);
                        setIsTopicDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-sidebar-primary rounded-md">
                          <IconComponent className="h-4 w-4 text-sidebar-primary-foreground" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{topic.name}</div>
                          <div className="text-xs opacity-70">{topic.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Click outside to close */}
        {isTopicDropdownOpen && (
          <div 
            className="fixed inset-0 z-[90]" 
            onClick={() => setIsTopicDropdownOpen(false)}
          />
        )}
      </div>

      {/* Sections */}
      {selectedTopic && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Sections</h3>
          <div className="space-y-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isSelected = selectedSection === section.id;
              
              return (
                <button
                  key={section.id}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    isSelected 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                  }`}
                  onClick={() => onSectionSelect(section.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-md ${
                      isSelected ? 'bg-sidebar-primary-foreground/20' : 'bg-sidebar-accent'
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        isSelected ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground'
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{section.name}</div>
                      <div className={`text-xs ${
                        isSelected ? 'text-sidebar-primary-foreground/70' : 'text-sidebar-foreground/70'
                      }`}>
                        {section.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!selectedTopic && (
        <div className="text-center py-8">
          <div className="text-sidebar-foreground/70 text-sm">
            Select a topic to see available sections
          </div>
        </div>
      )}
    </div>
  );
}

export { topics, sections };
