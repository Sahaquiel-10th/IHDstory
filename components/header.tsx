import Image from "next/image"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/ihd-logo.jpg"
            alt="I Have a Demo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">I Have a Demo</span>
            <span className="text-xs text-muted-foreground">IHD 社区</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            项目案例
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            关于社区
          </a>
          <a 
            href="#" 
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            加入我们
          </a>
        </nav>
      </div>
    </header>
  )
}
