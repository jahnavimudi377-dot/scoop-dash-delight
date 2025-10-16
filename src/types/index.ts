export interface IceCream {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string | null;
  flavor_category: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  iceCream: IceCream;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  customer_phone: string | null;
  status: string;
  total_amount: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  icecream_id: string | null;
  icecream_name: string;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}
