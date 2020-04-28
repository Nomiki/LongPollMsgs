import expressSwagger from "express-swagger-generator";

export class Swagger {
  public static setSwagger(app: any) {
    const options = {
      swaggerDefinition: {
        info: {
          description: "Long Polling Messages Example",
          title: "LongPollMsgs",
          version: "1.0.0",
        },
        host: "localhost:8080",
        basePath: "/api",
        produces: ["application/json"],
        schemes: ["http"],
      },
      basedir: ".",
      files: ["./**/routes/**/*.js"],
    };

    expressSwagger(app)(options);
  }
}
