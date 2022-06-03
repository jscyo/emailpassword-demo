import "./App.css";
import Supertokens from "supertokens-auth-react";
import EmailPassword, {
  EmailPasswordAuth,
} from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./home/index";
import React from "react";

Supertokens.init({
  appInfo: {
    appName: "EmailPassword Demo",
    websiteDomain: "http://localhost:3000",
    apiDomain: "http://localhost:3001",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

class App extends React.Component {
  render() {
    if (Supertokens.canHandleRoute()) {
      // This renders the login UI on the /auth route
      return Supertokens.getRoutingComponent();
    }

    return (
      <div>
        <EmailPasswordAuth>
          <Home />
        </EmailPasswordAuth>
      </div>
    );
  }
}

export default App;
