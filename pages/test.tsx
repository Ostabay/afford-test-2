import { LeftSide } from '@/components/LeftSide';
import { RightSide } from '@/components/RightSide';
import { Product } from '@/context/initialState';
import { DefaultLayout } from '@/layouts/default';
import { ParentWrapper } from '@/layouts/wrapper';
import { Constants } from '@/utils/Constants';
import { Stack } from '@mui/material';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { brands = '', categories = '{}' } = query as {
    brands: string;
    categories: string;
  };

  const res = await fetch(`${Constants.baseUrl}/products`);
  const data = await res.json();
  const { products } = data as { products: Product[] };

  return {
    props: {
      products,
      brands: brands.split(','),
      categories: JSON.parse(categories) as { [key: string]: string[] },
    },
  };
};

const Test: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { products, brands, categories } = props;

  return (
    <DefaultLayout>
      <Head>
        <title>Interview Test</title>
      </Head>
      <ParentWrapper sx={{ paddingY: 6 }}>
        <Stack direction='row' spacing={2}>
          <LeftSide urlBrands={brands} urlCategories={categories} />
          <RightSide products={products} />
        </Stack>
      </ParentWrapper>
    </DefaultLayout>
  );
};

export default Test;
