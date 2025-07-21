import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  MessageSquare, 
  Upload, 
  Brain, 
  Zap,
  Shield,
  Users
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Responses",
      description: "Advanced AI that understands context and provides accurate answers from your documents."
    },
    {
      icon: Upload,
      title: "Easy Document Upload",
      description: "Simply upload PDFs, text files, or documents to build your knowledge base."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized retrieval and generation system."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your documents and conversations are encrypted and stored securely."
    },
    {
      icon: Users,
      title: "Team Ready",
      description: "Share knowledge bases with your team and collaborate efficiently."
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Chat naturally with your AI assistant that remembers conversation context."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </div>

            {/* Hero Headlines */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Transform Your Documents Into
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Intelligent Conversations
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Upload your documents, create custom knowledge bases, and chat with an AI that truly understands your content. 
              Get accurate, contextual answers instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="px-8 py-6 text-lg shadow-primary">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                  Try Demo Chat
                  <MessageSquare className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose RAGBot?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of document-based AI assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 shadow-primary">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of users who are already transforming their document workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="secondary" size="lg" className="px-8 py-6 text-lg">
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;