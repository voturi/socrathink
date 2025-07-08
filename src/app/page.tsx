import TopicSelector from '@/components/TopicSelector';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">Socrathink</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Learn math through AI-powered Socratic questioning with premium audio interaction.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/chat" className="btn-primary">
              Try Chat Interface
            </Link>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <TopicSelector />
        </div>
        
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="card animate-fade-in">
              <div className="text-primary text-3xl mb-4">🎧</div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Audio-First Learning</h3>
              <p className="text-muted-foreground">Experience natural voice interactions with AI tutors</p>
            </div>
            
            <div className="card animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-primary text-3xl mb-4">🤔</div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Socratic Method</h3>
              <p className="text-muted-foreground">Learn through guided questioning, not just answers</p>
            </div>
            
            <div className="card animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-primary text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Adaptive Progress</h3>
              <p className="text-muted-foreground">Personalized learning that adapts to your pace</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
