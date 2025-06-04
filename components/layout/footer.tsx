import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6" />
              <span className="font-bold text-xl">Pixisphere</span>
            </div>
            <p className="text-muted-foreground">
              Connecting talented photographers with clients looking for the perfect shot.
            </p>
            <div className="flex space-x-4 pt-2">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categories/wedding" className="text-muted-foreground hover:text-foreground">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link href="/categories/maternity" className="text-muted-foreground hover:text-foreground">
                  Maternity Photography
                </Link>
              </li>
              <li>
                <Link href="/categories/portrait" className="text-muted-foreground hover:text-foreground">
                  Portrait Photography
                </Link>
              </li>
              <li>
                <Link href="/categories/commercial" className="text-muted-foreground hover:text-foreground">
                  Commercial Photography
                </Link>
              </li>
              <li>
                <Link href="/categories/events" className="text-muted-foreground hover:text-foreground">
                  Event Photography
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Popular Cities</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/photographers?city=Bengaluru" className="text-muted-foreground hover:text-foreground">
                  Bengaluru
                </Link>
              </li>
              <li>
                <Link href="/photographers?city=Mumbai" className="text-muted-foreground hover:text-foreground">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/photographers?city=Delhi" className="text-muted-foreground hover:text-foreground">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/photographers?city=Chennai" className="text-muted-foreground hover:text-foreground">
                  Chennai
                </Link>
              </li>
              <li>
                <Link href="/photographers?city=Hyderabad" className="text-muted-foreground hover:text-foreground">
                  Hyderabad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground text-sm">
          <p>© 2025 Pixisphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}