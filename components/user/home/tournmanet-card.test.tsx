import { it, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { TournamentCard } from "./tournament-card";
import { Tournaments } from "@root/xata";
import { USD } from "@root/utils";

const mockProps: Tournaments = {
  id: "xata_db_id_1",
  pricing: 50,
  status: "OPEN",
  description: "custom description",
  enrollees: ["user_id_1", "user_id_2"],
  imageUrl:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWThLdjBBSnhTbERZRjc1UEl0MlU2U1Y2dHgifQ",
  name: "tournament name",
};

describe("Tournament Card", () => {
  afterEach(cleanup);

  it("Should render propertly", () => {
    render(<TournamentCard data={mockProps} />);
  });

  it("Should render title", () => {
    render(<TournamentCard data={mockProps} />);
    screen.getByText(mockProps.name as string);
  });

  it("Should render description", () => {
    render(<TournamentCard data={mockProps} />);
    screen.getByText(mockProps.description as string);
  });

  it("Should render price", () => {
    render(<TournamentCard data={mockProps} />);
    screen.getByText(USD.format(mockProps.pricing).toString());
  });

  it("Should render status", () => {
    render(<TournamentCard data={mockProps} />);
    screen.getByText(mockProps.status as string);
  });
});
