
import './App.css'

function App() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.badge}>Basogol-Hive</div>
        <h1 style={styles.title}>Coming soon</h1>
        <p style={styles.text}>
          Nous préparons actuellement une plateforme moderne, propre et
          professionnelle. Le site sera disponible très bientôt.
        </p>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #0b1220, #111827, #19607e)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '680px',
    padding: '48px 32px',
    borderRadius: '24px',
    textAlign: 'center',
    color: '#ffffff',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    backdropFilter: 'blur(10px)',
  },
  badge: {
    display: 'inline-block',
    marginBottom: '14px',
    padding: '8px 14px',
    borderRadius: '999px',
    background: 'rgba(56, 189, 248, 0.15)',
    color: '#38bdf8',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  title: {
    margin: 0,
    marginBottom: '18px',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    lineHeight: 1.1,
  },
  text: {
    margin: '0 auto 30px',
    maxWidth: '540px',
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: '#dbeafe',
  },
}

export default App