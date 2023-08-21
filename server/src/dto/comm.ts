import { Rule, RuleType } from '@midwayjs/validate';

export class PageSearchDto {
  //'分页查询每页数量',example: 10
  @Rule(RuleType.number().integer().min(0).default(10))
  limit: number;

  //'分页查询当前页数', example: 1
  @Rule(RuleType.number().integer().min(1).default(1))
  page: number;
}
