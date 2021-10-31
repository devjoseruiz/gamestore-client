import { Container } from "semantic-ui-react";
import Header from "../../components/Header";
import classNames from "classnames";

export default function BaseLayout(props) {
  const { children, className } = props;

  return (
    <Container
      fluid
      className={classNames("base-layout", {
        [className]: className,
      })}
    >
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
}
