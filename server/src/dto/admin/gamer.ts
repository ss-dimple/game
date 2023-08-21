import { Rule, RuleType } from '@midwayjs/validate';
import { PageSearchDto } from '../comm';

export class PageGamerUserDto extends PageSearchDto {
  @Rule(RuleType.string().allow(''))
  name: string;

  @Rule(RuleType.string().allow(''))
  username: string;

  @Rule(RuleType.string().allow(''))
  phone: string;

  @Rule(RuleType.number().min(1).max(2))
  sex: number;

  @Rule(RuleType.string().allow(''))
  company: string;

  @Rule(RuleType.number().min(0).max(1))
  status: number;
}

export class UpdateGamerStatusDto extends PageSearchDto {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().min(0).max(1).required())
  status: number;
}
