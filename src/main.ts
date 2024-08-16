import products from './data/products';
import scoringRuleSet from './data/ruleset';
import ProductScoringService from './services/ProductScoringService';

const productScoringService = new ProductScoringService(products, scoringRuleSet);

const scoredProducts = productScoringService.getScoredProducts();
const filteredProducts = productScoringService.getFilteredScoredProducts(scoredProducts);
const pricesStats = productScoringService.getPricesStats(filteredProducts);

// console.log('Scored products', scoredProducts, "\n\n");
console.log('Filtered scored products', filteredProducts, "\n\n");

console.log(`
    Prices stats \n
    Total price: ${pricesStats.totalPrice}
    Average price: ${pricesStats.averagePrice}
`);
