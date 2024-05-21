import { isEmpty } from "class-validator";
import Evento from "../interfaces/evento.interface";
import CreateEventoDto from "../dto/Evento/create.evento.dto";
import { HttpException } from "../exceptions/HttpException";
import eventoModel from "../models/evento.model";
import { UpdateEventoDto } from "../dto/Evento/update.evento.dto";

class EventoService {
  public evento = eventoModel;

  public async findAll(): Promise<Evento[]> {
    const eventos: Evento[] = await this.evento.find();
    return eventos;
  }

  public async findById(eventoId: string): Promise<Evento> {
    if (isEmpty(eventoId)) {
      throw new HttpException(400, "Id do evento não informado");
    }

    const findEvento = await this.evento.findOne({ _id: eventoId }).exec();
    if (!findEvento) {
      throw new HttpException(404, "Evento não existe");
    }

    return findEvento;
  }

  public async create(eventoData: CreateEventoDto): Promise<Evento> {
    if (!eventoData.tipo) {
      throw new HttpException(
        400,
        "Há parâmetros não fornecidos ao criar o evento"
      );
    }

    const createdEvento = new this.evento({
      ...eventoData,
      timestamp: new Date(),
    });
    await createdEvento.save();
    return createdEvento;
  }

  public async update(
    eventoId: string,
    eventoData: UpdateEventoDto
  ): Promise<Evento> {
    if (isEmpty(eventoData)) {
      throw new HttpException(
        400,
        "Há parâmetros não fornecidos ao atualizar o evento"
      );
    }

    const updateOptions = { new: true };
    const updatedEvento = await this.evento.findByIdAndUpdate(
      eventoId,
      eventoData,
      updateOptions
    );

    if (!updatedEvento) {
      throw new HttpException(409, "Evento inexistente");
    }

    return updatedEvento;
  }

  public async delete(eventoId: string): Promise<Evento> {
    const deleteEvento = await this.evento.findByIdAndDelete(eventoId);

    if (!deleteEvento) {
      throw new HttpException(404, "Evento não encontrado.");
    }

    return deleteEvento;
  }
}

export default EventoService;
