export default interface IProductMeasureProps {
  id: string;
  provider_id: string;
  product_id: string;
  measure_id: string;
  volume: string;
  price: string;
  product: {
    id: string;
    subcategory_id: string;
    brand_id: string;
    name: string;
    composition: null;
    subcategory: {
      id: string;
      category_id: string;
      name: string;
      category: {
        id: string;
        name: string;
      };
    };
    brand: {
      id: string;
      name: string;
    };
  };
  measure: {
    id: string;
    name: string;
    type: string | number;
  };
}
