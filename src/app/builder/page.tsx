"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import grapesjs from "grapesjs";
import preset from "grapesjs-preset-webpage";
import { renderTemplate, saveTemplate } from "@/utils/templateUtils";
import "./builder.css";

export default function BuilderPage() {
    const editorRef = useRef<any>(null);
    const canvasRef = useRef<HTMLDivElement | null>(null);

    const [exported, setExported] = useState<{ html: string; css: string }>({ html: "", css: "" });
    const [sampleJson, setSampleJson] = useState<string>(JSON.stringify({
        tahun: { now: 2024, prev: 2023 },
        pendapatan: {
            part_anggota: [3630000, 1000000],
            part_non: [2000000, 1000000],
            total: [5630000, 2000000]
        },
        bpu: { total: [-2000000, -1000000] },
        hasil_kotor: [3630000, 1000000],
        operasi: { total: [-400000, -200000] },
        shu: [3230000, 800000],
        lain_bersih: [100000, 50000],
        shu_before_tax: [3330000, 850000],
        pajak: [-1330000, -35000],
        shu_bersih: [2000000, 815000]
    }, null, 2));

    const [templateName, setTemplateName] = useState<string>("Report Template");
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [previewContent, setPreviewContent] = useState<string>("");

    useEffect(() => {
        if (editorRef.current || !canvasRef.current) return;

        const editor = grapesjs.init({
            container: canvasRef.current,
            height: "70vh",
            fromElement: false,
            storageManager: {
                type: 'local',
                autosave: true,
                autoload: true,
                stepsBeforeSave: 1,
            },
            plugins: [preset],
            pluginsOpts: {
                [preset as any]: {
                    blocksBasicOpts: { flexGrid: true },
                    blocksCategoryOpts: {
                        basic: { open: false },
                        extra: { open: false },
                        forms: { open: false }
                    }
                }
            },
            canvas: {
                styles: [
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
                ]
            },
        });

        // ===== Komponen "var-text": <span data-var="pendapatan.total[0]">{{ pendapatan.total[0] }}</span>
        editor.DomComponents.addType("var-text", {
            model: {
                defaults: {
                    tagName: "span",
                    attributes: { "data-var": "tahun.now" },
                    content: "{{ tahun.now }}",
                    draggable: true,
                    droppable: false,
                    stylable: true,
                    traits: [
                        {
                            type: "text",
                            name: "data-var",
                            label: "Variable Path",
                            changeProp: true,
                            placeholder: "e.g: pendapatan.total[0]"
                        },
                        {
                            type: "select",
                            name: "format",
                            label: "Format",
                            options: [
                                { id: "raw", name: "Raw" },
                                { id: "idr", name: "Rupiah (Accounting)" },
                                { id: "percentage", name: "Percentage" },
                                { id: "date", name: "Date" }
                            ],
                            changeProp: true,
                            value: "raw"
                        }
                    ],
                    "script-props": ["data-var", "format"],
                    script: function (this: any) {
                        const path = (this as any).getAttribute("data-var") || "";
                        const fmt = (this as any).getAttribute("format") || "raw";
                        (this as any).innerText = `{{ ${path}${fmt !== "raw" ? " | " + fmt : ""} }}`;
                    }
                },
                init(this: any) {
                    this.on("change:attributes:data-var change:attributes:format", () => {
                        const p = this.getAttributes()["data-var"] || "";
                        const fmt = this.getAttributes()["format"] || "raw";
                        this.components(`{{ ${p}${fmt !== "raw" ? " | " + fmt : ""} }}`);
                    });
                }
            }
        });

        // Report Table Component
        editor.DomComponents.addType("report-table", {
            model: {
                defaults: {
                    tagName: "div",
                    attributes: { class: "report-table" },
                    content: `
            <div style="display:grid;grid-template-columns:1fr 120px 120px;gap:12px;align-items:end;padding:16px;border:1px solid #ddd;border-radius:8px;">
              <div style="font-weight:bold;">Description</div>
              <div style="font-weight:bold;text-align:center;">{{ tahun.now }}</div>
              <div style="font-weight:bold;text-align:center;">{{ tahun.prev }}</div>
              <div>Revenue Total</div>
              <div style="text-align:right;">{{ pendapatan.total[0] | idr }}</div>
              <div style="text-align:right;">{{ pendapatan.total[1] | idr }}</div>
              <div>Net Income</div>
              <div style="text-align:right;background:#e9f7ee;border:1px solid #9be2b3;border-radius:4px;padding:4px;">{{ shu_bersih[0] | idr }}</div>
              <div style="text-align:right;background:#e9f7ee;border:1px solid #9be2b3;border-radius:4px;padding:4px;">{{ shu_bersih[1] | idr }}</div>
            </div>
          `,
                    draggable: true,
                    droppable: true,
                    stylable: true,
                }
            }
        });

        // Header Component
        editor.DomComponents.addType("report-header", {
            model: {
                defaults: {
                    tagName: "div",
                    attributes: { class: "report-header" },
                    content: `
            <div style="text-align:center;padding:20px;border-bottom:2px solid #333;margin-bottom:20px;">
              <h1 style="margin:0;font-size:24px;font-weight:bold;">{{ title | raw }}</h1>
              <p style="margin:8px 0 0 0;color:#666;">Period: {{ period.start }} - {{ period.end }}</p>
            </div>
          `,
                    draggable: true,
                    droppable: true,
                    stylable: true,
                }
            }
        });

        // Add blocks to Block Manager
        const blockManager = editor.BlockManager;

        blockManager.add("var-text", {
            label: "📊 Variable Text",
            category: "Report Elements",
            content: { type: "var-text" },
            media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9,7H11L12.5,16H10.5L10.1,14H7.9L7.5,16H5.5L7,7M9,12H8.9L9,11.5L9,12M15,7H17V9H15V7M15,11H17V13H15V11M15,15H17V17H15V15Z"/></svg>'
        });

        blockManager.add("report-table", {
            label: "📋 Report Table",
            category: "Report Elements",
            content: { type: "report-table" },
            media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z"/></svg>'
        });

        blockManager.add("report-header", {
            label: "📑 Report Header",
            category: "Report Elements",
            content: { type: "report-header" },
            media: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5,4V7H10.5V19H13.5V7H19V4H5Z"/></svg>'
        });

        // Add default template
        editor.addComponents(`
      <div style="max-width:800px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;">
        <div style="text-align:center;padding:20px;border-bottom:2px solid #333;margin-bottom:20px;">
          <h1 style="margin:0;font-size:24px;font-weight:bold;">LAPORAN LABA / RUGI</h1>
          <p style="margin:8px 0 0 0;color:#666;">Periode: {{ tahun.prev }} - {{ tahun.now }}</p>
        </div>
        
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;align-items:center;padding:16px;border:1px solid #ddd;border-radius:8px;margin-bottom:20px;">
          <div style="font-weight:bold;">Keterangan</div>
          <div style="font-weight:bold;text-align:center;">Tahun {{ tahun.now }}</div>
          <div style="font-weight:bold;text-align:center;">Tahun {{ tahun.prev }}</div>
          
          <div>Pendapatan - Total</div>
          <div style="text-align:right;">{{ pendapatan.total[0] | idr }}</div>
          <div style="text-align:right;">{{ pendapatan.total[1] | idr }}</div>
          
          <div>Hasil Usaha Kotor</div>
          <div style="text-align:right;">{{ hasil_kotor[0] | idr }}</div>
          <div style="text-align:right;">{{ hasil_kotor[1] | idr }}</div>
          
          <div style="font-weight:bold;">SHU Bersih</div>
          <div style="text-align:right;background:#e9f7ee;border:1px solid #9be2b3;border-radius:8px;padding:6px 10px;font-weight:bold;">{{ shu_bersih[0] | idr }}</div>
          <div style="text-align:right;background:#e9f7ee;border:1px solid #9be2b3;border-radius:8px;padding:6px 10px;font-weight:bold;">{{ shu_bersih[1] | idr }}</div>
        </div>
        
        <p style="color:#6b7280;margin-top:16px;font-style:italic;">
          Drag elemen <strong>Variable Text</strong> dari panel kiri untuk menambah placeholder variabel lainnya.
        </p>
      </div>
    `);

        editorRef.current = editor;

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, []);

    // Export HTML+CSS dari GrapesJS
    const doExport = () => {
        const ed = editorRef.current!;
        const html = ed.getHtml();
        const css = ed.getCss();
        setExported({ html, css });
    };

    // Save template to localStorage
    const saveTemplateHandler = () => {
        const ed = editorRef.current!;
        const template = {
            name: templateName,
            html: ed.getHtml(),
            css: ed.getCss(),
            timestamp: new Date().toISOString()
        };

        const saved = saveTemplate(template);
        alert(`Template "${templateName}" saved successfully with ID: ${saved.id}`);
    };

    // Render preview dengan utility function
    const doPreview = () => {
        try {
            // Get current HTML and CSS from editor
            const ed = editorRef.current;
            if (!ed) {
                alert("Editor not initialized yet. Please wait and try again.");
                return;
            }

            const currentHtml = ed.getHtml();
            const currentCss = ed.getCss();

            console.log("Current HTML:", currentHtml);
            console.log("Current CSS:", currentCss);

            if (!currentHtml.trim()) {
                alert("No content to preview. Please add some elements to the canvas first.");
                return;
            }

            const data = JSON.parse(sampleJson || "{}");
            console.log("Sample data:", data);

            const rendered = renderTemplate(currentHtml, currentCss, data);
            console.log("Rendered template:", rendered.substring(0, 500) + "...");

            // Try to open popup first
            const w = window.open("", "_blank", "width=1000,height=800");
            if (w) {
                w.document.write(rendered);
                w.document.close();
                setIsPreviewOpen(true);
            } else {
                // Fallback to modal preview if popup is blocked
                setPreviewContent(rendered);
                setIsPreviewOpen(true);
            }
        } catch (error) {
            alert("Error in preview: " + (error as Error).message);
            console.error("Preview error:", error);
        }
    };

    // Close modal preview
    const closePreview = () => {
        setIsPreviewOpen(false);
        setPreviewContent("");
    };

    const btnStyle: React.CSSProperties = {
        padding: "8px 16px",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        background: "#fff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        transition: "all 0.2s"
    };

    const boxStyle: React.CSSProperties = {
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#f9fafb"
    };

    const textareaStyle: React.CSSProperties = {
        width: "100%",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "12px",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        padding: 8
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-full mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">🎨 HTML Template Builder</h1>
                            <input
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                className="px-3 py-1 border rounded text-sm"
                                placeholder="Template Name"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <button onClick={saveTemplateHandler} style={{ ...btnStyle, background: "#10b981", color: "white" }}>
                                💾 Save Template
                            </button>
                            <button onClick={doExport} style={{ ...btnStyle, background: "#3b82f6", color: "white" }}>
                                📤 Export
                            </button>
                            <button onClick={doPreview} style={{ ...btnStyle, background: "#f59e0b", color: "white" }}>
                                👁️ Preview
                            </button>
                            <Link href="/" style={{ ...btnStyle, textDecoration: "none", color: "#374151" }}>
                                ← Back to Reports
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 16, height: "calc(100vh - 100px)" }}>
                {/* GrapesJS Editor */}
                <div style={{ padding: 16 }}>
                    <div ref={canvasRef} style={{ height: "100%", border: "1px solid #e5e7eb", borderRadius: 8 }} />
                </div>

                {/* Side Panel */}
                <div style={{ padding: 16, overflowY: "auto", backgroundColor: "#fff", borderLeft: "1px solid #e5e7eb" }}>

                    <fieldset style={boxStyle}>
                        <legend style={{ fontWeight: 600, color: "#374151" }}>📊 Sample Data (JSON)</legend>
                        <textarea
                            value={sampleJson}
                            onChange={(e) => setSampleJson(e.target.value)}
                            style={{ ...textareaStyle, height: 300 }}
                            placeholder="Enter your JSON data for preview..."
                        />
                        <p style={{ fontSize: "12px", color: "#6b7280", marginTop: 8 }}>
                            This data will be used to render variables in preview mode.
                        </p>
                    </fieldset>

                    <fieldset style={{ ...boxStyle, marginTop: 16 }}>
                        <legend style={{ fontWeight: 600, color: "#374151" }}>📝 Export Results</legend>

                        <div style={{ marginBottom: 12 }}>
                            <label style={{ display: "block", fontWeight: 500, marginBottom: 4 }}>HTML</label>
                            <textarea
                                readOnly
                                value={exported.html}
                                style={{ ...textareaStyle, height: 120 }}
                                placeholder="Exported HTML will appear here..."
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", fontWeight: 500, marginBottom: 4 }}>CSS</label>
                            <textarea
                                readOnly
                                value={exported.css}
                                style={{ ...textareaStyle, height: 120 }}
                                placeholder="Exported CSS will appear here..."
                            />
                        </div>
                    </fieldset>

                    <fieldset style={{ ...boxStyle, marginTop: 16 }}>
                        <legend style={{ fontWeight: 600, color: "#374151" }}>📚 How to Use</legend>
                        <ul style={{ fontSize: "12px", color: "#6b7280", paddingLeft: 20 }}>
                            <li>Drag <strong>Variable Text</strong> blocks to add dynamic content</li>
                            <li>Use format like <code>pendapatan.total[0]</code> for array values</li>
                            <li>Apply filters: <code>| idr</code>, <code>| percentage</code>, <code>| date</code></li>
                            <li>Click <strong>Export</strong> to get HTML/CSS</li>
                            <li>Click <strong>Preview</strong> to see with real data</li>
                            <li>Use <strong>Save Template</strong> to store your work</li>
                        </ul>
                    </fieldset>

                </div>
            </div>

            {/* Modal Preview */}
            {isPreviewOpen && previewContent && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20
                }}>
                    <div style={{
                        backgroundColor: "white",
                        borderRadius: 8,
                        width: "90%",
                        height: "90%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            padding: 16,
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <h3 style={{ margin: 0, fontWeight: 600 }}>Template Preview</h3>
                            <button
                                onClick={closePreview}
                                style={{
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    fontWeight: 600
                                }}
                            >
                                ✕ Close
                            </button>
                        </div>
                        <iframe
                            srcDoc={previewContent}
                            style={{
                                flex: 1,
                                border: "none",
                                width: "100%",
                                height: "100%"
                            }}
                            title="Template Preview"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}