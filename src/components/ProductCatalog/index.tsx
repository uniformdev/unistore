import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BrandResult, CategoryResult } from '@uniformdev/canvas-bigcommerce';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import ProductItem from '@/components/ProductItem';
import Dropdown from '@/atoms/Dropdown';
import EmptyContent from '@/atoms/EmptyContent';
import Pagination from '@/components/Pagination';
import { filterQuery, getBrandPath, getCategoryPath, getPageNumber, useSearchMeta } from '@/utils/search';
import { getPaginatedProducts } from '@/utils/commerce';

export type ProductCatalogProps = {
  categories?: CategoryResult[];
  brands?: BrandResult[];
  showFilters: boolean;
};

const SORT = {
  total_sold: 'Trending',
  date_modified: 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
};

const AWAIT = 700;

// This component can conditionally display filters and sorting options
const ProductCatalog = ({ showFilters, categories, brands }: ProductCatalogProps) => {
  const searchInput = useRef<any>(null);
  const [isDropdownOpened, setDropdownOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<Type.Product[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const router = useRouter();
  const { asPath, push } = router;
  const { q, sort, notAll } = router.query;
  const query = filterQuery({ sort, notAll });
  const { pathname, category, brand } = useSearchMeta(asPath);

  const activeCategory = category
    ? categories?.find(cat => cat.name.toLowerCase() === category.replace(/-/g, ' '))
    : undefined;

  const activeBrand = brand
    ? brands?.find(brandItem => brandItem.name.toLowerCase() === brand.replace(/-/g, ' '))
    : undefined;

  const [isLoaded, setIsLoaded] = useState(true);

  const onMouseOut = (toggle: boolean) => {
    setDropdownOpened(toggle);
  };
  const [page, setPage] = useState<number>(Number(getPageNumber('page')));

  const getProducts = async (event?: { target: { value: string } }): Promise<boolean> => {
    const keyword = event?.target?.value || '';
    setSearchValue(keyword);
    setIsLoaded(true);

    const res = await getPaginatedProducts({
      keyword,
      category: activeCategory?.id?.toString() || '',
      brand: activeBrand?.id?.toString() || '',
      page,
      params: sort,
    });

    scrollUp();
    setIsLoaded(false);
    setProducts(res.data);
    setTotal(res.total);

    return push(
      {
        pathname: pathname.toString(),
        query: { ...query, page: page > res.total || page < 1 ? 1 : page },
      },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  const onChangeSearch = useMemo(() => debounce(getProducts, AWAIT), [sort, brand, category, page]);

  useEffect(() => {
    const handleRouteChange = () => {
      setPage(Number(getPageNumber('page')));
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (brand || category || page) {
      if (searchInput.current) searchInput.current.value = '';
      push({ pathname: pathname.toString(), query: { ...query, page } }, undefined, { scroll: false, shallow: true });
      getProducts();
    }
  }, [sort, brand, category, page]);

  useEffect(() => onChangeSearch.cancel());

  const scrollUp = useCallback(() => {
    if (document) document.documentElement.scrollTop = 0;
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpened(!isDropdownOpened);
  }, [isDropdownOpened]);

  return showFilters ? (
    <div>
      <div className="md:pt-20 pt-10 md:flex pb-24 flex-row">
        <div className="xl:pr-16 md:w-1/4">
          {!notAll && (
            <div className="-pt-1 mb-[73px]">
              <p className="font-extrabold text-lg">Categories</p>
              <ul>
                {categories?.map(cat => (
                  <li key={`category-${cat.id}`} className={`mt-4 ${cat.id === activeCategory?.id ? 'underline' : ''}`}>
                    <Link href={{ pathname: getCategoryPath(cat.url ?? '', brand), query }} scroll={false}>
                      <a>{cat.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="font-extrabold text-lg mb-4">Brands</p>
            <Link href={{ pathname: getBrandPath('', category), query }} scroll={false}>
              <a>All Brands</a>
            </Link>
          </div>
          <ul>
            {brands?.map(brandItem => (
              <li
                key={`brand-${brandItem.id}`}
                className={`mt-4 ${brandItem.id === activeBrand?.id ? 'underline' : ''}`}
              >
                <Link href={{ pathname: getBrandPath(`/${brandItem.name}/`, category), query }} scroll={false}>
                  <a>{brandItem.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row flex-wrap pt-16 md:pt-0 md:w-3/4">
          <div className=" lg:w-[70%] w-full mt-1 mb-5 flex md:justify-start justify-center">
            <div className="relative bg-white flex lg:ml-4 w-[70%] direction-row h-[45px] dark:text-black border border-gray-300 index-1">
              <input
                type="text"
                ref={searchInput}
                onChange={onChangeSearch}
                className="w-[90%] h-full block px-3 py-2 bg-white border-none outline-none"
              />
              <div className="absolute flex h-full right-3">
                <Image width={20} height={20} src="/img/search.svg" />
              </div>
            </div>
          </div>
          <div className="lg:flex sm:block flex-row flex-wrap lg:justify-start justify-center pt-16 md:pt-0 z-0 w-full min-h-[640px]">
            {products?.length && !isLoaded ? (
              <>
                <div className="flex flex-1 justify-between lg:-ml-[2px] z-50 mt-16 ">
                  <div className="flex z-50 ">
                    <div className="flex mt-2 font-extrabold">
                      {searchValue &&
                        `Your results for “${
                          searchValue.length > 50 ? `${searchValue.substr(0, 50)}...` : searchValue
                        }”`}
                    </div>
                  </div>
                  <Dropdown
                    title="Sort by"
                    isOpened={isDropdownOpened}
                    onClick={toggleDropdown}
                    onMouseOut={onMouseOut}
                  >
                    <>
                      {Object.entries(SORT).map(([key, text]) => (
                        <Link
                          key={key}
                          passHref
                          href={{
                            pathname,
                            query: filterQuery({ q, sort: key, notAll }),
                          }}
                          scroll={false}
                        >
                          <button
                            onClick={toggleDropdown}
                            className={`${
                              sort === key ? 'underline' : ''
                            } block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4`}
                            role="menuitem"
                            tabIndex={-1}
                          >
                            {text}
                          </button>
                        </Link>
                      ))}
                    </>
                  </Dropdown>
                </div>
                <div className="grid w-full lg:grid-cols-3 sm:grid-cols-2 justify-center items-center">
                  {products.map(product => (
                    <ProductItem key={`product-${product.id}`} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyContent title="Sorry there are no products for this filter" isLoad={isLoaded} />
            )}
          </div>
          <Pagination currentPage={page || 1} onPageChange={setPage} totalCount={total || 0} pageSize={9} />
        </div>
      </div>
    </div>
  ) : (
    <div className="lg:grid lg:grid-cols-3 flex md:flex-row flex-col flex-wrap items-center justify-center">
      {products?.length ? (
        products.map((product: any) => <ProductItem key={`product-${product.id}`} product={product} />)
      ) : (
        <EmptyContent title="Sorry there are no products for this filter" isLoad={isLoaded} />
      )}
    </div>
  );
};

export default ProductCatalog;
