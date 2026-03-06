"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link?: string
  tags?: string[]
  className?: string
  featured?: boolean
}

export function ProjectCard({
  title,
  description,
  image,
  link,
  tags = [],
  className,
  featured = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border/50",
        "transition-all duration-500 ease-out",
        "hover:border-primary/50 hover:shadow-[0_0_40px_rgba(124,92,252,0.15)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 图片容器 */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            isHovered ? "scale-110 brightness-50" : "scale-100 brightness-75"
          )}
        />
        
        {/* 渐变遮罩 */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent",
            "transition-opacity duration-500",
            isHovered ? "opacity-90" : "opacity-70"
          )}
        />
        
        {/* 特色标签 */}
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
        
        {/* 内容 */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* 标签 */}
          <div 
            className={cn(
              "flex flex-wrap gap-2 mb-3 transition-all duration-500",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 标题 */}
          <h3 
            className={cn(
              "text-xl font-semibold text-foreground mb-2 transition-all duration-500",
              featured && "text-2xl"
            )}
          >
            {title}
          </h3>
          
          {/* 描述 */}
          <p 
            className={cn(
              "text-sm text-muted-foreground line-clamp-2 transition-all duration-500",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {description}
          </p>
          
          {/* 链接 */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary",
                "transition-all duration-500 hover:text-secondary",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              查看项目
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
