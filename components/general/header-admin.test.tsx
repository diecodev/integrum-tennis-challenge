import { it, describe, afterEach, vi, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { HeaderWrapper } from "./header";

const PORT = "http://localhost:3000";

const mocks = vi.hoisted(() => {
  return {
    auth: vi.fn(() => {
      return {
        userId: "fefsfehrf",
        sessionClaims: {
          primaryEmail: "admin@admin.com", // change this email if you have another email as admin
        },
      };
    }),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_id_clerk_1",
        fullName: "Tennis Admin",
        firstName: "Tennis",
        lastName: "Admin",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWThLdjBBSnhTbERZRjc1UEl0MlU2U1Y2dHgifQ",
      },
    }),
    UserButton: (_: { afterSignOutUrl: string; showName: boolean }) => (
      <div>Admin button</div>
    ),
  };
});

vi.mock("@clerk/nextjs", () => {
  return mocks;
});

describe("Header Component", () => {
  it("Should render propertly", () => {
    render(<HeaderWrapper />);
    cleanup();
  });

  it("Should render user nav links", () => {
    render(<HeaderWrapper />);
    const own = screen.getByRole("link", {
      name: "Create Tournament",
    }) as HTMLAnchorElement;
    const find = screen.getByRole("link", {
      name: "All Tournaments",
    }) as HTMLAnchorElement;
    expect(own.href).toBe(`${PORT}/create`);
    expect(find.href).toBe(`${PORT}/all`);

    cleanup();
  });
});
