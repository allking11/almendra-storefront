import { createContext, useContext, useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Minus,
  Plus,
  X,
  Heart,
  MagnifyingGlass,
  ShoppingBag,
  SealCheck,
  Sparkle,
  Scissors,
  Truck,
  InstagramLogo,
  WhatsappLogo,
  Check,
} from "@phosphor-icons/react";

import logoSeed from "../logo (1).PNG";
import logoPrimary from "../logo (2).PNG";
import logoFooter from "../logo (3).PNG";
import cowPrint from "../cow print.jpeg";
import carteraCow from "../cartera 2.jpeg";
import materaBlack from "../matera.jpeg";
import materaHandle from "../matera 2.jpeg";
import minimalBag from "../almendra cartera.jpeg";
import saleBag from "../sale.jpeg";
import modelExterior from "../foto con modelo exterior.jpeg";
import exteriorMate from "../fotos exteriores.jpeg";
import exteriorCow from "../fotos exteriores2.jpeg";
import exteriorLine from "../fotos exteriores3.jpeg";

// Generated banners for slideshow
import bannerMateraBlack from "../banner_matera_black.jpg";
import bannerCarteraCow from "../banner_cartera_cow.jpg";
import bannerMateraWood from "../banner_matera_wood.jpg";

// Generated assets
import procesoCorte from "../proceso_corte.jpg";
import procesoCostura from "../proceso_costura.jpg";
import procesoLogo from "../proceso_logo.jpg";
import fallbackBilleteraMujer from "../billetera_mujer.jpg";
import fringeBag from "../fringe_bag.jpg";
import carteraCrescent from "../cartera_crescent.jpg";
import mochilaOlivia from "../mochila_olivia.jpg";
import { catalogProducts } from "./assets/catalogoData";

