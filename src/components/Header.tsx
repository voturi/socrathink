import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <Brain className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">Socrathink</h1>
              <p className="text-sm text-muted-foreground">AI Math Tutor</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Topics
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Progress
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Help
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <button className="btn-secondary text-sm">
              Demo Mode
            </button>
            <button className="btn-primary text-sm">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
