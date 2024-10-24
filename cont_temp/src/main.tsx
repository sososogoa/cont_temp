import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import AppWrapper from "./App.tsx";
import store from "./store/store.ts";
import "@radix-ui/themes/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Theme>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </Theme>
);
