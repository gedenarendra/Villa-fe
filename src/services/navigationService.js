import { 
  LayoutDashboard, 
  Home, 
  Settings,
  Users,
  Calendar,
  MessageSquare,
  Shield
} from 'lucide-react';

/**
 * Navigation Service
 * Centralizes all navigation-related data and logic.
 */

export const ADMIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'catalog',
    label: 'Catalog',
    path: '/admin/catalog',
    icon: Home
  },
  {
    id: 'users',
    label: 'Users',
    path: '/admin/users',
    icon: Users,
    disabled: true
  },
  {
    id: 'calendar',
    label: 'Calendar',
    path: '/admin/calendar',
    icon: Calendar
  },
  {
    id: 'inquiries',
    label: 'Inquiries',
    path: '/admin/inquiries',
    icon: MessageSquare,
    disabled: true
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/admin/settings',
    icon: Settings
  }
];

export const navigationService = {
  getAdminNavItems: () => ADMIN_NAV_ITEMS,
  
  getActiveItem: (pathname) => {
    return ADMIN_NAV_ITEMS.find(item => pathname.includes(item.path)) || ADMIN_NAV_ITEMS[0];
  }
};
