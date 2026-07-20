'use client';

import {
  ChevronDown,
  Target,
  Eye,
  Moon,
  Sun,
  Star,
  Video,
  BookOpen,
  BookMarked,
  Layers,
  Music,
  BookText,
  Package,
  CircleDot,
  Image as ImageIcon,
  Gem,
  Coins,
  FileText,
  PenLine,
  Download,
  Play,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Check,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  BookMarked,
  Layers,
  Music,
  BookText,
  Package,
  CircleDot,
  ImageIcon,
  Gem,
  Coins,
  FileText,
  PenLine,
  Video,
  Play,
};

export function ProductIcon({
  name,
  className,
  size = 48,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = iconMap[name] || FileText;
  return <Icon className={className} size={size} strokeWidth={1.5} />;
}

export {
  ChevronDown,
  Target,
  Eye,
  Moon,
  Sun,
  Star,
  Video,
  Download,
  Play,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Check,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
};
