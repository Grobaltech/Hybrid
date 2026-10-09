import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ShopFrame } from "@/components/pos/shell";

export const Route = createFileRoute("/_pos")({
  component: () => (
    <ShopFrame>
      <Outlet />
    </ShopFrame>
  ),
});
