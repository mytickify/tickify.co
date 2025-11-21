// Editor.jsx
import { Puck } from "@measured/puck";
import React from "react";
import type { Config } from "@measured/puck";
import { HeroSection, GallerySection, AboutSection, ScheduleSection, ContactSection } from "@/site-builder/components/Sections";
import { HeroSectionProps, GallerySectionProps, AboutSectionProps, ScheduleSectionProps, ContactSectionProps } from "@/site-builder";
import basicEvent from "@/site-builder/data/templates/basic-event.json";
import concert from "@/site-builder/data/templates/concert.json";
import conference from "@/site-builder/data/templates/conference.json";
import { Button } from "@/components/ui/button";
import { PricingSectionComponentProps } from "./blocks/PricingSection/PricingSection";
import { PricingSectionBlock } from "./blocks/PricingSection/client";
import JsonView from '@uiw/react-json-view';

import "@measured/puck/puck.css";

type ComponentData = {
  HeroSection: HeroSectionProps['data'] 
  PricingSection: PricingSectionComponentProps;
  GallerySection: GallerySectionProps['data'];
  AboutSection: AboutSectionProps['data'];
  ScheduleSection: ScheduleSectionProps['data'];
  ContactSection: ContactSectionProps['data'];
};

const config: Config<ComponentData> = {
  components: {
    PricingSection: PricingSectionBlock,
    HeroSection: {
      label: "Hero",
      fields: {
        title: { type: "text", contentEditable: true },
        subtitle: { type: "text", contentEditable: true },
        backgroundImage: { type: "text" },
        ctaText: { type: "text" },
        ctaLink: { type: "text" },
        // image: {
        //   type: "object",
        //   objectFields: {
        //     url: {
        //       type: "custom",
        //       render: ({ value, field, name, onChange, readOnly }) => (
        //         <FieldLabel
        //           label={field.label || name}
        //           readOnly={readOnly}
        //           icon={<Link2 size="16" />}
        //         >
        //           <AutoField
        //             field={{ type: "text" }}
        //             value={value}
        //             onChange={onChange}
        //             readOnly={readOnly}
        //           />
        //         </FieldLabel>
        //       ),
        //     },
        //     mode: {
        //       type: "radio",
        //       options: [
        //         { label: "inline", value: "inline" },
        //         { label: "bg", value: "background" },
        //         { label: "custom", value: "custom" },
        //       ],
        //     },
        //   },
        // },
        layout: { type: "radio", options: [{ value: "centered", label: "Centered" }, { value: "left", label: "Left" }, { value: "right", label: "Right" }] },
        overlay: { type: "radio", options: [{ value: true, label: "True" }, { value: false, label: "False" }] },
      },
      defaultProps: {
        title: "Bienvenido a Nuestro Evento",
        subtitle: "Una experiencia inolvidable te espera",
        backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920",
        ctaText: "Ver Entradas",
        ctaLink: "#pricing-1",
        layout: "left",
        overlay: true,
        // image: {
        //   url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920",
        //   mode: "inline",
        // },
      },
      render: ({ title, subtitle, backgroundImage, ctaText, ctaLink, layout, overlay,  }) => {
        const data: HeroSectionProps['data'] = {
          title,
          subtitle,
          backgroundImage,
          ctaText,
          ctaLink,
          layout,
          overlay,
        };
        return <HeroSection section={{ data, id: '', type: "hero", order: 0 }} />;
      },
    },
    // PricingSection: {
    //   fields: {
    //     quote: {
    //       type: "external",
    //       placeholder: "Select a quote",
    //       showSearch: false,
    //       renderFooter: ({ items }) => {
    //         return (
    //           <div>
    //             {items.length} result{items.length === 1 ? "" : "s"}
    //           </div>
    //         );
    //       },
    //       filterFields: {
    //         author: {
    //           type: "select",
    //           options: [
    //             { value: "", label: "Select an author" },
    //             { value: "Mark Twain", label: "Mark Twain" },
    //             { value: "Henry Ford", label: "Henry Ford" },
    //             { value: "Kurt Vonnegut", label: "Kurt Vonnegut" },
    //             { value: "Andrew Carnegie", label: "Andrew Carnegie" },
    //             { value: "C. S. Lewis", label: "C. S. Lewis" },
    //             { value: "Confucius", label: "Confucius" },
    //             { value: "Eleanor Roosevelt", label: "Eleanor Roosevelt" },
    //             { value: "Samuel Ullman", label: "Samuel Ullman" },
    //           ],
    //         },
    //       },
    //       fetchList: async ({ query, filters }) => {
    //         // Simulate delay
    //         await new Promise((res) => setTimeout(res, 500));

    //         return quotes
    //           .map((quote, idx) => ({
    //             index: idx,
    //             title: quote.author,
    //             description: quote.content,
    //           }))
    //           .filter((item) => {
    //             if (filters?.author && item.title !== filters?.author) {
    //               return false;
    //             }

    //             if (!query) return true;

    //             const queryLowercase = query.toLowerCase();

    //             if (item.title.toLowerCase().indexOf(queryLowercase) > -1) {
    //               return true;
    //             }

    //             if (item.description.toLowerCase().indexOf(queryLowercase) > -1) {
    //               return true;
    //             }
    //           });
    //       },
    //       mapRow: (item) => ({
    //         title: item.title,
    //         description: <span>{item.description}</span>,
    //       }),
    //       mapProp: (result) => {
    //         return { index: result.index, label: result.description };
    //       },
    //       getItemSummary: (item) => item.label,
    //     },
    //     title: { type: "text" },
    //     description: { type: "text" },
    //     columns: { type: "select", options: [{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 4, label: "4" }] },
    //     tickets: {
    //       type: "array",
    //       arrayFields: {
    //         id: { type: "text" },
    //         name: { type: "text" },
    //         price: { type: "number" },
    //         currency: { type: "text" },
    //         description: { type: "text" },
    //         features: { type: "array", arrayFields: { type: "text" } },
    //         available: { type: "radio", options: [{ value: true, label: "True" }, { value: false, label: "False" }] },
    //       }

    //     }
    //   },
    //   defaultProps: {
    //     title: "Entradas",
    //     description: "Elige tu entrada",
    //     columns: 3,
    //     tickets: [
    //       { id: "general", name: "General", price: 20, currency: "$", description: "Acceso general", features: ["Ingreso", "Soporte"], available: true },
    //       { id: "vip", name: "VIP", price: 50, currency: "$", description: "Asientos premium", features: ["Ingreso", "Bebidas"], available: true },
    //       { id: "student", name: "Estudiante", price: 15, currency: "$", description: "Requiere credencial", features: ["Ingreso"], available: false }
    //     ]
    //   },
    //   render: ({ title, description, columns, tickets }) => {
    //     let parsed: any[] = [];
    //     try { parsed = typeof tickets === 'string' ? JSON.parse(tickets) : Array.isArray(tickets) ? tickets : []; } catch { }
    //     const normalizedTickets = (parsed || []).map((t: any) => ({
    //       id: t.id,
    //       name: t.name,
    //       price: Number(t.price ?? 0),
    //       currency: t.currency ?? "$",
    //       description: t.description,
    //       features: Array.isArray(t.features) ? t.features.map((f: any) => (typeof f === 'string' ? f : f?.value)).filter(Boolean) : [],
    //       available: Boolean(t.available)
    //     }));
    //     const data: PricingSectionProps['data'] = {
    //       title,
    //       description,
    //       columns,
    //       tickets: normalizedTickets
    //     };
    //     return <PricingSection section={{ data, id: '', type: 'pricing', order: 0 }} />;
    //   }
    // },
    GallerySection: {
      fields: {
        title: { type: "text" },
        layout: { type: "select", options: [{ value: "grid", label: "Grid" }, { value: "masonry", label: "Masonry" }, { value: "carousel", label: "Carousel" }] },
        columns: { type: "select", options: [{ value: 2, label: "2" }, { value: 3, label: "3" }, { value: 4, label: "4" }] },
        images: { type: "text" }
      },
      defaultProps: {
        title: "Galería",
        layout: "grid",
        columns: 3,
        images: [
          { id: "img1", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200", alt: "Evento", caption: "Bienvenidos" },
          { id: "img2", url: "https://images.unsplash.com/photo-1475724017904-b712052c192a?w=1200", alt: "Concierto", caption: "Música en vivo" },
          { id: "img3", url: "https://images.unsplash.com/photo-1521336575822-2b5e4c7c7f37?w=1200", alt: "Audiencia", caption: "Gran audiencia" }
        ]
      },
      render: ({ title, layout, columns, images }) => {
        let parsed: any[] = [];
        try { parsed = typeof images === 'string' ? JSON.parse(images) : Array.isArray(images) ? images : []; } catch { }
        const data: GallerySectionProps['data'] = {
          title,
          layout,
          columns,
          images: (parsed || []).map((i: any) => ({ id: i.id, url: i.url, alt: i.alt, caption: i.caption }))
        };
        return <GallerySection section={{ data, id: '', type: 'gallery', order: 0 }} />;
      }
    },
    AboutSection: {
      fields: {
        title: { type: "text" },
        content: { type: "text" },
        image: { type: "text" },
        imagePosition: { type: "select", options: [{ value: "left", label: "Izquierda" }, { value: "right", label: "Derecha" }] }
      },
      defaultProps: {
        title: "Sobre el evento",
        content: "Este es un evento único con experiencias inolvidables.",
        image: "https://images.unsplash.com/photo-1515165562835-c7d1234d5e38?w=1200",
        imagePosition: "left"
      },
      render: ({ title, content, image, imagePosition }) => {
        const data: AboutSectionProps['data'] = { title, content, image, imagePosition };
        return <AboutSection section={{ data, id: '', type: 'about', order: 0 }} />;
      }
    },
    ScheduleSection: {
      fields: {
        title: { type: "text" },
        layout: { type: "select", options: [{ value: "timeline", label: "Cronología" }, { value: "list", label: "Lista" }] },
        events: { type: "text" }
      },
      defaultProps: {
        title: "Agenda",
        layout: "timeline",
        events: [
          { id: "e1", time: "10:00", title: "Apertura", description: "Bienvenida", speaker: "Equipo", location: "Sala A" },
          { id: "e2", time: "11:00", title: "Charla Principal", description: "Tendencias", speaker: "Invitado", location: "Auditorio" }
        ]
      },
      render: ({ title, layout, events }) => {
        let parsed: any[] = [];
        try { parsed = typeof events === 'string' ? JSON.parse(events) : Array.isArray(events) ? events : []; } catch { }
        const data: ScheduleSectionProps['data'] = {
          title,
          layout,
          events: (parsed || []).map((e: any) => ({ id: e.id, time: e.time, title: e.title, description: e.description, speaker: e.speaker, location: e.location }))
        };
        return <ScheduleSection section={{ data, id: '', type: 'schedule', order: 0 }} />;
      }
    },
    ContactSection: {
      fields: {
        title: { type: "text" },
        email: { type: "text" },
        phone: { type: "text" },
        address: { type: "text" },
        mapUrl: { type: "text" },
        socialLinks: { type: "text" }
      },
      defaultProps: {
        title: "Contacto",
        email: "contacto@evento.com",
        phone: "+34 600 000 000",
        address: "Calle Principal 123, Madrid",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.650587!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDDCsDI1JzAwLjQiTiAzwrA0MicyOS42Ilc!5e0!3m2!1ses!2ses!4v0000000000000",
        socialLinks: [
          { platform: "Twitter", url: "https://twitter.com" },
          { platform: "Instagram", url: "https://instagram.com" }
        ]
      },
      render: ({ title, email, phone, address, mapUrl, socialLinks }) => {
        let parsed: any[] = [];
        try { parsed = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : Array.isArray(socialLinks) ? socialLinks : []; } catch { }
        const data: ContactSectionProps['data'] = {
          title,
          email,
          phone,
          address,
          mapUrl,
          socialLinks: (parsed || []).map((s: any) => ({ platform: s.platform, url: s.url }))
        };
        return <ContactSection section={{ data, id: '', type: 'contact', order: 0 }} />;
      }
    }
  },
};

function toPuckType(type: string) {
  return `${type.charAt(0).toUpperCase()}${type.slice(1)}Section`;
}

function templateToInitialData(template: any) {
  const sections = Array.isArray(template.sections)
    ? [...template.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  return {
    content: sections.map((s: any) => ({
      type: toPuckType(s.type),
      props: { ...(template.defaultData?.[s.id] || {}), ...(s.props || {}) },
    })),
    root: { props: template.metadata || {} },
    zones: {},
  };
}

interface EditorProps {
  onPublish: (data: any) => void;
  onChange?: (data: any) => void;
  templateId?: string;
}

export function Editor({ onPublish, onChange, templateId }: EditorProps) {   
  const [data, setData] = React.useState<any>({});
  React.useEffect(() => {
    const map: Record<string, any> = {
      "basic-event": basicEvent,
      concert,
      conference,
    };
    let key = templateId;
    if (!key && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      key = params.get("template") || undefined;
    }
    const tpl = (key && map[key]) || basicEvent;
    setData(templateToInitialData(tpl));
  }, [templateId]);
  return <>
    {process.env.NODE_ENV === "development" && <JsonView value={data || templateToInitialData(basicEvent)} />}
    <Puck
      config={config}
      data={data}
      onPublish={onPublish}
      onChange={(d) => {
        setData(d);
        onChange?.(d);
      }}
      overrides={{
        headerActions: ({ children }) => (
          <>
            <div>
              <Button variant="secondary">
                View page
              </Button>
            </div>
            {children}
          </>
        ),
      }}
    />
  </>
}