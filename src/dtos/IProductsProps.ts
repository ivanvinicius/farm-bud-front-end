export default interface IProductsProps {
  id: string;
  name: string;
  composition?: string | boolean;
  formattedComposition?: string;
  brand: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
}
