import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SectionTitle } from "./SectionTitle";

type Blog = {
  id: string;
  author_name: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
};
type Comment = {
  id: string;
  blog_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

function fmt(d: string) {
  return new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState({ author: "", title: "", content: "" });
  const [commentDraft, setCommentDraft] = useState<Record<string, { name: string; text: string }>>({});
  const [busy, setBusy] = useState(false);

  const loadBlogs = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false }).limit(50);
    if (data) setBlogs(data);
  };
  const loadComments = async (blogId: string) => {
    const { data } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("blog_id", blogId)
      .order("created_at", { ascending: true });
    if (data) setComments((c) => ({ ...c, [blogId]: data }));
  };

  useEffect(() => {
    loadBlogs();
    const ch = supabase
      .channel("public-blogs")
      .on("postgres_changes", { event: "*", schema: "public", table: "blogs" }, () => loadBlogs())
      .on("postgres_changes", { event: "*", schema: "public", table: "blog_comments" }, (payload) => {
        const row = (payload.new as Comment) || (payload.old as Comment);
        if (row?.blog_id) loadComments(row.blog_id);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const publish = async () => {
    if (!form.author.trim() || !form.title.trim() || !form.content.trim()) return;
    setBusy(true);
    await supabase.from("blogs").insert({
      author_name: form.author.trim(),
      title: form.title.trim(),
      content: form.content.trim(),
    });
    setForm({ author: "", title: "", content: "" });
    setBusy(false);
  };

  const like = async (b: Blog) => {
    await supabase.from("blogs").update({ likes: b.likes + 1 }).eq("id", b.id);
  };

  const submitComment = async (blogId: string) => {
    const d = commentDraft[blogId];
    if (!d?.name?.trim() || !d?.text?.trim()) return;
    await supabase.from("blog_comments").insert({
      blog_id: blogId,
      author_name: d.name.trim(),
      content: d.text.trim(),
    });
    setCommentDraft((m) => ({ ...m, [blogId]: { name: d.name, text: "" } }));
  };

  const toggleOpen = (id: string) => {
    setOpenId((o) => (o === id ? null : id));
    if (!comments[id]) loadComments(id);
  };

  return (
    <section id="blogs" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle
          eyebrow="Community"
          title="FAN BLOGS & DISCUSSIONS"
          subtitle="Publish your IPL takes. Everything you post shows up on every device, instantly."
          accent="cyan"
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Publish */}
          <div className="glass-strong neon-border rounded-2xl p-6 lg:sticky lg:top-24 h-fit">
            <div className="mb-4 font-display text-2xl text-glow-cyan">Publish a Blog</div>
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Your username"
              className="mb-3 w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
            />
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Blog title"
              className="mb-3 w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Share your prediction or opinion..."
              rows={6}
              className="mb-3 w-full rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
            />
            <button
              disabled={busy}
              onClick={publish}
              className="w-full rounded-lg bg-gradient-to-r from-[#1e6bff] to-[#00e5ff] px-4 py-2.5 text-sm font-bold text-[#03081a] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 transition disabled:opacity-50"
            >
              {busy ? "Publishing..." : "Publish Blog"}
            </button>
            <p className="mt-3 text-[11px] text-slate-400">
              Posts are public and visible to every visitor in real time.
            </p>
          </div>

          {/* Feed */}
          <div className="space-y-5">
            {blogs.length === 0 && (
              <div className="glass rounded-2xl p-10 text-center text-slate-400">
                No blogs yet — be the first fan to drop a hot take.
              </div>
            )}
            {blogs.map((b) => {
              const cs = comments[b.id] || [];
              const isOpen = openId === b.id;
              return (
                <motion.article
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-strong neon-border rounded-2xl p-6"
                >
                  <header className="mb-3 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#1e6bff] to-[#00e5ff] text-[#03081a]">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-cyan-200">{b.author_name}</div>
                      <div className="text-[11px] uppercase tracking-widest text-slate-500">{fmt(b.created_at)}</div>
                    </div>
                  </header>
                  <h3 className="font-display text-2xl text-white">{b.title}</h3>
                  <p className={`mt-2 text-sm text-slate-300 ${isOpen ? "" : "line-clamp-3"}`}>{b.content}</p>
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <button
                      onClick={() => like(b)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 px-3 py-1.5 text-pink-300 transition hover:bg-pink-500/25"
                    >
                      <Heart className="h-4 w-4" /> {b.likes}
                    </button>
                    <button
                      onClick={() => toggleOpen(b.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/15 px-3 py-1.5 text-cyan-200 transition hover:bg-cyan-400/25"
                    >
                      <MessageCircle className="h-4 w-4" /> {cs.length} comments
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-5 space-y-3 overflow-hidden border-t border-cyan-400/15 pt-4"
                      >
                        {cs.map((c) => (
                          <div key={c.id} className="rounded-lg bg-black/30 p-3">
                            <div className="flex items-center gap-2 text-xs text-cyan-200">
                              <span className="font-semibold">{c.author_name}</span>
                              <span className="text-slate-500">· {fmt(c.created_at)}</span>
                            </div>
                            <div className="mt-1 text-sm text-slate-200">{c.content}</div>
                          </div>
                        ))}
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            value={commentDraft[b.id]?.name || ""}
                            onChange={(e) =>
                              setCommentDraft((m) => ({ ...m, [b.id]: { ...(m[b.id] || { text: "" }), name: e.target.value } }))
                            }
                            placeholder="Your name"
                            className="sm:w-40 rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
                          />
                          <input
                            value={commentDraft[b.id]?.text || ""}
                            onChange={(e) =>
                              setCommentDraft((m) => ({ ...m, [b.id]: { ...(m[b.id] || { name: "" }), text: e.target.value } }))
                            }
                            placeholder="Reply..."
                            className="flex-1 rounded-lg border border-cyan-400/20 bg-black/30 px-3 py-2 text-sm outline-none focus:border-cyan-300"
                          />
                          <button
                            onClick={() => submitComment(b.id)}
                            className="inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#1e6bff] to-[#00e5ff] px-4 py-2 text-sm font-bold text-[#03081a]"
                          >
                            <Send className="h-4 w-4" /> Send
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}