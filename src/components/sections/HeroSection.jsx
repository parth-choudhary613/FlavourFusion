import React from "react";
import Menu from "../../assets/Menu.png"
import {
  ArrowRight,
  MoveRight,
  Sparkles,
  Heart,
  Leaf,
  Smile,
  Sun,
  Cloud,
  IceCreamBowl,
  BadgeCheck,
} from "lucide-react";
import "./HeroSection.css";

export function HeroSection({ onExplore, velocity = 0 }) {
  return (
    <section className="relative w-screen h-screen flex-shrink-0 overflow-hidden select-none">

      {/* =====================================================
          DECORATIVE SKY ELEMENTS
      ===================================================== */}

      {/* Sun */}
      <div className="absolute top-[9%] right-[18%] opacity-80">
        <div className="relative">
          <Sun className="w-14 h-14 text-[#d1a473] animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg">☺</span>
          </div>
        </div>
      </div>

      {/* Clouds */}
      <Cloud
        className="absolute top-[15%] left-[7%] w-20 h-20 text-white/70 fill-white/50"
      />

      <Cloud
        className="absolute top-[11%] left-[28%] w-14 h-14 text-white/60 fill-white/40"
      />

      <Cloud
        className="absolute top-[18%] right-[6%] w-16 h-16 text-white/60 fill-white/40"
      />

      {/* Sparkles */}
      <Sparkles className="absolute top-[24%] left-[24%] w-7 h-7 text-[#d1a473] animate-pulse" />

      <Sparkles className="absolute top-[32%] right-[25%] w-5 h-5 text-[#decca9] animate-pulse" />

      <Sparkles className="absolute top-[12%] right-[38%] w-4 h-4 text-white animate-pulse" />

      <Heart
        className="absolute top-[36%] right-[28%] w-7 h-7 text-[#d282a6] fill-[#d282a6]/30 animate-[pulse_2s_infinite]"
      />

      {/* =====================================================
          HOT AIR BALLOONS
      ===================================================== */}

      <div
        className="absolute top-[7%] left-[15%] animate-[bounce_5s_ease-in-out_infinite]"
      >
        <div className="relative w-16 h-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-16 rounded-[50%] bg-gradient-to-b from-[#d282a6] to-[#e8b4bc] border-2 border-[#886351]/40 overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-2 bg-[#fff7df]/80" />
            <div className="absolute left-2 top-0 h-full w-2 bg-[#fff7df]/70" />
            <div className="absolute right-2 top-0 h-full w-2 bg-[#fff7df]/70" />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-4 bg-[#5c3a19] rounded-sm" />
        </div>
      </div>

      <div
        className="absolute top-[13%] right-[14%] scale-75 animate-[bounce_6s_ease-in-out_infinite]"
      >
        <div className="relative w-16 h-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-16 rounded-[50%] bg-gradient-to-b from-[#8ecae6] to-[#d1a473] border-2 border-[#886351]/30 overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-2 bg-white/70" />
            <div className="absolute left-2 top-0 h-full w-2 bg-white/60" />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-4 bg-[#5c3a19] rounded-sm" />
        </div>
      </div>

      {/* =====================================================
          MAIN HERO CONTENT
      ===================================================== */}

      <div
        className="relative z-20 w-full h-full flex items-center justify-center px-6 md:px-16"
      >
        <div
          className="relative w-full max-w-6xl flex flex-col items-center text-center md:items-center"
          style={{
            transform: `translate3d(${velocity * -1.5}px, 0, 0)`,
          }}
        >

          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full bg-[#fff7df]/80 border border-[#d1a473]/40 backdrop-blur-md shadow-sm">
            <IceCreamBowl className="w-4 h-4 text-[#886351]" />

            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#886351]">
              Premium Ice Cream Experience
            </span>

            <Sparkles className="w-3.5 h-3.5 text-[#d282a6]" />
          </div>

          {/* =================================================
              BRAND NAME
          ================================================= */}

          <div className="relative">

            {/* Small decorative hearts */}
            <Heart
              className="absolute -top-5 -left-10 w-7 h-7 text-[#d282a6] fill-[#d282a6]/20 rotate-[-20deg]"
            />

            <Heart
              className="absolute top-2 -right-10 w-5 h-5 text-[#e8b4bc] fill-[#e8b4bc]/20 rotate-[20deg]"
            />

          <h1 className="flavour-title">
  Flavour
</h1>

<h2 className="flavour-fusion">
  fusion

  <span className="absolute -right-7 bottom-2">
    <Heart
      className="w-5 h-5 text-[#5c3a19] fill-[#5c3a19]"
    />
  </span>
</h2>
          </div>

          {/* =================================================
              BRAND LINE
          ================================================= */}

       <div className="flex items-center justify-center gap-3 mt-12 mb-4">

  <span className="flavour-tagline-line hidden sm:block" />

  <p className="flavour-tagline">
    A Journey of Sweetness
  </p>

  <span className="flavour-tagline-line hidden sm:block" />

</div>

          {/* Description */}
          <p
            className="
              max-w-xl
              text-sm
              sm:text-base
              md:text-lg
              leading-relaxed
              font-medium
              text-[#886351]/80
            "
          >
            Crafted with love, made from the finest ingredients,
            and served with a smile. Let's create beautiful
            memories, one scoop at a time.
          </p>

          {/* =================================================
              CTA BUTTONS
          ================================================= */}

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-7">

            <button
              onClick={onExplore}
              className="
                group
                inline-flex
                items-center
                gap-3
                px-7
                py-3.5
                rounded-2xl
                bg-gradient-to-r
                from-[#8ecae6]
                via-[#8ecae6]
                to-[#d282a6]
                text-white
                font-bold
                text-sm
                shadow-lg
                shadow-[#d282a6]/20
                hover:scale-105
                hover:shadow-xl
                active:scale-95
                transition-all
                duration-300
              "
            >
              <span>Explore Flavours</span>

              <ArrowRight
                className="
                  w-4 h-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

            <button
              onClick={onExplore}
              className="
                group
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-2xl
                bg-[#fff7df]/80
                border
                border-[#d1a473]/50
                text-[#886351]
                font-semibold
                text-sm
                backdrop-blur-md
                hover:bg-white
                hover:scale-105
                transition-all
                duration-300
              "
            >
              <Heart className="w-4 h-4 text-[#d282a6] group-hover:fill-[#d282a6]" />

              <span>Our Story</span>
            </button>

          </div>

          {/* =================================================
              FEATURE HIGHLIGHTS
          ================================================= */}

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-8">

            {/* Premium */}
          <div
  className="
    flex flex-col items-center gap-2
    px-4 py-2.5
    rounded-xl
    bg-white/50
    border border-white/60
    backdrop-blur-sm
     h-24
         w-24
  "
>
  <div className="w-8 h-8 rounded-full bg-[#d1a473]/20 flex items-center justify-center">
    <IceCreamBowl className="w-12 h-12 text-[#886351]" />
  </div>

  <div className="text-center">
    <p className="text-[10px] uppercase tracking-wider text-[#886351]/60">
      Quality
    </p>
  </div>
</div>

            {/* Natural */}
            <div
              className="
                flex flex-col items-center gap-2
                px-4 py-2.5
                rounded-xl
                bg-white/50
                border border-white/60
                backdrop-blur-sm
                h-24
                w-24
              "
            >
              <div className="w-8 h-8 rounded-full bg-[#9abf88]/20 flex items-center justify-center">
                <Leaf className="w-12 h-12 text-[#6d9560]" />
              </div>

              <div className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#886351]/60">
                  Made Fresh
                </p>
              </div>
            </div>

            {/* Happiness */}
            <div
              className="
                flex items-center gap-2
                px-4 py-2.5
                rounded-2xl
                bg-white/50
                border border-white/60
                backdrop-blur-sm
              "
            >
              <div className="w-8 h-8 rounded-full bg-[#e8b4bc]/30 flex items-center justify-center">
                <Smile className="w-4 h-4 text-[#d282a6]" />
              </div>

              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-[#886351]/60">
                  Our Promise
                </p>

                <p className="text-xs font-bold text-[#5c3a19]">
                  Happiness Guaranteed
                </p>
              </div>
            </div>

          </div>

          {/* =================================================
              BOTTOM SCROLL HINT
          ================================================= */}

          <div
            className="
              flex items-center gap-3
              mt-60
              px-4 py-2.5
              rounded-full
              bg-white/40
              border border-white/50
              backdrop-blur-sm
            "
          >
         

          
          </div>

        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE CATEGORY SIGN
      ===================================================== */}

      <div
        className="
          absolute
          z-10
          right-[7%]
          bottom-[1%]
          hidden
          xl:flex
          flex-col
          gap-2
         
        "
      >

       <img src={Menu} alt="Fencing" className="w-50 h-120" />
       

      </div>

     

    </section>
  );
}

export default HeroSection;