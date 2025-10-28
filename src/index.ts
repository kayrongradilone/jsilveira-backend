import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then((res) => {
      console.log("Servidor online");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  app.listen(process.env.PORT || 5555);
})();