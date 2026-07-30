import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/competition";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className={`category-card ${category.color}`}>
      <div className="category-top">
        <span>{category.number}</span>
        <ArrowUpRight size={21} />
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <Link href={`/competition#${category.slug}`}>View questions</Link>
    </article>
  );
}
