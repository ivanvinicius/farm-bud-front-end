export default interface IProductMeasureProps {
  productmeasure_id: string;
  productmeasure_provider_id: string;
  productmeasure_product_id: string;
  productmeasure_measure_id: string;

  productmeasure_volume: string;
  productmeasure_price: string;
  productmeasure_formatted_volume?: string;
  productmeasure_formatted_price?: string;

  productmeasure_product_subcategory_id: string;
  productmeasure_product_brand_id: string;
  productmeasure_product_name: string;
  productmeasure_product_composition: string;
  productmeasure_product_subcategory_category_id: string;
  productmeasure_product_subcategory_name: string;
  productmeasure_product_subcategory_category_name: string;
  productmeasure_product_brand_name: string;
  productmeasure_measure_name: string;
  productmeasure_measure_type: number;
}
