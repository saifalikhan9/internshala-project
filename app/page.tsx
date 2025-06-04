import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Wedding",
    description:
      "Capture your special day with our talented wedding photographers",
    image:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/photographers?tags=Wedding",
  },
  {
    title: "Maternity",
    description: "Beautiful photography to celebrate your pregnancy journey",
    image: "https://images.pexels.com/photos/590496/pexels-photo-590496.jpeg",
    link: "/photographers?tags=Maternity",
  },
  {
    title: "Family",
    description: "Preserve precious moments with your loved ones",
    image:
      "https://images.pexels.com/photos/3807736/pexels-photo-3807736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/photographers?tags=Family",
  },
  {
    title: "Portrait",
    description: "Professional portraits that showcase your personality",
    image:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/photographers?tags=Portrait",
  },
];

export default function Home() {
  return (
    <div className="bg-background ">
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Photography Categories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our range of photography categories and find the perfect
              photographer for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="aspect-square relative overflow-hidden rounded-lg group">
                  <Image
                    src={category.image}
                    alt={`Image representing ${category.title} photography`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/50" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-white/80 mb-4 text-sm">
                      {category.description}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <Link href={category.link}>
                        Explore {category.title}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/30  transition-opacity duration-300 group-hover:bg-black/50" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {category.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className=" opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <Link href={category.link}>
                      Explore {category.title}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
