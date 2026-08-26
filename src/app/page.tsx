"use client";

import { useEffect, useRef, useState } from "react";

const NEON = "#00eaff";
const NEON2 = "#ff2fd0";

const img = (id) => `https://i.pravatar.cc/200?img=${id}`;

const FAMILY = {
  couple: [
    { id: "p1", name: "Jacob", photo: img(51), blood: true, role: "Head of the family", bio: "Built the house that still holds every gathering." },
    { id: "p2", name: "Rosy", photo: img(45), blood: false, role: "Keeper of the hearth", bio: "Remembers every birthday without being told." },
  ],
  children: [
    {
      couple: [
        { id: "c1", name: "Jessy", photo: img(32), blood: true, role: "Eldest daughter", bio: "Keeps the family photo albums." },
        { id: "c1s", name: "Avarachan", photo: img(12), blood: false, role: "Son-in-law", bio: "Married into the family in eighty-nine." },
      ],
      children: [
        { couple: [{ id: "g1", name: "Anna Avarachan", photo: img(47), blood: true, role: "Teacher", bio: "Thirty years in the same classroom." }] },
      ],
    },
    {
      couple: [
        { id: "c2", name: "Paul", photo: img(14), blood: true, role: "Eldest son", bio: "Took over the family land in ninety-eight." },
        { id: "c2s", name: "Preetha", photo: img(31), blood: false, role: "Daughter-in-law", bio: "Runs the tailoring unit next door." },
      ],
      children: [
        { couple: [{ id: "g2", name: "Jacob", photo: img(13), blood: true, role: "Engineer", bio: "Named after his grandfather." }] },
      ],
    },
    {
      couple: [
        { id: "c3", name: "Josemon", photo: img(15), blood: true, role: "Middle son", bio: "Runs the shop on the main road." },
        { id: "c3s", name: "Manju", photo: img(26), blood: false, role: "Daughter-in-law", bio: "Every celebration cake comes from her kitchen." },
      ],
      children: [
        { couple: [{ id: "g3", name: "Chacko", photo: img(33), blood: true, role: "Student", bio: "Studying law in the city." }] },
        { couple: [{ id: "g4", name: "Maria", photo: img(27), blood: true, role: "Dancer", bio: "Trained in classical since she was six." }] },
      ],
    },
    {
      couple: [
        { id: "c4", name: "Joemon", photo: img(52), blood: true, role: "Fourth child", bio: "The one who organises every reunion." },
        { id: "c4s", name: "Sheena", photo: img(44), blood: false, role: "Daughter-in-law", bio: "Teaches music at the parish school." },
      ],
      children: [
        { couple: [{ id: "g5", name: "Annrose", photo: img(20), blood: true, role: "Student", bio: "Wants to be a marine biologist." }] },
        { couple: [{ id: "g6", name: "Issac", photo: img(11), blood: true, role: "Musician", bio: "Plays at the church every Sunday." }] },
        { couple: [{ id: "g7", name: "Izabel", photo: img(24), blood: true, role: "Painter", bio: "Sold her first canvas at fourteen." }] },
      ],
    },
    {
      couple: [
        { id: "c5", name: "Rosemary", photo: img(49), blood: true, role: "Youngest daughter", bio: "Left for the city, calls every Sunday." },
        { id: "c5s", name: "Sebastian", photo: img(60), blood: false, role: "Son-in-law", bio: "Made the family crest on the wall." },
      ],
      children: [
        { couple: [{ id: "g8", name: "Victor Antony", photo: img(59), blood: true, role: "Student", bio: "Loud, fearless, everyone's favourite." }] },
        { couple: [{ id: "g9", name: "Merlin Rose", photo: img(28), blood: true, role: "Designer", bio: "Sketches everyone at every gathering." }] },
      ],
    },
  ],
};

const bloodOf = (unit) => unit.couple.find((p) => p.blood) || unit.couple[0];
const spouseOf = (unit) => unit.couple.find((p) => !p.blood) || null;

