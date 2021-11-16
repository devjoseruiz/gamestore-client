import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function CartSummary(props) {
  const { products } = props;
  const { removeProductFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const applyDiscount = (item) => {
    let gamePrice = item.price;
    if (item.discount)
      gamePrice -= ((item.price * item.discount) / 100).toFixed(2);
    return gamePrice;
  };

  useEffect(() => {
    let total = 0;

    forEach(products, (item) => {
      const price = applyDiscount(item);
      total += price;
    });

    setTotalPrice(total);
  }, [products]);

  return (
    <div className="cart-summary">
      <div className="title">Cart summary</div>

      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Platform</Table.HeaderCell>
              <Table.HeaderCell>Delivery</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (item) => (
              <Table.Row className="cart-summary__product" key={item.id}>
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProductFromCart(item.url)}
                  />
                  <Image src={item.poster.url} alt={item.title} />
                  {item.title}
                </Table.Cell>
                <Table.Cell>{item.platform.title}</Table.Cell>
                <Table.Cell>Immediate</Table.Cell>
                <Table.Cell>{`${applyDiscount(item)}`}$</Table.Cell>
              </Table.Row>
            ))}

            <Table.Row className="cart-summary__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">{totalPrice}$</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
