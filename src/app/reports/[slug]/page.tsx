// app/reports/[slug]/page.tsx
export default function MetabaseEmbedPage() {
    // ganti dengan UUID public dashboard kamu
    const src = "http://localhost:3000/public/question/d511c066-06be-4393-8802-477c6a7a7305";

    return (
        <div style={{ height: '85vh' }}>
            <iframe
                src={src}
                style={{ width: '100%', height: '100%', border: 0 }}
                allow="fullscreen"
            />
        </div>
    );
}
