import React, { useState, useEffect } from "react";
import BaseLayout from "../layouts/BaseLayout/BaseLayout";
import { useRouter } from "next/dist/client/router";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";

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
      </div>
    </div>
  );
}
