'use client';

import { useEffect, useRef, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  born: number;
}

function StarCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const id = idRef.current++;
      setSparkles((prev) => [...prev, { id, x: e.clientX, y: e.clientY, born: Date.now() }]);
    };

    window.addEventListener('mousemove', handleMove);

    const interval = setInterval(() => {
      setSparkles((prev) => prev.filter((s) => Date.now() - s.born < 800));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {sparkles.map((s) => {
        const age = (Date.now() - s.born) / 800;
        return (
          <span
            key={s.id}
            style={{
              position: 'fixed',
              left: s.x - 8,
              top: s.y - 8,
              fontSize: 16 - age * 12,
              opacity: 1 - age,
              pointerEvents: 'none',
              zIndex: 9999,
              color: ['#FFD700', '#FF69B4', '#00FFFF', '#FF4500', '#7FFF00'][s.id % 5],
              transform: `rotate(${s.id * 37}deg)`,
            }}
          >
            ✦
          </span>
        );
      })}
    </>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('retro-visitor-count');
    const next = (stored ? parseInt(stored) : 1337) + 1;
    localStorage.setItem('retro-visitor-count', String(next));
    setCount(next);
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '10px 0' }}>
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        width={1}
        height={1}
        alt=""
      />
      <span style={{ fontFamily: 'monospace', background: '#000', color: '#0f0', padding: '2px 8px', border: '1px solid #0f0' }}>
        You are visitor #{count}
      </span>
    </div>
  );
}

