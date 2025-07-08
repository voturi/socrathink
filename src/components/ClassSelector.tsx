'use client';

import { useState } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';

export interface ClassOption {
  id: string;
  name: string;
  description: string;
  gradeRange: string;
}

const classOptions: ClassOption[] = [
  {
    id: 'elementary',
    name: 'Elementary Math',
    description: 'Grades K-5',
    gradeRange: 'Kindergarten - 5th Grade'
  },
  {
    id: 'middle',
    name: 'Middle School Math',
    description: 'Grades 6-8',
    gradeRange: '6th - 8th Grade'
  },
  {
    id: 'high-school',
    name: 'High School Math',
    description: 'Grades 9-12',
    gradeRange: '9th - 12th Grade'
  },
  {
    id: 'college-prep',
    name: 'College Prep',
    description: 'Advanced Topics',
    gradeRange: 'Pre-Calculus & Beyond'
  }
];

interface ClassSelectorProps {
  selectedClass: string | null;
  onClassSelect: (classId: string) => void;
}

export default function ClassSelector({ selectedClass, onClassSelect }: ClassSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = classOptions.find(option => option.id === selectedClass);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        Select Your Grade Level
      </label>
      
      <div className="relative">
        <button
          type="button"
          className="w-full input-field flex items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium">
                {selectedOption ? selectedOption.name : 'Choose your grade level'}
              </div>
              {selectedOption && (
                <div className="text-xs text-muted-foreground">
                  {selectedOption.gradeRange}
                </div>
              )}
            </div>
          </div>
          <ChevronDown 
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-lg shadow-lg">
            <div className="p-1">
              {classOptions.map((option) => (
                <button
                  key={option.id}
                  className={`w-full text-left p-3 rounded-md transition-colors duration-150 hover:bg-accent hover:text-accent-foreground ${
                    selectedClass === option.id ? 'bg-accent text-accent-foreground' : ''
                  }`}
                  onClick={() => {
                    onClassSelect(option.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="text-sm font-medium">{option.name}</div>
                  <div className="text-xs text-muted-foreground">{option.gradeRange}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export { classOptions };
