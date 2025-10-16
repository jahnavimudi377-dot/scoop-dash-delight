import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IceCreamCard } from '@/components/IceCreamCard';
import { IceCream } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

export const Home = () => {
  const [featuredIceCreams, setFeaturedIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedIceCreams();

    // Setup realtime subscription
    const channel = supabase
      .channel('icecreams-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icecreams',
        },
        () => {
          fetchFeaturedIceCreams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeaturedIceCreams = async () => {
    const { data, error } = await supabase
      .from('icecreams')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured ice creams:', error);
    } else {
      setFeaturedIceCreams(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-accent/40 to-secondary/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Premium Quality Ice Cream</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Delicious Ice Creams,<br />Anytime!
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow">
            Handcrafted with love, delivered with care. Experience the finest flavors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="btn-premium text-lg">
                Browse Catalog
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="secondary" className="rounded-full text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gradient-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Flavors</h2>
            <p className="text-muted-foreground text-lg">
              Our most popular and loved ice cream flavors
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-[var(--radius)]" />
              ))}
            </div>
          ) : featuredIceCreams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredIceCreams.map((iceCream) => (
                <IceCreamCard key={iceCream.id} iceCream={iceCream} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No featured products yet.</p>
          )}

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="rounded-full">
                View All Flavors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
