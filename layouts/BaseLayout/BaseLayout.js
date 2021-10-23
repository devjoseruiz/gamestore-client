import {Container} from "semantic-ui-react";
import Header from "../../components/Header";

export default function BaseLayout(props){
    const {children} = props;

    return(
        <Container fluid className="base-layout">
            <Header />
            <Container className="content">
                {children}
            </Container>
        </Container>
    );
}