import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import RenderSnackBar from "./components/ImageCropper/RenderSnackBar";
import SimpleBackdrop from "./components/ImageCropper/SimpleBackdrop";

ReactDOM.render(
  <Provider store={store}>
    <RenderSnackBar>
      <SimpleBackdrop>
        <App />
      </SimpleBackdrop>
    </RenderSnackBar>
  </Provider>,
  document.getElementById("root")
);
