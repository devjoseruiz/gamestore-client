import React, { useEffect } from "react";
import BaseLayout from "../layouts/BaseLayout";

export default function Search() {
  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  return <BaseLayout className="search"></BaseLayout>;
}
