import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAll,
  remove as removeOrder,
} from '../../../../../features/order/thunks';
import { Link } from 'react-router-dom';
import { Paginator } from '../../../../forms/paginator';
import { selectOrders } from '../../../../order/selectors';
import { selectRole } from '../../../../user/selectors';

type SelectionType = {
  id: string;
};

function OrdersDashboard(): JSX.Element {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const role = useSelector(selectRole);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [view, setView] = React.useState<number>(10);
  const [input, setInput] = React.useState({ search: '' });
  const [selections, setSelections] = React.useState<SelectionType[]>([]);

  React.useEffect(() => {
    dispatch(fetchAll());
  }, []);

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  }

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (role === 'GUEST') {
      alert(`You dont have sufficient rights to do a submission`);
      return;
    }
    const value = (e.target as HTMLInputElement).value;
    selections.length > 1
      ? confirm(
          `Are you sure you wanna delete ${selections.length} products?`
        ) && console.info(`No implementation. ${value}`)
      : selections.length <= 1
      ? confirm('Are you sure you want to delete this product?') &&
        dispatch(removeOrder(value))
      : null;
  }

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setView(parseInt(e.target.value));
  }

  function onCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    selections.some((obj) => obj.id === e.target.value)
      ? setSelections(selections.filter((obj) => obj.id !== e.target.value))
      : setSelections([...selections, { id: e.target.value }]);
  }

  function onSelectAll(): void {
    selections.length === 0
      ? setSelections(orders.map((el) => ({ id: el.id.toString() })))
      : setSelections([]);
  }

  const rankedIndex = orders
    .map((entry) => {
      let points = 0;

      if (entry.userId.toLowerCase().includes(input.search.toLowerCase())) {
        points += 2;
      }

      if (entry.userId.toLowerCase().includes(input.search.toLowerCase())) {
        points += 1;
      }

      return { ...entry, points };
    })
    .sort((a, b) => b.points - a.points);
  const miumau = React.useMemo(() => {
    const firstPage = currentPage * view;
    const lastPage = firstPage + view;
    return orders.slice(firstPage, lastPage);
  }, [currentPage, view]);
  return (
    <div className='admin-products'>
      <div className='admin-products__options'>
        <p>{orders.length} Orders found</p>
        <fieldset id='per-view'>
          <select name='page-view' id='page-view' onChange={onChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
          <label htmlFor='page-view'>Orders per page</label>
        </fieldset>
        <div className='admin-searchbar'>
          <input
            type='search'
            placeholder='Search..'
            name='search'
            value={input.search}
            onChange={onSearch}
            aria-label='Write a keyword for search'
            maxLength={75}
          />
        </div>
        {selections.length > 0 ? (
          <p id='products-selected'>{selections.length} Products selected</p>
        ) : null}
        <div id='pagination'>
          <Paginator
            totalItems={orders.length}
            elementsPerPage={view}
            currentPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>User ID</th>
            <th scope='col'>Order total</th>
            <th scope='col'>Address</th>
            <th scope='col'>Country</th>
            <th scope='col'>City</th>
            <th scope='col'>Postal Code</th>
            <th scope='col'>Order Status</th>
            <th scope='col'>
              <input type='checkbox' onClick={onSelectAll} />
            </th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {input.search.length > 0
            ? rankedIndex.map(
                ({
                  total_price,
                  address,
                  country,
                  city,
                  postalcode,
                  status,
                  userId,
                  id,
                }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{userId}</td>
                    <td>${total_price}</td>
                    <td>{address}</td>
                    <td>{country}</td>
                    <td>{city}</td>
                    <td>{postalcode}</td>
                    <td>{status}</td>
                    <td>
                      <input
                        onChange={onCheckbox}
                        checked={
                          selections.find((e) => e.id === id.toString()) !==
                          undefined
                        }
                        type='checkbox'
                        value={id}
                        name='selection'
                        id='selection'
                      />
                    </td>
                    <td>
                      <Link
                        to={`/admin-controls/products-edit/${id}`}
                        id='edit-link'
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={deleteHandler}
                        id='delete-row'
                        value={id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            : miumau.map(
                ({
                  total_price,
                  address,
                  country,
                  city,
                  postalcode,
                  status,
                  userId,
                  id,
                }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{userId}</td>
                    <td>${total_price}</td>
                    <td>{address}</td>
                    <td>{country}</td>
                    <td>{city}</td>
                    <td>{postalcode}</td>
                    <td>{status}</td>
                    <td>
                      <input
                        onChange={onCheckbox}
                        checked={
                          selections.find((e) => e.id === id.toString()) !==
                          undefined
                        }
                        type='checkbox'
                        value={id}
                        name='selection'
                        id='selection'
                      />
                    </td>
                    <td>
                      <Link
                        to={`/admin-controls/products-edit/${id}`}
                        id='edit-link'
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={deleteHandler}
                        id='delete-row'
                        value={id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersDashboard;
