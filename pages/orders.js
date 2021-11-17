import React, { useState, useEffect } from "react";
import { Grid, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import { map, size } from "lodash";
import moment from "moment";
import BaseLayout from "../layouts/BaseLayout";
import BaseModal from "../components/Modal/BaseModal";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BaseLayout className="orders">
      <div className="orders__block">
        <div className="title">My orders</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h3>There are not orders</h3>
          ) : (
            <OrdersList orders={orders} />
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

function OrdersList(props) {
  const { orders } = props;

  return (
    <Grid className="orders-list">
      {map(orders, (item) => (
        <Grid.Column key={item._id} mobile={16} tablet={6} computer={8}>
          <Order orderData={item} />
        </Grid.Column>
      ))}
    </Grid>
  );
}

function Order(props) {
  const { orderData } = props;
  const { game, payment, createdAt, shipping_address } = orderData;
  const { title, poster, url } = game;

  return (
    <>
      <div className="item">
        <div className="item__info">
          <div className="item__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h3>{title}</h3>
              <p>{payment}$</p>
            </div>
          </div>
          <div className="item__other">
            <p className="item__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link />
          </div>
        </div>
      </div>
    </>
  );
}
