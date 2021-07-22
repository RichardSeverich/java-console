/**
 * Mapper program used to manage UI responses and API resquet
 */
export default class Program {
  constructor(id, order, type, description) {
    this.id = id;
    this.programOrder = order;
    this.programType = type;
    this.description = description;
  }
}
