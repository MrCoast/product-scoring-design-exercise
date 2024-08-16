import { Product } from '../types/product';
import { ScoringRuleExpression, ScoringRuleExpressionOperators, ScoringRuleSet } from '../types/scoringRule';

export type PricesStats = {
    totalPrice: number,
    averagePrice: number,
};

export type ScoredProduct = {
    product: Product,
    score: number,
};

export default class ProductScoringService {
    constructor(
        private products: Product[],
        private scoringRuleSet: ScoringRuleSet,
    ) {}

    public getScoredProducts(): ScoredProduct[] {
        return this.products.map((product) => {
            let productScore = 0;

            for (const rule of this.scoringRuleSet.rules) {
                let expressionMatchesCount = 0;

                for (const expression of rule.expressions) {
                    if (this.isRuleExpressionMatch(product, expression)) {
                        if (expression.isNegative) {
                            expressionMatchesCount--;
                        } else {
                            expressionMatchesCount++;
                        }
                    }
                }

                productScore += (expressionMatchesCount / rule.expressions.length) * rule.score;
            }

            return {
                product,
                score: productScore,
            };
        });
    }

    public getFilteredScoredProducts(scoredProducts: ScoredProduct[], threshold: number = 0.5): ScoredProduct[] {
        return scoredProducts.filter((scoredProduct) => scoredProduct.score >= threshold);
    }

    public getPricesStats(scoredProducts: ScoredProduct[]): PricesStats {
        let totalPrice = 0;

        for (const scoredProduct of scoredProducts) {
            totalPrice += scoredProduct.product.cost;
        }

        return {
            totalPrice,
            averagePrice: totalPrice / scoredProducts.length,
        };
    }

    private isRuleExpressionMatch(product: Product, expression: ScoringRuleExpression): boolean {
        // Take either a field or an attribute from the product
        let productAttributeValue: string | number | null
            = product[expression.attributeName as keyof Product] as string | number | null;
        if (!productAttributeValue) {
            const searchedProductAttributeValue = product.attributes.find((attribute) => attribute.name === expression.attributeName);

            productAttributeValue = searchedProductAttributeValue
                ? searchedProductAttributeValue.value
                : null;
        }

        if (productAttributeValue === null) {
            // Expression field is missing in both product fields and attributes
            return false;
        }

        let evaluationResult;

        switch (expression.operator) {
            case ScoringRuleExpressionOperators.EQ:
                // @Assumption: use non-strict comparisons here because full data types hierarchy isn't implemented within this test task
                evaluationResult = productAttributeValue == expression.value;
                break;
            case ScoringRuleExpressionOperators.NE:
                evaluationResult = productAttributeValue != expression.value;
                break;
            case ScoringRuleExpressionOperators.LT:
                evaluationResult = productAttributeValue < expression.value;
                break;
            case ScoringRuleExpressionOperators.LTE:
                evaluationResult = productAttributeValue <= expression.value;
                break;
            case ScoringRuleExpressionOperators.GT:
                evaluationResult = productAttributeValue > expression.value;
                break;
            case ScoringRuleExpressionOperators.GTE:
                evaluationResult = productAttributeValue >= expression.value;
                break;
            default:
                // @Assumption: for production code, a custom error should be developed taking error data as the 2nd parameter,
                // so logging systems can store / filter is properly, not as a single string
                throw new Error(`Unsupported expression operator: ${expression.operator}`);
        }

        return evaluationResult;
    }
}
