// src/router.tsx
import { createRouter } from "@emstrack/react-start";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
});
