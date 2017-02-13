import { fetchedNotes, FETCHED_NOTES } from "./Notes";

describe("App actions", () => {
  describe("fetchedNotes", () => {
    it("should create action FETCHED_NOTES with notes", () => {
      expect(fetchedNotes("test")).toEqual({
        type: FETCHED_NOTES,
        notes: "test"
      });
    });
  });
});
