const MOCK_TOKEN = "AB25RT5D5GFDG54F5";
const MOCK_SORTED_ARRAY = [
  "Ul0zeIUg7OdT06hl8KhHhwuAYkO4RUzaRQUanYZ4uFPOwi9Y6uYWB4izgP4ucAKtBNUxoYLS6VlVug3Zsf08mBfBRdocb2BIEMsk",
  "v2Uqs9usMeqHfh7EyYiUHOY5mB9IiMTanGVUZAxNU6Dey4b0Lpes48PyEitl7BGZIWaLdBXiqiwFFnnzuynRng8p64hXVo6sD77D",
  "hixjoQz7Uw7sybocHFShWKsuARyEDzFUAM8vZq73RskZFDQu0nktoVCfZu2lRcBMmVZscSW0iFCFpP7V1uetehZzCYTIcXIgh4mp",
  "NfIXDYrO3t4VkwSYFoEGNZ9fbzPMf0fBpd3cLTfOwYUTmb5ouoOhn6KruDPtDAZpos3Brxgml0bC5vTBxNgiyPmtKtyvq86qae5r",
  "UFjN9MKi0opwgEUHzQJFig62Q8VclaoItGzNSD5Zalq9rlp0Wnj3GxuaRS0LDYUjRaRDcYx3kXDXYqMF5O7mNiMqJDNjYrLC5B6p",
  "SNjTy1oaT7AlaXodImtVunm3zqCJMPBvls0eYvQ1sOZOvSQknlt8jnBJSlZiu6RoGsjqvV37GYnkGNgoOrpu9eFIL7ZDT96cc9MG",
  "hhUupY2jhHfOBvLGo7xxAgiTkbep1mXuhzfp4wMdSlkbGznUNNKB3ulVhUPB0ugM6RFWjtmIcZBOTPwIbPyaOImRSfJfxYr3F6vd",
  "5IdemvQcc0fOerMVw8RPa5YPi4rzVKaofABOU3hxUWWcoUOPGtajxwAFoN7JiZIwS35ZQiBm4cG8ePDxHHKTCHOI1TcA6Zo92xtx",
  "TBOYU05dPHNbMxW7l70cnCqYYaqCNm6AG425Httf9GFBAZMNTgDuwdttNUrnulQO0a47vFO2tI4aoKRJ0EO0GGU87S28kPUpRoCj",
];
const MOCK_INITIAL_ARRAY = [
  "Ul0zeIUg7OdT06hl8KhHhwuAYkO4RUzaRQUanYZ4uFPOwi9Y6uYWB4izgP4ucAKtBNUxoYLS6VlVug3Zsf08mBfBRdocb2BIEMsk",
  "UFjN9MKi0opwgEUHzQJFig62Q8VclaoItGzNSD5Zalq9rlp0Wnj3GxuaRS0LDYUjRaRDcYx3kXDXYqMF5O7mNiMqJDNjYrLC5B6p",
  "TBOYU05dPHNbMxW7l70cnCqYYaqCNm6AG425Httf9GFBAZMNTgDuwdttNUrnulQO0a47vFO2tI4aoKRJ0EO0GGU87S28kPUpRoCj",
  "v2Uqs9usMeqHfh7EyYiUHOY5mB9IiMTanGVUZAxNU6Dey4b0Lpes48PyEitl7BGZIWaLdBXiqiwFFnnzuynRng8p64hXVo6sD77D",
  "hhUupY2jhHfOBvLGo7xxAgiTkbep1mXuhzfp4wMdSlkbGznUNNKB3ulVhUPB0ugM6RFWjtmIcZBOTPwIbPyaOImRSfJfxYr3F6vd",
  "hixjoQz7Uw7sybocHFShWKsuARyEDzFUAM8vZq73RskZFDQu0nktoVCfZu2lRcBMmVZscSW0iFCFpP7V1uetehZzCYTIcXIgh4mp",
  "NfIXDYrO3t4VkwSYFoEGNZ9fbzPMf0fBpd3cLTfOwYUTmb5ouoOhn6KruDPtDAZpos3Brxgml0bC5vTBxNgiyPmtKtyvq86qae5r",
  "5IdemvQcc0fOerMVw8RPa5YPi4rzVKaofABOU3hxUWWcoUOPGtajxwAFoN7JiZIwS35ZQiBm4cG8ePDxHHKTCHOI1TcA6Zo92xtx",
  "SNjTy1oaT7AlaXodImtVunm3zqCJMPBvls0eYvQ1sOZOvSQknlt8jnBJSlZiu6RoGsjqvV37GYnkGNgoOrpu9eFIL7ZDT96cc9MG",
];

import { check } from "./index";

jest.mock("node-fetch");
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");

describe("check function", () => {
  let sortedArray: Array<string> = [];

  describe("test check function", () => {
    beforeEach(async () => {
      fetch.mockResolvedValue({
        json: async () => ({ response: { data: MOCK_SORTED_ARRAY } }),
      });
      sortedArray = await check(MOCK_INITIAL_ARRAY, MOCK_TOKEN);
    });

    it("The fetch function has been called", () => {
      expect(fetch).toHaveBeenCalled();
    });

    it("We get an array from the function", () => {
      console.log(sortedArray);
      expect(Array.isArray(sortedArray)).toBe(true);
    });

    it("The returned array has the same lenght as the first array", () => {
      expect(MOCK_INITIAL_ARRAY.length).toEqual(sortedArray.length);
    });
  });
});
