import { Rule, RuleType } from '@midwayjs/validate';

export class fileImgDto {
  @Rule(RuleType.required())
  id: any;

  @Rule(RuleType.required())
  imgCode: string;

  @Rule(RuleType.required())
  file: any;
}

export class downloadFileDto {
  @Rule(RuleType.string().required())
  fileType: string;

  @Rule(RuleType.string().required())
  fileName: string;
}
