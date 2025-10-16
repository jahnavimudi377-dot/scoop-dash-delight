import { useEffect, useState } from 'react';
import { IceCreamCard } from '@/components/IceCreamCard';
import { IceCream } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export const Catalog = () => {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [filteredIceCreams, setFilteredIceCreams] = useState<IceCream[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchIceCreams();

    // Setup realtime subscription
    const channel = supabase
      .channel('icecreams-catalog')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icecreams',
        },
        () => {
          fetchIceCreams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterIceCreams();
  }, [searchTerm, categoryFilter, iceCreams]);

  const fetchIceCreams = async () => {
    const { data, error } = await supabase
      .from('icecreams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ice creams:', error);
    } else {
      setIceCreams(data || []);
    }
    setLoading(false);
  };

  const filterIceCreams = () => {
    let filtered = iceCreams;

    if (searchTerm) {
      filtered = filtered.filter(
        (ice) =>
          ice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ice.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((ice) => ice.flavor_category === categoryFilter);
    }

    setFilteredIceCreams(filtered);
  };

  const categories = ['all', ...new Set(iceCreams.map((ice) => ice.flavor_category).filter(Boolean))];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Ice Cream Catalog</h1>
          <p className="text-muted-foreground text-lg">
            Explore our delicious collection of handcrafted ice creams
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search ice creams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat || 'all'}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-[var(--radius)]" />
            ))}
          </div>
        ) : filteredIceCreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredIceCreams.map((iceCream) => (
              <IceCreamCard key={iceCream.id} iceCream={iceCream} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No ice creams found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
