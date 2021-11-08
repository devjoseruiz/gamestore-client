import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { map, size } from "lodash";
import { getAddressesApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressList(props) {
  const { reloadAddresses, setReloadAddresses } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) return null;

  return (
    <div className="address-list">
      {size(addresses) === 0 ? (
        <h3>There are not addresses</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address, logout, setReloadAddresses } = props;
  const [loading, setLoading] = useState(false);

  const deleteAddress = async () => {
    setLoading(true);
    const response = await deleteAddressApi(address._id, logout);
    if (!response) {
      toast.error("Error deleting address", {
        theme: "colored",
      });
    } else {
      toast.success("Address deleted!", {
        theme: "colored",
      });
      setReloadAddresses(true);
    }
    setLoading(false);
  };

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
        <Button onClick={deleteAddress} loading={loading} disabled={loading}>
          Delete
        </Button>
      </div>
    </div>
  );
}
