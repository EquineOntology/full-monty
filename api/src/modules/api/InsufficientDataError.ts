class InsufficientDataError extends Error {
  constructor() {
    super("Not enough data to compute estimate");
    this.name = "InsufficientDataError";
  }
}

export default InsufficientDataError;
