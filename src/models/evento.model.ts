import { model, Schema, Document } from "mongoose";
import Evento from "../interfaces/evento.interface";

const eventoSchema: Schema = new Schema({
  tipo: {
    type: String,
    required: true,
  },
  dispositivoId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  detalhes: {
    type: String,
    required: true,
  },
});

const eventoModel = model<Evento & Document>("Evento", eventoSchema);

export default eventoModel;
