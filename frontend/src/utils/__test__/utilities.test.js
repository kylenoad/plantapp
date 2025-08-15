import { convertToPercent } from "../convertToPercent";
import { getMonthlyAverages } from "../getMonthlyAverages"

describe("convertToPercent", () =>{
    test("Should return the 50% for the middle value", () =>{
        const halfway = (325 + 850) / 2
        const result = convertToPercent(halfway)
        expect(result).toBe(50)
    })
    test("Should return 100 when fully wet or exceed fully wet value", () =>{
        const result = convertToPercent(300)
        expect(result).toBe(100)
    })
    test("Should return 0 when fully dry or exceed fully dry value", () =>{
        const result = convertToPercent(900)
        expect(result).toBe(0)
    })
})

describe("getMonthlyAverages", () =>{
    test("calculates the average for a single month", () => {
        const data = [
          { timestamp: "2025-01-05T00:00:00Z", moisture_level: 100 },
          { timestamp: "2025-01-15T00:00:00Z", moisture_level: 200 },
        ];
        const result = getMonthlyAverages(data);
    
        expect(result).toHaveLength(1);
        expect(result[0].moisture_level).toBe(150);
        expect(result[0].timestamp).toEqual(new Date(2025, 0, 1)); 
      });

      test("calculates the average for a multiple months", () => {
        const data = [
          { timestamp: "2025-01-05T00:00:00Z", moisture_level: 100 },
          { timestamp: "2025-01-15T00:00:00Z", moisture_level: 200 },
          { timestamp: "2025-02-15T00:00:00Z", moisture_level: 100 },
          { timestamp: "2025-02-15T00:00:00Z", moisture_level: 200 },
        ];
        const result = getMonthlyAverages(data);
    
        expect(result).toHaveLength(2);
        expect(result[0].moisture_level).toBe(150);
      });

      test("handles single reading", () => {
        const data = [
          { timestamp: "2025-03-15T12:30:00Z", moisture_level: 250 }
        ];
        const result = getMonthlyAverages(data);
    
        expect(result).toHaveLength(1);
        expect(result[0].moisture_level).toBe(250);
      });

      test("correctly groups readings by years", () => {
        const data = [
            { timestamp: "2024-12-15T00:00:00Z", moisture_level: 100 },
            { timestamp: "2024-12-20T00:00:00Z", moisture_level: 200 },
            { timestamp: "2025-01-10T00:00:00Z", moisture_level: 500 },
            { timestamp: "2025-01-20T00:00:00Z", moisture_level: 1000 },
          ];
        const result = getMonthlyAverages(data);

        expect(result).toHaveLength(2);

        const sortedResult = result.sort((a, b) => a.timestamp - b.timestamp);
        expect(sortedResult[0].moisture_level).toBe(150);
        expect(sortedResult[1].moisture_level).toBe(750);

      })
})