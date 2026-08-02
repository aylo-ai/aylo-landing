const links = [
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Meta verified', href: '#meta-verified' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact us', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-brand-500 bg-[#0d0d11] py-14 text-center">
      <h3 className="text-xl font-extrabold">
        Aylo A<span className="text-brand-500">I</span>
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-white/50">
        Get started to up your business
        <br />
        with personal AI manager
      </p>

      <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {/*
              inline-block + py-4 gives the 12px label a 48px tap target;
              -my-4 removes that padding from the flow again so the row keeps
              its original 16px height and the footer looks unchanged.
            */}
            <a
              href={link.href}
              className="-my-4 inline-block py-4 text-xs text-white/40 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-white/25">
        © {new Date().getFullYear()} Aylo AI. All rights reserved.
      </p>
    </footer>
  )
}
