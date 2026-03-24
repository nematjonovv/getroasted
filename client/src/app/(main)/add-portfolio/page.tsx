"use client"
import { useMe } from "@/src/features/auth/useAuth";
import { useCreatePortfolio } from "@/src/features/portfolio/usePortfolio";
import { useNotification } from "@/src/shared/lib/NotificationProvider";
import Link from "next/link";
import { useState } from "react"
type formdata = {
  title: string,
  description: string,
  liveLink: string,
  githubLink: string,
  techstack: string[]
}
const TECH_SUGGESTIONS = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "MongoDB", "Tailwind", "GraphQL", "Docker", "AWS",
  "Vue", "Svelte", "Python", "Django", "Redis"
]

export default function AddPortfolio() {
  const [data, setData] = useState<formdata>({
    title: "",
    description: "",
    liveLink: "",
    githubLink: "",
    techstack: []
  })
  const [techInput, setTechInput] = useState("");
  const addTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !data.techstack.includes(trimmed)) {
      setData((prev) => ({ ...prev, techstack: [...prev.techstack, trimmed] }));
    }
  };
  const removeTech = (tech: string) => {
    setData((prev) => ({
      ...prev,
      techstack: prev.techstack.filter((t) => t !== tech),
    }));

  };
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(techInput);
    }
  };

  const { data: me } = useMe()
  const { success, error1 } = useNotification()
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = 5 - images.length
    const newFiles = files.slice(0, remaining)

    setImages(prev => [...prev, ...newFiles])
    newFiles.forEach(file => {
      setPreviews(prev => [...prev, URL.createObjectURL(file)])
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }
  const { mutate: create } = useCreatePortfolio(
    String(me?.user.username),
    (message) => success(message),
    (message) => error1(message),
    (errors) => setFieldErrors(errors)
  )
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("liveLink", data.liveLink)
    formData.append("githubLink", data.githubLink)
    data.techstack.forEach(tech => {
      formData.append("techstack", tech)
    })
    images.forEach(img => {
      formData.append("portfolio_image", img)
    })
    try {
      create(formData)
      setLoading(true)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-center py-10">
      <div className="flex flex-col items-end w-full max-w-xl pb-15">
        <p className="syne text-3xl  font-semibold">Add your portfolio</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl pb-20">
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-(--text-50) mb-2">
            Images ({images.length}/5)
          </label>

          <div className="flex flex-wrap gap-2">
            {/* Thumbnails */}
            {previews.map((src, i) => (
              <div key={i} className="relative w-16 h-16 shrink-0">
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-16 h-16 object-cover round15 border border-(--text-10)"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-(--surface) border border-(--text-10) text-[10px] text-(--text-50) hover:opacity-70"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add button — 5 tadan kam bo'lsa ko'rsatish */}
            {images.length < 5 && (
              <label className="w-16 h-16 shrink-0 round15 border border-dashed border-(--text-10) bg-(--surface) flex items-center justify-center text-(--text-50) text-xl cursor-pointer hover:opacity-70 transition-all">
                +
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {fieldErrors.images && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.images[0]}</p>
          )}
        </div>
        <div>
          <input
            value={data?.title}
            onChange={e => setData(p => ({ ...p, title: e.target.value }))}
            placeholder="Title"
            className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
          />
          {fieldErrors.title && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.title[0]}</p>
          )}
        </div>

        <div>
          <textarea
            value={data?.description}
            onChange={e => setData(p => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
          />
          {fieldErrors.description && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.description[0]}</p>
          )}
        </div>

        <div>
          <input
            value={data?.liveLink}
            onChange={e => setData(p => ({ ...p, liveLink: e.target.value }))}
            placeholder="Live Link"
            className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
          />
          {fieldErrors.liveLink && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.liveLink[0]}</p>
          )}
        </div>

        <div>
          <input
            value={data?.githubLink}
            onChange={e => setData(p => ({ ...p, githubLink: e.target.value }))}
            placeholder="GitHub Link"
            className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
          />
          {fieldErrors.githubLink && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.githubLink[0]}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold tracking-widest uppercase text-(--text-50)">
            Tech Stack
          </label>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 min-h-9">
            {data.techstack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold round15 transition-all text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="w-3.5 h-3.5 flex items-center justify-center rounded-full font-black text-[10px] transition-colors hover:opacity-70 text-(--text-50)">
                  ✕
                </button>
              </span>
            ))}
          </div>

          {/* Input */}
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            placeholder="Add tech, press Enter…"
            className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
          />

          {/* Techstack error */}
          {fieldErrors.techstack && (
            <p className="text-red-500 text-xs">{fieldErrors.techstack[0]}</p>
          )}

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2">
            {TECH_SUGGESTIONS.filter(
              (s) =>
                !data.techstack.includes(s) &&
                s.toLowerCase().includes(techInput.toLowerCase())
            )
              .slice(0, 6)
              .map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addTech(s)}
                  className="px-3 py-1 text-xs font-semibold round15 transition-all duration-150 hover:opacity-80 bg-(--text-10) text-(--text-50)">
                  + {s}
                </button>
              ))}
          </div>
        </div>

        <div className="flex items-center justify-end py-5">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="syne px-8 py-3 font-semibold cursor-pointer text-sm tracking-wider uppercase round15 transition-all duration-200 hover:opacity-95 active:scale-95 bg-(--primary) text-(--text)">
              Save Profile
            </button>
            <Link href={"/profile/me"} className="syne px-8 py-3 font-semibold cursor-pointer text-sm tracking-wider uppercase round15 transition-all duration-200 hover:opacity-95 border border-(--text-50 hover:text-red-500 hover:border-red-500) active:scale-95 bg-transparent text-(--text)">CANCEL</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
