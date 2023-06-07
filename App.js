import * as React from "react";
import { AppNavigator, WelcomeNavigator } from "./app/navigation";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { User } from "./app/models";
import { useState } from "react";
import { useEffect } from "react";

const user = new User();

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(user.isLogin);

    const listener = user.onLoginStateChanged(loggedIn => {
      setIsUserLoggedIn(loggedIn);
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <Provider store={store}>
      {isUserLoggedIn ? <AppNavigator /> : <WelcomeNavigator />}
    </Provider>
  );
}
