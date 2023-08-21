import { Rule, RuleType } from '@midwayjs/validate';
import { PageSearchDto } from '../comm';

export class PageAdminUserDto extends PageSearchDto {
  @Rule(RuleType.string().allow(''))
  name: string;

  @Rule(RuleType.string().allow(''))
  username: string;

  @Rule(RuleType.string().allow(''))
  phone: string;

  @Rule(RuleType.number().min(1).max(2))
  sex: number;

  @Rule(RuleType.number().min(1).max(2))
  level: number;

  @Rule(RuleType.number().integer().min(0).max(1).default(1))
  userStatus: number;
}

export class AdminStatusDto {
  @Rule(RuleType.number().integer().required())
  id: number;

  @Rule(RuleType.number().integer().required())
  status: number;
}

export class EditAdminSelfDto {
  @Rule(RuleType.number().integer().required())
  id: number;

  @Rule(RuleType.required())
  name: string;

  @Rule(RuleType.required())
  username: string;

  @Rule(RuleType.string().allow(''))
  phone: string;

  @Rule(RuleType.number().integer().required())
  sex: number;
}

export class AddAdminDto {
  @Rule(RuleType.required())
  name: string;

  @Rule(RuleType.required())
  username: string;

  @Rule(RuleType.allow(''))
  phone: string;

  @Rule(RuleType.number().integer().required())
  sex: number;

  @Rule(RuleType.number().integer().required())
  level: number;
}

export class EditAdminDto extends AddAdminDto {
  @Rule(RuleType.number().integer().required())
  id: number;
}

export class AdminResetPasswordDto {
  @Rule(RuleType.number().integer().required())
  id: number;

  @Rule(RuleType.string().required())
  newPassword: string;
}
