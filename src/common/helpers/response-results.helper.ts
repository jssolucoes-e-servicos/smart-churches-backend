import { HttpException, HttpStatus } from "@nestjs/common";

export class ResponseResultsHelper {

  static HandleError(message = "Error") {
    throw new HttpException(`Has erro: ${message}`, HttpStatus.NOT_FOUND);
  }

  static RegisterAlreadyExists(field = "Register") {
    throw new HttpException(`${field} alread exixts`, HttpStatus.NOT_FOUND);
  }

  static RegisterNotExists(field = "Register") {
    throw new HttpException(`${field} does not exixts`, HttpStatus.NOT_FOUND);
  }

  static RegisterIsDisable(field = "Register") {
    throw new HttpException(`${field} is disable`, HttpStatus.NOT_FOUND);
  }

  static RegisterDeleted(field = "Register") {
    return {
      message: `${field} deleted with success`,
      result: "OK",
    };
  }
}
