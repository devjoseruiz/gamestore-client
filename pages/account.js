import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import { useRouter } from "next/dist/client/router";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BaseModal from "../components/Modal/BaseModal";
import AddressForm from "../components/Account/AddressForm";
import AddressList from "../components/Account/AddressList/AddressList";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { auth, logout, setReloadUser } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BaseLayout className="account">
      <AccountSettings
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
    </BaseLayout>
  );
}

function AccountSettings(props) {
  const { user, logout, setReloadUser } = props;

  return (
    <div className="account__settings">
      <div className="title">Settings</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
        <Addresses />
      </div>
    </div>
  );
}

function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Addresses
        <Icon name="plus" link onClick={() => openModal("New address")} />
      </div>
      <div className="data">
        <AddressList
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
        />
      </div>

      <BaseModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
      >
        {formModal}
      </BaseModal>
    </div>
  );
}
