import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-list">
      {size(addresses) === 0 ? (
        <h3>There are not addresses</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address address={address} />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address } = props;
  console.log(address);

  return (
    <div className="address-item">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalcode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button primary>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
