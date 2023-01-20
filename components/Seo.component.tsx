import Head from "next/head";
import { useRouter } from "next/router";

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
};
const Seo = ({ title, description, image, url }: SeoProps) => {
  const router = useRouter();
  const fullUrl = url || `https://www.example.com${router.asPath}`;
  const fullImage = image || `https://www.example.com/images/default.jpg`;
  const fullType = "website";
  const fullSiteName = process.env.NEXT_PUBLIC_FULL_SITE_NAME || "Finances";
  const fullTitle = `${process.env.NEXT_PUBLIC_FULL_SITE_NAME}${
    title ? ` - ${title}` : ""
  }`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={fullType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={fullSiteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Head>
  );
};
export default Seo;
