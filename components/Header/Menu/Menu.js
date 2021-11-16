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
import useCart from "../../../hooks/useCart";
import { map } from "lodash";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

export default function Menu() {
  const [platforms, setPlatforms] = useState([]);
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

  useEffect(() => {
    (async () => {
      const response = await getPlatformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms platforms={platforms} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuUser onShowModal={onShowModal} user={user} onLogout={logout} />
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

function MenuPlatforms(props) {
  const { platforms } = props;

  return (
    <MenuSUI>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform._id}>
          <MenuSUI.Item as="a" name={platform.url}>
            {platform.title}
          </MenuSUI.Item>
        </Link>
      ))}
    </MenuSUI>
  );
}

function MenuUser(props) {
  const { user, onLogout, onShowModal } = props;
  const { countProductsInCart } = useCart();

  return (
    <MenuSUI>
      {user ? (
        <>
          <Link href="/orders">
            <MenuSUI.Item as="a">
              <Icon name="game" />
              My orders
            </MenuSUI.Item>
          </Link>
          <Link href="/wishlist">
            <MenuSUI.Item as="a">
              <Icon name="heart" />
              Wishlist
            </MenuSUI.Item>
          </Link>
          <Link href="/account">
            <MenuSUI.Item as="a">
              <Icon name="user" />
              Hello, {user.name}
            </MenuSUI.Item>
          </Link>
          <Link href="/cart">
            <MenuSUI.Item as="a" className="m-0">
              <Icon name="cart" />
              <Label color="red" floating circular>
                {countProductsInCart}
              </Label>
            </MenuSUI.Item>
          </Link>
          <MenuSUI.Item onClick={onLogout} as="a" className="m-0">
            <Icon name="power off" />
          </MenuSUI.Item>
        </>
      ) : (
        <>
          <MenuSUI.Item onClick={onShowModal} as="a">
            <Icon name="sign-in" />
            Sign in
          </MenuSUI.Item>
        </>
      )}
    </MenuSUI>
  );
}
