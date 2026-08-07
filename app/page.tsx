import BestSellers from "@/components/BestSellers";
import CategoryBar from "@/components/Categorybar";
import ExploreBrandsSection from "@/components/ExploreBrandsSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import ImageSection from "@/components/ImageSection";
import InfluencersReelsSection from "@/components/InfluencersReelsSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="pt-5 sm:pt-6 md:pt-8 pb-14 sm:pb-16 lg:pb-20">
        <ImageSection />
        <CategoryBar />
        <BestSellers />
        <ExploreBrandsSection />
        <ExploreMoreSection />
        <InfluencersReelsSection />
      </div>
    </main>
  );
}
