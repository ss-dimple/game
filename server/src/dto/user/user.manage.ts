import { Rule, RuleType } from '@midwayjs/validate';
import { PageSearchDto } from '../comm';

export class PageUserDto extends PageSearchDto {
  @Rule(RuleType.number())
  userno: number;

  @Rule(RuleType.string().allow(''))
  username: string;

  @Rule(RuleType.number())
  sex: number;

  @Rule(RuleType.number())
  roleId: number;
}
