import { expect } from "chai";
import { DateHelper } from "../../../src/use-cases/utils/date-helper";

context("[Helper] Date Helper", () => {
  describe("compareDates", () => {
    it("should return -1 if first date is smaller than second date", () => {
      const firstDate = new Date(2022, 10, 10, 0, 0, 0, 0);
      const secondDate = new Date(2022, 10, 11, 0, 0, 0, 0);

      expect(DateHelper.compareDates(firstDate, secondDate)).to.be.equal(-1);
    });
    it("should return 1 if first date is bigger than second date", () => {
      const firstDate = new Date(2022, 10, 11, 0, 0, 0, 0);
      const secondDate = new Date(2022, 10, 10, 0, 0, 0, 0);

      expect(DateHelper.compareDates(firstDate, secondDate)).to.be.equal(1);
    });
    it("should return 0 if first date is same as second date", () => {
      const firstDate = new Date(2022, 10, 10, 0, 0, 0, 0);
      const secondDate = new Date(2022, 10, 10, 0, 0, 0, 0);

      expect(DateHelper.compareDates(firstDate, secondDate)).to.be.equal(0);
    });
  });

  describe("getCurrentDate", () => {
    it("should return current date without time information", () => {
      const now = new Date();
      const expectedDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
      expect(DateHelper.getCurrentDate()).to.be.deep.equal(expectedDate);
    });
  });

  describe("toDateOnly", () => {
    it("should return date without time information", () => {
      const now = new Date(2022, 10, 10);
      const expectedDate = new Date(2022, 10, 10, 0, 0, 0, 0);

      expect(DateHelper.toDateOnly(now)).to.be.deep.equal(expectedDate);
    });
  });
});
