interface Evento {
  id: string;
  tipo: string;
  dispositivoId: string;
  timestamp: Date;
  detalhes: string;
}

export default Evento;
