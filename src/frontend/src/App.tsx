import { LanguageProvider } from "@/components/LanguageContext";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { DashboardPage } from "@/pages/DashboardPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const TextAnalysisPage = lazy(() =>
  import("@/pages/TextAnalysisPage").then((m) => ({
    default: m.TextAnalysisPage,
  })),
);
const ImageAnalysisPage = lazy(() =>
  import("@/pages/ImageAnalysisPage").then((m) => ({
    default: m.ImageAnalysisPage,
  })),
);
const VideoAnalysisPage = lazy(() =>
  import("@/pages/VideoAnalysisPage").then((m) => ({
    default: m.VideoAnalysisPage,
  })),
);
const EducationPage = lazy(() =>
  import("@/pages/EducationPage").then((m) => ({ default: m.EducationPage })),
);
const SettingsPage = lazy(() =>
  import("@/pages/SettingsPage").then((m) => ({ default: m.SettingsPage })),
);
const WhatsAppBotPage = lazy(() =>
  import("@/pages/WhatsAppBotPage").then((m) => ({
    default: m.WhatsAppBotPage,
  })),
);

function PageFallback() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function LayoutWrapper() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: LayoutWrapper });

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});
const textRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/text-analysis",
  component: TextAnalysisPage,
});
const imageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image-analysis",
  component: ImageAnalysisPage,
});
const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video-analysis",
  component: VideoAnalysisPage,
});
const educationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/education",
  component: EducationPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});
const whatsappBotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/whatsapp-bot",
  component: WhatsAppBotPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  textRoute,
  imageRoute,
  videoRoute,
  educationRoute,
  settingsRoute,
  whatsappBotRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster />
    </LanguageProvider>
  );
}
