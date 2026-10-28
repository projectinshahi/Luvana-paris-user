import BestSellers from "@/components/BestSellers";
import CategoryBar from "@/components/Categorybar";
import ExploreBrandsSection from "@/components/ExploreBrandsSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import ImageSection from "@/components/ImageSection";
import InfluencersReelsSection from "@/components/InfluencersReelsSection";
import { fetchHomeData } from "@/lib/homeDataServer";

export default async function Home() {
  const homeData = await fetchHomeData();
  return (
    <main className="flex flex-col">
      <div className="pt-5 sm:pt-6 md:pt-8 pb-14 sm:pb-16 lg:pb-20">
        <ImageSection initialData={homeData} />
        <CategoryBar initialData={homeData} />
        <BestSellers initialData={homeData} />
        <ExploreBrandsSection initialData={homeData} />
        <ExploreMoreSection initialData={homeData} />
        <InfluencersReelsSection initialData={homeData} />
      </div>
    </main>
  );
}