const WHATSAPP_URL =
  "https://wa.me/59896909600?text=Hola%2C%20quiero%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20de%20Almendra.";

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [catalogFilter, setCatalogFilter] = useState("Todos");

  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = (productId) => {
    setFavorites(curr => 
      curr.includes(productId) ? curr.filter(id => id !== productId) : [...curr, productId]
    );
  };

  const addItem = (product, selectedVariation = "Único") => {
    const variations = product.variations || {};
    const imgList = variations[selectedVariation] || [];
    const variationImage = imgList[0] || product.image;
    
    const cartItemId = `${product.id}-${selectedVariation}`;
    const cartItemName = selectedVariation !== "Único"
      ? `${product.name} (${selectedVariation})`
      : product.name;

    setItems((current) => {
      const found = current.find((item) => item.id === cartItemId);
      if (found) {
        return current.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...current,
        {
          id: cartItemId,
          name: cartItemName,
          price: product.price,
          image: variationImage,
          quantity: 1,
        },
      ];
    });
    setOpen(true);
  };

  const increment = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const formatPrice = (value) => {
    return "$ " + new Intl.NumberFormat("es-UY").format(value);
  };

  const checkout = () => {
    if (!items.length) return;
    const lines = items
      .map((item) => `${item.quantity} x ${item.name} (${formatPrice(item.price)})`)
      .join("%0A");
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `Hola%2C%20quiero%20realizar%20un%20pedido%20de%20Almendra%3A%0A%0A${lines}%0A%0ATotal%3A%20${formatPrice(total)}%0A%0AMe%20gustar%C3%ADa%20coordinar%20el%20env%C3%ADo.`;
    window.location.href = `https://wa.me/59896909600?text=${message}`;
  };

  const value = useMemo(
    () => ({
      items,
      quantity,
      favorites,
      open,
      setOpen,
      addItem,
      increment,
      decrement,
      toggleFavorite,
      formatPrice,
      checkout,
      selectedProduct,
      setSelectedProduct,
      catalogFilter,
      setCatalogFilter,
    }),
    [items, open, quantity, favorites, selectedProduct, catalogFilter]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const { quantity, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 px-6 md:px-12 py-4 ${
        scrolled
          ? "bg-crema/90 border-b border-arena/30 shadow-md backdrop-blur-md"
          : "bg-gradient-to-b from-chocolate/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <img
            src={logoSeed}
            alt=""
            className={`h-7 w-7 object-contain transition-all duration-300 ${
              scrolled ? "invert" : "brightness-0 invert"
            }`}
          />
          <span
            className={`font-serif text-2xl tracking-widest font-semibold transition-colors duration-300 ${
              scrolled ? "text-chocolate" : "text-white"
            }`}
          >
            ALMENDRA
          </span>
        </a>

        {/* Navigation Links */}
        <nav
          className={`hidden items-center gap-9 text-xs font-semibold tracking-widest transition-colors duration-300 uppercase md:flex ${
            scrolled ? "text-chocolate/80" : "text-white/90"
          }`}
        >
          <a className="hover:text-cuero transition-colors" href="#coleccion">
            Colección
          </a>
          <a className="hover:text-cuero transition-colors" href="#nosotros">
            Nosotros
          </a>
          <a className="hover:text-cuero transition-colors" href="#proceso">
            Proceso
          </a>
          <a className="hover:text-cuero transition-colors" href="#contacto">
            Contacto
          </a>
          <a
            className="hover:text-cuero transition-colors"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </nav>

        {/* Right side controls */}
        <div
          className={`flex items-center gap-6 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
            scrolled ? "text-chocolate" : "text-white"
          }`}
        >
          <button
            className="hover:text-cuero transition-colors"
            aria-label="Buscar"
          >
            <MagnifyingGlass size={18} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hover:text-cuero transition-colors border-b border-current pb-0.5"
          >
            Carrito ({quantity})
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const slides = useMemo(() => [
    {
      image: bannerCarteraCow,
      title: "Cartera Cow",
      subtitle: "Diseño único y cuero seleccionado."
    },
    {
      image: bannerMateraBlack,
      title: "Matera Cartera",
      subtitle: "La combinación perfecta de estilo y tradición."
    },
    {
      image: bannerMateraWood,
      title: "Colección Almendra",
      subtitle: "Nuestra familia de productos artesanales hechos a mano."
    }
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-chocolate"
    >
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full w-full object-cover brightness-[0.8]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 pt-20">
        <Reveal className="max-w-2xl text-white">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight font-medium">
            Esenciales de cuero <br /> para todos los días.
          </h1>
          <p className="mt-8 text-sm md:text-base leading-relaxed text-white/80 max-w-lg tracking-wide font-light">
            Diseñadas para acompañarte en la rutina, <br /> hechas en cuero
            genuino y producidas <br /> artesanalmente en Uruguay.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#coleccion"
              className="inline-block bg-cuero text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-tierra transition-all duration-300 shadow-lg active:scale-95"
            >
              Explorar Colección
            </a>
            
            {/* Active slide indicator */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? "bg-white w-6" : "bg-white/40 w-1.5"
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedCollection() {
  const { toggleFavorite, favorites, formatPrice, setSelectedProduct } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const featured = useMemo(() => {
    const items = [];
    const ids = ["prod-cartera-cuero", "prod-matera-cartera", "prod-matera-auto", "prod-billetera-hombre"];
    ids.forEach(id => {
      const match = catalogProducts.find(p => p.id === id);
      if (match) items.push(match);
    });
    return items.length === 4 ? items : catalogProducts.slice(0, 4);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  return (
    <section id="coleccion" className="px-6 md:px-12 py-24 bg-crema">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr] items-start">
          {/* Section Copy */}
          <Reveal className="flex flex-col h-full justify-between py-2">
            <div>
              <p className="text-[10px] tracking-[0.25em] font-semibold text-tierra uppercase">
                Conocé nuestra colección
              </p>
              <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-chocolate font-medium">
                Diseños funcionales, <br /> materiales nobles, <br /> hechos
                para durar.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-chocolate/70 max-w-sm font-light">
                Carteras, materas, billeteras y accesorios de cuero genuino que
                se adaptan a tu rutina y elevan tu estilo todos los días.
              </p>
            </div>
            <div className="mt-10 lg:mt-20">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-chocolate hover:text-cuero transition-colors uppercase border-b border-chocolate pb-1"
              >
                Ver catálogo completo <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* Carousel */}
          <Reveal delay={0.1}>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
            >
              {featured.map((product) => {
                const firstVar = Object.keys(product.variations)[0];
                const cover = product.variations[firstVar][0];
                return (
                  <div
                    key={product.id}
                    className="min-w-full sm:min-w-[50%] md:min-w-0 snap-start snap-always group relative flex flex-col cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Image wrapper */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-arena/20 rounded-[4px] shadow-sm">
                      <img
                        src={cover}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Add to Cart Overlay */}
                      <div className="absolute inset-0 bg-chocolate/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <button
                          type="button"
                          className="bg-crema text-chocolate text-[10px] font-bold tracking-widest uppercase py-3 px-5 hover:bg-cuero hover:text-white transition-colors duration-300"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-chocolate">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-xs text-chocolate/60">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="text-chocolate/60 hover:text-tierra transition-colors p-1"
                        aria-label="Agregar a favoritos"
                      >
                        <Heart
                          size={16}
                          weight={favorites.includes(product.id) ? "fill" : "regular"}
                          className={favorites.includes(product.id) ? "text-cuero" : ""}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Dots */}
            <div className="flex md:hidden justify-center gap-2.5 mt-8">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "bg-cuero w-4" : "bg-arena"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Features row brown banner
function FeaturesRow() {
  const features = [
    { title: "Cuero Genuino", subtitle: "De alta calidad", icon: SealCheck },
    { title: "Diseño Atemporal", subtitle: "Y funcional", icon: Sparkle },
    { title: "Hecho a Mano", subtitle: "En Uruguay", icon: Scissors },
    { title: "Envíos a todo", subtitle: "el país", icon: Truck },
  ];

  return (
    <section className="bg-marron-banner text-crema py-10 px-6 md:px-12 border-t border-b border-crema/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 text-left">
                <Icon size={28} weight="light" className="text-arena/80" />
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[10px] tracking-widest text-arena/70 uppercase mt-0.5 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="nosotros" className="px-6 md:px-12 py-24 bg-[#F2EDE4] relative overflow-hidden">
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 items-center">
        {/* Left Side: Product Image */}
        <Reveal>
          <div className="relative max-w-md mx-auto lg:mx-0">
            <div className="aspect-[4/5] rounded-[4px] overflow-hidden shadow-md">
              <img
                src={carteraCow}
                alt="Almendra Cow print bag"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Right Side: Copy & Stylized Leaf Graphic */}
        <Reveal delay={0.15} className="relative z-10 flex flex-col justify-center">
          <p className="text-[10px] tracking-[0.25em] font-semibold text-tierra uppercase">
            Sobre Almendra
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-chocolate font-medium">
            Artesanía que se siente, <br /> diseño que te acompaña.
          </h2>
          <div className="mt-8 space-y-6 text-sm text-chocolate/85 font-light leading-relaxed max-w-lg">
            <p>
              Almendra nace desde lo simple pero bien hecho, poniendo en valor
              lo artesanal, el trabajo a mano y el tiempo real que hay detrás de
              cada pieza. Cada producto está diseñado para ser funcional, bello
              y duradero.
            </p>
            <p>
              Creemos en lo cotidiano, en lo real y en esos detalles que hacen
              la diferencia. Por eso creamos accesorios que no solo te
              acompañan, sino que también te representan.
            </p>
          </div>
          <div className="mt-10">
            <a
              href="#proceso"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-chocolate hover:text-cuero transition-colors uppercase border-b border-chocolate pb-1"
            >
              Conocé nuestra historia <ArrowRight size={14} />
            </a>
          </div>

          {/* Stylized Almond leaf SVG outline overlay on far right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-10 pointer-events-none z-0">
            <svg
              width="240"
              height="360"
              viewBox="0 0 100 150"
              fill="none"
              stroke="#5C3F33"
              strokeWidth="1.5"
            >
              <path d="M50,10 C15,50 15,100 50,140 C85,100 85,50 50,10 Z" />
              <path d="M50,10 C35,60 35,90 50,140" />
              <path d="M50,40 C65,60 70,80 50,100" />
              <path d="M50,60 C30,70 30,90 50,110" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EverydayBagPromo() {
  const { addItem } = useCart();
  const promoProduct = {
    id: "everyday-bag",
    name: "The Everyday Bag",
    price: 239000,
    image: fringeBag,
    description: "Cuero genuino. Interior reforzado. Hecho artesanalmente en Uruguay.",
  };

  return (
    <section className="px-6 md:px-12 py-24 bg-crema">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.4fr_0.6fr] items-center">
        {/* Left Info */}
        <Reveal className="py-6">
          <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none text-chocolate tracking-wide uppercase font-medium">
            THE EVERYDAY BAG
          </h2>
          <p className="mt-6 text-sm text-tierra font-semibold uppercase tracking-wider">
            Cuero genuino. Interior reforzado. <br /> Hecho artesanalmente en Uruguay.
          </p>
          <p className="mt-6 font-serif text-3xl font-medium text-chocolate">
            $ 239.000
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => addItem(promoProduct)}
              className="bg-cuero text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#200E08] transition-colors"
            >
              Comprar Ahora
            </button>
          </div>
        </Reveal>

        {/* Right Image */}
        <Reveal delay={0.12}>
          <div className="rounded-[4px] overflow-hidden shadow-lg aspect-[16/10] max-h-[460px]">
            <img
              src={fringeBag}
              alt="Person wearing black fringe bag"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryExplore() {
  const { setCatalogFilter } = useCart();

  const categoriesList = useMemo(() => [
    { name: "Carteras", displayName: "Carteras" },
    { name: "Materas", displayName: "Materas" },
    { name: "Materas Auto", displayName: "Materas Auto" },
    { name: "Billeteras Hombre", displayName: "Billeteras Hombre" },
    { name: "Billeteras Mujer", displayName: "Billeteras Mujer" },
    { name: "Bolso Mano Hombre", displayName: "Bolsos de Mano" }
  ], []);

  const getCategoryCover = (categoryName) => {
    const prod = catalogProducts.find(p => p.category === categoryName);
    if (prod) {
      const firstVar = Object.keys(prod.variations)[0];
      return prod.variations[firstVar][0];
    }
    return fallbackBilleteraMujer;
  };

  const handleCategoryClick = (categoryName) => {
    setCatalogFilter(categoryName);
    const element = document.getElementById("catalogo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="px-6 md:px-12 py-24 bg-[#EADECF]/20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between border-b border-chocolate/10 pb-6 mb-12">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium text-chocolate uppercase tracking-wider">
            Explorá por categoría
          </h2>
          <button
            type="button"
            onClick={() => handleCategoryClick("Todos")}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest text-chocolate hover:text-cuero transition-colors uppercase border-b border-chocolate pb-1"
          >
            Ver todos los productos <ArrowRight size={14} />
          </button>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {categoriesList.map((cat, idx) => (
            <Reveal key={idx} delay={idx * 0.05} className="group">
              <button
                type="button"
                onClick={() => handleCategoryClick(cat.name)}
                className="w-full flex flex-col items-center text-left"
              >
                {/* Image */}
                <div className="w-full aspect-[3/4] overflow-hidden rounded-[4px] bg-arena/20 shadow-sm mb-4">
                  <img
                    src={getCategoryCover(cat.name)}
                    alt={cat.displayName}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* Label */}
                <h3 className="text-xs font-bold text-chocolate tracking-wider text-center group-hover:text-cuero transition-colors uppercase max-w-[130px] mx-auto">
                  {cat.displayName}
                </h3>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="proceso" className="px-6 md:px-12 py-24 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.35fr_0.65fr] items-start">
        {/* Copy */}
        <Reveal className="py-2">
          <p className="text-[10px] tracking-[0.25em] font-semibold text-tierra uppercase">
            Hecho con tiempo, hecho para vos
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] text-chocolate font-medium">
            El proceso <br /> que nos define.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-chocolate/70 font-light max-w-xs">
            Desde la selección del cuero hasta el último detalle, cada paso es
            hecho a mano en nuestro taller. Diseñamos, cortamos, cosemos y
            terminamos cada pieza con dedicación y orgullo por lo que hacemos.
          </p>
          <div className="mt-10">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-chocolate hover:text-cuero transition-colors uppercase border-b border-chocolate pb-1"
            >
              Ver el proceso completo <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>

        {/* 3 Images */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] shadow-sm">
              <img
                src={procesoCorte}
                alt="Cutting leather process"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] shadow-sm">
              <img
                src={procesoCostura}
                alt="Sewing leather process"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[4px] shadow-sm">
              <img
                src={procesoLogo}
                alt="Embossed logo process"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramSection() {
  const feedImages = [
    exteriorLine,
    carteraCrescent,
    mochilaOlivia,
    modelExterior,
  ];

  return (
    <section className="px-6 md:px-12 py-24 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.3fr_0.7fr] items-center">
        {/* Copy */}
        <Reveal>
          <p className="text-[10px] tracking-[0.25em] font-semibold text-tierra uppercase">
            Seguinos en Instagram
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.15] text-chocolate font-medium">
            Inspiración diaria, <br /> diseño real.
          </h2>
          <p className="mt-4 text-sm text-chocolate/60 font-light">
            Unite a nuestra comunidad.
          </p>
          <div className="mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-chocolate hover:text-cuero transition-colors uppercase border-b border-chocolate pb-1"
            >
              @ALMENDRA.BAGS <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>

        {/* Feed Images */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {feedImages.map((img, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] overflow-hidden rounded-[4px] shadow-sm group relative"
              >
                <img
                  src={img}
                  alt="Almendra instagram post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-chocolate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <InstagramLogo size={24} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contacto" className="bg-[#FAF7F2] py-24 px-6 md:px-12 border-t border-chocolate/5">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] text-chocolate font-medium uppercase tracking-wider">
            Consultas
          </h2>
          <p className="mt-4 text-sm text-chocolate/60 font-light">
            Escribinos para presupuestos a medida, consultas sobre stock o detalles de envío.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block text-xs font-bold tracking-widest text-chocolate uppercase mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#EADECF]/10 border border-chocolate/20 rounded-[4px] px-4 py-3 text-sm text-chocolate outline-none focus:border-cuero transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold tracking-widest text-chocolate uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#EADECF]/10 border border-chocolate/20 rounded-[4px] px-4 py-3 text-sm text-chocolate outline-none focus:border-cuero transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold tracking-widest text-chocolate uppercase mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-[#EADECF]/10 border border-chocolate/20 rounded-[4px] px-4 py-3 text-sm text-chocolate outline-none focus:border-cuero transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cuero text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-tierra transition-colors active:scale-95 duration-200"
            >
              {submitted ? "Enviado con éxito" : "Enviar consulta"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail("");
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  return (
    <section className="bg-marron-banner text-crema px-6 md:px-12 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[0.55fr_0.3fr_0.15fr] items-center">
        {/* Left */}
        <Reveal>
          <h2 className="font-serif text-2xl md:text-3xl tracking-widest font-medium uppercase">
            ENTERATE ANTES QUE NADIE
          </h2>
          <p className="mt-3 text-xs md:text-sm text-arena/80 tracking-wide font-light">
            Suscribite y recibí lanzamientos, novedades y beneficios exclusivos.
          </p>
        </Reveal>

        {/* Input Form */}
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex items-center border-b border-crema/40 py-2">
            <input
              type="email"
              placeholder={success ? "¡Gracias por suscribirte!" : "TU EMAIL"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={success}
              className="bg-transparent border-none text-xs tracking-widest placeholder-crema/50 text-crema outline-none w-full uppercase"
            />
            <button type="submit" className="text-crema/80 hover:text-white transition-colors px-2">
              <ArrowRight size={18} />
            </button>
          </form>
        </Reveal>

        {/* Right side Detail Image */}
        <Reveal delay={0.15} className="hidden lg:block">
          <div className="aspect-[4/3] rounded-[4px] overflow-hidden shadow-md max-w-[140px]">
            <img
              src={minimalBag}
              alt="Detail leather product"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CatalogSection() {
  const { formatPrice, setSelectedProduct, catalogFilter, setCatalogFilter } = useCart();
  
  const tabs = useMemo(() => ["Todos", "Carteras", "Materas", "Materas Auto", "Billeteras Hombre", "Billeteras Mujer", "Bolso Mano Hombre"], []);
  
  const filteredProducts = useMemo(() => {
    if (catalogFilter === "Todos") return catalogProducts;
    return catalogProducts.filter(p => p.category === catalogFilter);
  }, [catalogFilter]);

  return (
    <section id="catalogo" className="px-6 md:px-12 py-24 bg-crema border-t border-arena/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[10px] tracking-[0.25em] font-semibold text-tierra uppercase">Nuestro Catálogo completo</p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,3.5vw,2.75rem)] text-chocolate font-medium uppercase tracking-wider">Productos Almendra</h2>
          <div className="h-[1px] w-12 bg-cuero/30 mx-auto mt-6" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setCatalogFilter(tab)}
              className={`px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 rounded-[2px] border ${
                catalogFilter === tab
                  ? "bg-cuero text-white border-cuero"
                  : "bg-transparent text-chocolate/70 border-chocolate/10 hover:border-chocolate/30 hover:text-chocolate"
              }`}
            >
              {tab === "Bolso Mano Hombre" ? "Bolsos de Mano" : tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const firstVarName = Object.keys(product.variations)[0];
            const coverImage = product.variations[firstVarName][0];
            const totalVars = Object.keys(product.variations).length;

            return (
              <article
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer bg-white border border-arena/20 rounded-[4px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image wrapper */}
                <div className="relative aspect-[4/5] bg-arena/5 overflow-hidden">
                  <img
                    src={coverImage}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {totalVars > 1 && (
                    <div className="absolute top-4 left-4 bg-chocolate/85 text-crema text-[9px] font-bold tracking-widest uppercase py-1 px-2.5 rounded-[2px]">
                      {totalVars} colores
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-tierra/60">{product.category}</span>
                    <h3 className="font-serif text-xl text-chocolate mt-2 font-medium group-hover:text-cuero transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-2.5 text-xs text-chocolate/60 leading-relaxed font-light line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-arena/10 flex items-center justify-between">
                    <span className="font-serif text-lg font-semibold text-cuero">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-chocolate border-b border-chocolate/30 pb-0.5 group-hover:border-cuero group-hover:text-cuero transition-all">
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addItem, formatPrice } = useCart();
  const [selectedVar, setSelectedVar] = useState("");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    if (selectedProduct) {
      const vars = Object.keys(selectedProduct.variations);
      setSelectedVar(vars[0]);
      setActivePhotoIdx(0);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const variations = Object.keys(selectedProduct.variations);
  const currentPhotos = selectedProduct.variations[selectedVar] || [];
  const currentCover = currentPhotos[activePhotoIdx] || currentPhotos[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-chocolate/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="relative z-10 w-full max-w-4xl bg-crema shadow-2xl rounded-[4px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] max-h-[90vh] lg:max-h-[85vh] lg:h-[80vh] overflow-y-auto lg:overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 border border-chocolate/10 text-chocolate hover:bg-white transition-colors"
            aria-label="Cerrar vista rápida"
          >
            <X size={18} />
          </button>

          {/* Left Side: Photo Gallery */}
          <div className="p-6 lg:p-10 flex flex-col justify-start bg-arena/5 lg:overflow-y-auto lg:max-h-full">
            <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-white border border-arena/20 shadow-xs relative">
              <img
                src={currentCover}
                alt={`${selectedProduct.name} - ${selectedVar}`}
                className="h-full w-full object-cover transition-all duration-300"
              />
              {currentPhotos.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-chocolate/85 text-crema text-[10px] font-bold py-1 px-3 rounded-[2px]">
                  {activePhotoIdx + 1} / {currentPhotos.length}
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {currentPhotos.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
                {currentPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`h-16 w-14 flex-shrink-0 rounded-[2px] overflow-hidden border transition-all ${
                      idx === activePhotoIdx
                        ? "border-cuero ring-2 ring-cuero/20"
                        : "border-arena/30 hover:border-arena"
                    }`}
                  >
                    <img src={photo} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="p-6 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-arena/20 lg:overflow-y-auto lg:max-h-full">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-tierra uppercase">
                {selectedProduct.category}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-chocolate mt-3 font-medium leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-chocolate/70 font-light">
                {selectedProduct.description}
              </p>

              <div className="h-[1px] w-full bg-arena/20 my-6" />

              {/* Variations selector */}
              {variations.length > 0 && variations[0] !== "Único" && (
                <div className="space-y-3">
                  <span className="block text-xs font-bold tracking-widest text-chocolate uppercase">
                    Color / Variación: <span className="text-cuero font-semibold">{selectedVar}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {variations.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => {
                          setSelectedVar(v);
                          setActivePhotoIdx(0);
                        }}
                        className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all rounded-[2px] border ${
                          selectedVar === v
                            ? "bg-cuero text-white border-cuero"
                            : "bg-white text-chocolate/80 border-arena/40 hover:border-arena"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Cart Actions */}
            <div className="mt-8 pt-6 border-t border-arena/20">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-chocolate/50 uppercase">Precio</span>
                <span className="font-serif text-3xl font-semibold text-cuero">
                  {formatPrice(selectedProduct.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  addItem(selectedProduct, selectedVar);
                  setSelectedProduct(null);
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-cuero text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-chocolate transition-colors"
              >
                Sumar al pedido <ShoppingBag size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-crema border-t border-arena/30 px-6 md:px-12 py-16 text-chocolate">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left: Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <img src={logoSeed} alt="" className="h-6 w-6 object-contain invert" />
          <span className="font-serif text-lg tracking-widest font-semibold uppercase">
            ALMENDRA
          </span>
        </a>

        {/* Center: Nav links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] font-bold tracking-widest uppercase text-chocolate/80">
          <a className="hover:text-cuero transition-colors" href="#coleccion">
            Colección
          </a>
          <a className="hover:text-cuero transition-colors" href="#nosotros">
            Nosotros
          </a>
          <a className="hover:text-cuero transition-colors" href="#proceso">
            Proceso
          </a>
          <a className="hover:text-cuero transition-colors" href="#contacto">
            Contacto
          </a>
          <a
            className="hover:text-cuero transition-colors"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>

        {/* Right: Copyright */}
        <span className="text-[10px] tracking-widest uppercase font-semibold text-chocolate/50">
          © ALMENDRA 2026
        </span>
      </div>
    </footer>
  );
}

function CartDrawer() {
  const {
    items,
    open,
    setOpen,
    increment,
    decrement,
    formatPrice,
    checkout,
  } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-chocolate/45 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-[440px] bg-crema shadow-2xl flex flex-col justify-between"
            aria-label="Pedido"
          >
            {/* Top Bar */}
            <div className="p-6 border-b border-arena/30 flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-widest font-bold uppercase text-tierra">
                  Almendra
                </p>
                <h2 className="font-serif text-3xl text-chocolate font-medium">
                  Tu pedido
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-chocolate/10 hover:bg-[#FAF7F2] transition-colors"
                aria-label="Cerrar pedido"
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {!items.length ? (
                <div className="text-center py-16 text-chocolate/50">
                  <ShoppingBag size={48} className="mx-auto text-arena mb-4" />
                  <p className="font-serif text-2xl text-chocolate font-light">
                    Tu pedido está vacío
                  </p>
                  <p className="text-xs leading-relaxed mt-2 max-w-xs mx-auto">
                    Sumá productos de nuestra colección y coordiná la entrega por WhatsApp.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-4 p-4 border border-arena/20 bg-white shadow-xs rounded-[4px]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-16 object-cover rounded-[2px]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-chocolate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-chocolate/60 mt-0.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => decrement(item.id)}
                            className="h-7 w-7 flex items-center justify-center rounded-full border border-arena text-chocolate hover:bg-[#FAF7F2]"
                            aria-label="Restar unidad"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-semibold text-chocolate">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(item.id)}
                            className="h-7 w-7 flex items-center justify-center rounded-full border border-arena text-chocolate hover:bg-[#FAF7F2]"
                            aria-label="Sumar unidad"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Bottom summary & Checkout */}
            <div className="p-6 border-t border-arena/30 bg-[#EADECF]/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold tracking-widest text-chocolate/70 uppercase">
                <span>Resumen del pedido</span>
                <span>{items.length} modelos</span>
              </div>
              <div className="flex items-baseline justify-between py-1">
                <p className="font-serif text-3xl font-medium text-chocolate">
                  Total
                </p>
                <span className="font-serif text-3xl font-semibold text-cuero">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-chocolate/50 font-light">
                El precio se confirma según disponibilidad, color final y método de envío.
              </p>

              <button
                type="button"
                onClick={checkout}
                disabled={!items.length}
                className="w-full flex items-center justify-center gap-2.5 bg-cuero text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#23120B] transition-colors disabled:opacity-45 disabled:cursor-not-allowed"
              >
                Finalizar Pedido <WhatsappLogo size={18} weight="fill" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-crema text-chocolate">
      <Header />
      <main>
        <Hero />
        <FeaturedCollection />
        <FeaturesRow />
        <AboutSection />
        <EverydayBagPromo />
        <CategoryExplore />
        <CatalogSection />
        <ProcessSection />
        <InstagramSection />
        <ContactForm />
      </main>
      <NewsletterBanner />
      <Footer />
      <CartDrawer />
      <ProductDetailModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
