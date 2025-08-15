import { render, screen, waitFor } from "@testing-library/react";
import SensorStatus from "./SensorStatus";

global.fetch = jest.fn();

describe("SensorStatus component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows 'online' if last reading is within the last 2 hours", async () => {
    const recentTimestamp = new Date(Date.now() - 60 * 60 * 1000);
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ timestamp: recentTimestamp }),
    });

    render(<SensorStatus />);

    await waitFor(() => {
      expect(screen.getByText(/online/)).toBeInTheDocument();
    });
  });

  test("shows 'offline' if last reading is older than 2 hours", async () => {
    const oldTimestamp = new Date(Date.now() - 3 * 60 * 60 * 1000);
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ timestamp: oldTimestamp }),
    });

    render(<SensorStatus />);

    await waitFor(() => {
      expect(screen.getByText(/offline/)).toBeInTheDocument();
    });
  });
});
