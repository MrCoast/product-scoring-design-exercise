export type ScoringRuleSet = {
    rules: ScoringRule[],
};

export type ScoringRule = {
    expressions: ScoringRuleExpression[],
    score: number,
};

export type ScoringRuleExpression = {
    attributeName: string,
    // @Assumption: full subclasses hierarchy for specific data types expressions is omitted here to save time,
    // so just string or number is supported
    value: string | number,
    operator: ScoringRuleExpressionOperators,
    isNegative?: boolean,
};

export enum ScoringRuleExpressionOperators {
    EQ = '=',
    NE = '!=',
    LT = '<',
    LTE = '<=',
    GT = '>',
    GTE = '>=',
};
