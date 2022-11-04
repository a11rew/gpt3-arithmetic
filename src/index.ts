import http from "http";
import { requestListener } from "./lib/http";

const server = http.createServer(requestListener);

const port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
