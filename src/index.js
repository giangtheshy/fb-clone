import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { AppProvider } from "./context";
ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById("root")
);
