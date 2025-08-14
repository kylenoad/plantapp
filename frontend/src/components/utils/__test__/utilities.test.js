import { convertToPercent } from "../convertToPercent";

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