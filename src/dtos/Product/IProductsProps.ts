export default interface IProductsProps {
  product_id: string;
  product_name: string;
  product_composition: string | null;

  brand_id: string;
  brand_name: string;

  category_id: string;
  category_name: string;

  subcategory_id: string;
  subcategory_name: string;
}
