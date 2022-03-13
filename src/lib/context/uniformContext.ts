import {
  CookieTransitionDataStore,
  Context,
  ManifestV2,
  enableContextDevTools,
} from "@uniformdev/context";
import { NextPageContext } from "next";
import manifest from "./manifest.json";
import { NextCookieAdapter } from "./uniform-next-sdk";

export function createUniformContext(serverContext?: NextPageContext) {
  const cookieAdapter = new NextCookieAdapter(serverContext);

  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new CookieTransitionDataStore({
      cookieAdapter,
    }),
    plugins: [enableContextDevTools()],
  });

  context.events.on("personalizationResult", (result) => {
    console.log("personalizationResult", { result });
  });

  context.events.on("testResult", (result) => {
    console.log("Test result", { result });
  });

  return context;
}
