import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Datalytix Quest - Inteligencia Operacional'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #0B0F19, #1a2333)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '2px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '24px',
            padding: '60px',
            background: 'rgba(11, 15, 25, 0.8)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Logo Area */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '20px' }}>
            <div style={{
              fontSize: 60,
              fontWeight: 800,
              color: '#D4AF37',
              letterSpacing: '-2px',
            }}>
              DQ
            </div>
            <div style={{ width: '4px', height: '60px', background: 'rgba(255,255,255,0.2)' }}></div>
            <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-1px' }}>
              Datalytix Quest
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              color: 'white',
              marginBottom: '30px',
            }}
          >
            Inteligencia Operacional
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '800px',
              marginBottom: '50px',
            }}
          >
            Capas analíticas avanzadas sobre su ecosistema ERP, CRM y WMS.
          </div>

          {/* Badge / CTA */}
          <div
            style={{
              display: 'flex',
              background: '#D4AF37',
              color: '#0B0F19',
              padding: '16px 40px',
              borderRadius: '100px',
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            Evalúe su Madurez Operacional
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
