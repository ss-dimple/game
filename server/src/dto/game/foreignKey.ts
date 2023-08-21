import { Rule, RuleType } from '@midwayjs/validate';
import { PageSearchDto } from '../comm';

export class PageTypeManageDto extends PageSearchDto {
  @Rule(RuleType.string().allow(''))
  typeName: string;

  @Rule(RuleType.number().allow(''))
  typeLevel: number;
}

export class AddTypeDto {
  @Rule(RuleType.required())
  typeName: string;

  @Rule(RuleType.number().integer().required())
  typeLevel: number;
}

export class EditTypeDto extends AddTypeDto {
  @Rule(RuleType.number().integer().required())
  id: number;
}
