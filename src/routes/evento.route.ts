import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import EventoController from "../controllers/evento.controller";
import CreateEventoDto from "../dto/Evento/create.evento.dto";
import validationMiddleware from "../middlewares/validation.middleware";
import { UpdateEventoDto } from "../dto/Evento/update.evento.dto";
import authMiddleware from "../middlewares/auth.middleware";

class EventoRoute implements Routes {
  public path = "/eventos";
  public router = Router();

  public eventoController = new EventoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.eventoController.getAllEventos
    );
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      this.eventoController.getEventoById
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateEventoDto, "body"),
      this.eventoController.createEvento
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(UpdateEventoDto, "body", true),
      this.eventoController.updateEvento
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.eventoController.deleteEvento
    );
  }
}

export default EventoRoute;
