import { createFileRoute } from "@tanstack/react-router";
import { StoreView } from "@/components/store/StoreView";

export const Route = createFileRoute("/")({
  component: StoreView,
});
