import { create } from 'zustand';

export interface HeroBannerContent {
  title: string;
  subtitle: string;
}

export interface BannerCategoryItem {
  id: string;
  label: string;
  image: string;
  category: string;
  aspectClass: string;
}

interface BannerStore {
  heroContent: HeroBannerContent;
  setHeroContent: (content: Partial<HeroBannerContent>) => void;
  bannerCategories: BannerCategoryItem[];
  setBannerCategories: (categories: BannerCategoryItem[]) => void;
}

const defaultHeroContent: HeroBannerContent = {
  title: "World's Finest Blackwear",
  subtitle:
    'Explore premium black essentials crafted for those who live bold and dress sharper.',
};

const defaultBannerCategories: BannerCategoryItem[] = [
  {
    id: 'men',
    label: 'Men',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80',
    category: 'Men',
    aspectClass: 'aspect-[3/5]',
  },
  {
    id: 'kids',
    label: 'Kids',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80',
    category: 'Kids',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gadgets',
    label: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    category: 'Gadgets',
    aspectClass: 'aspect-[3/4]',
  },
];

export const useBannerStore = create<BannerStore>((set) => ({
  heroContent: defaultHeroContent,
  setHeroContent: (content) =>
    set((s) => ({
      heroContent: { ...s.heroContent, ...content },
    })),
  bannerCategories: defaultBannerCategories,
  setBannerCategories: (categories) => set({ bannerCategories: categories }),
}));
