import { useState } from "react";
import {
  Container,
  Menu as MenuSUI,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import BaseModal from "../../Modal/BaseModal";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);

  const OnShowModal = () => setShowModal(true);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuUser onShow={OnShowModal} />
          </Grid.Column>
        </Grid>
      </Container>
      <BaseModal
        show={showModal}
        setShow={setShowModal}
        title="Account"
      ></BaseModal>
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
  const { onShow } = props;

  return (
    <MenuSUI>
      <Link href="#">
        <MenuSUI.Item onClick={onShow} as="a">
          <Icon name="user outline" />
          My account
        </MenuSUI.Item>
      </Link>
    </MenuSUI>
  );
}
