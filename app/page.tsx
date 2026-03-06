import { Header } from "@/components/header"
import { JoinCommunityButton } from "@/components/join-community-button"
import { PosterGallery } from "@/components/poster-gallery"

const posters = [
  {
    id: 1,
    title: "AirTouch",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B1_AirTouch_%E6%9B%B4%E6%96%B0%E7%89%88.png",
  },
  {
    id: 2,
    title: "魔盒 Pro",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B5_%E9%AD%94%E7%9B%92Pro.png",
  },
  {
    id: 3,
    title: "汉唐辞",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B7_%E6%B1%89%E5%94%90%E8%BE%9E_%E6%9B%B4%E6%96%B0%E7%89%88.png",
  },
  {
    id: 4,
    title: "水下机器人",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B4_%E6%B0%B4%E4%B8%8B%E6%9C%BA%E5%99%A8%E4%BA%BA.png",
  },
  {
    id: 5,
    title: "OctoLab",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B3_OctoLab_%E6%96%B0%E7%89%88.png",
  },
  {
    id: 6,
    title: "请听我说",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B2_%E8%AF%B7%E5%90%AC%E6%88%91%E8%AF%B4_%E6%96%B0%E7%89%88.png",
  },
  {
    id: 7,
    title: "维度演进 AI",
    image: "https://ihdstory-1383535556.cos.ap-guangzhou.myqcloud.com/%E6%A1%88%E4%BE%8B6_%E7%BB%B4%E5%BA%A6%E6%BC%94%E8%BF%9BAI.png",
  },
]

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-background overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ambient-grid absolute inset-0" />
        <div className="ambient-noise absolute inset-0" />
        <div className="ambient-glow ambient-glow-a absolute" />
        <div className="ambient-glow ambient-glow-b absolute" />
      </div>

      <Header />
      
      {/* Hero 区域 */}
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            IHD 社区孵化项目展览
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            从 <span className="text-primary">Demo</span> 到产品
            <br />
            <span className="text-secondary">见证OPC创新的力量</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            滑动浏览，探索社区成员的创造力
          </p>
        </div>
      </section>

      {/* 操作提示 */}
      <div className="flex justify-center items-center gap-3 text-muted-foreground text-sm mb-4">
        <svg
          className="w-5 h-5 animate-bounce-x"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <span>滑动或拖拽浏览</span>
        <svg
          className="w-5 h-5 animate-bounce-x"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ animationDelay: "0.2s" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
      
      {/* 海报画廊 */}
      <section className="py-8">
        <PosterGallery posters={posters} />
      </section>

      {/* 底部统计 */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-16 md:gap-24">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground mt-2">孵化项目</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary">600+</div>
              <div className="text-sm text-muted-foreground mt-2">社区成员</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">2025</div>
              <div className="text-sm text-muted-foreground mt-2">创立年份</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 底部 CTA */}
      <section className="py-16 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            你也有一个 <span className="text-primary">Demo</span> ？
          </h2>
          <p className="text-muted-foreground mb-8">
            加入 IHD 社区，让我们一起把想法变成现实
          </p>
          <JoinCommunityButton />
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            2025 I Have a Demo. 用热情孵化创新。
          </span>
        </div>
      </footer>
    </main>
  )
}