const flatten = (node, parentUid, list, seq) => {
  const uid = "u" + seq.n++;
  const me = { uid, parentUid, couple: node.couple, childUids: [] };
  list.push(me);
  (node.children || []).forEach((c) => me.childUids.push(flatten(c, uid, list, seq)));
  return uid;
};

const Home = () => {
  const [mode, setMode] = useState("tree");
  const [data] = useState(FAMILY);

  const units = [];
  const rootUid = flatten(data, null, units, { n: 0 });
  const byUid = {};
  units.forEach((u) => (byUid[u.uid] = u));

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background: "#05060d",
      }}
    >
      <Styles />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="grid" />

      <Toggle mode={mode} setMode={setMode} />
      <Legend />

      {mode === "tree" ? (
        <TreeView data={data} />
      ) : (
        <ExplorerView byUid={byUid} rootUid={rootUid} />
      )}
    </div>
  );
};

export default Home;

const Toggle = ({ mode, setMode }) => (
  <div
    style={{
      position: "relative",
      zIndex: 5,
      display: "flex",
      justifyContent: "center",
      padding: "14px 12px 0",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "4px",
        padding: "4px",
        borderRadius: "999px",
        border: `1px solid ${NEON}44`,
        background: "#0a0d18cc",
        backdropFilter: "blur(6px)",
      }}
    >
      {[
        ["tree", "Full tree"],
        ["explorer", "Explorer"],
      ].map(([k, label]) => (
        <button
          key={k}
          onClick={() => setMode(k)}
          style={{
            border: "none",
            cursor: "pointer",
            borderRadius: "999px",
            padding: "8px 18px",
            fontSize: "13px",
            whiteSpace: "nowrap",
            color: mode === k ? "#05060d" : "#9fd8e6",
            background: mode === k ? NEON : "transparent",
            boxShadow: mode === k ? `0 0 12px ${NEON}88` : "none",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

const Legend = () => (
  <div
    style={{
      position: "relative",
      zIndex: 5,
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      padding: "10px 12px 0",
      fontSize: "11px",
      color: "#6f8b95",
    }}
  >
    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${NEON}` }}></span>
      Blood line
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${NEON2}` }}></span>
      Married in
    </span>
  </div>
);

const TreeView = ({ data }) => {
  const boxRef = useRef(null);
  const treeRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const box = boxRef.current;
      const tree = treeRef.current;
      if (!box || !tree) return;
      const s = Math.min(
        box.clientWidth / tree.scrollWidth,
        box.clientHeight / tree.scrollHeight,
        1
      );
      setScale(s > 0 ? s : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (boxRef.current) ro.observe(boxRef.current);
    if (treeRef.current) ro.observe(treeRef.current);
    return () => ro.disconnect();
  }, [data]);

  return (
    <div
      ref={boxRef}
      style={{
        position: "relative",
        height: "calc(100vh - 92px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={treeRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flex: "0 0 auto",
        }}
      >
        <Couple people={data.couple} />
        {data.children?.length > 0 && (
          <>
            <Stem />
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {data.children.map((node, i) => (
                <Node
                  key={i}
                  node={node}
                  level={0}
                  solo={data.children.length === 1}
                  isFirst={i === 0}
                  isLast={i === data.children.length - 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Node = ({ node, isFirst, isLast, solo, level }) => {
  const half = isFirst ? "right" : "left";
  const pad = level === 0 ? "50px" : "25px";
  const drawFull = !solo && !isFirst && !isLast;
  const drawHalf = !solo && (isFirst || isLast);

  return (
    <div
      style={{
        paddingRight: pad,
        paddingLeft: pad,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderTop: drawFull ? `1px solid ${NEON}` : "none",
        background: drawHalf
          ? `linear-gradient(${NEON}, ${NEON}) no-repeat ${half} top / 50% 1px`
          : "none",
      }}
    >
      <Stem />
      <Couple people={node.couple} />
      {node.children?.length > 0 && (
        <>
          <Stem />
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {node.children.map((child, i) => (
              <Node
                key={i}
                node={child}
                level={level + 1}
                solo={node.children.length === 1}
                isFirst={i === 0}
                isLast={i === node.children.length - 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Couple = ({ people = [] }) => (
  <div style={{ display: "flex", alignItems: "flex-start" }}>
    {people.map((p, i) => (
      <div key={p.id} style={{ display: "flex", alignItems: "flex-start" }}>
        {i > 0 && (
          <div
            className="neon-line"
            style={{ height: "1px", width: "40px", backgroundColor: NEON, marginTop: "50px" }}
          ></div>
        )}
        <Person person={p} />
      </div>
    ))}
  </div>
);

const Person = ({ person }) => {
  const size = 100;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: size + 30,
        flex: "0 0 auto",
      }}
    >
      <Bubble
        photo={person.photo}
        name={person.name}
        size={size}
        ring={person.blood ? NEON : NEON2}
      />
      <span
        style={{
          marginTop: "8px",
          fontSize: "13px",
          color: "#dff9ff",
          textAlign: "center",
          textShadow: `0 0 6px ${NEON}aa`,
          lineHeight: 1.2,
        }}
      >
        {person.name}
      </span>
    </div>
  );
};

const Bubble = ({ photo, name, size, ring = NEON }) => (
  <div
    className="neon-avatar"
    style={{
      height: size,
      width: size,
      borderRadius: size / 2,
      border: `2px solid ${ring}`,
      backgroundColor: "#080a14",
      overflow: "hidden",
      flex: "0 0 auto",
    }}
  >
    <img
      src={photo}
      alt={name}
      style={{ height: "100%", width: "100%", objectFit: "cover", display: "block" }}
    />
  </div>
);

const Stem = () => (
  <div
    className="neon-line"
    style={{ height: "50px", width: "1px", backgroundColor: NEON }}
  ></div>
);

const ExplorerView = ({ byUid, rootUid }) => {
  const [cur, setCur] = useState(rootUid);
  const unit = byUid[cur];

  const chain = [];
  let walk = cur;
  while (walk) {
    chain.unshift(walk);
    walk = byUid[walk].parentUid;
  }

  return (
    <div style={{ position: "relative", zIndex: 2, padding: "16px 14px 40px" }}>
      <div style={{ maxWidth: "420px", margin: "0 auto" }}>
        <p style={{ margin: "0 0 10px", fontSize: "17px", color: "#eaffff", fontWeight: 500 }}>
          The Jacob line
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            fontSize: "12px",
            color: "#6f8b95",
            marginBottom: "14px",
          }}
        >
          {chain.map((uid, i) => (
            <span key={uid} style={{ display: "flex", gap: "5px" }}>
              <span
                onClick={() => setCur(uid)}
                style={{ cursor: "pointer", color: uid === cur ? "#eaffff" : "#6f8b95" }}
              >
                {bloodOf(byUid[uid]).name}
              </span>
              {i < chain.length - 1 && <span>›</span>}
            </span>
          ))}
        </div>

        {unit.parentUid ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                onClick={() => setCur(unit.parentUid)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px 5px 5px",
                  borderRadius: "999px",
                  border: `1px solid ${NEON}55`,
                  background: "#0a0d18",
                  cursor: "pointer",
                }}
              >
                <Bubble
                  photo={bloodOf(byUid[unit.parentUid]).photo}
                  name={bloodOf(byUid[unit.parentUid]).name}
                  size={30}
                />
                <span style={{ fontSize: "13px", color: "#dff9ff" }}>
                  {byUid[unit.parentUid].couple.map((p) => p.name).join(" & ")}
                </span>
                <span style={{ fontSize: "13px", color: "#6f8b95" }}>↑</span>
              </div>
            </div>
            <div
              className="neon-line"
              style={{ height: "18px", width: "1px", background: NEON, margin: "0 auto" }}
            ></div>
          </>
        ) : (
          <p style={{ textAlign: "center", fontSize: "12px", color: "#6f8b95", margin: "0 0 10px" }}>
            Root of the line
          </p>
        )}

        <div
          style={{
            background: "#0a0d18",
            border: `1px solid ${NEON}33`,
            borderRadius: "18px",
            padding: "20px 16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: "18px", flexWrap: "wrap" }}>
            {unit.couple.map((p) => (
              <div key={p.id} style={{ textAlign: "center", maxWidth: "150px" }}>
                <Bubble photo={p.photo} name={p.name} size={84} ring={p.blood ? NEON : NEON2} />
                <p style={{ margin: "10px 0 0", fontSize: "16px", color: "#eaffff", fontWeight: 500 }}>
                  {p.name}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: "11px", color: p.blood ? NEON : NEON2 }}>
                  {p.blood ? "Blood line" : "Married in"}
                </p>
                {/* <p style={{ margin: "2px 0 0", fontSize: "12px", color: NEON }}>{p.role}</p> */}
                {/* <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#93a9b3", lineHeight: 1.5 }}>{p.bio}</p> */}
              </div>
            ))}
          </div>
        </div>

        {unit.childUids.length > 0 ? (
          <>
            <div
              className="neon-line"
              style={{ height: "18px", width: "1px", background: NEON, margin: "0 auto" }}
            ></div>
            <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#6f8b95" }}>
              Children · {unit.childUids.length}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "10px",
              }}
            >
              {unit.childUids.map((uid) => {
                const c = byUid[uid];
                const child = bloodOf(c);
                const spouse = spouseOf(c);
                return (
                  <div
                    key={uid}
                    onClick={() => setCur(uid)}
                    style={{
                      background: "#0a0d18",
                      border: `1px solid ${NEON}33`,
                      borderRadius: "14px",
                      padding: "12px 8px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Bubble photo={child.photo} name={child.name} size={48} />
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#eaffff", fontWeight: 500 }}>
                      {child.name}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#6f8b95" }}>
                      {spouse ? "m. " + spouse.name : c.childUids.length ? c.childUids.length + " children" : "—"}
                    </p>
                    {/* <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#6f8b95" }}>{child.role}</p> */}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", fontSize: "12px", color: "#6f8b95", marginTop: "16px" }}>
            No recorded children
          </p>
        )}
      </div>
    </div>
  );
};

const Styles = () => (
  <style>{`
    @keyframes drift {
      0%   { transform: translate(0,0) scale(1); }
      50%  { transform: translate(60px,-40px) scale(1.15); }
      100% { transform: translate(0,0) scale(1); }
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 6px ${NEON}, 0 0 18px ${NEON}55, inset 0 0 10px ${NEON}33; }
      50%     { box-shadow: 0 0 12px ${NEON}, 0 0 34px ${NEON}88, inset 0 0 16px ${NEON}55; }
    }
    .orb { position: fixed; border-radius: 50%; filter: blur(90px); opacity: .5; pointer-events: none; z-index: 0; }
    .orb1 { width: 380px; height: 380px; background: ${NEON};  top: -80px; left: -60px;  animation: drift 14s ease-in-out infinite; }
    .orb2 { width: 420px; height: 420px; background: ${NEON2}; bottom: -120px; right: -80px; animation: drift 18s ease-in-out infinite reverse; }
    .orb3 { width: 300px; height: 300px; background: #7a5cff;  top: 40%; left: 55%; animation: drift 22s ease-in-out infinite; }
    .grid {
      position: fixed; inset: 0; pointer-events: none; opacity: .16; z-index: 0;
      background-image:
        linear-gradient(${NEON}44 1px, transparent 1px),
        linear-gradient(90deg, ${NEON}44 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(circle at 50% 50%, #000 20%, transparent 75%);
      -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 20%, transparent 75%);
    }
    .neon-avatar { animation: pulse 3s ease-in-out infinite; }
    .neon-line   { box-shadow: 0 0 4px ${NEON}, 0 0 12px ${NEON}77; }
  `}</style>
);