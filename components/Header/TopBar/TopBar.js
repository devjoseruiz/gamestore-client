import React, { useState, useEffect } from "react";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="Gaming" />
      </a>
    </Link>
  );
}

function Search() {
  const [searchState, setSearchState] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (searchState) {
        router.push(`/search?query=${searchState}`);
      }
    })();
  }, [searchState]);

  const goToSeachPage = () => {
    if (router.route !== "/search") router.push("/search");
  };

  return (
    <Input
      id="search"
      icon={{ name: "search" }}
      value={searchState}
      onChange={(_, data) => setSearchState(data.value)}
      onClick={goToSeachPage}
    />
  );
}