function MarqueeText({ children, direction = 'left' }: { children: React.ReactNode; direction?: 'left' | 'right' }) {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
      <div
        style={{
          display: 'inline-block',
          animation: `marquee-${direction} 12s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function BlinkText({ children }: { children: React.ReactNode }) {
  return <span style={{ animation: 'blink 1s step-end infinite' }}>{children}</span>;
}

function GuestbookForm() {
  const [entries, setEntries] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('retro-guestbook');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  const handleSign = () => {
    if (!input.trim()) return;
    const next = [...entries, input.trim()];
    setEntries(next);
    localStorage.setItem('retro-guestbook', JSON.stringify(next));
    setInput('');
  };

  return (
    <div style={{ border: '2px inset #999', background: '#ffffcc', padding: 12, margin: '10px 0' }}>
      <h3 style={{ margin: '0 0 8px', fontFamily: 'Comic Sans MS, cursive' }}>
        &#128221; Sign My Guestbook!
      </h3>
      <div style={{ display: 'flex', gap: 4 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSign()}
          placeholder="Leave a message..."
          style={{
            flex: 1,
            fontFamily: 'Comic Sans MS, cursive',
            fontSize: 12,
            padding: '4px 6px',
            border: '2px inset #999',
          }}
        />
        <button
          onClick={handleSign}
          style={{
            fontFamily: 'Comic Sans MS, cursive',
            fontSize: 12,
            padding: '4px 12px',
            background: '#c0c0c0',
            border: '2px outset #999',
            cursor: 'pointer',
          }}
        >
          Sign!
        </button>
      </div>
      {entries.length > 0 && (
        <ul style={{ margin: '8px 0 0', paddingLeft: 20, fontFamily: 'Comic Sans MS, cursive', fontSize: 12 }}>
          {entries.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function RetroPage() {
  const [showConstruction, setShowConstruction] = useState(true);

  return (
    <>
      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes rainbow {
          0% { color: red; }
          15% { color: orange; }
          30% { color: yellow; }
          45% { color: green; }
          60% { color: blue; }
          75% { color: indigo; }
          90% { color: violet; }
          100% { color: red; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes starfield {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 500px 1000px, 400px 800px, 300px 600px; }
        }
        .retro-link {
          color: #0000FF;
          text-decoration: underline;
          cursor: pointer;
        }
        .retro-link:visited { color: #800080; }
        .retro-link:hover { color: #FF0000; }
        .retro-hr {
          border: none;
          height: 6px;
          background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
          margin: 12px 0;
        }
        .retro-table {
          border: 3px ridge #808080;
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
          background: #ffffee;
        }
        .retro-table td {
          border: 1px solid #808080;
          padding: 8px;
          vertical-align: top;
        }
      `}</style>

      <StarCursor />

      <div
        style={{
          background: '#000033',
          backgroundImage:
            'radial-gradient(1px 1px at 20px 30px, white, transparent), ' +
            'radial-gradient(1px 1px at 40px 70px, white, transparent), ' +
            'radial-gradient(1px 1px at 90px 40px, white, transparent), ' +
            'radial-gradient(1px 1px at 160px 120px, white, transparent), ' +
            'radial-gradient(1px 1px at 200px 50px, white, transparent)',
          backgroundSize: '250px 150px',
          animation: 'starfield 30s linear infinite',
          minHeight: 'calc(100vh - 112px)',
          padding: 0,
          cursor: 'crosshair',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
          {/* Top banner */}
          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <MarqueeText>
              <span
                style={{
                  fontFamily: 'Comic Sans MS, cursive',
                  fontSize: 28,
                  fontWeight: 'bold',
                  animation: 'rainbow 3s linear infinite',
                }}
              >
                ~~* Welcome to Przemek&apos;s Awesome Homepage *~~ &#127775;&#10024;&#127775;
              </span>
            </MarqueeText>
          </div>

          <hr className="retro-hr" />

          {/* Under construction */}
          {showConstruction && (
            <div
              style={{
                textAlign: 'center',
                background: '#ffff00',
                color: '#000',
                padding: 8,
                border: '3px dashed #ff0000',
                fontFamily: 'Comic Sans MS, cursive',
                fontSize: 14,
                marginBottom: 10,
                position: 'relative',
              }}
            >
              <span
                onClick={() => setShowConstruction(false)}
                style={{ position: 'absolute', top: 2, right: 6, cursor: 'pointer', fontSize: 12 }}
              >
                [x]
              </span>
              &#128679; <BlinkText>UNDER CONSTRUCTION</BlinkText> &#128679;
              <br />
              This page is best viewed in Netscape Navigator 4.0 at 800x600 resolution
            </div>
          )}

          {/* Main table layout - classic 90s */}
          <table className="retro-table">
            <tbody>
              <tr>
                {/* Sidebar */}
                <td style={{ width: 180, background: '#c0c0c0', fontFamily: 'Comic Sans MS, cursive', fontSize: 13 }}>
                  <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 50 }}>&#128008;</span>
                    <br />
                    <i>My cool cat</i>
                  </div>
                  <hr className="retro-hr" />
                  <b>Navigation:</b>
                  <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                    <li><a className="retro-link" href="#about">About Me</a></li>
                    <li><a className="retro-link" href="#links">Cool Links</a></li>
                    <li><a className="retro-link" href="#webring">Webring</a></li>
                    <li><a className="retro-link" href="#guestbook">Guestbook</a></li>
                  </ul>
                  <hr className="retro-hr" />
                  <VisitorCounter />
                  <hr className="retro-hr" />
                  <div style={{ textAlign: 'center', fontSize: 11 }}>
                    <div style={{ border: '1px solid #333', background: '#fff', padding: 4, display: 'inline-block', margin: 2 }}>
                      &#127918; Made with<br />Notepad.exe
                    </div>
                    <br />
                    <div style={{ border: '1px solid #333', background: '#fff', padding: 4, display: 'inline-block', margin: 2 }}>
                      &#128187; Best viewed<br />800x600
                    </div>
                  </div>
                </td>

                {/* Main content */}
                <td style={{ background: '#ffffee', fontFamily: 'Times New Roman, serif', fontSize: 14 }}>
                  <h2
                    id="about"
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      color: '#FF00FF',
                      textShadow: '2px 2px #000',
                      fontSize: 22,
                    }}
                  >
                    &#9734; About Me &#9734;
                  </h2>
                  <p>
                    Hi!!! My name is <b>Przemek</b> and this is my <i>personal homepage</i> on the World Wide Web!!! &#128512;
                  </p>
                  <p>
                    I am a <span style={{ color: '#FF0000', fontWeight: 'bold' }}>Senior Full Stack Developer</span> &amp;
                    Consultant. I like coding, AI, and making cool websites (like this one LOL).
                  </p>
                  <p>
                    My hobbies include: &#128187; programming, &#127914; music, &#9749; coffee, and &#128640; space stuff!
                  </p>

                  <hr className="retro-hr" />

                  <h2
                    id="links"
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      color: '#008000',
                      textShadow: '2px 2px #000',
                      fontSize: 22,
                    }}
                  >
                    &#127760; Cool Links &#127760;
                  </h2>
                  <ul>
                    <li><a className="retro-link" href="/cv">&#128196; My Professional CV (boring version)</a></li>
                    <li><a className="retro-link" href="/chat">&#129302; Talk to my AI Chat Bot!</a></li>
                    <li>
                      <span className="retro-link" style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                        &#128279; More links coming soon...
                      </span>
                    </li>
                  </ul>

                  <hr className="retro-hr" />

                  <h2
                    id="webring"
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      color: '#0000CC',
                      textShadow: '2px 2px #000',
                      fontSize: 22,
                    }}
                  >
                    &#128260; Webring &#128260;
                  </h2>
                  <div
                    style={{
                      textAlign: 'center',
                      border: '2px ridge #808080',
                      background: '#e0e0ff',
                      padding: 10,
                      fontFamily: 'Comic Sans MS, cursive',
                      fontSize: 12,
                    }}
                  >
                    <b>&#127760; The Cool Developers Webring &#127760;</b>
                    <br />
                    <span className="retro-link">[&lt;&lt; Prev]</span>
                    {' | '}
                    <span className="retro-link">[Random]</span>
                    {' | '}
                    <span className="retro-link">[Next &gt;&gt;]</span>
                  </div>

                  <hr className="retro-hr" />

                  <h2
                    id="guestbook"
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      color: '#FF6600',
                      textShadow: '2px 2px #000',
                      fontSize: 22,
                    }}
                  >
                    &#128214; Guestbook &#128214;
                  </h2>
                  <GuestbookForm />

                  <hr className="retro-hr" />

                  {/* Footer marquee */}
                  <MarqueeText direction="right">
                    <span style={{ fontFamily: 'Comic Sans MS, cursive', fontSize: 12, color: '#FF00FF' }}>
                      &#10024; Thanks for visiting my page! Don&apos;t forget to sign the guestbook! &#10024;
                      &nbsp;&nbsp;&nbsp;&#10024; You are awesome! &#10024;
                    </span>
                  </MarqueeText>

                  <div style={{ textAlign: 'center', marginTop: 8, fontFamily: 'Comic Sans MS, cursive', fontSize: 11, color: '#808080' }}>
                    Last updated: January 1st, 1999 | Email me: przemek@geocities.com
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ height: 20 }} />
        </div>
      </div>
    </>
  );
}
