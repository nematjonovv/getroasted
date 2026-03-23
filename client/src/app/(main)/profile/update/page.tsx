"use client";

import { useMe } from "@/src/features/auth/useAuth";
import { profilApi } from "@/src/features/profle/profile.api";
import { useUpdateProfile } from "@/src/features/profle/useProfile";
import { useNotification } from "@/src/shared/lib/NotificationProvider";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

export interface ProfileData {
  username: string;
  name: string;
  secondname: string;
  profession: string;
  techstack: string[];
}


const TECH_SUGGESTIONS = [
  "React", "TypeScript", "Node.js", "Vue", "Next.js", "Tailwind",
  "GraphQL", "Python", "Go", "Rust", "Docker", "PostgreSQL",
];

export default function ProfileUpdateForm() {
  const { data: me } = useMe()
  const [form, setForm] = useState<ProfileData>({
    name: me?.user.name || "",
    secondname: me?.user.secondname || "",
    username: me?.user.username || "",
    techstack: me?.user.techstack || [],
    profession: me?.user.profession || "",

  });
  const [techInput, setTechInput] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const addTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !form.techstack.includes(trimmed)) {
      setForm((prev) => ({ ...prev, techstack: [...prev.techstack, trimmed] }));
    }
    setTechInput("");
    setSaved(false);
  };

  const removeTech = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      techstack: prev.techstack.filter((t) => t !== tech),
    }));
    setSaved(false);
  };

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech(techInput);
    }
  };

  const { success, error1 } = useNotification()

  const { mutate: update } = useUpdateProfile(form, (message) => success(message), (message) => error1(message))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      update()
    } catch (error) {

    }
  };

  return (
    <div
      className="min-h-screen pt-15 px-4"
    >
      <div>

      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className=" space-y-6"
        >
          {/* Username */}
          <div className="space-y-2">
            <label
              className="block text-xs font-bold tracking-widest uppercase text-(--text-50)">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 bg-(--surface) text-(--text) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
            />
          </div>

          {/* Name + Secondname */}
          <div className="grid grid-cols-2 gap-4">
            {(["name", "secondname"] as const).map((field) => (
              <div key={field} className="space-y-2">
                <label
                  className="block text-xs font-bold tracking-widest uppercase text-(--text-50)">
                  {field === "name" ? "First Name" : "Last Name"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
                />
              </div>
            ))}
          </div>

          {/* Profession */}
          <div className="space-y-2">
            <label
              className="block text-xs font-bold tracking-widest uppercase text-(--text-50"
            >
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1"
            />
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <label
              className="block text-xs font-bold tracking-widest uppercase text-(--text-50)">
              Tech Stack
            </label>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 min-h-9">
              {form.techstack.map((tech) => (
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
              className="w-full px-4 py-3 text-sm font-medium outline-none transition-all duration-200 round15 text-(--text) bg-(--surface) border border-(--text-10) focus:ring-(--primary) focus:ring-1" />

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {TECH_SUGGESTIONS.filter(
                (s) =>
                  !form.techstack.includes(s) &&
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

          {/* Divider */}
          <div className="h-px w-full bg-(--text-10" />

          {/* Submit */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium transition-all duration-300 ${saved ? "text-(--spark)" : "text-transparent"}`}
            >
              ✓ Changes saved
            </span>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="syne px-8 py-3 font-semibold cursor-pointer text-sm tracking-wider uppercase round15 transition-all duration-200 hover:opacity-95 active:scale-95 bg-(--primary) text-(--text)">
                Save Profile
              </button>
              <button onClick={() => router.push("/profile/me")} className="syne px-8 py-3 font-semibold cursor-pointer text-sm tracking-wider uppercase round15 transition-all duration-200 hover:opacity-95 border border-(--text-50 hover:text-red-500 hover:border-red-500) active:scale-95 bg-transparent text-(--text)">CANCEL</button>
            </div>
          </div>
        </form>

      </div >
    </div >
  );
}