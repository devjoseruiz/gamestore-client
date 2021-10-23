import React from "react";
import {Container} from "semantic-ui-react";

export default function BaseLayout(props){
    const {children} = props;

    return(
        <Container fluid className="base-layout">
            <Container className="content">
                {children}
            </Container>
        </Container>
    );
}