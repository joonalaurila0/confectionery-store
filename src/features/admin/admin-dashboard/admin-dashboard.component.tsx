import * as React from 'react';
import './admin-dashboard.css';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';

import Edit from './components/products/edit.component';
import Create from './components/products/create.component';
import CategoryEdit from './components/categories/category-edit.component';
import CategoryCreate from './components/categories/category-create.component';
import PromotionsEdit from './components/promotions/edit-promotions.component';
import PromotionsAdd from './components/promotions/add-promotions.component';

import AdminDropdown from '../admin-dropdown/admin-dropdown.component';
import ControlsOverview from './components/overview/creator-overview.component';

import UserDashboard from './components/users/users-dashboard.component';
import OrdersDashboard from './components/orders/orders-dashboard.component';
import ProductDashboard from './components/products/products-dashboard.component';
import CategoriesDashboard from './components/categories/categories-dashboard.component';
import PromotionsDashboard from './components/promotions/promotions-dashboard.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole } from '../../user/selectors';
import { adminGuestNotification } from '../../alert/alertSlice';

function AdminDashboard(): JSX.Element {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const role = useSelector(selectRole);

  React.useEffect(() => {
    if (role === 'GUEST' && localStorage.getItem('notif-admin') !== 'visited') {
      dispatch(adminGuestNotification({ timeout: 6000 }));
      setTimeout(() => localStorage.setItem('notif-admin', 'visited'), 1000 * 3);
    }
  }, [dispatch]);

  return (
    <div className='admin-controls'>
      <div className='admin-controls__header'>
        <div className='admin-controls__header__go-to'>
          <Link to='/'>&larr; Go to Store</Link>
        </div>
      </div>
      <nav className='admin-controls__sidebar'>
        <ul>
          <AdminDropdown />
        </ul>
      </nav>
      <div className='admin-controls__main'>
        <Switch>
          <Route
            exact
            path={`${match.url}/orders-dashboard`}
            component={OrdersDashboard}
          />
          <Route
            exact
            path={`${match.url}/users-dashboard`}
            component={UserDashboard}
          />
          <Route
            exact
            path={`${match.url}/categories-dashboard`}
            component={CategoriesDashboard}
          />
          <Route
            exact
            path={`${match.url}/categories-dashboard/categories-create`}
            component={CategoryCreate}
          />
          <Route
            exact
            path={`${match.url}/categories-dashboard/categories-edit/:id`}
            component={CategoryEdit}
          />
          <Route
            exact
            path={`${match.url}/promotions-dashboard`}
            component={PromotionsDashboard}
          />
          <Route
            exact
            path={`${match.url}/promotions-dashboard/promotions-edit/:id`}
            component={PromotionsEdit}
          />
          <Route
            exact
            path={`${match.url}/promotions-dashboard/promotions-create`}
            component={PromotionsAdd}
          />
          <Route
            exact
            path={`${match.url}/products-dashboard`}
            component={ProductDashboard}
          />
          <Route
            path={`${match.url}/products-dashboard/edit/:id`}
            component={Edit}
          />
          <Route
            exact
            path={`${match.url}/products-dashboard/create`}
            component={Create}
          />
          <Route path={`${match.url}`} component={ControlsOverview} />
        </Switch>
      </div>
    </div>
  );
}

export default AdminDashboard;
