// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { KyberNetwork, Messages2, Calendar1, Kanban, Profile2User, Bill, UserSquare, ShoppingBag, Home2, Briefcase, TransactionMinus, Pet } from 'iconsax-react';

// icons
const icons = {
  home: Pet,
  services: Briefcase,
  history: TransactionMinus,
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: <FormattedMessage id="menu" />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="home" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.home,
      breadcrumbs: false
    },
    {
      id: 'services',
      title: <FormattedMessage id="services" />,
      type: 'item',
      url: '/services',
      icon: icons.services,
      breadcrumbs: false
    },
    {
      id: 'history',
      title: <FormattedMessage id="my-reservations" />,
      type: 'item',
      url: '/history',
      icon: icons.history,
      breadcrumbs: false
    },
    // {
    //   id: 'customer',
    //   title: <FormattedMessage id="customer" />,
    //   type: 'collapse',
    //   icon: icons.customer,
    //   children: [
    //     {
    //       id: 'customer-list',
    //       title: <FormattedMessage id="list" />,
    //       type: 'item',
    //       url: '/apps/customer/customer-list'
    //     },
    //     {
    //       id: 'customer-card',
    //       title: <FormattedMessage id="cards" />,
    //       type: 'item',
    //       url: '/apps/customer/customer-card'
    //     }
    //   ]
    // },
    // {
    //   id: 'profile',
    //   title: <FormattedMessage id="profile" />,
    //   type: 'collapse',
    //   icon: icons.profile,
    //   children: [
    //     {
    //       id: 'user-profile',
    //       title: <FormattedMessage id="user-profile" />,
    //       type: 'item',
    //       url: '/apps/profiles/user/personal',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'account-profile',
    //       title: <FormattedMessage id="account-profile" />,
    //       type: 'item',
    //       url: '/apps/profiles/account/basic'
    //     }
    //   ]
    // }
  ]
};

export default applications;
