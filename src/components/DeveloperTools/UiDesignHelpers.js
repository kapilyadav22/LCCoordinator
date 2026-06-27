import React, { useState, useEffect } from "react";
import CustomButton from "../../layout/CustomButton";

// Helper conversions
const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
};

const rgbToHex = (r, g, b) => {
  const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));
  return "#" + ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1);
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4))
  };
};

const hslToHex = (h, s, l) => {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

const getLuminance = ({ r, g, b }) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (color1, color2) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  return ((l1 + 0.05) / (l2 + 0.05)).toFixed(2);
};

// CSS to Tailwind Compiler Logic
const translateCssToTailwind = (cssText) => {
  if (!cssText) return "";
  const cleanCss = cssText.replace(/\/\*[\s\S]*?\*\//g, "");
  const declarations = cleanCss.split(";");
  const translated = [];

  declarations.forEach((decl) => {
    const parts = decl.split(":");
    if (parts.length < 2) return;
    const property = parts[0].trim().toLowerCase();
    const value = parts[1].trim().toLowerCase();

    switch (property) {
      case "padding": {
        const val = parseFloat(value);
        if (value.includes("px")) {
          translated.push(`p-${Math.max(0, Math.round(val / 4))}`);
        } else if (value.includes("rem")) {
          translated.push(`p-${Math.max(0, Math.round(val * 4))}`);
        }
        break;
      }
      case "padding-left":
      case "padding-right": {
        const val = parseFloat(value);
        const suffix = property.endsWith("left") ? "l" : "r";
        const rem = value.includes("px") ? val / 16 : val;
        translated.push(`p${suffix}-${Math.max(0, Math.round(rem * 4))}`);
        break;
      }
      case "padding-top":
      case "padding-bottom": {
        const val = parseFloat(value);
        const suffix = property.endsWith("top") ? "t" : "b";
        const rem = value.includes("px") ? val / 16 : val;
        translated.push(`p${suffix}-${Math.max(0, Math.round(rem * 4))}`);
        break;
      }
      case "margin": {
        const val = parseFloat(value);
        const rem = value.includes("px") ? val / 16 : val;
        translated.push(`m-${Math.max(0, Math.round(rem * 4))}`);
        break;
      }
      case "background-color": {
        if (value === "transparent") {
          translated.push("bg-transparent");
        } else if (value === "#ffffff" || value === "#fff") {
          translated.push("bg-white");
        } else if (value === "#000000" || value === "#000") {
          translated.push("bg-black");
        } else if (value.startsWith("#")) {
          translated.push(`bg-[${value}]`);
        } else if (value.startsWith("rgba")) {
          translated.push(`bg-[${value}]`);
        }
        break;
      }
      case "color": {
        if (value === "#ffffff" || value === "#fff") {
          translated.push("text-white");
        } else if (value === "#000000" || value === "#000") {
          translated.push("text-black");
        } else if (value.startsWith("#")) {
          translated.push(`text-[${value}]`);
        }
        break;
      }
      case "font-weight": {
        if (value === "bold" || parseInt(value, 10) >= 700) translated.push("font-bold");
        else if (value === "medium" || parseInt(value, 10) >= 500) translated.push("font-medium");
        else if (value === "normal" || parseInt(value, 10) >= 400) translated.push("font-normal");
        else if (value === "light" || parseInt(value, 10) >= 300) translated.push("font-light");
        break;
      }
      case "font-size": {
        const val = parseFloat(value);
        if (value.includes("px")) {
          if (val <= 12) translated.push("text-xs");
          else if (val <= 14) translated.push("text-sm");
          else if (val <= 16) translated.push("text-base");
          else if (val <= 18) translated.push("text-lg");
          else if (val <= 20) translated.push("text-xl");
          else if (val <= 24) translated.push("text-2xl");
          else translated.push("text-3xl");
        } else if (value.includes("rem")) {
          if (val <= 0.75) translated.push("text-xs");
          else if (val <= 0.875) translated.push("text-sm");
          else if (val <= 1) translated.push("text-base");
          else if (val <= 1.125) translated.push("text-lg");
          else if (val <= 1.25) translated.push("text-xl");
          else if (val <= 1.5) translated.push("text-2xl");
          else translated.push("text-3xl");
        }
        break;
      }
      case "border-radius": {
        const val = parseFloat(value);
        if (value.includes("%") && val >= 50) {
          translated.push("rounded-full");
        } else if (value.includes("px")) {
          if (val <= 0) translated.push("rounded-none");
          else if (val <= 4) translated.push("rounded-sm");
          else if (val <= 6) translated.push("rounded");
          else if (val <= 8) translated.push("rounded-lg");
          else if (val <= 12) translated.push("rounded-xl");
          else if (val <= 16) translated.push("rounded-2xl");
          else if (val <= 24) translated.push("rounded-3xl");
          else translated.push("rounded-full");
        }
        break;
      }
      case "text-align": {
        if (["left", "center", "right", "justify"].includes(value)) {
          translated.push(`text-${value}`);
        }
        break;
      }
      case "display": {
        if (["block", "flex", "grid", "inline-block", "none"].includes(value)) {
          if (value === "none") translated.push("hidden");
          else translated.push(value);
        }
        break;
      }
      case "flex-direction": {
        if (value === "column") translated.push("flex-col");
        else if (value === "row") translated.push("flex-row");
        break;
      }
      case "align-items": {
        if (["stretch", "center", "flex-start", "flex-end"].includes(value)) {
          const valMap = { "flex-start": "start", "flex-end": "end" };
          translated.push(`items-${valMap[value] || value}`);
        }
        break;
      }
      case "justify-content": {
        if (["center", "flex-start", "flex-end", "space-between", "space-around"].includes(value)) {
          const valMap = { "flex-start": "start", "flex-end": "end", "space-between": "between", "space-around": "around" };
          translated.push(`justify-${valMap[value] || value}`);
        }
        break;
      }
      default:
        break;
    }
  });

  return translated.length > 0
    ? translated.join(" ")
    : "No direct matching classes found. Enter simple rules like 'padding: 16px; border-radius: 8px;'";
};

// Curated Google Fonts Pairings
const fontPairings = [
  {
    id: "outfit-inter",
    name: "Outfit (Headings) & Inter (Body)",
    heading: "Outfit",
    body: "Inter",
    headingLink: "Outfit:wght@400;700;800",
    bodyLink: "Inter:wght@400;500;600"
  },
  {
    id: "playfair-source",
    name: "Playfair Display (Headings) & Source Sans 3 (Body)",
    heading: "Playfair Display",
    body: "Source Sans 3",
    headingLink: "Playfair+Display:wght@400;700",
    bodyLink: "Source+Sans+3:wght@400;600"
  },
  {
    id: "poppins-lato",
    name: "Poppins (Headings) & Lato (Body)",
    heading: "Poppins",
    body: "Lato",
    headingLink: "Poppins:wght@400;700;800",
    bodyLink: "Lato:wght@400;700"
  },
  {
    id: "montserrat-hind",
    name: "Montserrat (Headings) & Hind (Body)",
    heading: "Montserrat",
    body: "Hind",
    headingLink: "Montserrat:wght@400;700;800",
    bodyLink: "Hind:wght@400;600"
  },
  {
    id: "roboto-mono-roboto",
    name: "Roboto Mono (Headings) & Roboto (Body)",
    heading: "Roboto Mono",
    body: "Roboto",
    headingLink: "Roboto+Mono:wght@400;700",
    bodyLink: "Roboto:wght@400;500;700"
  }
];

const UiDesignHelpers = () => {
  const [subTab, setSubTab] = useState("color"); // color, css, tailwind, fonts
  const [cssBuilderMode, setCssBuilderMode] = useState("shadow"); // shadow, glass, blob

  // Color state
  const [colorInput, setColorInput] = useState("#0891b2");
  const [rgbVal, setRgbVal] = useState("rgb(8, 145, 178)");
  const [hslVal, setHslVal] = useState("hsl(192, 91%, 36%)");
  const [colorHarmonies, setColorHarmonies] = useState({ complementary: "", analogous: [], triadic: [], mono: [] });
  const [copiedColorText, setCopiedColorText] = useState("");

  // Contrast checker state
  const [textColor, setTextColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#fafafa");
  const [contrastRatio, setContrastRatio] = useState("21.00");

  // Box Shadow states
  const [hOffset, setHOffset] = useState(0);
  const [vOffset, setVOffset] = useState(8);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(-4);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOpacity, setShadowOpacity] = useState(15);

  // Gradient Builder states
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState("#0891b2");
  const [gradColor2, setGradColor2] = useState("#fbbf24");

  // Glassmorphism states
  const [glassBlur, setGlassBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(20);
  const [glassBorderOpacity, setGlassBorderOpacity] = useState(10);
  const [glassBgColor, setGlassBgColor] = useState("#ffffff");
  const [glassBorderColor, setGlassBorderColor] = useState("#ffffff");

  // Organic Blob states
  const [blobTl, setBlobTl] = useState(30);
  const [blobTr, setBlobTr] = useState(70);
  const [blobBr, setBlobBr] = useState(70);
  const [blobBl, setBlobBl] = useState(30);

  const [copiedCss, setCopiedCss] = useState(false);

  // Tailwind Class Translator configurator states
  const [twPaddingX, setTwPaddingX] = useState("px-6");
  const [twPaddingY, setTwPaddingY] = useState("py-4");
  const [twMarginX, setTwMarginX] = useState("mx-0");
  const [twMarginY, setTwMarginY] = useState("my-0");
  const [twBorderWidth, setTwBorderWidth] = useState("border");
  const [twBorderStyle, setTwBorderStyle] = useState("border-solid");
  const [twBorderColor, setTwBorderColor] = useState("border-white/10");
  const [twBorderRadius, setTwBorderRadius] = useState("rounded-2xl");
  const [twDisplay, setTwDisplay] = useState("flex");
  const [twFlexDir, setTwFlexDir] = useState("flex-col");
  const [twAlignItems, setTwAlignItems] = useState("items-center");
  const [twJustifyContent, setTwJustifyContent] = useState("justify-center");
  const [twTextSize, setTwTextSize] = useState("text-base");
  const [twTextWeight, setTwTextWeight] = useState("font-normal");
  const [twTextColor, setTwTextColor] = useState("text-text-primary");
  const [twTextAlign, setTwTextAlign] = useState("text-center");
  const [twBgColor, setTwBgColor] = useState("bg-black/20");
  const [twShadow, setTwShadow] = useState("shadow-lg");
  const [twOpacity, setTwOpacity] = useState("opacity-100");

  // Raw CSS to Tailwind states
  const [cssToTranslate, setCssToTranslate] = useState(
    "padding: 16px;\nbackground-color: #3b82f6;\nborder-radius: 12px;\nfont-weight: bold;\ntext-align: center;"
  );
  const [translatedTwClasses, setTranslatedTwClasses] = useState("");
  const [copiedTranslatedTw, setCopiedTranslatedTw] = useState(false);

  // Google Fonts states
  const [activePairingIndex, setActivePairingIndex] = useState(0);
  const [fontTitleSize, setFontTitleSize] = useState(2.5); // rem
  const [fontBodySize, setFontBodySize] = useState(1); // rem
  const [fontTitleWeight, setFontTitleWeight] = useState(700);
  const [fontBodyWeight, setFontBodyWeight] = useState(400);
  const [fontLineHeight, setFontLineHeight] = useState(1.6);
  const [sandboxTitleText, setSandboxTitleText] = useState("Craft Stunning User Interfaces");
  const [sandboxBodyText, setSandboxBodyText] = useState(
    "Design and preview content in real-time. Pick typography pairings that boost readability and give a premium feel to your applications."
  );
  const [copiedFontImport, setCopiedFontImport] = useState(false);

  // Sync Color Harmonies
  useEffect(() => {
    const rgb = hexToRgb(colorInput);
    if (rgb) {
      setRgbVal(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslVal(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);

      const comp = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
      const ana1 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
      const ana2 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
      const tri1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
      const tri2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
      const mono1 = hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20));
      const mono2 = hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 10));
      const mono3 = hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 10));
      const mono4 = hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 20));

      setColorHarmonies({
        complementary: comp,
        analogous: [ana1, ana2],
        triadic: [tri1, tri2],
        mono: [mono1, mono2, colorInput, mono3, mono4]
      });
    } else {
      setRgbVal("Invalid Color");
      setHslVal("Invalid Color");
    }
  }, [colorInput]);

  // Sync WCAG Contrast
  useEffect(() => {
    const ratio = getContrastRatio(textColor, bgColor);
    setContrastRatio(ratio);
  }, [textColor, bgColor]);

  // Translate Raw CSS to Tailwind
  useEffect(() => {
    setTranslatedTwClasses(translateCssToTailwind(cssToTranslate));
  }, [cssToTranslate]);

  // Inject Google Fonts dynamic links into the HTML head
  useEffect(() => {
    if (subTab !== "fonts") return;
    const pairing = fontPairings[activePairingIndex];
    const linkId = "dynamic-google-fonts";

    const existingLink = document.getElementById(linkId);
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${pairing.headingLink}&family=${pairing.bodyLink}&display=swap`;
    document.head.appendChild(link);

    return () => {
      const cleanLink = document.getElementById(linkId);
      if (cleanLink) cleanLink.remove();
    };
  }, [subTab, activePairingIndex]);

  const copyText = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const copyHarmonyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColorText(hex);
    setTimeout(() => setCopiedColorText(""), 2000);
  };

  const getShadowCssString = () => {
    const rgb = hexToRgb(shadowColor) || { r: 0, g: 0, b: 0 };
    return `box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${shadowOpacity / 100});`;
  };

  const getGradientCssString = () => {
    return `background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});`;
  };

  const getGlassCssString = () => {
    const bgRgb = hexToRgb(glassBgColor) || { r: 255, g: 255, b: 255 };
    const borderRgb = hexToRgb(glassBorderColor) || { r: 255, g: 255, b: 255 };
    return `background: rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, ${glassOpacity / 100});\nbackdrop-filter: blur(${glassBlur}px);\n-webkit-backdrop-filter: blur(${glassBlur}px);\nborder: 1px solid rgba(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}, ${glassBorderOpacity / 100});`;
  };

  const getBlobCssString = () => {
    return `border-radius: ${blobTl}% ${100 - blobTl}% ${blobBr}% ${100 - blobBr}% / ${blobBl}% ${100 - blobBl}% ${100 - blobBr}% ${blobBr}%;`;
  };

  const getActiveCssCode = () => {
    if (cssBuilderMode === "shadow") {
      return `${getShadowCssString()}\n${getGradientCssString()}`;
    }
    if (cssBuilderMode === "glass") {
      return getGlassCssString();
    }
    return getBlobCssString();
  };

  const getTailwindClassString = () => {
    const classes = [];
    if (twPaddingX) classes.push(twPaddingX);
    if (twPaddingY) classes.push(twPaddingY);
    if (twMarginX) classes.push(twMarginX);
    if (twMarginY) classes.push(twMarginY);

    if (twBorderWidth !== "border-none") {
      classes.push(twBorderWidth);
      classes.push(twBorderStyle);
      classes.push(twBorderColor);
    }
    if (twBorderRadius) classes.push(twBorderRadius);

    classes.push(twDisplay);
    if (twDisplay === "flex") {
      classes.push(twFlexDir);
      classes.push(twAlignItems);
      classes.push(twJustifyContent);
    }

    classes.push(twTextSize);
    classes.push(twTextWeight);
    classes.push(twTextColor);
    classes.push(twTextAlign);

    classes.push(twBgColor);
    classes.push(twShadow);
    classes.push(twOpacity);

    return classes.join(" ");
  };

  const activeFont = fontPairings[activePairingIndex];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">UI & Design Code Helper</h2>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner flex-wrap justify-center gap-1">
          <button
            onClick={() => setSubTab("color")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "color" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Color & Contrast
          </button>
          <button
            onClick={() => setSubTab("css")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "css" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            CSS Builders
          </button>
          <button
            onClick={() => setSubTab("tailwind")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "tailwind" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Tailwind Translator
          </button>
          <button
            onClick={() => setSubTab("fonts")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "fonts" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Font Pairings
          </button>
        </div>
      </div>

      {subTab === "color" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Converter & Harmonies */}
          <div className="w-full flex flex-col gap-6">
            <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-title-main">Color Converter</h3>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="w-16 h-16 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-text-secondary uppercase">HEX Value</label>
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5 font-mono text-sm">
                  <span className="text-text-secondary">RGB:</span>
                  <span className="text-primary-main select-all">{rgbVal}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5 font-mono text-sm">
                  <span className="text-text-secondary">HSL:</span>
                  <span className="text-primary-main select-all">{hslVal}</span>
                </div>
              </div>
            </div>

            {/* Harmonies */}
            <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-title-main">Color Harmonies</h3>
                {copiedColorText && (
                  <span className="text-xs text-emerald-400 font-bold font-mono">Copied {copiedColorText}!</span>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-secondary uppercase font-bold">Complementary (180°)</span>
                  <div className="flex gap-2">
                    <div
                      onClick={() => copyHarmonyColor(colorInput)}
                      style={{ backgroundColor: colorInput }}
                      className="w-12 h-10 rounded-lg cursor-pointer hover:scale-105 transition-all shadow border border-white/10"
                    />
                    <div
                      onClick={() => copyHarmonyColor(colorHarmonies.complementary)}
                      style={{ backgroundColor: colorHarmonies.complementary }}
                      className="w-12 h-10 rounded-lg cursor-pointer hover:scale-105 transition-all shadow border border-white/10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-secondary uppercase font-bold">Analogous (±30°)</span>
                  <div className="flex gap-2">
                    {colorHarmonies.analogous.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => copyHarmonyColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-12 h-10 rounded-lg cursor-pointer hover:scale-105 transition-all shadow border border-white/10"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-secondary uppercase font-bold">Triadic (120° / 240°)</span>
                  <div className="flex gap-2">
                    {colorHarmonies.triadic.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => copyHarmonyColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-12 h-10 rounded-lg cursor-pointer hover:scale-105 transition-all shadow border border-white/10"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-text-secondary uppercase font-bold">Monochromatic</span>
                  <div className="flex gap-2">
                    {colorHarmonies.mono.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => copyHarmonyColor(c)}
                        style={{ backgroundColor: c }}
                        className="w-10 h-10 rounded-lg cursor-pointer hover:scale-105 transition-all shadow border border-white/10"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contrast Checker */}
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-title-main">WCAG Accessibility Checker</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary uppercase">Text Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded-full border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full px-2 py-1.5 bg-background-default border border-white/10 rounded-lg text-xs font-mono text-text-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary uppercase">Background</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-full border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-2 py-1.5 bg-background-default border border-white/10 rounded-lg text-xs font-mono text-text-primary"
                  />
                </div>
              </div>
            </div>

            <div
              style={{ backgroundColor: bgColor, color: textColor }}
              className="w-full p-6 rounded-2xl text-center font-bold text-lg border border-white/10 shadow-inner mt-2 leading-relaxed"
            >
              Contrast Preview Text
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">Contrast Ratio</span>
                <span className="text-lg font-mono font-extrabold text-title-main">{contrastRatio} : 1</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between p-2.5 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-text-secondary">AA Normal (4.5:1)</span>
                  <span className={contrastRatio >= 4.5 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                    {contrastRatio >= 4.5 ? "PASS" : "FAIL"}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-text-secondary">AAA Normal (7:1)</span>
                  <span className={contrastRatio >= 7.0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                    {contrastRatio >= 7.0 ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === "css" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 w-fit mb-2">
              <button
                onClick={() => setCssBuilderMode("shadow")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  cssBuilderMode === "shadow" ? "bg-primary-main text-background-default shadow" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Shadow & Gradient
              </button>
              <button
                onClick={() => setCssBuilderMode("glass")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  cssBuilderMode === "glass" ? "bg-primary-main text-background-default shadow" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Glassmorphism
              </button>
              <button
                onClick={() => setCssBuilderMode("blob")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  cssBuilderMode === "blob" ? "bg-primary-main text-background-default shadow" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Organic Blob
              </button>
            </div>

            {cssBuilderMode === "shadow" && (
              <div className="flex flex-col gap-3 animate-slide-in-left">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Horizontal Offset</span>
                    <span>{hOffset}px</span>
                  </div>
                  <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Vertical Offset</span>
                    <span>{vOffset}px</span>
                  </div>
                  <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Blur Radius</span>
                    <span>{blur}px</span>
                  </div>
                  <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Spread Radius</span>
                    <span>{spread}px</span>
                  </div>
                  <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary uppercase">Shadow Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-8 h-8 rounded-full border border-white/10 bg-transparent cursor-pointer" />
                      <span className="text-xs font-mono text-text-secondary">{shadowColor}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                      <span>Opacity</span>
                      <span>{shadowOpacity}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={shadowOpacity} onChange={(e) => setShadowOpacity(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer mt-3" />
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 flex flex-col gap-2">
                  <span className="text-xs uppercase font-bold text-text-secondary">Gradient Colors</span>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <input type="color" value={gradColor1} onChange={(e) => setGradColor1(e.target.value)} className="w-full h-8 rounded-xl border border-white/10 bg-transparent cursor-pointer" />
                    <input type="color" value={gradColor2} onChange={(e) => setGradColor2(e.target.value)} className="w-full h-8 rounded-xl border border-white/10 bg-transparent cursor-pointer" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-text-secondary uppercase text-center">{gradAngle}°</span>
                      <input type="range" min="0" max="360" value={gradAngle} onChange={(e) => setGradAngle(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {cssBuilderMode === "glass" && (
              <div className="flex flex-col gap-3 animate-slide-in-left">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Backdrop Blur</span>
                    <span>{glassBlur}px</span>
                  </div>
                  <input type="range" min="0" max="40" value={glassBlur} onChange={(e) => setGlassBlur(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Background Opacity</span>
                    <span>{glassOpacity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={glassOpacity} onChange={(e) => setGlassOpacity(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Border Opacity</span>
                    <span>{glassBorderOpacity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={glassBorderOpacity} onChange={(e) => setGlassBorderOpacity(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary uppercase">Background Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={glassBgColor} onChange={(e) => setGlassBgColor(e.target.value)} className="w-8 h-8 rounded-full border border-white/10 bg-transparent cursor-pointer" />
                      <span className="text-xs font-mono text-text-secondary">{glassBgColor}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-secondary uppercase">Border Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={glassBorderColor} onChange={(e) => setGlassBorderColor(e.target.value)} className="w-8 h-8 rounded-full border border-white/10 bg-transparent cursor-pointer" />
                      <span className="text-xs font-mono text-text-secondary">{glassBorderColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {cssBuilderMode === "blob" && (
              <div className="flex flex-col gap-3 animate-slide-in-left">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Top-Left Pull</span>
                    <span>{blobTl}%</span>
                  </div>
                  <input type="range" min="10" max="90" value={blobTl} onChange={(e) => setBlobTl(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Top-Right Pull</span>
                    <span>{blobTr}%</span>
                  </div>
                  <input type="range" min="10" max="90" value={blobTr} onChange={(e) => setBlobTr(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Bottom-Right Pull</span>
                    <span>{blobBr}%</span>
                  </div>
                  <input type="range" min="10" max="90" value={blobBr} onChange={(e) => setBlobBr(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-text-secondary font-bold uppercase">
                    <span>Bottom-Left Pull</span>
                    <span>{blobBl}%</span>
                  </div>
                  <input type="range" min="10" max="90" value={blobBl} onChange={(e) => setBlobBl(parseInt(e.target.value, 10))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            )}
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4 h-full justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-title-main">CSS Live Preview</h3>
              <div className="flex justify-center items-center p-8 bg-black/15 rounded-2xl border border-white/5 h-[180px] relative overflow-hidden">
                {cssBuilderMode === "shadow" && (
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "16px",
                      backgroundImage: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`,
                      boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${hexToRgb(shadowColor)?.r || 0}, ${hexToRgb(shadowColor)?.g || 0}, ${hexToRgb(shadowColor)?.b || 0}, ${shadowOpacity / 100})`
                    }}
                  />
                )}

                {cssBuilderMode === "glass" && (
                  <div className="w-full h-full flex justify-center items-center bg-gradient-to-tr from-cyan-900/40 via-purple-900/20 to-yellow-900/40 rounded-2xl p-4">
                    <div
                      style={{
                        width: "120px",
                        height: "75px",
                        borderRadius: "12px",
                        background: `rgba(${hexToRgb(glassBgColor)?.r || 255}, ${hexToRgb(glassBgColor)?.g || 255}, ${hexToRgb(glassBgColor)?.b || 255}, ${glassOpacity / 100})`,
                        backdropFilter: `blur(${glassBlur}px)`,
                        WebkitBackdropFilter: `blur(${glassBlur}px)`,
                        border: `1px solid rgba(${hexToRgb(glassBorderColor)?.r || 255}, ${hexToRgb(glassBorderColor)?.g || 255}, ${hexToRgb(glassBorderColor)?.b || 255}, ${glassBorderOpacity / 100})`
                      }}
                      className="flex items-center justify-center text-[10px] font-bold text-text-primary/75 shadow"
                    >
                      Glass Card
                    </div>
                  </div>
                )}

                {cssBuilderMode === "blob" && (
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "linear-gradient(135deg, var(--color-primary-main), var(--color-title-main))",
                      borderRadius: `${blobTl}% ${100 - blobTl}% ${blobBr}% ${100 - blobBr}% / ${blobBl}% ${100 - blobBl}% ${100 - blobBr}% ${blobBr}%`
                    }}
                    className="shadow-md transition-all duration-300"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-secondary uppercase tracking-widest font-bold">Generated CSS Rules</span>
                <button
                  onClick={() => copyText(getActiveCssCode(), setCopiedCss)}
                  className="px-2.5 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-[11px] border border-primary-main/20 transition-all font-bold"
                >
                  {copiedCss ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <pre className="p-4 bg-black/25 rounded-xl border border-white/5 font-mono text-[10px] leading-relaxed text-text-primary select-all max-h-[120px] overflow-y-auto">
                {getActiveCssCode()}
              </pre>
            </div>
          </div>
        </div>
      )}

      {subTab === "tailwind" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-left">
          {/* Interactive Configurator */}
          <div className="lg:col-span-2 p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-title-main">Interactive Configurator</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Spacing & Borders */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-primary-main uppercase tracking-wider">Spacing & Sizing</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Padding X</label>
                    <select value={twPaddingX} onChange={(e) => setTwPaddingX(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="px-0">px-0 (0px)</option>
                      <option value="px-2">px-2 (8px)</option>
                      <option value="px-4">px-4 (16px)</option>
                      <option value="px-6">px-6 (24px)</option>
                      <option value="px-8">px-8 (32px)</option>
                      <option value="px-10">px-10 (40px)</option>
                      <option value="px-12">px-12 (48px)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Padding Y</label>
                    <select value={twPaddingY} onChange={(e) => setTwPaddingY(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="py-0">py-0 (0px)</option>
                      <option value="py-2">py-2 (8px)</option>
                      <option value="py-3">py-3 (12px)</option>
                      <option value="py-4">py-4 (16px)</option>
                      <option value="py-6">py-6 (24px)</option>
                      <option value="py-8">py-8 (32px)</option>
                      <option value="py-10">py-10 (40px)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Margin X</label>
                    <select value={twMarginX} onChange={(e) => setTwMarginX(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="mx-0">mx-0 (0px)</option>
                      <option value="mx-2">mx-2 (8px)</option>
                      <option value="mx-4">mx-4 (16px)</option>
                      <option value="mx-8">mx-8 (32px)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Margin Y</label>
                    <select value={twMarginY} onChange={(e) => setTwMarginY(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="my-0">my-0 (0px)</option>
                      <option value="my-2">my-2 (8px)</option>
                      <option value="my-4">my-4 (16px)</option>
                      <option value="my-8">my-8 (32px)</option>
                    </select>
                  </div>
                </div>

                <span className="text-xs font-bold text-primary-main uppercase tracking-wider mt-2">Borders</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Border Width</label>
                    <select value={twBorderWidth} onChange={(e) => setTwBorderWidth(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="border-none">None</option>
                      <option value="border">Thin (1px)</option>
                      <option value="border-2">Medium (2px)</option>
                      <option value="border-4">Thick (4px)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Border Style</label>
                    <select value={twBorderStyle} onChange={(e) => setTwBorderStyle(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="border-solid">Solid</option>
                      <option value="border-dashed">Dashed</option>
                      <option value="border-dotted">Dotted</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Border Radius</label>
                    <select value={twBorderRadius} onChange={(e) => setTwBorderRadius(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="rounded-none">rounded-none</option>
                      <option value="rounded-sm">rounded-sm</option>
                      <option value="rounded-md">rounded-md</option>
                      <option value="rounded-lg">rounded-lg</option>
                      <option value="rounded-xl">rounded-xl</option>
                      <option value="rounded-2xl">rounded-2xl</option>
                      <option value="rounded-3xl">rounded-3xl</option>
                      <option value="rounded-full">rounded-full</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Border Color</label>
                    <select value={twBorderColor} onChange={(e) => setTwBorderColor(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="border-white/10">White 10%</option>
                      <option value="border-primary-main">Primary Blue</option>
                      <option value="border-secondary-main">Secondary Pink</option>
                      <option value="border-gray-200">Gray Light</option>
                      <option value="border-gray-700">Gray Dark</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Layout & Typography */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-primary-main uppercase tracking-wider">Layout & Flexbox</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Display</label>
                    <select value={twDisplay} onChange={(e) => setTwDisplay(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="block">block</option>
                      <option value="flex">flex</option>
                      <option value="grid">grid</option>
                      <option value="inline-block">inline-block</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Direction</label>
                    <select value={twFlexDir} disabled={twDisplay !== "flex"} onChange={(e) => setTwFlexDir(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none disabled:opacity-50">
                      <option value="flex-row">flex-row</option>
                      <option value="flex-col">flex-col</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Align Items</label>
                    <select value={twAlignItems} disabled={twDisplay !== "flex"} onChange={(e) => setTwAlignItems(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none disabled:opacity-50">
                      <option value="items-start">items-start</option>
                      <option value="items-center">items-center</option>
                      <option value="items-end">items-end</option>
                      <option value="items-stretch">items-stretch</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Justify Content</label>
                    <select value={twJustifyContent} disabled={twDisplay !== "flex"} onChange={(e) => setTwJustifyContent(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none disabled:opacity-50">
                      <option value="justify-start">justify-start</option>
                      <option value="justify-center">justify-center</option>
                      <option value="justify-end">justify-end</option>
                      <option value="justify-between">justify-between</option>
                    </select>
                  </div>
                </div>

                <span className="text-xs font-bold text-primary-main uppercase tracking-wider mt-2">Styles & Background</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Background Color</label>
                    <select value={twBgColor} onChange={(e) => setTwBgColor(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="bg-transparent">Transparent</option>
                      <option value="bg-background-default">Bg Default</option>
                      <option value="bg-background-paper">Bg Paper</option>
                      <option value="bg-primary-main/10">Primary Tint</option>
                      <option value="bg-primary-main">Primary Solid</option>
                      <option value="bg-white/5">Glass White (5%)</option>
                      <option value="bg-black/20">Glass Black (20%)</option>
                      <option value="bg-gray-800">Gray Dark</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Shadow Strength</label>
                    <select value={twShadow} onChange={(e) => setTwShadow(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="shadow-none">none</option>
                      <option value="shadow-sm">sm</option>
                      <option value="shadow">shadow</option>
                      <option value="shadow-md">md</option>
                      <option value="shadow-lg">lg</option>
                      <option value="shadow-xl">xl</option>
                      <option value="shadow-2xl">2xl</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Text Size</label>
                    <select value={twTextSize} onChange={(e) => setTwTextSize(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="text-xs">text-xs</option>
                      <option value="text-sm">text-sm</option>
                      <option value="text-base">text-base</option>
                      <option value="text-lg">text-lg</option>
                      <option value="text-xl">text-xl</option>
                      <option value="text-2xl">text-2xl</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-text-secondary uppercase font-semibold">Text Color</label>
                    <select value={twTextColor} onChange={(e) => setTwTextColor(e.target.value)} className="px-2.5 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none">
                      <option value="text-text-primary">Primary</option>
                      <option value="text-text-secondary">Secondary</option>
                      <option value="text-primary-main">Primary Blue</option>
                      <option value="text-secondary-main">Secondary Pink</option>
                      <option value="text-white">White</option>
                      <option value="text-emerald-500">Success Green</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Translator & Preview */}
          <div className="flex flex-col gap-6">
            {/* Live Component Preview */}
            <div className="p-6 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-title-main uppercase tracking-widest">Tailwind Preview</h3>
              <div className="flex justify-center items-center p-6 bg-black/20 rounded-2xl border border-white/5 min-h-[160px]">
                <div className={getTailwindClassString()}>
                  <span className="font-bold block">Preview Element</span>
                  <span className="text-[10px] opacity-75">Configured dynamically</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] text-text-secondary uppercase font-bold">Utility Class String</span>
                  <button
                    onClick={() => copyText(getTailwindClassString(), setCopiedTranslatedTw)}
                    className="text-primary-main hover:underline text-[10px] font-bold"
                  >
                    {copiedTranslatedTw ? "Copied!" : "Copy Classes"}
                  </button>
                </div>
                <div className="p-3 bg-black/20 rounded-xl border border-white/5 font-mono text-[10px] leading-relaxed text-text-primary select-all">
                  {getTailwindClassString()}
                </div>
              </div>
            </div>

            {/* CSS to Tailwind Input */}
            <div className="p-6 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-title-main uppercase tracking-widest">CSS to Tailwind</h3>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-text-secondary uppercase">Enter CSS Rules</label>
                <textarea
                  rows={4}
                  value={cssToTranslate}
                  onChange={(e) => setCssToTranslate(e.target.value)}
                  placeholder="padding: 16px;&#10;border-radius: 8px;"
                  className="w-full px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary font-mono text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-text-secondary uppercase font-semibold">Resulting Tailwind Classes:</span>
                <div className="p-3 bg-black/20 rounded-xl border border-white/5 font-mono text-xs text-primary-main select-all min-h-[40px]">
                  {translatedTwClasses}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === "fonts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-left">
          {/* Controls & Pairings List */}
          <div className="lg:col-span-1 p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-title-main">Font Pairings</h3>
              <p className="text-xs text-text-secondary">Select a curated pair of Google fonts to see how they look in layouts.</p>
            </div>

            {/* Pairing select list */}
            <div className="flex flex-col gap-2">
              {fontPairings.map((pair, idx) => (
                <button
                  key={pair.id}
                  onClick={() => setActivePairingIndex(idx)}
                  className={`text-left p-3 rounded-xl border text-xs font-bold transition-all ${
                    activePairingIndex === idx
                      ? "bg-primary-main/10 text-primary-main border-primary-main/30 shadow-inner"
                      : "bg-background-default border-white/5 text-text-primary hover:bg-white/5"
                  }`}
                >
                  <div className="font-semibold">{pair.name}</div>
                  <div className="text-[10px] text-text-secondary mt-1 font-mono">
                    H: {pair.heading} | B: {pair.body}
                  </div>
                </button>
              ))}
            </div>

            {/* Tuning sliders */}
            <div className="border-t border-white/5 pt-4 flex flex-col gap-4">
              <span className="text-xs font-bold text-primary-main uppercase tracking-wider">Tune Typography</span>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-text-secondary font-semibold uppercase">
                  <span>Heading Size</span>
                  <span>{fontTitleSize}rem</span>
                </div>
                <input type="range" min="1.5" max="4.5" step="0.1" value={fontTitleSize} onChange={(e) => setFontTitleSize(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-text-secondary font-semibold uppercase">
                  <span>Heading Weight</span>
                  <span>{fontTitleWeight}</span>
                </div>
                <select value={fontTitleWeight} onChange={(e) => setFontTitleWeight(parseInt(e.target.value, 10))} className="px-2 py-1.5 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none w-full">
                  <option value={400}>400 (Regular)</option>
                  <option value={700}>700 (Bold)</option>
                  <option value={800}>800 (Extra Bold)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-text-secondary font-semibold uppercase">
                  <span>Body Size</span>
                  <span>{fontBodySize}rem</span>
                </div>
                <input type="range" min="0.875" max="1.5" step="0.025" value={fontBodySize} onChange={(e) => setFontBodySize(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-text-secondary font-semibold uppercase">
                  <span>Body Line Height</span>
                  <span>{fontLineHeight}</span>
                </div>
                <input type="range" min="1.2" max="2.0" step="0.1" value={fontLineHeight} onChange={(e) => setFontLineHeight(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Sandbox & Export codes */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Real-time Sandbox */}
            <div className="p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-title-main uppercase tracking-widest">Interactive Fonts Sandbox</h3>
              
              <div className="p-6 bg-background-default/70 rounded-2xl border border-white/5 leading-relaxed shadow-inner">
                {/* Custom Heading */}
                <input
                  type="text"
                  value={sandboxTitleText}
                  onChange={(e) => setSandboxTitleText(e.target.value)}
                  style={{
                    fontFamily: `"${activeFont.heading}", sans-serif`,
                    fontSize: `${fontTitleSize}rem`,
                    fontWeight: fontTitleWeight,
                    lineHeight: "1.2"
                  }}
                  className="bg-transparent text-text-primary w-full border-b border-dashed border-white/10 focus:border-primary-main focus:outline-none mb-4 pb-2"
                />

                {/* Custom Body */}
                <textarea
                  rows={4}
                  value={sandboxBodyText}
                  onChange={(e) => setSandboxBodyText(e.target.value)}
                  style={{
                    fontFamily: `"${activeFont.body}", sans-serif`,
                    fontSize: `${fontBodySize}rem`,
                    fontWeight: fontBodyWeight,
                    lineHeight: fontLineHeight
                  }}
                  className="bg-transparent text-text-secondary w-full focus:outline-none resize-none leading-relaxed"
                />
              </div>
              <p className="text-[10px] text-text-secondary text-right italic">Note: Font faces are loaded dynamically directly from Google Fonts APIs.</p>
            </div>

            {/* Integration Snippets */}
            <div className="p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-title-main uppercase tracking-widest">Get The Code</h3>
                <span className="text-[10px] text-text-secondary font-mono">Imports & CSS Rules</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* HTML link tag */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] text-text-secondary uppercase font-bold">
                    <span>HTML Link Embed</span>
                    <button
                      onClick={() => copyText(`<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=${activeFont.headingLink}&family=${activeFont.bodyLink}&display=swap" rel="stylesheet">`, setCopiedFontImport)}
                      className="text-primary-main hover:underline"
                    >
                      {copiedFontImport ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="p-3.5 bg-black/25 rounded-xl border border-white/5 font-mono text-[9px] text-text-primary overflow-x-auto select-all">
                    {`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${activeFont.headingLink}&family=${activeFont.bodyLink}&display=swap" rel="stylesheet">`}
                  </pre>
                </div>

                {/* CSS Family Rules */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text-secondary uppercase font-bold">CSS Declarations</span>
                  <pre className="p-3.5 bg-black/25 rounded-xl border border-white/5 font-mono text-[9px] text-text-primary overflow-x-auto select-all">
                    {`h1 {
  font-family: '${activeFont.heading}', sans-serif;
  font-weight: ${fontTitleWeight};
}

p {
  font-family: '${activeFont.body}', sans-serif;
  font-weight: ${fontBodyWeight};
  line-height: ${fontLineHeight};
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UiDesignHelpers;
