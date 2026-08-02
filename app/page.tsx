import BestSellers from "@/components/BestSellers";
import CategoryBar from "@/components/Categorybar";
import ExploreBrandsSection from "@/components/ExploreBrandsSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import ImageSection from "@/components/ImageSection";
import InfluencersReelsSection from "@/components/InfluencersReelsSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 lg:pb-24">
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
