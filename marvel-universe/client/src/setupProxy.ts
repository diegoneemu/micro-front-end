import proxy from "http-proxy-middleware";

module.exports = (app: any) => {
  app.use(proxy("/api", { target: "http://localhost:8080/" }));
};
