import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AccountCreateService } from '@backend/systems/account-logics';
import { AccountToInputDataDto } from '@backend/dtos/input';
import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { ApiResult } from '@backend/interfaces/api';

/** Контроллер REST-API создания аккунта */
@Controller('account')
export class ApiCreateAccountController {
  /**
   * Конструктор контроллера системы
   * @param {AccountCreateService} accountCreateService - Сервис бизнес логики создания аккаунта
   **/
  constructor(private accountCreateService: AccountCreateService) {}

  /**
   * Создание нового аккаунта
   * @returns {Promise<ApiResult<null>>} - Результат работы REST-API Post эндпоинта создания аккаунта
   * @public
   **/
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() accountToInputDataDto: AccountToInputDataDto
  ): Promise<ApiResult<null>> {
    /** Результат создания аккаунта */
    const resultCreate: SystemResult<null> =
      await this.accountCreateService.create(accountToInputDataDto);

    const returned: ApiResult<null> = {
      error: resultCreate.error,
      successMessages: resultCreate.successMessages,
      errorMessages: resultCreate.errorMessages,
      data: resultCreate.data,
    };

    if (resultCreate.error) {
      switch (resultCreate.errorCode) {
        case EnumerationErrorCodes.ERROR_CODE_ALREADY_EXISTS: {
          throw new ConflictException(returned);
        }
        case EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR: {
          throw new InternalServerErrorException(returned);
        }
        default: {
          throw new InternalServerErrorException(returned);
        }
      }
    }

    return returned;
  }
}
