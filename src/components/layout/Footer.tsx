import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-12">
            <div className="container px-4 md:px-8 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            AtreusPhysio
                        </span>
                        <p className="text-sm text-slate-500">
                            Recover Faster. Move Better. Live Stronger.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/careers">Careers</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/sports-rehab">Sports Rehab</Link></li>
                            <li><Link href="/orthopedic">Orthopedic</Link></li>
                            <li><Link href="/geriatric">Geriatric Care</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} AtreusPhysio. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
