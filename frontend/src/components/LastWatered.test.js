import { render, screen, waitFor } from "@testing-library/react";
import LastWatered from "./LastWatered";

//totally dry is 850, and totally wet is 325

global.fetch = jest.fn();

describe("LastWatered component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows 'unknown' when no watering is found", async () => {
    const testReadings = [
      { timestamp: "2025-08-01T10:00:00Z", moisture_level: 500 },
      { timestamp: "2025-08-02T10:00:00Z", moisture_level: 490 },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => testReadings,
    });
    
    render(<LastWatered />);

    await waitFor(() => {
      expect(screen.getByText(/Last watered: unknown/)).toBeInTheDocument();
    });
  });

  test("shows a date when a watering is detected", async () => {
    const testReadings = [
      { timestamp: "2025-08-01T10:00:00Z", moisture_level: 500 },
      { timestamp: "2025-08-02T10:00:00Z", moisture_level: 350 },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => testReadings,
    });

    render(<LastWatered />);

    await waitFor(() => {
      expect(screen.getByText(/Last Watered/)).toBeInTheDocument();
    });

      expect(screen.getByText(/2025/)).toBeInTheDocument();
  });
});
