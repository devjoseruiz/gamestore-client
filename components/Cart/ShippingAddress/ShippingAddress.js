import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ShippingAddress(props) {
  const { setSelectedAddress } = props;
  const [activeAddress, setActiveAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="shipping-address">
      <div className="title">Shipping address</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            There are not addresses:{" "}
            <Link href="/account">add your first address.</Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  activeAddress={activeAddress}
                  setActiveAddress={setActiveAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address(props) {
  const { address, activeAddress, setActiveAddress, setSelectedAddress } =
    props;

  const changeActiveAddress = () => {
    setActiveAddress(address._id);
    setSelectedAddress(address);
  };

  return (
    <div
      className={classNames("address-item", {
        active: activeAddress === address._id,
      })}
      onClick={changeActiveAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalcode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
