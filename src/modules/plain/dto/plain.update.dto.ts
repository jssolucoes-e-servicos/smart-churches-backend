import { PartialType } from "@nestjs/swagger";
import { PlainCreateDTO } from "./plain.create.dto";

export class PlainUpdateDTO extends PartialType(PlainCreateDTO) { }
