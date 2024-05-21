import App from "./app";
import EventoRoute from "./routes/evento.route";
import IndexRoute from "./routes/index.route";
import UserRoute from "./routes/user.route";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new IndexRoute(), new EventoRoute(), new UserRoute()]);

app.listen();
