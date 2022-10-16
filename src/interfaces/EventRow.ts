interface EventRow {
  _id: number; // Tarvitaan rivien poistoa ja lisäämistä varten
  pullo: string;
  kaasu: string;
  tayttopaine: number;
  lisatiedot?: string;
}

export default EventRow;