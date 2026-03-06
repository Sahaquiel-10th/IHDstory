"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Poster {
  id: number
  title: string
  image: string
}

interface PosterGalleryProps {
  posters: Poster[]
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export function PosterGallery({ posters }: PosterGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [originRect, setOriginRect] = useState<Rect | null>(null)
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [isExpandedVisible, setIsExpandedVisible] = useState(false)

  // 处理鼠标滚轮横向滚动
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        container.scrollLeft += e.deltaY * 2
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  // 监听滚动位置，更新当前激活的海报
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const posterWidth = 340 + 48 // poster width + gap
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2
      const index = Math.floor(scrollPosition / posterWidth)
      setActiveIndex(Math.min(Math.max(0, index), posters.length - 1))
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [posters.length])

  // 拖拽滚动
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
    setScrollLeft(scrollRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const posterWidth = 340 + 48
    const targetScroll = index * posterWidth - (scrollRef.current.offsetWidth - 340) / 2
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    })
  }

  const getExpandedRect = (): Rect => {
    if (typeof window === "undefined") {
      return { top: 0, left: 0, width: 340, height: 481 }
    }

    const aspectRatio = 210 / 297
    const maxWidth = window.innerWidth * 0.9
    const maxHeight = window.innerHeight * 0.9
    let width = maxWidth
    let height = width / aspectRatio

    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }

    return {
      top: (window.innerHeight - height) / 2,
      left: (window.innerWidth - width) / 2,
      width,
      height,
    }
  }

  const openExpandedPoster = (index: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const nextOriginRect: Rect = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }

    setOriginRect(nextOriginRect)
    setTargetRect(getExpandedRect())
    setExpandedIndex(index)
    requestAnimationFrame(() => setIsExpandedVisible(true))
  }

  const closeExpandedPoster = () => {
    setIsExpandedVisible(false)
    window.setTimeout(() => {
      setExpandedIndex(null)
      setOriginRect(null)
      setTargetRect(null)
    }, 420)
  }

  const showPrevPoster = () => {
    if (expandedIndex === null) return
    setExpandedIndex((expandedIndex - 1 + posters.length) % posters.length)
  }

  const showNextPoster = () => {
    if (expandedIndex === null) return
    setExpandedIndex((expandedIndex + 1) % posters.length)
  }

  useEffect(() => {
    if (expandedIndex === null) return

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeExpandedPoster()
        return
      }
      if (e.key === "ArrowLeft") {
        setExpandedIndex((prev) => {
          if (prev === null) return prev
          return (prev - 1 + posters.length) % posters.length
        })
        return
      }
      if (e.key === "ArrowRight") {
        setExpandedIndex((prev) => {
          if (prev === null) return prev
          return (prev + 1) % posters.length
        })
      }
    }

    const handleResize = () => setTargetRect(getExpandedRect())

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
    }
  }, [expandedIndex, posters.length])

  const expandedPoster = expandedIndex === null ? null : posters[expandedIndex]

  return (
    <div className="relative w-full">
      {/* 左侧渐变遮罩 */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* 右侧渐变遮罩 */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* 画廊容器 */}
      <div
        ref={scrollRef}
        className={`flex gap-12 overflow-x-auto scrollbar-hide py-8 px-[calc(50vw-170px)] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {posters.map((poster, index) => (
          <div
            key={poster.id}
            className="flex-shrink-0 scroll-snap-align-center"
            style={{ scrollSnapAlign: "center" }}
          >
            <PosterCard
              poster={poster}
              isActive={index === activeIndex}
              index={index}
              onExpand={(element) => openExpandedPoster(index, element)}
            />
          </div>
        ))}
      </div>

      {/* 进度指示器 */}
      <div className="flex justify-center gap-2 mt-8">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`跳转到海报 ${index + 1}`}
          />
        ))}
      </div>

      {/* 当前海报标题 */}
      <div className="text-center mt-6">
        <p className="text-lg font-medium text-foreground transition-all duration-300">
          {posters[activeIndex]?.title}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {activeIndex + 1} / {posters.length}
        </p>
      </div>

      {expandedPoster && originRect && targetRect && (
        <div className="fixed inset-0 z-50">
          <button
            onClick={closeExpandedPoster}
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
              isExpandedVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-label="关闭海报预览"
          />

          <button
            onClick={closeExpandedPoster}
            className={`absolute top-5 right-5 z-10 rounded-full p-2 bg-black/60 text-white transition-all duration-300 hover:bg-black/80 ${
              isExpandedVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={showPrevPoster}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/60 text-white transition-all duration-300 hover:bg-black/80 ${
              isExpandedVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            aria-label="上一张海报"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={showNextPoster}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-black/60 text-white transition-all duration-300 hover:bg-black/80 ${
              isExpandedVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            aria-label="下一张海报"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            className="fixed overflow-hidden rounded-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.55)] transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={
              isExpandedVisible
                ? {
                    top: `${targetRect.top}px`,
                    left: `${targetRect.left}px`,
                    width: `${targetRect.width}px`,
                    height: `${targetRect.height}px`,
                  }
                : {
                    top: `${originRect.top}px`,
                    left: `${originRect.left}px`,
                    width: `${originRect.width}px`,
                    height: `${originRect.height}px`,
                  }
            }
          >
            <Image
              src={expandedPoster.image}
              alt={expandedPoster.title}
              fill
              className="object-cover select-none"
              sizes="90vw"
              priority
            />
          </div>

          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center transition-all duration-300 ${
              isExpandedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <p className="text-white text-lg font-semibold">{expandedPoster.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}

interface PosterCardProps {
  poster: Poster
  isActive: boolean
  index: number
  onExpand: (element: HTMLElement) => void
}

function PosterCard({ poster, isActive, index, onExpand }: PosterCardProps) {
  return (
    <div
      className={`relative transition-all duration-500 ease-out animate-rise-in ${
        isActive ? "scale-100" : "scale-90 opacity-60"
      }`}
      style={{
        // A4 比例: 1:1.414 (210mm x 297mm)
        width: "340px",
        height: "481px", // 340 * 1.414
        animationDelay: `${index * 90 + 220}ms`,
      }}
    >
      {/* 发光效果 */}
      <div
        className={`absolute -inset-4 rounded-3xl transition-all duration-500 ${
          isActive
            ? "bg-primary/20 blur-2xl opacity-100"
            : "bg-transparent opacity-0"
        }`}
      />

      {/* 海报卡片 */}
      <button
        type="button"
        onClick={(e) => onExpand(e.currentTarget)}
        className={`relative w-full h-full rounded-2xl overflow-hidden bg-card border transition-all duration-500 ${
          isActive
            ? "border-primary/50 shadow-2xl shadow-primary/10 cursor-zoom-in"
            : "border-border/50 cursor-zoom-in"
        }`}
      >
        {/* 序号标签 */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-background/80 text-muted-foreground"
            }`}
          >
            {index + 1}
          </span>
        </div>

        {/* 海报图片 */}
        <Image
          src={poster.image}
          alt={poster.title}
          fill
          className="object-cover select-none"
          draggable={false}
          sizes="340px"
        />

        {/* 底部渐变 */}
        <div
          className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 标题 */}
        <div
          className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-white font-semibold text-lg truncate">
            {poster.title}
          </h3>
        </div>
      </button>
    </div>
  )
}
