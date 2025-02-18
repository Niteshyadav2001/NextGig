// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import {nodeProfilingIntegration} from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://c400b6d5ee09d052c4b1f041005b4843@o4508766141874176.ingest.us.sentry.io/4508782094319616",
  integrations:[
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // tracesSampleRate: 1.0, // capture 100% of the transactions
});

// Manually call startProfiler and stopProfiler
// to prfile the code in between 
Sentry.profiler.startProfiler();

Sentry.startSpan({
    name: "My first Transaction",
} , () => {
    //The code executing inside the transaction will be wraped in a span profiled 
});

Sentry.profiler.stopProfiler();