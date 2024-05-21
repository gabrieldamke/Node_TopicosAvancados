import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { connect, set, disconnect } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import { PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "./config";
import { dbConnection } from "./databases";
import { Routes } from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";
import { logger, stream } from "./utils/logger";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express().use(cookieParser());
    this.env = "development";
    this.port = PORT || 3000;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= Ambiente: ${this.env} =======`);
      logger.info(`🚀 Api rodando na porta ${this.port}`);
      logger.info(
        `🚀 Acesse a documentação swagger em http://localhost:${this.port}/swagger`
      );
      logger.info(`=================================`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log("Desconectado do MongoDB");
    } catch (error) {
      console.error("Erro ao encerrar a conexão com o banco de dados:", error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== "production") {
      set("debug", true);
    }

    await connect(dbConnection.url);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT as string, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger() {
    const options: SwaggerOptions = {
      swaggerDefinition: {
        info: {
          title: "Api Express - IoT",
          version: "1.0.0",
          description:
            "Esta API foi desenvolvida como requisito de avaliação para a disciplina de Tópicos Avançados em Computação",
        },
      },
      apis: ["src/controllers/*.controller.ts", "schema.yaml"],
    };

    const specs = swaggerJSDoc(options);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
