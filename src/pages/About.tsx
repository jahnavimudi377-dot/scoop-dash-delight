import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">About ScoopDash</h1>
          <p className="text-muted-foreground text-lg">
            Where every scoop tells a story of passion and flavor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="ice-cream-card text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Made with Love</h3>
              <p className="text-muted-foreground">
                Every batch is crafted with care using the finest ingredients
              </p>
            </CardContent>
          </Card>

          <Card className="ice-cream-card text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Award-winning recipes that set the standard for excellence
              </p>
            </CardContent>
          </Card>

          <Card className="ice-cream-card text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Unique Flavors</h3>
              <p className="text-muted-foreground">
                Innovative combinations you won't find anywhere else
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card border-none">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2024, ScoopDash began with a simple dream: to bring joy to people's
                lives through exceptional ice cream. What started as a small artisan shop has
                grown into a beloved destination for ice cream enthusiasts.
              </p>
              <p>
                We source our ingredients from local farms and sustainable suppliers, ensuring
                that every scoop not only tastes amazing but also supports our community and
                the environment.
              </p>
              <p>
                Our master ice cream makers combine traditional techniques with innovative
                flavors, creating unique combinations that surprise and delight. From classic
                favorites to adventurous new creations, there's something for everyone at
                ScoopDash.
              </p>
              <p>
                Thank you for being part of our journey. Every scoop you enjoy helps us continue
                our mission of spreading happiness, one delicious moment at a time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
