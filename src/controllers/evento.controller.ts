import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Evento from "../interfaces/evento.interface";
import CreateEventoDto from "../dto/Evento/create.evento.dto";
import EventoService from "../services/evento.service";

class EventoController {
  public eventoService = new EventoService();

  /**
   * @swagger
   * /eventos/{id}:
   *   get:
   *     tags:
   *       - Evento
   *     summary: Obtém um evento pelo ID
   *     description: Retorna um evento específico pelo seu ID.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID do evento
   *     responses:
   *       200:
   *         description: Evento obtido com sucesso
   *         schema:
   *           $ref: '#/definitions/Evento'
   *       404:
   *         description: Evento não encontrado
   */
  public getEventoById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const eventoId: string = req.params.id;

    if (!mongoose.isValidObjectId(eventoId)) {
      return res.status(400).json({ message: "Formato de ID inválido" });
    }

    try {
      const findEvento: Evento = await this.eventoService.findById(eventoId);

      res.status(200).json({ data: findEvento, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /eventos:
   *   post:
   *     tags:
   *       - Evento
   *     summary: Cria um novo evento
   *     description: Cria um novo evento com os dados fornecidos.
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Objeto de evento para criação
   *         required: true
   *         schema:
   *           $ref: '#/definitions/CreateEventoDto'
   *     responses:
   *       201:
   *         description: Evento criado com sucesso
   *         schema:
   *           $ref: '#/definitions/Evento'
   *       400:
   *         description: Dados inválidos fornecidos
   */

  public createEvento = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eventoData: CreateEventoDto = req.body;

      const createEventoData: Evento = await this.eventoService.create(
        eventoData
      );

      res.status(201).json({ data: createEventoData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /eventos:
   *   get:
   *     tags:
   *       - Evento
   *     summary: Lista todos os eventos
   *     description: Retorna uma lista de todos os eventos.
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Lista de eventos obtida com sucesso
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Evento'
   */
  public getAllEventos = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllEventosData: Evento[] = await this.eventoService.findAll();
      res.status(200).json({ data: findAllEventosData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /eventos/{id}:
   *   put:
   *     tags:
   *       - Evento
   *     summary: Atualiza um evento
   *     description: Atualiza um evento existente com os dados fornecidos.
   *     consumes:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID do evento
   *       - in: body
   *         name: body
   *         description: Objeto de evento para atualização
   *         required: true
   *         schema:
   *           $ref: '#/definitions/CreateEventoDto'
   *     responses:
   *       200:
   *         description: Evento atualizado com sucesso
   *         schema:
   *           $ref: '#/definitions/Evento'
   *       404:
   *         description: Evento não encontrado
   *       400:
   *         description: Dados inválidos fornecidos
   */
  public updateEvento = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eventoId: string = req.params.id;
      const eventoData: CreateEventoDto = req.body;

      if (!mongoose.isValidObjectId(eventoId)) {
        return res.status(400).json({ message: "Formato de ID inválido" });
      }
      const updateEventoData: Evento = await this.eventoService.update(
        eventoId,
        eventoData
      );
      res.status(200).json({ data: updateEventoData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /eventos/{id}:
   *   delete:
   *     tags:
   *       - Evento
   *     summary: Deleta um evento
   *     description: Deleta um evento com base no ID fornecido.
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: string
   *         description: ID do evento
   *     responses:
   *       200:
   *         description: Evento deletado com sucesso
   *       404:
   *         description: Evento não encontrado
   */
  public deleteEvento = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eventoId: string = req.params.id;

      if (!mongoose.isValidObjectId(eventoId)) {
        return res.status(400).json({ message: "Formato de ID inválido" });
      }
      const deleteEventoData: Evento = await this.eventoService.delete(
        eventoId
      );
      res.status(200).json({ data: deleteEventoData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default EventoController;
