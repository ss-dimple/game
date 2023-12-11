import { Rule, RuleType } from '@midwayjs/validate';

export class AddGameDto {
  @Rule(RuleType.required())
  gameName: string;

  @Rule(RuleType.required())
  gameTitle: string;

  @Rule(RuleType.required())
  gameDesc: string;

  @Rule(RuleType.required())
  language: string;

  @Rule(RuleType.required())
  set: string;

  @Rule(RuleType.required())
  tags: string;

  @Rule(RuleType.required())
  newTag: string;

  @Rule(RuleType.required())
  newLanguage: string;

  @Rule(RuleType.required())
  newSet: string;

  // @Rule(RuleType.number().integer().min(0).max(1).default(1))
  // status: number;

  @Rule(RuleType.number().integer().min(0).max(1).default(1))
  gameMeta: number;

  @Rule(RuleType.number().integer().required())
  typeId: number;

  @Rule(RuleType.number().integer().required())
  teacherId: number;

  @Rule(RuleType.required())
  teamName: string;

  @Rule(RuleType.number().integer())
  teamId: number;

  @Rule(RuleType.required())
  username: string;
}

export class updateAvgDto {
  @Rule(RuleType.required())
  avg: string;

  @Rule(RuleType.number().integer().required())
  gameId: number;
}

export class updateCheckDto {
  @Rule(RuleType.number().integer().required())
  check: number;

  @Rule(RuleType.number().integer().required())
  gameId: number;
}

export class AddRejectDto {

  @Rule(RuleType.number().integer().required())
  gameId: number;

  @Rule(RuleType.number().integer().required())
  teacherId: number;

  @Rule(RuleType.required())
  username: string;

  @Rule(RuleType.required())
  reply: string;
}
