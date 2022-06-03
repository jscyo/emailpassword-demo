import SuperTokens from "supertokens-node";
import Express from "express";
import cors from "cors";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { middleware, errorHandler } from "supertokens-node/framework/express";

let apiPort = 3001;
let websitePort = 3000;
let websiteDomain = `http://localhost:${websitePort}`;
let apiDomain = `http://localhost:${apiPort}`;

let app = Express();

SuperTokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://try.supertokens.io",
  },
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain,
    websiteDomain,
  },
  recipeList: [
    EmailPassword.init({
      override: {
        apis: (oI) => {
          return {
            ...oI,
            signInPOST: async (input) => {
              if (oI.signInPOST === undefined) {
                throw Error("Should not come here");
              }

              let response = await oI.signInPOST(input);

              if (response.status === "OK") {
                await response.session.updateAccessTokenPayload({
                  email: response.user.email,
                });
              }

              return response;
            },
          };
        },
      },
    }),
    Session.init(),
  ],
});

app.use(
  cors({
    origin: websiteDomain,
    allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());

app.get("/test", async (req, res) => {
  res.send("Test");
});


app.use(errorHandler())

app.listen(apiPort, () =>
  console.log(`API Server listening on port ${apiPort}`)
);
