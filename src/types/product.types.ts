export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  categoryId: string;
  category?: Category;
  tags: string[];
  sizes: string[];
  colors: string[];
  material?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  products?: Product[];
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment?: string | null;
  images: string[];
  isVerified: boolean;
  createdAt: Date;
  user?: { name: string | null; image: string | null };
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  customDesign?: Record<string, unknown> | null;
}
