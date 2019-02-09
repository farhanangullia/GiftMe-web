import {Product} from './product';
import {Review} from '../_models/Review';
// import reviews later
// no need to do the above, reviews will be in the shop

export class Shop {
  shopId: number;
  location: string;
  products: Product[];
  shopName: string;
  shopType: string;
  reviews: Review[];
}
