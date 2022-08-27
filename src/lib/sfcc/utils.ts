export const createProductEditUrlConstructor =
  (adminPanelUrl: string) =>
  (productId: string): string => {
    const normalizedBaseUrl = new URL(adminPanelUrl).origin;

    return `${normalizedBaseUrl}/products/edit-product/${productId}`;
  };
