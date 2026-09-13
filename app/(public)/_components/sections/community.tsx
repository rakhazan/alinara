import Image from "next/image";
import Link from "next/link";

export type CommunityPost = { id: string; image: string; alt: string; caption: string; href?: string };

export default function Community({ posts }: { posts: CommunityPost[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="community-heading" className="bg-surface px-4 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-10">
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-8 text-center lg:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">#AlinaraMuse</p>
          <h2 id="community-heading" className="font-display text-3xl text-primary lg:text-4xl">Cerita Gaya Komunitas</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-on-surface-variant">Ruang inspirasi untuk gaya Anda. Bagikan momen bersama Alinara dengan #AlinaraMuse.</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
          {posts.map((post) => {
            const content = <figure className="group relative aspect-square overflow-hidden rounded-xl bg-surface-container-high">
              <Image src={post.image} alt={post.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent px-4 pb-4 pt-12 text-xs text-on-primary lg:text-sm">{post.caption}</figcaption>
            </figure>;
            return <li key={post.id}>{post.href ? <Link href={post.href} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{content}</Link> : content}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
