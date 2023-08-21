import { Rule, RuleType } from '@midwayjs/validate';

export class LoginInfoDto {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
