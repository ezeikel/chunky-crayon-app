import { Stack } from "expo-router";
import * as Sentry from "@sentry/react-native";
import Providers from "@/providers";

Sentry.init({
  dsn: "https://3ced8899cf0a5a8dd3b15c539379d654:590a9050ad3be778d873c840cb48012c@o358156.ingest.us.sentry.io/4507397854330880",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const RootLayout = () => {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </Providers>
  );
};

export default Sentry.wrap(RootLayout);
