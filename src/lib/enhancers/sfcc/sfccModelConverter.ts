export const sfccModelConverter = ({ parameter }: any) => {
  const productData = parameter.value;
  if (Array.isArray(productData)) {
    return productData.map(p => transformProduct(p));
  } else {
    return transformProduct(productData);
  }
};

export function transformProduct(product: any) {
  try {
    if (!product) {
      return product;
    }

    if (!product.imageGroups) {
      return product;
    }

    const productImages = product.imageGroups[0]?.images?.map((i: any) => {
      return { src: i.disBaseLink, alt: i.alt };
    });

    if (!product.variationAttributes) {
      return {
        ...product,
        images: productImages,
        rating: 4.3,
        reviewCount: 123,
      };
    }

    //processing colors
    const colorDefinitions = product.variationAttributes?.find((a: any) => a.id === 'color')?.values;
    const colorMap = new Map();
    if (colorDefinitions) {
      colorDefinitions.forEach((c: any) => colorMap.set(c.value, c.name));
    }
    const productColors: Array<any> = [];
    product.variants?.forEach((v: any) => {
      const color = colorMap.get(v.variationValues.color);
      if (color) {
        productColors.push(color);
      }
    });
    //processing sizes
    const sizeDefinitions = product.variationAttributes.find((a: any) => a.id === 'size')?.values;
    const sizeMap = new Map();
    if (sizeDefinitions) {
      sizeDefinitions.forEach((c: any) => sizeMap.set(c.value, c.name));
    }
    const productSizes: Array<any> = [];
    product.variants.forEach((v: any) => {
      const size = sizeMap.get(v.variationValues.size);
      if (size) {
        productSizes.push();
      }
    });

    const productData = {
      ...product,
      images: productImages,
      colors: Array.from(new Set(productColors)),
      sizes: Array.from(new Set(productSizes)),
      rating: 4.3,
      reviewCount: 123,
    };

    delete productData.imageGroups;
    return productData;
  } catch (err) {
    console.log({ err });
  }
}
