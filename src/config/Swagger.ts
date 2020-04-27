import expressSwagger from "express-swagger-generator";

export class Swagger {
  public static setSwagger(app: any) {
    const options = {
      swaggerDefinition: {
        info: {
          description: "This is a sample server",
          title: "Swagger",
          version: "1.0.0",
        },
        host: "localhost:8080",
        basePath: "/api",
        produces: ["application/json"],
        schemes: ["http"],
      },
      basedir: ".", // app absolute path
      files: ["./**/routes/**/*.js", "./**/routes/**/*.ts"], // Path to the API handle folder
    };

    expressSwagger(app)(options);
  }
}
