import { Body, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { OpenControllerTag } from "src/common/decorators";
import { DeleteRegisterDTO } from "src/common/dto/delete-register.dto";
import { IFindWithName } from "src/common/interfaces/find-with-name.interface";
import { UserCreateDTO } from "src/modules/users/dto/users.create.dto";
import { UserUpdateDTO } from "src/modules/users/dto/users.update.dto";
import { UsersService } from "src/modules/users/services/users.service";

@OpenControllerTag("Users", "users")
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly _service: UsersService) { }

  @Post(":churchId")
  async create(@Param("churchId") churchId: string, @Body() data: UserCreateDTO) {
    return this._service.create(churchId, data);
  }

  @Post(":churchId/firt-auth")
  async createWithNotAuth(@Param("churchId") churchId: string, @Body() data: UserCreateDTO) {
    return this._service.create(churchId, data);
  }

  //@Auth()
  @Get(":churchId")
  async findAll(@Param("churchId") churchId: string): Promise<any> {
    return churchId === "GB5225" ? this._service.findGlobal() : this._service.findAll(churchId);
  }

  //@Auth()
  @Get(":churchId/show/:id")
  async findOne(@Param("churchId") churchId: string, @Param("id") id: string) {
    return this._service.findOne(churchId, id);
  }

  //@UseGuards(JwtAuthGuard)
  //@Auth()
  @Post(":churchId/find-with-name")
  async findWithName(@Param("churchId") churchId: string, @Body() data: IFindWithName, @Query("skip") skip: number) {
    if (skip === undefined) {
      skip = 0;
    }
    return this._service.findWithName(churchId, data);
  }

  //@Auth()
  @Patch(":id")
  async update(@Param("id") id: string, @Body() data: UserUpdateDTO): Promise<any> {
    return this._service.update(id, data);
  }

  //@Auth()
  @Delete()
  async delete(@Body() data: DeleteRegisterDTO) {
    return this._service.delete(data);
  }
}
