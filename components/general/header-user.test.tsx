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
          primaryEmail: "user@user.com",
        },
      };
    }),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2Y8KuyxUCbRo8KRtfQ7OgmjFgm7",
        fullName: "Diego Díaz",
        firstName: "Diego",
        lastName: "Díaz",
        imageUrl:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWThLdjBBSnhTbERZRjc1UEl0MlU2U1Y2dHgifQ",
      },
    }),
    UserButton: (_: { afterSignOutUrl: string; showName: boolean }) => (
      <div>User button</div>
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
      name: "My Tournaments",
    }) as HTMLAnchorElement;
    const find = screen.getByRole("link", {
      name: "Get Enroll",
    }) as HTMLAnchorElement;
    expect(own.href).toBe(`${PORT}/own`);
    expect(find.href).toBe(`${PORT}/find`);

    cleanup();
  });
});
