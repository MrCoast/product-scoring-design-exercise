import { ScoringRuleExpressionOperators, ScoringRuleSet } from '../types/scoringRule';

export default {
    rules: [
        {
            expressions: [
                {
                    attributeName: 'Size',
                    value: 'Medium',
                    operator: ScoringRuleExpressionOperators.EQ,
                },
                {
                    attributeName: 'cost',
                    value: 20,
                    operator: ScoringRuleExpressionOperators.GTE,
                },
                {
                    attributeName: 'cost',
                    value: 22.5,
                    operator: ScoringRuleExpressionOperators.LTE,
                },
                {
                    attributeName: 'Material',
                    value: 'Metal',
                    operator: ScoringRuleExpressionOperators.NE,
                    isNegative: true,
                },
            ],
            score: 1, //@Assumption: for consistency, we use float numbers from 0 to 1, not percentages everywhere
        },
    ],
} as ScoringRuleSet;
