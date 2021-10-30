import React, { useEffect, useState } from "react";
import {
  Container,
  Menu as MenuSUI,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import BaseModal from "../../Modal/BaseModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Sign in");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuUser onShowModal={onShowModal} onLogout={logout} />
          </Grid.Column>
        </Grid>
      </Container>
      <BaseModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BaseModal>
    </div>
  );
}

function MenuPlatforms() {
  return (
    <MenuSUI>
      <Link href="/playstation">
        <MenuSUI.Item as="a">PlayStation</MenuSUI.Item>
      </Link>
      <Link href="/xbox">
        <MenuSUI.Item as="a">Xbox</MenuSUI.Item>
      </Link>
      <Link href="/switch">
        <MenuSUI.Item as="a">Switch</MenuSUI.Item>
      </Link>
      <Link href="/pc">
        <MenuSUI.Item as="a">PC</MenuSUI.Item>
      </Link>
    </MenuSUI>
  );
}

function MenuUser(props) {
  const { onLogout, onShowModal } = props;

  return (
    <MenuSUI>
      <MenuSUI.Item onClick={onShowModal} as="a">
        <Icon name="user outline" />
        My account
      </MenuSUI.Item>
      <MenuSUI.Item onClick={onLogout} as="a">
        <Icon name="sign-out" />
        Logout
      </MenuSUI.Item>
    </MenuSUI>
  );
}
