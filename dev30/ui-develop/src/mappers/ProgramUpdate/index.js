/**
 * Mapper program used to update programs
 */
export default class Program {
  constructor(id, description, startDate, endDate) {
    this.id = id;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
