import { IceCream } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import vanillaImg from '@/assets/vanilla.jpg';
import strawberryImg from '@/assets/strawberry.jpg';
import chocolateImg from '@/assets/chocolate.jpg';
import mintImg from '@/assets/mint.jpg';
import caramelImg from '@/assets/caramel.jpg';
import pistachioImg from '@/assets/pistachio.jpg';

interface IceCreamCardProps {
  iceCream: IceCream;
}

const getImageForFlavor = (name: string, imageUrl: string | null) => {
  if (imageUrl) return imageUrl;
  
  const nameLower = name.toLowerCase();
  if (nameLower.includes('vanilla')) return vanillaImg;
  if (nameLower.includes('strawberry')) return strawberryImg;
  if (nameLower.includes('chocolate')) return chocolateImg;
  if (nameLower.includes('mint')) return mintImg;
  if (nameLower.includes('caramel')) return caramelImg;
  if (nameLower.includes('pistachio')) return pistachioImg;
  
  return vanillaImg;
};

export const IceCreamCard = ({ iceCream }: IceCreamCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="ice-cream-card overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getImageForFlavor(iceCream.name, iceCream.image_url)}
          alt={iceCream.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {iceCream.is_featured && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{iceCream.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {iceCream.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${iceCream.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            {iceCream.stock > 0 ? `${iceCream.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={() => addToCart(iceCream)}
          disabled={iceCream.stock === 0}
          className="w-full rounded-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
