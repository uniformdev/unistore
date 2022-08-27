import { IntegrationSettings, QueryClient } from "./types";
import type { Search, Product } from "commerce-sdk";
import { ProductSearchResult } from "@uniformdev/mesh-sdk-react";

const mapProductToSearchResult = (
  product: Product.ShopperProducts.Product
): ProductSearchResult => {
  return {
    id: product.id,
    title: product.name ?? "Untitled",
    thumbnailUrl: product.imageGroups?.find(
      (group) => group.viewType === "small"
    )?.images?.[0].link,
    sku: product.manufacturerSku ?? product.id,
    price: `${product.price} (${product.currency})`,
  };
};

export const makeSalesforceClient = ({
  settings,
}: {
  settings: IntegrationSettings;
}): QueryClient => {
  return {
    getProducts: async ({ text, options = {} }) => {
      const results = await fetch("/api/salesforce/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          limit: options.limit,
          offset: options.offset,
          sort: options.sort,
          category: options.category,
          ...settings,
        }),
      }).then(
        (res) =>
          res.json() as Promise<{
            products: Product.ShopperProducts.ProductResult["data"];
            total: Search.ShopperSearch.ProductSearchResult["total"];
          }>
      );

      return {
        total: results.total,
        products: options.variants
          ? results.products.reduce((acc, product): ProductSearchResult[] => {
              if (
                product.variants === undefined ||
                product.variants.length === 0
              ) {
                return [...acc, mapProductToSearchResult(product)];
              }

              return [
                ...acc,
                ...product.variants.map((variant) => {
                  return {
                    ...mapProductToSearchResult(product),
                    id: variant.productId,
                    title: product.name ?? "Untitled",
                    sku: variant.productId,
                    metadata: {
                      variantId: variant.productId,
                      productId: product.id,
                    },
                  };
                }),
              ];
            }, [] as ProductSearchResult[])
          : results.products.map(mapProductToSearchResult),
      };
    },
    getExactProducts: async ({ ids }) => {
      const results = await fetch("/api/salesforce/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids,
          ...settings,
        }),
      }).then(
        (res) =>
          res.json() as Promise<{
            products: Product.ShopperProducts.ProductResult["data"];
          }>
      );

      return results.products.map(mapProductToSearchResult);
    },
    getCategories: async () => {
      const results = await fetch("/api/salesforce/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      }).then(
        (res) =>
          res.json() as Promise<{
            categories: Product.ShopperProducts.Category[];
          }>
      );

      return results.categories.map((category) => ({
        id: category.id,
        name: category.name ?? "Untitled",
      }));
    },
    getRecommenders: async () => {
      const results = await fetch("/api/salesforce/einstein", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      }).then(
        (res) =>
          res.json() as Promise<{
            recommenders: {
              name: string;
              description: string;
              recommenderType: string;
            }[];
          }>
      );

      return results.recommenders ?? [];
    },
    getRecommendations: async ({ recommender, context }) => {
      const results = await fetch("/api/salesforce/einstein-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recommender,
          context,
          ...settings,
        }),
      }).then(
        (res) =>
          res.json() as Promise<{
            products: Product.ShopperProducts.ProductResult["data"];
          }>
      );

      return {
        products: results.products.map(mapProductToSearchResult),
      };
    },
  };
};
