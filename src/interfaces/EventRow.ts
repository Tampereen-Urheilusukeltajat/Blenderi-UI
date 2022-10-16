type EventRow = {
  _id: number; // Tarvitaan rivien poistoa ja lisäämistä varten
  divingCylinder: string;
  gas: string;
  pressure: number;
  additionalInformation?: string;
};

export default EventRow;
