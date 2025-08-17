import { createElementBlock as _A, openBlock as IA, withModifiers as Ge, normalizeStyle as Be, normalizeClass as zr, createCommentVNode as de, withDirectives as ue, vModelText as rt, createElementVNode as T, Fragment as Nt, renderList as dr, toDisplayString as nt, vShow as Md, computed as gn, ref as ye, createTextVNode as le, watch as Rl, vModelCheckbox as Pp, vModelSelect as sr, createVNode as Mp, createStaticVNode as A0, createBlock as Rp, nextTick as pa, onMounted as Nf } from "vue";
const vi = (e, A) => {
  const t = e.__vccOpts || e;
  for (const [r, n] of A)
    t[r] = n;
  return t;
}, Kp = {
  name: "DraggableElement",
  props: {
    element: {
      type: Object,
      required: !0
    },
    selected: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["select", "update", "delete", "cell-select"],
  setup(e, { emit: A }) {
    const t = gn(() => ({
      left: `${e.element.x}px`,
      top: `${e.element.y}px`,
      width: `${e.element.width}px`,
      height: `${e.element.height}px`,
      zIndex: e.selected ? 1e3 : 1
    })), r = gn(() => ({
      fontSize: `${e.element.fontSize || 14}px`,
      color: e.element.color || "#000000",
      fontWeight: e.element.fontWeight || "normal",
      fontStyle: e.element.fontStyle || "normal",
      textDecoration: e.element.textDecoration || "none",
      width: "100%",
      height: "100%",
      fontFamily: e.element.fontFamily || "inherit",
      lineHeight: "1.2",
      padding: "4px",
      direction: e.element.textDirection || "ltr",
      textAlign: e.element.textDirection === "rtl" ? "right" : "left"
    })), n = gn(() => ({
      width: "100%",
      height: "100%",
      objectFit: "contain"
    })), i = gn(() => ({
      width: "100%",
      height: "100%",
      borderCollapse: "collapse",
      fontSize: `${e.element.fontSize || 12}px`,
      backgroundColor: e.element.backgroundColor || "#ffffff",
      color: e.element.textColor || "#000000",
      fontFamily: e.element.fontFamily || "inherit",
      direction: e.element.textDirection || "ltr"
    })), a = gn(() => ({
      border: `${e.element.borderWidth || 1}px ${e.element.borderStyle || "solid"} ${e.element.borderColor || "#000000"}`,
      padding: `${e.element.cellPadding || 5}px`,
      textAlign: e.element.textDirection === "rtl" ? "right" : e.element.textAlign || "left",
      verticalAlign: e.element.verticalAlign || "top",
      backgroundColor: "inherit",
      color: "inherit",
      fontSize: "inherit",
      direction: e.element.textDirection || "ltr"
    })), l = (x, I) => {
      const j = a.value, K = {};
      return s(x, I) && (K.backgroundColor = "#e8f5e8", K.borderColor = "#28a745", K.borderWidth = "2px"), { ...j, ...K };
    }, s = (x, I) => {
      if (!e.element.mergedCells) return !1;
      const j = `${x},${I}`, K = e.element.mergedCells[j];
      return K && (K.colspan > 1 || K.rowspan > 1);
    }, f = (x, I) => {
      if (!e.element.mergedCells) return !1;
      for (const [j, K] of Object.entries(e.element.mergedCells)) {
        const [nA, iA] = j.split(",").map(Number), { colspan: cA = 1, rowspan: oA = 1 } = K;
        if ((nA !== x || iA !== I) && x >= nA && x < nA + oA && I >= iA && I < iA + cA)
          return !0;
      }
      return !1;
    }, g = (x, I) => {
      var K;
      if (!e.element.mergedCells) return 1;
      const j = `${x},${I}`;
      return ((K = e.element.mergedCells[j]) == null ? void 0 : K.colspan) || 1;
    }, p = (x, I) => {
      var K;
      if (!e.element.mergedCells) return 1;
      const j = `${x},${I}`;
      return ((K = e.element.mergedCells[j]) == null ? void 0 : K.rowspan) || 1;
    };
    let w = !1, d = !1, C = "", b = 0, _ = 0, m = 0, y = 0, H = 0, O = 0;
    const P = (x) => {
      x.target.classList.contains("resize-handle") || (w = !0, b = x.clientX, _ = x.clientY, m = e.element.x, y = e.element.y, document.addEventListener("mousemove", q), document.addEventListener("mouseup", W), x.preventDefault());
    }, q = (x) => {
      if (!w) return;
      const I = x.clientX - b, j = x.clientY - _;
      e.element.x = Math.max(0, m + I), e.element.y = Math.max(0, y + j), A("update");
    }, W = () => {
      w = !1, document.removeEventListener("mousemove", q), document.removeEventListener("mouseup", W);
    }, D = (x) => {
      d = !0, C = x, b = event.clientX, _ = event.clientY, m = e.element.x, y = e.element.y, H = e.element.width, O = e.element.height, document.addEventListener("mousemove", R), document.addEventListener("mouseup", Y), event.preventDefault();
    }, R = (x) => {
      if (!d) return;
      const I = x.clientX - b, j = x.clientY - _;
      let K = m, nA = y, iA = H, cA = O;
      C.includes("n") && (nA = y + j, cA = O - j), C.includes("s") && (cA = O + j), C.includes("w") && (K = m + I, iA = H - I), C.includes("e") && (iA = H + I), iA >= 20 && cA >= 20 && (e.element.x = Math.max(0, K), e.element.y = Math.max(0, nA), e.element.width = iA, e.element.height = cA, A("update"));
    }, Y = () => {
      d = !1, C = "", document.removeEventListener("mousemove", R), document.removeEventListener("mouseup", Y);
    };
    return {
      elementStyle: t,
      textStyle: r,
      imageStyle: n,
      tableStyle: i,
      cellStyle: a,
      getCellStyleWithMerge: l,
      isCellMerged: s,
      isCellHidden: f,
      getCellColspan: g,
      getCellRowspan: p,
      startDrag: P,
      startResize: D
    };
  }
}, jp = {
  key: 0,
  class: "text-element-container"
}, Gp = ["innerHTML"], Vp = {
  key: 1,
  class: "image-element-container"
}, zp = ["src"], qp = {
  key: 2,
  class: "line-element"
}, Wp = {
  key: 3,
  class: "rect-element"
}, Xp = {
  key: 4,
  class: "circle-element"
}, $p = ["colspan", "rowspan", "onClick"];
function Jp(e, A, t, r, n, i) {
  return IA(), _A("div", {
    class: zr(["draggable-element", { selected: t.selected }]),
    style: Be(r.elementStyle),
    onMousedown: A[10] || (A[10] = (...a) => r.startDrag && r.startDrag(...a)),
    onClick: A[11] || (A[11] = Ge((a) => e.$emit("select", t.element), ["stop"]))
  }, [
    t.element.type === "text" || t.element.type === "formatted-text" ? (IA(), _A("div", jp, [
      t.selected ? ue((IA(), _A("textarea", {
        key: 0,
        class: "text-element",
        style: Be(r.textStyle),
        "onUpdate:modelValue": A[0] || (A[0] = (a) => t.element.content = a),
        onInput: A[1] || (A[1] = (a) => e.$emit("update")),
        onMousedown: A[2] || (A[2] = Ge(() => {
        }, ["stop"])),
        onClick: A[3] || (A[3] = Ge(() => {
        }, ["stop"]))
      }, null, 36)), [
        [rt, t.element.content]
      ]) : (IA(), _A("div", {
        key: 1,
        class: "text-element",
        style: Be(r.textStyle),
        innerHTML: t.element.content
      }, null, 12, Gp))
    ])) : t.element.type === "image" ? (IA(), _A("div", Vp, [
      t.element.src ? (IA(), _A("img", {
        key: 0,
        src: t.element.src,
        class: "image-element",
        style: Be(r.imageStyle),
        onDragstart: A[4] || (A[4] = Ge(() => {
        }, ["prevent"]))
      }, null, 44, zp)) : (IA(), _A("div", {
        key: 1,
        class: "image-placeholder d-flex align-items-center justify-content-center",
        style: Be(r.imageStyle)
      }, A[12] || (A[12] = [
        T("i", { class: "bi bi-image fs-1 text-muted" }, null, -1)
      ]), 4))
    ])) : t.element.type === "line" ? (IA(), _A("div", qp, [
      T("div", {
        class: "line-shape",
        style: Be({
          width: "100%",
          height: `${t.element.strokeWidth || 2}px`,
          backgroundColor: t.element.strokeStyle === "solid" ? t.element.strokeColor || "#000000" : "transparent",
          border: t.element.strokeStyle !== "solid" ? `${t.element.strokeWidth || 2}px ${t.element.strokeStyle || "solid"} ${t.element.strokeColor || "#000000"}` : "none",
          borderTop: t.element.strokeStyle !== "solid" ? `${t.element.strokeWidth || 2}px ${t.element.strokeStyle || "solid"} ${t.element.strokeColor || "#000000"}` : "none",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)"
        })
      }, null, 4)
    ])) : t.element.type === "rect" ? (IA(), _A("div", Wp, [
      T("div", {
        class: "rect-shape",
        style: Be({
          width: "100%",
          height: "100%",
          backgroundColor: t.element.fillColor || "#ffffff",
          border: `${t.element.strokeWidth || 1}px ${t.element.strokeStyle || "solid"} ${t.element.strokeColor || "#000000"}`
        })
      }, null, 4)
    ])) : t.element.type === "circle" ? (IA(), _A("div", Xp, [
      T("div", {
        class: "circle-shape",
        style: Be({
          width: "100%",
          height: "100%",
          backgroundColor: t.element.fillColor || "#ffffff",
          border: `${t.element.strokeWidth || 1}px ${t.element.strokeStyle || "solid"} ${t.element.strokeColor || "#000000"}`,
          borderRadius: "50%"
        })
      }, null, 4)
    ])) : t.element.type === "table" ? (IA(), _A("div", {
      key: 5,
      class: "table-element",
      onClick: A[5] || (A[5] = Ge(() => {
      }, ["stop"]))
    }, [
      T("table", {
        class: "table-shape",
        style: Be(r.tableStyle)
      }, [
        (IA(!0), _A(Nt, null, dr(t.element.data, (a, l) => (IA(), _A("tr", { key: l }, [
          (IA(!0), _A(Nt, null, dr(a, (s, f) => ue((IA(), _A("td", {
            key: f,
            style: Be(r.getCellStyleWithMerge(l, f)),
            colspan: r.getCellColspan(l, f),
            rowspan: r.getCellRowspan(l, f),
            class: zr(["table-cell", {
              "merged-cell": r.isCellMerged(l, f)
            }]),
            onClick: Ge((g) => e.$emit("cell-select", l, f), ["stop"])
          }, nt(s), 15, $p)), [
            [Md, !r.isCellHidden(l, f)]
          ])), 128))
        ]))), 128))
      ], 4)
    ])) : de("", !0),
    t.selected ? (IA(), _A(Nt, { key: 6 }, [
      T("div", {
        class: "resize-handle nw",
        onMousedown: A[6] || (A[6] = Ge((a) => r.startResize("nw"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle ne",
        onMousedown: A[7] || (A[7] = Ge((a) => r.startResize("ne"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle sw",
        onMousedown: A[8] || (A[8] = Ge((a) => r.startResize("sw"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle se",
        onMousedown: A[9] || (A[9] = Ge((a) => r.startResize("se"), ["stop"]))
      }, null, 32)
    ], 64)) : de("", !0)
  ], 38);
}
const Rd = /* @__PURE__ */ vi(Kp, [["render", Jp], ["__scopeId", "data-v-40a8245c"]]), Yp = { class: "data-source-panel" }, Zp = { class: "placeholders-content" }, A2 = { class: "placeholder-categories" }, e2 = ["onClick"], t2 = {
  key: 0,
  class: "category-items"
}, r2 = ["onDragstart", "onClick"], n2 = { class: "item-icon" }, i2 = { class: "item-label" }, a2 = {
  key: 0,
  class: "item-value"
}, o2 = {
  __name: "DataSourcePanel",
  props: {
    placeholders: {
      type: Array,
      default: () => []
    }
  },
  emits: ["add-element"],
  setup(e, { emit: A }) {
    const t = A, r = ye(["👨‍💼 Staff Details", "⚡ Quick Labels"]), n = (s) => {
      const f = r.value.indexOf(s);
      f > -1 ? r.value.splice(f, 1) : r.value.push(s);
    }, i = (s, f) => {
      s.dataTransfer.setData("application/json", JSON.stringify(f));
    }, a = (s) => {
      console.log("Adding placeholder element:", s);
      let f;
      switch (s.type) {
        case "placeholder":
        case "text":
          f = {
            type: "text",
            content: s.content,
            fontSize: 14,
            color: "#000000",
            fontWeight: s.type === "placeholder" ? "normal" : "bold"
          };
          break;
        case "formatted-text":
          f = {
            type: "formatted-text",
            content: s.content,
            format: s.format,
            fontSize: l(s.format),
            color: "#000000",
            fontWeight: ["h1", "h2", "h3", "h4", "h5", "bold"].includes(s.format) ? "bold" : "normal",
            fontStyle: s.format === "italic" ? "italic" : "normal",
            textDecoration: s.format === "underline" ? "underline" : "none"
          };
          break;
        case "image":
        case "image-placeholder":
          f = {
            type: "image",
            content: s.content,
            src: s.content && s.content.startsWith("{{") ? null : "https://via.placeholder.com/150x100"
          };
          break;
        default:
          f = {
            type: "text",
            content: s.content,
            fontSize: 14,
            color: "#000000"
          };
      }
      console.log("Emitting element data:", f), t("add-element", f);
    }, l = (s) => ({
      h1: 32,
      h2: 28,
      h3: 24,
      h4: 20,
      h5: 16,
      p: 14,
      bold: 14,
      italic: 14,
      underline: 14
    })[s] || 14;
    return (s, f) => (IA(), _A("div", Yp, [
      T("div", Zp, [
        T("div", A2, [
          (IA(!0), _A(Nt, null, dr(e.placeholders, (g) => (IA(), _A("div", {
            key: g.name,
            class: "category-section"
          }, [
            T("div", {
              class: "category-header",
              onClick: (p) => n(g.name)
            }, [
              T("i", {
                class: zr(["bi", r.value.includes(g.name) ? "bi-chevron-down" : "bi-chevron-right"])
              }, null, 2),
              le(" " + nt(g.name), 1)
            ], 8, e2),
            r.value.includes(g.name) ? (IA(), _A("div", t2, [
              (IA(!0), _A(Nt, null, dr(g.items, (p) => (IA(), _A("div", {
                key: p.content,
                class: "placeholder-item",
                draggable: "true",
                onDragstart: (w) => i(w, p),
                onClick: (w) => a(p)
              }, [
                T("span", n2, nt(p.icon), 1),
                T("span", i2, nt(p.label), 1),
                p.type === "placeholder" ? (IA(), _A("span", a2, nt(p.content), 1)) : de("", !0)
              ], 40, r2))), 128))
            ])) : de("", !0)
          ]))), 128))
        ])
      ])
    ]));
  }
}, Kd = /* @__PURE__ */ vi(o2, [["__scopeId", "data-v-aaf3a613"]]), s2 = { class: "designer-container" }, l2 = { class: "toolbar" }, u2 = { class: "d-flex justify-content-between align-items-center" }, c2 = { class: "d-flex align-items-center gap-3" }, f2 = {
  class: "btn-group",
  role: "group"
}, h2 = { class: "d-flex align-items-center gap-3" }, d2 = { class: "zoom-controls" }, g2 = { class: "px-2" }, p2 = { class: "form-check" }, B2 = { class: "canvas-area" }, w2 = { class: "sidebar" }, v2 = { class: "nav nav-tabs sidebar-tabs" }, m2 = { class: "nav-item" }, y2 = { class: "nav-item" }, b2 = { class: "nav-item" }, C2 = {
  key: 0,
  class: "sidebar-content p-3"
}, F2 = { class: "component-library" }, Q2 = { class: "component-library" }, U2 = {
  key: 1,
  class: "sidebar-content"
}, E2 = {
  key: 2,
  class: "sidebar-content p-3"
}, x2 = {
  key: 0,
  class: "properties-panel"
}, L2 = { class: "mb-3" }, S2 = { class: "row g-2" }, I2 = { class: "col" }, _2 = { class: "col" }, N2 = { class: "mb-3" }, H2 = { class: "row g-2" }, O2 = { class: "col" }, D2 = { class: "col" }, T2 = {
  key: 0,
  class: "mb-3"
}, k2 = {
  key: 1,
  class: "mb-3"
}, P2 = {
  key: 2,
  class: "mb-3"
}, M2 = {
  key: 3,
  class: "mb-3"
}, R2 = {
  key: 4,
  class: "mb-3"
}, K2 = {
  key: 5,
  class: "mb-3"
}, j2 = {
  key: 6,
  class: "mb-3"
}, G2 = {
  key: 7,
  class: "mb-3"
}, V2 = {
  key: 8,
  class: "mb-3"
}, z2 = {
  key: 9,
  class: "mb-3"
}, q2 = {
  key: 10,
  class: "mb-3"
}, W2 = {
  key: 11,
  class: "mb-3"
}, X2 = {
  key: 12,
  class: "mb-3"
}, $2 = {
  key: 13,
  class: "mb-3"
}, J2 = { key: 14 }, Y2 = { class: "mb-3" }, Z2 = { class: "form-label" }, AB = {
  class: "btn-group w-100",
  role: "group"
}, eB = ["disabled"], tB = { class: "mb-3" }, rB = { class: "form-label" }, nB = {
  class: "btn-group w-100",
  role: "group"
}, iB = ["disabled"], aB = { class: "mb-3" }, oB = { class: "mb-3" }, sB = { class: "mb-3" }, lB = { class: "mb-3" }, uB = { class: "mb-3" }, cB = { class: "mb-3" }, fB = { class: "mb-3" }, hB = { class: "mb-3" }, dB = { class: "mb-3" }, gB = { class: "mb-3" }, pB = { class: "mb-3" }, BB = { class: "table-editor mb-3" }, wB = { class: "d-flex gap-1" }, vB = ["onClick"], mB = ["onUpdate:modelValue", "placeholder"], yB = {
  key: 0,
  class: "mb-3"
}, bB = { class: "alert alert-info py-2" }, CB = {
  class: "btn-group w-100 mb-2",
  role: "group"
}, FB = ["disabled"], QB = ["disabled"], UB = {
  class: "btn-group w-100 mb-2",
  role: "group"
}, EB = ["disabled"], xB = {
  key: 1,
  class: "text-center text-muted"
}, LB = { class: "debug-info" }, SB = { key: 0 }, IB = {
  key: 0,
  class: "no-elements-message"
}, _B = {
  __name: "PtdDesigner",
  props: {
    placeholders: {
      type: Array,
      default: () => []
    },
    loadTemplate: {
      type: Object,
      default: null
    }
  },
  emits: ["template-updated"],
  setup(e, { expose: A, emit: t }) {
    const r = e, n = t, i = ye([]), a = ye(null), l = ye(1), s = ye(!0), f = ye("a4"), g = ye("elements"), p = ye(null);
    let w = 1;
    const d = () => {
      n("template-updated", {
        elements: i.value,
        pageSize: f.value
      });
    }, C = (V) => {
      console.log("Loading template data:", V), console.log("Template elements:", V.elements), V.elements && V.elements.length > 0 ? (i.value = JSON.parse(JSON.stringify(V.elements)), f.value = V.pageSize || "a4", a.value = null, p.value = null, w = Math.max(...i.value.map((B) => B.id), 0) + 1, console.log("Elements loaded:", i.value.length), d()) : console.log("No elements in template or template is empty");
    };
    Rl(() => r.loadTemplate, (V) => {
      console.log("Template prop changed:", V), V && C(V);
    }, { deep: !0, immediate: !0 });
    const b = (V) => {
      console.log("addElement called with type:", V);
      const B = {
        id: w++,
        type: V,
        x: 50,
        y: 50
      };
      let CA;
      switch (V) {
        case "text":
          CA = {
            ...B,
            width: 200,
            height: 40,
            content: "Sample Text",
            fontSize: 16,
            color: "#000000",
            fontWeight: "normal",
            textDirection: "ltr",
            fontFamily: "inherit"
          };
          break;
        case "image":
          CA = {
            ...B,
            width: 150,
            height: 100,
            src: "https://via.placeholder.com/150x100"
          };
          break;
        case "line":
          CA = {
            ...B,
            width: 150,
            height: 2,
            strokeColor: "#000000",
            strokeWidth: 2,
            strokeStyle: "solid"
          };
          break;
        case "rect":
          CA = {
            ...B,
            width: 150,
            height: 100,
            fillColor: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 1,
            strokeStyle: "solid"
          };
          break;
        case "circle":
          CA = {
            ...B,
            width: 100,
            height: 100,
            fillColor: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 1,
            strokeStyle: "solid"
          };
          break;
        case "table":
          CA = {
            ...B,
            width: 300,
            height: 150,
            rows: 3,
            cols: 3,
            cellPadding: 5,
            borderColor: "#000000",
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "#ffffff",
            textColor: "#000000",
            fontSize: 12,
            textAlign: "left",
            verticalAlign: "top",
            textDirection: "ltr",
            fontFamily: "inherit",
            data: Array(3).fill().map(() => Array(3).fill("Cell")),
            mergedCells: {}
            // Format: 'row,col': { colspan: 2, rowspan: 1 }
          };
          break;
        default:
          CA = {
            ...B,
            width: 150,
            height: 40,
            content: "Element",
            fontSize: 14,
            color: "#000000"
          };
      }
      console.log("Adding new element from addElement:", CA), i.value.push(CA), H(CA), d();
    }, _ = (V) => {
      console.log("addDataElement called with:", V);
      const B = {
        id: w++,
        x: 50 + i.value.length * 20,
        y: 50 + i.value.length * 20,
        width: V.type === "image" ? 150 : 200,
        height: V.type === "image" ? 100 : 40,
        ...V
      };
      console.log("Adding new element:", B), i.value.push(B), H(B), g.value = "properties", d();
    }, m = (V) => {
      console.log("Setting sidebar tab to:", V), g.value = V;
    }, y = () => {
      console.log("Test add element clicked");
      const V = {
        id: w++,
        type: "text",
        x: 100,
        y: 100,
        width: 200,
        height: 40,
        content: "Test Element - " + (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        fontSize: 16,
        color: "#007bff",
        fontWeight: "bold"
      };
      console.log("Adding test element:", V), i.value.push(V), H(V), d();
    }, H = (V) => {
      a.value = V, (V == null ? void 0 : V.type) !== "table" && (p.value = null);
    }, O = (V, B) => {
      p.value = { row: V, col: B }, g.value = "properties";
    }, P = () => {
      d();
    }, q = () => {
      a.value && W(a.value.id);
    }, W = (V) => {
      var CA;
      const B = i.value.findIndex((xA) => xA.id === V);
      B > -1 && (i.value.splice(B, 1), ((CA = a.value) == null ? void 0 : CA.id) === V && (a.value = null), d());
    }, D = () => {
      l.value = Math.min(l.value + 0.1, 2);
    }, R = () => {
      l.value = Math.max(l.value - 0.1, 0.1);
    }, Y = (V, B) => {
      console.log("Element drag start:", B), V.dataTransfer.setData("application/json", JSON.stringify(B));
    }, x = (V) => {
      console.log("Adding element from data:", V), _(V);
    }, I = (V) => {
      V.preventDefault();
      let B;
      try {
        const CA = V.dataTransfer.getData("application/json");
        CA && (B = JSON.parse(CA));
      } catch {
        const xA = V.dataTransfer.getData("text/plain");
        xA && (B = { type: xA });
      }
      if (B) {
        const CA = V.currentTarget.getBoundingClientRect(), xA = (V.clientX - CA.left) / l.value, yA = (V.clientY - CA.top) / l.value, $ = {
          ...B,
          id: w++,
          x: Math.max(0, xA - 50),
          y: Math.max(0, yA - 25)
        };
        $.width || ($.width = $.type === "image" ? 150 : 200), $.height || ($.height = $.type === "image" ? 100 : 40);
        const UA = j($);
        i.value.push(UA), H(UA), g.value = "properties", d();
      }
    }, j = (V) => {
      const B = {
        id: V.id,
        x: V.x,
        y: V.y,
        width: V.width,
        height: V.height
      };
      switch (V.type) {
        case "placeholder":
        case "text":
          return {
            ...B,
            type: "text",
            content: V.content || "Sample Text",
            fontSize: V.fontSize || 14,
            color: V.color || "#000000",
            fontWeight: V.fontWeight || "normal",
            textDirection: V.textDirection || "ltr",
            fontFamily: V.fontFamily || "inherit"
          };
        case "formatted-text":
          return {
            ...B,
            type: "formatted-text",
            content: V.content || "Formatted Text",
            format: V.format || "p",
            fontSize: V.fontSize || K(V.format),
            color: V.color || "#000000",
            fontWeight: V.fontWeight || (["h1", "h2", "h3", "h4", "h5", "bold"].includes(V.format) ? "bold" : "normal"),
            fontStyle: V.format === "italic" ? "italic" : "normal",
            textDecoration: V.format === "underline" ? "underline" : "none",
            textDirection: V.textDirection || "ltr",
            fontFamily: V.fontFamily || "inherit"
          };
        case "image":
        case "image-placeholder":
          return {
            ...B,
            type: "image",
            src: V.content && V.content.startsWith("{{") ? null : V.src || "https://via.placeholder.com/150x100",
            placeholder: V.content && V.content.startsWith("{{") ? V.content : null
          };
        case "line":
          return {
            ...B,
            type: "line",
            strokeColor: "#000000",
            strokeWidth: 2,
            strokeStyle: "solid"
          };
        case "rect":
          return {
            ...B,
            type: "rect",
            fillColor: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 1,
            strokeStyle: "solid"
          };
        case "circle":
          return {
            ...B,
            type: "circle",
            fillColor: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 1,
            strokeStyle: "solid"
          };
        case "table":
          return {
            ...B,
            type: "table",
            rows: 3,
            cols: 3,
            cellPadding: 5,
            borderColor: "#000000",
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "#ffffff",
            textColor: "#000000",
            fontSize: 12,
            textAlign: "left",
            verticalAlign: "top",
            textDirection: "ltr",
            fontFamily: "inherit",
            data: Array(3).fill().map(() => Array(3).fill("Cell")),
            mergedCells: {}
          };
        default:
          return {
            ...B,
            type: "text",
            content: V.content || "Element",
            fontSize: 14,
            color: "#000000",
            textDirection: "ltr",
            fontFamily: "inherit"
          };
      }
    }, K = (V) => ({
      h1: 32,
      h2: 28,
      h3: 24,
      h4: 20,
      h5: 16,
      p: 14,
      bold: 14,
      italic: 14,
      underline: 14
    })[V] || 14, nA = (V) => {
      const B = V.target.files[0];
      if (B) {
        const CA = new FileReader();
        CA.onload = (xA) => {
          if (a.value && a.value.type === "image")
            a.value.src = xA.target.result, P();
          else {
            const yA = {
              id: w++,
              type: "image",
              x: 50 + i.value.length * 20,
              y: 50 + i.value.length * 20,
              width: 150,
              height: 100,
              src: xA.target.result
            };
            i.value.push(yA), H(yA), g.value = "properties", d();
          }
        }, CA.readAsDataURL(B), V.target.value = "";
      }
    }, iA = (V) => {
      i.value = V.elements || [], f.value = V.pageSize || "a4", a.value = null, w = Math.max(...i.value.map((B) => B.id), 0) + 1;
    }, cA = () => ({
      elements: i.value,
      pageSize: f.value
    }), oA = () => {
      if (a.value && a.value.type === "table") {
        const V = Array(a.value.cols).fill("Cell");
        a.value.data.push(V), a.value.rows = a.value.data.length, P();
      }
    }, dA = () => {
      a.value && a.value.type === "table" && a.value.rows > 1 && (a.value.data.pop(), a.value.rows = a.value.data.length, P());
    }, pA = () => {
      a.value && a.value.type === "table" && (a.value.data.forEach((V) => {
        V.push("Cell");
      }), a.value.cols = a.value.data[0].length, P());
    }, LA = () => {
      a.value && a.value.type === "table" && a.value.cols > 1 && (a.value.data.forEach((V) => {
        V.pop();
      }), a.value.cols = a.value.data[0].length, P());
    }, E = () => {
      if (a.value && a.value.type === "table") {
        const V = [
          ["Name", "Position", "Department", "Salary"],
          ["John Doe", "Software Engineer", "Engineering", "$95,000"],
          ["Jane Smith", "Marketing Manager", "Marketing", "$75,000"],
          ["Mike Johnson", "Sales Rep", "Sales", "$65,000"]
        ], B = Math.max(a.value.rows, V.length), CA = Math.max(a.value.cols, V[0].length), xA = Array(B).fill().map(
          (yA, $) => Array(CA).fill().map((UA, SA) => V[$] && V[$][SA] ? V[$][SA] : `R${$ + 1}C${SA + 1}`)
        );
        a.value.data = xA, a.value.rows = B, a.value.cols = CA, P();
      }
    }, M = () => {
      a.value && a.value.type === "table" && (a.value.data = a.value.data.map(
        (V, B) => V.map((CA, xA) => `R${B + 1}C${xA + 1}`)
      ), P());
    }, z = (V, B) => {
      p.value = { row: V, col: B };
    }, X = () => {
      p.value = null;
    }, eA = (V, B) => {
      if (!a.value || !a.value.mergedCells) return !1;
      const CA = `${V},${B}`;
      return a.value.mergedCells[CA] && (a.value.mergedCells[CA].colspan > 1 || a.value.mergedCells[CA].rowspan > 1);
    }, sA = (V, B) => {
      if (!a.value || !a.value.mergedCells) return !1;
      for (const [CA, xA] of Object.entries(a.value.mergedCells)) {
        const [yA, $] = CA.split(",").map(Number), { colspan: UA = 1, rowspan: SA = 1 } = xA;
        if ((yA !== V || $ !== B) && V >= yA && V < yA + SA && B >= $ && B < $ + UA)
          return !0;
      }
      return !1;
    }, fA = (V, B) => {
      var xA;
      if (!a.value || !a.value.mergedCells) return 1;
      const CA = `${V},${B}`;
      return ((xA = a.value.mergedCells[CA]) == null ? void 0 : xA.colspan) || 1;
    }, hA = (V, B) => {
      var xA;
      if (!a.value || !a.value.mergedCells) return 1;
      const CA = `${V},${B}`;
      return ((xA = a.value.mergedCells[CA]) == null ? void 0 : xA.rowspan) || 1;
    }, EA = () => {
      if (!p.value || !a.value) return !1;
      const { row: V, col: B } = p.value, CA = B + fA(V, B);
      return CA < a.value.cols && !eA(V, CA) && !sA(V, CA);
    }, QA = () => {
      if (!p.value || !a.value) return !1;
      const { row: V, col: B } = p.value, CA = V + hA(V, B);
      return CA < a.value.rows && !eA(CA, B) && !sA(CA, B);
    }, OA = () => {
      if (!EA()) return;
      a.value.mergedCells || (a.value.mergedCells = {});
      const { row: V, col: B } = p.value, CA = `${V},${B}`;
      a.value.mergedCells[CA] || (a.value.mergedCells[CA] = { colspan: 1, rowspan: 1 }), a.value.mergedCells[CA].colspan += 1, P();
    }, HA = () => {
      if (!QA()) return;
      a.value.mergedCells || (a.value.mergedCells = {});
      const { row: V, col: B } = p.value, CA = `${V},${B}`;
      a.value.mergedCells[CA] || (a.value.mergedCells[CA] = { colspan: 1, rowspan: 1 }), a.value.mergedCells[CA].rowspan += 1, P();
    }, zA = () => {
      if (!p.value || !a.value || !a.value.mergedCells) return;
      const { row: V, col: B } = p.value, CA = `${V},${B}`;
      a.value.mergedCells[CA] && (delete a.value.mergedCells[CA], P());
    };
    return A({
      loadTemplate: iA,
      getTemplate: cA
    }), (V, B) => {
      var CA, xA, yA;
      return IA(), _A("div", s2, [
        T("div", l2, [
          T("div", u2, [
            T("div", c2, [
              B[72] || (B[72] = T("h5", { class: "mb-0" }, "Print Template Designer", -1)),
              T("div", f2, [
                T("button", {
                  type: "button",
                  class: "btn btn-outline-primary btn-sm",
                  onClick: B[0] || (B[0] = ($) => b("text"))
                }, B[68] || (B[68] = [
                  T("i", { class: "bi bi-type" }, null, -1),
                  le(" Text ", -1)
                ])),
                T("button", {
                  type: "button",
                  class: "btn btn-outline-primary btn-sm",
                  onClick: B[1] || (B[1] = ($) => b("image"))
                }, B[69] || (B[69] = [
                  T("i", { class: "bi bi-image" }, null, -1),
                  le(" Image ", -1)
                ])),
                B[71] || (B[71] = T("label", {
                  class: "btn btn-outline-success btn-sm",
                  for: "imageUpload"
                }, [
                  T("i", { class: "bi bi-upload" }),
                  le(" Upload Image ")
                ], -1)),
                T("input", {
                  type: "file",
                  id: "imageUpload",
                  accept: "image/*",
                  onChange: nA,
                  style: { display: "none" }
                }, null, 32),
                T("button", {
                  type: "button",
                  class: "btn btn-outline-success btn-sm",
                  onClick: y
                }, [
                  B[70] || (B[70] = T("i", { class: "bi bi-plus" }, null, -1)),
                  le(" Test (" + nt(i.value.length) + ") ", 1)
                ])
              ])
            ]),
            T("div", h2, [
              T("div", d2, [
                T("button", {
                  class: "btn btn-sm btn-outline-secondary",
                  onClick: R
                }, B[73] || (B[73] = [
                  T("i", { class: "bi bi-zoom-out" }, null, -1)
                ])),
                T("span", g2, nt(Math.round(l.value * 100)) + "%", 1),
                T("button", {
                  class: "btn btn-sm btn-outline-secondary",
                  onClick: D
                }, B[74] || (B[74] = [
                  T("i", { class: "bi bi-zoom-in" }, null, -1)
                ]))
              ]),
              T("div", p2, [
                ue(T("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  id: "gridToggle",
                  "onUpdate:modelValue": B[2] || (B[2] = ($) => s.value = $)
                }, null, 512), [
                  [Pp, s.value]
                ]),
                B[75] || (B[75] = T("label", {
                  class: "form-check-label",
                  for: "gridToggle"
                }, " Grid ", -1))
              ]),
              ue(T("select", {
                class: "form-select form-select-sm",
                "onUpdate:modelValue": B[3] || (B[3] = ($) => f.value = $),
                style: { width: "auto" }
              }, B[76] || (B[76] = [
                T("option", { value: "a4" }, "A4", -1),
                T("option", { value: "letter" }, "Letter", -1)
              ]), 512), [
                [sr, f.value]
              ])
            ])
          ])
        ]),
        T("div", B2, [
          T("div", w2, [
            T("ul", v2, [
              T("li", m2, [
                T("button", {
                  class: zr(["nav-link", { active: g.value === "elements" }]),
                  onClick: B[4] || (B[4] = ($) => m("elements")),
                  type: "button",
                  title: "Elements"
                }, B[77] || (B[77] = [
                  T("i", { class: "bi bi-collection" }, null, -1),
                  T("span", { class: "tab-label" }, "Elements", -1)
                ]), 2)
              ]),
              T("li", y2, [
                T("button", {
                  class: zr(["nav-link", { active: g.value === "data" }]),
                  onClick: B[5] || (B[5] = ($) => m("data")),
                  type: "button",
                  title: "Data Sources"
                }, B[78] || (B[78] = [
                  T("i", { class: "bi bi-database" }, null, -1),
                  T("span", { class: "tab-label" }, "Data", -1)
                ]), 2)
              ]),
              T("li", b2, [
                T("button", {
                  class: zr(["nav-link", { active: g.value === "properties" }]),
                  onClick: B[6] || (B[6] = ($) => m("properties")),
                  type: "button",
                  title: "Properties"
                }, B[79] || (B[79] = [
                  T("i", { class: "bi bi-sliders" }, null, -1),
                  T("span", { class: "tab-label" }, "Properties", -1)
                ]), 2)
              ])
            ]),
            g.value === "elements" ? (IA(), _A("div", C2, [
              B[96] || (B[96] = T("h6", null, "Basic Elements", -1)),
              T("div", F2, [
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[7] || (B[7] = ($) => Y($, { type: "text", content: "Sample Text", fontSize: 16, color: "#000000" })),
                  onClick: B[8] || (B[8] = ($) => x({ type: "text", content: "Sample Text", fontSize: 16, color: "#000000" }))
                }, B[80] || (B[80] = [
                  T("i", { class: "bi bi-type me-2" }, null, -1),
                  le(" Text Field ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[9] || (B[9] = ($) => Y($, { type: "image", src: "https://via.placeholder.com/150x100" })),
                  onClick: B[10] || (B[10] = ($) => x({ type: "image", src: "https://via.placeholder.com/150x100" }))
                }, B[81] || (B[81] = [
                  T("i", { class: "bi bi-image me-2" }, null, -1),
                  le(" Image Field ", -1)
                ]), 32),
                B[86] || (B[86] = T("label", {
                  class: "component-item",
                  for: "sidebarImageUpload",
                  style: { cursor: "pointer" }
                }, [
                  T("i", { class: "bi bi-upload me-2" }),
                  le(" Upload Image ")
                ], -1)),
                T("input", {
                  type: "file",
                  id: "sidebarImageUpload",
                  accept: "image/*",
                  onChange: nA,
                  style: { display: "none" }
                }, null, 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[11] || (B[11] = ($) => Y($, { type: "line", strokeColor: "#000000", strokeWidth: 2, strokeStyle: "solid" })),
                  onClick: B[12] || (B[12] = ($) => x({ type: "line", strokeColor: "#000000", strokeWidth: 2, strokeStyle: "solid" }))
                }, B[82] || (B[82] = [
                  T("i", { class: "bi bi-slash-lg me-2" }, null, -1),
                  le(" Line ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[13] || (B[13] = ($) => Y($, { type: "rect", fillColor: "#ffffff", strokeColor: "#000000", strokeWidth: 1, strokeStyle: "solid" })),
                  onClick: B[14] || (B[14] = ($) => x({ type: "rect", fillColor: "#ffffff", strokeColor: "#000000", strokeWidth: 1, strokeStyle: "solid" }))
                }, B[83] || (B[83] = [
                  T("i", { class: "bi bi-square me-2" }, null, -1),
                  le(" Rectangle ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[15] || (B[15] = ($) => Y($, { type: "circle", fillColor: "#ffffff", strokeColor: "#000000", strokeWidth: 1, strokeStyle: "solid" })),
                  onClick: B[16] || (B[16] = ($) => x({ type: "circle", fillColor: "#ffffff", strokeColor: "#000000", strokeWidth: 1, strokeStyle: "solid" }))
                }, B[84] || (B[84] = [
                  T("i", { class: "bi bi-circle me-2" }, null, -1),
                  le(" Circle ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[17] || (B[17] = ($) => Y($, { type: "table", rows: 3, cols: 3, borderStyle: "solid", data: [["Cell 1", "Cell 2", "Cell 3"], ["Cell 4", "Cell 5", "Cell 6"], ["Cell 7", "Cell 8", "Cell 9"]] })),
                  onClick: B[18] || (B[18] = ($) => x({ type: "table", rows: 3, cols: 3, borderStyle: "solid", data: [["Cell 1", "Cell 2", "Cell 3"], ["Cell 4", "Cell 5", "Cell 6"], ["Cell 7", "Cell 8", "Cell 9"]] }))
                }, B[85] || (B[85] = [
                  T("i", { class: "bi bi-table me-2" }, null, -1),
                  le(" Table ", -1)
                ]), 32)
              ]),
              B[97] || (B[97] = T("h6", { class: "mt-4" }, "✨ Text Styles", -1)),
              T("div", Q2, [
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[19] || (B[19] = ($) => Y($, { type: "formatted-text", content: "Main Title", format: "h1", fontSize: 32, fontWeight: "bold" })),
                  onClick: B[20] || (B[20] = ($) => x({ type: "formatted-text", content: "Main Title", format: "h1", fontSize: 32, fontWeight: "bold" }))
                }, B[87] || (B[87] = [
                  T("span", { class: "item-icon" }, "H1", -1),
                  le(" Heading 1 (H1) ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[21] || (B[21] = ($) => Y($, { type: "formatted-text", content: "Section Title", format: "h2", fontSize: 28, fontWeight: "bold" })),
                  onClick: B[22] || (B[22] = ($) => x({ type: "formatted-text", content: "Section Title", format: "h2", fontSize: 28, fontWeight: "bold" }))
                }, B[88] || (B[88] = [
                  T("span", { class: "item-icon" }, "H2", -1),
                  le(" Heading 2 (H2) ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[23] || (B[23] = ($) => Y($, { type: "formatted-text", content: "Subsection Title", format: "h3", fontSize: 24, fontWeight: "bold" })),
                  onClick: B[24] || (B[24] = ($) => x({ type: "formatted-text", content: "Subsection Title", format: "h3", fontSize: 24, fontWeight: "bold" }))
                }, B[89] || (B[89] = [
                  T("span", { class: "item-icon" }, "H3", -1),
                  le(" Heading 3 (H3) ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[25] || (B[25] = ($) => Y($, { type: "formatted-text", content: "Minor Heading", format: "h4", fontSize: 20, fontWeight: "bold" })),
                  onClick: B[26] || (B[26] = ($) => x({ type: "formatted-text", content: "Minor Heading", format: "h4", fontSize: 20, fontWeight: "bold" }))
                }, B[90] || (B[90] = [
                  T("span", { class: "item-icon" }, "H4", -1),
                  le(" Heading 4 (H4) ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[27] || (B[27] = ($) => Y($, { type: "formatted-text", content: "Small Heading", format: "h5", fontSize: 16, fontWeight: "bold" })),
                  onClick: B[28] || (B[28] = ($) => x({ type: "formatted-text", content: "Small Heading", format: "h5", fontSize: 16, fontWeight: "bold" }))
                }, B[91] || (B[91] = [
                  T("span", { class: "item-icon" }, "H5", -1),
                  le(" Heading 5 (H5) ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[29] || (B[29] = ($) => Y($, { type: "formatted-text", content: "Regular paragraph text", format: "p", fontSize: 14, fontWeight: "normal" })),
                  onClick: B[30] || (B[30] = ($) => x({ type: "formatted-text", content: "Regular paragraph text", format: "p", fontSize: 14, fontWeight: "normal" }))
                }, B[92] || (B[92] = [
                  T("span", { class: "item-icon" }, "P", -1),
                  le(" Paragraph (P) ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[31] || (B[31] = ($) => Y($, { type: "formatted-text", content: "Important Note", format: "bold", fontSize: 14, fontWeight: "bold" })),
                  onClick: B[32] || (B[32] = ($) => x({ type: "formatted-text", content: "Important Note", format: "bold", fontSize: 14, fontWeight: "bold" }))
                }, B[93] || (B[93] = [
                  T("span", { class: "item-icon" }, "B", -1),
                  le(" Bold Text ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[33] || (B[33] = ($) => Y($, { type: "formatted-text", content: "Emphasized text", format: "italic", fontSize: 14, fontStyle: "italic" })),
                  onClick: B[34] || (B[34] = ($) => x({ type: "formatted-text", content: "Emphasized text", format: "italic", fontSize: 14, fontStyle: "italic" }))
                }, B[94] || (B[94] = [
                  T("span", { class: "item-icon" }, "I", -1),
                  le(" Italic Text ", -1)
                ]), 32),
                T("div", {
                  class: "component-item",
                  draggable: "true",
                  onDragstart: B[35] || (B[35] = ($) => Y($, { type: "formatted-text", content: "Underlined text", format: "underline", fontSize: 14, textDecoration: "underline" })),
                  onClick: B[36] || (B[36] = ($) => x({ type: "formatted-text", content: "Underlined text", format: "underline", fontSize: 14, textDecoration: "underline" }))
                }, B[95] || (B[95] = [
                  T("span", { class: "item-icon" }, "U", -1),
                  le(" Underlined Text ", -1)
                ]), 32)
              ])
            ])) : de("", !0),
            g.value === "data" ? (IA(), _A("div", U2, [
              Mp(Kd, {
                placeholders: e.placeholders,
                onAddElement: _
              }, null, 8, ["placeholders"])
            ])) : de("", !0),
            g.value === "properties" ? (IA(), _A("div", E2, [
              a.value ? (IA(), _A("div", x2, [
                B[150] || (B[150] = T("h6", null, "Properties", -1)),
                T("div", L2, [
                  B[98] || (B[98] = T("label", { class: "form-label" }, "Position", -1)),
                  T("div", S2, [
                    T("div", I2, [
                      ue(T("input", {
                        type: "number",
                        class: "form-control form-control-sm",
                        placeholder: "X",
                        "onUpdate:modelValue": B[37] || (B[37] = ($) => a.value.x = $),
                        onInput: P
                      }, null, 544), [
                        [
                          rt,
                          a.value.x,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    T("div", _2, [
                      ue(T("input", {
                        type: "number",
                        class: "form-control form-control-sm",
                        placeholder: "Y",
                        "onUpdate:modelValue": B[38] || (B[38] = ($) => a.value.y = $),
                        onInput: P
                      }, null, 544), [
                        [
                          rt,
                          a.value.y,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ])
                  ])
                ]),
                T("div", N2, [
                  B[99] || (B[99] = T("label", { class: "form-label" }, "Size", -1)),
                  T("div", H2, [
                    T("div", O2, [
                      ue(T("input", {
                        type: "number",
                        class: "form-control form-control-sm",
                        placeholder: "Width",
                        "onUpdate:modelValue": B[39] || (B[39] = ($) => a.value.width = $),
                        onInput: P
                      }, null, 544), [
                        [
                          rt,
                          a.value.width,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    T("div", D2, [
                      ue(T("input", {
                        type: "number",
                        class: "form-control form-control-sm",
                        placeholder: "Height",
                        "onUpdate:modelValue": B[40] || (B[40] = ($) => a.value.height = $),
                        onInput: P
                      }, null, 544), [
                        [
                          rt,
                          a.value.height,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ])
                  ])
                ]),
                a.value.type === "text" || a.value.type === "formatted-text" ? (IA(), _A("div", T2, [
                  B[100] || (B[100] = T("label", { class: "form-label" }, "Text Content", -1)),
                  ue(T("textarea", {
                    class: "form-control form-control-sm",
                    rows: "3",
                    "onUpdate:modelValue": B[41] || (B[41] = ($) => a.value.content = $),
                    onInput: P
                  }, null, 544), [
                    [rt, a.value.content]
                  ])
                ])) : de("", !0),
                a.value.type === "text" || a.value.type === "formatted-text" ? (IA(), _A("div", k2, [
                  B[101] || (B[101] = T("label", { class: "form-label" }, "Font Size", -1)),
                  ue(T("input", {
                    type: "number",
                    class: "form-control form-control-sm",
                    "onUpdate:modelValue": B[42] || (B[42] = ($) => a.value.fontSize = $),
                    onInput: P
                  }, null, 544), [
                    [
                      rt,
                      a.value.fontSize,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ])) : de("", !0),
                a.value.type === "text" || a.value.type === "formatted-text" ? (IA(), _A("div", P2, [
                  B[103] || (B[103] = T("label", { class: "form-label" }, "Font Weight", -1)),
                  ue(T("select", {
                    class: "form-select form-select-sm",
                    "onUpdate:modelValue": B[43] || (B[43] = ($) => a.value.fontWeight = $),
                    onChange: P
                  }, B[102] || (B[102] = [
                    T("option", { value: "normal" }, "Normal", -1),
                    T("option", { value: "bold" }, "Bold", -1),
                    T("option", { value: "lighter" }, "Light", -1)
                  ]), 544), [
                    [sr, a.value.fontWeight]
                  ])
                ])) : de("", !0),
                a.value.type === "text" || a.value.type === "formatted-text" ? (IA(), _A("div", M2, [
                  B[104] || (B[104] = T("label", { class: "form-label" }, "Color", -1)),
                  ue(T("input", {
                    type: "color",
                    class: "form-control form-control-color form-control-sm",
                    "onUpdate:modelValue": B[44] || (B[44] = ($) => a.value.color = $),
                    onInput: P
                  }, null, 544), [
                    [rt, a.value.color]
                  ])
                ])) : de("", !0),
                a.value.type === "text" || a.value.type === "formatted-text" ? (IA(), _A("div", R2, [
                  B[106] || (B[106] = T("label", { class: "form-label" }, "Text Direction", -1)),
                  ue(T("select", {
                    class: "form-select form-select-sm",
                    "onUpdate:modelValue": B[45] || (B[45] = ($) => a.value.textDirection = $),
                    onChange: P
                  }, B[105] || (B[105] = [
                    T("option", { value: "ltr" }, "Left to Right (LTR)", -1),
                    T("option", { value: "rtl" }, "Right to Left (RTL)", -1)
                  ]), 544), [
                    [sr, a.value.textDirection]
                  ])
                ])) : de("", !0),
                a.value.type === "text" || a.value.type === "formatted-text" ? (IA(), _A("div", K2, [
                  B[108] || (B[108] = T("label", { class: "form-label" }, "Font Family", -1)),
                  ue(T("select", {
                    class: "form-select form-select-sm",
                    "onUpdate:modelValue": B[46] || (B[46] = ($) => a.value.fontFamily = $),
                    onChange: P
                  }, B[107] || (B[107] = [
                    A0('<option value="inherit" data-v-02d5cd0e>Default</option><option value="Arial, sans-serif" data-v-02d5cd0e>Arial</option><option value="&#39;Helvetica Neue&#39;, sans-serif" data-v-02d5cd0e>Helvetica</option><option value="&#39;Times New Roman&#39;, serif" data-v-02d5cd0e>Times New Roman</option><option value="Georgia, serif" data-v-02d5cd0e>Georgia</option><option value="&#39;Courier New&#39;, monospace" data-v-02d5cd0e>Courier New</option><option value="Roboto, sans-serif" data-v-02d5cd0e>Roboto</option><option value="&#39;Open Sans&#39;, sans-serif" data-v-02d5cd0e>Open Sans</option><option value="Lato, sans-serif" data-v-02d5cd0e>Lato</option><option value="Montserrat, sans-serif" data-v-02d5cd0e>Montserrat</option><option value="Tahoma, sans-serif" data-v-02d5cd0e>Tahoma</option><option value="Verdana, sans-serif" data-v-02d5cd0e>Verdana</option><option value="&#39;Segoe UI&#39;, sans-serif" data-v-02d5cd0e>Segoe UI</option><optgroup label="Arabic Fonts" data-v-02d5cd0e><option value="Tajawal, sans-serif" data-v-02d5cd0e>Tajawal</option><option value="Cairo, sans-serif" data-v-02d5cd0e>Cairo</option><option value="&#39;Noto Sans Arabic&#39;, sans-serif" data-v-02d5cd0e>Noto Sans Arabic</option><option value="&#39;IBM Plex Sans Arabic&#39;, sans-serif" data-v-02d5cd0e>IBM Plex Sans Arabic</option><option value="Amiri, serif" data-v-02d5cd0e>Amiri</option></optgroup>', 14)
                  ]), 544), [
                    [sr, a.value.fontFamily]
                  ])
                ])) : de("", !0),
                a.value.type === "image" ? (IA(), _A("div", j2, [
                  B[109] || (B[109] = T("label", { class: "form-label" }, "Image", -1)),
                  T("input", {
                    type: "file",
                    class: "form-control form-control-sm",
                    accept: "image/*",
                    onChange: nA
                  }, null, 32)
                ])) : de("", !0),
                a.value.type === "line" ? (IA(), _A("div", G2, [
                  B[110] || (B[110] = T("label", { class: "form-label" }, "Line Color", -1)),
                  ue(T("input", {
                    type: "color",
                    class: "form-control form-control-color form-control-sm",
                    "onUpdate:modelValue": B[47] || (B[47] = ($) => a.value.strokeColor = $),
                    onInput: P
                  }, null, 544), [
                    [rt, a.value.strokeColor]
                  ])
                ])) : de("", !0),
                a.value.type === "line" ? (IA(), _A("div", V2, [
                  B[111] || (B[111] = T("label", { class: "form-label" }, "Line Width", -1)),
                  ue(T("input", {
                    type: "number",
                    class: "form-control form-control-sm",
                    min: "1",
                    "onUpdate:modelValue": B[48] || (B[48] = ($) => a.value.strokeWidth = $),
                    onInput: P
                  }, null, 544), [
                    [
                      rt,
                      a.value.strokeWidth,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ])) : de("", !0),
                a.value.type === "line" ? (IA(), _A("div", z2, [
                  B[113] || (B[113] = T("label", { class: "form-label" }, "Line Style", -1)),
                  ue(T("select", {
                    class: "form-select form-select-sm",
                    "onUpdate:modelValue": B[49] || (B[49] = ($) => a.value.strokeStyle = $),
                    onChange: P
                  }, B[112] || (B[112] = [
                    T("option", { value: "solid" }, "Solid", -1),
                    T("option", { value: "dashed" }, "Dashed", -1),
                    T("option", { value: "dotted" }, "Dotted", -1)
                  ]), 544), [
                    [sr, a.value.strokeStyle]
                  ])
                ])) : de("", !0),
                a.value.type === "rect" || a.value.type === "circle" ? (IA(), _A("div", q2, [
                  B[114] || (B[114] = T("label", { class: "form-label" }, "Fill Color", -1)),
                  ue(T("input", {
                    type: "color",
                    class: "form-control form-control-color form-control-sm",
                    "onUpdate:modelValue": B[50] || (B[50] = ($) => a.value.fillColor = $),
                    onInput: P
                  }, null, 544), [
                    [rt, a.value.fillColor]
                  ])
                ])) : de("", !0),
                a.value.type === "rect" || a.value.type === "circle" ? (IA(), _A("div", W2, [
                  B[115] || (B[115] = T("label", { class: "form-label" }, "Border Color", -1)),
                  ue(T("input", {
                    type: "color",
                    class: "form-control form-control-color form-control-sm",
                    "onUpdate:modelValue": B[51] || (B[51] = ($) => a.value.strokeColor = $),
                    onInput: P
                  }, null, 544), [
                    [rt, a.value.strokeColor]
                  ])
                ])) : de("", !0),
                a.value.type === "rect" || a.value.type === "circle" ? (IA(), _A("div", X2, [
                  B[116] || (B[116] = T("label", { class: "form-label" }, "Border Width", -1)),
                  ue(T("input", {
                    type: "number",
                    class: "form-control form-control-sm",
                    min: "0",
                    "onUpdate:modelValue": B[52] || (B[52] = ($) => a.value.strokeWidth = $),
                    onInput: P
                  }, null, 544), [
                    [
                      rt,
                      a.value.strokeWidth,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ])) : de("", !0),
                a.value.type === "rect" || a.value.type === "circle" ? (IA(), _A("div", $2, [
                  B[118] || (B[118] = T("label", { class: "form-label" }, "Border Style", -1)),
                  ue(T("select", {
                    class: "form-select form-select-sm",
                    "onUpdate:modelValue": B[53] || (B[53] = ($) => a.value.strokeStyle = $),
                    onChange: P
                  }, B[117] || (B[117] = [
                    T("option", { value: "solid" }, "Solid", -1),
                    T("option", { value: "dashed" }, "Dashed", -1),
                    T("option", { value: "dotted" }, "Dotted", -1)
                  ]), 544), [
                    [sr, a.value.strokeStyle]
                  ])
                ])) : de("", !0),
                a.value.type === "table" ? (IA(), _A("div", J2, [
                  B[146] || (B[146] = T("h6", { class: "mb-3" }, "Table Structure", -1)),
                  T("div", Y2, [
                    T("label", Z2, "Rows: " + nt(a.value.rows), 1),
                    T("div", AB, [
                      T("button", {
                        class: "btn btn-outline-secondary btn-sm",
                        onClick: dA,
                        disabled: a.value.rows <= 1
                      }, B[119] || (B[119] = [
                        T("i", { class: "bi bi-dash" }, null, -1),
                        le(" Remove Row ", -1)
                      ]), 8, eB),
                      T("button", {
                        class: "btn btn-outline-primary btn-sm",
                        onClick: oA
                      }, B[120] || (B[120] = [
                        T("i", { class: "bi bi-plus" }, null, -1),
                        le(" Add Row ", -1)
                      ]))
                    ])
                  ]),
                  T("div", tB, [
                    T("label", rB, "Columns: " + nt(a.value.cols), 1),
                    T("div", nB, [
                      T("button", {
                        class: "btn btn-outline-secondary btn-sm",
                        onClick: LA,
                        disabled: a.value.cols <= 1
                      }, B[121] || (B[121] = [
                        T("i", { class: "bi bi-dash" }, null, -1),
                        le(" Remove Column ", -1)
                      ]), 8, iB),
                      T("button", {
                        class: "btn btn-outline-primary btn-sm",
                        onClick: pA
                      }, B[122] || (B[122] = [
                        T("i", { class: "bi bi-plus" }, null, -1),
                        le(" Add Column ", -1)
                      ]))
                    ])
                  ]),
                  B[147] || (B[147] = T("h6", { class: "mb-3" }, "Table Styling", -1)),
                  T("div", aB, [
                    B[123] || (B[123] = T("label", { class: "form-label" }, "Border Color", -1)),
                    ue(T("input", {
                      type: "color",
                      class: "form-control form-control-color form-control-sm",
                      "onUpdate:modelValue": B[54] || (B[54] = ($) => a.value.borderColor = $),
                      onInput: P
                    }, null, 544), [
                      [rt, a.value.borderColor]
                    ])
                  ]),
                  T("div", oB, [
                    B[124] || (B[124] = T("label", { class: "form-label" }, "Border Width", -1)),
                    ue(T("input", {
                      type: "number",
                      class: "form-control form-control-sm",
                      min: "0",
                      "onUpdate:modelValue": B[55] || (B[55] = ($) => a.value.borderWidth = $),
                      onInput: P
                    }, null, 544), [
                      [
                        rt,
                        a.value.borderWidth,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ]),
                  T("div", sB, [
                    B[126] || (B[126] = T("label", { class: "form-label" }, "Border Style", -1)),
                    ue(T("select", {
                      class: "form-select form-select-sm",
                      "onUpdate:modelValue": B[56] || (B[56] = ($) => a.value.borderStyle = $),
                      onChange: P
                    }, B[125] || (B[125] = [
                      T("option", { value: "solid" }, "Solid", -1),
                      T("option", { value: "dashed" }, "Dashed", -1),
                      T("option", { value: "dotted" }, "Dotted", -1)
                    ]), 544), [
                      [sr, a.value.borderStyle]
                    ])
                  ]),
                  T("div", lB, [
                    B[127] || (B[127] = T("label", { class: "form-label" }, "Cell Padding", -1)),
                    ue(T("input", {
                      type: "number",
                      class: "form-control form-control-sm",
                      min: "0",
                      "onUpdate:modelValue": B[57] || (B[57] = ($) => a.value.cellPadding = $),
                      onInput: P
                    }, null, 544), [
                      [
                        rt,
                        a.value.cellPadding,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ]),
                  T("div", uB, [
                    B[128] || (B[128] = T("label", { class: "form-label" }, "Background Color", -1)),
                    ue(T("input", {
                      type: "color",
                      class: "form-control form-control-color form-control-sm",
                      "onUpdate:modelValue": B[58] || (B[58] = ($) => a.value.backgroundColor = $),
                      onInput: P
                    }, null, 544), [
                      [rt, a.value.backgroundColor]
                    ])
                  ]),
                  T("div", cB, [
                    B[129] || (B[129] = T("label", { class: "form-label" }, "Text Color", -1)),
                    ue(T("input", {
                      type: "color",
                      class: "form-control form-control-color form-control-sm",
                      "onUpdate:modelValue": B[59] || (B[59] = ($) => a.value.textColor = $),
                      onInput: P
                    }, null, 544), [
                      [rt, a.value.textColor]
                    ])
                  ]),
                  T("div", fB, [
                    B[130] || (B[130] = T("label", { class: "form-label" }, "Font Size", -1)),
                    ue(T("input", {
                      type: "number",
                      class: "form-control form-control-sm",
                      min: "8",
                      max: "72",
                      "onUpdate:modelValue": B[60] || (B[60] = ($) => a.value.fontSize = $),
                      onInput: P
                    }, null, 544), [
                      [
                        rt,
                        a.value.fontSize,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ]),
                  T("div", hB, [
                    B[132] || (B[132] = T("label", { class: "form-label" }, "Text Alignment", -1)),
                    ue(T("select", {
                      class: "form-select form-select-sm",
                      "onUpdate:modelValue": B[61] || (B[61] = ($) => a.value.textAlign = $),
                      onChange: P
                    }, B[131] || (B[131] = [
                      T("option", { value: "left" }, "Left", -1),
                      T("option", { value: "center" }, "Center", -1),
                      T("option", { value: "right" }, "Right", -1)
                    ]), 544), [
                      [sr, a.value.textAlign]
                    ])
                  ]),
                  T("div", dB, [
                    B[134] || (B[134] = T("label", { class: "form-label" }, "Text Direction", -1)),
                    ue(T("select", {
                      class: "form-select form-select-sm",
                      "onUpdate:modelValue": B[62] || (B[62] = ($) => a.value.textDirection = $),
                      onChange: P
                    }, B[133] || (B[133] = [
                      T("option", { value: "ltr" }, "Left to Right (LTR)", -1),
                      T("option", { value: "rtl" }, "Right to Left (RTL)", -1)
                    ]), 544), [
                      [sr, a.value.textDirection]
                    ])
                  ]),
                  T("div", gB, [
                    B[136] || (B[136] = T("label", { class: "form-label" }, "Font Family", -1)),
                    ue(T("select", {
                      class: "form-select form-select-sm",
                      "onUpdate:modelValue": B[63] || (B[63] = ($) => a.value.fontFamily = $),
                      onChange: P
                    }, B[135] || (B[135] = [
                      A0('<option value="inherit" data-v-02d5cd0e>Default</option><option value="Arial, sans-serif" data-v-02d5cd0e>Arial</option><option value="&#39;Helvetica Neue&#39;, sans-serif" data-v-02d5cd0e>Helvetica</option><option value="&#39;Times New Roman&#39;, serif" data-v-02d5cd0e>Times New Roman</option><option value="Georgia, serif" data-v-02d5cd0e>Georgia</option><option value="&#39;Courier New&#39;, monospace" data-v-02d5cd0e>Courier New</option><option value="Roboto, sans-serif" data-v-02d5cd0e>Roboto</option><option value="&#39;Open Sans&#39;, sans-serif" data-v-02d5cd0e>Open Sans</option><option value="Lato, sans-serif" data-v-02d5cd0e>Lato</option><option value="Montserrat, sans-serif" data-v-02d5cd0e>Montserrat</option><option value="Tahoma, sans-serif" data-v-02d5cd0e>Tahoma</option><option value="Verdana, sans-serif" data-v-02d5cd0e>Verdana</option><option value="&#39;Segoe UI&#39;, sans-serif" data-v-02d5cd0e>Segoe UI</option><optgroup label="Arabic Fonts" data-v-02d5cd0e><option value="Tajawal, sans-serif" data-v-02d5cd0e>Tajawal</option><option value="Cairo, sans-serif" data-v-02d5cd0e>Cairo</option><option value="&#39;Noto Sans Arabic&#39;, sans-serif" data-v-02d5cd0e>Noto Sans Arabic</option><option value="&#39;IBM Plex Sans Arabic&#39;, sans-serif" data-v-02d5cd0e>IBM Plex Sans Arabic</option><option value="Amiri, serif" data-v-02d5cd0e>Amiri</option></optgroup>', 14)
                    ]), 544), [
                      [sr, a.value.fontFamily]
                    ])
                  ]),
                  T("div", pB, [
                    B[138] || (B[138] = T("label", { class: "form-label" }, "Vertical Alignment", -1)),
                    ue(T("select", {
                      class: "form-select form-select-sm",
                      "onUpdate:modelValue": B[64] || (B[64] = ($) => a.value.verticalAlign = $),
                      onChange: P
                    }, B[137] || (B[137] = [
                      T("option", { value: "top" }, "Top", -1),
                      T("option", { value: "middle" }, "Middle", -1),
                      T("option", { value: "bottom" }, "Bottom", -1)
                    ]), 544), [
                      [sr, a.value.verticalAlign]
                    ])
                  ]),
                  B[148] || (B[148] = T("h6", { class: "mb-3" }, "Table Data & Cell Merge", -1)),
                  T("div", BB, [
                    (IA(!0), _A(Nt, null, dr(a.value.data, ($, UA) => (IA(), _A("div", {
                      key: UA,
                      class: "table-row mb-1"
                    }, [
                      T("div", wB, [
                        (IA(!0), _A(Nt, null, dr($, (SA, KA) => ue((IA(), _A("div", {
                          key: KA,
                          class: zr(["cell-container", {
                            "selected-cell": p.value && p.value.row === UA && p.value.col === KA,
                            "merged-cell": eA(UA, KA)
                          }]),
                          onClick: ($A) => z(UA, KA)
                        }, [
                          ue(T("input", {
                            type: "text",
                            class: "form-control form-control-sm cell-input",
                            "onUpdate:modelValue": ($A) => a.value.data[UA][KA] = $A,
                            onInput: P,
                            onClick: B[65] || (B[65] = Ge(() => {
                            }, ["stop"])),
                            placeholder: `R${UA + 1}C${KA + 1}`,
                            style: Be({
                              gridColumn: `span ${fA(UA, KA)}`,
                              gridRow: `span ${hA(UA, KA)}`
                            })
                          }, null, 44, mB), [
                            [rt, a.value.data[UA][KA]]
                          ])
                        ], 10, vB)), [
                          [Md, !sA(UA, KA)]
                        ])), 128))
                      ])
                    ]))), 128))
                  ]),
                  p.value ? (IA(), _A("div", yB, [
                    T("div", bB, [
                      T("small", null, [
                        B[139] || (B[139] = T("strong", null, "Selected:", -1)),
                        le(" Row " + nt(p.value.row + 1) + ", Column " + nt(p.value.col + 1), 1)
                      ])
                    ]),
                    T("div", CB, [
                      T("button", {
                        class: "btn btn-outline-primary btn-sm",
                        onClick: OA,
                        disabled: !EA(),
                        title: "Merge with right cell"
                      }, B[140] || (B[140] = [
                        T("i", { class: "bi bi-arrow-right" }, null, -1),
                        le(" Merge Right ", -1)
                      ]), 8, FB),
                      T("button", {
                        class: "btn btn-outline-primary btn-sm",
                        onClick: HA,
                        disabled: !QA(),
                        title: "Merge with cell below"
                      }, B[141] || (B[141] = [
                        T("i", { class: "bi bi-arrow-down" }, null, -1),
                        le(" Merge Down ", -1)
                      ]), 8, QB)
                    ]),
                    T("div", UB, [
                      T("button", {
                        class: "btn btn-outline-secondary btn-sm",
                        onClick: zA,
                        disabled: !eA(p.value.row, p.value.col),
                        title: "Unmerge cell"
                      }, B[142] || (B[142] = [
                        T("i", { class: "bi bi-scissors" }, null, -1),
                        le(" Unmerge ", -1)
                      ]), 8, EB),
                      T("button", {
                        class: "btn btn-outline-secondary btn-sm",
                        onClick: X,
                        title: "Clear selection"
                      }, B[143] || (B[143] = [
                        T("i", { class: "bi bi-x" }, null, -1),
                        le(" Clear Selection ", -1)
                      ]))
                    ])
                  ])) : de("", !0),
                  T("div", { class: "mb-3" }, [
                    T("div", {
                      class: "btn-group w-100",
                      role: "group"
                    }, [
                      T("button", {
                        class: "btn btn-outline-info btn-sm",
                        onClick: E
                      }, B[144] || (B[144] = [
                        T("i", { class: "bi bi-table" }, null, -1),
                        le(" Sample Data ", -1)
                      ])),
                      T("button", {
                        class: "btn btn-outline-warning btn-sm",
                        onClick: M
                      }, B[145] || (B[145] = [
                        T("i", { class: "bi bi-eraser" }, null, -1),
                        le(" Clear All ", -1)
                      ]))
                    ])
                  ])
                ])) : de("", !0),
                T("button", {
                  class: "btn btn-danger btn-sm w-100",
                  onClick: q
                }, B[149] || (B[149] = [
                  T("i", { class: "bi bi-trash" }, null, -1),
                  le(" Delete ", -1)
                ]))
              ])) : (IA(), _A("div", xB, B[151] || (B[151] = [
                T("i", { class: "bi bi-cursor display-4" }, null, -1),
                T("p", { class: "mt-2" }, "Select an element to view properties", -1)
              ])))
            ])) : de("", !0)
          ]),
          T("div", {
            class: zr(["canvas-container", { "show-grid": s.value }])
          }, [
            T("div", LB, [
              T("div", null, "Elements: " + nt(i.value.length), 1),
              i.value.length > 0 ? (IA(), _A("div", SB, " Last element: " + nt((CA = i.value[i.value.length - 1]) == null ? void 0 : CA.type) + " at (" + nt((xA = i.value[i.value.length - 1]) == null ? void 0 : xA.x) + ", " + nt((yA = i.value[i.value.length - 1]) == null ? void 0 : yA.y) + ") ", 1)) : de("", !0)
            ]),
            T("div", {
              class: zr(["canvas", f.value]),
              style: Be({ transform: `scale(${l.value})` }),
              onDrop: I,
              onDragover: B[66] || (B[66] = Ge(() => {
              }, ["prevent"])),
              onClick: B[67] || (B[67] = ($) => H(null))
            }, [
              (IA(!0), _A(Nt, null, dr(i.value, ($) => {
                var UA;
                return IA(), Rp(Rd, {
                  key: $.id,
                  element: $,
                  selected: ((UA = a.value) == null ? void 0 : UA.id) === $.id,
                  onSelect: H,
                  onUpdate: P,
                  onDelete: W,
                  onCellSelect: O
                }, null, 8, ["element", "selected"]);
              }), 128)),
              i.value.length === 0 ? (IA(), _A("div", IB, " No elements on canvas. Try dragging from Elements or Data tabs. ")) : de("", !0)
            ], 38)
          ], 2)
        ])
      ]);
    };
  }
}, NB = /* @__PURE__ */ vi(_B, [["__scopeId", "data-v-02d5cd0e"]]);
function Fe(e) {
  "@babel/helpers - typeof";
  return Fe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(A) {
    return typeof A;
  } : function(A) {
    return A && typeof Symbol == "function" && A.constructor === Symbol && A !== Symbol.prototype ? "symbol" : typeof A;
  }, Fe(e);
}
var xt = Uint8Array, Yt = Uint16Array, Hf = Int32Array, Kl = new xt([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), jl = new xt([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Vc = new xt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), jd = function(e, A) {
  for (var t = new Yt(31), r = 0; r < 31; ++r)
    t[r] = A += 1 << e[r - 1];
  for (var n = new Hf(t[30]), r = 1; r < 30; ++r)
    for (var i = t[r]; i < t[r + 1]; ++i)
      n[i] = i - t[r] << 5 | r;
  return { b: t, r: n };
}, Gd = jd(Kl, 2), Vd = Gd.b, zc = Gd.r;
Vd[28] = 258, zc[258] = 28;
var zd = jd(jl, 0), HB = zd.b, e0 = zd.r, qc = new Yt(32768);
for (var He = 0; He < 32768; ++He) {
  var Nn = (He & 43690) >> 1 | (He & 21845) << 1;
  Nn = (Nn & 52428) >> 2 | (Nn & 13107) << 2, Nn = (Nn & 61680) >> 4 | (Nn & 3855) << 4, qc[He] = ((Nn & 65280) >> 8 | (Nn & 255) << 8) >> 1;
}
var Xr = function(e, A, t) {
  for (var r = e.length, n = 0, i = new Yt(A); n < r; ++n)
    e[n] && ++i[e[n] - 1];
  var a = new Yt(A);
  for (n = 1; n < A; ++n)
    a[n] = a[n - 1] + i[n - 1] << 1;
  var l;
  if (t) {
    l = new Yt(1 << A);
    var s = 15 - A;
    for (n = 0; n < r; ++n)
      if (e[n])
        for (var f = n << 4 | e[n], g = A - e[n], p = a[e[n] - 1]++ << g, w = p | (1 << g) - 1; p <= w; ++p)
          l[qc[p] >> s] = f;
  } else
    for (l = new Yt(r), n = 0; n < r; ++n)
      e[n] && (l[n] = qc[a[e[n] - 1]++] >> 15 - e[n]);
  return l;
}, zn = new xt(288);
for (var He = 0; He < 144; ++He)
  zn[He] = 8;
for (var He = 144; He < 256; ++He)
  zn[He] = 9;
for (var He = 256; He < 280; ++He)
  zn[He] = 7;
for (var He = 280; He < 288; ++He)
  zn[He] = 8;
var Do = new xt(32);
for (var He = 0; He < 32; ++He)
  Do[He] = 5;
var OB = /* @__PURE__ */ Xr(zn, 9, 0), DB = /* @__PURE__ */ Xr(zn, 9, 1), TB = /* @__PURE__ */ Xr(Do, 5, 0), kB = /* @__PURE__ */ Xr(Do, 5, 1), nc = function(e) {
  for (var A = e[0], t = 1; t < e.length; ++t)
    e[t] > A && (A = e[t]);
  return A;
}, Er = function(e, A, t) {
  var r = A / 8 | 0;
  return (e[r] | e[r + 1] << 8) >> (A & 7) & t;
}, ic = function(e, A) {
  var t = A / 8 | 0;
  return (e[t] | e[t + 1] << 8 | e[t + 2] << 16) >> (A & 7);
}, Of = function(e) {
  return (e + 7) / 8 | 0;
}, qd = function(e, A, t) {
  return (t == null || t > e.length) && (t = e.length), new xt(e.subarray(A, t));
}, PB = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], Sr = function(e, A, t) {
  var r = new Error(A || PB[e]);
  if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, Sr), !t)
    throw r;
  return r;
}, MB = function(e, A, t, r) {
  var n = e.length, i = 0;
  if (!n || A.f && !A.l)
    return t || new xt(0);
  var a = !t, l = a || A.i != 2, s = A.i;
  a && (t = new xt(n * 3));
  var f = function(QA) {
    var OA = t.length;
    if (QA > OA) {
      var HA = new xt(Math.max(OA * 2, QA));
      HA.set(t), t = HA;
    }
  }, g = A.f || 0, p = A.p || 0, w = A.b || 0, d = A.l, C = A.d, b = A.m, _ = A.n, m = n * 8;
  do {
    if (!d) {
      g = Er(e, p, 1);
      var y = Er(e, p + 1, 3);
      if (p += 3, y)
        if (y == 1)
          d = DB, C = kB, b = 9, _ = 5;
        else if (y == 2) {
          var q = Er(e, p, 31) + 257, W = Er(e, p + 10, 15) + 4, D = q + Er(e, p + 5, 31) + 1;
          p += 14;
          for (var R = new xt(D), Y = new xt(19), x = 0; x < W; ++x)
            Y[Vc[x]] = Er(e, p + x * 3, 7);
          p += W * 3;
          for (var I = nc(Y), j = (1 << I) - 1, K = Xr(Y, I, 1), x = 0; x < D; ) {
            var nA = K[Er(e, p, j)];
            p += nA & 15;
            var H = nA >> 4;
            if (H < 16)
              R[x++] = H;
            else {
              var iA = 0, cA = 0;
              for (H == 16 ? (cA = 3 + Er(e, p, 3), p += 2, iA = R[x - 1]) : H == 17 ? (cA = 3 + Er(e, p, 7), p += 3) : H == 18 && (cA = 11 + Er(e, p, 127), p += 7); cA--; )
                R[x++] = iA;
            }
          }
          var oA = R.subarray(0, q), dA = R.subarray(q);
          b = nc(oA), _ = nc(dA), d = Xr(oA, b, 1), C = Xr(dA, _, 1);
        } else
          Sr(1);
      else {
        var H = Of(p) + 4, O = e[H - 4] | e[H - 3] << 8, P = H + O;
        if (P > n) {
          s && Sr(0);
          break;
        }
        l && f(w + O), t.set(e.subarray(H, P), w), A.b = w += O, A.p = p = P * 8, A.f = g;
        continue;
      }
      if (p > m) {
        s && Sr(0);
        break;
      }
    }
    l && f(w + 131072);
    for (var pA = (1 << b) - 1, LA = (1 << _) - 1, E = p; ; E = p) {
      var iA = d[ic(e, p) & pA], M = iA >> 4;
      if (p += iA & 15, p > m) {
        s && Sr(0);
        break;
      }
      if (iA || Sr(2), M < 256)
        t[w++] = M;
      else if (M == 256) {
        E = p, d = null;
        break;
      } else {
        var z = M - 254;
        if (M > 264) {
          var x = M - 257, X = Kl[x];
          z = Er(e, p, (1 << X) - 1) + Vd[x], p += X;
        }
        var eA = C[ic(e, p) & LA], sA = eA >> 4;
        eA || Sr(3), p += eA & 15;
        var dA = HB[sA];
        if (sA > 3) {
          var X = jl[sA];
          dA += ic(e, p) & (1 << X) - 1, p += X;
        }
        if (p > m) {
          s && Sr(0);
          break;
        }
        l && f(w + 131072);
        var fA = w + z;
        if (w < dA) {
          var hA = i - dA, EA = Math.min(dA, fA);
          for (hA + w < 0 && Sr(3); w < EA; ++w)
            t[w] = r[hA + w];
        }
        for (; w < fA; ++w)
          t[w] = t[w - dA];
      }
    }
    A.l = d, A.p = E, A.b = w, A.f = g, d && (g = 1, A.m = b, A.d = C, A.n = _);
  } while (!g);
  return w != t.length && a ? qd(t, 0, w) : t.subarray(0, w);
}, fn = function(e, A, t) {
  t <<= A & 7;
  var r = A / 8 | 0;
  e[r] |= t, e[r + 1] |= t >> 8;
}, co = function(e, A, t) {
  t <<= A & 7;
  var r = A / 8 | 0;
  e[r] |= t, e[r + 1] |= t >> 8, e[r + 2] |= t >> 16;
}, ac = function(e, A) {
  for (var t = [], r = 0; r < e.length; ++r)
    e[r] && t.push({ s: r, f: e[r] });
  var n = t.length, i = t.slice();
  if (!n)
    return { t: Xd, l: 0 };
  if (n == 1) {
    var a = new xt(t[0].s + 1);
    return a[t[0].s] = 1, { t: a, l: 1 };
  }
  t.sort(function(P, q) {
    return P.f - q.f;
  }), t.push({ s: -1, f: 25001 });
  var l = t[0], s = t[1], f = 0, g = 1, p = 2;
  for (t[0] = { s: -1, f: l.f + s.f, l, r: s }; g != n - 1; )
    l = t[t[f].f < t[p].f ? f++ : p++], s = t[f != g && t[f].f < t[p].f ? f++ : p++], t[g++] = { s: -1, f: l.f + s.f, l, r: s };
  for (var w = i[0].s, r = 1; r < n; ++r)
    i[r].s > w && (w = i[r].s);
  var d = new Yt(w + 1), C = Wc(t[g - 1], d, 0);
  if (C > A) {
    var r = 0, b = 0, _ = C - A, m = 1 << _;
    for (i.sort(function(q, W) {
      return d[W.s] - d[q.s] || q.f - W.f;
    }); r < n; ++r) {
      var y = i[r].s;
      if (d[y] > A)
        b += m - (1 << C - d[y]), d[y] = A;
      else
        break;
    }
    for (b >>= _; b > 0; ) {
      var H = i[r].s;
      d[H] < A ? b -= 1 << A - d[H]++ - 1 : ++r;
    }
    for (; r >= 0 && b; --r) {
      var O = i[r].s;
      d[O] == A && (--d[O], ++b);
    }
    C = A;
  }
  return { t: new xt(d), l: C };
}, Wc = function(e, A, t) {
  return e.s == -1 ? Math.max(Wc(e.l, A, t + 1), Wc(e.r, A, t + 1)) : A[e.s] = t;
}, t0 = function(e) {
  for (var A = e.length; A && !e[--A]; )
    ;
  for (var t = new Yt(++A), r = 0, n = e[0], i = 1, a = function(s) {
    t[r++] = s;
  }, l = 1; l <= A; ++l)
    if (e[l] == n && l != A)
      ++i;
    else {
      if (!n && i > 2) {
        for (; i > 138; i -= 138)
          a(32754);
        i > 2 && (a(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0);
      } else if (i > 3) {
        for (a(n), --i; i > 6; i -= 6)
          a(8304);
        i > 2 && (a(i - 3 << 5 | 8208), i = 0);
      }
      for (; i--; )
        a(n);
      i = 1, n = e[l];
    }
  return { c: t.subarray(0, r), n: A };
}, fo = function(e, A) {
  for (var t = 0, r = 0; r < A.length; ++r)
    t += e[r] * A[r];
  return t;
}, Wd = function(e, A, t) {
  var r = t.length, n = Of(A + 2);
  e[n] = r & 255, e[n + 1] = r >> 8, e[n + 2] = e[n] ^ 255, e[n + 3] = e[n + 1] ^ 255;
  for (var i = 0; i < r; ++i)
    e[n + i + 4] = t[i];
  return (n + 4 + r) * 8;
}, r0 = function(e, A, t, r, n, i, a, l, s, f, g) {
  fn(A, g++, t), ++n[256];
  for (var p = ac(n, 15), w = p.t, d = p.l, C = ac(i, 15), b = C.t, _ = C.l, m = t0(w), y = m.c, H = m.n, O = t0(b), P = O.c, q = O.n, W = new Yt(19), D = 0; D < y.length; ++D)
    ++W[y[D] & 31];
  for (var D = 0; D < P.length; ++D)
    ++W[P[D] & 31];
  for (var R = ac(W, 7), Y = R.t, x = R.l, I = 19; I > 4 && !Y[Vc[I - 1]]; --I)
    ;
  var j = f + 5 << 3, K = fo(n, zn) + fo(i, Do) + a, nA = fo(n, w) + fo(i, b) + a + 14 + 3 * I + fo(W, Y) + 2 * W[16] + 3 * W[17] + 7 * W[18];
  if (s >= 0 && j <= K && j <= nA)
    return Wd(A, g, e.subarray(s, s + f));
  var iA, cA, oA, dA;
  if (fn(A, g, 1 + (nA < K)), g += 2, nA < K) {
    iA = Xr(w, d, 0), cA = w, oA = Xr(b, _, 0), dA = b;
    var pA = Xr(Y, x, 0);
    fn(A, g, H - 257), fn(A, g + 5, q - 1), fn(A, g + 10, I - 4), g += 14;
    for (var D = 0; D < I; ++D)
      fn(A, g + 3 * D, Y[Vc[D]]);
    g += 3 * I;
    for (var LA = [y, P], E = 0; E < 2; ++E)
      for (var M = LA[E], D = 0; D < M.length; ++D) {
        var z = M[D] & 31;
        fn(A, g, pA[z]), g += Y[z], z > 15 && (fn(A, g, M[D] >> 5 & 127), g += M[D] >> 12);
      }
  } else
    iA = OB, cA = zn, oA = TB, dA = Do;
  for (var D = 0; D < l; ++D) {
    var X = r[D];
    if (X > 255) {
      var z = X >> 18 & 31;
      co(A, g, iA[z + 257]), g += cA[z + 257], z > 7 && (fn(A, g, X >> 23 & 31), g += Kl[z]);
      var eA = X & 31;
      co(A, g, oA[eA]), g += dA[eA], eA > 3 && (co(A, g, X >> 5 & 8191), g += jl[eA]);
    } else
      co(A, g, iA[X]), g += cA[X];
  }
  return co(A, g, iA[256]), g + cA[256];
}, RB = /* @__PURE__ */ new Hf([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), Xd = /* @__PURE__ */ new xt(0), KB = function(e, A, t, r, n, i) {
  var a = i.z || e.length, l = new xt(r + a + 5 * (1 + Math.ceil(a / 7e3)) + n), s = l.subarray(r, l.length - n), f = i.l, g = (i.r || 0) & 7;
  if (A) {
    g && (s[0] = i.r >> 3);
    for (var p = RB[A - 1], w = p >> 13, d = p & 8191, C = (1 << t) - 1, b = i.p || new Yt(32768), _ = i.h || new Yt(C + 1), m = Math.ceil(t / 3), y = 2 * m, H = function(zA) {
      return (e[zA] ^ e[zA + 1] << m ^ e[zA + 2] << y) & C;
    }, O = new Hf(25e3), P = new Yt(288), q = new Yt(32), W = 0, D = 0, R = i.i || 0, Y = 0, x = i.w || 0, I = 0; R + 2 < a; ++R) {
      var j = H(R), K = R & 32767, nA = _[j];
      if (b[K] = nA, _[j] = K, x <= R) {
        var iA = a - R;
        if ((W > 7e3 || Y > 24576) && (iA > 423 || !f)) {
          g = r0(e, s, 0, O, P, q, D, Y, I, R - I, g), Y = W = D = 0, I = R;
          for (var cA = 0; cA < 286; ++cA)
            P[cA] = 0;
          for (var cA = 0; cA < 30; ++cA)
            q[cA] = 0;
        }
        var oA = 2, dA = 0, pA = d, LA = K - nA & 32767;
        if (iA > 2 && j == H(R - LA))
          for (var E = Math.min(w, iA) - 1, M = Math.min(32767, R), z = Math.min(258, iA); LA <= M && --pA && K != nA; ) {
            if (e[R + oA] == e[R + oA - LA]) {
              for (var X = 0; X < z && e[R + X] == e[R + X - LA]; ++X)
                ;
              if (X > oA) {
                if (oA = X, dA = LA, X > E)
                  break;
                for (var eA = Math.min(LA, X - 2), sA = 0, cA = 0; cA < eA; ++cA) {
                  var fA = R - LA + cA & 32767, hA = b[fA], EA = fA - hA & 32767;
                  EA > sA && (sA = EA, nA = fA);
                }
              }
            }
            K = nA, nA = b[K], LA += K - nA & 32767;
          }
        if (dA) {
          O[Y++] = 268435456 | zc[oA] << 18 | e0[dA];
          var QA = zc[oA] & 31, OA = e0[dA] & 31;
          D += Kl[QA] + jl[OA], ++P[257 + QA], ++q[OA], x = R + oA, ++W;
        } else
          O[Y++] = e[R], ++P[e[R]];
      }
    }
    for (R = Math.max(R, x); R < a; ++R)
      O[Y++] = e[R], ++P[e[R]];
    g = r0(e, s, f, O, P, q, D, Y, I, R - I, g), f || (i.r = g & 7 | s[g / 8 | 0] << 3, g -= 7, i.h = _, i.p = b, i.i = R, i.w = x);
  } else {
    for (var R = i.w || 0; R < a + f; R += 65535) {
      var HA = R + 65535;
      HA >= a && (s[g / 8 | 0] = f, HA = a), g = Wd(s, g + 1, e.subarray(R, HA));
    }
    i.i = a;
  }
  return qd(l, 0, r + Of(g) + n);
}, $d = function() {
  var e = 1, A = 0;
  return {
    p: function(t) {
      for (var r = e, n = A, i = t.length | 0, a = 0; a != i; ) {
        for (var l = Math.min(a + 2655, i); a < l; ++a)
          n += r += t[a];
        r = (r & 65535) + 15 * (r >> 16), n = (n & 65535) + 15 * (n >> 16);
      }
      e = r, A = n;
    },
    d: function() {
      return e %= 65521, A %= 65521, (e & 255) << 24 | (e & 65280) << 8 | (A & 255) << 8 | A >> 8;
    }
  };
}, jB = function(e, A, t, r, n) {
  if (!n && (n = { l: 1 }, A.dictionary)) {
    var i = A.dictionary.subarray(-32768), a = new xt(i.length + e.length);
    a.set(i), a.set(e, i.length), e = a, n.w = i.length;
  }
  return KB(e, A.level == null ? 6 : A.level, A.mem == null ? n.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + A.mem, t, r, n);
}, Jd = function(e, A, t) {
  for (; t; ++A)
    e[A] = t, t >>>= 8;
}, GB = function(e, A) {
  var t = A.level, r = t == 0 ? 0 : t < 6 ? 1 : t == 9 ? 3 : 2;
  if (e[0] = 120, e[1] = r << 6 | (A.dictionary && 32), e[1] |= 31 - (e[0] << 8 | e[1]) % 31, A.dictionary) {
    var n = $d();
    n.p(A.dictionary), Jd(e, 2, n.d());
  }
}, VB = function(e, A) {
  return ((e[0] & 15) != 8 || e[0] >> 4 > 7 || (e[0] << 8 | e[1]) % 31) && Sr(6, "invalid zlib data"), (e[1] >> 5 & 1) == 1 && Sr(6, "invalid zlib data: " + (e[1] & 32 ? "need" : "unexpected") + " dictionary"), (e[1] >> 3 & 4) + 2;
};
function Xc(e, A) {
  A || (A = {});
  var t = $d();
  t.p(e);
  var r = jB(e, A, A.dictionary ? 6 : 2, 4);
  return GB(r, A), Jd(r, r.length - 4, t.d()), r;
}
function zB(e, A) {
  return MB(e.subarray(VB(e), -4), { i: 2 }, A, A);
}
var qB = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), WB = 0;
try {
  qB.decode(Xd, { stream: !0 }), WB = 1;
} catch {
}
/** @license
 *
 * jsPDF - PDF Document creation from JavaScript
 * Version 2.5.2 Built on 2024-09-17T13:29:57.859Z
 *                      CommitID 00000000
 *
 * Copyright (c) 2010-2021 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
 *               2015-2021 yWorks GmbH, http://www.yworks.com
 *               2015-2021 Lukas Holländer <lukas.hollaender@yworks.com>, https://github.com/HackbrettXXX
 *               2016-2018 Aras Abbasi <aras.abbasi@gmail.com>
 *               2010 Aaron Spike, https://github.com/acspike
 *               2012 Willow Systems Corporation, https://github.com/willowsystems
 *               2012 Pablo Hess, https://github.com/pablohess
 *               2012 Florian Jenett, https://github.com/fjenett
 *               2013 Warren Weckesser, https://github.com/warrenweckesser
 *               2013 Youssef Beddad, https://github.com/lifof
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2013 Stefan Slonevskiy, https://github.com/stefslon
 *               2013 Jeremy Morel, https://github.com/jmorel
 *               2013 Christoph Hartmann, https://github.com/chris-rock
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Makes, https://github.com/dollaruw
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Steven Spungin, https://github.com/Flamenco
 *               2014 Kenneth Glassey, https://github.com/Gavvers
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Contributor(s):
 *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
 *    kim3er, mfo, alnorth, Flamenco
 */
var XA = /* @__PURE__ */ function() {
  return typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this;
}();
function oc() {
  XA.console && typeof XA.console.log == "function" && XA.console.log.apply(XA.console, arguments);
}
var Se = { log: oc, warn: function(e) {
  XA.console && (typeof XA.console.warn == "function" ? XA.console.warn.apply(XA.console, arguments) : oc.call(null, arguments));
}, error: function(e) {
  XA.console && (typeof XA.console.error == "function" ? XA.console.error.apply(XA.console, arguments) : oc(e));
} };
function sc(e, A, t) {
  var r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    ci(r.response, A, t);
  }, r.onerror = function() {
    Se.error("could not download file");
  }, r.send();
}
function n0(e) {
  var A = new XMLHttpRequest();
  A.open("HEAD", e, !1);
  try {
    A.send();
  } catch {
  }
  return A.status >= 200 && A.status <= 299;
}
function Ps(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    var A = document.createEvent("MouseEvents");
    A.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(A);
  }
}
var Lo, $c, ci = XA.saveAs || ((typeof window > "u" ? "undefined" : Fe(window)) !== "object" || window !== XA ? function() {
} : typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype ? function(e, A, t) {
  var r = XA.URL || XA.webkitURL, n = document.createElement("a");
  A = A || e.name || "download", n.download = A, n.rel = "noopener", typeof e == "string" ? (n.href = e, n.origin !== location.origin ? n0(n.href) ? sc(e, A, t) : Ps(n, n.target = "_blank") : Ps(n)) : (n.href = r.createObjectURL(e), setTimeout(function() {
    r.revokeObjectURL(n.href);
  }, 4e4), setTimeout(function() {
    Ps(n);
  }, 0));
} : "msSaveOrOpenBlob" in navigator ? function(e, A, t) {
  if (A = A || e.name || "download", typeof e == "string") if (n0(e)) sc(e, A, t);
  else {
    var r = document.createElement("a");
    r.href = e, r.target = "_blank", setTimeout(function() {
      Ps(r);
    });
  }
  else navigator.msSaveOrOpenBlob(function(n, i) {
    return i === void 0 ? i = { autoBom: !1 } : Fe(i) !== "object" && (Se.warn("Deprecated: Expected third argument to be a object"), i = { autoBom: !i }), i.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type) ? new Blob(["\uFEFF", n], { type: n.type }) : n;
  }(e, t), A);
} : function(e, A, t, r) {
  if ((r = r || open("", "_blank")) && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return sc(e, A, t);
  var n = e.type === "application/octet-stream", i = /constructor/i.test(XA.HTMLElement) || XA.safari, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || n && i) && (typeof FileReader > "u" ? "undefined" : Fe(FileReader)) === "object") {
    var l = new FileReader();
    l.onloadend = function() {
      var g = l.result;
      g = a ? g : g.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = g : location = g, r = null;
    }, l.readAsDataURL(e);
  } else {
    var s = XA.URL || XA.webkitURL, f = s.createObjectURL(e);
    r ? r.location = f : location.href = f, r = null, setTimeout(function() {
      s.revokeObjectURL(f);
    }, 4e4);
  }
});
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */
function Yd(e) {
  var A;
  e = e || "", this.ok = !1, e.charAt(0) == "#" && (e = e.substr(1, 6)), e = { aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff", aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd", blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a", burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00", chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed", cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b", darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f", darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff", feldspar: "d19275", firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00", lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080", lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslateblue: "8470ff", lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f", pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6", purple: "800080", red: "ff0000", rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c", teal: "008080", thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", violetred: "d02090", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32" }[e = (e = e.replace(/ /g, "")).toLowerCase()] || e;
  for (var t = [{ re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, example: ["rgb(123, 234, 45)", "rgb(255,234,245)"], process: function(l) {
    return [parseInt(l[1]), parseInt(l[2]), parseInt(l[3])];
  } }, { re: /^(\w{2})(\w{2})(\w{2})$/, example: ["#00ff00", "336699"], process: function(l) {
    return [parseInt(l[1], 16), parseInt(l[2], 16), parseInt(l[3], 16)];
  } }, { re: /^(\w{1})(\w{1})(\w{1})$/, example: ["#fb0", "f0f"], process: function(l) {
    return [parseInt(l[1] + l[1], 16), parseInt(l[2] + l[2], 16), parseInt(l[3] + l[3], 16)];
  } }], r = 0; r < t.length; r++) {
    var n = t[r].re, i = t[r].process, a = n.exec(e);
    a && (A = i(a), this.r = A[0], this.g = A[1], this.b = A[2], this.ok = !0);
  }
  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r, this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g, this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b, this.toRGB = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }, this.toHex = function() {
    var l = this.r.toString(16), s = this.g.toString(16), f = this.b.toString(16);
    return l.length == 1 && (l = "0" + l), s.length == 1 && (s = "0" + s), f.length == 1 && (f = "0" + f), "#" + l + s + f;
  };
}
/**
 * @license
 * Joseph Myers does not specify a particular license for his work.
 *
 * Author: Joseph Myers
 * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
 *
 * Modified by: Owen Leong
 */
function lc(e, A) {
  var t = e[0], r = e[1], n = e[2], i = e[3];
  t = bt(t, r, n, i, A[0], 7, -680876936), i = bt(i, t, r, n, A[1], 12, -389564586), n = bt(n, i, t, r, A[2], 17, 606105819), r = bt(r, n, i, t, A[3], 22, -1044525330), t = bt(t, r, n, i, A[4], 7, -176418897), i = bt(i, t, r, n, A[5], 12, 1200080426), n = bt(n, i, t, r, A[6], 17, -1473231341), r = bt(r, n, i, t, A[7], 22, -45705983), t = bt(t, r, n, i, A[8], 7, 1770035416), i = bt(i, t, r, n, A[9], 12, -1958414417), n = bt(n, i, t, r, A[10], 17, -42063), r = bt(r, n, i, t, A[11], 22, -1990404162), t = bt(t, r, n, i, A[12], 7, 1804603682), i = bt(i, t, r, n, A[13], 12, -40341101), n = bt(n, i, t, r, A[14], 17, -1502002290), t = Ct(t, r = bt(r, n, i, t, A[15], 22, 1236535329), n, i, A[1], 5, -165796510), i = Ct(i, t, r, n, A[6], 9, -1069501632), n = Ct(n, i, t, r, A[11], 14, 643717713), r = Ct(r, n, i, t, A[0], 20, -373897302), t = Ct(t, r, n, i, A[5], 5, -701558691), i = Ct(i, t, r, n, A[10], 9, 38016083), n = Ct(n, i, t, r, A[15], 14, -660478335), r = Ct(r, n, i, t, A[4], 20, -405537848), t = Ct(t, r, n, i, A[9], 5, 568446438), i = Ct(i, t, r, n, A[14], 9, -1019803690), n = Ct(n, i, t, r, A[3], 14, -187363961), r = Ct(r, n, i, t, A[8], 20, 1163531501), t = Ct(t, r, n, i, A[13], 5, -1444681467), i = Ct(i, t, r, n, A[2], 9, -51403784), n = Ct(n, i, t, r, A[7], 14, 1735328473), t = Ft(t, r = Ct(r, n, i, t, A[12], 20, -1926607734), n, i, A[5], 4, -378558), i = Ft(i, t, r, n, A[8], 11, -2022574463), n = Ft(n, i, t, r, A[11], 16, 1839030562), r = Ft(r, n, i, t, A[14], 23, -35309556), t = Ft(t, r, n, i, A[1], 4, -1530992060), i = Ft(i, t, r, n, A[4], 11, 1272893353), n = Ft(n, i, t, r, A[7], 16, -155497632), r = Ft(r, n, i, t, A[10], 23, -1094730640), t = Ft(t, r, n, i, A[13], 4, 681279174), i = Ft(i, t, r, n, A[0], 11, -358537222), n = Ft(n, i, t, r, A[3], 16, -722521979), r = Ft(r, n, i, t, A[6], 23, 76029189), t = Ft(t, r, n, i, A[9], 4, -640364487), i = Ft(i, t, r, n, A[12], 11, -421815835), n = Ft(n, i, t, r, A[15], 16, 530742520), t = Qt(t, r = Ft(r, n, i, t, A[2], 23, -995338651), n, i, A[0], 6, -198630844), i = Qt(i, t, r, n, A[7], 10, 1126891415), n = Qt(n, i, t, r, A[14], 15, -1416354905), r = Qt(r, n, i, t, A[5], 21, -57434055), t = Qt(t, r, n, i, A[12], 6, 1700485571), i = Qt(i, t, r, n, A[3], 10, -1894986606), n = Qt(n, i, t, r, A[10], 15, -1051523), r = Qt(r, n, i, t, A[1], 21, -2054922799), t = Qt(t, r, n, i, A[8], 6, 1873313359), i = Qt(i, t, r, n, A[15], 10, -30611744), n = Qt(n, i, t, r, A[6], 15, -1560198380), r = Qt(r, n, i, t, A[13], 21, 1309151649), t = Qt(t, r, n, i, A[4], 6, -145523070), i = Qt(i, t, r, n, A[11], 10, -1120210379), n = Qt(n, i, t, r, A[2], 15, 718787259), r = Qt(r, n, i, t, A[9], 21, -343485551), e[0] = kn(t, e[0]), e[1] = kn(r, e[1]), e[2] = kn(n, e[2]), e[3] = kn(i, e[3]);
}
function Gl(e, A, t, r, n, i) {
  return A = kn(kn(A, e), kn(r, i)), kn(A << n | A >>> 32 - n, t);
}
function bt(e, A, t, r, n, i, a) {
  return Gl(A & t | ~A & r, e, A, n, i, a);
}
function Ct(e, A, t, r, n, i, a) {
  return Gl(A & r | t & ~r, e, A, n, i, a);
}
function Ft(e, A, t, r, n, i, a) {
  return Gl(A ^ t ^ r, e, A, n, i, a);
}
function Qt(e, A, t, r, n, i, a) {
  return Gl(t ^ (A | ~r), e, A, n, i, a);
}
function Zd(e) {
  var A, t = e.length, r = [1732584193, -271733879, -1732584194, 271733878];
  for (A = 64; A <= e.length; A += 64) lc(r, XB(e.substring(A - 64, A)));
  e = e.substring(A - 64);
  var n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (A = 0; A < e.length; A++) n[A >> 2] |= e.charCodeAt(A) << (A % 4 << 3);
  if (n[A >> 2] |= 128 << (A % 4 << 3), A > 55) for (lc(r, n), A = 0; A < 16; A++) n[A] = 0;
  return n[14] = 8 * t, lc(r, n), r;
}
function XB(e) {
  var A, t = [];
  for (A = 0; A < 64; A += 4) t[A >> 2] = e.charCodeAt(A) + (e.charCodeAt(A + 1) << 8) + (e.charCodeAt(A + 2) << 16) + (e.charCodeAt(A + 3) << 24);
  return t;
}
Lo = XA.atob.bind(XA), $c = XA.btoa.bind(XA);
var i0 = "0123456789abcdef".split("");
function $B(e) {
  for (var A = "", t = 0; t < 4; t++) A += i0[e >> 8 * t + 4 & 15] + i0[e >> 8 * t & 15];
  return A;
}
function JB(e) {
  return String.fromCharCode((255 & e) >> 0, (65280 & e) >> 8, (16711680 & e) >> 16, (4278190080 & e) >> 24);
}
function Jc(e) {
  return Zd(e).map(JB).join("");
}
var YB = function(e) {
  for (var A = 0; A < e.length; A++) e[A] = $B(e[A]);
  return e.join("");
}(Zd("hello")) != "5d41402abc4b2a76b9719d911017c592";
function kn(e, A) {
  if (YB) {
    var t = (65535 & e) + (65535 & A);
    return (e >> 16) + (A >> 16) + (t >> 16) << 16 | 65535 & t;
  }
  return e + A & 4294967295;
}
/**
 * @license
 * FPDF is released under a permissive license: there is no usage restriction.
 * You may embed it freely in your application (commercial or not), with or
 * without modifications.
 *
 * Reference: http://www.fpdf.org/en/script/script37.php
 */
function Yc(e, A) {
  var t, r, n, i;
  if (e !== t) {
    for (var a = (n = e, i = 1 + (256 / e.length >> 0), new Array(i + 1).join(n)), l = [], s = 0; s < 256; s++) l[s] = s;
    var f = 0;
    for (s = 0; s < 256; s++) {
      var g = l[s];
      f = (f + g + a.charCodeAt(s)) % 256, l[s] = l[f], l[f] = g;
    }
    t = e, r = l;
  } else l = r;
  var p = A.length, w = 0, d = 0, C = "";
  for (s = 0; s < p; s++) d = (d + (g = l[w = (w + 1) % 256])) % 256, l[w] = l[d], l[d] = g, a = l[(l[w] + l[d]) % 256], C += String.fromCharCode(A.charCodeAt(s) ^ a);
  return C;
}
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * Author: Owen Leong (@owenl131)
 * Date: 15 Oct 2020
 * References:
 * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
 * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
 * http://www.fpdf.org/en/script/script37.php
 */
var a0 = { print: 4, modify: 8, copy: 16, "annot-forms": 32 };
function ua(e, A, t, r) {
  this.v = 1, this.r = 2;
  var n = 192;
  e.forEach(function(l) {
    if (a0.perm !== void 0) throw new Error("Invalid permission: " + l);
    n += a0[l];
  }), this.padding = "(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz";
  var i = (A + this.padding).substr(0, 32), a = (t + this.padding).substr(0, 32);
  this.O = this.processOwnerPassword(i, a), this.P = -(1 + (255 ^ n)), this.encryptionKey = Jc(i + this.O + this.lsbFirstWord(this.P) + this.hexToBytes(r)).substr(0, 5), this.U = Yc(this.encryptionKey, this.padding);
}
function ca(e) {
  if (/[^\u0000-\u00ff]/.test(e)) throw new Error("Invalid PDF Name Object: " + e + ", Only accept ASCII characters.");
  for (var A = "", t = e.length, r = 0; r < t; r++) {
    var n = e.charCodeAt(r);
    n < 33 || n === 35 || n === 37 || n === 40 || n === 41 || n === 47 || n === 60 || n === 62 || n === 91 || n === 93 || n === 123 || n === 125 || n > 126 ? A += "#" + ("0" + n.toString(16)).slice(-2) : A += e[r];
  }
  return A;
}
function o0(e) {
  if (Fe(e) !== "object") throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");
  var A = {};
  this.subscribe = function(t, r, n) {
    if (n = n || !1, typeof t != "string" || typeof r != "function" || typeof n != "boolean") throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");
    A.hasOwnProperty(t) || (A[t] = {});
    var i = Math.random().toString(35);
    return A[t][i] = [r, !!n], i;
  }, this.unsubscribe = function(t) {
    for (var r in A) if (A[r][t]) return delete A[r][t], Object.keys(A[r]).length === 0 && delete A[r], !0;
    return !1;
  }, this.publish = function(t) {
    if (A.hasOwnProperty(t)) {
      var r = Array.prototype.slice.call(arguments, 1), n = [];
      for (var i in A[t]) {
        var a = A[t][i];
        try {
          a[0].apply(e, r);
        } catch (l) {
          XA.console && Se.error("jsPDF PubSub Error", l.message, l);
        }
        a[1] && n.push(i);
      }
      n.length && n.forEach(this.unsubscribe);
    }
  }, this.getTopics = function() {
    return A;
  };
}
function El(e) {
  if (!(this instanceof El)) return new El(e);
  var A = "opacity,stroke-opacity".split(",");
  for (var t in e) e.hasOwnProperty(t) && A.indexOf(t) >= 0 && (this[t] = e[t]);
  this.id = "", this.objectNumber = -1;
}
function A1(e, A) {
  this.gState = e, this.matrix = A, this.id = "", this.objectNumber = -1;
}
function fi(e, A, t, r, n) {
  if (!(this instanceof fi)) return new fi(e, A, t, r, n);
  this.type = e === "axial" ? 2 : 3, this.coords = A, this.colors = t, A1.call(this, r, n);
}
function da(e, A, t, r, n) {
  if (!(this instanceof da)) return new da(e, A, t, r, n);
  this.boundingBox = e, this.xStep = A, this.yStep = t, this.stream = "", this.cloneIndex = 0, A1.call(this, r, n);
}
function WA(e) {
  var A, t = typeof arguments[0] == "string" ? arguments[0] : "p", r = arguments[1], n = arguments[2], i = arguments[3], a = [], l = 1, s = 16, f = "S", g = null;
  Fe(e = e || {}) === "object" && (t = e.orientation, r = e.unit || r, n = e.format || n, i = e.compress || e.compressPdf || i, (g = e.encryption || null) !== null && (g.userPassword = g.userPassword || "", g.ownerPassword = g.ownerPassword || "", g.userPermissions = g.userPermissions || []), l = typeof e.userUnit == "number" ? Math.abs(e.userUnit) : 1, e.precision !== void 0 && (A = e.precision), e.floatPrecision !== void 0 && (s = e.floatPrecision), f = e.defaultPathOperation || "S"), a = e.filters || (i === !0 ? ["FlateEncode"] : a), r = r || "mm", t = ("" + (t || "P")).toLowerCase();
  var p = e.putOnlyUsedFonts || !1, w = {}, d = { internal: {}, __private__: {} };
  d.__private__.PubSub = o0;
  var C = "1.3", b = d.__private__.getPdfVersion = function() {
    return C;
  };
  d.__private__.setPdfVersion = function(c) {
    C = c;
  };
  var _ = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89], a5: [419.53, 595.28], a6: [297.64, 419.53], a7: [209.76, 297.64], a8: [147.4, 209.76], a9: [104.88, 147.4], a10: [73.7, 104.88], b0: [2834.65, 4008.19], b1: [2004.09, 2834.65], b2: [1417.32, 2004.09], b3: [1000.63, 1417.32], b4: [708.66, 1000.63], b5: [498.9, 708.66], b6: [354.33, 498.9], b7: [249.45, 354.33], b8: [175.75, 249.45], b9: [124.72, 175.75], b10: [87.87, 124.72], c0: [2599.37, 3676.54], c1: [1836.85, 2599.37], c2: [1298.27, 1836.85], c3: [918.43, 1298.27], c4: [649.13, 918.43], c5: [459.21, 649.13], c6: [323.15, 459.21], c7: [229.61, 323.15], c8: [161.57, 229.61], c9: [113.39, 161.57], c10: [79.37, 113.39], dl: [311.81, 623.62], letter: [612, 792], "government-letter": [576, 756], legal: [612, 1008], "junior-legal": [576, 360], ledger: [1224, 792], tabloid: [792, 1224], "credit-card": [153, 243] };
  d.__private__.getPageFormats = function() {
    return _;
  };
  var m = d.__private__.getPageFormat = function(c) {
    return _[c];
  };
  n = n || "a4";
  var y = { COMPAT: "compat", ADVANCED: "advanced" }, H = y.COMPAT;
  function O() {
    this.saveGraphicsState(), B(new qA(TA, 0, 0, -TA, 0, yn() * TA).toString() + " cm"), this.setFontSize(this.getFontSize() / TA), f = "n", H = y.ADVANCED;
  }
  function P() {
    this.restoreGraphicsState(), f = "S", H = y.COMPAT;
  }
  var q = d.__private__.combineFontStyleAndFontWeight = function(c, Q) {
    if (c == "bold" && Q == "normal" || c == "bold" && Q == 400 || c == "normal" && Q == "italic" || c == "bold" && Q == "italic") throw new Error("Invalid Combination of fontweight and fontstyle");
    return Q && (c = Q == 400 || Q === "normal" ? c === "italic" ? "italic" : "normal" : Q != 700 && Q !== "bold" || c !== "normal" ? (Q == 700 ? "bold" : Q) + "" + c : "bold"), c;
  };
  d.advancedAPI = function(c) {
    var Q = H === y.COMPAT;
    return Q && O.call(this), typeof c != "function" || (c(this), Q && P.call(this)), this;
  }, d.compatAPI = function(c) {
    var Q = H === y.ADVANCED;
    return Q && P.call(this), typeof c != "function" || (c(this), Q && O.call(this)), this;
  }, d.isAdvancedAPI = function() {
    return H === y.ADVANCED;
  };
  var W, D = function(c) {
    if (H !== y.ADVANCED) throw new Error(c + " is only available in 'advanced' API mode. You need to call advancedAPI() first.");
  }, R = d.roundToPrecision = d.__private__.roundToPrecision = function(c, Q) {
    var G = A || Q;
    if (isNaN(c) || isNaN(G)) throw new Error("Invalid argument passed to jsPDF.roundToPrecision");
    return c.toFixed(G).replace(/0+$/, "");
  };
  W = d.hpf = d.__private__.hpf = typeof s == "number" ? function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return R(c, s);
  } : s === "smart" ? function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return R(c, c > -1 && c < 1 ? 16 : 5);
  } : function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.hpf");
    return R(c, 16);
  };
  var Y = d.f2 = d.__private__.f2 = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.f2");
    return R(c, 2);
  }, x = d.__private__.f3 = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.f3");
    return R(c, 3);
  }, I = d.scale = d.__private__.scale = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.scale");
    return H === y.COMPAT ? c * TA : H === y.ADVANCED ? c : void 0;
  }, j = function(c) {
    return H === y.COMPAT ? yn() - c : H === y.ADVANCED ? c : void 0;
  }, K = function(c) {
    return I(j(c));
  };
  d.__private__.setPrecision = d.setPrecision = function(c) {
    typeof parseInt(c, 10) == "number" && (A = parseInt(c, 10));
  };
  var nA, iA = "00000000000000000000000000000000", cA = d.__private__.getFileId = function() {
    return iA;
  }, oA = d.__private__.setFileId = function(c) {
    return iA = c !== void 0 && /^[a-fA-F0-9]{32}$/.test(c) ? c.toUpperCase() : iA.split("").map(function() {
      return "ABCDEF0123456789".charAt(Math.floor(16 * Math.random()));
    }).join(""), g !== null && (mt = new ua(g.userPermissions, g.userPassword, g.ownerPassword, iA)), iA;
  };
  d.setFileId = function(c) {
    return oA(c), this;
  }, d.getFileId = function() {
    return cA();
  };
  var dA = d.__private__.convertDateToPDFDate = function(c) {
    var Q = c.getTimezoneOffset(), G = Q < 0 ? "+" : "-", J = Math.floor(Math.abs(Q / 60)), aA = Math.abs(Q % 60), BA = [G, z(J), "'", z(aA), "'"].join("");
    return ["D:", c.getFullYear(), z(c.getMonth() + 1), z(c.getDate()), z(c.getHours()), z(c.getMinutes()), z(c.getSeconds()), BA].join("");
  }, pA = d.__private__.convertPDFDateToDate = function(c) {
    var Q = parseInt(c.substr(2, 4), 10), G = parseInt(c.substr(6, 2), 10) - 1, J = parseInt(c.substr(8, 2), 10), aA = parseInt(c.substr(10, 2), 10), BA = parseInt(c.substr(12, 2), 10), FA = parseInt(c.substr(14, 2), 10);
    return new Date(Q, G, J, aA, BA, FA, 0);
  }, LA = d.__private__.setCreationDate = function(c) {
    var Q;
    if (c === void 0 && (c = /* @__PURE__ */ new Date()), c instanceof Date) Q = dA(c);
    else {
      if (!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(c)) throw new Error("Invalid argument passed to jsPDF.setCreationDate");
      Q = c;
    }
    return nA = Q;
  }, E = d.__private__.getCreationDate = function(c) {
    var Q = nA;
    return c === "jsDate" && (Q = pA(nA)), Q;
  };
  d.setCreationDate = function(c) {
    return LA(c), this;
  }, d.getCreationDate = function(c) {
    return E(c);
  };
  var M, z = d.__private__.padd2 = function(c) {
    return ("0" + parseInt(c)).slice(-2);
  }, X = d.__private__.padd2Hex = function(c) {
    return ("00" + (c = c.toString())).substr(c.length);
  }, eA = 0, sA = [], fA = [], hA = 0, EA = [], QA = [], OA = !1, HA = fA, zA = function() {
    eA = 0, hA = 0, fA = [], sA = [], EA = [], en = Ze(), vr = Ze();
  };
  d.__private__.setCustomOutputDestination = function(c) {
    OA = !0, HA = c;
  };
  var V = function(c) {
    OA || (HA = c);
  };
  d.__private__.resetCustomOutputDestination = function() {
    OA = !1, HA = fA;
  };
  var B = d.__private__.out = function(c) {
    return c = c.toString(), hA += c.length + 1, HA.push(c), HA;
  }, CA = d.__private__.write = function(c) {
    return B(arguments.length === 1 ? c.toString() : Array.prototype.join.call(arguments, " "));
  }, xA = d.__private__.getArrayBuffer = function(c) {
    for (var Q = c.length, G = new ArrayBuffer(Q), J = new Uint8Array(G); Q--; ) J[Q] = c.charCodeAt(Q);
    return G;
  }, yA = [["Helvetica", "helvetica", "normal", "WinAnsiEncoding"], ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"], ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"], ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"], ["Courier", "courier", "normal", "WinAnsiEncoding"], ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"], ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"], ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"], ["Times-Roman", "times", "normal", "WinAnsiEncoding"], ["Times-Bold", "times", "bold", "WinAnsiEncoding"], ["Times-Italic", "times", "italic", "WinAnsiEncoding"], ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"], ["ZapfDingbats", "zapfdingbats", "normal", null], ["Symbol", "symbol", "normal", null]];
  d.__private__.getStandardFonts = function() {
    return yA;
  };
  var $ = e.fontSize || 16;
  d.__private__.setFontSize = d.setFontSize = function(c) {
    return $ = H === y.ADVANCED ? c / TA : c, this;
  };
  var UA, SA = d.__private__.getFontSize = d.getFontSize = function() {
    return H === y.COMPAT ? $ : $ * TA;
  }, KA = e.R2L || !1;
  d.__private__.setR2L = d.setR2L = function(c) {
    return KA = c, this;
  }, d.__private__.getR2L = d.getR2L = function() {
    return KA;
  };
  var $A, ne = d.__private__.setZoomMode = function(c) {
    var Q = [void 0, null, "fullwidth", "fullheight", "fullpage", "original"];
    if (/^(?:\d+\.\d*|\d*\.\d+|\d+)%$/.test(c)) UA = c;
    else if (isNaN(c)) {
      if (Q.indexOf(c) === -1) throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' + c + '" is not recognized.');
      UA = c;
    } else UA = parseInt(c, 10);
  };
  d.__private__.getZoomMode = function() {
    return UA;
  };
  var ie, fe = d.__private__.setPageMode = function(c) {
    if ([void 0, null, "UseNone", "UseOutlines", "UseThumbs", "FullScreen"].indexOf(c) == -1) throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' + c + '" is not recognized.');
    $A = c;
  };
  d.__private__.getPageMode = function() {
    return $A;
  };
  var Qe = d.__private__.setLayoutMode = function(c) {
    if ([void 0, null, "continuous", "single", "twoleft", "tworight", "two"].indexOf(c) == -1) throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "' + c + '" is not recognized.');
    ie = c;
  };
  d.__private__.getLayoutMode = function() {
    return ie;
  }, d.__private__.setDisplayMode = d.setDisplayMode = function(c, Q, G) {
    return ne(c), Qe(Q), fe(G), this;
  };
  var JA = { title: "", subject: "", author: "", keywords: "", creator: "" };
  d.__private__.getDocumentProperty = function(c) {
    if (Object.keys(JA).indexOf(c) === -1) throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    return JA[c];
  }, d.__private__.getDocumentProperties = function() {
    return JA;
  }, d.__private__.setDocumentProperties = d.setProperties = d.setDocumentProperties = function(c) {
    for (var Q in JA) JA.hasOwnProperty(Q) && c[Q] && (JA[Q] = c[Q]);
    return this;
  }, d.__private__.setDocumentProperty = function(c, Q) {
    if (Object.keys(JA).indexOf(c) === -1) throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");
    return JA[c] = Q;
  };
  var ae, TA, vt, ge, pr, xe = {}, De = {}, Hr = [], we = {}, Jn = {}, Pe = {}, Br = {}, An = null, Me = 0, ZA = [], ve = new o0(d), Yn = e.hotfixes || [], dt = {}, Or = {}, Dr = [], qA = function c(Q, G, J, aA, BA, FA) {
    if (!(this instanceof c)) return new c(Q, G, J, aA, BA, FA);
    isNaN(Q) && (Q = 1), isNaN(G) && (G = 0), isNaN(J) && (J = 0), isNaN(aA) && (aA = 1), isNaN(BA) && (BA = 0), isNaN(FA) && (FA = 0), this._matrix = [Q, G, J, aA, BA, FA];
  };
  Object.defineProperty(qA.prototype, "sx", { get: function() {
    return this._matrix[0];
  }, set: function(c) {
    this._matrix[0] = c;
  } }), Object.defineProperty(qA.prototype, "shy", { get: function() {
    return this._matrix[1];
  }, set: function(c) {
    this._matrix[1] = c;
  } }), Object.defineProperty(qA.prototype, "shx", { get: function() {
    return this._matrix[2];
  }, set: function(c) {
    this._matrix[2] = c;
  } }), Object.defineProperty(qA.prototype, "sy", { get: function() {
    return this._matrix[3];
  }, set: function(c) {
    this._matrix[3] = c;
  } }), Object.defineProperty(qA.prototype, "tx", { get: function() {
    return this._matrix[4];
  }, set: function(c) {
    this._matrix[4] = c;
  } }), Object.defineProperty(qA.prototype, "ty", { get: function() {
    return this._matrix[5];
  }, set: function(c) {
    this._matrix[5] = c;
  } }), Object.defineProperty(qA.prototype, "a", { get: function() {
    return this._matrix[0];
  }, set: function(c) {
    this._matrix[0] = c;
  } }), Object.defineProperty(qA.prototype, "b", { get: function() {
    return this._matrix[1];
  }, set: function(c) {
    this._matrix[1] = c;
  } }), Object.defineProperty(qA.prototype, "c", { get: function() {
    return this._matrix[2];
  }, set: function(c) {
    this._matrix[2] = c;
  } }), Object.defineProperty(qA.prototype, "d", { get: function() {
    return this._matrix[3];
  }, set: function(c) {
    this._matrix[3] = c;
  } }), Object.defineProperty(qA.prototype, "e", { get: function() {
    return this._matrix[4];
  }, set: function(c) {
    this._matrix[4] = c;
  } }), Object.defineProperty(qA.prototype, "f", { get: function() {
    return this._matrix[5];
  }, set: function(c) {
    this._matrix[5] = c;
  } }), Object.defineProperty(qA.prototype, "rotation", { get: function() {
    return Math.atan2(this.shx, this.sx);
  } }), Object.defineProperty(qA.prototype, "scaleX", { get: function() {
    return this.decompose().scale.sx;
  } }), Object.defineProperty(qA.prototype, "scaleY", { get: function() {
    return this.decompose().scale.sy;
  } }), Object.defineProperty(qA.prototype, "isIdentity", { get: function() {
    return this.sx === 1 && this.shy === 0 && this.shx === 0 && this.sy === 1 && this.tx === 0 && this.ty === 0;
  } }), qA.prototype.join = function(c) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty].map(W).join(c);
  }, qA.prototype.multiply = function(c) {
    var Q = c.sx * this.sx + c.shy * this.shx, G = c.sx * this.shy + c.shy * this.sy, J = c.shx * this.sx + c.sy * this.shx, aA = c.shx * this.shy + c.sy * this.sy, BA = c.tx * this.sx + c.ty * this.shx + this.tx, FA = c.tx * this.shy + c.ty * this.sy + this.ty;
    return new qA(Q, G, J, aA, BA, FA);
  }, qA.prototype.decompose = function() {
    var c = this.sx, Q = this.shy, G = this.shx, J = this.sy, aA = this.tx, BA = this.ty, FA = Math.sqrt(c * c + Q * Q), PA = (c /= FA) * G + (Q /= FA) * J;
    G -= c * PA, J -= Q * PA;
    var GA = Math.sqrt(G * G + J * J);
    return PA /= GA, c * (J /= GA) < Q * (G /= GA) && (c = -c, Q = -Q, PA = -PA, FA = -FA), { scale: new qA(FA, 0, 0, GA, 0, 0), translate: new qA(1, 0, 0, 1, aA, BA), rotate: new qA(c, Q, -Q, c, 0, 0), skew: new qA(1, 0, PA, 1, 0, 0) };
  }, qA.prototype.toString = function(c) {
    return this.join(" ");
  }, qA.prototype.inversed = function() {
    var c = this.sx, Q = this.shy, G = this.shx, J = this.sy, aA = this.tx, BA = this.ty, FA = 1 / (c * J - Q * G), PA = J * FA, GA = -Q * FA, te = -G * FA, Ae = c * FA;
    return new qA(PA, GA, te, Ae, -PA * aA - te * BA, -GA * aA - Ae * BA);
  }, qA.prototype.applyToPoint = function(c) {
    var Q = c.x * this.sx + c.y * this.shx + this.tx, G = c.x * this.shy + c.y * this.sy + this.ty;
    return new Ti(Q, G);
  }, qA.prototype.applyToRectangle = function(c) {
    var Q = this.applyToPoint(c), G = this.applyToPoint(new Ti(c.x + c.w, c.y + c.h));
    return new Va(Q.x, Q.y, G.x - Q.x, G.y - Q.y);
  }, qA.prototype.clone = function() {
    var c = this.sx, Q = this.shy, G = this.shx, J = this.sy, aA = this.tx, BA = this.ty;
    return new qA(c, Q, G, J, aA, BA);
  }, d.Matrix = qA;
  var wr = d.matrixMult = function(c, Q) {
    return Q.multiply(c);
  }, Tr = new qA(1, 0, 0, 1, 0, 0);
  d.unitMatrix = d.identityMatrix = Tr;
  var Ot = function(c, Q) {
    if (!Jn[c]) {
      var G = (Q instanceof fi ? "Sh" : "P") + (Object.keys(we).length + 1).toString(10);
      Q.id = G, Jn[c] = G, we[G] = Q, ve.publish("addPattern", Q);
    }
  };
  d.ShadingPattern = fi, d.TilingPattern = da, d.addShadingPattern = function(c, Q) {
    return D("addShadingPattern()"), Ot(c, Q), this;
  }, d.beginTilingPattern = function(c) {
    D("beginTilingPattern()"), hs(c.boundingBox[0], c.boundingBox[1], c.boundingBox[2] - c.boundingBox[0], c.boundingBox[3] - c.boundingBox[1], c.matrix);
  }, d.endTilingPattern = function(c, Q) {
    D("endTilingPattern()"), Q.stream = QA[M].join(`
`), Ot(c, Q), ve.publish("endTilingPattern", Q), Dr.pop().restore();
  };
  var at = d.__private__.newObject = function() {
    var c = Ze();
    return Gt(c, !0), c;
  }, Ze = d.__private__.newObjectDeferred = function() {
    return eA++, sA[eA] = function() {
      return hA;
    }, eA;
  }, Gt = function(c, Q) {
    return Q = typeof Q == "boolean" && Q, sA[c] = hA, Q && B(c + " 0 obj"), c;
  }, Fi = d.__private__.newAdditionalObject = function() {
    var c = { objId: Ze(), content: "" };
    return EA.push(c), c;
  }, en = Ze(), vr = Ze(), mr = d.__private__.decodeColorString = function(c) {
    var Q = c.split(" ");
    if (Q.length !== 2 || Q[1] !== "g" && Q[1] !== "G")
      Q.length === 5 && (Q[4] === "k" || Q[4] === "K") && (Q = [(1 - Q[0]) * (1 - Q[3]), (1 - Q[1]) * (1 - Q[3]), (1 - Q[2]) * (1 - Q[3]), "r"]);
    else {
      var G = parseFloat(Q[0]);
      Q = [G, G, G, "r"];
    }
    for (var J = "#", aA = 0; aA < 3; aA++) J += ("0" + Math.floor(255 * parseFloat(Q[aA])).toString(16)).slice(-2);
    return J;
  }, yr = d.__private__.encodeColorString = function(c) {
    var Q;
    typeof c == "string" && (c = { ch1: c });
    var G = c.ch1, J = c.ch2, aA = c.ch3, BA = c.ch4, FA = c.pdfColorType === "draw" ? ["G", "RG", "K"] : ["g", "rg", "k"];
    if (typeof G == "string" && G.charAt(0) !== "#") {
      var PA = new Yd(G);
      if (PA.ok) G = PA.toHex();
      else if (!/^\d*\.?\d*$/.test(G)) throw new Error('Invalid color "' + G + '" passed to jsPDF.encodeColorString.');
    }
    if (typeof G == "string" && /^#[0-9A-Fa-f]{3}$/.test(G) && (G = "#" + G[1] + G[1] + G[2] + G[2] + G[3] + G[3]), typeof G == "string" && /^#[0-9A-Fa-f]{6}$/.test(G)) {
      var GA = parseInt(G.substr(1), 16);
      G = GA >> 16 & 255, J = GA >> 8 & 255, aA = 255 & GA;
    }
    if (J === void 0 || BA === void 0 && G === J && J === aA) if (typeof G == "string") Q = G + " " + FA[0];
    else switch (c.precision) {
      case 2:
        Q = Y(G / 255) + " " + FA[0];
        break;
      case 3:
      default:
        Q = x(G / 255) + " " + FA[0];
    }
    else if (BA === void 0 || Fe(BA) === "object") {
      if (BA && !isNaN(BA.a) && BA.a === 0) return Q = ["1.", "1.", "1.", FA[1]].join(" ");
      if (typeof G == "string") Q = [G, J, aA, FA[1]].join(" ");
      else switch (c.precision) {
        case 2:
          Q = [Y(G / 255), Y(J / 255), Y(aA / 255), FA[1]].join(" ");
          break;
        default:
        case 3:
          Q = [x(G / 255), x(J / 255), x(aA / 255), FA[1]].join(" ");
      }
    } else if (typeof G == "string") Q = [G, J, aA, BA, FA[2]].join(" ");
    else switch (c.precision) {
      case 2:
        Q = [Y(G), Y(J), Y(aA), Y(BA), FA[2]].join(" ");
        break;
      case 3:
      default:
        Q = [x(G), x(J), x(aA), x(BA), FA[2]].join(" ");
    }
    return Q;
  }, kr = d.__private__.getFilters = function() {
    return a;
  }, Ar = d.__private__.putStream = function(c) {
    var Q = (c = c || {}).data || "", G = c.filters || kr(), J = c.alreadyAppliedFilters || [], aA = c.addLength1 || !1, BA = Q.length, FA = c.objectId, PA = function(yt) {
      return yt;
    };
    if (g !== null && FA === void 0) throw new Error("ObjectId must be passed to putStream for file encryption");
    g !== null && (PA = mt.encryptor(FA, 0));
    var GA = {};
    G === !0 && (G = ["FlateEncode"]);
    var te = c.additionalKeyValues || [], Ae = (GA = WA.API.processDataByFilters !== void 0 ? WA.API.processDataByFilters(Q, G) : { data: Q, reverseChain: [] }).reverseChain + (Array.isArray(J) ? J.join(" ") : J.toString());
    if (GA.data.length !== 0 && (te.push({ key: "Length", value: GA.data.length }), aA === !0 && te.push({ key: "Length1", value: BA })), Ae.length != 0) if (Ae.split("/").length - 1 == 1) te.push({ key: "Filter", value: Ae });
    else {
      te.push({ key: "Filter", value: "[" + Ae + "]" });
      for (var ce = 0; ce < te.length; ce += 1) if (te[ce].key === "DecodeParms") {
        for (var ke = [], Re = 0; Re < GA.reverseChain.split("/").length - 1; Re += 1) ke.push("null");
        ke.push(te[ce].value), te[ce].value = "[" + ke.join(" ") + "]";
      }
    }
    B("<<");
    for (var At = 0; At < te.length; At++) B("/" + te[At].key + " " + te[At].value);
    B(">>"), GA.data.length !== 0 && (B("stream"), B(PA(GA.data)), B("endstream"));
  }, Pr = d.__private__.putPage = function(c) {
    var Q = c.number, G = c.data, J = c.objId, aA = c.contentsObjId;
    Gt(J, !0), B("<</Type /Page"), B("/Parent " + c.rootDictionaryObjId + " 0 R"), B("/Resources " + c.resourceDictionaryObjId + " 0 R"), B("/MediaBox [" + parseFloat(W(c.mediaBox.bottomLeftX)) + " " + parseFloat(W(c.mediaBox.bottomLeftY)) + " " + W(c.mediaBox.topRightX) + " " + W(c.mediaBox.topRightY) + "]"), c.cropBox !== null && B("/CropBox [" + W(c.cropBox.bottomLeftX) + " " + W(c.cropBox.bottomLeftY) + " " + W(c.cropBox.topRightX) + " " + W(c.cropBox.topRightY) + "]"), c.bleedBox !== null && B("/BleedBox [" + W(c.bleedBox.bottomLeftX) + " " + W(c.bleedBox.bottomLeftY) + " " + W(c.bleedBox.topRightX) + " " + W(c.bleedBox.topRightY) + "]"), c.trimBox !== null && B("/TrimBox [" + W(c.trimBox.bottomLeftX) + " " + W(c.trimBox.bottomLeftY) + " " + W(c.trimBox.topRightX) + " " + W(c.trimBox.topRightY) + "]"), c.artBox !== null && B("/ArtBox [" + W(c.artBox.bottomLeftX) + " " + W(c.artBox.bottomLeftY) + " " + W(c.artBox.topRightX) + " " + W(c.artBox.topRightY) + "]"), typeof c.userUnit == "number" && c.userUnit !== 1 && B("/UserUnit " + c.userUnit), ve.publish("putPage", { objId: J, pageContext: ZA[Q], pageNumber: Q, page: G }), B("/Contents " + aA + " 0 R"), B(">>"), B("endobj");
    var BA = G.join(`
`);
    return H === y.ADVANCED && (BA += `
Q`), Gt(aA, !0), Ar({ data: BA, filters: kr(), objectId: aA }), B("endobj"), J;
  }, Zn = d.__private__.putPages = function() {
    var c, Q, G = [];
    for (c = 1; c <= Me; c++) ZA[c].objId = Ze(), ZA[c].contentsObjId = Ze();
    for (c = 1; c <= Me; c++) G.push(Pr({ number: c, data: QA[c], objId: ZA[c].objId, contentsObjId: ZA[c].contentsObjId, mediaBox: ZA[c].mediaBox, cropBox: ZA[c].cropBox, bleedBox: ZA[c].bleedBox, trimBox: ZA[c].trimBox, artBox: ZA[c].artBox, userUnit: ZA[c].userUnit, rootDictionaryObjId: en, resourceDictionaryObjId: vr }));
    Gt(en, !0), B("<</Type /Pages");
    var J = "/Kids [";
    for (Q = 0; Q < Me; Q++) J += G[Q] + " 0 R ";
    B(J + "]"), B("/Count " + Me), B(">>"), B("endobj"), ve.publish("postPutPages");
  }, Qi = function(c) {
    ve.publish("putFont", { font: c, out: B, newObject: at, putStream: Ar }), c.isAlreadyPutted !== !0 && (c.objectNumber = at(), B("<<"), B("/Type /Font"), B("/BaseFont /" + ca(c.postScriptName)), B("/Subtype /Type1"), typeof c.encoding == "string" && B("/Encoding /" + c.encoding), B("/FirstChar 32"), B("/LastChar 255"), B(">>"), B("endobj"));
  }, Ui = function() {
    for (var c in xe) xe.hasOwnProperty(c) && (p === !1 || p === !0 && w.hasOwnProperty(c)) && Qi(xe[c]);
  }, Ei = function(c) {
    c.objectNumber = at();
    var Q = [];
    Q.push({ key: "Type", value: "/XObject" }), Q.push({ key: "Subtype", value: "/Form" }), Q.push({ key: "BBox", value: "[" + [W(c.x), W(c.y), W(c.x + c.width), W(c.y + c.height)].join(" ") + "]" }), Q.push({ key: "Matrix", value: "[" + c.matrix.toString() + "]" });
    var G = c.pages[1].join(`
`);
    Ar({ data: G, additionalKeyValues: Q, objectId: c.objectNumber }), B("endobj");
  }, xi = function() {
    for (var c in dt) dt.hasOwnProperty(c) && Ei(dt[c]);
  }, Xo = function(c, Q) {
    var G, J = [], aA = 1 / (Q - 1);
    for (G = 0; G < 1; G += aA) J.push(G);
    if (J.push(1), c[0].offset != 0) {
      var BA = { offset: 0, color: c[0].color };
      c.unshift(BA);
    }
    if (c[c.length - 1].offset != 1) {
      var FA = { offset: 1, color: c[c.length - 1].color };
      c.push(FA);
    }
    for (var PA = "", GA = 0, te = 0; te < J.length; te++) {
      for (G = J[te]; G > c[GA + 1].offset; ) GA++;
      var Ae = c[GA].offset, ce = (G - Ae) / (c[GA + 1].offset - Ae), ke = c[GA].color, Re = c[GA + 1].color;
      PA += X(Math.round((1 - ce) * ke[0] + ce * Re[0]).toString(16)) + X(Math.round((1 - ce) * ke[1] + ce * Re[1]).toString(16)) + X(Math.round((1 - ce) * ke[2] + ce * Re[2]).toString(16));
    }
    return PA.trim();
  }, pu = function(c, Q) {
    Q || (Q = 21);
    var G = at(), J = Xo(c.colors, Q), aA = [];
    aA.push({ key: "FunctionType", value: "0" }), aA.push({ key: "Domain", value: "[0.0 1.0]" }), aA.push({ key: "Size", value: "[" + Q + "]" }), aA.push({ key: "BitsPerSample", value: "8" }), aA.push({ key: "Range", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }), aA.push({ key: "Decode", value: "[0.0 1.0 0.0 1.0 0.0 1.0]" }), Ar({ data: J, additionalKeyValues: aA, alreadyAppliedFilters: ["/ASCIIHexDecode"], objectId: G }), B("endobj"), c.objectNumber = at(), B("<< /ShadingType " + c.type), B("/ColorSpace /DeviceRGB");
    var BA = "/Coords [" + W(parseFloat(c.coords[0])) + " " + W(parseFloat(c.coords[1])) + " ";
    c.type === 2 ? BA += W(parseFloat(c.coords[2])) + " " + W(parseFloat(c.coords[3])) : BA += W(parseFloat(c.coords[2])) + " " + W(parseFloat(c.coords[3])) + " " + W(parseFloat(c.coords[4])) + " " + W(parseFloat(c.coords[5])), B(BA += "]"), c.matrix && B("/Matrix [" + c.matrix.toString() + "]"), B("/Function " + G + " 0 R"), B("/Extend [true true]"), B(">>"), B("endobj");
  }, Bu = function(c, Q) {
    var G = Ze(), J = at();
    Q.push({ resourcesOid: G, objectOid: J }), c.objectNumber = J;
    var aA = [];
    aA.push({ key: "Type", value: "/Pattern" }), aA.push({ key: "PatternType", value: "1" }), aA.push({ key: "PaintType", value: "1" }), aA.push({ key: "TilingType", value: "1" }), aA.push({ key: "BBox", value: "[" + c.boundingBox.map(W).join(" ") + "]" }), aA.push({ key: "XStep", value: W(c.xStep) }), aA.push({ key: "YStep", value: W(c.yStep) }), aA.push({ key: "Resources", value: G + " 0 R" }), c.matrix && aA.push({ key: "Matrix", value: "[" + c.matrix.toString() + "]" }), Ar({ data: c.stream, additionalKeyValues: aA, objectId: c.objectNumber }), B("endobj");
  }, Li = function(c) {
    var Q;
    for (Q in we) we.hasOwnProperty(Q) && (we[Q] instanceof fi ? pu(we[Q]) : we[Q] instanceof da && Bu(we[Q], c));
  }, $o = function(c) {
    for (var Q in c.objectNumber = at(), B("<<"), c) switch (Q) {
      case "opacity":
        B("/ca " + Y(c[Q]));
        break;
      case "stroke-opacity":
        B("/CA " + Y(c[Q]));
    }
    B(">>"), B("endobj");
  }, wu = function() {
    var c;
    for (c in Pe) Pe.hasOwnProperty(c) && $o(Pe[c]);
  }, Oa = function() {
    for (var c in B("/XObject <<"), dt) dt.hasOwnProperty(c) && dt[c].objectNumber >= 0 && B("/" + c + " " + dt[c].objectNumber + " 0 R");
    ve.publish("putXobjectDict"), B(">>");
  }, vu = function() {
    mt.oid = at(), B("<<"), B("/Filter /Standard"), B("/V " + mt.v), B("/R " + mt.r), B("/U <" + mt.toHexString(mt.U) + ">"), B("/O <" + mt.toHexString(mt.O) + ">"), B("/P " + mt.P), B(">>"), B("endobj");
  }, Jo = function() {
    for (var c in B("/Font <<"), xe) xe.hasOwnProperty(c) && (p === !1 || p === !0 && w.hasOwnProperty(c)) && B("/" + c + " " + xe[c].objectNumber + " 0 R");
    B(">>");
  }, mu = function() {
    if (Object.keys(we).length > 0) {
      for (var c in B("/Shading <<"), we) we.hasOwnProperty(c) && we[c] instanceof fi && we[c].objectNumber >= 0 && B("/" + c + " " + we[c].objectNumber + " 0 R");
      ve.publish("putShadingPatternDict"), B(">>");
    }
  }, Si = function(c) {
    if (Object.keys(we).length > 0) {
      for (var Q in B("/Pattern <<"), we) we.hasOwnProperty(Q) && we[Q] instanceof d.TilingPattern && we[Q].objectNumber >= 0 && we[Q].objectNumber < c && B("/" + Q + " " + we[Q].objectNumber + " 0 R");
      ve.publish("putTilingPatternDict"), B(">>");
    }
  }, yu = function() {
    if (Object.keys(Pe).length > 0) {
      var c;
      for (c in B("/ExtGState <<"), Pe) Pe.hasOwnProperty(c) && Pe[c].objectNumber >= 0 && B("/" + c + " " + Pe[c].objectNumber + " 0 R");
      ve.publish("putGStateDict"), B(">>");
    }
  }, Ve = function(c) {
    Gt(c.resourcesOid, !0), B("<<"), B("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), Jo(), mu(), Si(c.objectOid), yu(), Oa(), B(">>"), B("endobj");
  }, Yo = function() {
    var c = [];
    Ui(), wu(), xi(), Li(c), ve.publish("putResources"), c.forEach(Ve), Ve({ resourcesOid: vr, objectOid: Number.MAX_SAFE_INTEGER }), ve.publish("postPutResources");
  }, Zo = function() {
    ve.publish("putAdditionalObjects");
    for (var c = 0; c < EA.length; c++) {
      var Q = EA[c];
      Gt(Q.objId, !0), B(Q.content), B("endobj");
    }
    ve.publish("postPutAdditionalObjects");
  }, As = function(c) {
    De[c.fontName] = De[c.fontName] || {}, De[c.fontName][c.fontStyle] = c.id;
  }, Da = function(c, Q, G, J, aA) {
    var BA = { id: "F" + (Object.keys(xe).length + 1).toString(10), postScriptName: c, fontName: Q, fontStyle: G, encoding: J, isStandardFont: aA || !1, metadata: {} };
    return ve.publish("addFont", { font: BA, instance: this }), xe[BA.id] = BA, As(BA), BA.id;
  }, bu = function(c) {
    for (var Q = 0, G = yA.length; Q < G; Q++) {
      var J = Da.call(this, c[Q][0], c[Q][1], c[Q][2], yA[Q][3], !0);
      p === !1 && (w[J] = !0);
      var aA = c[Q][0].split("-");
      As({ id: J, fontName: aA[0], fontStyle: aA[1] || "" });
    }
    ve.publish("addFonts", { fonts: xe, dictionary: De });
  }, br = function(c) {
    return c.foo = function() {
      try {
        return c.apply(this, arguments);
      } catch (J) {
        var Q = J.stack || "";
        ~Q.indexOf(" at ") && (Q = Q.split(" at ")[1]);
        var G = "Error in function " + Q.split(`
`)[0].split("<")[0] + ": " + J.message;
        if (!XA.console) throw new Error(G);
        XA.console.error(G, J), XA.alert && alert(G);
      }
    }, c.foo.bar = c, c.foo;
  }, Ii = function(c, Q) {
    var G, J, aA, BA, FA, PA, GA, te, Ae;
    if (aA = (Q = Q || {}).sourceEncoding || "Unicode", FA = Q.outputEncoding, (Q.autoencode || FA) && xe[ae].metadata && xe[ae].metadata[aA] && xe[ae].metadata[aA].encoding && (BA = xe[ae].metadata[aA].encoding, !FA && xe[ae].encoding && (FA = xe[ae].encoding), !FA && BA.codePages && (FA = BA.codePages[0]), typeof FA == "string" && (FA = BA[FA]), FA)) {
      for (GA = !1, PA = [], G = 0, J = c.length; G < J; G++) (te = FA[c.charCodeAt(G)]) ? PA.push(String.fromCharCode(te)) : PA.push(c[G]), PA[G].charCodeAt(0) >> 8 && (GA = !0);
      c = PA.join("");
    }
    for (G = c.length; GA === void 0 && G !== 0; ) c.charCodeAt(G - 1) >> 8 && (GA = !0), G--;
    if (!GA) return c;
    for (PA = Q.noBOM ? [] : [254, 255], G = 0, J = c.length; G < J; G++) {
      if ((Ae = (te = c.charCodeAt(G)) >> 8) >> 8) throw new Error("Character at position " + G + " of string '" + c + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
      PA.push(Ae), PA.push(te - (Ae << 8));
    }
    return String.fromCharCode.apply(void 0, PA);
  }, Dt = d.__private__.pdfEscape = d.pdfEscape = function(c, Q) {
    return Ii(c, Q).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }, Ta = d.__private__.beginPage = function(c) {
    QA[++Me] = [], ZA[Me] = { objId: 0, contentsObjId: 0, userUnit: Number(l), artBox: null, bleedBox: null, cropBox: null, trimBox: null, mediaBox: { bottomLeftX: 0, bottomLeftY: 0, topRightX: Number(c[0]), topRightY: Number(c[1]) } }, ts(Me), V(QA[M]);
  }, es = function(c, Q) {
    var G, J, aA;
    switch (t = Q || t, typeof c == "string" && (G = m(c.toLowerCase()), Array.isArray(G) && (J = G[0], aA = G[1])), Array.isArray(c) && (J = c[0] * TA, aA = c[1] * TA), isNaN(J) && (J = n[0], aA = n[1]), (J > 14400 || aA > 14400) && (Se.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"), J = Math.min(14400, J), aA = Math.min(14400, aA)), n = [J, aA], t.substr(0, 1)) {
      case "l":
        aA > J && (n = [aA, J]);
        break;
      case "p":
        J > aA && (n = [aA, J]);
    }
    Ta(n), ss(Ra), B(Cr), ja !== 0 && B(ja + " J"), Ga !== 0 && B(Ga + " j"), ve.publish("addPage", { pageNumber: Me });
  }, Cu = function(c) {
    c > 0 && c <= Me && (QA.splice(c, 1), ZA.splice(c, 1), Me--, M > Me && (M = Me), this.setPage(M));
  }, ts = function(c) {
    c > 0 && c <= Me && (M = c);
  }, Fu = d.__private__.getNumberOfPages = d.getNumberOfPages = function() {
    return QA.length - 1;
  }, rs = function(c, Q, G) {
    var J, aA = void 0;
    return G = G || {}, c = c !== void 0 ? c : xe[ae].fontName, Q = Q !== void 0 ? Q : xe[ae].fontStyle, J = c.toLowerCase(), De[J] !== void 0 && De[J][Q] !== void 0 ? aA = De[J][Q] : De[c] !== void 0 && De[c][Q] !== void 0 ? aA = De[c][Q] : G.disableWarning === !1 && Se.warn("Unable to look up font label for font '" + c + "', '" + Q + "'. Refer to getFontList() for available fonts."), aA || G.noFallback || (aA = De.times[Q]) == null && (aA = De.times.normal), aA;
  }, Qu = d.__private__.putInfo = function() {
    var c = at(), Q = function(J) {
      return J;
    };
    for (var G in g !== null && (Q = mt.encryptor(c, 0)), B("<<"), B("/Producer (" + Dt(Q("jsPDF " + WA.version)) + ")"), JA) JA.hasOwnProperty(G) && JA[G] && B("/" + G.substr(0, 1).toUpperCase() + G.substr(1) + " (" + Dt(Q(JA[G])) + ")");
    B("/CreationDate (" + Dt(Q(nA)) + ")"), B(">>"), B("endobj");
  }, ka = d.__private__.putCatalog = function(c) {
    var Q = (c = c || {}).rootDictionaryObjId || en;
    switch (at(), B("<<"), B("/Type /Catalog"), B("/Pages " + Q + " 0 R"), UA || (UA = "fullwidth"), UA) {
      case "fullwidth":
        B("/OpenAction [3 0 R /FitH null]");
        break;
      case "fullheight":
        B("/OpenAction [3 0 R /FitV null]");
        break;
      case "fullpage":
        B("/OpenAction [3 0 R /Fit]");
        break;
      case "original":
        B("/OpenAction [3 0 R /XYZ null null 1]");
        break;
      default:
        var G = "" + UA;
        G.substr(G.length - 1) === "%" && (UA = parseInt(UA) / 100), typeof UA == "number" && B("/OpenAction [3 0 R /XYZ null null " + Y(UA) + "]");
    }
    switch (ie || (ie = "continuous"), ie) {
      case "continuous":
        B("/PageLayout /OneColumn");
        break;
      case "single":
        B("/PageLayout /SinglePage");
        break;
      case "two":
      case "twoleft":
        B("/PageLayout /TwoColumnLeft");
        break;
      case "tworight":
        B("/PageLayout /TwoColumnRight");
    }
    $A && B("/PageMode /" + $A), ve.publish("putCatalog"), B(">>"), B("endobj");
  }, Uu = d.__private__.putTrailer = function() {
    B("trailer"), B("<<"), B("/Size " + (eA + 1)), B("/Root " + eA + " 0 R"), B("/Info " + (eA - 1) + " 0 R"), g !== null && B("/Encrypt " + mt.oid + " 0 R"), B("/ID [ <" + iA + "> <" + iA + "> ]"), B(">>");
  }, Eu = d.__private__.putHeader = function() {
    B("%PDF-" + C), B("%ºß¬à");
  }, xu = d.__private__.putXRef = function() {
    var c = "0000000000";
    B("xref"), B("0 " + (eA + 1)), B("0000000000 65535 f ");
    for (var Q = 1; Q <= eA; Q++)
      typeof sA[Q] == "function" ? B((c + sA[Q]()).slice(-10) + " 00000 n ") : sA[Q] !== void 0 ? B((c + sA[Q]).slice(-10) + " 00000 n ") : B("0000000000 00000 n ");
  }, tn = d.__private__.buildDocument = function() {
    zA(), V(fA), ve.publish("buildDocument"), Eu(), Zn(), Zo(), Yo(), g !== null && vu(), Qu(), ka();
    var c = hA;
    return xu(), Uu(), B("startxref"), B("" + c), B("%%EOF"), V(QA[M]), fA.join(`
`);
  }, _i = d.__private__.getBlob = function(c) {
    return new Blob([xA(c)], { type: "application/pdf" });
  }, Ni = d.output = d.__private__.output = br(function(c, Q) {
    switch (typeof (Q = Q || {}) == "string" ? Q = { filename: Q } : Q.filename = Q.filename || "generated.pdf", c) {
      case void 0:
        return tn();
      case "save":
        d.save(Q.filename);
        break;
      case "arraybuffer":
        return xA(tn());
      case "blob":
        return _i(tn());
      case "bloburi":
      case "bloburl":
        if (XA.URL !== void 0 && typeof XA.URL.createObjectURL == "function") return XA.URL && XA.URL.createObjectURL(_i(tn())) || void 0;
        Se.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");
        break;
      case "datauristring":
      case "dataurlstring":
        var G = "", J = tn();
        try {
          G = $c(J);
        } catch {
          G = $c(unescape(encodeURIComponent(J)));
        }
        return "data:application/pdf;filename=" + Q.filename + ";base64," + G;
      case "pdfobjectnewwindow":
        if (Object.prototype.toString.call(XA) === "[object Window]") {
          var aA = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js", BA = ' integrity="sha512-4ze/a9/4jqu+tX9dfOqJYSvyYd5M6qum/3HpCLr+/Jqf0whc37VUbkpNGHR7/8pSnCFw47T1fmIpwBV7UySh3g==" crossorigin="anonymous"';
          Q.pdfObjectUrl && (aA = Q.pdfObjectUrl, BA = "");
          var FA = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="' + aA + '"' + BA + '><\/script><script >PDFObject.embed("' + this.output("dataurlstring") + '", ' + JSON.stringify(Q) + ");<\/script></body></html>", PA = XA.open();
          return PA !== null && PA.document.write(FA), PA;
        }
        throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");
      case "pdfjsnewwindow":
        if (Object.prototype.toString.call(XA) === "[object Window]") {
          var GA = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="' + (Q.pdfJsUrl || "examples/PDF.js/web/viewer.html") + "?file=&downloadName=" + Q.filename + '" width="500px" height="400px" /></body></html>', te = XA.open();
          if (te !== null) {
            te.document.write(GA);
            var Ae = this;
            te.document.documentElement.querySelector("#pdfViewer").onload = function() {
              te.document.title = Q.filename, te.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(Ae.output("bloburl"));
            };
          }
          return te;
        }
        throw new Error("The option pdfjsnewwindow just works in a browser-environment.");
      case "dataurlnewwindow":
        if (Object.prototype.toString.call(XA) !== "[object Window]") throw new Error("The option dataurlnewwindow just works in a browser-environment.");
        var ce = '<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="' + this.output("datauristring", Q) + '"></iframe></body></html>', ke = XA.open();
        if (ke !== null && (ke.document.write(ce), ke.document.title = Q.filename), ke || typeof safari > "u") return ke;
        break;
      case "datauri":
      case "dataurl":
        return XA.document.location.href = this.output("datauristring", Q);
      default:
        return null;
    }
  }), ns = function(c) {
    return Array.isArray(Yn) === !0 && Yn.indexOf(c) > -1;
  };
  switch (r) {
    case "pt":
      TA = 1;
      break;
    case "mm":
      TA = 72 / 25.4;
      break;
    case "cm":
      TA = 72 / 2.54;
      break;
    case "in":
      TA = 72;
      break;
    case "px":
      TA = ns("px_scaling") == 1 ? 0.75 : 96 / 72;
      break;
    case "pc":
    case "em":
      TA = 12;
      break;
    case "ex":
      TA = 6;
      break;
    default:
      if (typeof r != "number") throw new Error("Invalid unit: " + r);
      TA = r;
  }
  var mt = null;
  LA(), oA();
  var Lu = function(c) {
    return g !== null ? mt.encryptor(c, 0) : function(Q) {
      return Q;
    };
  }, is = d.__private__.getPageInfo = d.getPageInfo = function(c) {
    if (isNaN(c) || c % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfo");
    return { objId: ZA[c].objId, pageNumber: c, pageContext: ZA[c] };
  }, YA = d.__private__.getPageInfoByObjId = function(c) {
    if (isNaN(c) || c % 1 != 0) throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");
    for (var Q in ZA) if (ZA[Q].objId === c) break;
    return is(Q);
  }, Su = d.__private__.getCurrentPageInfo = d.getCurrentPageInfo = function() {
    return { objId: ZA[M].objId, pageNumber: M, pageContext: ZA[M] };
  };
  d.addPage = function() {
    return es.apply(this, arguments), this;
  }, d.setPage = function() {
    return ts.apply(this, arguments), V.call(this, QA[M]), this;
  }, d.insertPage = function(c) {
    return this.addPage(), this.movePage(M, c), this;
  }, d.movePage = function(c, Q) {
    var G, J;
    if (c > Q) {
      G = QA[c], J = ZA[c];
      for (var aA = c; aA > Q; aA--) QA[aA] = QA[aA - 1], ZA[aA] = ZA[aA - 1];
      QA[Q] = G, ZA[Q] = J, this.setPage(Q);
    } else if (c < Q) {
      G = QA[c], J = ZA[c];
      for (var BA = c; BA < Q; BA++) QA[BA] = QA[BA + 1], ZA[BA] = ZA[BA + 1];
      QA[Q] = G, ZA[Q] = J, this.setPage(Q);
    }
    return this;
  }, d.deletePage = function() {
    return Cu.apply(this, arguments), this;
  }, d.__private__.text = d.text = function(c, Q, G, J, aA) {
    var BA, FA, PA, GA, te, Ae, ce, ke, Re, At = (J = J || {}).scope || this;
    if (typeof c == "number" && typeof Q == "number" && (typeof G == "string" || Array.isArray(G))) {
      var yt = G;
      G = Q, Q = c, c = yt;
    }
    if (arguments[3] instanceof qA ? (D("The transform parameter of text() with a Matrix value"), Re = aA) : (PA = arguments[4], GA = arguments[5], Fe(ce = arguments[3]) === "object" && ce !== null || (typeof PA == "string" && (GA = PA, PA = null), typeof ce == "string" && (GA = ce, ce = null), typeof ce == "number" && (PA = ce, ce = null), J = { flags: ce, angle: PA, align: GA })), isNaN(Q) || isNaN(G) || c == null) throw new Error("Invalid arguments passed to jsPDF.text");
    if (c.length === 0) return At;
    var lt = "", Fr = !1, Vt = typeof J.lineHeightFactor == "number" ? J.lineHeightFactor : ei, Kr = At.internal.scaleFactor;
    function ds(Ie) {
      return Ie = Ie.split("	").join(Array(J.TabLen || 9).join(" ")), Dt(Ie, ce);
    }
    function Xa(Ie) {
      for (var _e, qe = Ie.concat(), ot = [], sn = qe.length; sn--; ) typeof (_e = qe.shift()) == "string" ? ot.push(_e) : Array.isArray(Ie) && (_e.length === 1 || _e[1] === void 0 && _e[2] === void 0) ? ot.push(_e[0]) : ot.push([_e[0], _e[1], _e[2]]);
      return ot;
    }
    function $a(Ie, _e) {
      var qe;
      if (typeof Ie == "string") qe = _e(Ie)[0];
      else if (Array.isArray(Ie)) {
        for (var ot, sn, no = Ie.concat(), Wi = [], vs = no.length; vs--; ) typeof (ot = no.shift()) == "string" ? Wi.push(_e(ot)[0]) : Array.isArray(ot) && typeof ot[0] == "string" && (sn = _e(ot[0], ot[1], ot[2]), Wi.push([sn[0], sn[1], sn[2]]));
        qe = Wi;
      }
      return qe;
    }
    var Pi = !1, Ja = !0;
    if (typeof c == "string") Pi = !0;
    else if (Array.isArray(c)) {
      var Ya = c.concat();
      FA = [];
      for (var Mi, gt = Ya.length; gt--; ) (typeof (Mi = Ya.shift()) != "string" || Array.isArray(Mi) && typeof Mi[0] != "string") && (Ja = !1);
      Pi = Ja;
    }
    if (Pi === !1) throw new Error('Type of text must be string or Array. "' + c + '" is not recognized.');
    typeof c == "string" && (c = c.match(/[\r?\n]/) ? c.split(/\r\n|\r|\n/g) : [c]);
    var Ri = $ / At.internal.scaleFactor, Ki = Ri * (Vt - 1);
    switch (J.baseline) {
      case "bottom":
        G -= Ki;
        break;
      case "top":
        G += Ri - Ki;
        break;
      case "hanging":
        G += Ri - 2 * Ki;
        break;
      case "middle":
        G += Ri / 2 - Ki;
    }
    if ((Ae = J.maxWidth || 0) > 0 && (typeof c == "string" ? c = At.splitTextToSize(c, Ae) : Object.prototype.toString.call(c) === "[object Array]" && (c = c.reduce(function(Ie, _e) {
      return Ie.concat(At.splitTextToSize(_e, Ae));
    }, []))), BA = { text: c, x: Q, y: G, options: J, mutex: { pdfEscape: Dt, activeFontKey: ae, fonts: xe, activeFontSize: $ } }, ve.publish("preProcessText", BA), c = BA.text, PA = (J = BA.options).angle, !(Re instanceof qA) && PA && typeof PA == "number") {
      PA *= Math.PI / 180, J.rotationDirection === 0 && (PA = -PA), H === y.ADVANCED && (PA = -PA);
      var ji = Math.cos(PA), Za = Math.sin(PA);
      Re = new qA(ji, Za, -Za, ji, 0, 0);
    } else PA && PA instanceof qA && (Re = PA);
    H !== y.ADVANCED || Re || (Re = Tr), (te = J.charSpace || Di) !== void 0 && (lt += W(I(te)) + ` Tc
`, this.setCharSpace(this.getCharSpace() || 0)), (ke = J.horizontalScale) !== void 0 && (lt += W(100 * ke) + ` Tz
`), J.lang;
    var Tt = -1, Mu = J.renderingMode !== void 0 ? J.renderingMode : J.stroke, Ao = At.internal.getCurrentPageInfo().pageContext;
    switch (Mu) {
      case 0:
      case !1:
      case "fill":
        Tt = 0;
        break;
      case 1:
      case !0:
      case "stroke":
        Tt = 1;
        break;
      case 2:
      case "fillThenStroke":
        Tt = 2;
        break;
      case 3:
      case "invisible":
        Tt = 3;
        break;
      case 4:
      case "fillAndAddForClipping":
        Tt = 4;
        break;
      case 5:
      case "strokeAndAddPathForClipping":
        Tt = 5;
        break;
      case 6:
      case "fillThenStrokeAndAddToPathForClipping":
        Tt = 6;
        break;
      case 7:
      case "addToPathForClipping":
        Tt = 7;
    }
    var gs = Ao.usedRenderingMode !== void 0 ? Ao.usedRenderingMode : -1;
    Tt !== -1 ? lt += Tt + ` Tr
` : gs !== -1 && (lt += `0 Tr
`), Tt !== -1 && (Ao.usedRenderingMode = Tt), GA = J.align || "left";
    var er, Gi = $ * Vt, ps = At.internal.pageSize.getWidth(), Bs = xe[ae];
    te = J.charSpace || Di, Ae = J.maxWidth || 0, ce = Object.assign({ autoencode: !0, noBOM: !0 }, J.flags);
    var bn = [], ni = function(Ie) {
      return At.getStringUnitWidth(Ie, { font: Bs, charSpace: te, fontSize: $, doKerning: !1 }) * $ / Kr;
    };
    if (Object.prototype.toString.call(c) === "[object Array]") {
      var kt;
      FA = Xa(c), GA !== "left" && (er = FA.map(ni));
      var Lt, Cn = 0;
      if (GA === "right") {
        Q -= er[0], c = [], gt = FA.length;
        for (var nn = 0; nn < gt; nn++) nn === 0 ? (Lt = Rr(Q), kt = rn(G)) : (Lt = I(Cn - er[nn]), kt = -Gi), c.push([FA[nn], Lt, kt]), Cn = er[nn];
      } else if (GA === "center") {
        Q -= er[0] / 2, c = [], gt = FA.length;
        for (var an = 0; an < gt; an++) an === 0 ? (Lt = Rr(Q), kt = rn(G)) : (Lt = I((Cn - er[an]) / 2), kt = -Gi), c.push([FA[an], Lt, kt]), Cn = er[an];
      } else if (GA === "left") {
        c = [], gt = FA.length;
        for (var Vi = 0; Vi < gt; Vi++) c.push(FA[Vi]);
      } else if (GA === "justify" && Bs.encoding === "Identity-H") {
        c = [], gt = FA.length, Ae = Ae !== 0 ? Ae : ps;
        for (var on = 0, ze = 0; ze < gt; ze++) if (kt = ze === 0 ? rn(G) : -Gi, Lt = ze === 0 ? Rr(Q) : on, ze < gt - 1) {
          var eo = I((Ae - er[ze]) / (FA[ze].split(" ").length - 1)), St = FA[ze].split(" ");
          c.push([St[0] + " ", Lt, kt]), on = 0;
          for (var tr = 1; tr < St.length; tr++) {
            var zi = (ni(St[tr - 1] + " " + St[tr]) - ni(St[tr])) * Kr + eo;
            tr == St.length - 1 ? c.push([St[tr], zi, 0]) : c.push([St[tr] + " ", zi, 0]), on -= zi;
          }
        } else c.push([FA[ze], Lt, kt]);
        c.push(["", on, 0]);
      } else {
        if (GA !== "justify") throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');
        for (c = [], gt = FA.length, Ae = Ae !== 0 ? Ae : ps, ze = 0; ze < gt; ze++) kt = ze === 0 ? rn(G) : -Gi, Lt = ze === 0 ? Rr(Q) : 0, ze < gt - 1 ? bn.push(W(I((Ae - er[ze]) / (FA[ze].split(" ").length - 1)))) : bn.push(0), c.push([FA[ze], Lt, kt]);
      }
    }
    var ws = typeof J.R2L == "boolean" ? J.R2L : KA;
    ws === !0 && (c = $a(c, function(Ie, _e, qe) {
      return [Ie.split("").reverse().join(""), _e, qe];
    })), BA = { text: c, x: Q, y: G, options: J, mutex: { pdfEscape: Dt, activeFontKey: ae, fonts: xe, activeFontSize: $ } }, ve.publish("postProcessText", BA), c = BA.text, Fr = BA.mutex.isHex || !1;
    var to = xe[ae].encoding;
    to !== "WinAnsiEncoding" && to !== "StandardEncoding" || (c = $a(c, function(Ie, _e, qe) {
      return [ds(Ie), _e, qe];
    })), FA = Xa(c), c = [];
    for (var ii, ai, Fn, oi = 0, qi = 1, si = Array.isArray(FA[0]) ? qi : oi, Qn = "", ro = function(Ie, _e, qe) {
      var ot = "";
      return qe instanceof qA ? (qe = typeof J.angle == "number" ? wr(qe, new qA(1, 0, 0, 1, Ie, _e)) : wr(new qA(1, 0, 0, 1, Ie, _e), qe), H === y.ADVANCED && (qe = wr(new qA(1, 0, 0, -1, 0, 0), qe)), ot = qe.join(" ") + ` Tm
`) : ot = W(Ie) + " " + W(_e) + ` Td
`, ot;
    }, rr = 0; rr < FA.length; rr++) {
      switch (Qn = "", si) {
        case qi:
          Fn = (Fr ? "<" : "(") + FA[rr][0] + (Fr ? ">" : ")"), ii = parseFloat(FA[rr][1]), ai = parseFloat(FA[rr][2]);
          break;
        case oi:
          Fn = (Fr ? "<" : "(") + FA[rr] + (Fr ? ">" : ")"), ii = Rr(Q), ai = rn(G);
      }
      bn !== void 0 && bn[rr] !== void 0 && (Qn = bn[rr] + ` Tw
`), rr === 0 ? c.push(Qn + ro(ii, ai, Re) + Fn) : si === oi ? c.push(Qn + Fn) : si === qi && c.push(Qn + ro(ii, ai, Re) + Fn);
    }
    c = si === oi ? c.join(` Tj
T* `) : c.join(` Tj
`), c += ` Tj
`;
    var nr = `BT
/`;
    return nr += ae + " " + $ + ` Tf
`, nr += W($ * Vt) + ` TL
`, nr += ti + `
`, nr += lt, nr += c, B(nr += "ET"), w[ae] = !0, At;
  };
  var Iu = d.__private__.clip = d.clip = function(c) {
    return B(c === "evenodd" ? "W*" : "W"), this;
  };
  d.clipEvenOdd = function() {
    return Iu("evenodd");
  }, d.__private__.discardPath = d.discardPath = function() {
    return B("n"), this;
  };
  var Mr = d.__private__.isValidStyle = function(c) {
    var Q = !1;
    return [void 0, null, "S", "D", "F", "DF", "FD", "f", "f*", "B", "B*", "n"].indexOf(c) !== -1 && (Q = !0), Q;
  };
  d.__private__.setDefaultPathOperation = d.setDefaultPathOperation = function(c) {
    return Mr(c) && (f = c), this;
  };
  var as = d.__private__.getStyle = d.getStyle = function(c) {
    var Q = f;
    switch (c) {
      case "D":
      case "S":
        Q = "S";
        break;
      case "F":
        Q = "f";
        break;
      case "FD":
      case "DF":
        Q = "B";
        break;
      case "f":
      case "f*":
      case "B":
      case "B*":
        Q = c;
    }
    return Q;
  }, os = d.close = function() {
    return B("h"), this;
  };
  d.stroke = function() {
    return B("S"), this;
  }, d.fill = function(c) {
    return Hi("f", c), this;
  }, d.fillEvenOdd = function(c) {
    return Hi("f*", c), this;
  }, d.fillStroke = function(c) {
    return Hi("B", c), this;
  }, d.fillStrokeEvenOdd = function(c) {
    return Hi("B*", c), this;
  };
  var Hi = function(c, Q) {
    Fe(Q) === "object" ? Nu(Q, c) : B(c);
  }, Pa = function(c) {
    c === null || H === y.ADVANCED && c === void 0 || (c = as(c), B(c));
  };
  function _u(c, Q, G, J, aA) {
    var BA = new da(Q || this.boundingBox, G || this.xStep, J || this.yStep, this.gState, aA || this.matrix);
    BA.stream = this.stream;
    var FA = c + "$$" + this.cloneIndex++ + "$$";
    return Ot(FA, BA), BA;
  }
  var Nu = function(c, Q) {
    var G = Jn[c.key], J = we[G];
    if (J instanceof fi) B("q"), B(Hu(Q)), J.gState && d.setGState(J.gState), B(c.matrix.toString() + " cm"), B("/" + G + " sh"), B("Q");
    else if (J instanceof da) {
      var aA = new qA(1, 0, 0, -1, 0, yn());
      c.matrix && (aA = aA.multiply(c.matrix || Tr), G = _u.call(J, c.key, c.boundingBox, c.xStep, c.yStep, aA).id), B("q"), B("/Pattern cs"), B("/" + G + " scn"), J.gState && d.setGState(J.gState), B(Q), B("Q");
    }
  }, Hu = function(c) {
    switch (c) {
      case "f":
      case "F":
        return "W n";
      case "f*":
        return "W* n";
      case "B":
        return "W S";
      case "B*":
        return "W* S";
      case "S":
        return "W S";
      case "n":
        return "W n";
    }
  }, Ma = d.moveTo = function(c, Q) {
    return B(W(I(c)) + " " + W(K(Q)) + " m"), this;
  }, Ai = d.lineTo = function(c, Q) {
    return B(W(I(c)) + " " + W(K(Q)) + " l"), this;
  }, vn = d.curveTo = function(c, Q, G, J, aA, BA) {
    return B([W(I(c)), W(K(Q)), W(I(G)), W(K(J)), W(I(aA)), W(K(BA)), "c"].join(" ")), this;
  };
  d.__private__.line = d.line = function(c, Q, G, J, aA) {
    if (isNaN(c) || isNaN(Q) || isNaN(G) || isNaN(J) || !Mr(aA)) throw new Error("Invalid arguments passed to jsPDF.line");
    return H === y.COMPAT ? this.lines([[G - c, J - Q]], c, Q, [1, 1], aA || "S") : this.lines([[G - c, J - Q]], c, Q, [1, 1]).stroke();
  }, d.__private__.lines = d.lines = function(c, Q, G, J, aA, BA) {
    var FA, PA, GA, te, Ae, ce, ke, Re, At, yt, lt, Fr;
    if (typeof c == "number" && (Fr = G, G = Q, Q = c, c = Fr), J = J || [1, 1], BA = BA || !1, isNaN(Q) || isNaN(G) || !Array.isArray(c) || !Array.isArray(J) || !Mr(aA) || typeof BA != "boolean") throw new Error("Invalid arguments passed to jsPDF.lines");
    for (Ma(Q, G), FA = J[0], PA = J[1], te = c.length, yt = Q, lt = G, GA = 0; GA < te; GA++) (Ae = c[GA]).length === 2 ? (yt = Ae[0] * FA + yt, lt = Ae[1] * PA + lt, Ai(yt, lt)) : (ce = Ae[0] * FA + yt, ke = Ae[1] * PA + lt, Re = Ae[2] * FA + yt, At = Ae[3] * PA + lt, yt = Ae[4] * FA + yt, lt = Ae[5] * PA + lt, vn(ce, ke, Re, At, yt, lt));
    return BA && os(), Pa(aA), this;
  }, d.path = function(c) {
    for (var Q = 0; Q < c.length; Q++) {
      var G = c[Q], J = G.c;
      switch (G.op) {
        case "m":
          Ma(J[0], J[1]);
          break;
        case "l":
          Ai(J[0], J[1]);
          break;
        case "c":
          vn.apply(this, J);
          break;
        case "h":
          os();
      }
    }
    return this;
  }, d.__private__.rect = d.rect = function(c, Q, G, J, aA) {
    if (isNaN(c) || isNaN(Q) || isNaN(G) || isNaN(J) || !Mr(aA)) throw new Error("Invalid arguments passed to jsPDF.rect");
    return H === y.COMPAT && (J = -J), B([W(I(c)), W(K(Q)), W(I(G)), W(I(J)), "re"].join(" ")), Pa(aA), this;
  }, d.__private__.triangle = d.triangle = function(c, Q, G, J, aA, BA, FA) {
    if (isNaN(c) || isNaN(Q) || isNaN(G) || isNaN(J) || isNaN(aA) || isNaN(BA) || !Mr(FA)) throw new Error("Invalid arguments passed to jsPDF.triangle");
    return this.lines([[G - c, J - Q], [aA - G, BA - J], [c - aA, Q - BA]], c, Q, [1, 1], FA, !0), this;
  }, d.__private__.roundedRect = d.roundedRect = function(c, Q, G, J, aA, BA, FA) {
    if (isNaN(c) || isNaN(Q) || isNaN(G) || isNaN(J) || isNaN(aA) || isNaN(BA) || !Mr(FA)) throw new Error("Invalid arguments passed to jsPDF.roundedRect");
    var PA = 4 / 3 * (Math.SQRT2 - 1);
    return aA = Math.min(aA, 0.5 * G), BA = Math.min(BA, 0.5 * J), this.lines([[G - 2 * aA, 0], [aA * PA, 0, aA, BA - BA * PA, aA, BA], [0, J - 2 * BA], [0, BA * PA, -aA * PA, BA, -aA, BA], [2 * aA - G, 0], [-aA * PA, 0, -aA, -BA * PA, -aA, -BA], [0, 2 * BA - J], [0, -BA * PA, aA * PA, -BA, aA, -BA]], c + aA, Q, [1, 1], FA, !0), this;
  }, d.__private__.ellipse = d.ellipse = function(c, Q, G, J, aA) {
    if (isNaN(c) || isNaN(Q) || isNaN(G) || isNaN(J) || !Mr(aA)) throw new Error("Invalid arguments passed to jsPDF.ellipse");
    var BA = 4 / 3 * (Math.SQRT2 - 1) * G, FA = 4 / 3 * (Math.SQRT2 - 1) * J;
    return Ma(c + G, Q), vn(c + G, Q - FA, c + BA, Q - J, c, Q - J), vn(c - BA, Q - J, c - G, Q - FA, c - G, Q), vn(c - G, Q + FA, c - BA, Q + J, c, Q + J), vn(c + BA, Q + J, c + G, Q + FA, c + G, Q), Pa(aA), this;
  }, d.__private__.circle = d.circle = function(c, Q, G, J) {
    if (isNaN(c) || isNaN(Q) || isNaN(G) || !Mr(J)) throw new Error("Invalid arguments passed to jsPDF.circle");
    return this.ellipse(c, Q, G, G, J);
  }, d.setFont = function(c, Q, G) {
    return G && (Q = q(Q, G)), ae = rs(c, Q, { disableWarning: !1 }), this;
  };
  var Ou = d.__private__.getFont = d.getFont = function() {
    return xe[rs.apply(d, arguments)];
  };
  d.__private__.getFontList = d.getFontList = function() {
    var c, Q, G = {};
    for (c in De) if (De.hasOwnProperty(c)) for (Q in G[c] = [], De[c]) De[c].hasOwnProperty(Q) && G[c].push(Q);
    return G;
  }, d.addFont = function(c, Q, G, J, aA) {
    var BA = ["StandardEncoding", "MacRomanEncoding", "Identity-H", "WinAnsiEncoding"];
    return arguments[3] && BA.indexOf(arguments[3]) !== -1 ? aA = arguments[3] : arguments[3] && BA.indexOf(arguments[3]) == -1 && (G = q(G, J)), aA = aA || "Identity-H", Da.call(this, c, Q, G, aA);
  };
  var ei, Ra = e.lineWidth || 0.200025, Oi = d.__private__.getLineWidth = d.getLineWidth = function() {
    return Ra;
  }, ss = d.__private__.setLineWidth = d.setLineWidth = function(c) {
    return Ra = c, B(W(I(c)) + " w"), this;
  };
  d.__private__.setLineDash = WA.API.setLineDash = WA.API.setLineDashPattern = function(c, Q) {
    if (c = c || [], Q = Q || 0, isNaN(Q) || !Array.isArray(c)) throw new Error("Invalid arguments passed to jsPDF.setLineDash");
    return c = c.map(function(G) {
      return W(I(G));
    }).join(" "), Q = W(I(Q)), B("[" + c + "] " + Q + " d"), this;
  };
  var ls = d.__private__.getLineHeight = d.getLineHeight = function() {
    return $ * ei;
  };
  d.__private__.getLineHeight = d.getLineHeight = function() {
    return $ * ei;
  };
  var us = d.__private__.setLineHeightFactor = d.setLineHeightFactor = function(c) {
    return typeof (c = c || 1.15) == "number" && (ei = c), this;
  }, cs = d.__private__.getLineHeightFactor = d.getLineHeightFactor = function() {
    return ei;
  };
  us(e.lineHeight);
  var Rr = d.__private__.getHorizontalCoordinate = function(c) {
    return I(c);
  }, rn = d.__private__.getVerticalCoordinate = function(c) {
    return H === y.ADVANCED ? c : ZA[M].mediaBox.topRightY - ZA[M].mediaBox.bottomLeftY - I(c);
  }, Du = d.__private__.getHorizontalCoordinateString = d.getHorizontalCoordinateString = function(c) {
    return W(Rr(c));
  }, mn = d.__private__.getVerticalCoordinateString = d.getVerticalCoordinateString = function(c) {
    return W(rn(c));
  }, Cr = e.strokeColor || "0 G";
  d.__private__.getStrokeColor = d.getDrawColor = function() {
    return mr(Cr);
  }, d.__private__.setStrokeColor = d.setDrawColor = function(c, Q, G, J) {
    return Cr = yr({ ch1: c, ch2: Q, ch3: G, ch4: J, pdfColorType: "draw", precision: 2 }), B(Cr), this;
  };
  var Ka = e.fillColor || "0 g";
  d.__private__.getFillColor = d.getFillColor = function() {
    return mr(Ka);
  }, d.__private__.setFillColor = d.setFillColor = function(c, Q, G, J) {
    return Ka = yr({ ch1: c, ch2: Q, ch3: G, ch4: J, pdfColorType: "fill", precision: 2 }), B(Ka), this;
  };
  var ti = e.textColor || "0 g", Tu = d.__private__.getTextColor = d.getTextColor = function() {
    return mr(ti);
  };
  d.__private__.setTextColor = d.setTextColor = function(c, Q, G, J) {
    return ti = yr({ ch1: c, ch2: Q, ch3: G, ch4: J, pdfColorType: "text", precision: 3 }), this;
  };
  var Di = e.charSpace, ku = d.__private__.getCharSpace = d.getCharSpace = function() {
    return parseFloat(Di || 0);
  };
  d.__private__.setCharSpace = d.setCharSpace = function(c) {
    if (isNaN(c)) throw new Error("Invalid argument passed to jsPDF.setCharSpace");
    return Di = c, this;
  };
  var ja = 0;
  d.CapJoinStyles = { 0: 0, butt: 0, but: 0, miter: 0, 1: 1, round: 1, rounded: 1, circle: 1, 2: 2, projecting: 2, project: 2, square: 2, bevel: 2 }, d.__private__.setLineCap = d.setLineCap = function(c) {
    var Q = d.CapJoinStyles[c];
    if (Q === void 0) throw new Error("Line cap style of '" + c + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return ja = Q, B(Q + " J"), this;
  };
  var Ga = 0;
  d.__private__.setLineJoin = d.setLineJoin = function(c) {
    var Q = d.CapJoinStyles[c];
    if (Q === void 0) throw new Error("Line join style of '" + c + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
    return Ga = Q, B(Q + " j"), this;
  }, d.__private__.setLineMiterLimit = d.__private__.setMiterLimit = d.setLineMiterLimit = d.setMiterLimit = function(c) {
    if (c = c || 0, isNaN(c)) throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");
    return B(W(I(c)) + " M"), this;
  }, d.GState = El, d.setGState = function(c) {
    (c = typeof c == "string" ? Pe[Br[c]] : fs(null, c)).equals(An) || (B("/" + c.id + " gs"), An = c);
  };
  var fs = function(c, Q) {
    if (!c || !Br[c]) {
      var G = !1;
      for (var J in Pe) if (Pe.hasOwnProperty(J) && Pe[J].equals(Q)) {
        G = !0;
        break;
      }
      if (G) Q = Pe[J];
      else {
        var aA = "GS" + (Object.keys(Pe).length + 1).toString(10);
        Pe[aA] = Q, Q.id = aA;
      }
      return c && (Br[c] = Q.id), ve.publish("addGState", Q), Q;
    }
  };
  d.addGState = function(c, Q) {
    return fs(c, Q), this;
  }, d.saveGraphicsState = function() {
    return B("q"), Hr.push({ key: ae, size: $, color: ti }), this;
  }, d.restoreGraphicsState = function() {
    B("Q");
    var c = Hr.pop();
    return ae = c.key, $ = c.size, ti = c.color, An = null, this;
  }, d.setCurrentTransformationMatrix = function(c) {
    return B(c.toString() + " cm"), this;
  }, d.comment = function(c) {
    return B("#" + c), this;
  };
  var Ti = function(c, Q) {
    var G = c || 0;
    Object.defineProperty(this, "x", { enumerable: !0, get: function() {
      return G;
    }, set: function(BA) {
      isNaN(BA) || (G = parseFloat(BA));
    } });
    var J = Q || 0;
    Object.defineProperty(this, "y", { enumerable: !0, get: function() {
      return J;
    }, set: function(BA) {
      isNaN(BA) || (J = parseFloat(BA));
    } });
    var aA = "pt";
    return Object.defineProperty(this, "type", { enumerable: !0, get: function() {
      return aA;
    }, set: function(BA) {
      aA = BA.toString();
    } }), this;
  }, Va = function(c, Q, G, J) {
    Ti.call(this, c, Q), this.type = "rect";
    var aA = G || 0;
    Object.defineProperty(this, "w", { enumerable: !0, get: function() {
      return aA;
    }, set: function(FA) {
      isNaN(FA) || (aA = parseFloat(FA));
    } });
    var BA = J || 0;
    return Object.defineProperty(this, "h", { enumerable: !0, get: function() {
      return BA;
    }, set: function(FA) {
      isNaN(FA) || (BA = parseFloat(FA));
    } }), this;
  }, za = function() {
    this.page = Me, this.currentPage = M, this.pages = QA.slice(0), this.pagesContext = ZA.slice(0), this.x = vt, this.y = ge, this.matrix = pr, this.width = ri(M), this.height = yn(M), this.outputDestination = HA, this.id = "", this.objectNumber = -1;
  };
  za.prototype.restore = function() {
    Me = this.page, M = this.currentPage, ZA = this.pagesContext, QA = this.pages, vt = this.x, ge = this.y, pr = this.matrix, qa(M, this.width), Wa(M, this.height), HA = this.outputDestination;
  };
  var hs = function(c, Q, G, J, aA) {
    Dr.push(new za()), Me = M = 0, QA = [], vt = c, ge = Q, pr = aA, Ta([G, J]);
  }, Pu = function(c) {
    if (Or[c]) Dr.pop().restore();
    else {
      var Q = new za(), G = "Xo" + (Object.keys(dt).length + 1).toString(10);
      Q.id = G, Or[c] = G, dt[G] = Q, ve.publish("addFormObject", Q), Dr.pop().restore();
    }
  };
  for (var ki in d.beginFormObject = function(c, Q, G, J, aA) {
    return hs(c, Q, G, J, aA), this;
  }, d.endFormObject = function(c) {
    return Pu(c), this;
  }, d.doFormObject = function(c, Q) {
    var G = dt[Or[c]];
    return B("q"), B(Q.toString() + " cm"), B("/" + G.id + " Do"), B("Q"), this;
  }, d.getFormObject = function(c) {
    var Q = dt[Or[c]];
    return { x: Q.x, y: Q.y, width: Q.width, height: Q.height, matrix: Q.matrix };
  }, d.save = function(c, Q) {
    return c = c || "generated.pdf", (Q = Q || {}).returnPromise = Q.returnPromise || !1, Q.returnPromise === !1 ? (ci(_i(tn()), c), typeof ci.unload == "function" && XA.setTimeout && setTimeout(ci.unload, 911), this) : new Promise(function(G, J) {
      try {
        var aA = ci(_i(tn()), c);
        typeof ci.unload == "function" && XA.setTimeout && setTimeout(ci.unload, 911), G(aA);
      } catch (BA) {
        J(BA.message);
      }
    });
  }, WA.API) WA.API.hasOwnProperty(ki) && (ki === "events" && WA.API.events.length ? function(c, Q) {
    var G, J, aA;
    for (aA = Q.length - 1; aA !== -1; aA--) G = Q[aA][0], J = Q[aA][1], c.subscribe.apply(c, [G].concat(typeof J == "function" ? [J] : J));
  }(ve, WA.API.events) : d[ki] = WA.API[ki]);
  var ri = d.getPageWidth = function(c) {
    return (ZA[c = c || M].mediaBox.topRightX - ZA[c].mediaBox.bottomLeftX) / TA;
  }, qa = d.setPageWidth = function(c, Q) {
    ZA[c].mediaBox.topRightX = Q * TA + ZA[c].mediaBox.bottomLeftX;
  }, yn = d.getPageHeight = function(c) {
    return (ZA[c = c || M].mediaBox.topRightY - ZA[c].mediaBox.bottomLeftY) / TA;
  }, Wa = d.setPageHeight = function(c, Q) {
    ZA[c].mediaBox.topRightY = Q * TA + ZA[c].mediaBox.bottomLeftY;
  };
  return d.internal = { pdfEscape: Dt, getStyle: as, getFont: Ou, getFontSize: SA, getCharSpace: ku, getTextColor: Tu, getLineHeight: ls, getLineHeightFactor: cs, getLineWidth: Oi, write: CA, getHorizontalCoordinate: Rr, getVerticalCoordinate: rn, getCoordinateString: Du, getVerticalCoordinateString: mn, collections: {}, newObject: at, newAdditionalObject: Fi, newObjectDeferred: Ze, newObjectDeferredBegin: Gt, getFilters: kr, putStream: Ar, events: ve, scaleFactor: TA, pageSize: { getWidth: function() {
    return ri(M);
  }, setWidth: function(c) {
    qa(M, c);
  }, getHeight: function() {
    return yn(M);
  }, setHeight: function(c) {
    Wa(M, c);
  } }, encryptionOptions: g, encryption: mt, getEncryptor: Lu, output: Ni, getNumberOfPages: Fu, pages: QA, out: B, f2: Y, f3: x, getPageInfo: is, getPageInfoByObjId: YA, getCurrentPageInfo: Su, getPDFVersion: b, Point: Ti, Rectangle: Va, Matrix: qA, hasHotfix: ns }, Object.defineProperty(d.internal.pageSize, "width", { get: function() {
    return ri(M);
  }, set: function(c) {
    qa(M, c);
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(d.internal.pageSize, "height", { get: function() {
    return yn(M);
  }, set: function(c) {
    Wa(M, c);
  }, enumerable: !0, configurable: !0 }), bu.call(d, yA), ae = "F1", es(n, t), ve.publish("initialized"), d;
}
ua.prototype.lsbFirstWord = function(e) {
  return String.fromCharCode(e >> 0 & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255);
}, ua.prototype.toHexString = function(e) {
  return e.split("").map(function(A) {
    return ("0" + (255 & A.charCodeAt(0)).toString(16)).slice(-2);
  }).join("");
}, ua.prototype.hexToBytes = function(e) {
  for (var A = [], t = 0; t < e.length; t += 2) A.push(String.fromCharCode(parseInt(e.substr(t, 2), 16)));
  return A.join("");
}, ua.prototype.processOwnerPassword = function(e, A) {
  return Yc(Jc(A).substr(0, 5), e);
}, ua.prototype.encryptor = function(e, A) {
  var t = Jc(this.encryptionKey + String.fromCharCode(255 & e, e >> 8 & 255, e >> 16 & 255, 255 & A, A >> 8 & 255)).substr(0, 10);
  return function(r) {
    return Yc(t, r);
  };
}, El.prototype.equals = function(e) {
  var A, t = "id,objectNumber,equals";
  if (!e || Fe(e) !== Fe(this)) return !1;
  var r = 0;
  for (A in this) if (!(t.indexOf(A) >= 0)) {
    if (this.hasOwnProperty(A) && !e.hasOwnProperty(A) || this[A] !== e[A]) return !1;
    r++;
  }
  for (A in e) e.hasOwnProperty(A) && t.indexOf(A) < 0 && r--;
  return r === 0;
}, WA.API = { events: [] }, WA.version = "2.5.2";
var je = WA.API, Df = 1, mi = function(e) {
  return e.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}, Zi = function(e) {
  return e.replace(/\\\\/g, "\\").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}, ee = function(e) {
  return e.toFixed(2);
}, Hn = function(e) {
  return e.toFixed(5);
};
je.__acroform__ = {};
var jt = function(e, A) {
  e.prototype = Object.create(A.prototype), e.prototype.constructor = e;
}, s0 = function(e) {
  return e * Df;
}, Vr = function(e) {
  var A = new t1(), t = jA.internal.getHeight(e) || 0, r = jA.internal.getWidth(e) || 0;
  return A.BBox = [0, 0, Number(ee(r)), Number(ee(t))], A;
}, ZB = je.__acroform__.setBit = function(e, A) {
  if (e = e || 0, A = A || 0, isNaN(e) || isNaN(A)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");
  return e |= 1 << A;
}, Aw = je.__acroform__.clearBit = function(e, A) {
  if (e = e || 0, A = A || 0, isNaN(e) || isNaN(A)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");
  return e &= ~(1 << A);
}, ew = je.__acroform__.getBit = function(e, A) {
  if (isNaN(e) || isNaN(A)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");
  return e & 1 << A ? 1 : 0;
}, $e = je.__acroform__.getBitForPdf = function(e, A) {
  if (isNaN(e) || isNaN(A)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");
  return ew(e, A - 1);
}, Je = je.__acroform__.setBitForPdf = function(e, A) {
  if (isNaN(e) || isNaN(A)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");
  return ZB(e, A - 1);
}, Ye = je.__acroform__.clearBitForPdf = function(e, A) {
  if (isNaN(e) || isNaN(A)) throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");
  return Aw(e, A - 1);
}, tw = je.__acroform__.calculateCoordinates = function(e, A) {
  var t = A.internal.getHorizontalCoordinate, r = A.internal.getVerticalCoordinate, n = e[0], i = e[1], a = e[2], l = e[3], s = {};
  return s.lowerLeft_X = t(n) || 0, s.lowerLeft_Y = r(i + l) || 0, s.upperRight_X = t(n + a) || 0, s.upperRight_Y = r(i) || 0, [Number(ee(s.lowerLeft_X)), Number(ee(s.lowerLeft_Y)), Number(ee(s.upperRight_X)), Number(ee(s.upperRight_Y))];
}, rw = function(e) {
  if (e.appearanceStreamContent) return e.appearanceStreamContent;
  if (e.V || e.DV) {
    var A = [], t = e._V || e.DV, r = Zc(e, t), n = e.scope.internal.getFont(e.fontName, e.fontStyle).id;
    A.push("/Tx BMC"), A.push("q"), A.push("BT"), A.push(e.scope.__private__.encodeColorString(e.color)), A.push("/" + n + " " + ee(r.fontSize) + " Tf"), A.push("1 0 0 1 0 0 Tm"), A.push(r.text), A.push("ET"), A.push("Q"), A.push("EMC");
    var i = Vr(e);
    return i.scope = e.scope, i.stream = A.join(`
`), i;
  }
}, Zc = function(e, A) {
  var t = e.fontSize === 0 ? e.maxFontSize : e.fontSize, r = { text: "", fontSize: "" }, n = (A = (A = A.substr(0, 1) == "(" ? A.substr(1) : A).substr(A.length - 1) == ")" ? A.substr(0, A.length - 1) : A).split(" ");
  n = e.multiline ? n.map(function(x) {
    return x.split(`
`);
  }) : n.map(function(x) {
    return [x];
  });
  var i = t, a = jA.internal.getHeight(e) || 0;
  a = a < 0 ? -a : a;
  var l = jA.internal.getWidth(e) || 0;
  l = l < 0 ? -l : l;
  var s = function(x, I, j) {
    if (x + 1 < n.length) {
      var K = I + " " + n[x + 1][0];
      return Ms(K, e, j).width <= l - 4;
    }
    return !1;
  };
  i++;
  A: for (; i > 0; ) {
    A = "", i--;
    var f, g, p = Ms("3", e, i).height, w = e.multiline ? a - i : (a - p) / 2, d = w += 2, C = 0, b = 0, _ = 0;
    if (i <= 0) {
      A = `(...) Tj
`, A += "% Width of Text: " + Ms(A, e, i = 12).width + ", FieldWidth:" + l + `
`;
      break;
    }
    for (var m = "", y = 0, H = 0; H < n.length; H++) if (n.hasOwnProperty(H)) {
      var O = !1;
      if (n[H].length !== 1 && _ !== n[H].length - 1) {
        if ((p + 2) * (y + 2) + 2 > a) continue A;
        m += n[H][_], O = !0, b = H, H--;
      } else {
        m = (m += n[H][_] + " ").substr(m.length - 1) == " " ? m.substr(0, m.length - 1) : m;
        var P = parseInt(H), q = s(P, m, i), W = H >= n.length - 1;
        if (q && !W) {
          m += " ", _ = 0;
          continue;
        }
        if (q || W) {
          if (W) b = P;
          else if (e.multiline && (p + 2) * (y + 2) + 2 > a) continue A;
        } else {
          if (!e.multiline || (p + 2) * (y + 2) + 2 > a) continue A;
          b = P;
        }
      }
      for (var D = "", R = C; R <= b; R++) {
        var Y = n[R];
        if (e.multiline) {
          if (R === b) {
            D += Y[_] + " ", _ = (_ + 1) % Y.length;
            continue;
          }
          if (R === C) {
            D += Y[Y.length - 1] + " ";
            continue;
          }
        }
        D += Y[0] + " ";
      }
      switch (D = D.substr(D.length - 1) == " " ? D.substr(0, D.length - 1) : D, g = Ms(D, e, i).width, e.textAlign) {
        case "right":
          f = l - g - 2;
          break;
        case "center":
          f = (l - g) / 2;
          break;
        case "left":
        default:
          f = 2;
      }
      A += ee(f) + " " + ee(d) + ` Td
`, A += "(" + mi(D) + `) Tj
`, A += -ee(f) + ` 0 Td
`, d = -(i + 2), g = 0, C = O ? b : b + 1, y++, m = "";
    }
    break;
  }
  return r.text = A, r.fontSize = i, r;
}, Ms = function(e, A, t) {
  var r = A.scope.internal.getFont(A.fontName, A.fontStyle), n = A.scope.getStringUnitWidth(e, { font: r, fontSize: parseFloat(t), charSpace: 0 }) * parseFloat(t);
  return { height: A.scope.getStringUnitWidth("3", { font: r, fontSize: parseFloat(t), charSpace: 0 }) * parseFloat(t) * 1.5, width: n };
}, nw = { fields: [], xForms: [], acroFormDictionaryRoot: null, printedOut: !1, internal: null, isInitialized: !1 }, iw = function(e, A) {
  var t = { type: "reference", object: e };
  A.internal.getPageInfo(e.page).pageContext.annotations.find(function(r) {
    return r.type === t.type && r.object === t.object;
  }) === void 0 && A.internal.getPageInfo(e.page).pageContext.annotations.push(t);
}, aw = function(e, A) {
  for (var t in e) if (e.hasOwnProperty(t)) {
    var r = t, n = e[t];
    A.internal.newObjectDeferredBegin(n.objId, !0), Fe(n) === "object" && typeof n.putStream == "function" && n.putStream(), delete e[r];
  }
}, ow = function(e, A) {
  if (A.scope = e, e.internal !== void 0 && (e.internal.acroformPlugin === void 0 || e.internal.acroformPlugin.isInitialized === !1)) {
    if (Ir.FieldNum = 0, e.internal.acroformPlugin = JSON.parse(JSON.stringify(nw)), e.internal.acroformPlugin.acroFormDictionaryRoot) throw new Error("Exception while creating AcroformDictionary");
    Df = e.internal.scaleFactor, e.internal.acroformPlugin.acroFormDictionaryRoot = new r1(), e.internal.acroformPlugin.acroFormDictionaryRoot.scope = e, e.internal.acroformPlugin.acroFormDictionaryRoot._eventID = e.internal.events.subscribe("postPutResources", function() {
      (function(t) {
        t.internal.events.unsubscribe(t.internal.acroformPlugin.acroFormDictionaryRoot._eventID), delete t.internal.acroformPlugin.acroFormDictionaryRoot._eventID, t.internal.acroformPlugin.printedOut = !0;
      })(e);
    }), e.internal.events.subscribe("buildDocument", function() {
      (function(t) {
        t.internal.acroformPlugin.acroFormDictionaryRoot.objId = void 0;
        var r = t.internal.acroformPlugin.acroFormDictionaryRoot.Fields;
        for (var n in r) if (r.hasOwnProperty(n)) {
          var i = r[n];
          i.objId = void 0, i.hasAnnotation && iw(i, t);
        }
      })(e);
    }), e.internal.events.subscribe("putCatalog", function() {
      (function(t) {
        if (t.internal.acroformPlugin.acroFormDictionaryRoot === void 0) throw new Error("putCatalogCallback: Root missing.");
        t.internal.write("/AcroForm " + t.internal.acroformPlugin.acroFormDictionaryRoot.objId + " 0 R");
      })(e);
    }), e.internal.events.subscribe("postPutPages", function(t) {
      (function(r, n) {
        var i = !r;
        for (var a in r || (n.internal.newObjectDeferredBegin(n.internal.acroformPlugin.acroFormDictionaryRoot.objId, !0), n.internal.acroformPlugin.acroFormDictionaryRoot.putStream()), r = r || n.internal.acroformPlugin.acroFormDictionaryRoot.Kids) if (r.hasOwnProperty(a)) {
          var l = r[a], s = [], f = l.Rect;
          if (l.Rect && (l.Rect = tw(l.Rect, n)), n.internal.newObjectDeferredBegin(l.objId, !0), l.DA = jA.createDefaultAppearanceStream(l), Fe(l) === "object" && typeof l.getKeyValueListForStream == "function" && (s = l.getKeyValueListForStream()), l.Rect = f, l.hasAppearanceStream && !l.appearanceStreamContent) {
            var g = rw(l);
            s.push({ key: "AP", value: "<</N " + g + ">>" }), n.internal.acroformPlugin.xForms.push(g);
          }
          if (l.appearanceStreamContent) {
            var p = "";
            for (var w in l.appearanceStreamContent) if (l.appearanceStreamContent.hasOwnProperty(w)) {
              var d = l.appearanceStreamContent[w];
              if (p += "/" + w + " ", p += "<<", Object.keys(d).length >= 1 || Array.isArray(d)) {
                for (var a in d) if (d.hasOwnProperty(a)) {
                  var C = d[a];
                  typeof C == "function" && (C = C.call(n, l)), p += "/" + a + " " + C + " ", n.internal.acroformPlugin.xForms.indexOf(C) >= 0 || n.internal.acroformPlugin.xForms.push(C);
                }
              } else typeof (C = d) == "function" && (C = C.call(n, l)), p += "/" + a + " " + C, n.internal.acroformPlugin.xForms.indexOf(C) >= 0 || n.internal.acroformPlugin.xForms.push(C);
              p += ">>";
            }
            s.push({ key: "AP", value: `<<
` + p + ">>" });
          }
          n.internal.putStream({ additionalKeyValues: s, objectId: l.objId }), n.internal.out("endobj");
        }
        i && aw(n.internal.acroformPlugin.xForms, n);
      })(t, e);
    }), e.internal.acroformPlugin.isInitialized = !0;
  }
}, e1 = je.__acroform__.arrayToPdfArray = function(e, A, t) {
  var r = function(a) {
    return a;
  };
  if (Array.isArray(e)) {
    for (var n = "[", i = 0; i < e.length; i++) switch (i !== 0 && (n += " "), Fe(e[i])) {
      case "boolean":
      case "number":
      case "object":
        n += e[i].toString();
        break;
      case "string":
        e[i].substr(0, 1) !== "/" ? (A !== void 0 && t && (r = t.internal.getEncryptor(A)), n += "(" + mi(r(e[i].toString())) + ")") : n += e[i].toString();
    }
    return n += "]";
  }
  throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray");
}, uc = function(e, A, t) {
  var r = function(n) {
    return n;
  };
  return A !== void 0 && t && (r = t.internal.getEncryptor(A)), (e = e || "").toString(), e = "(" + mi(r(e)) + ")";
}, qr = function() {
  this._objId = void 0, this._scope = void 0, Object.defineProperty(this, "objId", { get: function() {
    if (this._objId === void 0) {
      if (this.scope === void 0) return;
      this._objId = this.scope.internal.newObjectDeferred();
    }
    return this._objId;
  }, set: function(e) {
    this._objId = e;
  } }), Object.defineProperty(this, "scope", { value: this._scope, writable: !0 });
};
qr.prototype.toString = function() {
  return this.objId + " 0 R";
}, qr.prototype.putStream = function() {
  var e = this.getKeyValueListForStream();
  this.scope.internal.putStream({ data: this.stream, additionalKeyValues: e, objectId: this.objId }), this.scope.internal.out("endobj");
}, qr.prototype.getKeyValueListForStream = function() {
  var e = [], A = Object.getOwnPropertyNames(this).filter(function(i) {
    return i != "content" && i != "appearanceStreamContent" && i != "scope" && i != "objId" && i.substring(0, 1) != "_";
  });
  for (var t in A) if (Object.getOwnPropertyDescriptor(this, A[t]).configurable === !1) {
    var r = A[t], n = this[r];
    n && (Array.isArray(n) ? e.push({ key: r, value: e1(n, this.objId, this.scope) }) : n instanceof qr ? (n.scope = this.scope, e.push({ key: r, value: n.objId + " 0 R" })) : typeof n != "function" && e.push({ key: r, value: n }));
  }
  return e;
};
var t1 = function() {
  qr.call(this), Object.defineProperty(this, "Type", { value: "/XObject", configurable: !1, writable: !0 }), Object.defineProperty(this, "Subtype", { value: "/Form", configurable: !1, writable: !0 }), Object.defineProperty(this, "FormType", { value: 1, configurable: !1, writable: !0 });
  var e, A = [];
  Object.defineProperty(this, "BBox", { configurable: !1, get: function() {
    return A;
  }, set: function(t) {
    A = t;
  } }), Object.defineProperty(this, "Resources", { value: "2 0 R", configurable: !1, writable: !0 }), Object.defineProperty(this, "stream", { enumerable: !1, configurable: !0, set: function(t) {
    e = t.trim();
  }, get: function() {
    return e || null;
  } });
};
jt(t1, qr);
var r1 = function() {
  qr.call(this);
  var e, A = [];
  Object.defineProperty(this, "Kids", { enumerable: !1, configurable: !0, get: function() {
    return A.length > 0 ? A : void 0;
  } }), Object.defineProperty(this, "Fields", { enumerable: !1, configurable: !1, get: function() {
    return A;
  } }), Object.defineProperty(this, "DA", { enumerable: !1, configurable: !1, get: function() {
    if (e) {
      var t = function(r) {
        return r;
      };
      return this.scope && (t = this.scope.internal.getEncryptor(this.objId)), "(" + mi(t(e)) + ")";
    }
  }, set: function(t) {
    e = t;
  } });
};
jt(r1, qr);
var Ir = function e() {
  qr.call(this);
  var A = 4;
  Object.defineProperty(this, "F", { enumerable: !1, configurable: !1, get: function() {
    return A;
  }, set: function(m) {
    if (isNaN(m)) throw new Error('Invalid value "' + m + '" for attribute F supplied.');
    A = m;
  } }), Object.defineProperty(this, "showWhenPrinted", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(A, 3);
  }, set: function(m) {
    m ? this.F = Je(A, 3) : this.F = Ye(A, 3);
  } });
  var t = 0;
  Object.defineProperty(this, "Ff", { enumerable: !1, configurable: !1, get: function() {
    return t;
  }, set: function(m) {
    if (isNaN(m)) throw new Error('Invalid value "' + m + '" for attribute Ff supplied.');
    t = m;
  } });
  var r = [];
  Object.defineProperty(this, "Rect", { enumerable: !1, configurable: !1, get: function() {
    if (r.length !== 0) return r;
  }, set: function(m) {
    r = m !== void 0 ? m : [];
  } }), Object.defineProperty(this, "x", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[0]) ? 0 : r[0];
  }, set: function(m) {
    r[0] = m;
  } }), Object.defineProperty(this, "y", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[1]) ? 0 : r[1];
  }, set: function(m) {
    r[1] = m;
  } }), Object.defineProperty(this, "width", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[2]) ? 0 : r[2];
  }, set: function(m) {
    r[2] = m;
  } }), Object.defineProperty(this, "height", { enumerable: !0, configurable: !0, get: function() {
    return !r || isNaN(r[3]) ? 0 : r[3];
  }, set: function(m) {
    r[3] = m;
  } });
  var n = "";
  Object.defineProperty(this, "FT", { enumerable: !0, configurable: !1, get: function() {
    return n;
  }, set: function(m) {
    switch (m) {
      case "/Btn":
      case "/Tx":
      case "/Ch":
      case "/Sig":
        n = m;
        break;
      default:
        throw new Error('Invalid value "' + m + '" for attribute FT supplied.');
    }
  } });
  var i = null;
  Object.defineProperty(this, "T", { enumerable: !0, configurable: !1, get: function() {
    if (!i || i.length < 1) {
      if (this instanceof xl) return;
      i = "FieldObject" + e.FieldNum++;
    }
    var m = function(y) {
      return y;
    };
    return this.scope && (m = this.scope.internal.getEncryptor(this.objId)), "(" + mi(m(i)) + ")";
  }, set: function(m) {
    i = m.toString();
  } }), Object.defineProperty(this, "fieldName", { configurable: !0, enumerable: !0, get: function() {
    return i;
  }, set: function(m) {
    i = m;
  } });
  var a = "helvetica";
  Object.defineProperty(this, "fontName", { enumerable: !0, configurable: !0, get: function() {
    return a;
  }, set: function(m) {
    a = m;
  } });
  var l = "normal";
  Object.defineProperty(this, "fontStyle", { enumerable: !0, configurable: !0, get: function() {
    return l;
  }, set: function(m) {
    l = m;
  } });
  var s = 0;
  Object.defineProperty(this, "fontSize", { enumerable: !0, configurable: !0, get: function() {
    return s;
  }, set: function(m) {
    s = m;
  } });
  var f = void 0;
  Object.defineProperty(this, "maxFontSize", { enumerable: !0, configurable: !0, get: function() {
    return f === void 0 ? 50 / Df : f;
  }, set: function(m) {
    f = m;
  } });
  var g = "black";
  Object.defineProperty(this, "color", { enumerable: !0, configurable: !0, get: function() {
    return g;
  }, set: function(m) {
    g = m;
  } });
  var p = "/F1 0 Tf 0 g";
  Object.defineProperty(this, "DA", { enumerable: !0, configurable: !1, get: function() {
    if (!(!p || this instanceof xl || this instanceof gi)) return uc(p, this.objId, this.scope);
  }, set: function(m) {
    m = m.toString(), p = m;
  } });
  var w = null;
  Object.defineProperty(this, "DV", { enumerable: !1, configurable: !1, get: function() {
    if (w) return this instanceof ht ? w : uc(w, this.objId, this.scope);
  }, set: function(m) {
    m = m.toString(), w = this instanceof ht ? m : m.substr(0, 1) === "(" ? Zi(m.substr(1, m.length - 2)) : Zi(m);
  } }), Object.defineProperty(this, "defaultValue", { enumerable: !0, configurable: !0, get: function() {
    return this instanceof ht ? Zi(w.substr(1, w.length - 1)) : w;
  }, set: function(m) {
    m = m.toString(), w = this instanceof ht ? "/" + m : m;
  } });
  var d = null;
  Object.defineProperty(this, "_V", { enumerable: !1, configurable: !1, get: function() {
    if (d) return d;
  }, set: function(m) {
    this.V = m;
  } }), Object.defineProperty(this, "V", { enumerable: !1, configurable: !1, get: function() {
    if (d) return this instanceof ht ? d : uc(d, this.objId, this.scope);
  }, set: function(m) {
    m = m.toString(), d = this instanceof ht ? m : m.substr(0, 1) === "(" ? Zi(m.substr(1, m.length - 2)) : Zi(m);
  } }), Object.defineProperty(this, "value", { enumerable: !0, configurable: !0, get: function() {
    return this instanceof ht ? Zi(d.substr(1, d.length - 1)) : d;
  }, set: function(m) {
    m = m.toString(), d = this instanceof ht ? "/" + m : m;
  } }), Object.defineProperty(this, "hasAnnotation", { enumerable: !0, configurable: !0, get: function() {
    return this.Rect;
  } }), Object.defineProperty(this, "Type", { enumerable: !0, configurable: !1, get: function() {
    return this.hasAnnotation ? "/Annot" : null;
  } }), Object.defineProperty(this, "Subtype", { enumerable: !0, configurable: !1, get: function() {
    return this.hasAnnotation ? "/Widget" : null;
  } });
  var C, b = !1;
  Object.defineProperty(this, "hasAppearanceStream", { enumerable: !0, configurable: !0, get: function() {
    return b;
  }, set: function(m) {
    m = !!m, b = m;
  } }), Object.defineProperty(this, "page", { enumerable: !0, configurable: !0, get: function() {
    if (C) return C;
  }, set: function(m) {
    C = m;
  } }), Object.defineProperty(this, "readOnly", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 1);
  }, set: function(m) {
    m ? this.Ff = Je(this.Ff, 1) : this.Ff = Ye(this.Ff, 1);
  } }), Object.defineProperty(this, "required", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 2);
  }, set: function(m) {
    m ? this.Ff = Je(this.Ff, 2) : this.Ff = Ye(this.Ff, 2);
  } }), Object.defineProperty(this, "noExport", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 3);
  }, set: function(m) {
    m ? this.Ff = Je(this.Ff, 3) : this.Ff = Ye(this.Ff, 3);
  } });
  var _ = null;
  Object.defineProperty(this, "Q", { enumerable: !0, configurable: !1, get: function() {
    if (_ !== null) return _;
  }, set: function(m) {
    if ([0, 1, 2].indexOf(m) === -1) throw new Error('Invalid value "' + m + '" for attribute Q supplied.');
    _ = m;
  } }), Object.defineProperty(this, "textAlign", { get: function() {
    var m;
    switch (_) {
      case 0:
      default:
        m = "left";
        break;
      case 1:
        m = "center";
        break;
      case 2:
        m = "right";
    }
    return m;
  }, configurable: !0, enumerable: !0, set: function(m) {
    switch (m) {
      case "right":
      case 2:
        _ = 2;
        break;
      case "center":
      case 1:
        _ = 1;
        break;
      case "left":
      case 0:
      default:
        _ = 0;
    }
  } });
};
jt(Ir, qr);
var Ba = function() {
  Ir.call(this), this.FT = "/Ch", this.V = "()", this.fontName = "zapfdingbats";
  var e = 0;
  Object.defineProperty(this, "TI", { enumerable: !0, configurable: !1, get: function() {
    return e;
  }, set: function(t) {
    e = t;
  } }), Object.defineProperty(this, "topIndex", { enumerable: !0, configurable: !0, get: function() {
    return e;
  }, set: function(t) {
    e = t;
  } });
  var A = [];
  Object.defineProperty(this, "Opt", { enumerable: !0, configurable: !1, get: function() {
    return e1(A, this.objId, this.scope);
  }, set: function(t) {
    var r, n;
    n = [], typeof (r = t) == "string" && (n = function(i, a, l) {
      l || (l = 1);
      for (var s, f = []; s = a.exec(i); ) f.push(s[l]);
      return f;
    }(r, /\((.*?)\)/g)), A = n;
  } }), this.getOptions = function() {
    return A;
  }, this.setOptions = function(t) {
    A = t, this.sort && A.sort();
  }, this.addOption = function(t) {
    t = (t = t || "").toString(), A.push(t), this.sort && A.sort();
  }, this.removeOption = function(t, r) {
    for (r = r || !1, t = (t = t || "").toString(); A.indexOf(t) !== -1 && (A.splice(A.indexOf(t), 1), r !== !1); ) ;
  }, Object.defineProperty(this, "combo", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 18);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 18) : this.Ff = Ye(this.Ff, 18);
  } }), Object.defineProperty(this, "edit", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 19);
  }, set: function(t) {
    this.combo === !0 && (t ? this.Ff = Je(this.Ff, 19) : this.Ff = Ye(this.Ff, 19));
  } }), Object.defineProperty(this, "sort", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 20);
  }, set: function(t) {
    t ? (this.Ff = Je(this.Ff, 20), A.sort()) : this.Ff = Ye(this.Ff, 20);
  } }), Object.defineProperty(this, "multiSelect", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 22);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 22) : this.Ff = Ye(this.Ff, 22);
  } }), Object.defineProperty(this, "doNotSpellCheck", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 23);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 23) : this.Ff = Ye(this.Ff, 23);
  } }), Object.defineProperty(this, "commitOnSelChange", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 27);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 27) : this.Ff = Ye(this.Ff, 27);
  } }), this.hasAppearanceStream = !1;
};
jt(Ba, Ir);
var wa = function() {
  Ba.call(this), this.fontName = "helvetica", this.combo = !1;
};
jt(wa, Ba);
var va = function() {
  wa.call(this), this.combo = !0;
};
jt(va, wa);
var vl = function() {
  va.call(this), this.edit = !0;
};
jt(vl, va);
var ht = function() {
  Ir.call(this), this.FT = "/Btn", Object.defineProperty(this, "noToggleToOff", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 15);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 15) : this.Ff = Ye(this.Ff, 15);
  } }), Object.defineProperty(this, "radio", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 16);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 16) : this.Ff = Ye(this.Ff, 16);
  } }), Object.defineProperty(this, "pushButton", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 17);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 17) : this.Ff = Ye(this.Ff, 17);
  } }), Object.defineProperty(this, "radioIsUnison", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 26);
  }, set: function(t) {
    t ? this.Ff = Je(this.Ff, 26) : this.Ff = Ye(this.Ff, 26);
  } });
  var e, A = {};
  Object.defineProperty(this, "MK", { enumerable: !1, configurable: !1, get: function() {
    var t = function(i) {
      return i;
    };
    if (this.scope && (t = this.scope.internal.getEncryptor(this.objId)), Object.keys(A).length !== 0) {
      var r, n = [];
      for (r in n.push("<<"), A) n.push("/" + r + " (" + mi(t(A[r])) + ")");
      return n.push(">>"), n.join(`
`);
    }
  }, set: function(t) {
    Fe(t) === "object" && (A = t);
  } }), Object.defineProperty(this, "caption", { enumerable: !0, configurable: !0, get: function() {
    return A.CA || "";
  }, set: function(t) {
    typeof t == "string" && (A.CA = t);
  } }), Object.defineProperty(this, "AS", { enumerable: !1, configurable: !1, get: function() {
    return e;
  }, set: function(t) {
    e = t;
  } }), Object.defineProperty(this, "appearanceState", { enumerable: !0, configurable: !0, get: function() {
    return e.substr(1, e.length - 1);
  }, set: function(t) {
    e = "/" + t;
  } });
};
jt(ht, Ir);
var ml = function() {
  ht.call(this), this.pushButton = !0;
};
jt(ml, ht);
var ma = function() {
  ht.call(this), this.radio = !0, this.pushButton = !1;
  var e = [];
  Object.defineProperty(this, "Kids", { enumerable: !0, configurable: !1, get: function() {
    return e;
  }, set: function(A) {
    e = A !== void 0 ? A : [];
  } });
};
jt(ma, ht);
var xl = function() {
  var e, A;
  Ir.call(this), Object.defineProperty(this, "Parent", { enumerable: !1, configurable: !1, get: function() {
    return e;
  }, set: function(n) {
    e = n;
  } }), Object.defineProperty(this, "optionName", { enumerable: !1, configurable: !0, get: function() {
    return A;
  }, set: function(n) {
    A = n;
  } });
  var t, r = {};
  Object.defineProperty(this, "MK", { enumerable: !1, configurable: !1, get: function() {
    var n = function(l) {
      return l;
    };
    this.scope && (n = this.scope.internal.getEncryptor(this.objId));
    var i, a = [];
    for (i in a.push("<<"), r) a.push("/" + i + " (" + mi(n(r[i])) + ")");
    return a.push(">>"), a.join(`
`);
  }, set: function(n) {
    Fe(n) === "object" && (r = n);
  } }), Object.defineProperty(this, "caption", { enumerable: !0, configurable: !0, get: function() {
    return r.CA || "";
  }, set: function(n) {
    typeof n == "string" && (r.CA = n);
  } }), Object.defineProperty(this, "AS", { enumerable: !1, configurable: !1, get: function() {
    return t;
  }, set: function(n) {
    t = n;
  } }), Object.defineProperty(this, "appearanceState", { enumerable: !0, configurable: !0, get: function() {
    return t.substr(1, t.length - 1);
  }, set: function(n) {
    t = "/" + n;
  } }), this.caption = "l", this.appearanceState = "Off", this._AppearanceType = jA.RadioButton.Circle, this.appearanceStreamContent = this._AppearanceType.createAppearanceStream(this.optionName);
};
jt(xl, Ir), ma.prototype.setAppearance = function(e) {
  if (!("createAppearanceStream" in e) || !("getCA" in e)) throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");
  for (var A in this.Kids) if (this.Kids.hasOwnProperty(A)) {
    var t = this.Kids[A];
    t.appearanceStreamContent = e.createAppearanceStream(t.optionName), t.caption = e.getCA();
  }
}, ma.prototype.createOption = function(e) {
  var A = new xl();
  return A.Parent = this, A.optionName = e, this.Kids.push(A), sw.call(this.scope, A), A;
};
var yl = function() {
  ht.call(this), this.fontName = "zapfdingbats", this.caption = "3", this.appearanceState = "On", this.value = "On", this.textAlign = "center", this.appearanceStreamContent = jA.CheckBox.createAppearanceStream();
};
jt(yl, ht);
var gi = function() {
  Ir.call(this), this.FT = "/Tx", Object.defineProperty(this, "multiline", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 13);
  }, set: function(A) {
    A ? this.Ff = Je(this.Ff, 13) : this.Ff = Ye(this.Ff, 13);
  } }), Object.defineProperty(this, "fileSelect", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 21);
  }, set: function(A) {
    A ? this.Ff = Je(this.Ff, 21) : this.Ff = Ye(this.Ff, 21);
  } }), Object.defineProperty(this, "doNotSpellCheck", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 23);
  }, set: function(A) {
    A ? this.Ff = Je(this.Ff, 23) : this.Ff = Ye(this.Ff, 23);
  } }), Object.defineProperty(this, "doNotScroll", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 24);
  }, set: function(A) {
    A ? this.Ff = Je(this.Ff, 24) : this.Ff = Ye(this.Ff, 24);
  } }), Object.defineProperty(this, "comb", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 25);
  }, set: function(A) {
    A ? this.Ff = Je(this.Ff, 25) : this.Ff = Ye(this.Ff, 25);
  } }), Object.defineProperty(this, "richText", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 26);
  }, set: function(A) {
    A ? this.Ff = Je(this.Ff, 26) : this.Ff = Ye(this.Ff, 26);
  } });
  var e = null;
  Object.defineProperty(this, "MaxLen", { enumerable: !0, configurable: !1, get: function() {
    return e;
  }, set: function(A) {
    e = A;
  } }), Object.defineProperty(this, "maxLength", { enumerable: !0, configurable: !0, get: function() {
    return e;
  }, set: function(A) {
    Number.isInteger(A) && (e = A);
  } }), Object.defineProperty(this, "hasAppearanceStream", { enumerable: !0, configurable: !0, get: function() {
    return this.V || this.DV;
  } });
};
jt(gi, Ir);
var bl = function() {
  gi.call(this), Object.defineProperty(this, "password", { enumerable: !0, configurable: !0, get: function() {
    return !!$e(this.Ff, 14);
  }, set: function(e) {
    e ? this.Ff = Je(this.Ff, 14) : this.Ff = Ye(this.Ff, 14);
  } }), this.password = !0;
};
jt(bl, gi);
var jA = { CheckBox: { createAppearanceStream: function() {
  return { N: { On: jA.CheckBox.YesNormal }, D: { On: jA.CheckBox.YesPushDown, Off: jA.CheckBox.OffPushDown } };
}, YesPushDown: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [], r = e.scope.internal.getFont(e.fontName, e.fontStyle).id, n = e.scope.__private__.encodeColorString(e.color), i = Zc(e, e.caption);
  return t.push("0.749023 g"), t.push("0 0 " + ee(jA.internal.getWidth(e)) + " " + ee(jA.internal.getHeight(e)) + " re"), t.push("f"), t.push("BMC"), t.push("q"), t.push("0 0 1 rg"), t.push("/" + r + " " + ee(i.fontSize) + " Tf " + n), t.push("BT"), t.push(i.text), t.push("ET"), t.push("Q"), t.push("EMC"), A.stream = t.join(`
`), A;
}, YesNormal: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = e.scope.internal.getFont(e.fontName, e.fontStyle).id, r = e.scope.__private__.encodeColorString(e.color), n = [], i = jA.internal.getHeight(e), a = jA.internal.getWidth(e), l = Zc(e, e.caption);
  return n.push("1 g"), n.push("0 0 " + ee(a) + " " + ee(i) + " re"), n.push("f"), n.push("q"), n.push("0 0 1 rg"), n.push("0 0 " + ee(a - 1) + " " + ee(i - 1) + " re"), n.push("W"), n.push("n"), n.push("0 g"), n.push("BT"), n.push("/" + t + " " + ee(l.fontSize) + " Tf " + r), n.push(l.text), n.push("ET"), n.push("Q"), A.stream = n.join(`
`), A;
}, OffPushDown: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [];
  return t.push("0.749023 g"), t.push("0 0 " + ee(jA.internal.getWidth(e)) + " " + ee(jA.internal.getHeight(e)) + " re"), t.push("f"), A.stream = t.join(`
`), A;
} }, RadioButton: { Circle: { createAppearanceStream: function(e) {
  var A = { D: { Off: jA.RadioButton.Circle.OffPushDown }, N: {} };
  return A.N[e] = jA.RadioButton.Circle.YesNormal, A.D[e] = jA.RadioButton.Circle.YesPushDown, A;
}, getCA: function() {
  return "l";
}, YesNormal: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [], r = jA.internal.getWidth(e) <= jA.internal.getHeight(e) ? jA.internal.getWidth(e) / 4 : jA.internal.getHeight(e) / 4;
  r = Number((0.9 * r).toFixed(5));
  var n = jA.internal.Bezier_C, i = Number((r * n).toFixed(5));
  return t.push("q"), t.push("1 0 0 1 " + Hn(jA.internal.getWidth(e) / 2) + " " + Hn(jA.internal.getHeight(e) / 2) + " cm"), t.push(r + " 0 m"), t.push(r + " " + i + " " + i + " " + r + " 0 " + r + " c"), t.push("-" + i + " " + r + " -" + r + " " + i + " -" + r + " 0 c"), t.push("-" + r + " -" + i + " -" + i + " -" + r + " 0 -" + r + " c"), t.push(i + " -" + r + " " + r + " -" + i + " " + r + " 0 c"), t.push("f"), t.push("Q"), A.stream = t.join(`
`), A;
}, YesPushDown: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [], r = jA.internal.getWidth(e) <= jA.internal.getHeight(e) ? jA.internal.getWidth(e) / 4 : jA.internal.getHeight(e) / 4;
  r = Number((0.9 * r).toFixed(5));
  var n = Number((2 * r).toFixed(5)), i = Number((n * jA.internal.Bezier_C).toFixed(5)), a = Number((r * jA.internal.Bezier_C).toFixed(5));
  return t.push("0.749023 g"), t.push("q"), t.push("1 0 0 1 " + Hn(jA.internal.getWidth(e) / 2) + " " + Hn(jA.internal.getHeight(e) / 2) + " cm"), t.push(n + " 0 m"), t.push(n + " " + i + " " + i + " " + n + " 0 " + n + " c"), t.push("-" + i + " " + n + " -" + n + " " + i + " -" + n + " 0 c"), t.push("-" + n + " -" + i + " -" + i + " -" + n + " 0 -" + n + " c"), t.push(i + " -" + n + " " + n + " -" + i + " " + n + " 0 c"), t.push("f"), t.push("Q"), t.push("0 g"), t.push("q"), t.push("1 0 0 1 " + Hn(jA.internal.getWidth(e) / 2) + " " + Hn(jA.internal.getHeight(e) / 2) + " cm"), t.push(r + " 0 m"), t.push(r + " " + a + " " + a + " " + r + " 0 " + r + " c"), t.push("-" + a + " " + r + " -" + r + " " + a + " -" + r + " 0 c"), t.push("-" + r + " -" + a + " -" + a + " -" + r + " 0 -" + r + " c"), t.push(a + " -" + r + " " + r + " -" + a + " " + r + " 0 c"), t.push("f"), t.push("Q"), A.stream = t.join(`
`), A;
}, OffPushDown: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [], r = jA.internal.getWidth(e) <= jA.internal.getHeight(e) ? jA.internal.getWidth(e) / 4 : jA.internal.getHeight(e) / 4;
  r = Number((0.9 * r).toFixed(5));
  var n = Number((2 * r).toFixed(5)), i = Number((n * jA.internal.Bezier_C).toFixed(5));
  return t.push("0.749023 g"), t.push("q"), t.push("1 0 0 1 " + Hn(jA.internal.getWidth(e) / 2) + " " + Hn(jA.internal.getHeight(e) / 2) + " cm"), t.push(n + " 0 m"), t.push(n + " " + i + " " + i + " " + n + " 0 " + n + " c"), t.push("-" + i + " " + n + " -" + n + " " + i + " -" + n + " 0 c"), t.push("-" + n + " -" + i + " -" + i + " -" + n + " 0 -" + n + " c"), t.push(i + " -" + n + " " + n + " -" + i + " " + n + " 0 c"), t.push("f"), t.push("Q"), A.stream = t.join(`
`), A;
} }, Cross: { createAppearanceStream: function(e) {
  var A = { D: { Off: jA.RadioButton.Cross.OffPushDown }, N: {} };
  return A.N[e] = jA.RadioButton.Cross.YesNormal, A.D[e] = jA.RadioButton.Cross.YesPushDown, A;
}, getCA: function() {
  return "8";
}, YesNormal: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [], r = jA.internal.calculateCross(e);
  return t.push("q"), t.push("1 1 " + ee(jA.internal.getWidth(e) - 2) + " " + ee(jA.internal.getHeight(e) - 2) + " re"), t.push("W"), t.push("n"), t.push(ee(r.x1.x) + " " + ee(r.x1.y) + " m"), t.push(ee(r.x2.x) + " " + ee(r.x2.y) + " l"), t.push(ee(r.x4.x) + " " + ee(r.x4.y) + " m"), t.push(ee(r.x3.x) + " " + ee(r.x3.y) + " l"), t.push("s"), t.push("Q"), A.stream = t.join(`
`), A;
}, YesPushDown: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = jA.internal.calculateCross(e), r = [];
  return r.push("0.749023 g"), r.push("0 0 " + ee(jA.internal.getWidth(e)) + " " + ee(jA.internal.getHeight(e)) + " re"), r.push("f"), r.push("q"), r.push("1 1 " + ee(jA.internal.getWidth(e) - 2) + " " + ee(jA.internal.getHeight(e) - 2) + " re"), r.push("W"), r.push("n"), r.push(ee(t.x1.x) + " " + ee(t.x1.y) + " m"), r.push(ee(t.x2.x) + " " + ee(t.x2.y) + " l"), r.push(ee(t.x4.x) + " " + ee(t.x4.y) + " m"), r.push(ee(t.x3.x) + " " + ee(t.x3.y) + " l"), r.push("s"), r.push("Q"), A.stream = r.join(`
`), A;
}, OffPushDown: function(e) {
  var A = Vr(e);
  A.scope = e.scope;
  var t = [];
  return t.push("0.749023 g"), t.push("0 0 " + ee(jA.internal.getWidth(e)) + " " + ee(jA.internal.getHeight(e)) + " re"), t.push("f"), A.stream = t.join(`
`), A;
} } }, createDefaultAppearanceStream: function(e) {
  var A = e.scope.internal.getFont(e.fontName, e.fontStyle).id, t = e.scope.__private__.encodeColorString(e.color);
  return "/" + A + " " + e.fontSize + " Tf " + t;
} };
jA.internal = { Bezier_C: 0.551915024494, calculateCross: function(e) {
  var A = jA.internal.getWidth(e), t = jA.internal.getHeight(e), r = Math.min(A, t);
  return { x1: { x: (A - r) / 2, y: (t - r) / 2 + r }, x2: { x: (A - r) / 2 + r, y: (t - r) / 2 }, x3: { x: (A - r) / 2, y: (t - r) / 2 }, x4: { x: (A - r) / 2 + r, y: (t - r) / 2 + r } };
} }, jA.internal.getWidth = function(e) {
  var A = 0;
  return Fe(e) === "object" && (A = s0(e.Rect[2])), A;
}, jA.internal.getHeight = function(e) {
  var A = 0;
  return Fe(e) === "object" && (A = s0(e.Rect[3])), A;
};
var sw = je.addField = function(e) {
  if (ow(this, e), !(e instanceof Ir)) throw new Error("Invalid argument passed to jsPDF.addField.");
  var A;
  return (A = e).scope.internal.acroformPlugin.printedOut && (A.scope.internal.acroformPlugin.printedOut = !1, A.scope.internal.acroformPlugin.acroFormDictionaryRoot = null), A.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(A), e.page = e.scope.internal.getCurrentPageInfo().pageNumber, this;
};
je.AcroFormChoiceField = Ba, je.AcroFormListBox = wa, je.AcroFormComboBox = va, je.AcroFormEditBox = vl, je.AcroFormButton = ht, je.AcroFormPushButton = ml, je.AcroFormRadioButton = ma, je.AcroFormCheckBox = yl, je.AcroFormTextField = gi, je.AcroFormPasswordField = bl, je.AcroFormAppearance = jA, je.AcroForm = { ChoiceField: Ba, ListBox: wa, ComboBox: va, EditBox: vl, Button: ht, PushButton: ml, RadioButton: ma, CheckBox: yl, TextField: gi, PasswordField: bl, Appearance: jA }, WA.AcroForm = { ChoiceField: Ba, ListBox: wa, ComboBox: va, EditBox: vl, Button: ht, PushButton: ml, RadioButton: ma, CheckBox: yl, TextField: gi, PasswordField: bl, Appearance: jA };
WA.AcroForm;
function n1(e) {
  return e.reduce(function(A, t, r) {
    return A[t] = r, A;
  }, {});
}
(function(e) {
  e.__addimage__ = {};
  var A = "UNKNOWN", t = { PNG: [[137, 80, 78, 71]], TIFF: [[77, 77, 0, 42], [73, 73, 42, 0]], JPEG: [[255, 216, 255, 224, void 0, void 0, 74, 70, 73, 70, 0], [255, 216, 255, 225, void 0, void 0, 69, 120, 105, 102, 0, 0], [255, 216, 255, 219], [255, 216, 255, 238]], JPEG2000: [[0, 0, 0, 12, 106, 80, 32, 32]], GIF87a: [[71, 73, 70, 56, 55, 97]], GIF89a: [[71, 73, 70, 56, 57, 97]], WEBP: [[82, 73, 70, 70, void 0, void 0, void 0, void 0, 87, 69, 66, 80]], BMP: [[66, 77], [66, 65], [67, 73], [67, 80], [73, 67], [80, 84]] }, r = e.__addimage__.getImageFileTypeByImageData = function(x, I) {
    var j, K, nA, iA, cA, oA = A;
    if ((I = I || A) === "RGBA" || x.data !== void 0 && x.data instanceof Uint8ClampedArray && "height" in x && "width" in x) return "RGBA";
    if (q(x)) for (cA in t) for (nA = t[cA], j = 0; j < nA.length; j += 1) {
      for (iA = !0, K = 0; K < nA[j].length; K += 1) if (nA[j][K] !== void 0 && nA[j][K] !== x[K]) {
        iA = !1;
        break;
      }
      if (iA === !0) {
        oA = cA;
        break;
      }
    }
    else for (cA in t) for (nA = t[cA], j = 0; j < nA.length; j += 1) {
      for (iA = !0, K = 0; K < nA[j].length; K += 1) if (nA[j][K] !== void 0 && nA[j][K] !== x.charCodeAt(K)) {
        iA = !1;
        break;
      }
      if (iA === !0) {
        oA = cA;
        break;
      }
    }
    return oA === A && I !== A && (oA = I), oA;
  }, n = function x(I) {
    for (var j = this.internal.write, K = this.internal.putStream, nA = (0, this.internal.getFilters)(); nA.indexOf("FlateEncode") !== -1; ) nA.splice(nA.indexOf("FlateEncode"), 1);
    I.objectId = this.internal.newObject();
    var iA = [];
    if (iA.push({ key: "Type", value: "/XObject" }), iA.push({ key: "Subtype", value: "/Image" }), iA.push({ key: "Width", value: I.width }), iA.push({ key: "Height", value: I.height }), I.colorSpace === _.INDEXED ? iA.push({ key: "ColorSpace", value: "[/Indexed /DeviceRGB " + (I.palette.length / 3 - 1) + " " + ("sMask" in I && I.sMask !== void 0 ? I.objectId + 2 : I.objectId + 1) + " 0 R]" }) : (iA.push({ key: "ColorSpace", value: "/" + I.colorSpace }), I.colorSpace === _.DEVICE_CMYK && iA.push({ key: "Decode", value: "[1 0 1 0 1 0 1 0]" })), iA.push({ key: "BitsPerComponent", value: I.bitsPerComponent }), "decodeParameters" in I && I.decodeParameters !== void 0 && iA.push({ key: "DecodeParms", value: "<<" + I.decodeParameters + ">>" }), "transparency" in I && Array.isArray(I.transparency)) {
      for (var cA = "", oA = 0, dA = I.transparency.length; oA < dA; oA++) cA += I.transparency[oA] + " " + I.transparency[oA] + " ";
      iA.push({ key: "Mask", value: "[" + cA + "]" });
    }
    I.sMask !== void 0 && iA.push({ key: "SMask", value: I.objectId + 1 + " 0 R" });
    var pA = I.filter !== void 0 ? ["/" + I.filter] : void 0;
    if (K({ data: I.data, additionalKeyValues: iA, alreadyAppliedFilters: pA, objectId: I.objectId }), j("endobj"), "sMask" in I && I.sMask !== void 0) {
      var LA = "/Predictor " + I.predictor + " /Colors 1 /BitsPerComponent " + I.bitsPerComponent + " /Columns " + I.width, E = { width: I.width, height: I.height, colorSpace: "DeviceGray", bitsPerComponent: I.bitsPerComponent, decodeParameters: LA, data: I.sMask };
      "filter" in I && (E.filter = I.filter), x.call(this, E);
    }
    if (I.colorSpace === _.INDEXED) {
      var M = this.internal.newObject();
      K({ data: D(new Uint8Array(I.palette)), objectId: M }), j("endobj");
    }
  }, i = function() {
    var x = this.internal.collections.addImage_images;
    for (var I in x) n.call(this, x[I]);
  }, a = function() {
    var x, I = this.internal.collections.addImage_images, j = this.internal.write;
    for (var K in I) j("/I" + (x = I[K]).index, x.objectId, "0", "R");
  }, l = function() {
    this.internal.collections.addImage_images || (this.internal.collections.addImage_images = {}, this.internal.events.subscribe("putResources", i), this.internal.events.subscribe("putXobjectDict", a));
  }, s = function() {
    var x = this.internal.collections.addImage_images;
    return l.call(this), x;
  }, f = function() {
    return Object.keys(this.internal.collections.addImage_images).length;
  }, g = function(x) {
    return typeof e["process" + x.toUpperCase()] == "function";
  }, p = function(x) {
    return Fe(x) === "object" && x.nodeType === 1;
  }, w = function(x, I) {
    if (x.nodeName === "IMG" && x.hasAttribute("src")) {
      var j = "" + x.getAttribute("src");
      if (j.indexOf("data:image/") === 0) return Lo(unescape(j).split("base64,").pop());
      var K = e.loadFile(j, !0);
      if (K !== void 0) return K;
    }
    if (x.nodeName === "CANVAS") {
      if (x.width === 0 || x.height === 0) throw new Error("Given canvas must have data. Canvas width: " + x.width + ", height: " + x.height);
      var nA;
      switch (I) {
        case "PNG":
          nA = "image/png";
          break;
        case "WEBP":
          nA = "image/webp";
          break;
        case "JPEG":
        case "JPG":
        default:
          nA = "image/jpeg";
      }
      return Lo(x.toDataURL(nA, 1).split("base64,").pop());
    }
  }, d = function(x) {
    var I = this.internal.collections.addImage_images;
    if (I) {
      for (var j in I) if (x === I[j].alias) return I[j];
    }
  }, C = function(x, I, j) {
    return x || I || (x = -96, I = -96), x < 0 && (x = -1 * j.width * 72 / x / this.internal.scaleFactor), I < 0 && (I = -1 * j.height * 72 / I / this.internal.scaleFactor), x === 0 && (x = I * j.width / j.height), I === 0 && (I = x * j.height / j.width), [x, I];
  }, b = function(x, I, j, K, nA, iA) {
    var cA = C.call(this, j, K, nA), oA = this.internal.getCoordinateString, dA = this.internal.getVerticalCoordinateString, pA = s.call(this);
    if (j = cA[0], K = cA[1], pA[nA.index] = nA, iA) {
      iA *= Math.PI / 180;
      var LA = Math.cos(iA), E = Math.sin(iA), M = function(X) {
        return X.toFixed(4);
      }, z = [M(LA), M(E), M(-1 * E), M(LA), 0, 0, "cm"];
    }
    this.internal.write("q"), iA ? (this.internal.write([1, "0", "0", 1, oA(x), dA(I + K), "cm"].join(" ")), this.internal.write(z.join(" ")), this.internal.write([oA(j), "0", "0", oA(K), "0", "0", "cm"].join(" "))) : this.internal.write([oA(j), "0", "0", oA(K), oA(x), dA(I + K), "cm"].join(" ")), this.isAdvancedAPI() && this.internal.write([1, 0, 0, -1, 0, 0, "cm"].join(" ")), this.internal.write("/I" + nA.index + " Do"), this.internal.write("Q");
  }, _ = e.color_spaces = { DEVICE_RGB: "DeviceRGB", DEVICE_GRAY: "DeviceGray", DEVICE_CMYK: "DeviceCMYK", CAL_GREY: "CalGray", CAL_RGB: "CalRGB", LAB: "Lab", ICC_BASED: "ICCBased", INDEXED: "Indexed", PATTERN: "Pattern", SEPARATION: "Separation", DEVICE_N: "DeviceN" };
  e.decode = { DCT_DECODE: "DCTDecode", FLATE_DECODE: "FlateDecode", LZW_DECODE: "LZWDecode", JPX_DECODE: "JPXDecode", JBIG2_DECODE: "JBIG2Decode", ASCII85_DECODE: "ASCII85Decode", ASCII_HEX_DECODE: "ASCIIHexDecode", RUN_LENGTH_DECODE: "RunLengthDecode", CCITT_FAX_DECODE: "CCITTFaxDecode" };
  var m = e.image_compression = { NONE: "NONE", FAST: "FAST", MEDIUM: "MEDIUM", SLOW: "SLOW" }, y = e.__addimage__.sHashCode = function(x) {
    var I, j, K = 0;
    if (typeof x == "string") for (j = x.length, I = 0; I < j; I++) K = (K << 5) - K + x.charCodeAt(I), K |= 0;
    else if (q(x)) for (j = x.byteLength / 2, I = 0; I < j; I++) K = (K << 5) - K + x[I], K |= 0;
    return K;
  }, H = e.__addimage__.validateStringAsBase64 = function(x) {
    (x = x || "").toString().trim();
    var I = !0;
    return x.length === 0 && (I = !1), x.length % 4 != 0 && (I = !1), /^[A-Za-z0-9+/]+$/.test(x.substr(0, x.length - 2)) === !1 && (I = !1), /^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(x.substr(-2)) === !1 && (I = !1), I;
  }, O = e.__addimage__.extractImageFromDataUrl = function(x) {
    var I = (x = x || "").split("base64,"), j = null;
    if (I.length === 2) {
      var K = /^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(I[0]);
      Array.isArray(K) && (j = { mimeType: K[1], charset: K[2], data: I[1] });
    }
    return j;
  }, P = e.__addimage__.supportsArrayBuffer = function() {
    return typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
  };
  e.__addimage__.isArrayBuffer = function(x) {
    return P() && x instanceof ArrayBuffer;
  };
  var q = e.__addimage__.isArrayBufferView = function(x) {
    return P() && typeof Uint32Array < "u" && (x instanceof Int8Array || x instanceof Uint8Array || typeof Uint8ClampedArray < "u" && x instanceof Uint8ClampedArray || x instanceof Int16Array || x instanceof Uint16Array || x instanceof Int32Array || x instanceof Uint32Array || x instanceof Float32Array || x instanceof Float64Array);
  }, W = e.__addimage__.binaryStringToUint8Array = function(x) {
    for (var I = x.length, j = new Uint8Array(I), K = 0; K < I; K++) j[K] = x.charCodeAt(K);
    return j;
  }, D = e.__addimage__.arrayBufferToBinaryString = function(x) {
    for (var I = "", j = q(x) ? x : new Uint8Array(x), K = 0; K < j.length; K += 8192) I += String.fromCharCode.apply(null, j.subarray(K, K + 8192));
    return I;
  };
  e.addImage = function() {
    var x, I, j, K, nA, iA, cA, oA, dA;
    if (typeof arguments[1] == "number" ? (I = A, j = arguments[1], K = arguments[2], nA = arguments[3], iA = arguments[4], cA = arguments[5], oA = arguments[6], dA = arguments[7]) : (I = arguments[1], j = arguments[2], K = arguments[3], nA = arguments[4], iA = arguments[5], cA = arguments[6], oA = arguments[7], dA = arguments[8]), Fe(x = arguments[0]) === "object" && !p(x) && "imageData" in x) {
      var pA = x;
      x = pA.imageData, I = pA.format || I || A, j = pA.x || j || 0, K = pA.y || K || 0, nA = pA.w || pA.width || nA, iA = pA.h || pA.height || iA, cA = pA.alias || cA, oA = pA.compression || oA, dA = pA.rotation || pA.angle || dA;
    }
    var LA = this.internal.getFilters();
    if (oA === void 0 && LA.indexOf("FlateEncode") !== -1 && (oA = "SLOW"), isNaN(j) || isNaN(K)) throw new Error("Invalid coordinates passed to jsPDF.addImage");
    l.call(this);
    var E = R.call(this, x, I, cA, oA);
    return b.call(this, j, K, nA, iA, E, dA), this;
  };
  var R = function(x, I, j, K) {
    var nA, iA, cA;
    if (typeof x == "string" && r(x) === A) {
      x = unescape(x);
      var oA = Y(x, !1);
      (oA !== "" || (oA = e.loadFile(x, !0)) !== void 0) && (x = oA);
    }
    if (p(x) && (x = w(x, I)), I = r(x, I), !g(I)) throw new Error("addImage does not support files of type '" + I + "', please ensure that a plugin for '" + I + "' support is added.");
    if (((cA = j) == null || cA.length === 0) && (j = function(dA) {
      return typeof dA == "string" || q(dA) ? y(dA) : q(dA.data) ? y(dA.data) : null;
    }(x)), (nA = d.call(this, j)) || (P() && (x instanceof Uint8Array || I === "RGBA" || (iA = x, x = W(x))), nA = this["process" + I.toUpperCase()](x, f.call(this), j, function(dA) {
      return dA && typeof dA == "string" && (dA = dA.toUpperCase()), dA in e.image_compression ? dA : m.NONE;
    }(K), iA)), !nA) throw new Error("An unknown error occurred whilst processing the image.");
    return nA;
  }, Y = e.__addimage__.convertBase64ToBinaryString = function(x, I) {
    var j;
    I = typeof I != "boolean" || I;
    var K, nA = "";
    if (typeof x == "string") {
      K = (j = O(x)) !== null ? j.data : x;
      try {
        nA = Lo(K);
      } catch (iA) {
        if (I) throw H(K) ? new Error("atob-Error in jsPDF.convertBase64ToBinaryString " + iA.message) : new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ");
      }
    }
    return nA;
  };
  e.getImageProperties = function(x) {
    var I, j, K = "";
    if (p(x) && (x = w(x)), typeof x == "string" && r(x) === A && ((K = Y(x, !1)) === "" && (K = e.loadFile(x) || ""), x = K), j = r(x), !g(j)) throw new Error("addImage does not support files of type '" + j + "', please ensure that a plugin for '" + j + "' support is added.");
    if (!P() || x instanceof Uint8Array || (x = W(x)), !(I = this["process" + j.toUpperCase()](x))) throw new Error("An unknown error occurred whilst processing the image");
    return I.fileType = j, I;
  };
})(WA.API), /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = function(t) {
    if (t !== void 0 && t != "") return !0;
  };
  WA.API.events.push(["addPage", function(t) {
    this.internal.getPageInfo(t.pageNumber).pageContext.annotations = [];
  }]), e.events.push(["putPage", function(t) {
    for (var r, n, i, a = this.internal.getCoordinateString, l = this.internal.getVerticalCoordinateString, s = this.internal.getPageInfoByObjId(t.objId), f = t.pageContext.annotations, g = !1, p = 0; p < f.length && !g; p++) switch ((r = f[p]).type) {
      case "link":
        (A(r.options.url) || A(r.options.pageNumber)) && (g = !0);
        break;
      case "reference":
      case "text":
      case "freetext":
        g = !0;
    }
    if (g != 0) {
      this.internal.write("/Annots [");
      for (var w = 0; w < f.length; w++) {
        r = f[w];
        var d = this.internal.pdfEscape, C = this.internal.getEncryptor(t.objId);
        switch (r.type) {
          case "reference":
            this.internal.write(" " + r.object.objId + " 0 R ");
            break;
          case "text":
            var b = this.internal.newAdditionalObject(), _ = this.internal.newAdditionalObject(), m = this.internal.getEncryptor(b.objId), y = r.title || "Note";
            i = "<</Type /Annot /Subtype /Text " + (n = "/Rect [" + a(r.bounds.x) + " " + l(r.bounds.y + r.bounds.h) + " " + a(r.bounds.x + r.bounds.w) + " " + l(r.bounds.y) + "] ") + "/Contents (" + d(m(r.contents)) + ")", i += " /Popup " + _.objId + " 0 R", i += " /P " + s.objId + " 0 R", i += " /T (" + d(m(y)) + ") >>", b.content = i;
            var H = b.objId + " 0 R";
            i = "<</Type /Annot /Subtype /Popup " + (n = "/Rect [" + a(r.bounds.x + 30) + " " + l(r.bounds.y + r.bounds.h) + " " + a(r.bounds.x + r.bounds.w + 30) + " " + l(r.bounds.y) + "] ") + " /Parent " + H, r.open && (i += " /Open true"), i += " >>", _.content = i, this.internal.write(b.objId, "0 R", _.objId, "0 R");
            break;
          case "freetext":
            n = "/Rect [" + a(r.bounds.x) + " " + l(r.bounds.y) + " " + a(r.bounds.x + r.bounds.w) + " " + l(r.bounds.y + r.bounds.h) + "] ";
            var O = r.color || "#000000";
            i = "<</Type /Annot /Subtype /FreeText " + n + "/Contents (" + d(C(r.contents)) + ")", i += " /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#" + O + ")", i += " /Border [0 0 0]", i += " >>", this.internal.write(i);
            break;
          case "link":
            if (r.options.name) {
              var P = this.annotations._nameMap[r.options.name];
              r.options.pageNumber = P.page, r.options.top = P.y;
            } else r.options.top || (r.options.top = 0);
            if (n = "/Rect [" + r.finalBounds.x + " " + r.finalBounds.y + " " + r.finalBounds.w + " " + r.finalBounds.h + "] ", i = "", r.options.url) i = "<</Type /Annot /Subtype /Link " + n + "/Border [0 0 0] /A <</S /URI /URI (" + d(C(r.options.url)) + ") >>";
            else if (r.options.pageNumber)
              switch (i = "<</Type /Annot /Subtype /Link " + n + "/Border [0 0 0] /Dest [" + this.internal.getPageInfo(r.options.pageNumber).objId + " 0 R", r.options.magFactor = r.options.magFactor || "XYZ", r.options.magFactor) {
                case "Fit":
                  i += " /Fit]";
                  break;
                case "FitH":
                  i += " /FitH " + r.options.top + "]";
                  break;
                case "FitV":
                  r.options.left = r.options.left || 0, i += " /FitV " + r.options.left + "]";
                  break;
                case "XYZ":
                default:
                  var q = l(r.options.top);
                  r.options.left = r.options.left || 0, r.options.zoom === void 0 && (r.options.zoom = 0), i += " /XYZ " + r.options.left + " " + q + " " + r.options.zoom + "]";
              }
            i != "" && (i += " >>", this.internal.write(i));
        }
      }
      this.internal.write("]");
    }
  }]), e.createAnnotation = function(t) {
    var r = this.internal.getCurrentPageInfo();
    switch (t.type) {
      case "link":
        this.link(t.bounds.x, t.bounds.y, t.bounds.w, t.bounds.h, t);
        break;
      case "text":
      case "freetext":
        r.pageContext.annotations.push(t);
    }
  }, e.link = function(t, r, n, i, a) {
    var l = this.internal.getCurrentPageInfo(), s = this.internal.getCoordinateString, f = this.internal.getVerticalCoordinateString;
    l.pageContext.annotations.push({ finalBounds: { x: s(t), y: f(r), w: s(t + n), h: f(r + i) }, options: a, type: "link" });
  }, e.textWithLink = function(t, r, n, i) {
    var a, l, s = this.getTextWidth(t), f = this.internal.getLineHeight() / this.internal.scaleFactor;
    if (i.maxWidth !== void 0) {
      l = i.maxWidth;
      var g = this.splitTextToSize(t, l).length;
      a = Math.ceil(f * g);
    } else l = s, a = f;
    return this.text(t, r, n, i), n += 0.2 * f, i.align === "center" && (r -= s / 2), i.align === "right" && (r -= s), this.link(r, n - f, l, a, i), s;
  }, e.getTextWidth = function(t) {
    var r = this.internal.getFontSize();
    return this.getStringUnitWidth(t) * r / this.internal.scaleFactor;
  };
}(WA.API), /**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = { 1569: [65152], 1570: [65153, 65154], 1571: [65155, 65156], 1572: [65157, 65158], 1573: [65159, 65160], 1574: [65161, 65162, 65163, 65164], 1575: [65165, 65166], 1576: [65167, 65168, 65169, 65170], 1577: [65171, 65172], 1578: [65173, 65174, 65175, 65176], 1579: [65177, 65178, 65179, 65180], 1580: [65181, 65182, 65183, 65184], 1581: [65185, 65186, 65187, 65188], 1582: [65189, 65190, 65191, 65192], 1583: [65193, 65194], 1584: [65195, 65196], 1585: [65197, 65198], 1586: [65199, 65200], 1587: [65201, 65202, 65203, 65204], 1588: [65205, 65206, 65207, 65208], 1589: [65209, 65210, 65211, 65212], 1590: [65213, 65214, 65215, 65216], 1591: [65217, 65218, 65219, 65220], 1592: [65221, 65222, 65223, 65224], 1593: [65225, 65226, 65227, 65228], 1594: [65229, 65230, 65231, 65232], 1601: [65233, 65234, 65235, 65236], 1602: [65237, 65238, 65239, 65240], 1603: [65241, 65242, 65243, 65244], 1604: [65245, 65246, 65247, 65248], 1605: [65249, 65250, 65251, 65252], 1606: [65253, 65254, 65255, 65256], 1607: [65257, 65258, 65259, 65260], 1608: [65261, 65262], 1609: [65263, 65264, 64488, 64489], 1610: [65265, 65266, 65267, 65268], 1649: [64336, 64337], 1655: [64477], 1657: [64358, 64359, 64360, 64361], 1658: [64350, 64351, 64352, 64353], 1659: [64338, 64339, 64340, 64341], 1662: [64342, 64343, 64344, 64345], 1663: [64354, 64355, 64356, 64357], 1664: [64346, 64347, 64348, 64349], 1667: [64374, 64375, 64376, 64377], 1668: [64370, 64371, 64372, 64373], 1670: [64378, 64379, 64380, 64381], 1671: [64382, 64383, 64384, 64385], 1672: [64392, 64393], 1676: [64388, 64389], 1677: [64386, 64387], 1678: [64390, 64391], 1681: [64396, 64397], 1688: [64394, 64395], 1700: [64362, 64363, 64364, 64365], 1702: [64366, 64367, 64368, 64369], 1705: [64398, 64399, 64400, 64401], 1709: [64467, 64468, 64469, 64470], 1711: [64402, 64403, 64404, 64405], 1713: [64410, 64411, 64412, 64413], 1715: [64406, 64407, 64408, 64409], 1722: [64414, 64415], 1723: [64416, 64417, 64418, 64419], 1726: [64426, 64427, 64428, 64429], 1728: [64420, 64421], 1729: [64422, 64423, 64424, 64425], 1733: [64480, 64481], 1734: [64473, 64474], 1735: [64471, 64472], 1736: [64475, 64476], 1737: [64482, 64483], 1739: [64478, 64479], 1740: [64508, 64509, 64510, 64511], 1744: [64484, 64485, 64486, 64487], 1746: [64430, 64431], 1747: [64432, 64433] }, t = { 65247: { 65154: 65269, 65156: 65271, 65160: 65273, 65166: 65275 }, 65248: { 65154: 65270, 65156: 65272, 65160: 65274, 65166: 65276 }, 65165: { 65247: { 65248: { 65258: 65010 } } }, 1617: { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 } }, r = { 1612: 64606, 1613: 64607, 1614: 64608, 1615: 64609, 1616: 64610 }, n = [1570, 1571, 1573, 1575];
  e.__arabicParser__ = {};
  var i = e.__arabicParser__.isInArabicSubstitutionA = function(b) {
    return A[b.charCodeAt(0)] !== void 0;
  }, a = e.__arabicParser__.isArabicLetter = function(b) {
    return typeof b == "string" && /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(b);
  }, l = e.__arabicParser__.isArabicEndLetter = function(b) {
    return a(b) && i(b) && A[b.charCodeAt(0)].length <= 2;
  }, s = e.__arabicParser__.isArabicAlfLetter = function(b) {
    return a(b) && n.indexOf(b.charCodeAt(0)) >= 0;
  };
  e.__arabicParser__.arabicLetterHasIsolatedForm = function(b) {
    return a(b) && i(b) && A[b.charCodeAt(0)].length >= 1;
  };
  var f = e.__arabicParser__.arabicLetterHasFinalForm = function(b) {
    return a(b) && i(b) && A[b.charCodeAt(0)].length >= 2;
  };
  e.__arabicParser__.arabicLetterHasInitialForm = function(b) {
    return a(b) && i(b) && A[b.charCodeAt(0)].length >= 3;
  };
  var g = e.__arabicParser__.arabicLetterHasMedialForm = function(b) {
    return a(b) && i(b) && A[b.charCodeAt(0)].length == 4;
  }, p = e.__arabicParser__.resolveLigatures = function(b) {
    var _ = 0, m = t, y = "", H = 0;
    for (_ = 0; _ < b.length; _ += 1) m[b.charCodeAt(_)] !== void 0 ? (H++, typeof (m = m[b.charCodeAt(_)]) == "number" && (y += String.fromCharCode(m), m = t, H = 0), _ === b.length - 1 && (m = t, y += b.charAt(_ - (H - 1)), _ -= H - 1, H = 0)) : (m = t, y += b.charAt(_ - H), _ -= H, H = 0);
    return y;
  };
  e.__arabicParser__.isArabicDiacritic = function(b) {
    return b !== void 0 && r[b.charCodeAt(0)] !== void 0;
  };
  var w = e.__arabicParser__.getCorrectForm = function(b, _, m) {
    return a(b) ? i(b) === !1 ? -1 : !f(b) || !a(_) && !a(m) || !a(m) && l(_) || l(b) && !a(_) || l(b) && s(_) || l(b) && l(_) ? 0 : g(b) && a(_) && !l(_) && a(m) && f(m) ? 3 : l(b) || !a(m) ? 1 : 2 : -1;
  }, d = function(b) {
    var _ = 0, m = 0, y = 0, H = "", O = "", P = "", q = (b = b || "").split("\\s+"), W = [];
    for (_ = 0; _ < q.length; _ += 1) {
      for (W.push(""), m = 0; m < q[_].length; m += 1) H = q[_][m], O = q[_][m - 1], P = q[_][m + 1], a(H) ? (y = w(H, O, P), W[_] += y !== -1 ? String.fromCharCode(A[H.charCodeAt(0)][y]) : H) : W[_] += H;
      W[_] = p(W[_]);
    }
    return W.join(" ");
  }, C = e.__arabicParser__.processArabic = e.processArabic = function() {
    var b, _ = typeof arguments[0] == "string" ? arguments[0] : arguments[0].text, m = [];
    if (Array.isArray(_)) {
      var y = 0;
      for (m = [], y = 0; y < _.length; y += 1) Array.isArray(_[y]) ? m.push([d(_[y][0]), _[y][1], _[y][2]]) : m.push([d(_[y])]);
      b = m;
    } else b = d(_);
    return typeof arguments[0] == "string" ? b : (arguments[0].text = b, arguments[0]);
  };
  e.events.push(["preProcessText", C]);
}(WA.API), WA.API.autoPrint = function(e) {
  var A;
  switch ((e = e || {}).variant = e.variant || "non-conform", e.variant) {
    case "javascript":
      this.addJS("print({});");
      break;
    case "non-conform":
    default:
      this.internal.events.subscribe("postPutResources", function() {
        A = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /Named"), this.internal.out("/Type /Action"), this.internal.out("/N /Print"), this.internal.out(">>"), this.internal.out("endobj");
      }), this.internal.events.subscribe("putCatalog", function() {
        this.internal.out("/OpenAction " + A + " 0 R");
      });
  }
  return this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = function() {
    var t = void 0;
    Object.defineProperty(this, "pdf", { get: function() {
      return t;
    }, set: function(l) {
      t = l;
    } });
    var r = 150;
    Object.defineProperty(this, "width", { get: function() {
      return r;
    }, set: function(l) {
      r = isNaN(l) || Number.isInteger(l) === !1 || l < 0 ? 150 : l, this.getContext("2d").pageWrapXEnabled && (this.getContext("2d").pageWrapX = r + 1);
    } });
    var n = 300;
    Object.defineProperty(this, "height", { get: function() {
      return n;
    }, set: function(l) {
      n = isNaN(l) || Number.isInteger(l) === !1 || l < 0 ? 300 : l, this.getContext("2d").pageWrapYEnabled && (this.getContext("2d").pageWrapY = n + 1);
    } });
    var i = [];
    Object.defineProperty(this, "childNodes", { get: function() {
      return i;
    }, set: function(l) {
      i = l;
    } });
    var a = {};
    Object.defineProperty(this, "style", { get: function() {
      return a;
    }, set: function(l) {
      a = l;
    } }), Object.defineProperty(this, "parentNode", {});
  };
  A.prototype.getContext = function(t, r) {
    var n;
    if ((t = t || "2d") !== "2d") return null;
    for (n in r) this.pdf.context2d.hasOwnProperty(n) && (this.pdf.context2d[n] = r[n]);
    return this.pdf.context2d._canvas = this, this.pdf.context2d;
  }, A.prototype.toDataURL = function() {
    throw new Error("toDataURL is not implemented.");
  }, e.events.push(["initialized", function() {
    this.canvas = new A(), this.canvas.pdf = this;
  }]);
}(WA.API), function(e) {
  var A = { left: 0, top: 0, bottom: 0, right: 0 }, t = !1, r = function() {
    this.internal.__cell__ === void 0 && (this.internal.__cell__ = {}, this.internal.__cell__.padding = 3, this.internal.__cell__.headerFunction = void 0, this.internal.__cell__.margins = Object.assign({}, A), this.internal.__cell__.margins.width = this.getPageWidth(), n.call(this));
  }, n = function() {
    this.internal.__cell__.lastCell = new i(), this.internal.__cell__.pages = 1;
  }, i = function() {
    var s = arguments[0];
    Object.defineProperty(this, "x", { enumerable: !0, get: function() {
      return s;
    }, set: function(b) {
      s = b;
    } });
    var f = arguments[1];
    Object.defineProperty(this, "y", { enumerable: !0, get: function() {
      return f;
    }, set: function(b) {
      f = b;
    } });
    var g = arguments[2];
    Object.defineProperty(this, "width", { enumerable: !0, get: function() {
      return g;
    }, set: function(b) {
      g = b;
    } });
    var p = arguments[3];
    Object.defineProperty(this, "height", { enumerable: !0, get: function() {
      return p;
    }, set: function(b) {
      p = b;
    } });
    var w = arguments[4];
    Object.defineProperty(this, "text", { enumerable: !0, get: function() {
      return w;
    }, set: function(b) {
      w = b;
    } });
    var d = arguments[5];
    Object.defineProperty(this, "lineNumber", { enumerable: !0, get: function() {
      return d;
    }, set: function(b) {
      d = b;
    } });
    var C = arguments[6];
    return Object.defineProperty(this, "align", { enumerable: !0, get: function() {
      return C;
    }, set: function(b) {
      C = b;
    } }), this;
  };
  i.prototype.clone = function() {
    return new i(this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align);
  }, i.prototype.toArray = function() {
    return [this.x, this.y, this.width, this.height, this.text, this.lineNumber, this.align];
  }, e.setHeaderFunction = function(s) {
    return r.call(this), this.internal.__cell__.headerFunction = typeof s == "function" ? s : void 0, this;
  }, e.getTextDimensions = function(s, f) {
    r.call(this);
    var g = (f = f || {}).fontSize || this.getFontSize(), p = f.font || this.getFont(), w = f.scaleFactor || this.internal.scaleFactor, d = 0, C = 0, b = 0, _ = this;
    if (!Array.isArray(s) && typeof s != "string") {
      if (typeof s != "number") throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");
      s = String(s);
    }
    var m = f.maxWidth;
    m > 0 ? typeof s == "string" ? s = this.splitTextToSize(s, m) : Object.prototype.toString.call(s) === "[object Array]" && (s = s.reduce(function(H, O) {
      return H.concat(_.splitTextToSize(O, m));
    }, [])) : s = Array.isArray(s) ? s : [s];
    for (var y = 0; y < s.length; y++) d < (b = this.getStringUnitWidth(s[y], { font: p }) * g) && (d = b);
    return d !== 0 && (C = s.length), { w: d /= w, h: Math.max((C * g * this.getLineHeightFactor() - g * (this.getLineHeightFactor() - 1)) / w, 0) };
  }, e.cellAddPage = function() {
    r.call(this), this.addPage();
    var s = this.internal.__cell__.margins || A;
    return this.internal.__cell__.lastCell = new i(s.left, s.top, void 0, void 0), this.internal.__cell__.pages += 1, this;
  };
  var a = e.cell = function() {
    var s;
    s = arguments[0] instanceof i ? arguments[0] : new i(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), r.call(this);
    var f = this.internal.__cell__.lastCell, g = this.internal.__cell__.padding, p = this.internal.__cell__.margins || A, w = this.internal.__cell__.tableHeaderRow, d = this.internal.__cell__.printHeaders;
    return f.lineNumber !== void 0 && (f.lineNumber === s.lineNumber ? (s.x = (f.x || 0) + (f.width || 0), s.y = f.y || 0) : f.y + f.height + s.height + p.bottom > this.getPageHeight() ? (this.cellAddPage(), s.y = p.top, d && w && (this.printHeaderRow(s.lineNumber, !0), s.y += w[0].height)) : s.y = f.y + f.height || s.y), s.text[0] !== void 0 && (this.rect(s.x, s.y, s.width, s.height, t === !0 ? "FD" : void 0), s.align === "right" ? this.text(s.text, s.x + s.width - g, s.y + g, { align: "right", baseline: "top" }) : s.align === "center" ? this.text(s.text, s.x + s.width / 2, s.y + g, { align: "center", baseline: "top", maxWidth: s.width - g - g }) : this.text(s.text, s.x + g, s.y + g, { align: "left", baseline: "top", maxWidth: s.width - g - g })), this.internal.__cell__.lastCell = s, this;
  };
  e.table = function(s, f, g, p, w) {
    if (r.call(this), !g) throw new Error("No data for PDF table.");
    var d, C, b, _, m = [], y = [], H = [], O = {}, P = {}, q = [], W = [], D = (w = w || {}).autoSize || !1, R = w.printHeaders !== !1, Y = w.css && w.css["font-size"] !== void 0 ? 16 * w.css["font-size"] : w.fontSize || 12, x = w.margins || Object.assign({ width: this.getPageWidth() }, A), I = typeof w.padding == "number" ? w.padding : 3, j = w.headerBackgroundColor || "#c8c8c8", K = w.headerTextColor || "#000";
    if (n.call(this), this.internal.__cell__.printHeaders = R, this.internal.__cell__.margins = x, this.internal.__cell__.table_font_size = Y, this.internal.__cell__.padding = I, this.internal.__cell__.headerBackgroundColor = j, this.internal.__cell__.headerTextColor = K, this.setFontSize(Y), p == null) y = m = Object.keys(g[0]), H = m.map(function() {
      return "left";
    });
    else if (Array.isArray(p) && Fe(p[0]) === "object") for (m = p.map(function(pA) {
      return pA.name;
    }), y = p.map(function(pA) {
      return pA.prompt || pA.name || "";
    }), H = p.map(function(pA) {
      return pA.align || "left";
    }), d = 0; d < p.length; d += 1) P[p[d].name] = p[d].width * (19.049976 / 25.4);
    else Array.isArray(p) && typeof p[0] == "string" && (y = m = p, H = m.map(function() {
      return "left";
    }));
    if (D || Array.isArray(p) && typeof p[0] == "string") for (d = 0; d < m.length; d += 1) {
      for (O[_ = m[d]] = g.map(function(pA) {
        return pA[_];
      }), this.setFont(void 0, "bold"), q.push(this.getTextDimensions(y[d], { fontSize: this.internal.__cell__.table_font_size, scaleFactor: this.internal.scaleFactor }).w), C = O[_], this.setFont(void 0, "normal"), b = 0; b < C.length; b += 1) q.push(this.getTextDimensions(C[b], { fontSize: this.internal.__cell__.table_font_size, scaleFactor: this.internal.scaleFactor }).w);
      P[_] = Math.max.apply(null, q) + I + I, q = [];
    }
    if (R) {
      var nA = {};
      for (d = 0; d < m.length; d += 1) nA[m[d]] = {}, nA[m[d]].text = y[d], nA[m[d]].align = H[d];
      var iA = l.call(this, nA, P);
      W = m.map(function(pA) {
        return new i(s, f, P[pA], iA, nA[pA].text, void 0, nA[pA].align);
      }), this.setTableHeaderRow(W), this.printHeaderRow(1, !1);
    }
    var cA = p.reduce(function(pA, LA) {
      return pA[LA.name] = LA.align, pA;
    }, {});
    for (d = 0; d < g.length; d += 1) {
      "rowStart" in w && w.rowStart instanceof Function && w.rowStart({ row: d, data: g[d] }, this);
      var oA = l.call(this, g[d], P);
      for (b = 0; b < m.length; b += 1) {
        var dA = g[d][m[b]];
        "cellStart" in w && w.cellStart instanceof Function && w.cellStart({ row: d, col: b, data: dA }, this), a.call(this, new i(s, f, P[m[b]], oA, dA, d + 2, cA[m[b]]));
      }
    }
    return this.internal.__cell__.table_x = s, this.internal.__cell__.table_y = f, this;
  };
  var l = function(s, f) {
    var g = this.internal.__cell__.padding, p = this.internal.__cell__.table_font_size, w = this.internal.scaleFactor;
    return Object.keys(s).map(function(d) {
      var C = s[d];
      return this.splitTextToSize(C.hasOwnProperty("text") ? C.text : C, f[d] - g - g);
    }, this).map(function(d) {
      return this.getLineHeightFactor() * d.length * p / w + g + g;
    }, this).reduce(function(d, C) {
      return Math.max(d, C);
    }, 0);
  };
  e.setTableHeaderRow = function(s) {
    r.call(this), this.internal.__cell__.tableHeaderRow = s;
  }, e.printHeaderRow = function(s, f) {
    if (r.call(this), !this.internal.__cell__.tableHeaderRow) throw new Error("Property tableHeaderRow does not exist.");
    var g;
    if (t = !0, typeof this.internal.__cell__.headerFunction == "function") {
      var p = this.internal.__cell__.headerFunction(this, this.internal.__cell__.pages);
      this.internal.__cell__.lastCell = new i(p[0], p[1], p[2], p[3], void 0, -1);
    }
    this.setFont(void 0, "bold");
    for (var w = [], d = 0; d < this.internal.__cell__.tableHeaderRow.length; d += 1) {
      g = this.internal.__cell__.tableHeaderRow[d].clone(), f && (g.y = this.internal.__cell__.margins.top || 0, w.push(g)), g.lineNumber = s;
      var C = this.getTextColor();
      this.setTextColor(this.internal.__cell__.headerTextColor), this.setFillColor(this.internal.__cell__.headerBackgroundColor), a.call(this, g), this.setTextColor(C);
    }
    w.length > 0 && this.setTableHeaderRow(w), this.setFont(void 0, "normal"), t = !1;
  };
}(WA.API);
var i1 = { italic: ["italic", "oblique", "normal"], oblique: ["oblique", "italic", "normal"], normal: ["normal", "oblique", "italic"] }, a1 = ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"], Af = n1(a1), o1 = [100, 200, 300, 400, 500, 600, 700, 800, 900], lw = n1(o1);
function ef(e) {
  var A = e.family.replace(/"|'/g, "").toLowerCase(), t = function(i) {
    return i1[i = i || "normal"] ? i : "normal";
  }(e.style), r = function(i) {
    if (!i) return 400;
    if (typeof i == "number") return i >= 100 && i <= 900 && i % 100 == 0 ? i : 400;
    if (/^\d00$/.test(i)) return parseInt(i);
    switch (i) {
      case "bold":
        return 700;
      case "normal":
      default:
        return 400;
    }
  }(e.weight), n = function(i) {
    return typeof Af[i = i || "normal"] == "number" ? i : "normal";
  }(e.stretch);
  return { family: A, style: t, weight: r, stretch: n, src: e.src || [], ref: e.ref || { name: A, style: [n, t, r].join(" ") } };
}
function l0(e, A, t, r) {
  var n;
  for (n = t; n >= 0 && n < A.length; n += r) if (e[A[n]]) return e[A[n]];
  for (n = t; n >= 0 && n < A.length; n -= r) if (e[A[n]]) return e[A[n]];
}
var uw = { "sans-serif": "helvetica", fixed: "courier", monospace: "courier", terminal: "courier", cursive: "times", fantasy: "times", serif: "times" }, u0 = { caption: "times", icon: "times", menu: "times", "message-box": "times", "small-caption": "times", "status-bar": "times" };
function c0(e) {
  return [e.stretch, e.style, e.weight, e.family].join(" ");
}
function cw(e, A, t) {
  for (var r = (t = t || {}).defaultFontFamily || "times", n = Object.assign({}, uw, t.genericFontFamilies || {}), i = null, a = null, l = 0; l < A.length; ++l) if (n[(i = ef(A[l])).family] && (i.family = n[i.family]), e.hasOwnProperty(i.family)) {
    a = e[i.family];
    break;
  }
  if (!(a = a || e[r])) throw new Error("Could not find a font-family for the rule '" + c0(i) + "' and default family '" + r + "'.");
  if (a = function(s, f) {
    if (f[s]) return f[s];
    var g = Af[s], p = g <= Af.normal ? -1 : 1, w = l0(f, a1, g, p);
    if (!w) throw new Error("Could not find a matching font-stretch value for " + s);
    return w;
  }(i.stretch, a), a = function(s, f) {
    if (f[s]) return f[s];
    for (var g = i1[s], p = 0; p < g.length; ++p) if (f[g[p]]) return f[g[p]];
    throw new Error("Could not find a matching font-style for " + s);
  }(i.style, a), !(a = function(s, f) {
    if (f[s]) return f[s];
    if (s === 400 && f[500]) return f[500];
    if (s === 500 && f[400]) return f[400];
    var g = lw[s], p = l0(f, o1, g, s < 400 ? -1 : 1);
    if (!p) throw new Error("Could not find a matching font-weight for value " + s);
    return p;
  }(i.weight, a))) throw new Error("Failed to resolve a font for the rule '" + c0(i) + "'.");
  return a;
}
function f0(e) {
  return e.trimLeft();
}
function fw(e, A) {
  for (var t = 0; t < e.length; ) {
    if (e.charAt(t) === A) return [e.substring(0, t), e.substring(t + 1)];
    t += 1;
  }
  return null;
}
function hw(e) {
  var A = e.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);
  return A === null ? null : [A[0], e.substring(A[0].length)];
}
var Rs, h0, d0, cc = ["times"];
(function(e) {
  var A, t, r, n, i, a, l, s, f, g = function(E) {
    return E = E || {}, this.isStrokeTransparent = E.isStrokeTransparent || !1, this.strokeOpacity = E.strokeOpacity || 1, this.strokeStyle = E.strokeStyle || "#000000", this.fillStyle = E.fillStyle || "#000000", this.isFillTransparent = E.isFillTransparent || !1, this.fillOpacity = E.fillOpacity || 1, this.font = E.font || "10px sans-serif", this.textBaseline = E.textBaseline || "alphabetic", this.textAlign = E.textAlign || "left", this.lineWidth = E.lineWidth || 1, this.lineJoin = E.lineJoin || "miter", this.lineCap = E.lineCap || "butt", this.path = E.path || [], this.transform = E.transform !== void 0 ? E.transform.clone() : new s(), this.globalCompositeOperation = E.globalCompositeOperation || "normal", this.globalAlpha = E.globalAlpha || 1, this.clip_path = E.clip_path || [], this.currentPoint = E.currentPoint || new a(), this.miterLimit = E.miterLimit || 10, this.lastPoint = E.lastPoint || new a(), this.lineDashOffset = E.lineDashOffset || 0, this.lineDash = E.lineDash || [], this.margin = E.margin || [0, 0, 0, 0], this.prevPageLastElemOffset = E.prevPageLastElemOffset || 0, this.ignoreClearRect = typeof E.ignoreClearRect != "boolean" || E.ignoreClearRect, this;
  };
  e.events.push(["initialized", function() {
    this.context2d = new p(this), A = this.internal.f2, t = this.internal.getCoordinateString, r = this.internal.getVerticalCoordinateString, n = this.internal.getHorizontalCoordinate, i = this.internal.getVerticalCoordinate, a = this.internal.Point, l = this.internal.Rectangle, s = this.internal.Matrix, f = new g();
  }]);
  var p = function(E) {
    Object.defineProperty(this, "canvas", { get: function() {
      return { parentNode: !1, style: !1 };
    } });
    var M = E;
    Object.defineProperty(this, "pdf", { get: function() {
      return M;
    } });
    var z = !1;
    Object.defineProperty(this, "pageWrapXEnabled", { get: function() {
      return z;
    }, set: function(V) {
      z = !!V;
    } });
    var X = !1;
    Object.defineProperty(this, "pageWrapYEnabled", { get: function() {
      return X;
    }, set: function(V) {
      X = !!V;
    } });
    var eA = 0;
    Object.defineProperty(this, "posX", { get: function() {
      return eA;
    }, set: function(V) {
      isNaN(V) || (eA = V);
    } });
    var sA = 0;
    Object.defineProperty(this, "posY", { get: function() {
      return sA;
    }, set: function(V) {
      isNaN(V) || (sA = V);
    } }), Object.defineProperty(this, "margin", { get: function() {
      return f.margin;
    }, set: function(V) {
      var B;
      typeof V == "number" ? B = [V, V, V, V] : ((B = new Array(4))[0] = V[0], B[1] = V.length >= 2 ? V[1] : B[0], B[2] = V.length >= 3 ? V[2] : B[0], B[3] = V.length >= 4 ? V[3] : B[1]), f.margin = B;
    } });
    var fA = !1;
    Object.defineProperty(this, "autoPaging", { get: function() {
      return fA;
    }, set: function(V) {
      fA = V;
    } });
    var hA = 0;
    Object.defineProperty(this, "lastBreak", { get: function() {
      return hA;
    }, set: function(V) {
      hA = V;
    } });
    var EA = [];
    Object.defineProperty(this, "pageBreaks", { get: function() {
      return EA;
    }, set: function(V) {
      EA = V;
    } }), Object.defineProperty(this, "ctx", { get: function() {
      return f;
    }, set: function(V) {
      V instanceof g && (f = V);
    } }), Object.defineProperty(this, "path", { get: function() {
      return f.path;
    }, set: function(V) {
      f.path = V;
    } });
    var QA = [];
    Object.defineProperty(this, "ctxStack", { get: function() {
      return QA;
    }, set: function(V) {
      QA = V;
    } }), Object.defineProperty(this, "fillStyle", { get: function() {
      return this.ctx.fillStyle;
    }, set: function(V) {
      var B;
      B = w(V), this.ctx.fillStyle = B.style, this.ctx.isFillTransparent = B.a === 0, this.ctx.fillOpacity = B.a, this.pdf.setFillColor(B.r, B.g, B.b, { a: B.a }), this.pdf.setTextColor(B.r, B.g, B.b, { a: B.a });
    } }), Object.defineProperty(this, "strokeStyle", { get: function() {
      return this.ctx.strokeStyle;
    }, set: function(V) {
      var B = w(V);
      this.ctx.strokeStyle = B.style, this.ctx.isStrokeTransparent = B.a === 0, this.ctx.strokeOpacity = B.a, B.a === 0 ? this.pdf.setDrawColor(255, 255, 255) : (B.a, this.pdf.setDrawColor(B.r, B.g, B.b));
    } }), Object.defineProperty(this, "lineCap", { get: function() {
      return this.ctx.lineCap;
    }, set: function(V) {
      ["butt", "round", "square"].indexOf(V) !== -1 && (this.ctx.lineCap = V, this.pdf.setLineCap(V));
    } }), Object.defineProperty(this, "lineWidth", { get: function() {
      return this.ctx.lineWidth;
    }, set: function(V) {
      isNaN(V) || (this.ctx.lineWidth = V, this.pdf.setLineWidth(V));
    } }), Object.defineProperty(this, "lineJoin", { get: function() {
      return this.ctx.lineJoin;
    }, set: function(V) {
      ["bevel", "round", "miter"].indexOf(V) !== -1 && (this.ctx.lineJoin = V, this.pdf.setLineJoin(V));
    } }), Object.defineProperty(this, "miterLimit", { get: function() {
      return this.ctx.miterLimit;
    }, set: function(V) {
      isNaN(V) || (this.ctx.miterLimit = V, this.pdf.setMiterLimit(V));
    } }), Object.defineProperty(this, "textBaseline", { get: function() {
      return this.ctx.textBaseline;
    }, set: function(V) {
      this.ctx.textBaseline = V;
    } }), Object.defineProperty(this, "textAlign", { get: function() {
      return this.ctx.textAlign;
    }, set: function(V) {
      ["right", "end", "center", "left", "start"].indexOf(V) !== -1 && (this.ctx.textAlign = V);
    } });
    var OA = null;
    function HA(V, B) {
      if (OA === null) {
        var CA = function(xA) {
          var yA = [];
          return Object.keys(xA).forEach(function($) {
            xA[$].forEach(function(UA) {
              var SA = null;
              switch (UA) {
                case "bold":
                  SA = { family: $, weight: "bold" };
                  break;
                case "italic":
                  SA = { family: $, style: "italic" };
                  break;
                case "bolditalic":
                  SA = { family: $, weight: "bold", style: "italic" };
                  break;
                case "":
                case "normal":
                  SA = { family: $ };
              }
              SA !== null && (SA.ref = { name: $, style: UA }, yA.push(SA));
            });
          }), yA;
        }(V.getFontList());
        OA = function(xA) {
          for (var yA = {}, $ = 0; $ < xA.length; ++$) {
            var UA = ef(xA[$]), SA = UA.family, KA = UA.stretch, $A = UA.style, ne = UA.weight;
            yA[SA] = yA[SA] || {}, yA[SA][KA] = yA[SA][KA] || {}, yA[SA][KA][$A] = yA[SA][KA][$A] || {}, yA[SA][KA][$A][ne] = UA;
          }
          return yA;
        }(CA.concat(B));
      }
      return OA;
    }
    var zA = null;
    Object.defineProperty(this, "fontFaces", { get: function() {
      return zA;
    }, set: function(V) {
      OA = null, zA = V;
    } }), Object.defineProperty(this, "font", { get: function() {
      return this.ctx.font;
    }, set: function(V) {
      var B;
      if (this.ctx.font = V, (B = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(V)) !== null) {
        var CA = B[1], xA = (B[2], B[3]), yA = B[4], $ = (B[5], B[6]), UA = /^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(yA)[2];
        yA = Math.floor(UA === "px" ? parseFloat(yA) * this.pdf.internal.scaleFactor : UA === "em" ? parseFloat(yA) * this.pdf.getFontSize() : parseFloat(yA) * this.pdf.internal.scaleFactor), this.pdf.setFontSize(yA);
        var SA = function(JA) {
          var ae, TA, vt = [], ge = JA.trim();
          if (ge === "") return cc;
          if (ge in u0) return [u0[ge]];
          for (; ge !== ""; ) {
            switch (TA = null, ae = (ge = f0(ge)).charAt(0)) {
              case '"':
              case "'":
                TA = fw(ge.substring(1), ae);
                break;
              default:
                TA = hw(ge);
            }
            if (TA === null || (vt.push(TA[0]), (ge = f0(TA[1])) !== "" && ge.charAt(0) !== ",")) return cc;
            ge = ge.replace(/^,/, "");
          }
          return vt;
        }($);
        if (this.fontFaces) {
          var KA = cw(HA(this.pdf, this.fontFaces), SA.map(function(JA) {
            return { family: JA, stretch: "normal", weight: xA, style: CA };
          }));
          this.pdf.setFont(KA.ref.name, KA.ref.style);
        } else {
          var $A = "";
          (xA === "bold" || parseInt(xA, 10) >= 700 || CA === "bold") && ($A = "bold"), CA === "italic" && ($A += "italic"), $A.length === 0 && ($A = "normal");
          for (var ne = "", ie = { arial: "Helvetica", Arial: "Helvetica", verdana: "Helvetica", Verdana: "Helvetica", helvetica: "Helvetica", Helvetica: "Helvetica", "sans-serif": "Helvetica", fixed: "Courier", monospace: "Courier", terminal: "Courier", cursive: "Times", fantasy: "Times", serif: "Times" }, fe = 0; fe < SA.length; fe++) {
            if (this.pdf.internal.getFont(SA[fe], $A, { noFallback: !0, disableWarning: !0 }) !== void 0) {
              ne = SA[fe];
              break;
            }
            if ($A === "bolditalic" && this.pdf.internal.getFont(SA[fe], "bold", { noFallback: !0, disableWarning: !0 }) !== void 0) ne = SA[fe], $A = "bold";
            else if (this.pdf.internal.getFont(SA[fe], "normal", { noFallback: !0, disableWarning: !0 }) !== void 0) {
              ne = SA[fe], $A = "normal";
              break;
            }
          }
          if (ne === "") {
            for (var Qe = 0; Qe < SA.length; Qe++) if (ie[SA[Qe]]) {
              ne = ie[SA[Qe]];
              break;
            }
          }
          ne = ne === "" ? "Times" : ne, this.pdf.setFont(ne, $A);
        }
      }
    } }), Object.defineProperty(this, "globalCompositeOperation", { get: function() {
      return this.ctx.globalCompositeOperation;
    }, set: function(V) {
      this.ctx.globalCompositeOperation = V;
    } }), Object.defineProperty(this, "globalAlpha", { get: function() {
      return this.ctx.globalAlpha;
    }, set: function(V) {
      this.ctx.globalAlpha = V;
    } }), Object.defineProperty(this, "lineDashOffset", { get: function() {
      return this.ctx.lineDashOffset;
    }, set: function(V) {
      this.ctx.lineDashOffset = V, LA.call(this);
    } }), Object.defineProperty(this, "lineDash", { get: function() {
      return this.ctx.lineDash;
    }, set: function(V) {
      this.ctx.lineDash = V, LA.call(this);
    } }), Object.defineProperty(this, "ignoreClearRect", { get: function() {
      return this.ctx.ignoreClearRect;
    }, set: function(V) {
      this.ctx.ignoreClearRect = !!V;
    } });
  };
  p.prototype.setLineDash = function(E) {
    this.lineDash = E;
  }, p.prototype.getLineDash = function() {
    return this.lineDash.length % 2 ? this.lineDash.concat(this.lineDash) : this.lineDash.slice();
  }, p.prototype.fill = function() {
    O.call(this, "fill", !1);
  }, p.prototype.stroke = function() {
    O.call(this, "stroke", !1);
  }, p.prototype.beginPath = function() {
    this.path = [{ type: "begin" }];
  }, p.prototype.moveTo = function(E, M) {
    if (isNaN(E) || isNaN(M)) throw Se.error("jsPDF.context2d.moveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.moveTo");
    var z = this.ctx.transform.applyToPoint(new a(E, M));
    this.path.push({ type: "mt", x: z.x, y: z.y }), this.ctx.lastPoint = new a(E, M);
  }, p.prototype.closePath = function() {
    var E = new a(0, 0), M = 0;
    for (M = this.path.length - 1; M !== -1; M--) if (this.path[M].type === "begin" && Fe(this.path[M + 1]) === "object" && typeof this.path[M + 1].x == "number") {
      E = new a(this.path[M + 1].x, this.path[M + 1].y);
      break;
    }
    this.path.push({ type: "close" }), this.ctx.lastPoint = new a(E.x, E.y);
  }, p.prototype.lineTo = function(E, M) {
    if (isNaN(E) || isNaN(M)) throw Se.error("jsPDF.context2d.lineTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.lineTo");
    var z = this.ctx.transform.applyToPoint(new a(E, M));
    this.path.push({ type: "lt", x: z.x, y: z.y }), this.ctx.lastPoint = new a(z.x, z.y);
  }, p.prototype.clip = function() {
    this.ctx.clip_path = JSON.parse(JSON.stringify(this.path)), O.call(this, null, !0);
  }, p.prototype.quadraticCurveTo = function(E, M, z, X) {
    if (isNaN(z) || isNaN(X) || isNaN(E) || isNaN(M)) throw Se.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");
    var eA = this.ctx.transform.applyToPoint(new a(z, X)), sA = this.ctx.transform.applyToPoint(new a(E, M));
    this.path.push({ type: "qct", x1: sA.x, y1: sA.y, x: eA.x, y: eA.y }), this.ctx.lastPoint = new a(eA.x, eA.y);
  }, p.prototype.bezierCurveTo = function(E, M, z, X, eA, sA) {
    if (isNaN(eA) || isNaN(sA) || isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X)) throw Se.error("jsPDF.context2d.bezierCurveTo: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");
    var fA = this.ctx.transform.applyToPoint(new a(eA, sA)), hA = this.ctx.transform.applyToPoint(new a(E, M)), EA = this.ctx.transform.applyToPoint(new a(z, X));
    this.path.push({ type: "bct", x1: hA.x, y1: hA.y, x2: EA.x, y2: EA.y, x: fA.x, y: fA.y }), this.ctx.lastPoint = new a(fA.x, fA.y);
  }, p.prototype.arc = function(E, M, z, X, eA, sA) {
    if (isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X) || isNaN(eA)) throw Se.error("jsPDF.context2d.arc: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.arc");
    if (sA = !!sA, !this.ctx.transform.isIdentity) {
      var fA = this.ctx.transform.applyToPoint(new a(E, M));
      E = fA.x, M = fA.y;
      var hA = this.ctx.transform.applyToPoint(new a(0, z)), EA = this.ctx.transform.applyToPoint(new a(0, 0));
      z = Math.sqrt(Math.pow(hA.x - EA.x, 2) + Math.pow(hA.y - EA.y, 2));
    }
    Math.abs(eA - X) >= 2 * Math.PI && (X = 0, eA = 2 * Math.PI), this.path.push({ type: "arc", x: E, y: M, radius: z, startAngle: X, endAngle: eA, counterclockwise: sA });
  }, p.prototype.arcTo = function(E, M, z, X, eA) {
    throw new Error("arcTo not implemented.");
  }, p.prototype.rect = function(E, M, z, X) {
    if (isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X)) throw Se.error("jsPDF.context2d.rect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rect");
    this.moveTo(E, M), this.lineTo(E + z, M), this.lineTo(E + z, M + X), this.lineTo(E, M + X), this.lineTo(E, M), this.lineTo(E + z, M), this.lineTo(E, M);
  }, p.prototype.fillRect = function(E, M, z, X) {
    if (isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X)) throw Se.error("jsPDF.context2d.fillRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillRect");
    if (!d.call(this)) {
      var eA = {};
      this.lineCap !== "butt" && (eA.lineCap = this.lineCap, this.lineCap = "butt"), this.lineJoin !== "miter" && (eA.lineJoin = this.lineJoin, this.lineJoin = "miter"), this.beginPath(), this.rect(E, M, z, X), this.fill(), eA.hasOwnProperty("lineCap") && (this.lineCap = eA.lineCap), eA.hasOwnProperty("lineJoin") && (this.lineJoin = eA.lineJoin);
    }
  }, p.prototype.strokeRect = function(E, M, z, X) {
    if (isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X)) throw Se.error("jsPDF.context2d.strokeRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");
    C.call(this) || (this.beginPath(), this.rect(E, M, z, X), this.stroke());
  }, p.prototype.clearRect = function(E, M, z, X) {
    if (isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X)) throw Se.error("jsPDF.context2d.clearRect: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.clearRect");
    this.ignoreClearRect || (this.fillStyle = "#ffffff", this.fillRect(E, M, z, X));
  }, p.prototype.save = function(E) {
    E = typeof E != "boolean" || E;
    for (var M = this.pdf.internal.getCurrentPageInfo().pageNumber, z = 0; z < this.pdf.internal.getNumberOfPages(); z++) this.pdf.setPage(z + 1), this.pdf.internal.out("q");
    if (this.pdf.setPage(M), E) {
      this.ctx.fontSize = this.pdf.internal.getFontSize();
      var X = new g(this.ctx);
      this.ctxStack.push(this.ctx), this.ctx = X;
    }
  }, p.prototype.restore = function(E) {
    E = typeof E != "boolean" || E;
    for (var M = this.pdf.internal.getCurrentPageInfo().pageNumber, z = 0; z < this.pdf.internal.getNumberOfPages(); z++) this.pdf.setPage(z + 1), this.pdf.internal.out("Q");
    this.pdf.setPage(M), E && this.ctxStack.length !== 0 && (this.ctx = this.ctxStack.pop(), this.fillStyle = this.ctx.fillStyle, this.strokeStyle = this.ctx.strokeStyle, this.font = this.ctx.font, this.lineCap = this.ctx.lineCap, this.lineWidth = this.ctx.lineWidth, this.lineJoin = this.ctx.lineJoin, this.lineDash = this.ctx.lineDash, this.lineDashOffset = this.ctx.lineDashOffset);
  }, p.prototype.toDataURL = function() {
    throw new Error("toDataUrl not implemented.");
  };
  var w = function(E) {
    var M, z, X, eA;
    if (E.isCanvasGradient === !0 && (E = E.getColor()), !E) return { r: 0, g: 0, b: 0, a: 0, style: E };
    if (/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(E)) M = 0, z = 0, X = 0, eA = 0;
    else {
      var sA = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(E);
      if (sA !== null) M = parseInt(sA[1]), z = parseInt(sA[2]), X = parseInt(sA[3]), eA = 1;
      else if ((sA = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(E)) !== null) M = parseInt(sA[1]), z = parseInt(sA[2]), X = parseInt(sA[3]), eA = parseFloat(sA[4]);
      else {
        if (eA = 1, typeof E == "string" && E.charAt(0) !== "#") {
          var fA = new Yd(E);
          E = fA.ok ? fA.toHex() : "#000000";
        }
        E.length === 4 ? (M = E.substring(1, 2), M += M, z = E.substring(2, 3), z += z, X = E.substring(3, 4), X += X) : (M = E.substring(1, 3), z = E.substring(3, 5), X = E.substring(5, 7)), M = parseInt(M, 16), z = parseInt(z, 16), X = parseInt(X, 16);
      }
    }
    return { r: M, g: z, b: X, a: eA, style: E };
  }, d = function() {
    return this.ctx.isFillTransparent || this.globalAlpha == 0;
  }, C = function() {
    return !!(this.ctx.isStrokeTransparent || this.globalAlpha == 0);
  };
  p.prototype.fillText = function(E, M, z, X) {
    if (isNaN(M) || isNaN(z) || typeof E != "string") throw Se.error("jsPDF.context2d.fillText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.fillText");
    if (X = isNaN(X) ? void 0 : X, !d.call(this)) {
      var eA = oA(this.ctx.transform.rotation), sA = this.ctx.transform.scaleX;
      I.call(this, { text: E, x: M, y: z, scale: sA, angle: eA, align: this.textAlign, maxWidth: X });
    }
  }, p.prototype.strokeText = function(E, M, z, X) {
    if (isNaN(M) || isNaN(z) || typeof E != "string") throw Se.error("jsPDF.context2d.strokeText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.strokeText");
    if (!C.call(this)) {
      X = isNaN(X) ? void 0 : X;
      var eA = oA(this.ctx.transform.rotation), sA = this.ctx.transform.scaleX;
      I.call(this, { text: E, x: M, y: z, scale: sA, renderingMode: "stroke", angle: eA, align: this.textAlign, maxWidth: X });
    }
  }, p.prototype.measureText = function(E) {
    if (typeof E != "string") throw Se.error("jsPDF.context2d.measureText: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.measureText");
    var M = this.pdf, z = this.pdf.internal.scaleFactor, X = M.internal.getFontSize(), eA = M.getStringUnitWidth(E) * X / M.internal.scaleFactor, sA = function(fA) {
      var hA = (fA = fA || {}).width || 0;
      return Object.defineProperty(this, "width", { get: function() {
        return hA;
      } }), this;
    };
    return new sA({ width: eA *= Math.round(96 * z / 72 * 1e4) / 1e4 });
  }, p.prototype.scale = function(E, M) {
    if (isNaN(E) || isNaN(M)) throw Se.error("jsPDF.context2d.scale: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.scale");
    var z = new s(E, 0, 0, M, 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(z);
  }, p.prototype.rotate = function(E) {
    if (isNaN(E)) throw Se.error("jsPDF.context2d.rotate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.rotate");
    var M = new s(Math.cos(E), Math.sin(E), -Math.sin(E), Math.cos(E), 0, 0);
    this.ctx.transform = this.ctx.transform.multiply(M);
  }, p.prototype.translate = function(E, M) {
    if (isNaN(E) || isNaN(M)) throw Se.error("jsPDF.context2d.translate: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.translate");
    var z = new s(1, 0, 0, 1, E, M);
    this.ctx.transform = this.ctx.transform.multiply(z);
  }, p.prototype.transform = function(E, M, z, X, eA, sA) {
    if (isNaN(E) || isNaN(M) || isNaN(z) || isNaN(X) || isNaN(eA) || isNaN(sA)) throw Se.error("jsPDF.context2d.transform: Invalid arguments", arguments), new Error("Invalid arguments passed to jsPDF.context2d.transform");
    var fA = new s(E, M, z, X, eA, sA);
    this.ctx.transform = this.ctx.transform.multiply(fA);
  }, p.prototype.setTransform = function(E, M, z, X, eA, sA) {
    E = isNaN(E) ? 1 : E, M = isNaN(M) ? 0 : M, z = isNaN(z) ? 0 : z, X = isNaN(X) ? 1 : X, eA = isNaN(eA) ? 0 : eA, sA = isNaN(sA) ? 0 : sA, this.ctx.transform = new s(E, M, z, X, eA, sA);
  };
  var b = function() {
    return this.margin[0] > 0 || this.margin[1] > 0 || this.margin[2] > 0 || this.margin[3] > 0;
  };
  p.prototype.drawImage = function(E, M, z, X, eA, sA, fA, hA, EA) {
    var QA = this.pdf.getImageProperties(E), OA = 1, HA = 1, zA = 1, V = 1;
    X !== void 0 && hA !== void 0 && (zA = hA / X, V = EA / eA, OA = QA.width / X * hA / X, HA = QA.height / eA * EA / eA), sA === void 0 && (sA = M, fA = z, M = 0, z = 0), X !== void 0 && hA === void 0 && (hA = X, EA = eA), X === void 0 && hA === void 0 && (hA = QA.width, EA = QA.height);
    for (var B, CA = this.ctx.transform.decompose(), xA = oA(CA.rotate.shx), yA = new s(), $ = (yA = (yA = (yA = yA.multiply(CA.translate)).multiply(CA.skew)).multiply(CA.scale)).applyToRectangle(new l(sA - M * zA, fA - z * V, X * OA, eA * HA)), UA = _.call(this, $), SA = [], KA = 0; KA < UA.length; KA += 1) SA.indexOf(UA[KA]) === -1 && SA.push(UA[KA]);
    if (H(SA), this.autoPaging) for (var $A = SA[0], ne = SA[SA.length - 1], ie = $A; ie < ne + 1; ie++) {
      this.pdf.setPage(ie);
      var fe = this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1], Qe = ie === 1 ? this.posY + this.margin[0] : this.margin[0], JA = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], ae = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2], TA = ie === 1 ? 0 : JA + (ie - 2) * ae;
      if (this.ctx.clip_path.length !== 0) {
        var vt = this.path;
        B = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y(B, this.posX + this.margin[3], -TA + Qe + this.ctx.prevPageLastElemOffset), P.call(this, "fill", !0), this.path = vt;
      }
      var ge = JSON.parse(JSON.stringify($));
      ge = y([ge], this.posX + this.margin[3], -TA + Qe + this.ctx.prevPageLastElemOffset)[0];
      var pr = (ie > $A || ie < ne) && b.call(this);
      pr && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], fe, ae, null).clip().discardPath()), this.pdf.addImage(E, "JPEG", ge.x, ge.y, ge.w, ge.h, null, null, xA), pr && this.pdf.restoreGraphicsState();
    }
    else this.pdf.addImage(E, "JPEG", $.x, $.y, $.w, $.h, null, null, xA);
  };
  var _ = function(E, M, z) {
    var X = [];
    M = M || this.pdf.internal.pageSize.width, z = z || this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2];
    var eA = this.posY + this.ctx.prevPageLastElemOffset;
    switch (E.type) {
      default:
      case "mt":
      case "lt":
        X.push(Math.floor((E.y + eA) / z) + 1);
        break;
      case "arc":
        X.push(Math.floor((E.y + eA - E.radius) / z) + 1), X.push(Math.floor((E.y + eA + E.radius) / z) + 1);
        break;
      case "qct":
        var sA = dA(this.ctx.lastPoint.x, this.ctx.lastPoint.y, E.x1, E.y1, E.x, E.y);
        X.push(Math.floor((sA.y + eA) / z) + 1), X.push(Math.floor((sA.y + sA.h + eA) / z) + 1);
        break;
      case "bct":
        var fA = pA(this.ctx.lastPoint.x, this.ctx.lastPoint.y, E.x1, E.y1, E.x2, E.y2, E.x, E.y);
        X.push(Math.floor((fA.y + eA) / z) + 1), X.push(Math.floor((fA.y + fA.h + eA) / z) + 1);
        break;
      case "rect":
        X.push(Math.floor((E.y + eA) / z) + 1), X.push(Math.floor((E.y + E.h + eA) / z) + 1);
    }
    for (var hA = 0; hA < X.length; hA += 1) for (; this.pdf.internal.getNumberOfPages() < X[hA]; ) m.call(this);
    return X;
  }, m = function() {
    var E = this.fillStyle, M = this.strokeStyle, z = this.font, X = this.lineCap, eA = this.lineWidth, sA = this.lineJoin;
    this.pdf.addPage(), this.fillStyle = E, this.strokeStyle = M, this.font = z, this.lineCap = X, this.lineWidth = eA, this.lineJoin = sA;
  }, y = function(E, M, z) {
    for (var X = 0; X < E.length; X++) switch (E[X].type) {
      case "bct":
        E[X].x2 += M, E[X].y2 += z;
      case "qct":
        E[X].x1 += M, E[X].y1 += z;
      case "mt":
      case "lt":
      case "arc":
      default:
        E[X].x += M, E[X].y += z;
    }
    return E;
  }, H = function(E) {
    return E.sort(function(M, z) {
      return M - z;
    });
  }, O = function(E, M) {
    for (var z, X, eA = this.fillStyle, sA = this.strokeStyle, fA = this.lineCap, hA = this.lineWidth, EA = Math.abs(hA * this.ctx.transform.scaleX), QA = this.lineJoin, OA = JSON.parse(JSON.stringify(this.path)), HA = JSON.parse(JSON.stringify(this.path)), zA = [], V = 0; V < HA.length; V++) if (HA[V].x !== void 0) for (var B = _.call(this, HA[V]), CA = 0; CA < B.length; CA += 1) zA.indexOf(B[CA]) === -1 && zA.push(B[CA]);
    for (var xA = 0; xA < zA.length; xA++) for (; this.pdf.internal.getNumberOfPages() < zA[xA]; ) m.call(this);
    if (H(zA), this.autoPaging) for (var yA = zA[0], $ = zA[zA.length - 1], UA = yA; UA < $ + 1; UA++) {
      this.pdf.setPage(UA), this.fillStyle = eA, this.strokeStyle = sA, this.lineCap = fA, this.lineWidth = EA, this.lineJoin = QA;
      var SA = this.pdf.internal.pageSize.width - this.margin[3] - this.margin[1], KA = UA === 1 ? this.posY + this.margin[0] : this.margin[0], $A = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], ne = this.pdf.internal.pageSize.height - this.margin[0] - this.margin[2], ie = UA === 1 ? 0 : $A + (UA - 2) * ne;
      if (this.ctx.clip_path.length !== 0) {
        var fe = this.path;
        z = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y(z, this.posX + this.margin[3], -ie + KA + this.ctx.prevPageLastElemOffset), P.call(this, E, !0), this.path = fe;
      }
      if (X = JSON.parse(JSON.stringify(OA)), this.path = y(X, this.posX + this.margin[3], -ie + KA + this.ctx.prevPageLastElemOffset), M === !1 || UA === 0) {
        var Qe = (UA > yA || UA < $) && b.call(this);
        Qe && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], SA, ne, null).clip().discardPath()), P.call(this, E, M), Qe && this.pdf.restoreGraphicsState();
      }
      this.lineWidth = hA;
    }
    else this.lineWidth = EA, P.call(this, E, M), this.lineWidth = hA;
    this.path = OA;
  }, P = function(E, M) {
    if ((E !== "stroke" || M || !C.call(this)) && (E === "stroke" || M || !d.call(this))) {
      for (var z, X, eA = [], sA = this.path, fA = 0; fA < sA.length; fA++) {
        var hA = sA[fA];
        switch (hA.type) {
          case "begin":
            eA.push({ begin: !0 });
            break;
          case "close":
            eA.push({ close: !0 });
            break;
          case "mt":
            eA.push({ start: hA, deltas: [], abs: [] });
            break;
          case "lt":
            var EA = eA.length;
            if (sA[fA - 1] && !isNaN(sA[fA - 1].x) && (z = [hA.x - sA[fA - 1].x, hA.y - sA[fA - 1].y], EA > 0)) {
              for (; EA >= 0; EA--) if (eA[EA - 1].close !== !0 && eA[EA - 1].begin !== !0) {
                eA[EA - 1].deltas.push(z), eA[EA - 1].abs.push(hA);
                break;
              }
            }
            break;
          case "bct":
            z = [hA.x1 - sA[fA - 1].x, hA.y1 - sA[fA - 1].y, hA.x2 - sA[fA - 1].x, hA.y2 - sA[fA - 1].y, hA.x - sA[fA - 1].x, hA.y - sA[fA - 1].y], eA[eA.length - 1].deltas.push(z);
            break;
          case "qct":
            var QA = sA[fA - 1].x + 2 / 3 * (hA.x1 - sA[fA - 1].x), OA = sA[fA - 1].y + 2 / 3 * (hA.y1 - sA[fA - 1].y), HA = hA.x + 2 / 3 * (hA.x1 - hA.x), zA = hA.y + 2 / 3 * (hA.y1 - hA.y), V = hA.x, B = hA.y;
            z = [QA - sA[fA - 1].x, OA - sA[fA - 1].y, HA - sA[fA - 1].x, zA - sA[fA - 1].y, V - sA[fA - 1].x, B - sA[fA - 1].y], eA[eA.length - 1].deltas.push(z);
            break;
          case "arc":
            eA.push({ deltas: [], abs: [], arc: !0 }), Array.isArray(eA[eA.length - 1].abs) && eA[eA.length - 1].abs.push(hA);
        }
      }
      X = M ? null : E === "stroke" ? "stroke" : "fill";
      for (var CA = !1, xA = 0; xA < eA.length; xA++) if (eA[xA].arc) for (var yA = eA[xA].abs, $ = 0; $ < yA.length; $++) {
        var UA = yA[$];
        UA.type === "arc" ? D.call(this, UA.x, UA.y, UA.radius, UA.startAngle, UA.endAngle, UA.counterclockwise, void 0, M, !CA) : j.call(this, UA.x, UA.y), CA = !0;
      }
      else if (eA[xA].close === !0) this.pdf.internal.out("h"), CA = !1;
      else if (eA[xA].begin !== !0) {
        var SA = eA[xA].start.x, KA = eA[xA].start.y;
        K.call(this, eA[xA].deltas, SA, KA), CA = !0;
      }
      X && R.call(this, X), M && Y.call(this);
    }
  }, q = function(E) {
    var M = this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor, z = M * (this.pdf.internal.getLineHeightFactor() - 1);
    switch (this.ctx.textBaseline) {
      case "bottom":
        return E - z;
      case "top":
        return E + M - z;
      case "hanging":
        return E + M - 2 * z;
      case "middle":
        return E + M / 2 - z;
      case "ideographic":
        return E;
      case "alphabetic":
      default:
        return E;
    }
  }, W = function(E) {
    return E + this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor * (this.pdf.internal.getLineHeightFactor() - 1);
  };
  p.prototype.createLinearGradient = function() {
    var E = function() {
    };
    return E.colorStops = [], E.addColorStop = function(M, z) {
      this.colorStops.push([M, z]);
    }, E.getColor = function() {
      return this.colorStops.length === 0 ? "#000000" : this.colorStops[0][1];
    }, E.isCanvasGradient = !0, E;
  }, p.prototype.createPattern = function() {
    return this.createLinearGradient();
  }, p.prototype.createRadialGradient = function() {
    return this.createLinearGradient();
  };
  var D = function(E, M, z, X, eA, sA, fA, hA, EA) {
    for (var QA = iA.call(this, z, X, eA, sA), OA = 0; OA < QA.length; OA++) {
      var HA = QA[OA];
      OA === 0 && (EA ? x.call(this, HA.x1 + E, HA.y1 + M) : j.call(this, HA.x1 + E, HA.y1 + M)), nA.call(this, E, M, HA.x2, HA.y2, HA.x3, HA.y3, HA.x4, HA.y4);
    }
    hA ? Y.call(this) : R.call(this, fA);
  }, R = function(E) {
    switch (E) {
      case "stroke":
        this.pdf.internal.out("S");
        break;
      case "fill":
        this.pdf.internal.out("f");
    }
  }, Y = function() {
    this.pdf.clip(), this.pdf.discardPath();
  }, x = function(E, M) {
    this.pdf.internal.out(t(E) + " " + r(M) + " m");
  }, I = function(E) {
    var M;
    switch (E.align) {
      case "right":
      case "end":
        M = "right";
        break;
      case "center":
        M = "center";
        break;
      case "left":
      case "start":
      default:
        M = "left";
    }
    var z = this.pdf.getTextDimensions(E.text), X = q.call(this, E.y), eA = W.call(this, X) - z.h, sA = this.ctx.transform.applyToPoint(new a(E.x, X)), fA = this.ctx.transform.decompose(), hA = new s();
    hA = (hA = (hA = hA.multiply(fA.translate)).multiply(fA.skew)).multiply(fA.scale);
    for (var EA, QA, OA, HA = this.ctx.transform.applyToRectangle(new l(E.x, X, z.w, z.h)), zA = hA.applyToRectangle(new l(E.x, eA, z.w, z.h)), V = _.call(this, zA), B = [], CA = 0; CA < V.length; CA += 1) B.indexOf(V[CA]) === -1 && B.push(V[CA]);
    if (H(B), this.autoPaging) for (var xA = B[0], yA = B[B.length - 1], $ = xA; $ < yA + 1; $++) {
      this.pdf.setPage($);
      var UA = $ === 1 ? this.posY + this.margin[0] : this.margin[0], SA = this.pdf.internal.pageSize.height - this.posY - this.margin[0] - this.margin[2], KA = this.pdf.internal.pageSize.height - this.margin[2], $A = KA - this.margin[0], ne = this.pdf.internal.pageSize.width - this.margin[1], ie = ne - this.margin[3], fe = $ === 1 ? 0 : SA + ($ - 2) * $A;
      if (this.ctx.clip_path.length !== 0) {
        var Qe = this.path;
        EA = JSON.parse(JSON.stringify(this.ctx.clip_path)), this.path = y(EA, this.posX + this.margin[3], -1 * fe + UA), P.call(this, "fill", !0), this.path = Qe;
      }
      var JA = y([JSON.parse(JSON.stringify(zA))], this.posX + this.margin[3], -fe + UA + this.ctx.prevPageLastElemOffset)[0];
      E.scale >= 0.01 && (QA = this.pdf.internal.getFontSize(), this.pdf.setFontSize(QA * E.scale), OA = this.lineWidth, this.lineWidth = OA * E.scale);
      var ae = this.autoPaging !== "text";
      if (ae || JA.y + JA.h <= KA) {
        if (ae || JA.y >= UA && JA.x <= ne) {
          var TA = ae ? E.text : this.pdf.splitTextToSize(E.text, E.maxWidth || ne - JA.x)[0], vt = y([JSON.parse(JSON.stringify(HA))], this.posX + this.margin[3], -fe + UA + this.ctx.prevPageLastElemOffset)[0], ge = ae && ($ > xA || $ < yA) && b.call(this);
          ge && (this.pdf.saveGraphicsState(), this.pdf.rect(this.margin[3], this.margin[0], ie, $A, null).clip().discardPath()), this.pdf.text(TA, vt.x, vt.y, { angle: E.angle, align: M, renderingMode: E.renderingMode }), ge && this.pdf.restoreGraphicsState();
        }
      } else JA.y < KA && (this.ctx.prevPageLastElemOffset += KA - JA.y);
      E.scale >= 0.01 && (this.pdf.setFontSize(QA), this.lineWidth = OA);
    }
    else E.scale >= 0.01 && (QA = this.pdf.internal.getFontSize(), this.pdf.setFontSize(QA * E.scale), OA = this.lineWidth, this.lineWidth = OA * E.scale), this.pdf.text(E.text, sA.x + this.posX, sA.y + this.posY, { angle: E.angle, align: M, renderingMode: E.renderingMode, maxWidth: E.maxWidth }), E.scale >= 0.01 && (this.pdf.setFontSize(QA), this.lineWidth = OA);
  }, j = function(E, M, z, X) {
    z = z || 0, X = X || 0, this.pdf.internal.out(t(E + z) + " " + r(M + X) + " l");
  }, K = function(E, M, z) {
    return this.pdf.lines(E, M, z, null, null);
  }, nA = function(E, M, z, X, eA, sA, fA, hA) {
    this.pdf.internal.out([A(n(z + E)), A(i(X + M)), A(n(eA + E)), A(i(sA + M)), A(n(fA + E)), A(i(hA + M)), "c"].join(" "));
  }, iA = function(E, M, z, X) {
    for (var eA = 2 * Math.PI, sA = Math.PI / 2; M > z; ) M -= eA;
    var fA = Math.abs(z - M);
    fA < eA && X && (fA = eA - fA);
    for (var hA = [], EA = X ? -1 : 1, QA = M; fA > 1e-5; ) {
      var OA = QA + EA * Math.min(fA, sA);
      hA.push(cA.call(this, E, QA, OA)), fA -= Math.abs(OA - QA), QA = OA;
    }
    return hA;
  }, cA = function(E, M, z) {
    var X = (z - M) / 2, eA = E * Math.cos(X), sA = E * Math.sin(X), fA = eA, hA = -sA, EA = fA * fA + hA * hA, QA = EA + fA * eA + hA * sA, OA = 4 / 3 * (Math.sqrt(2 * EA * QA) - QA) / (fA * sA - hA * eA), HA = fA - OA * hA, zA = hA + OA * fA, V = HA, B = -zA, CA = X + M, xA = Math.cos(CA), yA = Math.sin(CA);
    return { x1: E * Math.cos(M), y1: E * Math.sin(M), x2: HA * xA - zA * yA, y2: HA * yA + zA * xA, x3: V * xA - B * yA, y3: V * yA + B * xA, x4: E * Math.cos(z), y4: E * Math.sin(z) };
  }, oA = function(E) {
    return 180 * E / Math.PI;
  }, dA = function(E, M, z, X, eA, sA) {
    var fA = E + 0.5 * (z - E), hA = M + 0.5 * (X - M), EA = eA + 0.5 * (z - eA), QA = sA + 0.5 * (X - sA), OA = Math.min(E, eA, fA, EA), HA = Math.max(E, eA, fA, EA), zA = Math.min(M, sA, hA, QA), V = Math.max(M, sA, hA, QA);
    return new l(OA, zA, HA - OA, V - zA);
  }, pA = function(E, M, z, X, eA, sA, fA, hA) {
    var EA, QA, OA, HA, zA, V, B, CA, xA, yA, $, UA, SA, KA, $A = z - E, ne = X - M, ie = eA - z, fe = sA - X, Qe = fA - eA, JA = hA - sA;
    for (QA = 0; QA < 41; QA++) xA = (B = (OA = E + (EA = QA / 40) * $A) + EA * ((zA = z + EA * ie) - OA)) + EA * (zA + EA * (eA + EA * Qe - zA) - B), yA = (CA = (HA = M + EA * ne) + EA * ((V = X + EA * fe) - HA)) + EA * (V + EA * (sA + EA * JA - V) - CA), QA == 0 ? ($ = xA, UA = yA, SA = xA, KA = yA) : ($ = Math.min($, xA), UA = Math.min(UA, yA), SA = Math.max(SA, xA), KA = Math.max(KA, yA));
    return new l(Math.round($), Math.round(UA), Math.round(SA - $), Math.round(KA - UA));
  }, LA = function() {
    if (this.prevLineDash || this.ctx.lineDash.length || this.ctx.lineDashOffset) {
      var E, M, z = (E = this.ctx.lineDash, M = this.ctx.lineDashOffset, JSON.stringify({ lineDash: E, lineDashOffset: M }));
      this.prevLineDash !== z && (this.pdf.setLineDash(this.ctx.lineDash, this.ctx.lineDashOffset), this.prevLineDash = z);
    }
  };
})(WA.API), /**
 * @license
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = function(i) {
    var a, l, s, f, g, p, w, d, C, b;
    for (l = [], s = 0, f = (i += a = "\0\0\0\0".slice(i.length % 4 || 4)).length; f > s; s += 4) (g = (i.charCodeAt(s) << 24) + (i.charCodeAt(s + 1) << 16) + (i.charCodeAt(s + 2) << 8) + i.charCodeAt(s + 3)) !== 0 ? (p = (g = ((g = ((g = ((g = (g - (b = g % 85)) / 85) - (C = g % 85)) / 85) - (d = g % 85)) / 85) - (w = g % 85)) / 85) % 85, l.push(p + 33, w + 33, d + 33, C + 33, b + 33)) : l.push(122);
    return function(_, m) {
      for (var y = m; y > 0; y--) _.pop();
    }(l, a.length), String.fromCharCode.apply(String, l) + "~>";
  }, t = function(i) {
    var a, l, s, f, g, p = String, w = "length", d = 255, C = "charCodeAt", b = "slice", _ = "replace";
    for (i[b](-2), i = i[b](0, -2)[_](/\s/g, "")[_]("z", "!!!!!"), s = [], f = 0, g = (i += a = "uuuuu"[b](i[w] % 5 || 5))[w]; g > f; f += 5) l = 52200625 * (i[C](f) - 33) + 614125 * (i[C](f + 1) - 33) + 7225 * (i[C](f + 2) - 33) + 85 * (i[C](f + 3) - 33) + (i[C](f + 4) - 33), s.push(d & l >> 24, d & l >> 16, d & l >> 8, d & l);
    return function(m, y) {
      for (var H = y; H > 0; H--) m.pop();
    }(s, a[w]), p.fromCharCode.apply(p, s);
  }, r = function(i) {
    var a = new RegExp(/^([0-9A-Fa-f]{2})+$/);
    if ((i = i.replace(/\s/g, "")).indexOf(">") !== -1 && (i = i.substr(0, i.indexOf(">"))), i.length % 2 && (i += "0"), a.test(i) === !1) return "";
    for (var l = "", s = 0; s < i.length; s += 2) l += String.fromCharCode("0x" + (i[s] + i[s + 1]));
    return l;
  }, n = function(i) {
    for (var a = new Uint8Array(i.length), l = i.length; l--; ) a[l] = i.charCodeAt(l);
    return i = (a = Xc(a)).reduce(function(s, f) {
      return s + String.fromCharCode(f);
    }, "");
  };
  e.processDataByFilters = function(i, a) {
    var l = 0, s = i || "", f = [];
    for (typeof (a = a || []) == "string" && (a = [a]), l = 0; l < a.length; l += 1) switch (a[l]) {
      case "ASCII85Decode":
      case "/ASCII85Decode":
        s = t(s), f.push("/ASCII85Encode");
        break;
      case "ASCII85Encode":
      case "/ASCII85Encode":
        s = A(s), f.push("/ASCII85Decode");
        break;
      case "ASCIIHexDecode":
      case "/ASCIIHexDecode":
        s = r(s), f.push("/ASCIIHexEncode");
        break;
      case "ASCIIHexEncode":
      case "/ASCIIHexEncode":
        s = s.split("").map(function(g) {
          return ("0" + g.charCodeAt().toString(16)).slice(-2);
        }).join("") + ">", f.push("/ASCIIHexDecode");
        break;
      case "FlateEncode":
      case "/FlateEncode":
        s = n(s), f.push("/FlateDecode");
        break;
      default:
        throw new Error('The filter: "' + a[l] + '" is not implemented');
    }
    return { data: s, reverseChain: f.reverse().join(" ") };
  };
}(WA.API), /**
 * @license
 * jsPDF fileloading PlugIn
 * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  e.loadFile = function(A, t, r) {
    return function(n, i, a) {
      i = i !== !1, a = typeof a == "function" ? a : function() {
      };
      var l = void 0;
      try {
        l = function(s, f, g) {
          var p = new XMLHttpRequest(), w = 0, d = function(C) {
            var b = C.length, _ = [], m = String.fromCharCode;
            for (w = 0; w < b; w += 1) _.push(m(255 & C.charCodeAt(w)));
            return _.join("");
          };
          if (p.open("GET", s, !f), p.overrideMimeType("text/plain; charset=x-user-defined"), f === !1 && (p.onload = function() {
            p.status === 200 ? g(d(this.responseText)) : g(void 0);
          }), p.send(null), f && p.status === 200) return d(p.responseText);
        }(n, i, a);
      } catch {
      }
      return l;
    }(A, t, r);
  }, e.loadImageFile = e.loadFile;
}(WA.API), function(e) {
  function A() {
    return (XA.html2canvas ? Promise.resolve(XA.html2canvas) : Promise.resolve().then(() => eC)).catch(function(a) {
      return Promise.reject(new Error("Could not load html2canvas: " + a));
    }).then(function(a) {
      return a.default ? a.default : a;
    });
  }
  function t() {
    return (XA.DOMPurify ? Promise.resolve(XA.DOMPurify) : import("./purify.es-CKk_t3XZ.mjs")).catch(function(a) {
      return Promise.reject(new Error("Could not load dompurify: " + a));
    }).then(function(a) {
      return a.default ? a.default : a;
    });
  }
  var r = function(a) {
    var l = Fe(a);
    return l === "undefined" ? "undefined" : l === "string" || a instanceof String ? "string" : l === "number" || a instanceof Number ? "number" : l === "function" || a instanceof Function ? "function" : a && a.constructor === Array ? "array" : a && a.nodeType === 1 ? "element" : l === "object" ? "object" : "unknown";
  }, n = function(a, l) {
    var s = document.createElement(a);
    for (var f in l.className && (s.className = l.className), l.innerHTML && l.dompurify && (s.innerHTML = l.dompurify.sanitize(l.innerHTML)), l.style) s.style[f] = l.style[f];
    return s;
  }, i = function a(l) {
    var s = Object.assign(a.convert(Promise.resolve()), JSON.parse(JSON.stringify(a.template))), f = a.convert(Promise.resolve(), s);
    return f = (f = f.setProgress(1, a, 1, [a])).set(l);
  };
  (i.prototype = Object.create(Promise.prototype)).constructor = i, i.convert = function(a, l) {
    return a.__proto__ = l || i.prototype, a;
  }, i.template = { prop: { src: null, container: null, overlay: null, canvas: null, img: null, pdf: null, pageSize: null, callback: function() {
  } }, progress: { val: 0, state: null, n: 0, stack: [] }, opt: { filename: "file.pdf", margin: [0, 0, 0, 0], enableLinks: !0, x: 0, y: 0, html2canvas: {}, jsPDF: {}, backgroundColor: "transparent" } }, i.prototype.from = function(a, l) {
    return this.then(function() {
      switch (l = l || function(s) {
        switch (r(s)) {
          case "string":
            return "string";
          case "element":
            return s.nodeName.toLowerCase() === "canvas" ? "canvas" : "element";
          default:
            return "unknown";
        }
      }(a)) {
        case "string":
          return this.then(t).then(function(s) {
            return this.set({ src: n("div", { innerHTML: a, dompurify: s }) });
          });
        case "element":
          return this.set({ src: a });
        case "canvas":
          return this.set({ canvas: a });
        case "img":
          return this.set({ img: a });
        default:
          return this.error("Unknown source type.");
      }
    });
  }, i.prototype.to = function(a) {
    switch (a) {
      case "container":
        return this.toContainer();
      case "canvas":
        return this.toCanvas();
      case "img":
        return this.toImg();
      case "pdf":
        return this.toPdf();
      default:
        return this.error("Invalid target.");
    }
  }, i.prototype.toContainer = function() {
    return this.thenList([function() {
      return this.prop.src || this.error("Cannot duplicate - no source HTML.");
    }, function() {
      return this.prop.pageSize || this.setPageSize();
    }]).then(function() {
      var a = { position: "relative", display: "inline-block", width: (typeof this.opt.width != "number" || isNaN(this.opt.width) || typeof this.opt.windowWidth != "number" || isNaN(this.opt.windowWidth) ? Math.max(this.prop.src.clientWidth, this.prop.src.scrollWidth, this.prop.src.offsetWidth) : this.opt.windowWidth) + "px", left: 0, right: 0, top: 0, margin: "auto", backgroundColor: this.opt.backgroundColor }, l = function s(f, g) {
        for (var p = f.nodeType === 3 ? document.createTextNode(f.nodeValue) : f.cloneNode(!1), w = f.firstChild; w; w = w.nextSibling) g !== !0 && w.nodeType === 1 && w.nodeName === "SCRIPT" || p.appendChild(s(w, g));
        return f.nodeType === 1 && (f.nodeName === "CANVAS" ? (p.width = f.width, p.height = f.height, p.getContext("2d").drawImage(f, 0, 0)) : f.nodeName !== "TEXTAREA" && f.nodeName !== "SELECT" || (p.value = f.value), p.addEventListener("load", function() {
          p.scrollTop = f.scrollTop, p.scrollLeft = f.scrollLeft;
        }, !0)), p;
      }(this.prop.src, this.opt.html2canvas.javascriptEnabled);
      l.tagName === "BODY" && (a.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + "px"), this.prop.overlay = n("div", { className: "html2pdf__overlay", style: { position: "fixed", overflow: "hidden", zIndex: 1e3, left: "-100000px", right: 0, bottom: 0, top: 0 } }), this.prop.container = n("div", { className: "html2pdf__container", style: a }), this.prop.container.appendChild(l), this.prop.container.firstChild.appendChild(n("div", { style: { clear: "both", border: "0 none transparent", margin: 0, padding: 0, height: 0 } })), this.prop.container.style.float = "none", this.prop.overlay.appendChild(this.prop.container), document.body.appendChild(this.prop.overlay), this.prop.container.firstChild.style.position = "relative", this.prop.container.height = Math.max(this.prop.container.firstChild.clientHeight, this.prop.container.firstChild.scrollHeight, this.prop.container.firstChild.offsetHeight) + "px";
    });
  }, i.prototype.toCanvas = function() {
    var a = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(a).then(A).then(function(l) {
      var s = Object.assign({}, this.opt.html2canvas);
      return delete s.onrendered, l(this.prop.container, s);
    }).then(function(l) {
      (this.opt.html2canvas.onrendered || function() {
      })(l), this.prop.canvas = l, document.body.removeChild(this.prop.overlay);
    });
  }, i.prototype.toContext2d = function() {
    var a = [function() {
      return document.body.contains(this.prop.container) || this.toContainer();
    }];
    return this.thenList(a).then(A).then(function(l) {
      var s = this.opt.jsPDF, f = this.opt.fontFaces, g = typeof this.opt.width != "number" || isNaN(this.opt.width) || typeof this.opt.windowWidth != "number" || isNaN(this.opt.windowWidth) ? 1 : this.opt.width / this.opt.windowWidth, p = Object.assign({ async: !0, allowTaint: !0, scale: g, scrollX: this.opt.scrollX || 0, scrollY: this.opt.scrollY || 0, backgroundColor: "#ffffff", imageTimeout: 15e3, logging: !0, proxy: null, removeContainer: !0, foreignObjectRendering: !1, useCORS: !1 }, this.opt.html2canvas);
      if (delete p.onrendered, s.context2d.autoPaging = this.opt.autoPaging === void 0 || this.opt.autoPaging, s.context2d.posX = this.opt.x, s.context2d.posY = this.opt.y, s.context2d.margin = this.opt.margin, s.context2d.fontFaces = f, f) for (var w = 0; w < f.length; ++w) {
        var d = f[w], C = d.src.find(function(b) {
          return b.format === "truetype";
        });
        C && s.addFont(C.url, d.ref.name, d.ref.style);
      }
      return p.windowHeight = p.windowHeight || 0, p.windowHeight = p.windowHeight == 0 ? Math.max(this.prop.container.clientHeight, this.prop.container.scrollHeight, this.prop.container.offsetHeight) : p.windowHeight, s.context2d.save(!0), l(this.prop.container, p);
    }).then(function(l) {
      this.opt.jsPDF.context2d.restore(!0), (this.opt.html2canvas.onrendered || function() {
      })(l), this.prop.canvas = l, document.body.removeChild(this.prop.overlay);
    });
  }, i.prototype.toImg = function() {
    return this.thenList([function() {
      return this.prop.canvas || this.toCanvas();
    }]).then(function() {
      var a = this.prop.canvas.toDataURL("image/" + this.opt.image.type, this.opt.image.quality);
      this.prop.img = document.createElement("img"), this.prop.img.src = a;
    });
  }, i.prototype.toPdf = function() {
    return this.thenList([function() {
      return this.toContext2d();
    }]).then(function() {
      this.prop.pdf = this.prop.pdf || this.opt.jsPDF;
    });
  }, i.prototype.output = function(a, l, s) {
    return (s = s || "pdf").toLowerCase() === "img" || s.toLowerCase() === "image" ? this.outputImg(a, l) : this.outputPdf(a, l);
  }, i.prototype.outputPdf = function(a, l) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      return this.prop.pdf.output(a, l);
    });
  }, i.prototype.outputImg = function(a) {
    return this.thenList([function() {
      return this.prop.img || this.toImg();
    }]).then(function() {
      switch (a) {
        case void 0:
        case "img":
          return this.prop.img;
        case "datauristring":
        case "dataurlstring":
          return this.prop.img.src;
        case "datauri":
        case "dataurl":
          return document.location.href = this.prop.img.src;
        default:
          throw 'Image output type "' + a + '" is not supported.';
      }
    });
  }, i.prototype.save = function(a) {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).set(a ? { filename: a } : null).then(function() {
      this.prop.pdf.save(this.opt.filename);
    });
  }, i.prototype.doCallback = function() {
    return this.thenList([function() {
      return this.prop.pdf || this.toPdf();
    }]).then(function() {
      this.prop.callback(this.prop.pdf);
    });
  }, i.prototype.set = function(a) {
    if (r(a) !== "object") return this;
    var l = Object.keys(a || {}).map(function(s) {
      if (s in i.template.prop) return function() {
        this.prop[s] = a[s];
      };
      switch (s) {
        case "margin":
          return this.setMargin.bind(this, a.margin);
        case "jsPDF":
          return function() {
            return this.opt.jsPDF = a.jsPDF, this.setPageSize();
          };
        case "pageSize":
          return this.setPageSize.bind(this, a.pageSize);
        default:
          return function() {
            this.opt[s] = a[s];
          };
      }
    }, this);
    return this.then(function() {
      return this.thenList(l);
    });
  }, i.prototype.get = function(a, l) {
    return this.then(function() {
      var s = a in i.template.prop ? this.prop[a] : this.opt[a];
      return l ? l(s) : s;
    });
  }, i.prototype.setMargin = function(a) {
    return this.then(function() {
      switch (r(a)) {
        case "number":
          a = [a, a, a, a];
        case "array":
          if (a.length === 2 && (a = [a[0], a[1], a[0], a[1]]), a.length === 4) break;
        default:
          return this.error("Invalid margin array.");
      }
      this.opt.margin = a;
    }).then(this.setPageSize);
  }, i.prototype.setPageSize = function(a) {
    function l(s, f) {
      return Math.floor(s * f / 72 * 96);
    }
    return this.then(function() {
      (a = a || WA.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner") || (a.inner = { width: a.width - this.opt.margin[1] - this.opt.margin[3], height: a.height - this.opt.margin[0] - this.opt.margin[2] }, a.inner.px = { width: l(a.inner.width, a.k), height: l(a.inner.height, a.k) }, a.inner.ratio = a.inner.height / a.inner.width), this.prop.pageSize = a;
    });
  }, i.prototype.setProgress = function(a, l, s, f) {
    return a != null && (this.progress.val = a), l != null && (this.progress.state = l), s != null && (this.progress.n = s), f != null && (this.progress.stack = f), this.progress.ratio = this.progress.val / this.progress.state, this;
  }, i.prototype.updateProgress = function(a, l, s, f) {
    return this.setProgress(a ? this.progress.val + a : null, l || null, s ? this.progress.n + s : null, f ? this.progress.stack.concat(f) : null);
  }, i.prototype.then = function(a, l) {
    var s = this;
    return this.thenCore(a, l, function(f, g) {
      return s.updateProgress(null, null, 1, [f]), Promise.prototype.then.call(this, function(p) {
        return s.updateProgress(null, f), p;
      }).then(f, g).then(function(p) {
        return s.updateProgress(1), p;
      });
    });
  }, i.prototype.thenCore = function(a, l, s) {
    s = s || Promise.prototype.then, a && (a = a.bind(this)), l && (l = l.bind(this));
    var f = Promise.toString().indexOf("[native code]") !== -1 && Promise.name === "Promise" ? this : i.convert(Object.assign({}, this), Promise.prototype), g = s.call(f, a, l);
    return i.convert(g, this.__proto__);
  }, i.prototype.thenExternal = function(a, l) {
    return Promise.prototype.then.call(this, a, l);
  }, i.prototype.thenList = function(a) {
    var l = this;
    return a.forEach(function(s) {
      l = l.thenCore(s);
    }), l;
  }, i.prototype.catch = function(a) {
    a && (a = a.bind(this));
    var l = Promise.prototype.catch.call(this, a);
    return i.convert(l, this);
  }, i.prototype.catchExternal = function(a) {
    return Promise.prototype.catch.call(this, a);
  }, i.prototype.error = function(a) {
    return this.then(function() {
      throw new Error(a);
    });
  }, i.prototype.using = i.prototype.set, i.prototype.saveAs = i.prototype.save, i.prototype.export = i.prototype.output, i.prototype.run = i.prototype.then, WA.getPageSize = function(a, l, s) {
    if (Fe(a) === "object") {
      var f = a;
      a = f.orientation, l = f.unit || l, s = f.format || s;
    }
    l = l || "mm", s = s || "a4", a = ("" + (a || "P")).toLowerCase();
    var g, p = ("" + s).toLowerCase(), w = { a0: [2383.94, 3370.39], a1: [1683.78, 2383.94], a2: [1190.55, 1683.78], a3: [841.89, 1190.55], a4: [595.28, 841.89], a5: [419.53, 595.28], a6: [297.64, 419.53], a7: [209.76, 297.64], a8: [147.4, 209.76], a9: [104.88, 147.4], a10: [73.7, 104.88], b0: [2834.65, 4008.19], b1: [2004.09, 2834.65], b2: [1417.32, 2004.09], b3: [1000.63, 1417.32], b4: [708.66, 1000.63], b5: [498.9, 708.66], b6: [354.33, 498.9], b7: [249.45, 354.33], b8: [175.75, 249.45], b9: [124.72, 175.75], b10: [87.87, 124.72], c0: [2599.37, 3676.54], c1: [1836.85, 2599.37], c2: [1298.27, 1836.85], c3: [918.43, 1298.27], c4: [649.13, 918.43], c5: [459.21, 649.13], c6: [323.15, 459.21], c7: [229.61, 323.15], c8: [161.57, 229.61], c9: [113.39, 161.57], c10: [79.37, 113.39], dl: [311.81, 623.62], letter: [612, 792], "government-letter": [576, 756], legal: [612, 1008], "junior-legal": [576, 360], ledger: [1224, 792], tabloid: [792, 1224], "credit-card": [153, 243] };
    switch (l) {
      case "pt":
        g = 1;
        break;
      case "mm":
        g = 72 / 25.4;
        break;
      case "cm":
        g = 72 / 2.54;
        break;
      case "in":
        g = 72;
        break;
      case "px":
        g = 0.75;
        break;
      case "pc":
      case "em":
        g = 12;
        break;
      case "ex":
        g = 6;
        break;
      default:
        throw "Invalid unit: " + l;
    }
    var d, C = 0, b = 0;
    if (w.hasOwnProperty(p)) C = w[p][1] / g, b = w[p][0] / g;
    else try {
      C = s[1], b = s[0];
    } catch {
      throw new Error("Invalid format: " + s);
    }
    if (a === "p" || a === "portrait") a = "p", b > C && (d = b, b = C, C = d);
    else {
      if (a !== "l" && a !== "landscape") throw "Invalid orientation: " + a;
      a = "l", C > b && (d = b, b = C, C = d);
    }
    return { width: b, height: C, unit: l, k: g, orientation: a };
  }, e.html = function(a, l) {
    (l = l || {}).callback = l.callback || function() {
    }, l.html2canvas = l.html2canvas || {}, l.html2canvas.canvas = l.html2canvas.canvas || this.canvas, l.jsPDF = l.jsPDF || this, l.fontFaces = l.fontFaces ? l.fontFaces.map(ef) : null;
    var s = new i(l);
    return l.worker ? s : s.from(a).doCallback();
  };
}(WA.API), WA.API.addJS = function(e) {
  return d0 = e, this.internal.events.subscribe("postPutResources", function() {
    Rs = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/Names [(EmbeddedJS) " + (Rs + 1) + " 0 R]"), this.internal.out(">>"), this.internal.out("endobj"), h0 = this.internal.newObject(), this.internal.out("<<"), this.internal.out("/S /JavaScript"), this.internal.out("/JS (" + d0 + ")"), this.internal.out(">>"), this.internal.out("endobj");
  }), this.internal.events.subscribe("putCatalog", function() {
    Rs !== void 0 && h0 !== void 0 && this.internal.out("/Names <</JavaScript " + Rs + " 0 R>>");
  }), this;
}, /**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A;
  e.events.push(["postPutResources", function() {
    var t = this, r = /^(\d+) 0 obj$/;
    if (this.outline.root.children.length > 0) for (var n = t.outline.render().split(/\r\n/), i = 0; i < n.length; i++) {
      var a = n[i], l = r.exec(a);
      if (l != null) {
        var s = l[1];
        t.internal.newObjectDeferredBegin(s, !1);
      }
      t.internal.write(a);
    }
    if (this.outline.createNamedDestinations) {
      var f = this.internal.pages.length, g = [];
      for (i = 0; i < f; i++) {
        var p = t.internal.newObject();
        g.push(p);
        var w = t.internal.getPageInfo(i + 1);
        t.internal.write("<< /D[" + w.objId + " 0 R /XYZ null null null]>> endobj");
      }
      var d = t.internal.newObject();
      for (t.internal.write("<< /Names [ "), i = 0; i < g.length; i++) t.internal.write("(page_" + (i + 1) + ")" + g[i] + " 0 R");
      t.internal.write(" ] >>", "endobj"), A = t.internal.newObject(), t.internal.write("<< /Dests " + d + " 0 R"), t.internal.write(">>", "endobj");
    }
  }]), e.events.push(["putCatalog", function() {
    this.outline.root.children.length > 0 && (this.internal.write("/Outlines", this.outline.makeRef(this.outline.root)), this.outline.createNamedDestinations && this.internal.write("/Names " + A + " 0 R"));
  }]), e.events.push(["initialized", function() {
    var t = this;
    t.outline = { createNamedDestinations: !1, root: { children: [] } }, t.outline.add = function(r, n, i) {
      var a = { title: n, options: i, children: [] };
      return r == null && (r = this.root), r.children.push(a), a;
    }, t.outline.render = function() {
      return this.ctx = {}, this.ctx.val = "", this.ctx.pdf = t, this.genIds_r(this.root), this.renderRoot(this.root), this.renderItems(this.root), this.ctx.val;
    }, t.outline.genIds_r = function(r) {
      r.id = t.internal.newObjectDeferred();
      for (var n = 0; n < r.children.length; n++) this.genIds_r(r.children[n]);
    }, t.outline.renderRoot = function(r) {
      this.objStart(r), this.line("/Type /Outlines"), r.children.length > 0 && (this.line("/First " + this.makeRef(r.children[0])), this.line("/Last " + this.makeRef(r.children[r.children.length - 1]))), this.line("/Count " + this.count_r({ count: 0 }, r)), this.objEnd();
    }, t.outline.renderItems = function(r) {
      for (var n = this.ctx.pdf.internal.getVerticalCoordinateString, i = 0; i < r.children.length; i++) {
        var a = r.children[i];
        this.objStart(a), this.line("/Title " + this.makeString(a.title)), this.line("/Parent " + this.makeRef(r)), i > 0 && this.line("/Prev " + this.makeRef(r.children[i - 1])), i < r.children.length - 1 && this.line("/Next " + this.makeRef(r.children[i + 1])), a.children.length > 0 && (this.line("/First " + this.makeRef(a.children[0])), this.line("/Last " + this.makeRef(a.children[a.children.length - 1])));
        var l = this.count = this.count_r({ count: 0 }, a);
        if (l > 0 && this.line("/Count " + l), a.options && a.options.pageNumber) {
          var s = t.internal.getPageInfo(a.options.pageNumber);
          this.line("/Dest [" + s.objId + " 0 R /XYZ 0 " + n(0) + " 0]");
        }
        this.objEnd();
      }
      for (var f = 0; f < r.children.length; f++) this.renderItems(r.children[f]);
    }, t.outline.line = function(r) {
      this.ctx.val += r + `\r
`;
    }, t.outline.makeRef = function(r) {
      return r.id + " 0 R";
    }, t.outline.makeString = function(r) {
      return "(" + t.internal.pdfEscape(r) + ")";
    }, t.outline.objStart = function(r) {
      this.ctx.val += `\r
` + r.id + ` 0 obj\r
<<\r
`;
    }, t.outline.objEnd = function() {
      this.ctx.val += `>> \r
endobj\r
`;
    }, t.outline.count_r = function(r, n) {
      for (var i = 0; i < n.children.length; i++) r.count++, this.count_r(r, n.children[i]);
      return r.count;
    };
  }]);
}(WA.API), /**
 * @license
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = [192, 193, 194, 195, 196, 197, 198, 199];
  e.processJPEG = function(t, r, n, i, a, l) {
    var s, f = this.decode.DCT_DECODE, g = null;
    if (typeof t == "string" || this.__addimage__.isArrayBuffer(t) || this.__addimage__.isArrayBufferView(t)) {
      switch (t = a || t, t = this.__addimage__.isArrayBuffer(t) ? new Uint8Array(t) : t, (s = function(p) {
        for (var w, d = 256 * p.charCodeAt(4) + p.charCodeAt(5), C = p.length, b = { width: 0, height: 0, numcomponents: 1 }, _ = 4; _ < C; _ += 2) {
          if (_ += d, A.indexOf(p.charCodeAt(_ + 1)) !== -1) {
            w = 256 * p.charCodeAt(_ + 5) + p.charCodeAt(_ + 6), b = { width: 256 * p.charCodeAt(_ + 7) + p.charCodeAt(_ + 8), height: w, numcomponents: p.charCodeAt(_ + 9) };
            break;
          }
          d = 256 * p.charCodeAt(_ + 2) + p.charCodeAt(_ + 3);
        }
        return b;
      }(t = this.__addimage__.isArrayBufferView(t) ? this.__addimage__.arrayBufferToBinaryString(t) : t)).numcomponents) {
        case 1:
          l = this.color_spaces.DEVICE_GRAY;
          break;
        case 4:
          l = this.color_spaces.DEVICE_CMYK;
          break;
        case 3:
          l = this.color_spaces.DEVICE_RGB;
      }
      g = { data: t, width: s.width, height: s.height, colorSpace: l, bitsPerComponent: 8, filter: f, index: r, alias: n };
    }
    return g;
  };
}(WA.API);
var Aa, Ks, g0, p0, B0, dw = function() {
  var e, A, t;
  function r(i) {
    var a, l, s, f, g, p, w, d, C, b, _, m, y, H;
    for (this.data = i, this.pos = 8, this.palette = [], this.imgData = [], this.transparency = {}, this.animation = null, this.text = {}, p = null; ; ) {
      switch (a = this.readUInt32(), C = (function() {
        var O, P;
        for (P = [], O = 0; O < 4; ++O) P.push(String.fromCharCode(this.data[this.pos++]));
        return P;
      }).call(this).join("")) {
        case "IHDR":
          this.width = this.readUInt32(), this.height = this.readUInt32(), this.bits = this.data[this.pos++], this.colorType = this.data[this.pos++], this.compressionMethod = this.data[this.pos++], this.filterMethod = this.data[this.pos++], this.interlaceMethod = this.data[this.pos++];
          break;
        case "acTL":
          this.animation = { numFrames: this.readUInt32(), numPlays: this.readUInt32() || 1 / 0, frames: [] };
          break;
        case "PLTE":
          this.palette = this.read(a);
          break;
        case "fcTL":
          p && this.animation.frames.push(p), this.pos += 4, p = { width: this.readUInt32(), height: this.readUInt32(), xOffset: this.readUInt32(), yOffset: this.readUInt32() }, g = this.readUInt16(), f = this.readUInt16() || 100, p.delay = 1e3 * g / f, p.disposeOp = this.data[this.pos++], p.blendOp = this.data[this.pos++], p.data = [];
          break;
        case "IDAT":
        case "fdAT":
          for (C === "fdAT" && (this.pos += 4, a -= 4), i = (p != null ? p.data : void 0) || this.imgData, m = 0; 0 <= a ? m < a : m > a; 0 <= a ? ++m : --m) i.push(this.data[this.pos++]);
          break;
        case "tRNS":
          switch (this.transparency = {}, this.colorType) {
            case 3:
              if (s = this.palette.length / 3, this.transparency.indexed = this.read(a), this.transparency.indexed.length > s) throw new Error("More transparent colors than palette size");
              if ((b = s - this.transparency.indexed.length) > 0) for (y = 0; 0 <= b ? y < b : y > b; 0 <= b ? ++y : --y) this.transparency.indexed.push(255);
              break;
            case 0:
              this.transparency.grayscale = this.read(a)[0];
              break;
            case 2:
              this.transparency.rgb = this.read(a);
          }
          break;
        case "tEXt":
          w = (_ = this.read(a)).indexOf(0), d = String.fromCharCode.apply(String, _.slice(0, w)), this.text[d] = String.fromCharCode.apply(String, _.slice(w + 1));
          break;
        case "IEND":
          return p && this.animation.frames.push(p), this.colors = (function() {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;
              case 2:
              case 6:
                return 3;
            }
          }).call(this), this.hasAlphaChannel = (H = this.colorType) === 4 || H === 6, l = this.colors + (this.hasAlphaChannel ? 1 : 0), this.pixelBitlength = this.bits * l, this.colorSpace = (function() {
            switch (this.colors) {
              case 1:
                return "DeviceGray";
              case 3:
                return "DeviceRGB";
            }
          }).call(this), void (this.imgData = new Uint8Array(this.imgData));
        default:
          this.pos += a;
      }
      if (this.pos += 4, this.pos > this.data.length) throw new Error("Incomplete or corrupt PNG file");
    }
  }
  r.prototype.read = function(i) {
    var a, l;
    for (l = [], a = 0; 0 <= i ? a < i : a > i; 0 <= i ? ++a : --a) l.push(this.data[this.pos++]);
    return l;
  }, r.prototype.readUInt32 = function() {
    return this.data[this.pos++] << 24 | this.data[this.pos++] << 16 | this.data[this.pos++] << 8 | this.data[this.pos++];
  }, r.prototype.readUInt16 = function() {
    return this.data[this.pos++] << 8 | this.data[this.pos++];
  }, r.prototype.decodePixels = function(i) {
    var a = this.pixelBitlength / 8, l = new Uint8Array(this.width * this.height * a), s = 0, f = this;
    if (i == null && (i = this.imgData), i.length === 0) return new Uint8Array(0);
    function g(p, w, d, C) {
      var b, _, m, y, H, O, P, q, W, D, R, Y, x, I, j, K, nA, iA, cA, oA, dA, pA = Math.ceil((f.width - p) / d), LA = Math.ceil((f.height - w) / C), E = f.width == pA && f.height == LA;
      for (I = a * pA, Y = E ? l : new Uint8Array(I * LA), O = i.length, x = 0, _ = 0; x < LA && s < O; ) {
        switch (i[s++]) {
          case 0:
            for (y = nA = 0; nA < I; y = nA += 1) Y[_++] = i[s++];
            break;
          case 1:
            for (y = iA = 0; iA < I; y = iA += 1) b = i[s++], H = y < a ? 0 : Y[_ - a], Y[_++] = (b + H) % 256;
            break;
          case 2:
            for (y = cA = 0; cA < I; y = cA += 1) b = i[s++], m = (y - y % a) / a, j = x && Y[(x - 1) * I + m * a + y % a], Y[_++] = (j + b) % 256;
            break;
          case 3:
            for (y = oA = 0; oA < I; y = oA += 1) b = i[s++], m = (y - y % a) / a, H = y < a ? 0 : Y[_ - a], j = x && Y[(x - 1) * I + m * a + y % a], Y[_++] = (b + Math.floor((H + j) / 2)) % 256;
            break;
          case 4:
            for (y = dA = 0; dA < I; y = dA += 1) b = i[s++], m = (y - y % a) / a, H = y < a ? 0 : Y[_ - a], x === 0 ? j = K = 0 : (j = Y[(x - 1) * I + m * a + y % a], K = m && Y[(x - 1) * I + (m - 1) * a + y % a]), P = H + j - K, q = Math.abs(P - H), D = Math.abs(P - j), R = Math.abs(P - K), W = q <= D && q <= R ? H : D <= R ? j : K, Y[_++] = (b + W) % 256;
            break;
          default:
            throw new Error("Invalid filter algorithm: " + i[s - 1]);
        }
        if (!E) {
          var M = ((w + x * C) * f.width + p) * a, z = x * I;
          for (y = 0; y < pA; y += 1) {
            for (var X = 0; X < a; X += 1) l[M++] = Y[z++];
            M += (d - 1) * a;
          }
        }
        x++;
      }
    }
    return i = zB(i), f.interlaceMethod == 1 ? (g(0, 0, 8, 8), g(4, 0, 8, 8), g(0, 4, 4, 8), g(2, 0, 4, 4), g(0, 2, 2, 4), g(1, 0, 2, 2), g(0, 1, 1, 2)) : g(0, 0, 1, 1), l;
  }, r.prototype.decodePalette = function() {
    var i, a, l, s, f, g, p, w, d;
    for (l = this.palette, g = this.transparency.indexed || [], f = new Uint8Array((g.length || 0) + l.length), s = 0, i = 0, a = p = 0, w = l.length; p < w; a = p += 3) f[s++] = l[a], f[s++] = l[a + 1], f[s++] = l[a + 2], f[s++] = (d = g[i++]) != null ? d : 255;
    return f;
  }, r.prototype.copyToImageData = function(i, a) {
    var l, s, f, g, p, w, d, C, b, _, m;
    if (s = this.colors, b = null, l = this.hasAlphaChannel, this.palette.length && (b = (m = this._decodedPalette) != null ? m : this._decodedPalette = this.decodePalette(), s = 4, l = !0), C = (f = i.data || i).length, p = b || a, g = w = 0, s === 1) for (; g < C; ) d = b ? 4 * a[g / 4] : w, _ = p[d++], f[g++] = _, f[g++] = _, f[g++] = _, f[g++] = l ? p[d++] : 255, w = d;
    else for (; g < C; ) d = b ? 4 * a[g / 4] : w, f[g++] = p[d++], f[g++] = p[d++], f[g++] = p[d++], f[g++] = l ? p[d++] : 255, w = d;
  }, r.prototype.decode = function() {
    var i;
    return i = new Uint8Array(this.width * this.height * 4), this.copyToImageData(i, this.decodePixels()), i;
  };
  var n = function() {
    if (Object.prototype.toString.call(XA) === "[object Window]") {
      try {
        A = XA.document.createElement("canvas"), t = A.getContext("2d");
      } catch {
        return !1;
      }
      return !0;
    }
    return !1;
  };
  return n(), e = function(i) {
    var a;
    if (n() === !0) return t.width = i.width, t.height = i.height, t.clearRect(0, 0, i.width, i.height), t.putImageData(i, 0, 0), (a = new Image()).src = A.toDataURL(), a;
    throw new Error("This method requires a Browser with Canvas-capability.");
  }, r.prototype.decodeFrames = function(i) {
    var a, l, s, f, g, p, w, d;
    if (this.animation) {
      for (d = [], l = g = 0, p = (w = this.animation.frames).length; g < p; l = ++g) a = w[l], s = i.createImageData(a.width, a.height), f = this.decodePixels(new Uint8Array(a.data)), this.copyToImageData(s, f), a.imageData = s, d.push(a.image = e(s));
      return d;
    }
  }, r.prototype.renderFrame = function(i, a) {
    var l, s, f;
    return l = (s = this.animation.frames)[a], f = s[a - 1], a === 0 && i.clearRect(0, 0, this.width, this.height), (f != null ? f.disposeOp : void 0) === 1 ? i.clearRect(f.xOffset, f.yOffset, f.width, f.height) : (f != null ? f.disposeOp : void 0) === 2 && i.putImageData(f.imageData, f.xOffset, f.yOffset), l.blendOp === 0 && i.clearRect(l.xOffset, l.yOffset, l.width, l.height), i.drawImage(l.image, l.xOffset, l.yOffset);
  }, r.prototype.animate = function(i) {
    var a, l, s, f, g, p, w = this;
    return l = 0, p = this.animation, f = p.numFrames, s = p.frames, g = p.numPlays, (a = function() {
      var d, C;
      if (d = l++ % f, C = s[d], w.renderFrame(i, d), f > 1 && l / f < g) return w.animation._timeout = setTimeout(a, C.delay);
    })();
  }, r.prototype.stopAnimation = function() {
    var i;
    return clearTimeout((i = this.animation) != null ? i._timeout : void 0);
  }, r.prototype.render = function(i) {
    var a, l;
    return i._png && i._png.stopAnimation(), i._png = this, i.width = this.width, i.height = this.height, a = i.getContext("2d"), this.animation ? (this.decodeFrames(a), this.animate(a)) : (l = a.createImageData(this.width, this.height), this.copyToImageData(l, this.decodePixels()), a.putImageData(l, 0, 0));
  }, r;
}();
/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
/**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */
function gw(e) {
  var A = 0;
  if (e[A++] !== 71 || e[A++] !== 73 || e[A++] !== 70 || e[A++] !== 56 || (e[A++] + 1 & 253) != 56 || e[A++] !== 97) throw new Error("Invalid GIF 87a/89a header.");
  var t = e[A++] | e[A++] << 8, r = e[A++] | e[A++] << 8, n = e[A++], i = n >> 7, a = 1 << (7 & n) + 1;
  e[A++], e[A++];
  var l = null, s = null;
  i && (l = A, s = a, A += 3 * a);
  var f = !0, g = [], p = 0, w = null, d = 0, C = null;
  for (this.width = t, this.height = r; f && A < e.length; ) switch (e[A++]) {
    case 33:
      switch (e[A++]) {
        case 255:
          if (e[A] !== 11 || e[A + 1] == 78 && e[A + 2] == 69 && e[A + 3] == 84 && e[A + 4] == 83 && e[A + 5] == 67 && e[A + 6] == 65 && e[A + 7] == 80 && e[A + 8] == 69 && e[A + 9] == 50 && e[A + 10] == 46 && e[A + 11] == 48 && e[A + 12] == 3 && e[A + 13] == 1 && e[A + 16] == 0) A += 14, C = e[A++] | e[A++] << 8, A++;
          else for (A += 12; ; ) {
            if (!((x = e[A++]) >= 0)) throw Error("Invalid block size");
            if (x === 0) break;
            A += x;
          }
          break;
        case 249:
          if (e[A++] !== 4 || e[A + 4] !== 0) throw new Error("Invalid graphics extension block.");
          var b = e[A++];
          p = e[A++] | e[A++] << 8, w = e[A++], !(1 & b) && (w = null), d = b >> 2 & 7, A++;
          break;
        case 254:
          for (; ; ) {
            if (!((x = e[A++]) >= 0)) throw Error("Invalid block size");
            if (x === 0) break;
            A += x;
          }
          break;
        default:
          throw new Error("Unknown graphic control label: 0x" + e[A - 1].toString(16));
      }
      break;
    case 44:
      var _ = e[A++] | e[A++] << 8, m = e[A++] | e[A++] << 8, y = e[A++] | e[A++] << 8, H = e[A++] | e[A++] << 8, O = e[A++], P = O >> 6 & 1, q = 1 << (7 & O) + 1, W = l, D = s, R = !1;
      O >> 7 && (R = !0, W = A, D = q, A += 3 * q);
      var Y = A;
      for (A++; ; ) {
        var x;
        if (!((x = e[A++]) >= 0)) throw Error("Invalid block size");
        if (x === 0) break;
        A += x;
      }
      g.push({ x: _, y: m, width: y, height: H, has_local_palette: R, palette_offset: W, palette_size: D, data_offset: Y, data_length: A - Y, transparent_index: w, interlaced: !!P, delay: p, disposal: d });
      break;
    case 59:
      f = !1;
      break;
    default:
      throw new Error("Unknown gif block: 0x" + e[A - 1].toString(16));
  }
  this.numFrames = function() {
    return g.length;
  }, this.loopCount = function() {
    return C;
  }, this.frameInfo = function(I) {
    if (I < 0 || I >= g.length) throw new Error("Frame index out of range.");
    return g[I];
  }, this.decodeAndBlitFrameBGRA = function(I, j) {
    var K = this.frameInfo(I), nA = K.width * K.height, iA = new Uint8Array(nA);
    w0(e, K.data_offset, iA, nA);
    var cA = K.palette_offset, oA = K.transparent_index;
    oA === null && (oA = 256);
    var dA = K.width, pA = t - dA, LA = dA, E = 4 * (K.y * t + K.x), M = 4 * ((K.y + K.height) * t + K.x), z = E, X = 4 * pA;
    K.interlaced === !0 && (X += 4 * t * 7);
    for (var eA = 8, sA = 0, fA = iA.length; sA < fA; ++sA) {
      var hA = iA[sA];
      if (LA === 0 && (LA = dA, (z += X) >= M && (X = 4 * pA + 4 * t * (eA - 1), z = E + (dA + pA) * (eA << 1), eA >>= 1)), hA === oA) z += 4;
      else {
        var EA = e[cA + 3 * hA], QA = e[cA + 3 * hA + 1], OA = e[cA + 3 * hA + 2];
        j[z++] = OA, j[z++] = QA, j[z++] = EA, j[z++] = 255;
      }
      --LA;
    }
  }, this.decodeAndBlitFrameRGBA = function(I, j) {
    var K = this.frameInfo(I), nA = K.width * K.height, iA = new Uint8Array(nA);
    w0(e, K.data_offset, iA, nA);
    var cA = K.palette_offset, oA = K.transparent_index;
    oA === null && (oA = 256);
    var dA = K.width, pA = t - dA, LA = dA, E = 4 * (K.y * t + K.x), M = 4 * ((K.y + K.height) * t + K.x), z = E, X = 4 * pA;
    K.interlaced === !0 && (X += 4 * t * 7);
    for (var eA = 8, sA = 0, fA = iA.length; sA < fA; ++sA) {
      var hA = iA[sA];
      if (LA === 0 && (LA = dA, (z += X) >= M && (X = 4 * pA + 4 * t * (eA - 1), z = E + (dA + pA) * (eA << 1), eA >>= 1)), hA === oA) z += 4;
      else {
        var EA = e[cA + 3 * hA], QA = e[cA + 3 * hA + 1], OA = e[cA + 3 * hA + 2];
        j[z++] = EA, j[z++] = QA, j[z++] = OA, j[z++] = 255;
      }
      --LA;
    }
  };
}
function w0(e, A, t, r) {
  for (var n = e[A++], i = 1 << n, a = i + 1, l = a + 1, s = n + 1, f = (1 << s) - 1, g = 0, p = 0, w = 0, d = e[A++], C = new Int32Array(4096), b = null; ; ) {
    for (; g < 16 && d !== 0; ) p |= e[A++] << g, g += 8, d === 1 ? d = e[A++] : --d;
    if (g < s) break;
    var _ = p & f;
    if (p >>= s, g -= s, _ !== i) {
      if (_ === a) break;
      for (var m = _ < l ? _ : b, y = 0, H = m; H > i; ) H = C[H] >> 8, ++y;
      var O = H;
      if (w + y + (m !== _ ? 1 : 0) > r) return void Se.log("Warning, gif stream longer than expected.");
      t[w++] = O;
      var P = w += y;
      for (m !== _ && (t[w++] = O), H = m; y--; ) H = C[H], t[--P] = 255 & H, H >>= 8;
      b !== null && l < 4096 && (C[l++] = b << 8 | O, l >= f + 1 && s < 12 && (++s, f = f << 1 | 1)), b = _;
    } else l = a + 1, f = (1 << (s = n + 1)) - 1, b = null;
  }
  return w !== r && Se.log("Warning, gif stream shorter than expected."), t;
}
/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function fc(e) {
  var A, t, r, n, i, a = Math.floor, l = new Array(64), s = new Array(64), f = new Array(64), g = new Array(64), p = new Array(65535), w = new Array(65535), d = new Array(64), C = new Array(64), b = [], _ = 0, m = 7, y = new Array(64), H = new Array(64), O = new Array(64), P = new Array(256), q = new Array(2048), W = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], D = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], R = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], Y = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], x = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], I = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], j = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], K = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], nA = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
  function iA(E, M) {
    for (var z = 0, X = 0, eA = new Array(), sA = 1; sA <= 16; sA++) {
      for (var fA = 1; fA <= E[sA]; fA++) eA[M[X]] = [], eA[M[X]][0] = z, eA[M[X]][1] = sA, X++, z++;
      z *= 2;
    }
    return eA;
  }
  function cA(E) {
    for (var M = E[0], z = E[1] - 1; z >= 0; ) M & 1 << z && (_ |= 1 << m), z--, --m < 0 && (_ == 255 ? (oA(255), oA(0)) : oA(_), m = 7, _ = 0);
  }
  function oA(E) {
    b.push(E);
  }
  function dA(E) {
    oA(E >> 8 & 255), oA(255 & E);
  }
  function pA(E, M, z, X, eA) {
    for (var sA, fA = eA[0], hA = eA[240], EA = function(yA, $) {
      var UA, SA, KA, $A, ne, ie, fe, Qe, JA, ae, TA = 0;
      for (JA = 0; JA < 8; ++JA) {
        UA = yA[TA], SA = yA[TA + 1], KA = yA[TA + 2], $A = yA[TA + 3], ne = yA[TA + 4], ie = yA[TA + 5], fe = yA[TA + 6];
        var vt = UA + (Qe = yA[TA + 7]), ge = UA - Qe, pr = SA + fe, xe = SA - fe, De = KA + ie, Hr = KA - ie, we = $A + ne, Jn = $A - ne, Pe = vt + we, Br = vt - we, An = pr + De, Me = pr - De;
        yA[TA] = Pe + An, yA[TA + 4] = Pe - An;
        var ZA = 0.707106781 * (Me + Br);
        yA[TA + 2] = Br + ZA, yA[TA + 6] = Br - ZA;
        var ve = 0.382683433 * ((Pe = Jn + Hr) - (Me = xe + ge)), Yn = 0.5411961 * Pe + ve, dt = 1.306562965 * Me + ve, Or = 0.707106781 * (An = Hr + xe), Dr = ge + Or, qA = ge - Or;
        yA[TA + 5] = qA + Yn, yA[TA + 3] = qA - Yn, yA[TA + 1] = Dr + dt, yA[TA + 7] = Dr - dt, TA += 8;
      }
      for (TA = 0, JA = 0; JA < 8; ++JA) {
        UA = yA[TA], SA = yA[TA + 8], KA = yA[TA + 16], $A = yA[TA + 24], ne = yA[TA + 32], ie = yA[TA + 40], fe = yA[TA + 48];
        var wr = UA + (Qe = yA[TA + 56]), Tr = UA - Qe, Ot = SA + fe, at = SA - fe, Ze = KA + ie, Gt = KA - ie, Fi = $A + ne, en = $A - ne, vr = wr + Fi, mr = wr - Fi, yr = Ot + Ze, kr = Ot - Ze;
        yA[TA] = vr + yr, yA[TA + 32] = vr - yr;
        var Ar = 0.707106781 * (kr + mr);
        yA[TA + 16] = mr + Ar, yA[TA + 48] = mr - Ar;
        var Pr = 0.382683433 * ((vr = en + Gt) - (kr = at + Tr)), Zn = 0.5411961 * vr + Pr, Qi = 1.306562965 * kr + Pr, Ui = 0.707106781 * (yr = Gt + at), Ei = Tr + Ui, xi = Tr - Ui;
        yA[TA + 40] = xi + Zn, yA[TA + 24] = xi - Zn, yA[TA + 8] = Ei + Qi, yA[TA + 56] = Ei - Qi, TA++;
      }
      for (JA = 0; JA < 64; ++JA) ae = yA[JA] * $[JA], d[JA] = ae > 0 ? ae + 0.5 | 0 : ae - 0.5 | 0;
      return d;
    }(E, M), QA = 0; QA < 64; ++QA) C[W[QA]] = EA[QA];
    var OA = C[0] - z;
    z = C[0], OA == 0 ? cA(X[0]) : (cA(X[w[sA = 32767 + OA]]), cA(p[sA]));
    for (var HA = 63; HA > 0 && C[HA] == 0; ) HA--;
    if (HA == 0) return cA(fA), z;
    for (var zA, V = 1; V <= HA; ) {
      for (var B = V; C[V] == 0 && V <= HA; ) ++V;
      var CA = V - B;
      if (CA >= 16) {
        zA = CA >> 4;
        for (var xA = 1; xA <= zA; ++xA) cA(hA);
        CA &= 15;
      }
      sA = 32767 + C[V], cA(eA[(CA << 4) + w[sA]]), cA(p[sA]), V++;
    }
    return HA != 63 && cA(fA), z;
  }
  function LA(E) {
    E = Math.min(Math.max(E, 1), 100), i != E && (function(M) {
      for (var z = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], X = 0; X < 64; X++) {
        var eA = a((z[X] * M + 50) / 100);
        eA = Math.min(Math.max(eA, 1), 255), l[W[X]] = eA;
      }
      for (var sA = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], fA = 0; fA < 64; fA++) {
        var hA = a((sA[fA] * M + 50) / 100);
        hA = Math.min(Math.max(hA, 1), 255), s[W[fA]] = hA;
      }
      for (var EA = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379], QA = 0, OA = 0; OA < 8; OA++) for (var HA = 0; HA < 8; HA++) f[QA] = 1 / (l[W[QA]] * EA[OA] * EA[HA] * 8), g[QA] = 1 / (s[W[QA]] * EA[OA] * EA[HA] * 8), QA++;
    }(E < 50 ? Math.floor(5e3 / E) : Math.floor(200 - 2 * E)), i = E);
  }
  this.encode = function(E, M) {
    M && LA(M), b = new Array(), _ = 0, m = 7, dA(65496), dA(65504), dA(16), oA(74), oA(70), oA(73), oA(70), oA(0), oA(1), oA(1), oA(0), dA(1), dA(1), oA(0), oA(0), function() {
      dA(65499), dA(132), oA(0);
      for (var SA = 0; SA < 64; SA++) oA(l[SA]);
      oA(1);
      for (var KA = 0; KA < 64; KA++) oA(s[KA]);
    }(), function(SA, KA) {
      dA(65472), dA(17), oA(8), dA(KA), dA(SA), oA(3), oA(1), oA(17), oA(0), oA(2), oA(17), oA(1), oA(3), oA(17), oA(1);
    }(E.width, E.height), function() {
      dA(65476), dA(418), oA(0);
      for (var SA = 0; SA < 16; SA++) oA(D[SA + 1]);
      for (var KA = 0; KA <= 11; KA++) oA(R[KA]);
      oA(16);
      for (var $A = 0; $A < 16; $A++) oA(Y[$A + 1]);
      for (var ne = 0; ne <= 161; ne++) oA(x[ne]);
      oA(1);
      for (var ie = 0; ie < 16; ie++) oA(I[ie + 1]);
      for (var fe = 0; fe <= 11; fe++) oA(j[fe]);
      oA(17);
      for (var Qe = 0; Qe < 16; Qe++) oA(K[Qe + 1]);
      for (var JA = 0; JA <= 161; JA++) oA(nA[JA]);
    }(), dA(65498), dA(12), oA(3), oA(1), oA(0), oA(2), oA(17), oA(3), oA(17), oA(0), oA(63), oA(0);
    var z = 0, X = 0, eA = 0;
    _ = 0, m = 7, this.encode.displayName = "_encode_";
    for (var sA, fA, hA, EA, QA, OA, HA, zA, V, B = E.data, CA = E.width, xA = E.height, yA = 4 * CA, $ = 0; $ < xA; ) {
      for (sA = 0; sA < yA; ) {
        for (QA = yA * $ + sA, HA = -1, zA = 0, V = 0; V < 64; V++) OA = QA + (zA = V >> 3) * yA + (HA = 4 * (7 & V)), $ + zA >= xA && (OA -= yA * ($ + 1 + zA - xA)), sA + HA >= yA && (OA -= sA + HA - yA + 4), fA = B[OA++], hA = B[OA++], EA = B[OA++], y[V] = (q[fA] + q[hA + 256 >> 0] + q[EA + 512 >> 0] >> 16) - 128, H[V] = (q[fA + 768 >> 0] + q[hA + 1024 >> 0] + q[EA + 1280 >> 0] >> 16) - 128, O[V] = (q[fA + 1280 >> 0] + q[hA + 1536 >> 0] + q[EA + 1792 >> 0] >> 16) - 128;
        z = pA(y, f, z, A, r), X = pA(H, g, X, t, n), eA = pA(O, g, eA, t, n), sA += 32;
      }
      $ += 8;
    }
    if (m >= 0) {
      var UA = [];
      UA[1] = m + 1, UA[0] = (1 << m + 1) - 1, cA(UA);
    }
    return dA(65497), new Uint8Array(b);
  }, e = e || 50, function() {
    for (var E = String.fromCharCode, M = 0; M < 256; M++) P[M] = E(M);
  }(), A = iA(D, R), t = iA(I, j), r = iA(Y, x), n = iA(K, nA), function() {
    for (var E = 1, M = 2, z = 1; z <= 15; z++) {
      for (var X = E; X < M; X++) w[32767 + X] = z, p[32767 + X] = [], p[32767 + X][1] = z, p[32767 + X][0] = X;
      for (var eA = -(M - 1); eA <= -E; eA++) w[32767 + eA] = z, p[32767 + eA] = [], p[32767 + eA][1] = z, p[32767 + eA][0] = M - 1 + eA;
      E <<= 1, M <<= 1;
    }
  }(), function() {
    for (var E = 0; E < 256; E++) q[E] = 19595 * E, q[E + 256 >> 0] = 38470 * E, q[E + 512 >> 0] = 7471 * E + 32768, q[E + 768 >> 0] = -11059 * E, q[E + 1024 >> 0] = -21709 * E, q[E + 1280 >> 0] = 32768 * E + 8421375, q[E + 1536 >> 0] = -27439 * E, q[E + 1792 >> 0] = -5329 * E;
  }(), LA(e);
}
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function xr(e, A) {
  if (this.pos = 0, this.buffer = e, this.datav = new DataView(e.buffer), this.is_with_alpha = !!A, this.bottom_up = !0, this.flag = String.fromCharCode(this.buffer[0]) + String.fromCharCode(this.buffer[1]), this.pos += 2, ["BM", "BA", "CI", "CP", "IC", "PT"].indexOf(this.flag) === -1) throw new Error("Invalid BMP File");
  this.parseHeader(), this.parseBGR();
}
function v0(e) {
  function A(D) {
    if (!D) throw Error("assert :P");
  }
  function t(D, R, Y) {
    for (var x = 0; 4 > x; x++) if (D[R + x] != Y.charCodeAt(x)) return !0;
    return !1;
  }
  function r(D, R, Y, x, I) {
    for (var j = 0; j < I; j++) D[R + j] = Y[x + j];
  }
  function n(D, R, Y, x) {
    for (var I = 0; I < x; I++) D[R + I] = Y;
  }
  function i(D) {
    return new Int32Array(D);
  }
  function a(D, R) {
    for (var Y = [], x = 0; x < D; x++) Y.push(new R());
    return Y;
  }
  function l(D, R) {
    var Y = [];
    return function x(I, j, K) {
      for (var nA = K[j], iA = 0; iA < nA && (I.push(K.length > j + 1 ? [] : new R()), !(K.length < j + 1)); iA++) x(I[iA], j + 1, K);
    }(Y, 0, D), Y;
  }
  var s = function() {
    var D = this;
    function R(o, u) {
      for (var h = 1 << u - 1 >>> 0; o & h; ) h >>>= 1;
      return h ? (o & h - 1) + h : o;
    }
    function Y(o, u, h, v, F) {
      A(!(v % h));
      do
        o[u + (v -= h)] = F;
      while (0 < v);
    }
    function x(o, u, h, v, F) {
      if (A(2328 >= F), 512 >= F) var U = i(512);
      else if ((U = i(F)) == null) return 0;
      return function(L, S, N, k, Z, lA) {
        var uA, rA, mA = S, gA = 1 << N, AA = i(16), tA = i(16);
        for (A(Z != 0), A(k != null), A(L != null), A(0 < N), rA = 0; rA < Z; ++rA) {
          if (15 < k[rA]) return 0;
          ++AA[k[rA]];
        }
        if (AA[0] == Z) return 0;
        for (tA[1] = 0, uA = 1; 15 > uA; ++uA) {
          if (AA[uA] > 1 << uA) return 0;
          tA[uA + 1] = tA[uA] + AA[uA];
        }
        for (rA = 0; rA < Z; ++rA) uA = k[rA], 0 < k[rA] && (lA[tA[uA]++] = rA);
        if (tA[15] == 1) return (k = new I()).g = 0, k.value = lA[0], Y(L, mA, 1, gA, k), gA;
        var wA, bA = -1, vA = gA - 1, MA = 0, NA = 1, VA = 1, DA = 1 << N;
        for (rA = 0, uA = 1, Z = 2; uA <= N; ++uA, Z <<= 1) {
          if (NA += VA <<= 1, 0 > (VA -= AA[uA])) return 0;
          for (; 0 < AA[uA]; --AA[uA]) (k = new I()).g = uA, k.value = lA[rA++], Y(L, mA + MA, Z, DA, k), MA = R(MA, uA);
        }
        for (uA = N + 1, Z = 2; 15 >= uA; ++uA, Z <<= 1) {
          if (NA += VA <<= 1, 0 > (VA -= AA[uA])) return 0;
          for (; 0 < AA[uA]; --AA[uA]) {
            if (k = new I(), (MA & vA) != bA) {
              for (mA += DA, wA = 1 << (bA = uA) - N; 15 > bA && !(0 >= (wA -= AA[bA])); ) ++bA, wA <<= 1;
              gA += DA = 1 << (wA = bA - N), L[S + (bA = MA & vA)].g = wA + N, L[S + bA].value = mA - S - bA;
            }
            k.g = uA - N, k.value = lA[rA++], Y(L, mA + (MA >> N), Z, DA, k), MA = R(MA, uA);
          }
        }
        return NA != 2 * tA[15] - 1 ? 0 : gA;
      }(o, u, h, v, F, U);
    }
    function I() {
      this.value = this.g = 0;
    }
    function j() {
      this.value = this.g = 0;
    }
    function K() {
      this.G = a(5, I), this.H = i(5), this.jc = this.Qb = this.qb = this.nd = 0, this.pd = a(gt, j);
    }
    function nA(o, u, h, v) {
      A(o != null), A(u != null), A(2147483648 > v), o.Ca = 254, o.I = 0, o.b = -8, o.Ka = 0, o.oa = u, o.pa = h, o.Jd = u, o.Yc = h + v, o.Zc = 4 <= v ? h + v - 4 + 1 : h, sA(o);
    }
    function iA(o, u) {
      for (var h = 0; 0 < u--; ) h |= hA(o, 128) << u;
      return h;
    }
    function cA(o, u) {
      var h = iA(o, u);
      return fA(o) ? -h : h;
    }
    function oA(o, u, h, v) {
      var F, U = 0;
      for (A(o != null), A(u != null), A(4294967288 > v), o.Sb = v, o.Ra = 0, o.u = 0, o.h = 0, 4 < v && (v = 4), F = 0; F < v; ++F) U += u[h + F] << 8 * F;
      o.Ra = U, o.bb = v, o.oa = u, o.pa = h;
    }
    function dA(o) {
      for (; 8 <= o.u && o.bb < o.Sb; ) o.Ra >>>= 8, o.Ra += o.oa[o.pa + o.bb] << ji - 8 >>> 0, ++o.bb, o.u -= 8;
      z(o) && (o.h = 1, o.u = 0);
    }
    function pA(o, u) {
      if (A(0 <= u), !o.h && u <= Ki) {
        var h = M(o) & Ri[u];
        return o.u += u, dA(o), h;
      }
      return o.h = 1, o.u = 0;
    }
    function LA() {
      this.b = this.Ca = this.I = 0, this.oa = [], this.pa = 0, this.Jd = [], this.Yc = 0, this.Zc = [], this.Ka = 0;
    }
    function E() {
      this.Ra = 0, this.oa = [], this.h = this.u = this.bb = this.Sb = this.pa = 0;
    }
    function M(o) {
      return o.Ra >>> (o.u & ji - 1) >>> 0;
    }
    function z(o) {
      return A(o.bb <= o.Sb), o.h || o.bb == o.Sb && o.u > ji;
    }
    function X(o, u) {
      o.u = u, o.h = z(o);
    }
    function eA(o) {
      o.u >= Za && (A(o.u >= Za), dA(o));
    }
    function sA(o) {
      A(o != null && o.oa != null), o.pa < o.Zc ? (o.I = (o.oa[o.pa++] | o.I << 8) >>> 0, o.b += 8) : (A(o != null && o.oa != null), o.pa < o.Yc ? (o.b += 8, o.I = o.oa[o.pa++] | o.I << 8) : o.Ka ? o.b = 0 : (o.I <<= 8, o.b += 8, o.Ka = 1));
    }
    function fA(o) {
      return iA(o, 1);
    }
    function hA(o, u) {
      var h = o.Ca;
      0 > o.b && sA(o);
      var v = o.b, F = h * u >>> 8, U = (o.I >>> v > F) + 0;
      for (U ? (h -= F, o.I -= F + 1 << v >>> 0) : h = F + 1, v = h, F = 0; 256 <= v; ) F += 8, v >>= 8;
      return v = 7 ^ F + Tt[v], o.b -= v, o.Ca = (h << v) - 1, U;
    }
    function EA(o, u, h) {
      o[u + 0] = h >> 24 & 255, o[u + 1] = h >> 16 & 255, o[u + 2] = h >> 8 & 255, o[u + 3] = h >> 0 & 255;
    }
    function QA(o, u) {
      return o[u + 0] << 0 | o[u + 1] << 8;
    }
    function OA(o, u) {
      return QA(o, u) | o[u + 2] << 16;
    }
    function HA(o, u) {
      return QA(o, u) | QA(o, u + 2) << 16;
    }
    function zA(o, u) {
      var h = 1 << u;
      return A(o != null), A(0 < u), o.X = i(h), o.X == null ? 0 : (o.Mb = 32 - u, o.Xa = u, 1);
    }
    function V(o, u) {
      A(o != null), A(u != null), A(o.Xa == u.Xa), r(u.X, 0, o.X, 0, 1 << u.Xa);
    }
    function B() {
      this.X = [], this.Xa = this.Mb = 0;
    }
    function CA(o, u, h, v) {
      A(h != null), A(v != null);
      var F = h[0], U = v[0];
      return F == 0 && (F = (o * U + u / 2) / u), U == 0 && (U = (u * F + o / 2) / o), 0 >= F || 0 >= U ? 0 : (h[0] = F, v[0] = U, 1);
    }
    function xA(o, u) {
      return o + (1 << u) - 1 >>> u;
    }
    function yA(o, u) {
      return ((4278255360 & o) + (4278255360 & u) >>> 0 & 4278255360) + ((16711935 & o) + (16711935 & u) >>> 0 & 16711935) >>> 0;
    }
    function $(o, u) {
      D[u] = function(h, v, F, U, L, S, N) {
        var k;
        for (k = 0; k < L; ++k) {
          var Z = D[o](S[N + k - 1], F, U + k);
          S[N + k] = yA(h[v + k], Z);
        }
      };
    }
    function UA() {
      this.ud = this.hd = this.jd = 0;
    }
    function SA(o, u) {
      return ((4278124286 & (o ^ u)) >>> 1) + (o & u) >>> 0;
    }
    function KA(o) {
      return 0 <= o && 256 > o ? o : 0 > o ? 0 : 255 < o ? 255 : void 0;
    }
    function $A(o, u) {
      return KA(o + (o - u + 0.5 >> 1));
    }
    function ne(o, u, h) {
      return Math.abs(u - h) - Math.abs(o - h);
    }
    function ie(o, u, h, v, F, U, L) {
      for (v = U[L - 1], h = 0; h < F; ++h) U[L + h] = v = yA(o[u + h], v);
    }
    function fe(o, u, h, v, F) {
      var U;
      for (U = 0; U < h; ++U) {
        var L = o[u + U], S = L >> 8 & 255, N = 16711935 & (N = (N = 16711935 & L) + ((S << 16) + S));
        v[F + U] = (4278255360 & L) + N >>> 0;
      }
    }
    function Qe(o, u) {
      u.jd = o >> 0 & 255, u.hd = o >> 8 & 255, u.ud = o >> 16 & 255;
    }
    function JA(o, u, h, v, F, U) {
      var L;
      for (L = 0; L < v; ++L) {
        var S = u[h + L], N = S >>> 8, k = S, Z = 255 & (Z = (Z = S >>> 16) + ((o.jd << 24 >> 24) * (N << 24 >> 24) >>> 5));
        k = 255 & (k = (k = k + ((o.hd << 24 >> 24) * (N << 24 >> 24) >>> 5)) + ((o.ud << 24 >> 24) * (Z << 24 >> 24) >>> 5)), F[U + L] = (4278255360 & S) + (Z << 16) + k;
      }
    }
    function ae(o, u, h, v, F) {
      D[u] = function(U, L, S, N, k, Z, lA, uA, rA) {
        for (N = lA; N < uA; ++N) for (lA = 0; lA < rA; ++lA) k[Z++] = F(S[v(U[L++])]);
      }, D[o] = function(U, L, S, N, k, Z, lA) {
        var uA = 8 >> U.b, rA = U.Ea, mA = U.K[0], gA = U.w;
        if (8 > uA) for (U = (1 << U.b) - 1, gA = (1 << uA) - 1; L < S; ++L) {
          var AA, tA = 0;
          for (AA = 0; AA < rA; ++AA) AA & U || (tA = v(N[k++])), Z[lA++] = F(mA[tA & gA]), tA >>= uA;
        }
        else D["VP8LMapColor" + h](N, k, mA, gA, Z, lA, L, S, rA);
      };
    }
    function TA(o, u, h, v, F) {
      for (h = u + h; u < h; ) {
        var U = o[u++];
        v[F++] = U >> 16 & 255, v[F++] = U >> 8 & 255, v[F++] = U >> 0 & 255;
      }
    }
    function vt(o, u, h, v, F) {
      for (h = u + h; u < h; ) {
        var U = o[u++];
        v[F++] = U >> 16 & 255, v[F++] = U >> 8 & 255, v[F++] = U >> 0 & 255, v[F++] = U >> 24 & 255;
      }
    }
    function ge(o, u, h, v, F) {
      for (h = u + h; u < h; ) {
        var U = (L = o[u++]) >> 16 & 240 | L >> 12 & 15, L = L >> 0 & 240 | L >> 28 & 15;
        v[F++] = U, v[F++] = L;
      }
    }
    function pr(o, u, h, v, F) {
      for (h = u + h; u < h; ) {
        var U = (L = o[u++]) >> 16 & 248 | L >> 13 & 7, L = L >> 5 & 224 | L >> 3 & 31;
        v[F++] = U, v[F++] = L;
      }
    }
    function xe(o, u, h, v, F) {
      for (h = u + h; u < h; ) {
        var U = o[u++];
        v[F++] = U >> 0 & 255, v[F++] = U >> 8 & 255, v[F++] = U >> 16 & 255;
      }
    }
    function De(o, u, h, v, F, U) {
      if (U == 0) for (h = u + h; u < h; ) EA(v, ((U = o[u++])[0] >> 24 | U[1] >> 8 & 65280 | U[2] << 8 & 16711680 | U[3] << 24) >>> 0), F += 32;
      else r(v, F, o, u, h);
    }
    function Hr(o, u) {
      D[u][0] = D[o + "0"], D[u][1] = D[o + "1"], D[u][2] = D[o + "2"], D[u][3] = D[o + "3"], D[u][4] = D[o + "4"], D[u][5] = D[o + "5"], D[u][6] = D[o + "6"], D[u][7] = D[o + "7"], D[u][8] = D[o + "8"], D[u][9] = D[o + "9"], D[u][10] = D[o + "10"], D[u][11] = D[o + "11"], D[u][12] = D[o + "12"], D[u][13] = D[o + "13"], D[u][14] = D[o + "0"], D[u][15] = D[o + "0"];
    }
    function we(o) {
      return o == ju || o == Gu || o == Qs || o == Vu;
    }
    function Jn() {
      this.eb = [], this.size = this.A = this.fb = 0;
    }
    function Pe() {
      this.y = [], this.f = [], this.ea = [], this.F = [], this.Tc = this.Ed = this.Cd = this.Fd = this.lb = this.Db = this.Ab = this.fa = this.J = this.W = this.N = this.O = 0;
    }
    function Br() {
      this.Rd = this.height = this.width = this.S = 0, this.f = {}, this.f.RGBA = new Jn(), this.f.kb = new Pe(), this.sd = null;
    }
    function An() {
      this.width = [0], this.height = [0], this.Pd = [0], this.Qd = [0], this.format = [0];
    }
    function Me() {
      this.Id = this.fd = this.Md = this.hb = this.ib = this.da = this.bd = this.cd = this.j = this.v = this.Da = this.Sd = this.ob = 0;
    }
    function ZA(o) {
      return alert("todo:WebPSamplerProcessPlane"), o.T;
    }
    function ve(o, u) {
      var h = o.T, v = u.ba.f.RGBA, F = v.eb, U = v.fb + o.ka * v.A, L = ar[u.ba.S], S = o.y, N = o.O, k = o.f, Z = o.N, lA = o.ea, uA = o.W, rA = u.cc, mA = u.dc, gA = u.Mc, AA = u.Nc, tA = o.ka, wA = o.ka + o.T, bA = o.U, vA = bA + 1 >> 1;
      for (tA == 0 ? L(S, N, null, null, k, Z, lA, uA, k, Z, lA, uA, F, U, null, null, bA) : (L(u.ec, u.fc, S, N, rA, mA, gA, AA, k, Z, lA, uA, F, U - v.A, F, U, bA), ++h); tA + 2 < wA; tA += 2) rA = k, mA = Z, gA = lA, AA = uA, Z += o.Rc, uA += o.Rc, U += 2 * v.A, L(S, (N += 2 * o.fa) - o.fa, S, N, rA, mA, gA, AA, k, Z, lA, uA, F, U - v.A, F, U, bA);
      return N += o.fa, o.j + wA < o.o ? (r(u.ec, u.fc, S, N, bA), r(u.cc, u.dc, k, Z, vA), r(u.Mc, u.Nc, lA, uA, vA), h--) : 1 & wA || L(S, N, null, null, k, Z, lA, uA, k, Z, lA, uA, F, U + v.A, null, null, bA), h;
    }
    function Yn(o, u, h) {
      var v = o.F, F = [o.J];
      if (v != null) {
        var U = o.U, L = u.ba.S, S = L == Fs || L == Qs;
        u = u.ba.f.RGBA;
        var N = [0], k = o.ka;
        N[0] = o.T, o.Kb && (k == 0 ? --N[0] : (--k, F[0] -= o.width), o.j + o.ka + o.T == o.o && (N[0] = o.o - o.j - k));
        var Z = u.eb;
        k = u.fb + k * u.A, o = _e(v, F[0], o.width, U, N, Z, k + (S ? 0 : 3), u.A), A(h == N), o && we(L) && nr(Z, k, S, U, N, u.A);
      }
      return 0;
    }
    function dt(o) {
      var u = o.ma, h = u.ba.S, v = 11 > h, F = h == bs || h == Cs || h == Fs || h == Ku || h == 12 || we(h);
      if (u.memory = null, u.Ib = null, u.Jb = null, u.Nd = null, !Ja(u.Oa, o, F ? 11 : 12)) return 0;
      if (F && we(h) && FA(), o.da) alert("todo:use_scaling");
      else {
        if (v) {
          if (u.Ib = ZA, o.Kb) {
            if (h = o.U + 1 >> 1, u.memory = i(o.U + 2 * h), u.memory == null) return 0;
            u.ec = u.memory, u.fc = 0, u.cc = u.ec, u.dc = u.fc + o.U, u.Mc = u.cc, u.Nc = u.dc + h, u.Ib = ve, FA();
          }
        } else alert("todo:EmitYUV");
        F && (u.Jb = Yn, v && aA());
      }
      if (v && !Dh) {
        for (o = 0; 256 > o; ++o) mp[o] = 89858 * (o - 128) + Es >> Us, Cp[o] = -22014 * (o - 128) + Es, bp[o] = -45773 * (o - 128), yp[o] = 113618 * (o - 128) + Es >> Us;
        for (o = ao; o < Wu; ++o) u = 76283 * (o - 16) + Es >> Us, Fp[o - ao] = Vt(u, 255), Qp[o - ao] = Vt(u + 8 >> 4, 15);
        Dh = 1;
      }
      return 1;
    }
    function Or(o) {
      var u = o.ma, h = o.U, v = o.T;
      return A(!(1 & o.ka)), 0 >= h || 0 >= v ? 0 : (h = u.Ib(o, u), u.Jb != null && u.Jb(o, u, h), u.Dc += h, 1);
    }
    function Dr(o) {
      o.ma.memory = null;
    }
    function qA(o, u, h, v) {
      return pA(o, 8) != 47 ? 0 : (u[0] = pA(o, 14) + 1, h[0] = pA(o, 14) + 1, v[0] = pA(o, 1), pA(o, 3) != 0 ? 0 : !o.h);
    }
    function wr(o, u) {
      if (4 > o) return o + 1;
      var h = o - 2 >> 1;
      return (2 + (1 & o) << h) + pA(u, h) + 1;
    }
    function Tr(o, u) {
      return 120 < u ? u - 120 : 1 <= (h = ((h = ap[u - 1]) >> 4) * o + (8 - (15 & h))) ? h : 1;
      var h;
    }
    function Ot(o, u, h) {
      var v = M(h), F = o[u += 255 & v].g - 8;
      return 0 < F && (X(h, h.u + 8), v = M(h), u += o[u].value, u += v & (1 << F) - 1), X(h, h.u + o[u].g), o[u].value;
    }
    function at(o, u, h) {
      return h.g += o.g, h.value += o.value << u >>> 0, A(8 >= h.g), o.g;
    }
    function Ze(o, u, h) {
      var v = o.xc;
      return A((u = v == 0 ? 0 : o.vc[o.md * (h >> v) + (u >> v)]) < o.Wb), o.Ya[u];
    }
    function Gt(o, u, h, v) {
      var F = o.ab, U = o.c * u, L = o.C;
      u = L + u;
      var S = h, N = v;
      for (v = o.Ta, h = o.Ua; 0 < F--; ) {
        var k = o.gc[F], Z = L, lA = u, uA = S, rA = N, mA = (N = v, S = h, k.Ea);
        switch (A(Z < lA), A(lA <= k.nc), k.hc) {
          case 2:
            gs(uA, rA, (lA - Z) * mA, N, S);
            break;
          case 0:
            var gA = Z, AA = lA, tA = N, wA = S, bA = (DA = k).Ea;
            gA == 0 && (Mu(uA, rA, null, null, 1, tA, wA), ie(uA, rA + 1, 0, 0, bA - 1, tA, wA + 1), rA += bA, wA += bA, ++gA);
            for (var vA = 1 << DA.b, MA = vA - 1, NA = xA(bA, DA.b), VA = DA.K, DA = DA.w + (gA >> DA.b) * NA; gA < AA; ) {
              var pe = VA, be = DA, he = 1;
              for (Ao(uA, rA, tA, wA - bA, 1, tA, wA); he < bA; ) {
                var oe = (he & ~MA) + vA;
                oe > bA && (oe = bA), (0, bn[pe[be++] >> 8 & 15])(uA, rA + +he, tA, wA + he - bA, oe - he, tA, wA + he), he = oe;
              }
              rA += bA, wA += bA, ++gA & MA || (DA += NA);
            }
            lA != k.nc && r(N, S - mA, N, S + (lA - Z - 1) * mA, mA);
            break;
          case 1:
            for (mA = uA, AA = rA, bA = (uA = k.Ea) - (wA = uA & ~(tA = (rA = 1 << k.b) - 1)), gA = xA(uA, k.b), vA = k.K, k = k.w + (Z >> k.b) * gA; Z < lA; ) {
              for (MA = vA, NA = k, VA = new UA(), DA = AA + wA, pe = AA + uA; AA < DA; ) Qe(MA[NA++], VA), ni(VA, mA, AA, rA, N, S), AA += rA, S += rA;
              AA < pe && (Qe(MA[NA++], VA), ni(VA, mA, AA, bA, N, S), AA += bA, S += bA), ++Z & tA || (k += gA);
            }
            break;
          case 3:
            if (uA == N && rA == S && 0 < k.b) {
              for (AA = N, uA = mA = S + (lA - Z) * mA - (wA = (lA - Z) * xA(k.Ea, k.b)), rA = N, tA = S, gA = [], wA = (bA = wA) - 1; 0 <= wA; --wA) gA[wA] = rA[tA + wA];
              for (wA = bA - 1; 0 <= wA; --wA) AA[uA + wA] = gA[wA];
              er(k, Z, lA, N, mA, N, S);
            } else er(k, Z, lA, uA, rA, N, S);
        }
        S = v, N = h;
      }
      N != h && r(v, h, S, N, U);
    }
    function Fi(o, u) {
      var h = o.V, v = o.Ba + o.c * o.C, F = u - o.C;
      if (A(u <= o.l.o), A(16 >= F), 0 < F) {
        var U = o.l, L = o.Ta, S = o.Ua, N = U.width;
        if (Gt(o, F, h, v), F = S = [S], A((h = o.C) < (v = u)), A(U.v < U.va), v > U.o && (v = U.o), h < U.j) {
          var k = U.j - h;
          h = U.j, F[0] += k * N;
        }
        if (h >= v ? h = 0 : (F[0] += 4 * U.v, U.ka = h - U.j, U.U = U.va - U.v, U.T = v - h, h = 1), h) {
          if (S = S[0], 11 > (h = o.ca).S) {
            var Z = h.f.RGBA, lA = (v = h.S, F = U.U, U = U.T, k = Z.eb, Z.A), uA = U;
            for (Z = Z.fb + o.Ma * Z.A; 0 < uA--; ) {
              var rA = L, mA = S, gA = F, AA = k, tA = Z;
              switch (v) {
                case ys:
                  kt(rA, mA, gA, AA, tA);
                  break;
                case bs:
                  Lt(rA, mA, gA, AA, tA);
                  break;
                case ju:
                  Lt(rA, mA, gA, AA, tA), nr(AA, tA, 0, gA, 1, 0);
                  break;
                case Eh:
                  an(rA, mA, gA, AA, tA);
                  break;
                case Cs:
                  De(rA, mA, gA, AA, tA, 1);
                  break;
                case Gu:
                  De(rA, mA, gA, AA, tA, 1), nr(AA, tA, 0, gA, 1, 0);
                  break;
                case Fs:
                  De(rA, mA, gA, AA, tA, 0);
                  break;
                case Qs:
                  De(rA, mA, gA, AA, tA, 0), nr(AA, tA, 1, gA, 1, 0);
                  break;
                case Ku:
                  Cn(rA, mA, gA, AA, tA);
                  break;
                case Vu:
                  Cn(rA, mA, gA, AA, tA), Ie(AA, tA, gA, 1, 0);
                  break;
                case xh:
                  nn(rA, mA, gA, AA, tA);
                  break;
                default:
                  A(0);
              }
              S += N, Z += lA;
            }
            o.Ma += U;
          } else alert("todo:EmitRescaledRowsYUVA");
          A(o.Ma <= h.height);
        }
      }
      o.C = u, A(o.C <= o.i);
    }
    function en(o) {
      var u;
      if (0 < o.ua) return 0;
      for (u = 0; u < o.Wb; ++u) {
        var h = o.Ya[u].G, v = o.Ya[u].H;
        if (0 < h[1][v[1] + 0].g || 0 < h[2][v[2] + 0].g || 0 < h[3][v[3] + 0].g) return 0;
      }
      return 1;
    }
    function vr(o, u, h, v, F, U) {
      if (o.Z != 0) {
        var L = o.qd, S = o.rd;
        for (A(En[o.Z] != null); u < h; ++u) En[o.Z](L, S, v, F, v, F, U), L = v, S = F, F += U;
        o.qd = L, o.rd = S;
      }
    }
    function mr(o, u) {
      var h = o.l.ma, v = h.Z == 0 || h.Z == 1 ? o.l.j : o.C;
      if (v = o.C < v ? v : o.C, A(u <= o.l.o), u > v) {
        var F = o.l.width, U = h.ca, L = h.tb + F * v, S = o.V, N = o.Ba + o.c * v, k = o.gc;
        A(o.ab == 1), A(k[0].hc == 3), ps(k[0], v, u, S, N, U, L), vr(h, v, u, U, L, F);
      }
      o.C = o.Ma = u;
    }
    function yr(o, u, h, v, F, U, L) {
      var S = o.$ / v, N = o.$ % v, k = o.m, Z = o.s, lA = h + o.$, uA = lA;
      F = h + v * F;
      var rA = h + v * U, mA = 280 + Z.ua, gA = o.Pb ? S : 16777216, AA = 0 < Z.ua ? Z.Wa : null, tA = Z.wc, wA = lA < rA ? Ze(Z, N, S) : null;
      A(o.C < U), A(rA <= F);
      var bA = !1;
      A: for (; ; ) {
        for (; bA || lA < rA; ) {
          var vA = 0;
          if (S >= gA) {
            var MA = lA - h;
            A((gA = o).Pb), gA.wd = gA.m, gA.xd = MA, 0 < gA.s.ua && V(gA.s.Wa, gA.s.vb), gA = S + sp;
          }
          if (N & tA || (wA = Ze(Z, N, S)), A(wA != null), wA.Qb && (u[lA] = wA.qb, bA = !0), !bA) if (eA(k), wA.jc) {
            vA = k, MA = u;
            var NA = lA, VA = wA.pd[M(vA) & gt - 1];
            A(wA.jc), 256 > VA.g ? (X(vA, vA.u + VA.g), MA[NA] = VA.value, vA = 0) : (X(vA, vA.u + VA.g - 256), A(256 <= VA.value), vA = VA.value), vA == 0 && (bA = !0);
          } else vA = Ot(wA.G[0], wA.H[0], k);
          if (k.h) break;
          if (bA || 256 > vA) {
            if (!bA) if (wA.nd) u[lA] = (wA.qb | vA << 8) >>> 0;
            else {
              if (eA(k), bA = Ot(wA.G[1], wA.H[1], k), eA(k), MA = Ot(wA.G[2], wA.H[2], k), NA = Ot(wA.G[3], wA.H[3], k), k.h) break;
              u[lA] = (NA << 24 | bA << 16 | vA << 8 | MA) >>> 0;
            }
            if (bA = !1, ++lA, ++N >= v && (N = 0, ++S, L != null && S <= U && !(S % 16) && L(o, S), AA != null)) for (; uA < lA; ) vA = u[uA++], AA.X[(506832829 * vA & 4294967295) >>> AA.Mb] = vA;
          } else if (280 > vA) {
            if (vA = wr(vA - 256, k), MA = Ot(wA.G[4], wA.H[4], k), eA(k), MA = Tr(v, MA = wr(MA, k)), k.h) break;
            if (lA - h < MA || F - lA < vA) break A;
            for (NA = 0; NA < vA; ++NA) u[lA + NA] = u[lA + NA - MA];
            for (lA += vA, N += vA; N >= v; ) N -= v, ++S, L != null && S <= U && !(S % 16) && L(o, S);
            if (A(lA <= F), N & tA && (wA = Ze(Z, N, S)), AA != null) for (; uA < lA; ) vA = u[uA++], AA.X[(506832829 * vA & 4294967295) >>> AA.Mb] = vA;
          } else {
            if (!(vA < mA)) break A;
            for (bA = vA - 280, A(AA != null); uA < lA; ) vA = u[uA++], AA.X[(506832829 * vA & 4294967295) >>> AA.Mb] = vA;
            vA = lA, A(!(bA >>> (MA = AA).Xa)), u[vA] = MA.X[bA], bA = !0;
          }
          bA || A(k.h == z(k));
        }
        if (o.Pb && k.h && lA < F) A(o.m.h), o.a = 5, o.m = o.wd, o.$ = o.xd, 0 < o.s.ua && V(o.s.vb, o.s.Wa);
        else {
          if (k.h) break A;
          L != null && L(o, S > U ? U : S), o.a = 0, o.$ = lA - h;
        }
        return 1;
      }
      return o.a = 3, 0;
    }
    function kr(o) {
      A(o != null), o.vc = null, o.yc = null, o.Ya = null;
      var u = o.Wa;
      u != null && (u.X = null), o.vb = null, A(o != null);
    }
    function Ar() {
      var o = new Pu();
      return o == null ? null : (o.a = 0, o.xb = Ih, Hr("Predictor", "VP8LPredictors"), Hr("Predictor", "VP8LPredictors_C"), Hr("PredictorAdd", "VP8LPredictorsAdd"), Hr("PredictorAdd", "VP8LPredictorsAdd_C"), gs = fe, ni = JA, kt = TA, Lt = vt, Cn = ge, nn = pr, an = xe, D.VP8LMapColor32b = Gi, D.VP8LMapColor8b = Bs, o);
    }
    function Pr(o, u, h, v, F) {
      var U = 1, L = [o], S = [u], N = v.m, k = v.s, Z = null, lA = 0;
      A: for (; ; ) {
        if (h) for (; U && pA(N, 1); ) {
          var uA = L, rA = S, mA = v, gA = 1, AA = mA.m, tA = mA.gc[mA.ab], wA = pA(AA, 2);
          if (mA.Oc & 1 << wA) U = 0;
          else {
            switch (mA.Oc |= 1 << wA, tA.hc = wA, tA.Ea = uA[0], tA.nc = rA[0], tA.K = [null], ++mA.ab, A(4 >= mA.ab), wA) {
              case 0:
              case 1:
                tA.b = pA(AA, 3) + 2, gA = Pr(xA(tA.Ea, tA.b), xA(tA.nc, tA.b), 0, mA, tA.K), tA.K = tA.K[0];
                break;
              case 3:
                var bA, vA = pA(AA, 8) + 1, MA = 16 < vA ? 0 : 4 < vA ? 1 : 2 < vA ? 2 : 3;
                if (uA[0] = xA(tA.Ea, MA), tA.b = MA, bA = gA = Pr(vA, 1, 0, mA, tA.K)) {
                  var NA, VA = vA, DA = tA, pe = 1 << (8 >> DA.b), be = i(pe);
                  if (be == null) bA = 0;
                  else {
                    var he = DA.K[0], oe = DA.w;
                    for (be[0] = DA.K[0][0], NA = 1; NA < 1 * VA; ++NA) be[NA] = yA(he[oe + NA], be[NA - 1]);
                    for (; NA < 4 * pe; ++NA) be[NA] = 0;
                    DA.K[0] = null, DA.K[0] = be, bA = 1;
                  }
                }
                gA = bA;
                break;
              case 2:
                break;
              default:
                A(0);
            }
            U = gA;
          }
        }
        if (L = L[0], S = S[0], U && pA(N, 1) && !(U = 1 <= (lA = pA(N, 4)) && 11 >= lA)) {
          v.a = 3;
          break A;
        }
        var Le;
        if (Le = U) e: {
          var Ue, re, et, Pt = v, tt = L, Mt = S, Ce = lA, qt = h, Wt = Pt.m, ut = Pt.s, pt = [null], It = 1, or = 0, jr = op[Ce];
          t: for (; ; ) {
            if (qt && pA(Wt, 1)) {
              var ct = pA(Wt, 3) + 2, un = xA(tt, ct), li = xA(Mt, ct), Xi = un * li;
              if (!Pr(un, li, 0, Pt, pt)) break t;
              for (pt = pt[0], ut.xc = ct, Ue = 0; Ue < Xi; ++Ue) {
                var xn = pt[Ue] >> 8 & 65535;
                pt[Ue] = xn, xn >= It && (It = xn + 1);
              }
            }
            if (Wt.h) break t;
            for (re = 0; 5 > re; ++re) {
              var Ke = Lh[re];
              !re && 0 < Ce && (Ke += 1 << Ce), or < Ke && (or = Ke);
            }
            var Xu = a(It * jr, I), Ph = It, Mh = a(Ph, K);
            if (Mh == null) var Ls = null;
            else A(65536 >= Ph), Ls = Mh;
            var oo = i(or);
            if (Ls == null || oo == null || Xu == null) {
              Pt.a = 1;
              break t;
            }
            var Ss = Xu;
            for (Ue = et = 0; Ue < It; ++Ue) {
              var Ur = Ls[Ue], $i = Ur.G, Ji = Ur.H, Rh = 0, Is = 1, Kh = 0;
              for (re = 0; 5 > re; ++re) {
                Ke = Lh[re], $i[re] = Ss, Ji[re] = et, !re && 0 < Ce && (Ke += 1 << Ce);
                n: {
                  var _s, $u = Ke, Ns = Pt, so = oo, xp = Ss, Lp = et, Ju = 0, Ln = Ns.m, Sp = pA(Ln, 1);
                  if (n(so, 0, 0, $u), Sp) {
                    var Ip = pA(Ln, 1) + 1, _p = pA(Ln, 1), jh = pA(Ln, _p == 0 ? 1 : 8);
                    so[jh] = 1, Ip == 2 && (so[jh = pA(Ln, 8)] = 1);
                    var Hs = 1;
                  } else {
                    var Gh = i(19), Vh = pA(Ln, 4) + 4;
                    if (19 < Vh) {
                      Ns.a = 3;
                      var Os = 0;
                      break n;
                    }
                    for (_s = 0; _s < Vh; ++_s) Gh[ip[_s]] = pA(Ln, 3);
                    var Yu = void 0, lo = void 0, zh = Ns, Np = Gh, Ds = $u, qh = so, Zu = 0, Sn = zh.m, Wh = 8, Xh = a(128, I);
                    r: for (; x(Xh, 0, 7, Np, 19); ) {
                      if (pA(Sn, 1)) {
                        var Hp = 2 + 2 * pA(Sn, 3);
                        if ((Yu = 2 + pA(Sn, Hp)) > Ds) break r;
                      } else Yu = Ds;
                      for (lo = 0; lo < Ds && Yu--; ) {
                        eA(Sn);
                        var $h = Xh[0 + (127 & M(Sn))];
                        X(Sn, Sn.u + $h.g);
                        var Yi = $h.value;
                        if (16 > Yi) qh[lo++] = Yi, Yi != 0 && (Wh = Yi);
                        else {
                          var Op = Yi == 16, Jh = Yi - 16, Dp = rp[Jh], Yh = pA(Sn, tp[Jh]) + Dp;
                          if (lo + Yh > Ds) break r;
                          for (var Tp = Op ? Wh : 0; 0 < Yh--; ) qh[lo++] = Tp;
                        }
                      }
                      Zu = 1;
                      break r;
                    }
                    Zu || (zh.a = 3), Hs = Zu;
                  }
                  (Hs = Hs && !Ln.h) && (Ju = x(xp, Lp, 8, so, $u)), Hs && Ju != 0 ? Os = Ju : (Ns.a = 3, Os = 0);
                }
                if (Os == 0) break t;
                if (Is && np[re] == 1 && (Is = Ss[et].g == 0), Rh += Ss[et].g, et += Os, 3 >= re) {
                  var uo, Ac = oo[0];
                  for (uo = 1; uo < Ke; ++uo) oo[uo] > Ac && (Ac = oo[uo]);
                  Kh += Ac;
                }
              }
              if (Ur.nd = Is, Ur.Qb = 0, Is && (Ur.qb = ($i[3][Ji[3] + 0].value << 24 | $i[1][Ji[1] + 0].value << 16 | $i[2][Ji[2] + 0].value) >>> 0, Rh == 0 && 256 > $i[0][Ji[0] + 0].value && (Ur.Qb = 1, Ur.qb += $i[0][Ji[0] + 0].value << 8)), Ur.jc = !Ur.Qb && 6 > Kh, Ur.jc) {
                var Ts, cn = Ur;
                for (Ts = 0; Ts < gt; ++Ts) {
                  var In = Ts, _n = cn.pd[In], ks = cn.G[0][cn.H[0] + In];
                  256 <= ks.value ? (_n.g = ks.g + 256, _n.value = ks.value) : (_n.g = 0, _n.value = 0, In >>= at(ks, 8, _n), In >>= at(cn.G[1][cn.H[1] + In], 16, _n), In >>= at(cn.G[2][cn.H[2] + In], 0, _n), at(cn.G[3][cn.H[3] + In], 24, _n));
                }
              }
            }
            ut.vc = pt, ut.Wb = It, ut.Ya = Ls, ut.yc = Xu, Le = 1;
            break e;
          }
          Le = 0;
        }
        if (!(U = Le)) {
          v.a = 3;
          break A;
        }
        if (0 < lA) {
          if (k.ua = 1 << lA, !zA(k.Wa, lA)) {
            v.a = 1, U = 0;
            break A;
          }
        } else k.ua = 0;
        var ec = v, Zh = L, kp = S, tc = ec.s, rc = tc.xc;
        if (ec.c = Zh, ec.i = kp, tc.md = xA(Zh, rc), tc.wc = rc == 0 ? -1 : (1 << rc) - 1, h) {
          v.xb = gp;
          break A;
        }
        if ((Z = i(L * S)) == null) {
          v.a = 1, U = 0;
          break A;
        }
        U = (U = yr(v, Z, 0, L, S, S, null)) && !N.h;
        break A;
      }
      return U ? (F != null ? F[0] = Z : (A(Z == null), A(h)), v.$ = 0, h || kr(k)) : kr(k), U;
    }
    function Zn(o, u) {
      var h = o.c * o.i, v = h + u + 16 * u;
      return A(o.c <= u), o.V = i(v), o.V == null ? (o.Ta = null, o.Ua = 0, o.a = 1, 0) : (o.Ta = o.V, o.Ua = o.Ba + h + u, 1);
    }
    function Qi(o, u) {
      var h = o.C, v = u - h, F = o.V, U = o.Ba + o.c * h;
      for (A(u <= o.l.o); 0 < v; ) {
        var L = 16 < v ? 16 : v, S = o.l.ma, N = o.l.width, k = N * L, Z = S.ca, lA = S.tb + N * h, uA = o.Ta, rA = o.Ua;
        Gt(o, L, F, U), qe(uA, rA, Z, lA, k), vr(S, h, h + L, Z, lA, N), v -= L, F += L * o.c, h += L;
      }
      A(h == u), o.C = o.Ma = u;
    }
    function Ui() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }
    function Ei() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }
    function xi() {
      this.Fb = this.Bb = this.Cb = 0, this.Zb = i(4), this.Lb = i(4);
    }
    function Xo() {
      this.Yb = function() {
        var o = [];
        return function u(h, v, F) {
          for (var U = F[v], L = 0; L < U && (h.push(F.length > v + 1 ? [] : 0), !(F.length < v + 1)); L++) u(h[L], v + 1, F);
        }(o, 0, [3, 11]), o;
      }();
    }
    function pu() {
      this.jb = i(3), this.Wc = l([4, 8], Xo), this.Xc = l([4, 17], Xo);
    }
    function Bu() {
      this.Pc = this.wb = this.Tb = this.zd = 0, this.vd = new i(4), this.od = new i(4);
    }
    function Li() {
      this.ld = this.La = this.dd = this.tc = 0;
    }
    function $o() {
      this.Na = this.la = 0;
    }
    function wu() {
      this.Sc = [0, 0], this.Eb = [0, 0], this.Qc = [0, 0], this.ia = this.lc = 0;
    }
    function Oa() {
      this.ad = i(384), this.Za = 0, this.Ob = i(16), this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0;
    }
    function vu() {
      this.uc = this.M = this.Nb = 0, this.wa = Array(new Li()), this.Y = 0, this.ya = Array(new Oa()), this.aa = 0, this.l = new Si();
    }
    function Jo() {
      this.y = i(16), this.f = i(8), this.ea = i(8);
    }
    function mu() {
      this.cb = this.a = 0, this.sc = "", this.m = new LA(), this.Od = new Ui(), this.Kc = new Ei(), this.ed = new Bu(), this.Qa = new xi(), this.Ic = this.$c = this.Aa = 0, this.D = new vu(), this.Xb = this.Va = this.Hb = this.zb = this.yb = this.Ub = this.za = 0, this.Jc = a(8, LA), this.ia = 0, this.pb = a(4, wu), this.Pa = new pu(), this.Bd = this.kc = 0, this.Ac = [], this.Bc = 0, this.zc = [0, 0, 0, 0], this.Gd = Array(new Jo()), this.Hd = 0, this.rb = Array(new $o()), this.sb = 0, this.wa = Array(new Li()), this.Y = 0, this.oc = [], this.pc = 0, this.sa = [], this.ta = 0, this.qa = [], this.ra = 0, this.Ha = [], this.B = this.R = this.Ia = 0, this.Ec = [], this.M = this.ja = this.Vb = this.Fc = 0, this.ya = Array(new Oa()), this.L = this.aa = 0, this.gd = l([4, 2], Li), this.ga = null, this.Fa = [], this.Cc = this.qc = this.P = 0, this.Gb = [], this.Uc = 0, this.mb = [], this.nb = 0, this.rc = [], this.Ga = this.Vc = 0;
    }
    function Si() {
      this.T = this.U = this.ka = this.height = this.width = 0, this.y = [], this.f = [], this.ea = [], this.Rc = this.fa = this.W = this.N = this.O = 0, this.ma = "void", this.put = "VP8IoPutHook", this.ac = "VP8IoSetupHook", this.bc = "VP8IoTeardownHook", this.ha = this.Kb = 0, this.data = [], this.hb = this.ib = this.da = this.o = this.j = this.va = this.v = this.Da = this.ob = this.w = 0, this.F = [], this.J = 0;
    }
    function yu() {
      var o = new mu();
      return o != null && (o.a = 0, o.sc = "OK", o.cb = 0, o.Xb = 0, io || (io = As)), o;
    }
    function Ve(o, u, h) {
      return o.a == 0 && (o.a = u, o.sc = h, o.cb = 0), 0;
    }
    function Yo(o, u, h) {
      return 3 <= h && o[u + 0] == 157 && o[u + 1] == 1 && o[u + 2] == 42;
    }
    function Zo(o, u) {
      if (o == null) return 0;
      if (o.a = 0, o.sc = "OK", u == null) return Ve(o, 2, "null VP8Io passed to VP8GetHeaders()");
      var h = u.data, v = u.w, F = u.ha;
      if (4 > F) return Ve(o, 7, "Truncated header.");
      var U = h[v + 0] | h[v + 1] << 8 | h[v + 2] << 16, L = o.Od;
      if (L.Rb = !(1 & U), L.td = U >> 1 & 7, L.yd = U >> 4 & 1, L.ub = U >> 5, 3 < L.td) return Ve(o, 3, "Incorrect keyframe parameters.");
      if (!L.yd) return Ve(o, 4, "Frame not displayable.");
      v += 3, F -= 3;
      var S = o.Kc;
      if (L.Rb) {
        if (7 > F) return Ve(o, 7, "cannot parse picture header");
        if (!Yo(h, v, F)) return Ve(o, 3, "Bad code word");
        S.c = 16383 & (h[v + 4] << 8 | h[v + 3]), S.Td = h[v + 4] >> 6, S.i = 16383 & (h[v + 6] << 8 | h[v + 5]), S.Ud = h[v + 6] >> 6, v += 7, F -= 7, o.za = S.c + 15 >> 4, o.Ub = S.i + 15 >> 4, u.width = S.c, u.height = S.i, u.Da = 0, u.j = 0, u.v = 0, u.va = u.width, u.o = u.height, u.da = 0, u.ib = u.width, u.hb = u.height, u.U = u.width, u.T = u.height, n((U = o.Pa).jb, 0, 255, U.jb.length), A((U = o.Qa) != null), U.Cb = 0, U.Bb = 0, U.Fb = 1, n(U.Zb, 0, 0, U.Zb.length), n(U.Lb, 0, 0, U.Lb);
      }
      if (L.ub > F) return Ve(o, 7, "bad partition length");
      nA(U = o.m, h, v, L.ub), v += L.ub, F -= L.ub, L.Rb && (S.Ld = fA(U), S.Kd = fA(U)), S = o.Qa;
      var N, k = o.Pa;
      if (A(U != null), A(S != null), S.Cb = fA(U), S.Cb) {
        if (S.Bb = fA(U), fA(U)) {
          for (S.Fb = fA(U), N = 0; 4 > N; ++N) S.Zb[N] = fA(U) ? cA(U, 7) : 0;
          for (N = 0; 4 > N; ++N) S.Lb[N] = fA(U) ? cA(U, 6) : 0;
        }
        if (S.Bb) for (N = 0; 3 > N; ++N) k.jb[N] = fA(U) ? iA(U, 8) : 255;
      } else S.Bb = 0;
      if (U.Ka) return Ve(o, 3, "cannot parse segment header");
      if ((S = o.ed).zd = fA(U), S.Tb = iA(U, 6), S.wb = iA(U, 3), S.Pc = fA(U), S.Pc && fA(U)) {
        for (k = 0; 4 > k; ++k) fA(U) && (S.vd[k] = cA(U, 6));
        for (k = 0; 4 > k; ++k) fA(U) && (S.od[k] = cA(U, 6));
      }
      if (o.L = S.Tb == 0 ? 0 : S.zd ? 1 : 2, U.Ka) return Ve(o, 3, "cannot parse filter header");
      var Z = F;
      if (F = N = v, v = N + Z, S = Z, o.Xb = (1 << iA(o.m, 2)) - 1, Z < 3 * (k = o.Xb)) h = 7;
      else {
        for (N += 3 * k, S -= 3 * k, Z = 0; Z < k; ++Z) {
          var lA = h[F + 0] | h[F + 1] << 8 | h[F + 2] << 16;
          lA > S && (lA = S), nA(o.Jc[+Z], h, N, lA), N += lA, S -= lA, F += 3;
        }
        nA(o.Jc[+k], h, N, S), h = N < v ? 0 : 5;
      }
      if (h != 0) return Ve(o, h, "cannot parse partitions");
      for (h = iA(N = o.m, 7), F = fA(N) ? cA(N, 4) : 0, v = fA(N) ? cA(N, 4) : 0, S = fA(N) ? cA(N, 4) : 0, k = fA(N) ? cA(N, 4) : 0, N = fA(N) ? cA(N, 4) : 0, Z = o.Qa, lA = 0; 4 > lA; ++lA) {
        if (Z.Cb) {
          var uA = Z.Zb[lA];
          Z.Fb || (uA += h);
        } else {
          if (0 < lA) {
            o.pb[lA] = o.pb[0];
            continue;
          }
          uA = h;
        }
        var rA = o.pb[lA];
        rA.Sc[0] = zu[Vt(uA + F, 127)], rA.Sc[1] = qu[Vt(uA + 0, 127)], rA.Eb[0] = 2 * zu[Vt(uA + v, 127)], rA.Eb[1] = 101581 * qu[Vt(uA + S, 127)] >> 16, 8 > rA.Eb[1] && (rA.Eb[1] = 8), rA.Qc[0] = zu[Vt(uA + k, 117)], rA.Qc[1] = qu[Vt(uA + N, 127)], rA.lc = uA + N;
      }
      if (!L.Rb) return Ve(o, 4, "Not a key frame.");
      for (fA(U), L = o.Pa, h = 0; 4 > h; ++h) {
        for (F = 0; 8 > F; ++F) for (v = 0; 3 > v; ++v) for (S = 0; 11 > S; ++S) k = hA(U, hp[h][F][v][S]) ? iA(U, 8) : cp[h][F][v][S], L.Wc[h][F].Yb[v][S] = k;
        for (F = 0; 17 > F; ++F) L.Xc[h][F] = L.Wc[h][dp[F]];
      }
      return o.kc = fA(U), o.kc && (o.Bd = iA(U, 8)), o.cb = 1;
    }
    function As(o, u, h, v, F, U, L) {
      var S = u[F].Yb[h];
      for (h = 0; 16 > F; ++F) {
        if (!hA(o, S[h + 0])) return F;
        for (; !hA(o, S[h + 1]); ) if (S = u[++F].Yb[0], h = 0, F == 16) return 16;
        var N = u[F + 1].Yb;
        if (hA(o, S[h + 2])) {
          var k = o, Z = 0;
          if (hA(k, (uA = S)[(lA = h) + 3])) if (hA(k, uA[lA + 6])) {
            for (S = 0, lA = 2 * (Z = hA(k, uA[lA + 8])) + (uA = hA(k, uA[lA + 9 + Z])), Z = 0, uA = lp[lA]; uA[S]; ++S) Z += Z + hA(k, uA[S]);
            Z += 3 + (8 << lA);
          } else hA(k, uA[lA + 7]) ? (Z = 7 + 2 * hA(k, 165), Z += hA(k, 145)) : Z = 5 + hA(k, 159);
          else Z = hA(k, uA[lA + 4]) ? 3 + hA(k, uA[lA + 5]) : 2;
          S = N[2];
        } else Z = 1, S = N[1];
        N = L + up[F], 0 > (k = o).b && sA(k);
        var lA, uA = k.b, rA = (lA = k.Ca >> 1) - (k.I >> uA) >> 31;
        --k.b, k.Ca += rA, k.Ca |= 1, k.I -= (lA + 1 & rA) << uA, U[N] = ((Z ^ rA) - rA) * v[(0 < F) + 0];
      }
      return 16;
    }
    function Da(o) {
      var u = o.rb[o.sb - 1];
      u.la = 0, u.Na = 0, n(o.zc, 0, 0, o.zc.length), o.ja = 0;
    }
    function bu(o, u) {
      if (o == null) return 0;
      if (u == null) return Ve(o, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!o.cb && !Zo(o, u)) return 0;
      if (A(o.cb), u.ac == null || u.ac(u)) {
        u.ob && (o.L = 0);
        var h = xs[o.L];
        if (o.L == 2 ? (o.yb = 0, o.zb = 0) : (o.yb = u.v - h >> 4, o.zb = u.j - h >> 4, 0 > o.yb && (o.yb = 0), 0 > o.zb && (o.zb = 0)), o.Va = u.o + 15 + h >> 4, o.Hb = u.va + 15 + h >> 4, o.Hb > o.za && (o.Hb = o.za), o.Va > o.Ub && (o.Va = o.Ub), 0 < o.L) {
          var v = o.ed;
          for (h = 0; 4 > h; ++h) {
            var F;
            if (o.Qa.Cb) {
              var U = o.Qa.Lb[h];
              o.Qa.Fb || (U += v.Tb);
            } else U = v.Tb;
            for (F = 0; 1 >= F; ++F) {
              var L = o.gd[h][F], S = U;
              if (v.Pc && (S += v.vd[0], F && (S += v.od[0])), 0 < (S = 0 > S ? 0 : 63 < S ? 63 : S)) {
                var N = S;
                0 < v.wb && (N = 4 < v.wb ? N >> 2 : N >> 1) > 9 - v.wb && (N = 9 - v.wb), 1 > N && (N = 1), L.dd = N, L.tc = 2 * S + N, L.ld = 40 <= S ? 2 : 15 <= S ? 1 : 0;
              } else L.tc = 0;
              L.La = F;
            }
          }
        }
        h = 0;
      } else Ve(o, 6, "Frame setup failed"), h = o.a;
      if (h = h == 0) {
        if (h) {
          o.$c = 0, 0 < o.Aa || (o.Ic = Ep);
          A: {
            h = o.Ic, v = 4 * (N = o.za);
            var k = 32 * N, Z = N + 1, lA = 0 < o.L ? N * (0 < o.Aa ? 2 : 1) : 0, uA = (o.Aa == 2 ? 2 : 1) * N;
            if ((L = v + 832 + (F = 3 * (16 * h + xs[o.L]) / 2 * k) + (U = o.Fa != null && 0 < o.Fa.length ? o.Kc.c * o.Kc.i : 0)) != L) h = 0;
            else {
              if (L > o.Vb) {
                if (o.Vb = 0, o.Ec = i(L), o.Fc = 0, o.Ec == null) {
                  h = Ve(o, 1, "no memory during frame initialization.");
                  break A;
                }
                o.Vb = L;
              }
              L = o.Ec, S = o.Fc, o.Ac = L, o.Bc = S, S += v, o.Gd = a(k, Jo), o.Hd = 0, o.rb = a(Z + 1, $o), o.sb = 1, o.wa = lA ? a(lA, Li) : null, o.Y = 0, o.D.Nb = 0, o.D.wa = o.wa, o.D.Y = o.Y, 0 < o.Aa && (o.D.Y += N), A(!0), o.oc = L, o.pc = S, S += 832, o.ya = a(uA, Oa), o.aa = 0, o.D.ya = o.ya, o.D.aa = o.aa, o.Aa == 2 && (o.D.aa += N), o.R = 16 * N, o.B = 8 * N, N = (k = xs[o.L]) * o.R, k = k / 2 * o.B, o.sa = L, o.ta = S + N, o.qa = o.sa, o.ra = o.ta + 16 * h * o.R + k, o.Ha = o.qa, o.Ia = o.ra + 8 * h * o.B + k, o.$c = 0, S += F, o.mb = U ? L : null, o.nb = U ? S : null, A(S + U <= o.Fc + o.Vb), Da(o), n(o.Ac, o.Bc, 0, v), h = 1;
            }
          }
          if (h) {
            if (u.ka = 0, u.y = o.sa, u.O = o.ta, u.f = o.qa, u.N = o.ra, u.ea = o.Ha, u.Vd = o.Ia, u.fa = o.R, u.Rc = o.B, u.F = null, u.J = 0, !vs) {
              for (h = -255; 255 >= h; ++h) ot[255 + h] = 0 > h ? -h : h;
              for (h = -1020; 1020 >= h; ++h) sn[1020 + h] = -128 > h ? -128 : 127 < h ? 127 : h;
              for (h = -112; 112 >= h; ++h) no[112 + h] = -16 > h ? -16 : 15 < h ? 15 : h;
              for (h = -255; 510 >= h; ++h) Wi[255 + h] = 0 > h ? 0 : 255 < h ? 255 : h;
              vs = 1;
            }
            Vi = Qu, on = Cu, eo = ts, St = Fu, tr = rs, ze = es, zi = Ka, ws = ti, to = ku, ii = ja, ai = Tu, Fn = Di, oi = Ga, qi = fs, si = cs, Qn = Rr, ro = rn, rr = Du, Qr[0] = Mr, Qr[1] = Uu, Qr[2] = Su, Qr[3] = Iu, Qr[4] = as, Qr[5] = Hi, Qr[6] = os, Qr[7] = Pa, Qr[8] = Nu, Qr[9] = _u, Un[0] = ns, Un[1] = xu, Un[2] = tn, Un[3] = _i, Un[4] = mt, Un[5] = Lu, Un[6] = is, ln[0] = vn, ln[1] = Eu, ln[2] = Hu, ln[3] = Ma, ln[4] = ei, ln[5] = Ou, ln[6] = Ra, h = 1;
          } else h = 0;
        }
        h && (h = function(rA, mA) {
          for (rA.M = 0; rA.M < rA.Va; ++rA.M) {
            var gA, AA = rA.Jc[rA.M & rA.Xb], tA = rA.m, wA = rA;
            for (gA = 0; gA < wA.za; ++gA) {
              var bA = tA, vA = wA, MA = vA.Ac, NA = vA.Bc + 4 * gA, VA = vA.zc, DA = vA.ya[vA.aa + gA];
              if (vA.Qa.Bb ? DA.$b = hA(bA, vA.Pa.jb[0]) ? 2 + hA(bA, vA.Pa.jb[2]) : hA(bA, vA.Pa.jb[1]) : DA.$b = 0, vA.kc && (DA.Ad = hA(bA, vA.Bd)), DA.Za = !hA(bA, 145) + 0, DA.Za) {
                var pe = DA.Ob, be = 0;
                for (vA = 0; 4 > vA; ++vA) {
                  var he, oe = VA[0 + vA];
                  for (he = 0; 4 > he; ++he) {
                    oe = fp[MA[NA + he]][oe];
                    for (var Le = Sh[hA(bA, oe[0])]; 0 < Le; ) Le = Sh[2 * Le + hA(bA, oe[Le])];
                    oe = -Le, MA[NA + he] = oe;
                  }
                  r(pe, be, MA, NA, 4), be += 4, VA[0 + vA] = oe;
                }
              } else oe = hA(bA, 156) ? hA(bA, 128) ? 1 : 3 : hA(bA, 163) ? 2 : 0, DA.Ob[0] = oe, n(MA, NA, oe, 4), n(VA, 0, oe, 4);
              DA.Dd = hA(bA, 142) ? hA(bA, 114) ? hA(bA, 183) ? 1 : 3 : 2 : 0;
            }
            if (wA.m.Ka) return Ve(rA, 7, "Premature end-of-partition0 encountered.");
            for (; rA.ja < rA.za; ++rA.ja) {
              if (wA = AA, bA = (tA = rA).rb[tA.sb - 1], MA = tA.rb[tA.sb + tA.ja], gA = tA.ya[tA.aa + tA.ja], NA = tA.kc ? gA.Ad : 0) bA.la = MA.la = 0, gA.Za || (bA.Na = MA.Na = 0), gA.Hc = 0, gA.Gc = 0, gA.ia = 0;
              else {
                var Ue, re;
                if (bA = MA, MA = wA, NA = tA.Pa.Xc, VA = tA.ya[tA.aa + tA.ja], DA = tA.pb[VA.$b], vA = VA.ad, pe = 0, be = tA.rb[tA.sb - 1], oe = he = 0, n(vA, pe, 0, 384), VA.Za) var et = 0, Pt = NA[3];
                else {
                  Le = i(16);
                  var tt = bA.Na + be.Na;
                  if (tt = io(MA, NA[1], tt, DA.Eb, 0, Le, 0), bA.Na = be.Na = (0 < tt) + 0, 1 < tt) Vi(Le, 0, vA, pe);
                  else {
                    var Mt = Le[0] + 3 >> 3;
                    for (Le = 0; 256 > Le; Le += 16) vA[pe + Le] = Mt;
                  }
                  et = 1, Pt = NA[0];
                }
                var Ce = 15 & bA.la, qt = 15 & be.la;
                for (Le = 0; 4 > Le; ++Le) {
                  var Wt = 1 & qt;
                  for (Mt = re = 0; 4 > Mt; ++Mt) Ce = Ce >> 1 | (Wt = (tt = io(MA, Pt, tt = Wt + (1 & Ce), DA.Sc, et, vA, pe)) > et) << 7, re = re << 2 | (3 < tt ? 3 : 1 < tt ? 2 : vA[pe + 0] != 0), pe += 16;
                  Ce >>= 4, qt = qt >> 1 | Wt << 7, he = (he << 8 | re) >>> 0;
                }
                for (Pt = Ce, et = qt >> 4, Ue = 0; 4 > Ue; Ue += 2) {
                  for (re = 0, Ce = bA.la >> 4 + Ue, qt = be.la >> 4 + Ue, Le = 0; 2 > Le; ++Le) {
                    for (Wt = 1 & qt, Mt = 0; 2 > Mt; ++Mt) tt = Wt + (1 & Ce), Ce = Ce >> 1 | (Wt = 0 < (tt = io(MA, NA[2], tt, DA.Qc, 0, vA, pe))) << 3, re = re << 2 | (3 < tt ? 3 : 1 < tt ? 2 : vA[pe + 0] != 0), pe += 16;
                    Ce >>= 2, qt = qt >> 1 | Wt << 5;
                  }
                  oe |= re << 4 * Ue, Pt |= Ce << 4 << Ue, et |= (240 & qt) << Ue;
                }
                bA.la = Pt, be.la = et, VA.Hc = he, VA.Gc = oe, VA.ia = 43690 & oe ? 0 : DA.ia, NA = !(he | oe);
              }
              if (0 < tA.L && (tA.wa[tA.Y + tA.ja] = tA.gd[gA.$b][gA.Za], tA.wa[tA.Y + tA.ja].La |= !NA), wA.Ka) return Ve(rA, 7, "Premature end-of-file encountered.");
            }
            if (Da(rA), tA = mA, wA = 1, gA = (AA = rA).D, bA = 0 < AA.L && AA.M >= AA.zb && AA.M <= AA.Va, AA.Aa == 0) A: {
              if (gA.M = AA.M, gA.uc = bA, $a(AA, gA), wA = 1, gA = (re = AA.D).Nb, bA = (oe = xs[AA.L]) * AA.R, MA = oe / 2 * AA.B, Le = 16 * gA * AA.R, Mt = 8 * gA * AA.B, NA = AA.sa, VA = AA.ta - bA + Le, DA = AA.qa, vA = AA.ra - MA + Mt, pe = AA.Ha, be = AA.Ia - MA + Mt, qt = (Ce = re.M) == 0, he = Ce >= AA.Va - 1, AA.Aa == 2 && $a(AA, re), re.uc) for (Wt = (tt = AA).D.M, A(tt.D.uc), re = tt.yb; re < tt.Hb; ++re) {
                et = re, Pt = Wt;
                var ut = (pt = (Ke = tt).D).Nb;
                Ue = Ke.R;
                var pt = pt.wa[pt.Y + et], It = Ke.sa, or = Ke.ta + 16 * ut * Ue + 16 * et, jr = pt.dd, ct = pt.tc;
                if (ct != 0) if (A(3 <= ct), Ke.L == 1) 0 < et && Qn(It, or, Ue, ct + 4), pt.La && rr(It, or, Ue, ct), 0 < Pt && si(It, or, Ue, ct + 4), pt.La && ro(It, or, Ue, ct);
                else {
                  var un = Ke.B, li = Ke.qa, Xi = Ke.ra + 8 * ut * un + 8 * et, xn = Ke.Ha, Ke = Ke.Ia + 8 * ut * un + 8 * et;
                  ut = pt.ld, 0 < et && (ws(It, or, Ue, ct + 4, jr, ut), ii(li, Xi, xn, Ke, un, ct + 4, jr, ut)), pt.La && (Fn(It, or, Ue, ct, jr, ut), qi(li, Xi, xn, Ke, un, ct, jr, ut)), 0 < Pt && (zi(It, or, Ue, ct + 4, jr, ut), to(li, Xi, xn, Ke, un, ct + 4, jr, ut)), pt.La && (ai(It, or, Ue, ct, jr, ut), oi(li, Xi, xn, Ke, un, ct, jr, ut));
                }
              }
              if (AA.ia && alert("todo:DitherRow"), tA.put != null) {
                if (re = 16 * Ce, Ce = 16 * (Ce + 1), qt ? (tA.y = AA.sa, tA.O = AA.ta + Le, tA.f = AA.qa, tA.N = AA.ra + Mt, tA.ea = AA.Ha, tA.W = AA.Ia + Mt) : (re -= oe, tA.y = NA, tA.O = VA, tA.f = DA, tA.N = vA, tA.ea = pe, tA.W = be), he || (Ce -= oe), Ce > tA.o && (Ce = tA.o), tA.F = null, tA.J = null, AA.Fa != null && 0 < AA.Fa.length && re < Ce && (tA.J = Wa(AA, tA, re, Ce - re), tA.F = AA.mb, tA.F == null && tA.F.length == 0)) {
                  wA = Ve(AA, 3, "Could not decode alpha data.");
                  break A;
                }
                re < tA.j && (oe = tA.j - re, re = tA.j, A(!(1 & oe)), tA.O += AA.R * oe, tA.N += AA.B * (oe >> 1), tA.W += AA.B * (oe >> 1), tA.F != null && (tA.J += tA.width * oe)), re < Ce && (tA.O += tA.v, tA.N += tA.v >> 1, tA.W += tA.v >> 1, tA.F != null && (tA.J += tA.v), tA.ka = re - tA.j, tA.U = tA.va - tA.v, tA.T = Ce - re, wA = tA.put(tA));
              }
              gA + 1 != AA.Ic || he || (r(AA.sa, AA.ta - bA, NA, VA + 16 * AA.R, bA), r(AA.qa, AA.ra - MA, DA, vA + 8 * AA.B, MA), r(AA.Ha, AA.Ia - MA, pe, be + 8 * AA.B, MA));
            }
            if (!wA) return Ve(rA, 6, "Output aborted.");
          }
          return 1;
        }(o, u)), u.bc != null && u.bc(u), h &= 1;
      }
      return h ? (o.cb = 0, h) : 0;
    }
    function br(o, u, h, v, F) {
      F = o[u + h + 32 * v] + (F >> 3), o[u + h + 32 * v] = -256 & F ? 0 > F ? 0 : 255 : F;
    }
    function Ii(o, u, h, v, F, U) {
      br(o, u, 0, h, v + F), br(o, u, 1, h, v + U), br(o, u, 2, h, v - U), br(o, u, 3, h, v - F);
    }
    function Dt(o) {
      return (20091 * o >> 16) + o;
    }
    function Ta(o, u, h, v) {
      var F, U = 0, L = i(16);
      for (F = 0; 4 > F; ++F) {
        var S = o[u + 0] + o[u + 8], N = o[u + 0] - o[u + 8], k = (35468 * o[u + 4] >> 16) - Dt(o[u + 12]), Z = Dt(o[u + 4]) + (35468 * o[u + 12] >> 16);
        L[U + 0] = S + Z, L[U + 1] = N + k, L[U + 2] = N - k, L[U + 3] = S - Z, U += 4, u++;
      }
      for (F = U = 0; 4 > F; ++F) S = (o = L[U + 0] + 4) + L[U + 8], N = o - L[U + 8], k = (35468 * L[U + 4] >> 16) - Dt(L[U + 12]), br(h, v, 0, 0, S + (Z = Dt(L[U + 4]) + (35468 * L[U + 12] >> 16))), br(h, v, 1, 0, N + k), br(h, v, 2, 0, N - k), br(h, v, 3, 0, S - Z), U++, v += 32;
    }
    function es(o, u, h, v) {
      var F = o[u + 0] + 4, U = 35468 * o[u + 4] >> 16, L = Dt(o[u + 4]), S = 35468 * o[u + 1] >> 16;
      Ii(h, v, 0, F + L, o = Dt(o[u + 1]), S), Ii(h, v, 1, F + U, o, S), Ii(h, v, 2, F - U, o, S), Ii(h, v, 3, F - L, o, S);
    }
    function Cu(o, u, h, v, F) {
      Ta(o, u, h, v), F && Ta(o, u + 16, h, v + 4);
    }
    function ts(o, u, h, v) {
      on(o, u + 0, h, v, 1), on(o, u + 32, h, v + 128, 1);
    }
    function Fu(o, u, h, v) {
      var F;
      for (o = o[u + 0] + 4, F = 0; 4 > F; ++F) for (u = 0; 4 > u; ++u) br(h, v, u, F, o);
    }
    function rs(o, u, h, v) {
      o[u + 0] && St(o, u + 0, h, v), o[u + 16] && St(o, u + 16, h, v + 4), o[u + 32] && St(o, u + 32, h, v + 128), o[u + 48] && St(o, u + 48, h, v + 128 + 4);
    }
    function Qu(o, u, h, v) {
      var F, U = i(16);
      for (F = 0; 4 > F; ++F) {
        var L = o[u + 0 + F] + o[u + 12 + F], S = o[u + 4 + F] + o[u + 8 + F], N = o[u + 4 + F] - o[u + 8 + F], k = o[u + 0 + F] - o[u + 12 + F];
        U[0 + F] = L + S, U[8 + F] = L - S, U[4 + F] = k + N, U[12 + F] = k - N;
      }
      for (F = 0; 4 > F; ++F) L = (o = U[0 + 4 * F] + 3) + U[3 + 4 * F], S = U[1 + 4 * F] + U[2 + 4 * F], N = U[1 + 4 * F] - U[2 + 4 * F], k = o - U[3 + 4 * F], h[v + 0] = L + S >> 3, h[v + 16] = k + N >> 3, h[v + 32] = L - S >> 3, h[v + 48] = k - N >> 3, v += 64;
    }
    function ka(o, u, h) {
      var v, F = u - 32, U = zt, L = 255 - o[F - 1];
      for (v = 0; v < h; ++v) {
        var S, N = U, k = L + o[u - 1];
        for (S = 0; S < h; ++S) o[u + S] = N[k + o[F + S]];
        u += 32;
      }
    }
    function Uu(o, u) {
      ka(o, u, 4);
    }
    function Eu(o, u) {
      ka(o, u, 8);
    }
    function xu(o, u) {
      ka(o, u, 16);
    }
    function tn(o, u) {
      var h;
      for (h = 0; 16 > h; ++h) r(o, u + 32 * h, o, u - 32, 16);
    }
    function _i(o, u) {
      var h;
      for (h = 16; 0 < h; --h) n(o, u, o[u - 1], 16), u += 32;
    }
    function Ni(o, u, h) {
      var v;
      for (v = 0; 16 > v; ++v) n(u, h + 32 * v, o, 16);
    }
    function ns(o, u) {
      var h, v = 16;
      for (h = 0; 16 > h; ++h) v += o[u - 1 + 32 * h] + o[u + h - 32];
      Ni(v >> 5, o, u);
    }
    function mt(o, u) {
      var h, v = 8;
      for (h = 0; 16 > h; ++h) v += o[u - 1 + 32 * h];
      Ni(v >> 4, o, u);
    }
    function Lu(o, u) {
      var h, v = 8;
      for (h = 0; 16 > h; ++h) v += o[u + h - 32];
      Ni(v >> 4, o, u);
    }
    function is(o, u) {
      Ni(128, o, u);
    }
    function YA(o, u, h) {
      return o + 2 * u + h + 2 >> 2;
    }
    function Su(o, u) {
      var h, v = u - 32;
      for (v = new Uint8Array([YA(o[v - 1], o[v + 0], o[v + 1]), YA(o[v + 0], o[v + 1], o[v + 2]), YA(o[v + 1], o[v + 2], o[v + 3]), YA(o[v + 2], o[v + 3], o[v + 4])]), h = 0; 4 > h; ++h) r(o, u + 32 * h, v, 0, v.length);
    }
    function Iu(o, u) {
      var h = o[u - 1], v = o[u - 1 + 32], F = o[u - 1 + 64], U = o[u - 1 + 96];
      EA(o, u + 0, 16843009 * YA(o[u - 1 - 32], h, v)), EA(o, u + 32, 16843009 * YA(h, v, F)), EA(o, u + 64, 16843009 * YA(v, F, U)), EA(o, u + 96, 16843009 * YA(F, U, U));
    }
    function Mr(o, u) {
      var h, v = 4;
      for (h = 0; 4 > h; ++h) v += o[u + h - 32] + o[u - 1 + 32 * h];
      for (v >>= 3, h = 0; 4 > h; ++h) n(o, u + 32 * h, v, 4);
    }
    function as(o, u) {
      var h = o[u - 1 + 0], v = o[u - 1 + 32], F = o[u - 1 + 64], U = o[u - 1 - 32], L = o[u + 0 - 32], S = o[u + 1 - 32], N = o[u + 2 - 32], k = o[u + 3 - 32];
      o[u + 0 + 96] = YA(v, F, o[u - 1 + 96]), o[u + 1 + 96] = o[u + 0 + 64] = YA(h, v, F), o[u + 2 + 96] = o[u + 1 + 64] = o[u + 0 + 32] = YA(U, h, v), o[u + 3 + 96] = o[u + 2 + 64] = o[u + 1 + 32] = o[u + 0 + 0] = YA(L, U, h), o[u + 3 + 64] = o[u + 2 + 32] = o[u + 1 + 0] = YA(S, L, U), o[u + 3 + 32] = o[u + 2 + 0] = YA(N, S, L), o[u + 3 + 0] = YA(k, N, S);
    }
    function os(o, u) {
      var h = o[u + 1 - 32], v = o[u + 2 - 32], F = o[u + 3 - 32], U = o[u + 4 - 32], L = o[u + 5 - 32], S = o[u + 6 - 32], N = o[u + 7 - 32];
      o[u + 0 + 0] = YA(o[u + 0 - 32], h, v), o[u + 1 + 0] = o[u + 0 + 32] = YA(h, v, F), o[u + 2 + 0] = o[u + 1 + 32] = o[u + 0 + 64] = YA(v, F, U), o[u + 3 + 0] = o[u + 2 + 32] = o[u + 1 + 64] = o[u + 0 + 96] = YA(F, U, L), o[u + 3 + 32] = o[u + 2 + 64] = o[u + 1 + 96] = YA(U, L, S), o[u + 3 + 64] = o[u + 2 + 96] = YA(L, S, N), o[u + 3 + 96] = YA(S, N, N);
    }
    function Hi(o, u) {
      var h = o[u - 1 + 0], v = o[u - 1 + 32], F = o[u - 1 + 64], U = o[u - 1 - 32], L = o[u + 0 - 32], S = o[u + 1 - 32], N = o[u + 2 - 32], k = o[u + 3 - 32];
      o[u + 0 + 0] = o[u + 1 + 64] = U + L + 1 >> 1, o[u + 1 + 0] = o[u + 2 + 64] = L + S + 1 >> 1, o[u + 2 + 0] = o[u + 3 + 64] = S + N + 1 >> 1, o[u + 3 + 0] = N + k + 1 >> 1, o[u + 0 + 96] = YA(F, v, h), o[u + 0 + 64] = YA(v, h, U), o[u + 0 + 32] = o[u + 1 + 96] = YA(h, U, L), o[u + 1 + 32] = o[u + 2 + 96] = YA(U, L, S), o[u + 2 + 32] = o[u + 3 + 96] = YA(L, S, N), o[u + 3 + 32] = YA(S, N, k);
    }
    function Pa(o, u) {
      var h = o[u + 0 - 32], v = o[u + 1 - 32], F = o[u + 2 - 32], U = o[u + 3 - 32], L = o[u + 4 - 32], S = o[u + 5 - 32], N = o[u + 6 - 32], k = o[u + 7 - 32];
      o[u + 0 + 0] = h + v + 1 >> 1, o[u + 1 + 0] = o[u + 0 + 64] = v + F + 1 >> 1, o[u + 2 + 0] = o[u + 1 + 64] = F + U + 1 >> 1, o[u + 3 + 0] = o[u + 2 + 64] = U + L + 1 >> 1, o[u + 0 + 32] = YA(h, v, F), o[u + 1 + 32] = o[u + 0 + 96] = YA(v, F, U), o[u + 2 + 32] = o[u + 1 + 96] = YA(F, U, L), o[u + 3 + 32] = o[u + 2 + 96] = YA(U, L, S), o[u + 3 + 64] = YA(L, S, N), o[u + 3 + 96] = YA(S, N, k);
    }
    function _u(o, u) {
      var h = o[u - 1 + 0], v = o[u - 1 + 32], F = o[u - 1 + 64], U = o[u - 1 + 96];
      o[u + 0 + 0] = h + v + 1 >> 1, o[u + 2 + 0] = o[u + 0 + 32] = v + F + 1 >> 1, o[u + 2 + 32] = o[u + 0 + 64] = F + U + 1 >> 1, o[u + 1 + 0] = YA(h, v, F), o[u + 3 + 0] = o[u + 1 + 32] = YA(v, F, U), o[u + 3 + 32] = o[u + 1 + 64] = YA(F, U, U), o[u + 3 + 64] = o[u + 2 + 64] = o[u + 0 + 96] = o[u + 1 + 96] = o[u + 2 + 96] = o[u + 3 + 96] = U;
    }
    function Nu(o, u) {
      var h = o[u - 1 + 0], v = o[u - 1 + 32], F = o[u - 1 + 64], U = o[u - 1 + 96], L = o[u - 1 - 32], S = o[u + 0 - 32], N = o[u + 1 - 32], k = o[u + 2 - 32];
      o[u + 0 + 0] = o[u + 2 + 32] = h + L + 1 >> 1, o[u + 0 + 32] = o[u + 2 + 64] = v + h + 1 >> 1, o[u + 0 + 64] = o[u + 2 + 96] = F + v + 1 >> 1, o[u + 0 + 96] = U + F + 1 >> 1, o[u + 3 + 0] = YA(S, N, k), o[u + 2 + 0] = YA(L, S, N), o[u + 1 + 0] = o[u + 3 + 32] = YA(h, L, S), o[u + 1 + 32] = o[u + 3 + 64] = YA(v, h, L), o[u + 1 + 64] = o[u + 3 + 96] = YA(F, v, h), o[u + 1 + 96] = YA(U, F, v);
    }
    function Hu(o, u) {
      var h;
      for (h = 0; 8 > h; ++h) r(o, u + 32 * h, o, u - 32, 8);
    }
    function Ma(o, u) {
      var h;
      for (h = 0; 8 > h; ++h) n(o, u, o[u - 1], 8), u += 32;
    }
    function Ai(o, u, h) {
      var v;
      for (v = 0; 8 > v; ++v) n(u, h + 32 * v, o, 8);
    }
    function vn(o, u) {
      var h, v = 8;
      for (h = 0; 8 > h; ++h) v += o[u + h - 32] + o[u - 1 + 32 * h];
      Ai(v >> 4, o, u);
    }
    function Ou(o, u) {
      var h, v = 4;
      for (h = 0; 8 > h; ++h) v += o[u + h - 32];
      Ai(v >> 3, o, u);
    }
    function ei(o, u) {
      var h, v = 4;
      for (h = 0; 8 > h; ++h) v += o[u - 1 + 32 * h];
      Ai(v >> 3, o, u);
    }
    function Ra(o, u) {
      Ai(128, o, u);
    }
    function Oi(o, u, h) {
      var v = o[u - h], F = o[u + 0], U = 3 * (F - v) + Ru[1020 + o[u - 2 * h] - o[u + h]], L = ms[112 + (U + 4 >> 3)];
      o[u - h] = zt[255 + v + ms[112 + (U + 3 >> 3)]], o[u + 0] = zt[255 + F - L];
    }
    function ss(o, u, h, v) {
      var F = o[u + 0], U = o[u + h];
      return ir[255 + o[u - 2 * h] - o[u - h]] > v || ir[255 + U - F] > v;
    }
    function ls(o, u, h, v) {
      return 4 * ir[255 + o[u - h] - o[u + 0]] + ir[255 + o[u - 2 * h] - o[u + h]] <= v;
    }
    function us(o, u, h, v, F) {
      var U = o[u - 3 * h], L = o[u - 2 * h], S = o[u - h], N = o[u + 0], k = o[u + h], Z = o[u + 2 * h], lA = o[u + 3 * h];
      return 4 * ir[255 + S - N] + ir[255 + L - k] > v ? 0 : ir[255 + o[u - 4 * h] - U] <= F && ir[255 + U - L] <= F && ir[255 + L - S] <= F && ir[255 + lA - Z] <= F && ir[255 + Z - k] <= F && ir[255 + k - N] <= F;
    }
    function cs(o, u, h, v) {
      var F = 2 * v + 1;
      for (v = 0; 16 > v; ++v) ls(o, u + v, h, F) && Oi(o, u + v, h);
    }
    function Rr(o, u, h, v) {
      var F = 2 * v + 1;
      for (v = 0; 16 > v; ++v) ls(o, u + v * h, 1, F) && Oi(o, u + v * h, 1);
    }
    function rn(o, u, h, v) {
      var F;
      for (F = 3; 0 < F; --F) cs(o, u += 4 * h, h, v);
    }
    function Du(o, u, h, v) {
      var F;
      for (F = 3; 0 < F; --F) Rr(o, u += 4, h, v);
    }
    function mn(o, u, h, v, F, U, L, S) {
      for (U = 2 * U + 1; 0 < F--; ) {
        if (us(o, u, h, U, L)) if (ss(o, u, h, S)) Oi(o, u, h);
        else {
          var N = o, k = u, Z = h, lA = N[k - 2 * Z], uA = N[k - Z], rA = N[k + 0], mA = N[k + Z], gA = N[k + 2 * Z], AA = 27 * (wA = Ru[1020 + 3 * (rA - uA) + Ru[1020 + lA - mA]]) + 63 >> 7, tA = 18 * wA + 63 >> 7, wA = 9 * wA + 63 >> 7;
          N[k - 3 * Z] = zt[255 + N[k - 3 * Z] + wA], N[k - 2 * Z] = zt[255 + lA + tA], N[k - Z] = zt[255 + uA + AA], N[k + 0] = zt[255 + rA - AA], N[k + Z] = zt[255 + mA - tA], N[k + 2 * Z] = zt[255 + gA - wA];
        }
        u += v;
      }
    }
    function Cr(o, u, h, v, F, U, L, S) {
      for (U = 2 * U + 1; 0 < F--; ) {
        if (us(o, u, h, U, L)) if (ss(o, u, h, S)) Oi(o, u, h);
        else {
          var N = o, k = u, Z = h, lA = N[k - Z], uA = N[k + 0], rA = N[k + Z], mA = ms[112 + ((gA = 3 * (uA - lA)) + 4 >> 3)], gA = ms[112 + (gA + 3 >> 3)], AA = mA + 1 >> 1;
          N[k - 2 * Z] = zt[255 + N[k - 2 * Z] + AA], N[k - Z] = zt[255 + lA + gA], N[k + 0] = zt[255 + uA - mA], N[k + Z] = zt[255 + rA - AA];
        }
        u += v;
      }
    }
    function Ka(o, u, h, v, F, U) {
      mn(o, u, h, 1, 16, v, F, U);
    }
    function ti(o, u, h, v, F, U) {
      mn(o, u, 1, h, 16, v, F, U);
    }
    function Tu(o, u, h, v, F, U) {
      var L;
      for (L = 3; 0 < L; --L) Cr(o, u += 4 * h, h, 1, 16, v, F, U);
    }
    function Di(o, u, h, v, F, U) {
      var L;
      for (L = 3; 0 < L; --L) Cr(o, u += 4, 1, h, 16, v, F, U);
    }
    function ku(o, u, h, v, F, U, L, S) {
      mn(o, u, F, 1, 8, U, L, S), mn(h, v, F, 1, 8, U, L, S);
    }
    function ja(o, u, h, v, F, U, L, S) {
      mn(o, u, 1, F, 8, U, L, S), mn(h, v, 1, F, 8, U, L, S);
    }
    function Ga(o, u, h, v, F, U, L, S) {
      Cr(o, u + 4 * F, F, 1, 8, U, L, S), Cr(h, v + 4 * F, F, 1, 8, U, L, S);
    }
    function fs(o, u, h, v, F, U, L, S) {
      Cr(o, u + 4, 1, F, 8, U, L, S), Cr(h, v + 4, 1, F, 8, U, L, S);
    }
    function Ti() {
      this.ba = new Br(), this.ec = [], this.cc = [], this.Mc = [], this.Dc = this.Nc = this.dc = this.fc = 0, this.Oa = new Me(), this.memory = 0, this.Ib = "OutputFunc", this.Jb = "OutputAlphaFunc", this.Nd = "OutputRowFunc";
    }
    function Va() {
      this.data = [], this.offset = this.kd = this.ha = this.w = 0, this.na = [], this.xa = this.gb = this.Ja = this.Sa = this.P = 0;
    }
    function za() {
      this.nc = this.Ea = this.b = this.hc = 0, this.K = [], this.w = 0;
    }
    function hs() {
      this.ua = 0, this.Wa = new B(), this.vb = new B(), this.md = this.xc = this.wc = 0, this.vc = [], this.Wb = 0, this.Ya = new K(), this.yc = new I();
    }
    function Pu() {
      this.xb = this.a = 0, this.l = new Si(), this.ca = new Br(), this.V = [], this.Ba = 0, this.Ta = [], this.Ua = 0, this.m = new E(), this.Pb = 0, this.wd = new E(), this.Ma = this.$ = this.C = this.i = this.c = this.xd = 0, this.s = new hs(), this.ab = 0, this.gc = a(4, za), this.Oc = 0;
    }
    function ki() {
      this.Lc = this.Z = this.$a = this.i = this.c = 0, this.l = new Si(), this.ic = 0, this.ca = [], this.tb = 0, this.qd = null, this.rd = 0;
    }
    function ri(o, u, h, v, F, U, L) {
      for (o = o == null ? 0 : o[u + 0], u = 0; u < L; ++u) F[U + u] = o + h[v + u] & 255, o = F[U + u];
    }
    function qa(o, u, h, v, F, U, L) {
      var S;
      if (o == null) ri(null, null, h, v, F, U, L);
      else for (S = 0; S < L; ++S) F[U + S] = o[u + S] + h[v + S] & 255;
    }
    function yn(o, u, h, v, F, U, L) {
      if (o == null) ri(null, null, h, v, F, U, L);
      else {
        var S, N = o[u + 0], k = N, Z = N;
        for (S = 0; S < L; ++S) k = Z + (N = o[u + S]) - k, Z = h[v + S] + (-256 & k ? 0 > k ? 0 : 255 : k) & 255, k = N, F[U + S] = Z;
      }
    }
    function Wa(o, u, h, v) {
      var F = u.width, U = u.o;
      if (A(o != null && u != null), 0 > h || 0 >= v || h + v > U) return null;
      if (!o.Cc) {
        if (o.ga == null) {
          var L;
          if (o.ga = new ki(), (L = o.ga == null) || (L = u.width * u.o, A(o.Gb.length == 0), o.Gb = i(L), o.Uc = 0, o.Gb == null ? L = 0 : (o.mb = o.Gb, o.nb = o.Uc, o.rc = null, L = 1), L = !L), !L) {
            L = o.ga;
            var S = o.Fa, N = o.P, k = o.qc, Z = o.mb, lA = o.nb, uA = N + 1, rA = k - 1, mA = L.l;
            if (A(S != null && Z != null && u != null), En[0] = null, En[1] = ri, En[2] = qa, En[3] = yn, L.ca = Z, L.tb = lA, L.c = u.width, L.i = u.height, A(0 < L.c && 0 < L.i), 1 >= k) u = 0;
            else if (L.$a = S[N + 0] >> 0 & 3, L.Z = S[N + 0] >> 2 & 3, L.Lc = S[N + 0] >> 4 & 3, N = S[N + 0] >> 6 & 3, 0 > L.$a || 1 < L.$a || 4 <= L.Z || 1 < L.Lc || N) u = 0;
            else if (mA.put = Or, mA.ac = dt, mA.bc = Dr, mA.ma = L, mA.width = u.width, mA.height = u.height, mA.Da = u.Da, mA.v = u.v, mA.va = u.va, mA.j = u.j, mA.o = u.o, L.$a) A: {
              A(L.$a == 1), u = Ar();
              e: for (; ; ) {
                if (u == null) {
                  u = 0;
                  break A;
                }
                if (A(L != null), L.mc = u, u.c = L.c, u.i = L.i, u.l = L.l, u.l.ma = L, u.l.width = L.c, u.l.height = L.i, u.a = 0, oA(u.m, S, uA, rA), !Pr(L.c, L.i, 1, u, null) || (u.ab == 1 && u.gc[0].hc == 3 && en(u.s) ? (L.ic = 1, S = u.c * u.i, u.Ta = null, u.Ua = 0, u.V = i(S), u.Ba = 0, u.V == null ? (u.a = 1, u = 0) : u = 1) : (L.ic = 0, u = Zn(u, L.c)), !u)) break e;
                u = 1;
                break A;
              }
              L.mc = null, u = 0;
            }
            else u = rA >= L.c * L.i;
            L = !u;
          }
          if (L) return null;
          o.ga.Lc != 1 ? o.Ga = 0 : v = U - h;
        }
        A(o.ga != null), A(h + v <= U);
        A: {
          if (u = (S = o.ga).c, U = S.l.o, S.$a == 0) {
            if (uA = o.rc, rA = o.Vc, mA = o.Fa, N = o.P + 1 + h * u, k = o.mb, Z = o.nb + h * u, A(N <= o.P + o.qc), S.Z != 0) for (A(En[S.Z] != null), L = 0; L < v; ++L) En[S.Z](uA, rA, mA, N, k, Z, u), uA = k, rA = Z, Z += u, N += u;
            else for (L = 0; L < v; ++L) r(k, Z, mA, N, u), uA = k, rA = Z, Z += u, N += u;
            o.rc = uA, o.Vc = rA;
          } else {
            if (A(S.mc != null), u = h + v, A((L = S.mc) != null), A(u <= L.i), L.C >= u) u = 1;
            else if (S.ic || aA(), S.ic) {
              S = L.V, uA = L.Ba, rA = L.c;
              var gA = L.i, AA = (mA = 1, N = L.$ / rA, k = L.$ % rA, Z = L.m, lA = L.s, L.$), tA = rA * gA, wA = rA * u, bA = lA.wc, vA = AA < wA ? Ze(lA, k, N) : null;
              A(AA <= tA), A(u <= gA), A(en(lA));
              e: for (; ; ) {
                for (; !Z.h && AA < wA; ) {
                  if (k & bA || (vA = Ze(lA, k, N)), A(vA != null), eA(Z), 256 > (gA = Ot(vA.G[0], vA.H[0], Z))) S[uA + AA] = gA, ++AA, ++k >= rA && (k = 0, ++N <= u && !(N % 16) && mr(L, N));
                  else {
                    if (!(280 > gA)) {
                      mA = 0;
                      break e;
                    }
                    gA = wr(gA - 256, Z);
                    var MA, NA = Ot(vA.G[4], vA.H[4], Z);
                    if (eA(Z), !(AA >= (NA = Tr(rA, NA = wr(NA, Z))) && tA - AA >= gA)) {
                      mA = 0;
                      break e;
                    }
                    for (MA = 0; MA < gA; ++MA) S[uA + AA + MA] = S[uA + AA + MA - NA];
                    for (AA += gA, k += gA; k >= rA; ) k -= rA, ++N <= u && !(N % 16) && mr(L, N);
                    AA < wA && k & bA && (vA = Ze(lA, k, N));
                  }
                  A(Z.h == z(Z));
                }
                mr(L, N > u ? u : N);
                break e;
              }
              !mA || Z.h && AA < tA ? (mA = 0, L.a = Z.h ? 5 : 3) : L.$ = AA, u = mA;
            } else u = yr(L, L.V, L.Ba, L.c, L.i, u, Qi);
            if (!u) {
              v = 0;
              break A;
            }
          }
          h + v >= U && (o.Cc = 1), v = 1;
        }
        if (!v) return null;
        if (o.Cc && ((v = o.ga) != null && (v.mc = null), o.ga = null, 0 < o.Ga)) return alert("todo:WebPDequantizeLevels"), null;
      }
      return o.nb + h * F;
    }
    function c(o, u, h, v, F, U) {
      for (; 0 < F--; ) {
        var L, S = o, N = u + (h ? 1 : 0), k = o, Z = u + (h ? 0 : 3);
        for (L = 0; L < v; ++L) {
          var lA = k[Z + 4 * L];
          lA != 255 && (lA *= 32897, S[N + 4 * L + 0] = S[N + 4 * L + 0] * lA >> 23, S[N + 4 * L + 1] = S[N + 4 * L + 1] * lA >> 23, S[N + 4 * L + 2] = S[N + 4 * L + 2] * lA >> 23);
        }
        u += U;
      }
    }
    function Q(o, u, h, v, F) {
      for (; 0 < v--; ) {
        var U;
        for (U = 0; U < h; ++U) {
          var L = o[u + 2 * U + 0], S = 15 & (k = o[u + 2 * U + 1]), N = 4369 * S, k = (240 & k | k >> 4) * N >> 16;
          o[u + 2 * U + 0] = (240 & L | L >> 4) * N >> 16 & 240 | (15 & L | L << 4) * N >> 16 >> 4 & 15, o[u + 2 * U + 1] = 240 & k | S;
        }
        u += F;
      }
    }
    function G(o, u, h, v, F, U, L, S) {
      var N, k, Z = 255;
      for (k = 0; k < F; ++k) {
        for (N = 0; N < v; ++N) {
          var lA = o[u + N];
          U[L + 4 * N] = lA, Z &= lA;
        }
        u += h, L += S;
      }
      return Z != 255;
    }
    function J(o, u, h, v, F) {
      var U;
      for (U = 0; U < F; ++U) h[v + U] = o[u + U] >> 8;
    }
    function aA() {
      nr = c, Ie = Q, _e = G, qe = J;
    }
    function BA(o, u, h) {
      D[o] = function(v, F, U, L, S, N, k, Z, lA, uA, rA, mA, gA, AA, tA, wA, bA) {
        var vA, MA = bA - 1 >> 1, NA = S[N + 0] | k[Z + 0] << 16, VA = lA[uA + 0] | rA[mA + 0] << 16;
        A(v != null);
        var DA = 3 * NA + VA + 131074 >> 2;
        for (u(v[F + 0], 255 & DA, DA >> 16, gA, AA), U != null && (DA = 3 * VA + NA + 131074 >> 2, u(U[L + 0], 255 & DA, DA >> 16, tA, wA)), vA = 1; vA <= MA; ++vA) {
          var pe = S[N + vA] | k[Z + vA] << 16, be = lA[uA + vA] | rA[mA + vA] << 16, he = NA + pe + VA + be + 524296, oe = he + 2 * (pe + VA) >> 3;
          DA = oe + NA >> 1, NA = (he = he + 2 * (NA + be) >> 3) + pe >> 1, u(v[F + 2 * vA - 1], 255 & DA, DA >> 16, gA, AA + (2 * vA - 1) * h), u(v[F + 2 * vA - 0], 255 & NA, NA >> 16, gA, AA + (2 * vA - 0) * h), U != null && (DA = he + VA >> 1, NA = oe + be >> 1, u(U[L + 2 * vA - 1], 255 & DA, DA >> 16, tA, wA + (2 * vA - 1) * h), u(U[L + 2 * vA + 0], 255 & NA, NA >> 16, tA, wA + (2 * vA + 0) * h)), NA = pe, VA = be;
        }
        1 & bA || (DA = 3 * NA + VA + 131074 >> 2, u(v[F + bA - 1], 255 & DA, DA >> 16, gA, AA + (bA - 1) * h), U != null && (DA = 3 * VA + NA + 131074 >> 2, u(U[L + bA - 1], 255 & DA, DA >> 16, tA, wA + (bA - 1) * h)));
      };
    }
    function FA() {
      ar[ys] = pp, ar[bs] = _h, ar[Eh] = Bp, ar[Cs] = Nh, ar[Fs] = Hh, ar[Ku] = Oh, ar[xh] = wp, ar[ju] = _h, ar[Gu] = Nh, ar[Qs] = Hh, ar[Vu] = Oh;
    }
    function PA(o) {
      return o & -16384 ? 0 > o ? 0 : 255 : o >> vp;
    }
    function GA(o, u) {
      return PA((19077 * o >> 8) + (26149 * u >> 8) - 14234);
    }
    function te(o, u, h) {
      return PA((19077 * o >> 8) - (6419 * u >> 8) - (13320 * h >> 8) + 8708);
    }
    function Ae(o, u) {
      return PA((19077 * o >> 8) + (33050 * u >> 8) - 17685);
    }
    function ce(o, u, h, v, F) {
      v[F + 0] = GA(o, h), v[F + 1] = te(o, u, h), v[F + 2] = Ae(o, u);
    }
    function ke(o, u, h, v, F) {
      v[F + 0] = Ae(o, u), v[F + 1] = te(o, u, h), v[F + 2] = GA(o, h);
    }
    function Re(o, u, h, v, F) {
      var U = te(o, u, h);
      u = U << 3 & 224 | Ae(o, u) >> 3, v[F + 0] = 248 & GA(o, h) | U >> 5, v[F + 1] = u;
    }
    function At(o, u, h, v, F) {
      var U = 240 & Ae(o, u) | 15;
      v[F + 0] = 240 & GA(o, h) | te(o, u, h) >> 4, v[F + 1] = U;
    }
    function yt(o, u, h, v, F) {
      v[F + 0] = 255, ce(o, u, h, v, F + 1);
    }
    function lt(o, u, h, v, F) {
      ke(o, u, h, v, F), v[F + 3] = 255;
    }
    function Fr(o, u, h, v, F) {
      ce(o, u, h, v, F), v[F + 3] = 255;
    }
    function Vt(o, u) {
      return 0 > o ? 0 : o > u ? u : o;
    }
    function Kr(o, u, h) {
      D[o] = function(v, F, U, L, S, N, k, Z, lA) {
        for (var uA = Z + (-2 & lA) * h; Z != uA; ) u(v[F + 0], U[L + 0], S[N + 0], k, Z), u(v[F + 1], U[L + 0], S[N + 0], k, Z + h), F += 2, ++L, ++N, Z += 2 * h;
        1 & lA && u(v[F + 0], U[L + 0], S[N + 0], k, Z);
      };
    }
    function ds(o, u, h) {
      return h == 0 ? o == 0 ? u == 0 ? 6 : 5 : u == 0 ? 4 : 0 : h;
    }
    function Xa(o, u, h, v, F) {
      switch (o >>> 30) {
        case 3:
          on(u, h, v, F, 0);
          break;
        case 2:
          ze(u, h, v, F);
          break;
        case 1:
          St(u, h, v, F);
      }
    }
    function $a(o, u) {
      var h, v, F = u.M, U = u.Nb, L = o.oc, S = o.pc + 40, N = o.oc, k = o.pc + 584, Z = o.oc, lA = o.pc + 600;
      for (h = 0; 16 > h; ++h) L[S + 32 * h - 1] = 129;
      for (h = 0; 8 > h; ++h) N[k + 32 * h - 1] = 129, Z[lA + 32 * h - 1] = 129;
      for (0 < F ? L[S - 1 - 32] = N[k - 1 - 32] = Z[lA - 1 - 32] = 129 : (n(L, S - 32 - 1, 127, 21), n(N, k - 32 - 1, 127, 9), n(Z, lA - 32 - 1, 127, 9)), v = 0; v < o.za; ++v) {
        var uA = u.ya[u.aa + v];
        if (0 < v) {
          for (h = -1; 16 > h; ++h) r(L, S + 32 * h - 4, L, S + 32 * h + 12, 4);
          for (h = -1; 8 > h; ++h) r(N, k + 32 * h - 4, N, k + 32 * h + 4, 4), r(Z, lA + 32 * h - 4, Z, lA + 32 * h + 4, 4);
        }
        var rA = o.Gd, mA = o.Hd + v, gA = uA.ad, AA = uA.Hc;
        if (0 < F && (r(L, S - 32, rA[mA].y, 0, 16), r(N, k - 32, rA[mA].f, 0, 8), r(Z, lA - 32, rA[mA].ea, 0, 8)), uA.Za) {
          var tA = L, wA = S - 32 + 16;
          for (0 < F && (v >= o.za - 1 ? n(tA, wA, rA[mA].y[15], 4) : r(tA, wA, rA[mA + 1].y, 0, 4)), h = 0; 4 > h; h++) tA[wA + 128 + h] = tA[wA + 256 + h] = tA[wA + 384 + h] = tA[wA + 0 + h];
          for (h = 0; 16 > h; ++h, AA <<= 2) tA = L, wA = S + Th[h], Qr[uA.Ob[h]](tA, wA), Xa(AA, gA, 16 * +h, tA, wA);
        } else if (tA = ds(v, F, uA.Ob[0]), Un[tA](L, S), AA != 0) for (h = 0; 16 > h; ++h, AA <<= 2) Xa(AA, gA, 16 * +h, L, S + Th[h]);
        for (h = uA.Gc, tA = ds(v, F, uA.Dd), ln[tA](N, k), ln[tA](Z, lA), AA = gA, tA = N, wA = k, 255 & (uA = h >> 0) && (170 & uA ? eo(AA, 256, tA, wA) : tr(AA, 256, tA, wA)), uA = Z, AA = lA, 255 & (h >>= 8) && (170 & h ? eo(gA, 320, uA, AA) : tr(gA, 320, uA, AA)), F < o.Ub - 1 && (r(rA[mA].y, 0, L, S + 480, 16), r(rA[mA].f, 0, N, k + 224, 8), r(rA[mA].ea, 0, Z, lA + 224, 8)), h = 8 * U * o.B, rA = o.sa, mA = o.ta + 16 * v + 16 * U * o.R, gA = o.qa, uA = o.ra + 8 * v + h, AA = o.Ha, tA = o.Ia + 8 * v + h, h = 0; 16 > h; ++h) r(rA, mA + h * o.R, L, S + 32 * h, 16);
        for (h = 0; 8 > h; ++h) r(gA, uA + h * o.B, N, k + 32 * h, 8), r(AA, tA + h * o.B, Z, lA + 32 * h, 8);
      }
    }
    function Pi(o, u, h, v, F, U, L, S, N) {
      var k = [0], Z = [0], lA = 0, uA = N != null ? N.kd : 0, rA = N ?? new Va();
      if (o == null || 12 > h) return 7;
      rA.data = o, rA.w = u, rA.ha = h, u = [u], h = [h], rA.gb = [rA.gb];
      A: {
        var mA = u, gA = h, AA = rA.gb;
        if (A(o != null), A(gA != null), A(AA != null), AA[0] = 0, 12 <= gA[0] && !t(o, mA[0], "RIFF")) {
          if (t(o, mA[0] + 8, "WEBP")) {
            AA = 3;
            break A;
          }
          var tA = HA(o, mA[0] + 4);
          if (12 > tA || 4294967286 < tA) {
            AA = 3;
            break A;
          }
          if (uA && tA > gA[0] - 8) {
            AA = 7;
            break A;
          }
          AA[0] = tA, mA[0] += 12, gA[0] -= 12;
        }
        AA = 0;
      }
      if (AA != 0) return AA;
      for (tA = 0 < rA.gb[0], h = h[0]; ; ) {
        A: {
          var wA = o;
          gA = u, AA = h;
          var bA = k, vA = Z, MA = mA = [0];
          if ((DA = lA = [lA])[0] = 0, 8 > AA[0]) AA = 7;
          else {
            if (!t(wA, gA[0], "VP8X")) {
              if (HA(wA, gA[0] + 4) != 10) {
                AA = 3;
                break A;
              }
              if (18 > AA[0]) {
                AA = 7;
                break A;
              }
              var NA = HA(wA, gA[0] + 8), VA = 1 + OA(wA, gA[0] + 12);
              if (2147483648 <= VA * (wA = 1 + OA(wA, gA[0] + 15))) {
                AA = 3;
                break A;
              }
              MA != null && (MA[0] = NA), bA != null && (bA[0] = VA), vA != null && (vA[0] = wA), gA[0] += 18, AA[0] -= 18, DA[0] = 1;
            }
            AA = 0;
          }
        }
        if (lA = lA[0], mA = mA[0], AA != 0) return AA;
        if (gA = !!(2 & mA), !tA && lA) return 3;
        if (U != null && (U[0] = !!(16 & mA)), L != null && (L[0] = gA), S != null && (S[0] = 0), L = k[0], mA = Z[0], lA && gA && N == null) {
          AA = 0;
          break;
        }
        if (4 > h) {
          AA = 7;
          break;
        }
        if (tA && lA || !tA && !lA && !t(o, u[0], "ALPH")) {
          h = [h], rA.na = [rA.na], rA.P = [rA.P], rA.Sa = [rA.Sa];
          A: {
            NA = o, AA = u, tA = h;
            var DA = rA.gb;
            bA = rA.na, vA = rA.P, MA = rA.Sa, VA = 22, A(NA != null), A(tA != null), wA = AA[0];
            var pe = tA[0];
            for (A(bA != null), A(MA != null), bA[0] = null, vA[0] = null, MA[0] = 0; ; ) {
              if (AA[0] = wA, tA[0] = pe, 8 > pe) {
                AA = 7;
                break A;
              }
              var be = HA(NA, wA + 4);
              if (4294967286 < be) {
                AA = 3;
                break A;
              }
              var he = 8 + be + 1 & -2;
              if (VA += he, 0 < DA && VA > DA) {
                AA = 3;
                break A;
              }
              if (!t(NA, wA, "VP8 ") || !t(NA, wA, "VP8L")) {
                AA = 0;
                break A;
              }
              if (pe[0] < he) {
                AA = 7;
                break A;
              }
              t(NA, wA, "ALPH") || (bA[0] = NA, vA[0] = wA + 8, MA[0] = be), wA += he, pe -= he;
            }
          }
          if (h = h[0], rA.na = rA.na[0], rA.P = rA.P[0], rA.Sa = rA.Sa[0], AA != 0) break;
        }
        h = [h], rA.Ja = [rA.Ja], rA.xa = [rA.xa];
        A: if (DA = o, AA = u, tA = h, bA = rA.gb[0], vA = rA.Ja, MA = rA.xa, NA = AA[0], wA = !t(DA, NA, "VP8 "), VA = !t(DA, NA, "VP8L"), A(DA != null), A(tA != null), A(vA != null), A(MA != null), 8 > tA[0]) AA = 7;
        else {
          if (wA || VA) {
            if (DA = HA(DA, NA + 4), 12 <= bA && DA > bA - 12) {
              AA = 3;
              break A;
            }
            if (uA && DA > tA[0] - 8) {
              AA = 7;
              break A;
            }
            vA[0] = DA, AA[0] += 8, tA[0] -= 8, MA[0] = VA;
          } else MA[0] = 5 <= tA[0] && DA[NA + 0] == 47 && !(DA[NA + 4] >> 5), vA[0] = tA[0];
          AA = 0;
        }
        if (h = h[0], rA.Ja = rA.Ja[0], rA.xa = rA.xa[0], u = u[0], AA != 0) break;
        if (4294967286 < rA.Ja) return 3;
        if (S == null || gA || (S[0] = rA.xa ? 2 : 1), L = [L], mA = [mA], rA.xa) {
          if (5 > h) {
            AA = 7;
            break;
          }
          S = L, uA = mA, gA = U, o == null || 5 > h ? o = 0 : 5 <= h && o[u + 0] == 47 && !(o[u + 4] >> 5) ? (tA = [0], DA = [0], bA = [0], oA(vA = new E(), o, u, h), qA(vA, tA, DA, bA) ? (S != null && (S[0] = tA[0]), uA != null && (uA[0] = DA[0]), gA != null && (gA[0] = bA[0]), o = 1) : o = 0) : o = 0;
        } else {
          if (10 > h) {
            AA = 7;
            break;
          }
          S = mA, o == null || 10 > h || !Yo(o, u + 3, h - 3) ? o = 0 : (uA = o[u + 0] | o[u + 1] << 8 | o[u + 2] << 16, gA = 16383 & (o[u + 7] << 8 | o[u + 6]), o = 16383 & (o[u + 9] << 8 | o[u + 8]), 1 & uA || 3 < (uA >> 1 & 7) || !(uA >> 4 & 1) || uA >> 5 >= rA.Ja || !gA || !o ? o = 0 : (L && (L[0] = gA), S && (S[0] = o), o = 1));
        }
        if (!o || (L = L[0], mA = mA[0], lA && (k[0] != L || Z[0] != mA))) return 3;
        N != null && (N[0] = rA, N.offset = u - N.w, A(4294967286 > u - N.w), A(N.offset == N.ha - h));
        break;
      }
      return AA == 0 || AA == 7 && lA && N == null ? (U != null && (U[0] |= rA.na != null && 0 < rA.na.length), v != null && (v[0] = L), F != null && (F[0] = mA), 0) : AA;
    }
    function Ja(o, u, h) {
      var v = u.width, F = u.height, U = 0, L = 0, S = v, N = F;
      if (u.Da = o != null && 0 < o.Da, u.Da && (S = o.cd, N = o.bd, U = o.v, L = o.j, 11 > h || (U &= -2, L &= -2), 0 > U || 0 > L || 0 >= S || 0 >= N || U + S > v || L + N > F)) return 0;
      if (u.v = U, u.j = L, u.va = U + S, u.o = L + N, u.U = S, u.T = N, u.da = o != null && 0 < o.da, u.da) {
        if (!CA(S, N, h = [o.ib], U = [o.hb])) return 0;
        u.ib = h[0], u.hb = U[0];
      }
      return u.ob = o != null && o.ob, u.Kb = o == null || !o.Sd, u.da && (u.ob = u.ib < 3 * v / 4 && u.hb < 3 * F / 4, u.Kb = 0), 1;
    }
    function Ya(o) {
      if (o == null) return 2;
      if (11 > o.S) {
        var u = o.f.RGBA;
        u.fb += (o.height - 1) * u.A, u.A = -u.A;
      } else u = o.f.kb, o = o.height, u.O += (o - 1) * u.fa, u.fa = -u.fa, u.N += (o - 1 >> 1) * u.Ab, u.Ab = -u.Ab, u.W += (o - 1 >> 1) * u.Db, u.Db = -u.Db, u.F != null && (u.J += (o - 1) * u.lb, u.lb = -u.lb);
      return 0;
    }
    function Mi(o, u, h, v) {
      if (v == null || 0 >= o || 0 >= u) return 2;
      if (h != null) {
        if (h.Da) {
          var F = h.cd, U = h.bd, L = -2 & h.v, S = -2 & h.j;
          if (0 > L || 0 > S || 0 >= F || 0 >= U || L + F > o || S + U > u) return 2;
          o = F, u = U;
        }
        if (h.da) {
          if (!CA(o, u, F = [h.ib], U = [h.hb])) return 2;
          o = F[0], u = U[0];
        }
      }
      v.width = o, v.height = u;
      A: {
        var N = v.width, k = v.height;
        if (o = v.S, 0 >= N || 0 >= k || !(o >= ys && 13 > o)) o = 2;
        else {
          if (0 >= v.Rd && v.sd == null) {
            L = U = F = u = 0;
            var Z = (S = N * kh[o]) * k;
            if (11 > o || (U = (k + 1) / 2 * (u = (N + 1) / 2), o == 12 && (L = (F = N) * k)), (k = i(Z + 2 * U + L)) == null) {
              o = 1;
              break A;
            }
            v.sd = k, 11 > o ? ((N = v.f.RGBA).eb = k, N.fb = 0, N.A = S, N.size = Z) : ((N = v.f.kb).y = k, N.O = 0, N.fa = S, N.Fd = Z, N.f = k, N.N = 0 + Z, N.Ab = u, N.Cd = U, N.ea = k, N.W = 0 + Z + U, N.Db = u, N.Ed = U, o == 12 && (N.F = k, N.J = 0 + Z + 2 * U), N.Tc = L, N.lb = F);
          }
          if (u = 1, F = v.S, U = v.width, L = v.height, F >= ys && 13 > F) if (11 > F) o = v.f.RGBA, u &= (S = Math.abs(o.A)) * (L - 1) + U <= o.size, u &= S >= U * kh[F], u &= o.eb != null;
          else {
            o = v.f.kb, S = (U + 1) / 2, Z = (L + 1) / 2, N = Math.abs(o.fa), k = Math.abs(o.Ab);
            var lA = Math.abs(o.Db), uA = Math.abs(o.lb), rA = uA * (L - 1) + U;
            u &= N * (L - 1) + U <= o.Fd, u &= k * (Z - 1) + S <= o.Cd, u = (u &= lA * (Z - 1) + S <= o.Ed) & N >= U & k >= S & lA >= S, u &= o.y != null, u &= o.f != null, u &= o.ea != null, F == 12 && (u &= uA >= U, u &= rA <= o.Tc, u &= o.F != null);
          }
          else u = 0;
          o = u ? 0 : 2;
        }
      }
      return o != 0 || h != null && h.fd && (o = Ya(v)), o;
    }
    var gt = 64, Ri = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215], Ki = 24, ji = 32, Za = 8, Tt = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    $("Predictor0", "PredictorAdd0"), D.Predictor0 = function() {
      return 4278190080;
    }, D.Predictor1 = function(o) {
      return o;
    }, D.Predictor2 = function(o, u, h) {
      return u[h + 0];
    }, D.Predictor3 = function(o, u, h) {
      return u[h + 1];
    }, D.Predictor4 = function(o, u, h) {
      return u[h - 1];
    }, D.Predictor5 = function(o, u, h) {
      return SA(SA(o, u[h + 1]), u[h + 0]);
    }, D.Predictor6 = function(o, u, h) {
      return SA(o, u[h - 1]);
    }, D.Predictor7 = function(o, u, h) {
      return SA(o, u[h + 0]);
    }, D.Predictor8 = function(o, u, h) {
      return SA(u[h - 1], u[h + 0]);
    }, D.Predictor9 = function(o, u, h) {
      return SA(u[h + 0], u[h + 1]);
    }, D.Predictor10 = function(o, u, h) {
      return SA(SA(o, u[h - 1]), SA(u[h + 0], u[h + 1]));
    }, D.Predictor11 = function(o, u, h) {
      var v = u[h + 0];
      return 0 >= ne(v >> 24 & 255, o >> 24 & 255, (u = u[h - 1]) >> 24 & 255) + ne(v >> 16 & 255, o >> 16 & 255, u >> 16 & 255) + ne(v >> 8 & 255, o >> 8 & 255, u >> 8 & 255) + ne(255 & v, 255 & o, 255 & u) ? v : o;
    }, D.Predictor12 = function(o, u, h) {
      var v = u[h + 0];
      return (KA((o >> 24 & 255) + (v >> 24 & 255) - ((u = u[h - 1]) >> 24 & 255)) << 24 | KA((o >> 16 & 255) + (v >> 16 & 255) - (u >> 16 & 255)) << 16 | KA((o >> 8 & 255) + (v >> 8 & 255) - (u >> 8 & 255)) << 8 | KA((255 & o) + (255 & v) - (255 & u))) >>> 0;
    }, D.Predictor13 = function(o, u, h) {
      var v = u[h - 1];
      return ($A((o = SA(o, u[h + 0])) >> 24 & 255, v >> 24 & 255) << 24 | $A(o >> 16 & 255, v >> 16 & 255) << 16 | $A(o >> 8 & 255, v >> 8 & 255) << 8 | $A(o >> 0 & 255, v >> 0 & 255)) >>> 0;
    };
    var Mu = D.PredictorAdd0;
    D.PredictorAdd1 = ie, $("Predictor2", "PredictorAdd2"), $("Predictor3", "PredictorAdd3"), $("Predictor4", "PredictorAdd4"), $("Predictor5", "PredictorAdd5"), $("Predictor6", "PredictorAdd6"), $("Predictor7", "PredictorAdd7"), $("Predictor8", "PredictorAdd8"), $("Predictor9", "PredictorAdd9"), $("Predictor10", "PredictorAdd10"), $("Predictor11", "PredictorAdd11"), $("Predictor12", "PredictorAdd12"), $("Predictor13", "PredictorAdd13");
    var Ao = D.PredictorAdd2;
    ae("ColorIndexInverseTransform", "MapARGB", "32b", function(o) {
      return o >> 8 & 255;
    }, function(o) {
      return o;
    }), ae("VP8LColorIndexInverseTransformAlpha", "MapAlpha", "8b", function(o) {
      return o;
    }, function(o) {
      return o >> 8 & 255;
    });
    var gs, er = D.ColorIndexInverseTransform, Gi = D.MapARGB, ps = D.VP8LColorIndexInverseTransformAlpha, Bs = D.MapAlpha, bn = D.VP8LPredictorsAdd = [];
    bn.length = 16, (D.VP8LPredictors = []).length = 16, (D.VP8LPredictorsAdd_C = []).length = 16, (D.VP8LPredictors_C = []).length = 16;
    var ni, kt, Lt, Cn, nn, an, Vi, on, ze, eo, St, tr, zi, ws, to, ii, ai, Fn, oi, qi, si, Qn, ro, rr, nr, Ie, _e, qe, ot = i(511), sn = i(2041), no = i(225), Wi = i(767), vs = 0, Ru = sn, ms = no, zt = Wi, ir = ot, ys = 0, bs = 1, Eh = 2, Cs = 3, Fs = 4, Ku = 5, xh = 6, ju = 7, Gu = 8, Qs = 9, Vu = 10, tp = [2, 3, 7], rp = [3, 3, 11], Lh = [280, 256, 256, 256, 40], np = [0, 1, 1, 1, 0], ip = [17, 18, 0, 1, 2, 3, 4, 5, 16, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], ap = [24, 7, 23, 25, 40, 6, 39, 41, 22, 26, 38, 42, 56, 5, 55, 57, 21, 27, 54, 58, 37, 43, 72, 4, 71, 73, 20, 28, 53, 59, 70, 74, 36, 44, 88, 69, 75, 52, 60, 3, 87, 89, 19, 29, 86, 90, 35, 45, 68, 76, 85, 91, 51, 61, 104, 2, 103, 105, 18, 30, 102, 106, 34, 46, 84, 92, 67, 77, 101, 107, 50, 62, 120, 1, 119, 121, 83, 93, 17, 31, 100, 108, 66, 78, 118, 122, 33, 47, 117, 123, 49, 63, 99, 109, 82, 94, 0, 116, 124, 65, 79, 16, 32, 98, 110, 48, 115, 125, 81, 95, 64, 114, 126, 97, 111, 80, 113, 127, 96, 112], op = [2954, 2956, 2958, 2962, 2970, 2986, 3018, 3082, 3212, 3468, 3980, 5004], sp = 8, zu = [4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 17, 18, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 93, 95, 96, 98, 100, 101, 102, 104, 106, 108, 110, 112, 114, 116, 118, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 143, 145, 148, 151, 154, 157], qu = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 234, 239, 245, 249, 254, 259, 264, 269, 274, 279, 284], io = null, lp = [[173, 148, 140, 0], [176, 155, 140, 135, 0], [180, 157, 141, 134, 130, 0], [254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 0]], up = [0, 1, 4, 8, 5, 2, 3, 6, 9, 12, 13, 10, 7, 11, 14, 15], Sh = [-0, 1, -1, 2, -2, 3, 4, 6, -3, 5, -4, -5, -6, 7, -7, 8, -8, -9], cp = [[[[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]], [[253, 136, 254, 255, 228, 219, 128, 128, 128, 128, 128], [189, 129, 242, 255, 227, 213, 255, 219, 128, 128, 128], [106, 126, 227, 252, 214, 209, 255, 255, 128, 128, 128]], [[1, 98, 248, 255, 236, 226, 255, 255, 128, 128, 128], [181, 133, 238, 254, 221, 234, 255, 154, 128, 128, 128], [78, 134, 202, 247, 198, 180, 255, 219, 128, 128, 128]], [[1, 185, 249, 255, 243, 255, 128, 128, 128, 128, 128], [184, 150, 247, 255, 236, 224, 128, 128, 128, 128, 128], [77, 110, 216, 255, 236, 230, 128, 128, 128, 128, 128]], [[1, 101, 251, 255, 241, 255, 128, 128, 128, 128, 128], [170, 139, 241, 252, 236, 209, 255, 255, 128, 128, 128], [37, 116, 196, 243, 228, 255, 255, 255, 128, 128, 128]], [[1, 204, 254, 255, 245, 255, 128, 128, 128, 128, 128], [207, 160, 250, 255, 238, 128, 128, 128, 128, 128, 128], [102, 103, 231, 255, 211, 171, 128, 128, 128, 128, 128]], [[1, 152, 252, 255, 240, 255, 128, 128, 128, 128, 128], [177, 135, 243, 255, 234, 225, 128, 128, 128, 128, 128], [80, 129, 211, 255, 194, 224, 128, 128, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [246, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [255, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[198, 35, 237, 223, 193, 187, 162, 160, 145, 155, 62], [131, 45, 198, 221, 172, 176, 220, 157, 252, 221, 1], [68, 47, 146, 208, 149, 167, 221, 162, 255, 223, 128]], [[1, 149, 241, 255, 221, 224, 255, 255, 128, 128, 128], [184, 141, 234, 253, 222, 220, 255, 199, 128, 128, 128], [81, 99, 181, 242, 176, 190, 249, 202, 255, 255, 128]], [[1, 129, 232, 253, 214, 197, 242, 196, 255, 255, 128], [99, 121, 210, 250, 201, 198, 255, 202, 128, 128, 128], [23, 91, 163, 242, 170, 187, 247, 210, 255, 255, 128]], [[1, 200, 246, 255, 234, 255, 128, 128, 128, 128, 128], [109, 178, 241, 255, 231, 245, 255, 255, 128, 128, 128], [44, 130, 201, 253, 205, 192, 255, 255, 128, 128, 128]], [[1, 132, 239, 251, 219, 209, 255, 165, 128, 128, 128], [94, 136, 225, 251, 218, 190, 255, 255, 128, 128, 128], [22, 100, 174, 245, 186, 161, 255, 199, 128, 128, 128]], [[1, 182, 249, 255, 232, 235, 128, 128, 128, 128, 128], [124, 143, 241, 255, 227, 234, 128, 128, 128, 128, 128], [35, 77, 181, 251, 193, 211, 255, 205, 128, 128, 128]], [[1, 157, 247, 255, 236, 231, 255, 255, 128, 128, 128], [121, 141, 235, 255, 225, 227, 255, 255, 128, 128, 128], [45, 99, 188, 251, 195, 217, 255, 224, 128, 128, 128]], [[1, 1, 251, 255, 213, 255, 128, 128, 128, 128, 128], [203, 1, 248, 255, 255, 128, 128, 128, 128, 128, 128], [137, 1, 177, 255, 224, 255, 128, 128, 128, 128, 128]]], [[[253, 9, 248, 251, 207, 208, 255, 192, 128, 128, 128], [175, 13, 224, 243, 193, 185, 249, 198, 255, 255, 128], [73, 17, 171, 221, 161, 179, 236, 167, 255, 234, 128]], [[1, 95, 247, 253, 212, 183, 255, 255, 128, 128, 128], [239, 90, 244, 250, 211, 209, 255, 255, 128, 128, 128], [155, 77, 195, 248, 188, 195, 255, 255, 128, 128, 128]], [[1, 24, 239, 251, 218, 219, 255, 205, 128, 128, 128], [201, 51, 219, 255, 196, 186, 128, 128, 128, 128, 128], [69, 46, 190, 239, 201, 218, 255, 228, 128, 128, 128]], [[1, 191, 251, 255, 255, 128, 128, 128, 128, 128, 128], [223, 165, 249, 255, 213, 255, 128, 128, 128, 128, 128], [141, 124, 248, 255, 255, 128, 128, 128, 128, 128, 128]], [[1, 16, 248, 255, 255, 128, 128, 128, 128, 128, 128], [190, 36, 230, 255, 236, 255, 128, 128, 128, 128, 128], [149, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 226, 255, 128, 128, 128, 128, 128, 128, 128, 128], [247, 192, 255, 128, 128, 128, 128, 128, 128, 128, 128], [240, 128, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[1, 134, 252, 255, 255, 128, 128, 128, 128, 128, 128], [213, 62, 250, 255, 255, 128, 128, 128, 128, 128, 128], [55, 93, 255, 128, 128, 128, 128, 128, 128, 128, 128]], [[128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128], [128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128]]], [[[202, 24, 213, 235, 186, 191, 220, 160, 240, 175, 255], [126, 38, 182, 232, 169, 184, 228, 174, 255, 187, 128], [61, 46, 138, 219, 151, 178, 240, 170, 255, 216, 128]], [[1, 112, 230, 250, 199, 191, 247, 159, 255, 255, 128], [166, 109, 228, 252, 211, 215, 255, 174, 128, 128, 128], [39, 77, 162, 232, 172, 180, 245, 178, 255, 255, 128]], [[1, 52, 220, 246, 198, 199, 249, 220, 255, 255, 128], [124, 74, 191, 243, 183, 193, 250, 221, 255, 255, 128], [24, 71, 130, 219, 154, 170, 243, 182, 255, 255, 128]], [[1, 182, 225, 249, 219, 240, 255, 224, 128, 128, 128], [149, 150, 226, 252, 216, 205, 255, 171, 128, 128, 128], [28, 108, 170, 242, 183, 194, 254, 223, 255, 255, 128]], [[1, 81, 230, 252, 204, 203, 255, 192, 128, 128, 128], [123, 102, 209, 247, 188, 196, 255, 233, 128, 128, 128], [20, 95, 153, 243, 164, 173, 255, 203, 128, 128, 128]], [[1, 222, 248, 255, 216, 213, 128, 128, 128, 128, 128], [168, 175, 246, 252, 235, 205, 255, 255, 128, 128, 128], [47, 116, 215, 255, 211, 212, 255, 255, 128, 128, 128]], [[1, 121, 236, 253, 212, 214, 255, 255, 128, 128, 128], [141, 84, 213, 252, 201, 202, 255, 219, 128, 128, 128], [42, 80, 160, 240, 162, 185, 255, 205, 128, 128, 128]], [[1, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [244, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128], [238, 1, 255, 128, 128, 128, 128, 128, 128, 128, 128]]]], fp = [[[231, 120, 48, 89, 115, 113, 120, 152, 112], [152, 179, 64, 126, 170, 118, 46, 70, 95], [175, 69, 143, 80, 85, 82, 72, 155, 103], [56, 58, 10, 171, 218, 189, 17, 13, 152], [114, 26, 17, 163, 44, 195, 21, 10, 173], [121, 24, 80, 195, 26, 62, 44, 64, 85], [144, 71, 10, 38, 171, 213, 144, 34, 26], [170, 46, 55, 19, 136, 160, 33, 206, 71], [63, 20, 8, 114, 114, 208, 12, 9, 226], [81, 40, 11, 96, 182, 84, 29, 16, 36]], [[134, 183, 89, 137, 98, 101, 106, 165, 148], [72, 187, 100, 130, 157, 111, 32, 75, 80], [66, 102, 167, 99, 74, 62, 40, 234, 128], [41, 53, 9, 178, 241, 141, 26, 8, 107], [74, 43, 26, 146, 73, 166, 49, 23, 157], [65, 38, 105, 160, 51, 52, 31, 115, 128], [104, 79, 12, 27, 217, 255, 87, 17, 7], [87, 68, 71, 44, 114, 51, 15, 186, 23], [47, 41, 14, 110, 182, 183, 21, 17, 194], [66, 45, 25, 102, 197, 189, 23, 18, 22]], [[88, 88, 147, 150, 42, 46, 45, 196, 205], [43, 97, 183, 117, 85, 38, 35, 179, 61], [39, 53, 200, 87, 26, 21, 43, 232, 171], [56, 34, 51, 104, 114, 102, 29, 93, 77], [39, 28, 85, 171, 58, 165, 90, 98, 64], [34, 22, 116, 206, 23, 34, 43, 166, 73], [107, 54, 32, 26, 51, 1, 81, 43, 31], [68, 25, 106, 22, 64, 171, 36, 225, 114], [34, 19, 21, 102, 132, 188, 16, 76, 124], [62, 18, 78, 95, 85, 57, 50, 48, 51]], [[193, 101, 35, 159, 215, 111, 89, 46, 111], [60, 148, 31, 172, 219, 228, 21, 18, 111], [112, 113, 77, 85, 179, 255, 38, 120, 114], [40, 42, 1, 196, 245, 209, 10, 25, 109], [88, 43, 29, 140, 166, 213, 37, 43, 154], [61, 63, 30, 155, 67, 45, 68, 1, 209], [100, 80, 8, 43, 154, 1, 51, 26, 71], [142, 78, 78, 16, 255, 128, 34, 197, 171], [41, 40, 5, 102, 211, 183, 4, 1, 221], [51, 50, 17, 168, 209, 192, 23, 25, 82]], [[138, 31, 36, 171, 27, 166, 38, 44, 229], [67, 87, 58, 169, 82, 115, 26, 59, 179], [63, 59, 90, 180, 59, 166, 93, 73, 154], [40, 40, 21, 116, 143, 209, 34, 39, 175], [47, 15, 16, 183, 34, 223, 49, 45, 183], [46, 17, 33, 183, 6, 98, 15, 32, 183], [57, 46, 22, 24, 128, 1, 54, 17, 37], [65, 32, 73, 115, 28, 128, 23, 128, 205], [40, 3, 9, 115, 51, 192, 18, 6, 223], [87, 37, 9, 115, 59, 77, 64, 21, 47]], [[104, 55, 44, 218, 9, 54, 53, 130, 226], [64, 90, 70, 205, 40, 41, 23, 26, 57], [54, 57, 112, 184, 5, 41, 38, 166, 213], [30, 34, 26, 133, 152, 116, 10, 32, 134], [39, 19, 53, 221, 26, 114, 32, 73, 255], [31, 9, 65, 234, 2, 15, 1, 118, 73], [75, 32, 12, 51, 192, 255, 160, 43, 51], [88, 31, 35, 67, 102, 85, 55, 186, 85], [56, 21, 23, 111, 59, 205, 45, 37, 192], [55, 38, 70, 124, 73, 102, 1, 34, 98]], [[125, 98, 42, 88, 104, 85, 117, 175, 82], [95, 84, 53, 89, 128, 100, 113, 101, 45], [75, 79, 123, 47, 51, 128, 81, 171, 1], [57, 17, 5, 71, 102, 57, 53, 41, 49], [38, 33, 13, 121, 57, 73, 26, 1, 85], [41, 10, 67, 138, 77, 110, 90, 47, 114], [115, 21, 2, 10, 102, 255, 166, 23, 6], [101, 29, 16, 10, 85, 128, 101, 196, 26], [57, 18, 10, 102, 102, 213, 34, 20, 43], [117, 20, 15, 36, 163, 128, 68, 1, 26]], [[102, 61, 71, 37, 34, 53, 31, 243, 192], [69, 60, 71, 38, 73, 119, 28, 222, 37], [68, 45, 128, 34, 1, 47, 11, 245, 171], [62, 17, 19, 70, 146, 85, 55, 62, 70], [37, 43, 37, 154, 100, 163, 85, 160, 1], [63, 9, 92, 136, 28, 64, 32, 201, 85], [75, 15, 9, 9, 64, 255, 184, 119, 16], [86, 6, 28, 5, 64, 255, 25, 248, 1], [56, 8, 17, 132, 137, 255, 55, 116, 128], [58, 15, 20, 82, 135, 57, 26, 121, 40]], [[164, 50, 31, 137, 154, 133, 25, 35, 218], [51, 103, 44, 131, 131, 123, 31, 6, 158], [86, 40, 64, 135, 148, 224, 45, 183, 128], [22, 26, 17, 131, 240, 154, 14, 1, 209], [45, 16, 21, 91, 64, 222, 7, 1, 197], [56, 21, 39, 155, 60, 138, 23, 102, 213], [83, 12, 13, 54, 192, 255, 68, 47, 28], [85, 26, 85, 85, 128, 128, 32, 146, 171], [18, 11, 7, 63, 144, 171, 4, 4, 246], [35, 27, 10, 146, 174, 171, 12, 26, 128]], [[190, 80, 35, 99, 180, 80, 126, 54, 45], [85, 126, 47, 87, 176, 51, 41, 20, 32], [101, 75, 128, 139, 118, 146, 116, 128, 85], [56, 41, 15, 176, 236, 85, 37, 9, 62], [71, 30, 17, 119, 118, 255, 17, 18, 138], [101, 38, 60, 138, 55, 70, 43, 26, 142], [146, 36, 19, 30, 171, 255, 97, 27, 20], [138, 45, 61, 62, 219, 1, 81, 188, 64], [32, 41, 20, 117, 151, 142, 20, 21, 163], [112, 19, 12, 61, 195, 128, 48, 4, 24]]], hp = [[[[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[176, 246, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 241, 252, 255, 255, 255, 255, 255, 255, 255, 255], [249, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 244, 252, 255, 255, 255, 255, 255, 255, 255, 255], [234, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 246, 254, 255, 255, 255, 255, 255, 255, 255, 255], [239, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 254, 255, 255, 255, 255, 255, 255], [250, 255, 254, 255, 254, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[217, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [225, 252, 241, 253, 255, 255, 254, 255, 255, 255, 255], [234, 250, 241, 250, 253, 255, 253, 254, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [223, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [238, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 248, 254, 255, 255, 255, 255, 255, 255, 255, 255], [249, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255], [247, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[186, 251, 250, 255, 255, 255, 255, 255, 255, 255, 255], [234, 251, 244, 254, 255, 255, 255, 255, 255, 255, 255], [251, 251, 243, 253, 254, 255, 254, 255, 255, 255, 255]], [[255, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [236, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [251, 253, 253, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]], [[[248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [250, 254, 252, 254, 255, 255, 255, 255, 255, 255, 255], [248, 254, 249, 253, 255, 255, 255, 255, 255, 255, 255]], [[255, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [246, 253, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 254, 251, 254, 254, 255, 255, 255, 255, 255, 255]], [[255, 254, 252, 255, 255, 255, 255, 255, 255, 255, 255], [248, 254, 253, 255, 255, 255, 255, 255, 255, 255, 255], [253, 255, 254, 254, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [245, 251, 254, 255, 255, 255, 255, 255, 255, 255, 255], [253, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255], [252, 253, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255], [249, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 254, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255], [250, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]], [[255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]]]], dp = [0, 1, 2, 3, 6, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0], Un = [], Qr = [], ln = [], gp = 1, Ih = 2, En = [], ar = [];
    BA("UpsampleRgbLinePair", ce, 3), BA("UpsampleBgrLinePair", ke, 3), BA("UpsampleRgbaLinePair", Fr, 4), BA("UpsampleBgraLinePair", lt, 4), BA("UpsampleArgbLinePair", yt, 4), BA("UpsampleRgba4444LinePair", At, 2), BA("UpsampleRgb565LinePair", Re, 2);
    var pp = D.UpsampleRgbLinePair, Bp = D.UpsampleBgrLinePair, _h = D.UpsampleRgbaLinePair, Nh = D.UpsampleBgraLinePair, Hh = D.UpsampleArgbLinePair, Oh = D.UpsampleRgba4444LinePair, wp = D.UpsampleRgb565LinePair, Us = 16, Es = 1 << Us - 1, ao = -227, Wu = 482, vp = 6, Dh = 0, mp = i(256), yp = i(256), bp = i(256), Cp = i(256), Fp = i(Wu - ao), Qp = i(Wu - ao);
    Kr("YuvToRgbRow", ce, 3), Kr("YuvToBgrRow", ke, 3), Kr("YuvToRgbaRow", Fr, 4), Kr("YuvToBgraRow", lt, 4), Kr("YuvToArgbRow", yt, 4), Kr("YuvToRgba4444Row", At, 2), Kr("YuvToRgb565Row", Re, 2);
    var Th = [0, 4, 8, 12, 128, 132, 136, 140, 256, 260, 264, 268, 384, 388, 392, 396], xs = [0, 2, 8], Up = [8, 7, 6, 4, 4, 2, 2, 2, 1, 1, 1, 1], Ep = 1;
    this.WebPDecodeRGBA = function(o, u, h, v, F) {
      var U = bs, L = new Ti(), S = new Br();
      L.ba = S, S.S = U, S.width = [S.width], S.height = [S.height];
      var N = S.width, k = S.height, Z = new An();
      if (Z == null || o == null) var lA = 2;
      else A(Z != null), lA = Pi(o, u, h, Z.width, Z.height, Z.Pd, Z.Qd, Z.format, null);
      if (lA != 0 ? N = 0 : (N != null && (N[0] = Z.width[0]), k != null && (k[0] = Z.height[0]), N = 1), N) {
        S.width = S.width[0], S.height = S.height[0], v != null && (v[0] = S.width), F != null && (F[0] = S.height);
        A: {
          if (v = new Si(), (F = new Va()).data = o, F.w = u, F.ha = h, F.kd = 1, u = [0], A(F != null), ((o = Pi(F.data, F.w, F.ha, null, null, null, u, null, F)) == 0 || o == 7) && u[0] && (o = 4), (u = o) == 0) {
            if (A(L != null), v.data = F.data, v.w = F.w + F.offset, v.ha = F.ha - F.offset, v.put = Or, v.ac = dt, v.bc = Dr, v.ma = L, F.xa) {
              if ((o = Ar()) == null) {
                L = 1;
                break A;
              }
              if (function(uA, rA) {
                var mA = [0], gA = [0], AA = [0];
                e: for (; ; ) {
                  if (uA == null) return 0;
                  if (rA == null) return uA.a = 2, 0;
                  if (uA.l = rA, uA.a = 0, oA(uA.m, rA.data, rA.w, rA.ha), !qA(uA.m, mA, gA, AA)) {
                    uA.a = 3;
                    break e;
                  }
                  if (uA.xb = Ih, rA.width = mA[0], rA.height = gA[0], !Pr(mA[0], gA[0], 1, uA, null)) break e;
                  return 1;
                }
                return A(uA.a != 0), 0;
              }(o, v)) {
                if (v = (u = Mi(v.width, v.height, L.Oa, L.ba)) == 0) {
                  e: {
                    v = o;
                    t: for (; ; ) {
                      if (v == null) {
                        v = 0;
                        break e;
                      }
                      if (A(v.s.yc != null), A(v.s.Ya != null), A(0 < v.s.Wb), A((h = v.l) != null), A((F = h.ma) != null), v.xb != 0) {
                        if (v.ca = F.ba, v.tb = F.tb, A(v.ca != null), !Ja(F.Oa, h, Cs)) {
                          v.a = 2;
                          break t;
                        }
                        if (!Zn(v, h.width) || h.da) break t;
                        if ((h.da || we(v.ca.S)) && aA(), 11 > v.ca.S || (alert("todo:WebPInitConvertARGBToYUV"), v.ca.f.kb.F != null && aA()), v.Pb && 0 < v.s.ua && v.s.vb.X == null && !zA(v.s.vb, v.s.Wa.Xa)) {
                          v.a = 1;
                          break t;
                        }
                        v.xb = 0;
                      }
                      if (!yr(v, v.V, v.Ba, v.c, v.i, h.o, Fi)) break t;
                      F.Dc = v.Ma, v = 1;
                      break e;
                    }
                    A(v.a != 0), v = 0;
                  }
                  v = !v;
                }
                v && (u = o.a);
              } else u = o.a;
            } else {
              if ((o = new yu()) == null) {
                L = 1;
                break A;
              }
              if (o.Fa = F.na, o.P = F.P, o.qc = F.Sa, Zo(o, v)) {
                if ((u = Mi(v.width, v.height, L.Oa, L.ba)) == 0) {
                  if (o.Aa = 0, h = L.Oa, A((F = o) != null), h != null) {
                    if (0 < (N = 0 > (N = h.Md) ? 0 : 100 < N ? 255 : 255 * N / 100)) {
                      for (k = Z = 0; 4 > k; ++k) 12 > (lA = F.pb[k]).lc && (lA.ia = N * Up[0 > lA.lc ? 0 : lA.lc] >> 3), Z |= lA.ia;
                      Z && (alert("todo:VP8InitRandom"), F.ia = 1);
                    }
                    F.Ga = h.Id, 100 < F.Ga ? F.Ga = 100 : 0 > F.Ga && (F.Ga = 0);
                  }
                  bu(o, v) || (u = o.a);
                }
              } else u = o.a;
            }
            u == 0 && L.Oa != null && L.Oa.fd && (u = Ya(L.ba));
          }
          L = u;
        }
        U = L != 0 ? null : 11 > U ? S.f.RGBA.eb : S.f.kb.y;
      } else U = null;
      return U;
    };
    var kh = [3, 4, 3, 4, 4, 2, 2, 4, 4, 4, 2, 1, 1];
  };
  function f(D, R) {
    for (var Y = "", x = 0; x < 4; x++) Y += String.fromCharCode(D[R++]);
    return Y;
  }
  function g(D, R) {
    return (D[R + 0] << 0 | D[R + 1] << 8 | D[R + 2] << 16) >>> 0;
  }
  function p(D, R) {
    return (D[R + 0] << 0 | D[R + 1] << 8 | D[R + 2] << 16 | D[R + 3] << 24) >>> 0;
  }
  new s();
  var w = [0], d = [0], C = [], b = new s(), _ = e, m = function(D, R) {
    var Y = {}, x = 0, I = !1, j = 0, K = 0;
    if (Y.frames = [], !/** @license
       * Copyright (c) 2017 Dominik Homberger
      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      https://webpjs.appspot.com
      WebPRiffParser dominikhlbg@gmail.com
      */
    function(M, z, X, eA) {
      for (var sA = 0; sA < eA; sA++) if (M[z + sA] != X.charCodeAt(sA)) return !0;
      return !1;
    }(D, R, "RIFF", 4)) {
      var nA, iA;
      for (p(D, R += 4), R += 8; R < D.length; ) {
        var cA = f(D, R), oA = p(D, R += 4);
        R += 4;
        var dA = oA + (1 & oA);
        switch (cA) {
          case "VP8 ":
          case "VP8L":
            Y.frames[x] === void 0 && (Y.frames[x] = {}), (E = Y.frames[x]).src_off = I ? K : R - 8, E.src_size = j + oA + 8, x++, I && (I = !1, j = 0, K = 0);
            break;
          case "VP8X":
            (E = Y.header = {}).feature_flags = D[R];
            var pA = R + 4;
            E.canvas_width = 1 + g(D, pA), pA += 3, E.canvas_height = 1 + g(D, pA), pA += 3;
            break;
          case "ALPH":
            I = !0, j = dA + 8, K = R - 8;
            break;
          case "ANIM":
            (E = Y.header).bgcolor = p(D, R), pA = R + 4, E.loop_count = (nA = D)[(iA = pA) + 0] << 0 | nA[iA + 1] << 8, pA += 2;
            break;
          case "ANMF":
            var LA, E;
            (E = Y.frames[x] = {}).offset_x = 2 * g(D, R), R += 3, E.offset_y = 2 * g(D, R), R += 3, E.width = 1 + g(D, R), R += 3, E.height = 1 + g(D, R), R += 3, E.duration = g(D, R), R += 3, LA = D[R++], E.dispose = 1 & LA, E.blend = LA >> 1 & 1;
        }
        cA != "ANMF" && (R += dA);
      }
      return Y;
    }
  }(_, 0);
  m.response = _, m.rgbaoutput = !0, m.dataurl = !1;
  var y = m.header ? m.header : null, H = m.frames ? m.frames : null;
  if (y) {
    y.loop_counter = y.loop_count, w = [y.canvas_height], d = [y.canvas_width];
    for (var O = 0; O < H.length && H[O].blend != 0; O++) ;
  }
  var P = H[0], q = b.WebPDecodeRGBA(_, P.src_off, P.src_size, d, w);
  P.rgba = q, P.imgwidth = d[0], P.imgheight = w[0];
  for (var W = 0; W < d[0] * w[0] * 4; W++) C[W] = q[W];
  return this.width = d, this.height = w, this.data = C, this;
}
(function(e) {
  var A = function() {
    return typeof Xc == "function";
  }, t = function(w, d, C, b) {
    var _ = 4, m = a;
    switch (b) {
      case e.image_compression.FAST:
        _ = 1, m = i;
        break;
      case e.image_compression.MEDIUM:
        _ = 6, m = l;
        break;
      case e.image_compression.SLOW:
        _ = 9, m = s;
    }
    w = r(w, d, C, m);
    var y = Xc(w, { level: _ });
    return e.__addimage__.arrayBufferToBinaryString(y);
  }, r = function(w, d, C, b) {
    for (var _, m, y, H = w.length / d, O = new Uint8Array(w.length + H), P = g(), q = 0; q < H; q += 1) {
      if (y = q * d, _ = w.subarray(y, y + d), b) O.set(b(_, C, m), y + q);
      else {
        for (var W, D = P.length, R = []; W < D; W += 1) R[W] = P[W](_, C, m);
        var Y = p(R.concat());
        O.set(R[Y], y + q);
      }
      m = _;
    }
    return O;
  }, n = function(w) {
    var d = Array.apply([], w);
    return d.unshift(0), d;
  }, i = function(w, d) {
    var C, b = [], _ = w.length;
    b[0] = 1;
    for (var m = 0; m < _; m += 1) C = w[m - d] || 0, b[m + 1] = w[m] - C + 256 & 255;
    return b;
  }, a = function(w, d, C) {
    var b, _ = [], m = w.length;
    _[0] = 2;
    for (var y = 0; y < m; y += 1) b = C && C[y] || 0, _[y + 1] = w[y] - b + 256 & 255;
    return _;
  }, l = function(w, d, C) {
    var b, _, m = [], y = w.length;
    m[0] = 3;
    for (var H = 0; H < y; H += 1) b = w[H - d] || 0, _ = C && C[H] || 0, m[H + 1] = w[H] + 256 - (b + _ >>> 1) & 255;
    return m;
  }, s = function(w, d, C) {
    var b, _, m, y, H = [], O = w.length;
    H[0] = 4;
    for (var P = 0; P < O; P += 1) b = w[P - d] || 0, _ = C && C[P] || 0, m = C && C[P - d] || 0, y = f(b, _, m), H[P + 1] = w[P] - y + 256 & 255;
    return H;
  }, f = function(w, d, C) {
    if (w === d && d === C) return w;
    var b = Math.abs(d - C), _ = Math.abs(w - C), m = Math.abs(w + d - C - C);
    return b <= _ && b <= m ? w : _ <= m ? d : C;
  }, g = function() {
    return [n, i, a, l, s];
  }, p = function(w) {
    var d = w.map(function(C) {
      return C.reduce(function(b, _) {
        return b + Math.abs(_);
      }, 0);
    });
    return d.indexOf(Math.min.apply(null, d));
  };
  e.processPNG = function(w, d, C, b) {
    var _, m, y, H, O, P, q, W, D, R, Y, x, I, j, K, nA = this.decode.FLATE_DECODE, iA = "";
    if (this.__addimage__.isArrayBuffer(w) && (w = new Uint8Array(w)), this.__addimage__.isArrayBufferView(w)) {
      if (w = (y = new dw(w)).imgData, m = y.bits, _ = y.colorSpace, O = y.colors, [4, 6].indexOf(y.colorType) !== -1) {
        if (y.bits === 8) {
          D = (W = y.pixelBitlength == 32 ? new Uint32Array(y.decodePixels().buffer) : y.pixelBitlength == 16 ? new Uint16Array(y.decodePixels().buffer) : new Uint8Array(y.decodePixels().buffer)).length, Y = new Uint8Array(D * y.colors), R = new Uint8Array(D);
          var cA, oA = y.pixelBitlength - y.bits;
          for (j = 0, K = 0; j < D; j++) {
            for (I = W[j], cA = 0; cA < oA; ) Y[K++] = I >>> cA & 255, cA += y.bits;
            R[j] = I >>> cA & 255;
          }
        }
        if (y.bits === 16) {
          D = (W = new Uint32Array(y.decodePixels().buffer)).length, Y = new Uint8Array(D * (32 / y.pixelBitlength) * y.colors), R = new Uint8Array(D * (32 / y.pixelBitlength)), x = y.colors > 1, j = 0, K = 0;
          for (var dA = 0; j < D; ) I = W[j++], Y[K++] = I >>> 0 & 255, x && (Y[K++] = I >>> 16 & 255, I = W[j++], Y[K++] = I >>> 0 & 255), R[dA++] = I >>> 16 & 255;
          m = 8;
        }
        b !== e.image_compression.NONE && A() ? (w = t(Y, y.width * y.colors, y.colors, b), q = t(R, y.width, 1, b)) : (w = Y, q = R, nA = void 0);
      }
      if (y.colorType === 3 && (_ = this.color_spaces.INDEXED, P = y.palette, y.transparency.indexed)) {
        var pA = y.transparency.indexed, LA = 0;
        for (j = 0, D = pA.length; j < D; ++j) LA += pA[j];
        if ((LA /= 255) === D - 1 && pA.indexOf(0) !== -1) H = [pA.indexOf(0)];
        else if (LA !== D) {
          for (W = y.decodePixels(), R = new Uint8Array(W.length), j = 0, D = W.length; j < D; j++) R[j] = pA[W[j]];
          q = t(R, y.width, 1);
        }
      }
      var E = function(M) {
        var z;
        switch (M) {
          case e.image_compression.FAST:
            z = 11;
            break;
          case e.image_compression.MEDIUM:
            z = 13;
            break;
          case e.image_compression.SLOW:
            z = 14;
            break;
          default:
            z = 12;
        }
        return z;
      }(b);
      return nA === this.decode.FLATE_DECODE && (iA = "/Predictor " + E + " "), iA += "/Colors " + O + " /BitsPerComponent " + m + " /Columns " + y.width, (this.__addimage__.isArrayBuffer(w) || this.__addimage__.isArrayBufferView(w)) && (w = this.__addimage__.arrayBufferToBinaryString(w)), (q && this.__addimage__.isArrayBuffer(q) || this.__addimage__.isArrayBufferView(q)) && (q = this.__addimage__.arrayBufferToBinaryString(q)), { alias: C, data: w, index: d, filter: nA, decodeParameters: iA, transparency: H, palette: P, sMask: q, predictor: E, width: y.width, height: y.height, bitsPerComponent: m, colorSpace: _ };
    }
  };
})(WA.API), function(e) {
  e.processGIF89A = function(A, t, r, n) {
    var i = new gw(A), a = i.width, l = i.height, s = [];
    i.decodeAndBlitFrameRGBA(0, s);
    var f = { data: s, width: a, height: l }, g = new fc(100).encode(f, 100);
    return e.processJPEG.call(this, g, t, r, n);
  }, e.processGIF87A = e.processGIF89A;
}(WA.API), xr.prototype.parseHeader = function() {
  if (this.fileSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.reserved = this.datav.getUint32(this.pos, !0), this.pos += 4, this.offset = this.datav.getUint32(this.pos, !0), this.pos += 4, this.headerSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.width = this.datav.getUint32(this.pos, !0), this.pos += 4, this.height = this.datav.getInt32(this.pos, !0), this.pos += 4, this.planes = this.datav.getUint16(this.pos, !0), this.pos += 2, this.bitPP = this.datav.getUint16(this.pos, !0), this.pos += 2, this.compress = this.datav.getUint32(this.pos, !0), this.pos += 4, this.rawSize = this.datav.getUint32(this.pos, !0), this.pos += 4, this.hr = this.datav.getUint32(this.pos, !0), this.pos += 4, this.vr = this.datav.getUint32(this.pos, !0), this.pos += 4, this.colors = this.datav.getUint32(this.pos, !0), this.pos += 4, this.importantColors = this.datav.getUint32(this.pos, !0), this.pos += 4, this.bitPP === 16 && this.is_with_alpha && (this.bitPP = 15), this.bitPP < 15) {
    var e = this.colors === 0 ? 1 << this.bitPP : this.colors;
    this.palette = new Array(e);
    for (var A = 0; A < e; A++) {
      var t = this.datav.getUint8(this.pos++, !0), r = this.datav.getUint8(this.pos++, !0), n = this.datav.getUint8(this.pos++, !0), i = this.datav.getUint8(this.pos++, !0);
      this.palette[A] = { red: n, green: r, blue: t, quad: i };
    }
  }
  this.height < 0 && (this.height *= -1, this.bottom_up = !1);
}, xr.prototype.parseBGR = function() {
  this.pos = this.offset;
  try {
    var e = "bit" + this.bitPP, A = this.width * this.height * 4;
    this.data = new Uint8Array(A), this[e]();
  } catch (t) {
    Se.log("bit decode error:" + t);
  }
}, xr.prototype.bit1 = function() {
  var e, A = Math.ceil(this.width / 8), t = A % 4;
  for (e = this.height - 1; e >= 0; e--) {
    for (var r = this.bottom_up ? e : this.height - 1 - e, n = 0; n < A; n++) for (var i = this.datav.getUint8(this.pos++, !0), a = r * this.width * 4 + 8 * n * 4, l = 0; l < 8 && 8 * n + l < this.width; l++) {
      var s = this.palette[i >> 7 - l & 1];
      this.data[a + 4 * l] = s.blue, this.data[a + 4 * l + 1] = s.green, this.data[a + 4 * l + 2] = s.red, this.data[a + 4 * l + 3] = 255;
    }
    t !== 0 && (this.pos += 4 - t);
  }
}, xr.prototype.bit4 = function() {
  for (var e = Math.ceil(this.width / 2), A = e % 4, t = this.height - 1; t >= 0; t--) {
    for (var r = this.bottom_up ? t : this.height - 1 - t, n = 0; n < e; n++) {
      var i = this.datav.getUint8(this.pos++, !0), a = r * this.width * 4 + 2 * n * 4, l = i >> 4, s = 15 & i, f = this.palette[l];
      if (this.data[a] = f.blue, this.data[a + 1] = f.green, this.data[a + 2] = f.red, this.data[a + 3] = 255, 2 * n + 1 >= this.width) break;
      f = this.palette[s], this.data[a + 4] = f.blue, this.data[a + 4 + 1] = f.green, this.data[a + 4 + 2] = f.red, this.data[a + 4 + 3] = 255;
    }
    A !== 0 && (this.pos += 4 - A);
  }
}, xr.prototype.bit8 = function() {
  for (var e = this.width % 4, A = this.height - 1; A >= 0; A--) {
    for (var t = this.bottom_up ? A : this.height - 1 - A, r = 0; r < this.width; r++) {
      var n = this.datav.getUint8(this.pos++, !0), i = t * this.width * 4 + 4 * r;
      if (n < this.palette.length) {
        var a = this.palette[n];
        this.data[i] = a.red, this.data[i + 1] = a.green, this.data[i + 2] = a.blue, this.data[i + 3] = 255;
      } else this.data[i] = 255, this.data[i + 1] = 255, this.data[i + 2] = 255, this.data[i + 3] = 255;
    }
    e !== 0 && (this.pos += 4 - e);
  }
}, xr.prototype.bit15 = function() {
  for (var e = this.width % 3, A = parseInt("11111", 2), t = this.height - 1; t >= 0; t--) {
    for (var r = this.bottom_up ? t : this.height - 1 - t, n = 0; n < this.width; n++) {
      var i = this.datav.getUint16(this.pos, !0);
      this.pos += 2;
      var a = (i & A) / A * 255 | 0, l = (i >> 5 & A) / A * 255 | 0, s = (i >> 10 & A) / A * 255 | 0, f = i >> 15 ? 255 : 0, g = r * this.width * 4 + 4 * n;
      this.data[g] = s, this.data[g + 1] = l, this.data[g + 2] = a, this.data[g + 3] = f;
    }
    this.pos += e;
  }
}, xr.prototype.bit16 = function() {
  for (var e = this.width % 3, A = parseInt("11111", 2), t = parseInt("111111", 2), r = this.height - 1; r >= 0; r--) {
    for (var n = this.bottom_up ? r : this.height - 1 - r, i = 0; i < this.width; i++) {
      var a = this.datav.getUint16(this.pos, !0);
      this.pos += 2;
      var l = (a & A) / A * 255 | 0, s = (a >> 5 & t) / t * 255 | 0, f = (a >> 11) / A * 255 | 0, g = n * this.width * 4 + 4 * i;
      this.data[g] = f, this.data[g + 1] = s, this.data[g + 2] = l, this.data[g + 3] = 255;
    }
    this.pos += e;
  }
}, xr.prototype.bit24 = function() {
  for (var e = this.height - 1; e >= 0; e--) {
    for (var A = this.bottom_up ? e : this.height - 1 - e, t = 0; t < this.width; t++) {
      var r = this.datav.getUint8(this.pos++, !0), n = this.datav.getUint8(this.pos++, !0), i = this.datav.getUint8(this.pos++, !0), a = A * this.width * 4 + 4 * t;
      this.data[a] = i, this.data[a + 1] = n, this.data[a + 2] = r, this.data[a + 3] = 255;
    }
    this.pos += this.width % 4;
  }
}, xr.prototype.bit32 = function() {
  for (var e = this.height - 1; e >= 0; e--) for (var A = this.bottom_up ? e : this.height - 1 - e, t = 0; t < this.width; t++) {
    var r = this.datav.getUint8(this.pos++, !0), n = this.datav.getUint8(this.pos++, !0), i = this.datav.getUint8(this.pos++, !0), a = this.datav.getUint8(this.pos++, !0), l = A * this.width * 4 + 4 * t;
    this.data[l] = i, this.data[l + 1] = n, this.data[l + 2] = r, this.data[l + 3] = a;
  }
}, xr.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2018 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  e.processBMP = function(A, t, r, n) {
    var i = new xr(A, !1), a = i.width, l = i.height, s = { data: i.getData(), width: a, height: l }, f = new fc(100).encode(s, 100);
    return e.processJPEG.call(this, f, t, r, n);
  };
}(WA.API), v0.prototype.getData = function() {
  return this.data;
}, /**
 * @license
 * Copyright (c) 2019 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  e.processWEBP = function(A, t, r, n) {
    var i = new v0(A), a = i.width, l = i.height, s = { data: i.getData(), width: a, height: l }, f = new fc(100).encode(s, 100);
    return e.processJPEG.call(this, f, t, r, n);
  };
}(WA.API), WA.API.processRGBA = function(e, A, t) {
  for (var r = e.data, n = r.length, i = new Uint8Array(n / 4 * 3), a = new Uint8Array(n / 4), l = 0, s = 0, f = 0; f < n; f += 4) {
    var g = r[f], p = r[f + 1], w = r[f + 2], d = r[f + 3];
    i[l++] = g, i[l++] = p, i[l++] = w, a[s++] = d;
  }
  var C = this.__addimage__.arrayBufferToBinaryString(i);
  return { alpha: this.__addimage__.arrayBufferToBinaryString(a), data: C, index: A, alias: t, colorSpace: "DeviceRGB", bitsPerComponent: 8, width: e.width, height: e.height };
}, WA.API.setLanguage = function(e) {
  return this.internal.languageSettings === void 0 && (this.internal.languageSettings = {}, this.internal.languageSettings.isSubscribed = !1), { af: "Afrikaans", sq: "Albanian", ar: "Arabic (Standard)", "ar-DZ": "Arabic (Algeria)", "ar-BH": "Arabic (Bahrain)", "ar-EG": "Arabic (Egypt)", "ar-IQ": "Arabic (Iraq)", "ar-JO": "Arabic (Jordan)", "ar-KW": "Arabic (Kuwait)", "ar-LB": "Arabic (Lebanon)", "ar-LY": "Arabic (Libya)", "ar-MA": "Arabic (Morocco)", "ar-OM": "Arabic (Oman)", "ar-QA": "Arabic (Qatar)", "ar-SA": "Arabic (Saudi Arabia)", "ar-SY": "Arabic (Syria)", "ar-TN": "Arabic (Tunisia)", "ar-AE": "Arabic (U.A.E.)", "ar-YE": "Arabic (Yemen)", an: "Aragonese", hy: "Armenian", as: "Assamese", ast: "Asturian", az: "Azerbaijani", eu: "Basque", be: "Belarusian", bn: "Bengali", bs: "Bosnian", br: "Breton", bg: "Bulgarian", my: "Burmese", ca: "Catalan", ch: "Chamorro", ce: "Chechen", zh: "Chinese", "zh-HK": "Chinese (Hong Kong)", "zh-CN": "Chinese (PRC)", "zh-SG": "Chinese (Singapore)", "zh-TW": "Chinese (Taiwan)", cv: "Chuvash", co: "Corsican", cr: "Cree", hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch (Standard)", "nl-BE": "Dutch (Belgian)", en: "English", "en-AU": "English (Australia)", "en-BZ": "English (Belize)", "en-CA": "English (Canada)", "en-IE": "English (Ireland)", "en-JM": "English (Jamaica)", "en-NZ": "English (New Zealand)", "en-PH": "English (Philippines)", "en-ZA": "English (South Africa)", "en-TT": "English (Trinidad & Tobago)", "en-GB": "English (United Kingdom)", "en-US": "English (United States)", "en-ZW": "English (Zimbabwe)", eo: "Esperanto", et: "Estonian", fo: "Faeroese", fj: "Fijian", fi: "Finnish", fr: "French (Standard)", "fr-BE": "French (Belgium)", "fr-CA": "French (Canada)", "fr-FR": "French (France)", "fr-LU": "French (Luxembourg)", "fr-MC": "French (Monaco)", "fr-CH": "French (Switzerland)", fy: "Frisian", fur: "Friulian", gd: "Gaelic (Scots)", "gd-IE": "Gaelic (Irish)", gl: "Galacian", ka: "Georgian", de: "German (Standard)", "de-AT": "German (Austria)", "de-DE": "German (Germany)", "de-LI": "German (Liechtenstein)", "de-LU": "German (Luxembourg)", "de-CH": "German (Switzerland)", el: "Greek", gu: "Gujurati", ht: "Haitian", he: "Hebrew", hi: "Hindi", hu: "Hungarian", is: "Icelandic", id: "Indonesian", iu: "Inuktitut", ga: "Irish", it: "Italian (Standard)", "it-CH": "Italian (Switzerland)", ja: "Japanese", kn: "Kannada", ks: "Kashmiri", kk: "Kazakh", km: "Khmer", ky: "Kirghiz", tlh: "Klingon", ko: "Korean", "ko-KP": "Korean (North Korea)", "ko-KR": "Korean (South Korea)", la: "Latin", lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish", mk: "North Macedonia", ms: "Malay", ml: "Malayalam", mt: "Maltese", mi: "Maori", mr: "Marathi", mo: "Moldavian", nv: "Navajo", ng: "Ndonga", ne: "Nepali", no: "Norwegian", nb: "Norwegian (Bokmal)", nn: "Norwegian (Nynorsk)", oc: "Occitan", or: "Oriya", om: "Oromo", fa: "Persian", "fa-IR": "Persian/Iran", pl: "Polish", pt: "Portuguese", "pt-BR": "Portuguese (Brazil)", pa: "Punjabi", "pa-IN": "Punjabi (India)", "pa-PK": "Punjabi (Pakistan)", qu: "Quechua", rm: "Rhaeto-Romanic", ro: "Romanian", "ro-MO": "Romanian (Moldavia)", ru: "Russian", "ru-MO": "Russian (Moldavia)", sz: "Sami (Lappish)", sg: "Sango", sa: "Sanskrit", sc: "Sardinian", sd: "Sindhi", si: "Singhalese", sr: "Serbian", sk: "Slovak", sl: "Slovenian", so: "Somani", sb: "Sorbian", es: "Spanish", "es-AR": "Spanish (Argentina)", "es-BO": "Spanish (Bolivia)", "es-CL": "Spanish (Chile)", "es-CO": "Spanish (Colombia)", "es-CR": "Spanish (Costa Rica)", "es-DO": "Spanish (Dominican Republic)", "es-EC": "Spanish (Ecuador)", "es-SV": "Spanish (El Salvador)", "es-GT": "Spanish (Guatemala)", "es-HN": "Spanish (Honduras)", "es-MX": "Spanish (Mexico)", "es-NI": "Spanish (Nicaragua)", "es-PA": "Spanish (Panama)", "es-PY": "Spanish (Paraguay)", "es-PE": "Spanish (Peru)", "es-PR": "Spanish (Puerto Rico)", "es-ES": "Spanish (Spain)", "es-UY": "Spanish (Uruguay)", "es-VE": "Spanish (Venezuela)", sx: "Sutu", sw: "Swahili", sv: "Swedish", "sv-FI": "Swedish (Finland)", "sv-SV": "Swedish (Sweden)", ta: "Tamil", tt: "Tatar", te: "Teluga", th: "Thai", tig: "Tigre", ts: "Tsonga", tn: "Tswana", tr: "Turkish", tk: "Turkmen", uk: "Ukrainian", hsb: "Upper Sorbian", ur: "Urdu", ve: "Venda", vi: "Vietnamese", vo: "Volapuk", wa: "Walloon", cy: "Welsh", xh: "Xhosa", ji: "Yiddish", zu: "Zulu" }[e] !== void 0 && (this.internal.languageSettings.languageCode = e, this.internal.languageSettings.isSubscribed === !1 && (this.internal.events.subscribe("putCatalog", function() {
    this.internal.write("/Lang (" + this.internal.languageSettings.languageCode + ")");
  }), this.internal.languageSettings.isSubscribed = !0)), this;
}, Aa = WA.API, Ks = Aa.getCharWidthsArray = function(e, A) {
  var t, r, n = (A = A || {}).font || this.internal.getFont(), i = A.fontSize || this.internal.getFontSize(), a = A.charSpace || this.internal.getCharSpace(), l = A.widths ? A.widths : n.metadata.Unicode.widths, s = l.fof ? l.fof : 1, f = A.kerning ? A.kerning : n.metadata.Unicode.kerning, g = f.fof ? f.fof : 1, p = A.doKerning !== !1, w = 0, d = e.length, C = 0, b = l[0] || s, _ = [];
  for (t = 0; t < d; t++) r = e.charCodeAt(t), typeof n.metadata.widthOfString == "function" ? _.push((n.metadata.widthOfGlyph(n.metadata.characterToGlyph(r)) + a * (1e3 / i) || 0) / 1e3) : (w = p && Fe(f[r]) === "object" && !isNaN(parseInt(f[r][C], 10)) ? f[r][C] / g : 0, _.push((l[r] || b) / s + w)), C = r;
  return _;
}, g0 = Aa.getStringUnitWidth = function(e, A) {
  var t = (A = A || {}).fontSize || this.internal.getFontSize(), r = A.font || this.internal.getFont(), n = A.charSpace || this.internal.getCharSpace();
  return Aa.processArabic && (e = Aa.processArabic(e)), typeof r.metadata.widthOfString == "function" ? r.metadata.widthOfString(e, t, n) / t : Ks.apply(this, arguments).reduce(function(i, a) {
    return i + a;
  }, 0);
}, p0 = function(e, A, t, r) {
  for (var n = [], i = 0, a = e.length, l = 0; i !== a && l + A[i] < t; ) l += A[i], i++;
  n.push(e.slice(0, i));
  var s = i;
  for (l = 0; i !== a; ) l + A[i] > r && (n.push(e.slice(s, i)), l = 0, s = i), l += A[i], i++;
  return s !== i && n.push(e.slice(s, i)), n;
}, B0 = function(e, A, t) {
  t || (t = {});
  var r, n, i, a, l, s, f, g = [], p = [g], w = t.textIndent || 0, d = 0, C = 0, b = e.split(" "), _ = Ks.apply(this, [" ", t])[0];
  if (s = t.lineIndent === -1 ? b[0].length + 2 : t.lineIndent || 0) {
    var m = Array(s).join(" "), y = [];
    b.map(function(O) {
      (O = O.split(/\s*\n/)).length > 1 ? y = y.concat(O.map(function(P, q) {
        return (q && P.length ? `
` : "") + P;
      })) : y.push(O[0]);
    }), b = y, s = g0.apply(this, [m, t]);
  }
  for (i = 0, a = b.length; i < a; i++) {
    var H = 0;
    if (r = b[i], s && r[0] == `
` && (r = r.substr(1), H = 1), w + d + (C = (n = Ks.apply(this, [r, t])).reduce(function(O, P) {
      return O + P;
    }, 0)) > A || H) {
      if (C > A) {
        for (l = p0.apply(this, [r, n, A - (w + d), A]), g.push(l.shift()), g = [l.pop()]; l.length; ) p.push([l.shift()]);
        C = n.slice(r.length - (g[0] ? g[0].length : 0)).reduce(function(O, P) {
          return O + P;
        }, 0);
      } else g = [r];
      p.push(g), w = C + s, d = _;
    } else g.push(r), w += d + C, d = _;
  }
  return f = s ? function(O, P) {
    return (P ? m : "") + O.join(" ");
  } : function(O) {
    return O.join(" ");
  }, p.map(f);
}, Aa.splitTextToSize = function(e, A, t) {
  var r, n = (t = t || {}).fontSize || this.internal.getFontSize(), i = (function(g) {
    if (g.widths && g.kerning) return { widths: g.widths, kerning: g.kerning };
    var p = this.internal.getFont(g.fontName, g.fontStyle);
    return p.metadata.Unicode ? { widths: p.metadata.Unicode.widths || { 0: 1 }, kerning: p.metadata.Unicode.kerning || {} } : { font: p.metadata, fontSize: this.internal.getFontSize(), charSpace: this.internal.getCharSpace() };
  }).call(this, t);
  r = Array.isArray(e) ? e : String(e).split(/\r?\n/);
  var a = 1 * this.internal.scaleFactor * A / n;
  i.textIndent = t.textIndent ? 1 * t.textIndent * this.internal.scaleFactor / n : 0, i.lineIndent = t.lineIndent;
  var l, s, f = [];
  for (l = 0, s = r.length; l < s; l++) f = f.concat(B0.apply(this, [r[l], a, i]));
  return f;
}, function(e) {
  e.__fontmetrics__ = e.__fontmetrics__ || {};
  for (var A = "klmnopqrstuvwxyz", t = {}, r = {}, n = 0; n < A.length; n++) t[A[n]] = "0123456789abcdef"[n], r["0123456789abcdef"[n]] = A[n];
  var i = function(p) {
    return "0x" + parseInt(p, 10).toString(16);
  }, a = e.__fontmetrics__.compress = function(p) {
    var w, d, C, b, _ = ["{"];
    for (var m in p) {
      if (w = p[m], isNaN(parseInt(m, 10)) ? d = "'" + m + "'" : (m = parseInt(m, 10), d = (d = i(m).slice(2)).slice(0, -1) + r[d.slice(-1)]), typeof w == "number") w < 0 ? (C = i(w).slice(3), b = "-") : (C = i(w).slice(2), b = ""), C = b + C.slice(0, -1) + r[C.slice(-1)];
      else {
        if (Fe(w) !== "object") throw new Error("Don't know what to do with value type " + Fe(w) + ".");
        C = a(w);
      }
      _.push(d + C);
    }
    return _.push("}"), _.join("");
  }, l = e.__fontmetrics__.uncompress = function(p) {
    if (typeof p != "string") throw new Error("Invalid argument passed to uncompress.");
    for (var w, d, C, b, _ = {}, m = 1, y = _, H = [], O = "", P = "", q = p.length - 1, W = 1; W < q; W += 1) (b = p[W]) == "'" ? w ? (C = w.join(""), w = void 0) : w = [] : w ? w.push(b) : b == "{" ? (H.push([y, C]), y = {}, C = void 0) : b == "}" ? ((d = H.pop())[0][d[1]] = y, C = void 0, y = d[0]) : b == "-" ? m = -1 : C === void 0 ? t.hasOwnProperty(b) ? (O += t[b], C = parseInt(O, 16) * m, m = 1, O = "") : O += b : t.hasOwnProperty(b) ? (P += t[b], y[C] = parseInt(P, 16) * m, m = 1, C = void 0, P = "") : P += b;
    return _;
  }, s = { codePages: ["WinAnsiEncoding"], WinAnsiEncoding: l("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}") }, f = { Unicode: { Courier: s, "Courier-Bold": s, "Courier-BoldOblique": s, "Courier-Oblique": s, Helvetica: s, "Helvetica-Bold": s, "Helvetica-BoldOblique": s, "Helvetica-Oblique": s, "Times-Roman": s, "Times-Bold": s, "Times-BoldItalic": s, "Times-Italic": s } }, g = { Unicode: { "Courier-Oblique": l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-BoldItalic": l("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"), "Helvetica-Bold": l("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"), Courier: l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Courier-BoldOblique": l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-Bold": l("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"), Symbol: l("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"), Helvetica: l("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"), "Helvetica-BoldOblique": l("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"), ZapfDingbats: l("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"), "Courier-Bold": l("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"), "Times-Italic": l("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"), "Times-Roman": l("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"), "Helvetica-Oblique": l("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}") } };
  e.events.push(["addFont", function(p) {
    var w = p.font, d = g.Unicode[w.postScriptName];
    d && (w.metadata.Unicode = {}, w.metadata.Unicode.widths = d.widths, w.metadata.Unicode.kerning = d.kerning);
    var C = f.Unicode[w.postScriptName];
    C && (w.metadata.Unicode.encoding = C, w.encoding = C.codePages[0]);
  }]);
}(WA.API), /**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = function(t) {
    for (var r = t.length, n = new Uint8Array(r), i = 0; i < r; i++) n[i] = t.charCodeAt(i);
    return n;
  };
  e.API.events.push(["addFont", function(t) {
    var r = void 0, n = t.font, i = t.instance;
    if (!n.isStandardFont) {
      if (i === void 0) throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('" + n.postScriptName + "').");
      if (typeof (r = i.existsFileInVFS(n.postScriptName) === !1 ? i.loadFile(n.postScriptName) : i.getFileFromVFS(n.postScriptName)) != "string") throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('" + n.postScriptName + "').");
      (function(a, l) {
        l = /^\x00\x01\x00\x00/.test(l) ? A(l) : A(Lo(l)), a.metadata = e.API.TTFFont.open(l), a.metadata.Unicode = a.metadata.Unicode || { encoding: {}, kerning: {}, widths: [] }, a.metadata.glyIdsUsed = [0];
      })(n, r);
    }
  }]);
}(WA), /** @license
 * Copyright (c) 2012 Willow Systems Corporation, https://github.com/willowsystems
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(e) {
  function A() {
    return (XA.canvg ? Promise.resolve(XA.canvg) : import("./index.es-B6s7nrrN.mjs")).catch(function(t) {
      return Promise.reject(new Error("Could not load canvg: " + t));
    }).then(function(t) {
      return t.default ? t.default : t;
    });
  }
  WA.API.addSvgAsImage = function(t, r, n, i, a, l, s, f) {
    if (isNaN(r) || isNaN(n)) throw Se.error("jsPDF.addSvgAsImage: Invalid coordinates", arguments), new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");
    if (isNaN(i) || isNaN(a)) throw Se.error("jsPDF.addSvgAsImage: Invalid measurements", arguments), new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");
    var g = document.createElement("canvas");
    g.width = i, g.height = a;
    var p = g.getContext("2d");
    p.fillStyle = "#fff", p.fillRect(0, 0, g.width, g.height);
    var w = { ignoreMouse: !0, ignoreAnimation: !0, ignoreDimensions: !0 }, d = this;
    return A().then(function(C) {
      return C.fromString(p, t, w);
    }, function() {
      return Promise.reject(new Error("Could not load canvg."));
    }).then(function(C) {
      return C.render(w);
    }).then(function() {
      d.addImage(g.toDataURL("image/jpeg", 1), r, n, i, a, s, f);
    });
  };
}(), WA.API.putTotalPages = function(e) {
  var A, t = 0;
  parseInt(this.internal.getFont().id.substr(1), 10) < 15 ? (A = new RegExp(e, "g"), t = this.internal.getNumberOfPages()) : (A = new RegExp(this.pdfEscape16(e, this.internal.getFont()), "g"), t = this.pdfEscape16(this.internal.getNumberOfPages() + "", this.internal.getFont()));
  for (var r = 1; r <= this.internal.getNumberOfPages(); r++) for (var n = 0; n < this.internal.pages[r].length; n++) this.internal.pages[r][n] = this.internal.pages[r][n].replace(A, t);
  return this;
}, WA.API.viewerPreferences = function(e, A) {
  var t;
  e = e || {}, A = A || !1;
  var r, n, i, a = { HideToolbar: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, HideMenubar: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, HideWindowUI: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, FitWindow: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, CenterWindow: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.3 }, DisplayDocTitle: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.4 }, NonFullScreenPageMode: { defaultValue: "UseNone", value: "UseNone", type: "name", explicitSet: !1, valueSet: ["UseNone", "UseOutlines", "UseThumbs", "UseOC"], pdfVersion: 1.3 }, Direction: { defaultValue: "L2R", value: "L2R", type: "name", explicitSet: !1, valueSet: ["L2R", "R2L"], pdfVersion: 1.3 }, ViewArea: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, ViewClip: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintArea: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintClip: { defaultValue: "CropBox", value: "CropBox", type: "name", explicitSet: !1, valueSet: ["MediaBox", "CropBox", "TrimBox", "BleedBox", "ArtBox"], pdfVersion: 1.4 }, PrintScaling: { defaultValue: "AppDefault", value: "AppDefault", type: "name", explicitSet: !1, valueSet: ["AppDefault", "None"], pdfVersion: 1.6 }, Duplex: { defaultValue: "", value: "none", type: "name", explicitSet: !1, valueSet: ["Simplex", "DuplexFlipShortEdge", "DuplexFlipLongEdge", "none"], pdfVersion: 1.7 }, PickTrayByPDFSize: { defaultValue: !1, value: !1, type: "boolean", explicitSet: !1, valueSet: [!0, !1], pdfVersion: 1.7 }, PrintPageRange: { defaultValue: "", value: "", type: "array", explicitSet: !1, valueSet: null, pdfVersion: 1.7 }, NumCopies: { defaultValue: 1, value: 1, type: "integer", explicitSet: !1, valueSet: null, pdfVersion: 1.7 } }, l = Object.keys(a), s = [], f = 0, g = 0, p = 0;
  function w(C, b) {
    var _, m = !1;
    for (_ = 0; _ < C.length; _ += 1) C[_] === b && (m = !0);
    return m;
  }
  if (this.internal.viewerpreferences === void 0 && (this.internal.viewerpreferences = {}, this.internal.viewerpreferences.configuration = JSON.parse(JSON.stringify(a)), this.internal.viewerpreferences.isSubscribed = !1), t = this.internal.viewerpreferences.configuration, e === "reset" || A === !0) {
    var d = l.length;
    for (p = 0; p < d; p += 1) t[l[p]].value = t[l[p]].defaultValue, t[l[p]].explicitSet = !1;
  }
  if (Fe(e) === "object") {
    for (n in e) if (i = e[n], w(l, n) && i !== void 0) {
      if (t[n].type === "boolean" && typeof i == "boolean") t[n].value = i;
      else if (t[n].type === "name" && w(t[n].valueSet, i)) t[n].value = i;
      else if (t[n].type === "integer" && Number.isInteger(i)) t[n].value = i;
      else if (t[n].type === "array") {
        for (f = 0; f < i.length; f += 1) if (r = !0, i[f].length === 1 && typeof i[f][0] == "number") s.push(String(i[f] - 1));
        else if (i[f].length > 1) {
          for (g = 0; g < i[f].length; g += 1) typeof i[f][g] != "number" && (r = !1);
          r === !0 && s.push([i[f][0] - 1, i[f][1] - 1].join(" "));
        }
        t[n].value = "[" + s.join(" ") + "]";
      } else t[n].value = t[n].defaultValue;
      t[n].explicitSet = !0;
    }
  }
  return this.internal.viewerpreferences.isSubscribed === !1 && (this.internal.events.subscribe("putCatalog", function() {
    var C, b = [];
    for (C in t) t[C].explicitSet === !0 && (t[C].type === "name" ? b.push("/" + C + " /" + t[C].value) : b.push("/" + C + " " + t[C].value));
    b.length !== 0 && this.internal.write(`/ViewerPreferences
<<
` + b.join(`
`) + `
>>`);
  }), this.internal.viewerpreferences.isSubscribed = !0), this.internal.viewerpreferences.configuration = t, this;
}, /** ====================================================================
 * @license
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(e) {
  var A = function() {
    var r = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="' + this.internal.__metadata__.namespaceuri + '"><jspdf:metadata>', n = unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')), i = unescape(encodeURIComponent(r)), a = unescape(encodeURIComponent(this.internal.__metadata__.metadata)), l = unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")), s = unescape(encodeURIComponent("</x:xmpmeta>")), f = i.length + a.length + l.length + n.length + s.length;
    this.internal.__metadata__.metadata_object_number = this.internal.newObject(), this.internal.write("<< /Type /Metadata /Subtype /XML /Length " + f + " >>"), this.internal.write("stream"), this.internal.write(n + i + a + l + s), this.internal.write("endstream"), this.internal.write("endobj");
  }, t = function() {
    this.internal.__metadata__.metadata_object_number && this.internal.write("/Metadata " + this.internal.__metadata__.metadata_object_number + " 0 R");
  };
  e.addMetadata = function(r, n) {
    return this.internal.__metadata__ === void 0 && (this.internal.__metadata__ = { metadata: r, namespaceuri: n || "http://jspdf.default.namespaceuri/" }, this.internal.events.subscribe("putCatalog", t), this.internal.events.subscribe("postPutResources", A)), this;
  };
}(WA.API), function(e) {
  var A = e.API, t = A.pdfEscape16 = function(i, a) {
    for (var l, s = a.metadata.Unicode.widths, f = ["", "0", "00", "000", "0000"], g = [""], p = 0, w = i.length; p < w; ++p) {
      if (l = a.metadata.characterToGlyph(i.charCodeAt(p)), a.metadata.glyIdsUsed.push(l), a.metadata.toUnicode[l] = i.charCodeAt(p), s.indexOf(l) == -1 && (s.push(l), s.push([parseInt(a.metadata.widthOfGlyph(l), 10)])), l == "0") return g.join("");
      l = l.toString(16), g.push(f[4 - l.length], l);
    }
    return g.join("");
  }, r = function(i) {
    var a, l, s, f, g, p, w;
    for (g = `/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo <<
  /Registry (Adobe)
  /Ordering (UCS)
  /Supplement 0
>> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000><ffff>
endcodespacerange`, s = [], p = 0, w = (l = Object.keys(i).sort(function(d, C) {
      return d - C;
    })).length; p < w; p++) a = l[p], s.length >= 100 && (g += `
` + s.length + ` beginbfchar
` + s.join(`
`) + `
endbfchar`, s = []), i[a] !== void 0 && i[a] !== null && typeof i[a].toString == "function" && (f = ("0000" + i[a].toString(16)).slice(-4), a = ("0000" + (+a).toString(16)).slice(-4), s.push("<" + a + "><" + f + ">"));
    return s.length && (g += `
` + s.length + ` beginbfchar
` + s.join(`
`) + `
endbfchar
`), g += `endcmap
CMapName currentdict /CMap defineresource pop
end
end`;
  };
  A.events.push(["putFont", function(i) {
    (function(a) {
      var l = a.font, s = a.out, f = a.newObject, g = a.putStream;
      if (l.metadata instanceof e.API.TTFFont && l.encoding === "Identity-H") {
        for (var p = l.metadata.Unicode.widths, w = l.metadata.subset.encode(l.metadata.glyIdsUsed, 1), d = "", C = 0; C < w.length; C++) d += String.fromCharCode(w[C]);
        var b = f();
        g({ data: d, addLength1: !0, objectId: b }), s("endobj");
        var _ = f();
        g({ data: r(l.metadata.toUnicode), addLength1: !0, objectId: _ }), s("endobj");
        var m = f();
        s("<<"), s("/Type /FontDescriptor"), s("/FontName /" + ca(l.fontName)), s("/FontFile2 " + b + " 0 R"), s("/FontBBox " + e.API.PDFObject.convert(l.metadata.bbox)), s("/Flags " + l.metadata.flags), s("/StemV " + l.metadata.stemV), s("/ItalicAngle " + l.metadata.italicAngle), s("/Ascent " + l.metadata.ascender), s("/Descent " + l.metadata.decender), s("/CapHeight " + l.metadata.capHeight), s(">>"), s("endobj");
        var y = f();
        s("<<"), s("/Type /Font"), s("/BaseFont /" + ca(l.fontName)), s("/FontDescriptor " + m + " 0 R"), s("/W " + e.API.PDFObject.convert(p)), s("/CIDToGIDMap /Identity"), s("/DW 1000"), s("/Subtype /CIDFontType2"), s("/CIDSystemInfo"), s("<<"), s("/Supplement 0"), s("/Registry (Adobe)"), s("/Ordering (" + l.encoding + ")"), s(">>"), s(">>"), s("endobj"), l.objectNumber = f(), s("<<"), s("/Type /Font"), s("/Subtype /Type0"), s("/ToUnicode " + _ + " 0 R"), s("/BaseFont /" + ca(l.fontName)), s("/Encoding /" + l.encoding), s("/DescendantFonts [" + y + " 0 R]"), s(">>"), s("endobj"), l.isAlreadyPutted = !0;
      }
    })(i);
  }]), A.events.push(["putFont", function(i) {
    (function(a) {
      var l = a.font, s = a.out, f = a.newObject, g = a.putStream;
      if (l.metadata instanceof e.API.TTFFont && l.encoding === "WinAnsiEncoding") {
        for (var p = l.metadata.rawData, w = "", d = 0; d < p.length; d++) w += String.fromCharCode(p[d]);
        var C = f();
        g({ data: w, addLength1: !0, objectId: C }), s("endobj");
        var b = f();
        g({ data: r(l.metadata.toUnicode), addLength1: !0, objectId: b }), s("endobj");
        var _ = f();
        s("<<"), s("/Descent " + l.metadata.decender), s("/CapHeight " + l.metadata.capHeight), s("/StemV " + l.metadata.stemV), s("/Type /FontDescriptor"), s("/FontFile2 " + C + " 0 R"), s("/Flags 96"), s("/FontBBox " + e.API.PDFObject.convert(l.metadata.bbox)), s("/FontName /" + ca(l.fontName)), s("/ItalicAngle " + l.metadata.italicAngle), s("/Ascent " + l.metadata.ascender), s(">>"), s("endobj"), l.objectNumber = f();
        for (var m = 0; m < l.metadata.hmtx.widths.length; m++) l.metadata.hmtx.widths[m] = parseInt(l.metadata.hmtx.widths[m] * (1e3 / l.metadata.head.unitsPerEm));
        s("<</Subtype/TrueType/Type/Font/ToUnicode " + b + " 0 R/BaseFont/" + ca(l.fontName) + "/FontDescriptor " + _ + " 0 R/Encoding/" + l.encoding + " /FirstChar 29 /LastChar 255 /Widths " + e.API.PDFObject.convert(l.metadata.hmtx.widths) + ">>"), s("endobj"), l.isAlreadyPutted = !0;
      }
    })(i);
  }]);
  var n = function(i) {
    var a, l = i.text || "", s = i.x, f = i.y, g = i.options || {}, p = i.mutex || {}, w = p.pdfEscape, d = p.activeFontKey, C = p.fonts, b = d, _ = "", m = 0, y = "", H = C[b].encoding;
    if (C[b].encoding !== "Identity-H") return { text: l, x: s, y: f, options: g, mutex: p };
    for (y = l, b = d, Array.isArray(l) && (y = l[0]), m = 0; m < y.length; m += 1) C[b].metadata.hasOwnProperty("cmap") && (a = C[b].metadata.cmap.unicode.codeMap[y[m].charCodeAt(0)]), a || y[m].charCodeAt(0) < 256 && C[b].metadata.hasOwnProperty("Unicode") ? _ += y[m] : _ += "";
    var O = "";
    return parseInt(b.slice(1)) < 14 || H === "WinAnsiEncoding" ? O = w(_, b).split("").map(function(P) {
      return P.charCodeAt(0).toString(16);
    }).join("") : H === "Identity-H" && (O = t(_, C[b])), p.isHex = !0, { text: O, x: s, y: f, options: g, mutex: p };
  };
  A.events.push(["postProcessText", function(i) {
    var a = i.text || "", l = [], s = { text: a, x: i.x, y: i.y, options: i.options, mutex: i.mutex };
    if (Array.isArray(a)) {
      var f = 0;
      for (f = 0; f < a.length; f += 1) Array.isArray(a[f]) && a[f].length === 3 ? l.push([n(Object.assign({}, s, { text: a[f][0] })).text, a[f][1], a[f][2]]) : l.push(n(Object.assign({}, s, { text: a[f] })).text);
      i.text = l;
    } else i.text = n(Object.assign({}, s, { text: a })).text;
  }]);
}(WA), /**
 * @license
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(e) {
  var A = function() {
    return this.internal.vFS === void 0 && (this.internal.vFS = {}), !0;
  };
  e.existsFileInVFS = function(t) {
    return A.call(this), this.internal.vFS[t] !== void 0;
  }, e.addFileToVFS = function(t, r) {
    return A.call(this), this.internal.vFS[t] = r, this;
  }, e.getFileFromVFS = function(t) {
    return A.call(this), this.internal.vFS[t] !== void 0 ? this.internal.vFS[t] : null;
  };
}(WA.API), /**
 * @license
 * Unicode Bidi Engine based on the work of Alex Shensis (@asthensis)
 * MIT License
 */
function(e) {
  e.__bidiEngine__ = e.prototype.__bidiEngine__ = function(r) {
    var n, i, a, l, s, f, g, p = A, w = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]], d = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]], C = { L: 0, R: 1, EN: 2, AN: 3, N: 4, B: 5, S: 6 }, b = { 0: 0, 5: 1, 6: 2, 7: 3, 32: 4, 251: 5, 254: 6, 255: 7 }, _ = ["(", ")", "(", "<", ">", "<", "[", "]", "[", "{", "}", "{", "«", "»", "«", "‹", "›", "‹", "⁅", "⁆", "⁅", "⁽", "⁾", "⁽", "₍", "₎", "₍", "≤", "≥", "≤", "〈", "〉", "〈", "﹙", "﹚", "﹙", "﹛", "﹜", "﹛", "﹝", "﹞", "﹝", "﹤", "﹥", "﹤"], m = new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/), y = !1, H = 0;
    this.__bidiEngine__ = {};
    var O = function(x) {
      var I = x.charCodeAt(), j = I >> 8, K = b[j];
      return K !== void 0 ? p[256 * K + (255 & I)] : j === 252 || j === 253 ? "AL" : m.test(j) ? "L" : j === 8 ? "R" : "N";
    }, P = function(x) {
      for (var I, j = 0; j < x.length; j++) {
        if ((I = O(x.charAt(j))) === "L") return !1;
        if (I === "R") return !0;
      }
      return !1;
    }, q = function(x, I, j, K) {
      var nA, iA, cA, oA, dA = I[K];
      switch (dA) {
        case "L":
        case "R":
          y = !1;
          break;
        case "N":
        case "AN":
          break;
        case "EN":
          y && (dA = "AN");
          break;
        case "AL":
          y = !0, dA = "R";
          break;
        case "WS":
          dA = "N";
          break;
        case "CS":
          K < 1 || K + 1 >= I.length || (nA = j[K - 1]) !== "EN" && nA !== "AN" || (iA = I[K + 1]) !== "EN" && iA !== "AN" ? dA = "N" : y && (iA = "AN"), dA = iA === nA ? iA : "N";
          break;
        case "ES":
          dA = (nA = K > 0 ? j[K - 1] : "B") === "EN" && K + 1 < I.length && I[K + 1] === "EN" ? "EN" : "N";
          break;
        case "ET":
          if (K > 0 && j[K - 1] === "EN") {
            dA = "EN";
            break;
          }
          if (y) {
            dA = "N";
            break;
          }
          for (cA = K + 1, oA = I.length; cA < oA && I[cA] === "ET"; ) cA++;
          dA = cA < oA && I[cA] === "EN" ? "EN" : "N";
          break;
        case "NSM":
          if (a && !l) {
            for (oA = I.length, cA = K + 1; cA < oA && I[cA] === "NSM"; ) cA++;
            if (cA < oA) {
              var pA = x[K], LA = pA >= 1425 && pA <= 2303 || pA === 64286;
              if (nA = I[cA], LA && (nA === "R" || nA === "AL")) {
                dA = "R";
                break;
              }
            }
          }
          dA = K < 1 || (nA = I[K - 1]) === "B" ? "N" : j[K - 1];
          break;
        case "B":
          y = !1, n = !0, dA = H;
          break;
        case "S":
          i = !0, dA = "N";
          break;
        case "LRE":
        case "RLE":
        case "LRO":
        case "RLO":
        case "PDF":
          y = !1;
          break;
        case "BN":
          dA = "N";
      }
      return dA;
    }, W = function(x, I, j) {
      var K = x.split("");
      return j && D(K, j, { hiLevel: H }), K.reverse(), I && I.reverse(), K.join("");
    }, D = function(x, I, j) {
      var K, nA, iA, cA, oA, dA = -1, pA = x.length, LA = 0, E = [], M = H ? d : w, z = [];
      for (y = !1, n = !1, i = !1, nA = 0; nA < pA; nA++) z[nA] = O(x[nA]);
      for (iA = 0; iA < pA; iA++) {
        if (oA = LA, E[iA] = q(x, z, E, iA), K = 240 & (LA = M[oA][C[E[iA]]]), LA &= 15, I[iA] = cA = M[LA][5], K > 0) if (K === 16) {
          for (nA = dA; nA < iA; nA++) I[nA] = 1;
          dA = -1;
        } else dA = -1;
        if (M[LA][6]) dA === -1 && (dA = iA);
        else if (dA > -1) {
          for (nA = dA; nA < iA; nA++) I[nA] = cA;
          dA = -1;
        }
        z[iA] === "B" && (I[iA] = 0), j.hiLevel |= cA;
      }
      i && function(X, eA, sA) {
        for (var fA = 0; fA < sA; fA++) if (X[fA] === "S") {
          eA[fA] = H;
          for (var hA = fA - 1; hA >= 0 && X[hA] === "WS"; hA--) eA[hA] = H;
        }
      }(z, I, pA);
    }, R = function(x, I, j, K, nA) {
      if (!(nA.hiLevel < x)) {
        if (x === 1 && H === 1 && !n) return I.reverse(), void (j && j.reverse());
        for (var iA, cA, oA, dA, pA = I.length, LA = 0; LA < pA; ) {
          if (K[LA] >= x) {
            for (oA = LA + 1; oA < pA && K[oA] >= x; ) oA++;
            for (dA = LA, cA = oA - 1; dA < cA; dA++, cA--) iA = I[dA], I[dA] = I[cA], I[cA] = iA, j && (iA = j[dA], j[dA] = j[cA], j[cA] = iA);
            LA = oA;
          }
          LA++;
        }
      }
    }, Y = function(x, I, j) {
      var K = x.split(""), nA = { hiLevel: H };
      return j || (j = []), D(K, j, nA), function(iA, cA, oA) {
        if (oA.hiLevel !== 0 && g) for (var dA, pA = 0; pA < iA.length; pA++) cA[pA] === 1 && (dA = _.indexOf(iA[pA])) >= 0 && (iA[pA] = _[dA + 1]);
      }(K, j, nA), R(2, K, I, j, nA), R(1, K, I, j, nA), K.join("");
    };
    return this.__bidiEngine__.doBidiReorder = function(x, I, j) {
      if (function(nA, iA) {
        if (iA) for (var cA = 0; cA < nA.length; cA++) iA[cA] = cA;
        l === void 0 && (l = P(nA)), f === void 0 && (f = P(nA));
      }(x, I), a || !s || f) if (a && s && l ^ f) H = l ? 1 : 0, x = W(x, I, j);
      else if (!a && s && f) H = l ? 1 : 0, x = Y(x, I, j), x = W(x, I);
      else if (!a || l || s || f) {
        if (a && !s && l ^ f) x = W(x, I), l ? (H = 0, x = Y(x, I, j)) : (H = 1, x = Y(x, I, j), x = W(x, I));
        else if (a && l && !s && f) H = 1, x = Y(x, I, j), x = W(x, I);
        else if (!a && !s && l ^ f) {
          var K = g;
          l ? (H = 1, x = Y(x, I, j), H = 0, g = !1, x = Y(x, I, j), g = K) : (H = 0, x = Y(x, I, j), x = W(x, I), H = 1, g = !1, x = Y(x, I, j), g = K, x = W(x, I));
        }
      } else H = 0, x = Y(x, I, j);
      else H = l ? 1 : 0, x = Y(x, I, j);
      return x;
    }, this.__bidiEngine__.setOptions = function(x) {
      x && (a = x.isInputVisual, s = x.isOutputVisual, l = x.isInputRtl, f = x.isOutputRtl, g = x.isSymmetricSwapping);
    }, this.__bidiEngine__.setOptions(r), this.__bidiEngine__;
  };
  var A = ["BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "S", "B", "S", "WS", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "B", "B", "B", "S", "WS", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "BN", "BN", "BN", "BN", "BN", "BN", "B", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "BN", "CS", "N", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "L", "N", "N", "BN", "N", "N", "ET", "ET", "EN", "EN", "N", "L", "N", "N", "N", "EN", "L", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "L", "N", "N", "N", "N", "N", "ET", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "NSM", "R", "NSM", "NSM", "R", "NSM", "NSM", "R", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AN", "AN", "AN", "AN", "AN", "AN", "N", "N", "AL", "ET", "ET", "AL", "CS", "AL", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "AN", "ET", "AN", "AN", "AL", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AN", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "NSM", "NSM", "N", "NSM", "NSM", "NSM", "NSM", "AL", "AL", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "NSM", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "R", "R", "N", "N", "N", "N", "R", "N", "N", "N", "N", "N", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "WS", "BN", "BN", "BN", "L", "R", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "B", "LRE", "RLE", "PDF", "LRO", "RLO", "CS", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "WS", "BN", "BN", "BN", "BN", "BN", "N", "LRI", "RLI", "FSI", "PDI", "BN", "BN", "BN", "BN", "BN", "BN", "EN", "L", "N", "N", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "L", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "ES", "ES", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "R", "NSM", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "ES", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "N", "R", "R", "R", "R", "R", "N", "R", "N", "R", "R", "N", "R", "R", "N", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "NSM", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "CS", "N", "CS", "N", "N", "CS", "N", "N", "N", "N", "N", "N", "N", "N", "N", "ET", "N", "N", "ES", "ES", "N", "N", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "AL", "AL", "AL", "AL", "AL", "N", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "AL", "N", "N", "BN", "N", "N", "N", "ET", "ET", "ET", "N", "N", "N", "N", "N", "ES", "CS", "ES", "CS", "CS", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "EN", "CS", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "L", "L", "L", "N", "N", "L", "L", "L", "N", "N", "N", "ET", "ET", "N", "N", "N", "ET", "ET", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "N"], t = new e.__bidiEngine__({ isInputVisual: !0 });
  e.API.events.push(["postProcessText", function(r) {
    var n = r.text, i = (r.x, r.y, r.options || {}), a = (r.mutex, i.lang, []);
    if (i.isInputVisual = typeof i.isInputVisual != "boolean" || i.isInputVisual, t.setOptions(i), Object.prototype.toString.call(n) === "[object Array]") {
      var l = 0;
      for (a = [], l = 0; l < n.length; l += 1) Object.prototype.toString.call(n[l]) === "[object Array]" ? a.push([t.doBidiReorder(n[l][0]), n[l][1], n[l][2]]) : a.push([t.doBidiReorder(n[l])]);
      r.text = a;
    } else r.text = t.doBidiReorder(n);
    t.setOptions({ isInputVisual: !0 });
  }]);
}(WA), WA.API.TTFFont = function() {
  function e(A) {
    var t;
    if (this.rawData = A, t = this.contents = new qn(A), this.contents.pos = 4, t.readString(4) === "ttcf") throw new Error("TTCF not supported.");
    t.pos = 0, this.parse(), this.subset = new Sw(this), this.registerTTF();
  }
  return e.open = function(A) {
    return new e(A);
  }, e.prototype.parse = function() {
    return this.directory = new pw(this.contents), this.head = new ww(this), this.name = new Cw(this), this.cmap = new s1(this), this.toUnicode = {}, this.hhea = new vw(this), this.maxp = new Fw(this), this.hmtx = new Qw(this), this.post = new yw(this), this.os2 = new mw(this), this.loca = new Lw(this), this.glyf = new Uw(this), this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender, this.decender = this.os2.exists && this.os2.decender || this.hhea.decender, this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap, this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax];
  }, e.prototype.registerTTF = function() {
    var A, t, r, n, i;
    if (this.scaleFactor = 1e3 / this.head.unitsPerEm, this.bbox = (function() {
      var a, l, s, f;
      for (f = [], a = 0, l = (s = this.bbox).length; a < l; a++) A = s[a], f.push(Math.round(A * this.scaleFactor));
      return f;
    }).call(this), this.stemV = 0, this.post.exists ? (r = 255 & (n = this.post.italic_angle), 32768 & (t = n >> 16) && (t = -(1 + (65535 ^ t))), this.italicAngle = +(t + "." + r)) : this.italicAngle = 0, this.ascender = Math.round(this.ascender * this.scaleFactor), this.decender = Math.round(this.decender * this.scaleFactor), this.lineGap = Math.round(this.lineGap * this.scaleFactor), this.capHeight = this.os2.exists && this.os2.capHeight || this.ascender, this.xHeight = this.os2.exists && this.os2.xHeight || 0, this.familyClass = (this.os2.exists && this.os2.familyClass || 0) >> 8, this.isSerif = (i = this.familyClass) === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 7, this.isScript = this.familyClass === 10, this.flags = 0, this.post.isFixedPitch && (this.flags |= 1), this.isSerif && (this.flags |= 2), this.isScript && (this.flags |= 8), this.italicAngle !== 0 && (this.flags |= 64), this.flags |= 32, !this.cmap.unicode) throw new Error("No unicode cmap for font");
  }, e.prototype.characterToGlyph = function(A) {
    var t;
    return ((t = this.cmap.unicode) != null ? t.codeMap[A] : void 0) || 0;
  }, e.prototype.widthOfGlyph = function(A) {
    var t;
    return t = 1e3 / this.head.unitsPerEm, this.hmtx.forGlyph(A).advance * t;
  }, e.prototype.widthOfString = function(A, t, r) {
    var n, i, a, l;
    for (a = 0, i = 0, l = (A = "" + A).length; 0 <= l ? i < l : i > l; i = 0 <= l ? ++i : --i) n = A.charCodeAt(i), a += this.widthOfGlyph(this.characterToGlyph(n)) + r * (1e3 / t) || 0;
    return a * (t / 1e3);
  }, e.prototype.lineHeight = function(A, t) {
    var r;
    return t == null && (t = !1), r = t ? this.lineGap : 0, (this.ascender + r - this.decender) / 1e3 * A;
  }, e;
}();
var _r, qn = function() {
  function e(A) {
    this.data = A ?? [], this.pos = 0, this.length = this.data.length;
  }
  return e.prototype.readByte = function() {
    return this.data[this.pos++];
  }, e.prototype.writeByte = function(A) {
    return this.data[this.pos++] = A;
  }, e.prototype.readUInt32 = function() {
    return 16777216 * this.readByte() + (this.readByte() << 16) + (this.readByte() << 8) + this.readByte();
  }, e.prototype.writeUInt32 = function(A) {
    return this.writeByte(A >>> 24 & 255), this.writeByte(A >> 16 & 255), this.writeByte(A >> 8 & 255), this.writeByte(255 & A);
  }, e.prototype.readInt32 = function() {
    var A;
    return (A = this.readUInt32()) >= 2147483648 ? A - 4294967296 : A;
  }, e.prototype.writeInt32 = function(A) {
    return A < 0 && (A += 4294967296), this.writeUInt32(A);
  }, e.prototype.readUInt16 = function() {
    return this.readByte() << 8 | this.readByte();
  }, e.prototype.writeUInt16 = function(A) {
    return this.writeByte(A >> 8 & 255), this.writeByte(255 & A);
  }, e.prototype.readInt16 = function() {
    var A;
    return (A = this.readUInt16()) >= 32768 ? A - 65536 : A;
  }, e.prototype.writeInt16 = function(A) {
    return A < 0 && (A += 65536), this.writeUInt16(A);
  }, e.prototype.readString = function(A) {
    var t, r;
    for (r = [], t = 0; 0 <= A ? t < A : t > A; t = 0 <= A ? ++t : --t) r[t] = String.fromCharCode(this.readByte());
    return r.join("");
  }, e.prototype.writeString = function(A) {
    var t, r, n;
    for (n = [], t = 0, r = A.length; 0 <= r ? t < r : t > r; t = 0 <= r ? ++t : --t) n.push(this.writeByte(A.charCodeAt(t)));
    return n;
  }, e.prototype.readShort = function() {
    return this.readInt16();
  }, e.prototype.writeShort = function(A) {
    return this.writeInt16(A);
  }, e.prototype.readLongLong = function() {
    var A, t, r, n, i, a, l, s;
    return A = this.readByte(), t = this.readByte(), r = this.readByte(), n = this.readByte(), i = this.readByte(), a = this.readByte(), l = this.readByte(), s = this.readByte(), 128 & A ? -1 * (72057594037927940 * (255 ^ A) + 281474976710656 * (255 ^ t) + 1099511627776 * (255 ^ r) + 4294967296 * (255 ^ n) + 16777216 * (255 ^ i) + 65536 * (255 ^ a) + 256 * (255 ^ l) + (255 ^ s) + 1) : 72057594037927940 * A + 281474976710656 * t + 1099511627776 * r + 4294967296 * n + 16777216 * i + 65536 * a + 256 * l + s;
  }, e.prototype.writeLongLong = function(A) {
    var t, r;
    return t = Math.floor(A / 4294967296), r = 4294967295 & A, this.writeByte(t >> 24 & 255), this.writeByte(t >> 16 & 255), this.writeByte(t >> 8 & 255), this.writeByte(255 & t), this.writeByte(r >> 24 & 255), this.writeByte(r >> 16 & 255), this.writeByte(r >> 8 & 255), this.writeByte(255 & r);
  }, e.prototype.readInt = function() {
    return this.readInt32();
  }, e.prototype.writeInt = function(A) {
    return this.writeInt32(A);
  }, e.prototype.read = function(A) {
    var t, r;
    for (t = [], r = 0; 0 <= A ? r < A : r > A; r = 0 <= A ? ++r : --r) t.push(this.readByte());
    return t;
  }, e.prototype.write = function(A) {
    var t, r, n, i;
    for (i = [], r = 0, n = A.length; r < n; r++) t = A[r], i.push(this.writeByte(t));
    return i;
  }, e;
}(), pw = function() {
  var e;
  function A(t) {
    var r, n, i;
    for (this.scalarType = t.readInt(), this.tableCount = t.readShort(), this.searchRange = t.readShort(), this.entrySelector = t.readShort(), this.rangeShift = t.readShort(), this.tables = {}, n = 0, i = this.tableCount; 0 <= i ? n < i : n > i; n = 0 <= i ? ++n : --n) r = { tag: t.readString(4), checksum: t.readInt(), offset: t.readInt(), length: t.readInt() }, this.tables[r.tag] = r;
  }
  return A.prototype.encode = function(t) {
    var r, n, i, a, l, s, f, g, p, w, d, C, b;
    for (b in d = Object.keys(t).length, s = Math.log(2), p = 16 * Math.floor(Math.log(d) / s), a = Math.floor(p / s), g = 16 * d - p, (n = new qn()).writeInt(this.scalarType), n.writeShort(d), n.writeShort(p), n.writeShort(a), n.writeShort(g), i = 16 * d, f = n.pos + i, l = null, C = [], t) for (w = t[b], n.writeString(b), n.writeInt(e(w)), n.writeInt(f), n.writeInt(w.length), C = C.concat(w), b === "head" && (l = f), f += w.length; f % 4; ) C.push(0), f++;
    return n.write(C), r = 2981146554 - e(n.data), n.pos = l + 8, n.writeUInt32(r), n.data;
  }, e = function(t) {
    var r, n, i, a;
    for (t = l1.call(t); t.length % 4; ) t.push(0);
    for (i = new qn(t), n = 0, r = 0, a = t.length; r < a; r = r += 4) n += i.readUInt32();
    return 4294967295 & n;
  }, A;
}(), Bw = {}.hasOwnProperty, $r = function(e, A) {
  for (var t in A) Bw.call(A, t) && (e[t] = A[t]);
  function r() {
    this.constructor = e;
  }
  return r.prototype = A.prototype, e.prototype = new r(), e.__super__ = A.prototype, e;
};
_r = function() {
  function e(A) {
    var t;
    this.file = A, t = this.file.directory.tables[this.tag], this.exists = !!t, t && (this.offset = t.offset, this.length = t.length, this.parse(this.file.contents));
  }
  return e.prototype.parse = function() {
  }, e.prototype.encode = function() {
  }, e.prototype.raw = function() {
    return this.exists ? (this.file.contents.pos = this.offset, this.file.contents.read(this.length)) : null;
  }, e;
}();
var ww = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "head", A.prototype.parse = function(t) {
    return t.pos = this.offset, this.version = t.readInt(), this.revision = t.readInt(), this.checkSumAdjustment = t.readInt(), this.magicNumber = t.readInt(), this.flags = t.readShort(), this.unitsPerEm = t.readShort(), this.created = t.readLongLong(), this.modified = t.readLongLong(), this.xMin = t.readShort(), this.yMin = t.readShort(), this.xMax = t.readShort(), this.yMax = t.readShort(), this.macStyle = t.readShort(), this.lowestRecPPEM = t.readShort(), this.fontDirectionHint = t.readShort(), this.indexToLocFormat = t.readShort(), this.glyphDataFormat = t.readShort();
  }, A.prototype.encode = function(t) {
    var r;
    return (r = new qn()).writeInt(this.version), r.writeInt(this.revision), r.writeInt(this.checkSumAdjustment), r.writeInt(this.magicNumber), r.writeShort(this.flags), r.writeShort(this.unitsPerEm), r.writeLongLong(this.created), r.writeLongLong(this.modified), r.writeShort(this.xMin), r.writeShort(this.yMin), r.writeShort(this.xMax), r.writeShort(this.yMax), r.writeShort(this.macStyle), r.writeShort(this.lowestRecPPEM), r.writeShort(this.fontDirectionHint), r.writeShort(t), r.writeShort(this.glyphDataFormat), r.data;
  }, A;
}(), m0 = function() {
  function e(A, t) {
    var r, n, i, a, l, s, f, g, p, w, d, C, b, _, m, y, H;
    switch (this.platformID = A.readUInt16(), this.encodingID = A.readShort(), this.offset = t + A.readInt(), p = A.pos, A.pos = this.offset, this.format = A.readUInt16(), this.length = A.readUInt16(), this.language = A.readUInt16(), this.isUnicode = this.platformID === 3 && this.encodingID === 1 && this.format === 4 || this.platformID === 0 && this.format === 4, this.codeMap = {}, this.format) {
      case 0:
        for (s = 0; s < 256; ++s) this.codeMap[s] = A.readByte();
        break;
      case 4:
        for (d = A.readUInt16(), w = d / 2, A.pos += 6, i = function() {
          var O, P;
          for (P = [], s = O = 0; 0 <= w ? O < w : O > w; s = 0 <= w ? ++O : --O) P.push(A.readUInt16());
          return P;
        }(), A.pos += 2, b = function() {
          var O, P;
          for (P = [], s = O = 0; 0 <= w ? O < w : O > w; s = 0 <= w ? ++O : --O) P.push(A.readUInt16());
          return P;
        }(), f = function() {
          var O, P;
          for (P = [], s = O = 0; 0 <= w ? O < w : O > w; s = 0 <= w ? ++O : --O) P.push(A.readUInt16());
          return P;
        }(), g = function() {
          var O, P;
          for (P = [], s = O = 0; 0 <= w ? O < w : O > w; s = 0 <= w ? ++O : --O) P.push(A.readUInt16());
          return P;
        }(), n = (this.length - A.pos + this.offset) / 2, l = function() {
          var O, P;
          for (P = [], s = O = 0; 0 <= n ? O < n : O > n; s = 0 <= n ? ++O : --O) P.push(A.readUInt16());
          return P;
        }(), s = m = 0, H = i.length; m < H; s = ++m) for (_ = i[s], r = y = C = b[s]; C <= _ ? y <= _ : y >= _; r = C <= _ ? ++y : --y) g[s] === 0 ? a = r + f[s] : (a = l[g[s] / 2 + (r - C) - (w - s)] || 0) !== 0 && (a += f[s]), this.codeMap[r] = 65535 & a;
    }
    A.pos = p;
  }
  return e.encode = function(A, t) {
    var r, n, i, a, l, s, f, g, p, w, d, C, b, _, m, y, H, O, P, q, W, D, R, Y, x, I, j, K, nA, iA, cA, oA, dA, pA, LA, E, M, z, X, eA, sA, fA, hA, EA, QA, OA;
    switch (K = new qn(), a = Object.keys(A).sort(function(HA, zA) {
      return HA - zA;
    }), t) {
      case "macroman":
        for (b = 0, _ = function() {
          var HA = [];
          for (C = 0; C < 256; ++C) HA.push(0);
          return HA;
        }(), y = { 0: 0 }, i = {}, nA = 0, dA = a.length; nA < dA; nA++) y[hA = A[n = a[nA]]] == null && (y[hA] = ++b), i[n] = { old: A[n], new: y[A[n]] }, _[n] = y[A[n]];
        return K.writeUInt16(1), K.writeUInt16(0), K.writeUInt32(12), K.writeUInt16(0), K.writeUInt16(262), K.writeUInt16(0), K.write(_), { charMap: i, subtable: K.data, maxGlyphID: b + 1 };
      case "unicode":
        for (I = [], p = [], H = 0, y = {}, r = {}, m = f = null, iA = 0, pA = a.length; iA < pA; iA++) y[P = A[n = a[iA]]] == null && (y[P] = ++H), r[n] = { old: P, new: y[P] }, l = y[P] - n, m != null && l === f || (m && p.push(m), I.push(n), f = l), m = n;
        for (m && p.push(m), p.push(65535), I.push(65535), Y = 2 * (R = I.length), D = 2 * Math.pow(Math.log(R) / Math.LN2, 2), w = Math.log(D / 2) / Math.LN2, W = 2 * R - D, s = [], q = [], d = [], C = cA = 0, LA = I.length; cA < LA; C = ++cA) {
          if (x = I[C], g = p[C], x === 65535) {
            s.push(0), q.push(0);
            break;
          }
          if (x - (j = r[x].new) >= 32768) for (s.push(0), q.push(2 * (d.length + R - C)), n = oA = x; x <= g ? oA <= g : oA >= g; n = x <= g ? ++oA : --oA) d.push(r[n].new);
          else s.push(j - x), q.push(0);
        }
        for (K.writeUInt16(3), K.writeUInt16(1), K.writeUInt32(12), K.writeUInt16(4), K.writeUInt16(16 + 8 * R + 2 * d.length), K.writeUInt16(0), K.writeUInt16(Y), K.writeUInt16(D), K.writeUInt16(w), K.writeUInt16(W), sA = 0, E = p.length; sA < E; sA++) n = p[sA], K.writeUInt16(n);
        for (K.writeUInt16(0), fA = 0, M = I.length; fA < M; fA++) n = I[fA], K.writeUInt16(n);
        for (EA = 0, z = s.length; EA < z; EA++) l = s[EA], K.writeUInt16(l);
        for (QA = 0, X = q.length; QA < X; QA++) O = q[QA], K.writeUInt16(O);
        for (OA = 0, eA = d.length; OA < eA; OA++) b = d[OA], K.writeUInt16(b);
        return { charMap: r, subtable: K.data, maxGlyphID: H + 1 };
    }
  }, e;
}(), s1 = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "cmap", A.prototype.parse = function(t) {
    var r, n, i;
    for (t.pos = this.offset, this.version = t.readUInt16(), i = t.readUInt16(), this.tables = [], this.unicode = null, n = 0; 0 <= i ? n < i : n > i; n = 0 <= i ? ++n : --n) r = new m0(t, this.offset), this.tables.push(r), r.isUnicode && this.unicode == null && (this.unicode = r);
    return !0;
  }, A.encode = function(t, r) {
    var n, i;
    return r == null && (r = "macroman"), n = m0.encode(t, r), (i = new qn()).writeUInt16(0), i.writeUInt16(1), n.table = i.data.concat(n.subtable), n;
  }, A;
}(), vw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "hhea", A.prototype.parse = function(t) {
    return t.pos = this.offset, this.version = t.readInt(), this.ascender = t.readShort(), this.decender = t.readShort(), this.lineGap = t.readShort(), this.advanceWidthMax = t.readShort(), this.minLeftSideBearing = t.readShort(), this.minRightSideBearing = t.readShort(), this.xMaxExtent = t.readShort(), this.caretSlopeRise = t.readShort(), this.caretSlopeRun = t.readShort(), this.caretOffset = t.readShort(), t.pos += 8, this.metricDataFormat = t.readShort(), this.numberOfMetrics = t.readUInt16();
  }, A;
}(), mw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "OS/2", A.prototype.parse = function(t) {
    if (t.pos = this.offset, this.version = t.readUInt16(), this.averageCharWidth = t.readShort(), this.weightClass = t.readUInt16(), this.widthClass = t.readUInt16(), this.type = t.readShort(), this.ySubscriptXSize = t.readShort(), this.ySubscriptYSize = t.readShort(), this.ySubscriptXOffset = t.readShort(), this.ySubscriptYOffset = t.readShort(), this.ySuperscriptXSize = t.readShort(), this.ySuperscriptYSize = t.readShort(), this.ySuperscriptXOffset = t.readShort(), this.ySuperscriptYOffset = t.readShort(), this.yStrikeoutSize = t.readShort(), this.yStrikeoutPosition = t.readShort(), this.familyClass = t.readShort(), this.panose = function() {
      var r, n;
      for (n = [], r = 0; r < 10; ++r) n.push(t.readByte());
      return n;
    }(), this.charRange = function() {
      var r, n;
      for (n = [], r = 0; r < 4; ++r) n.push(t.readInt());
      return n;
    }(), this.vendorID = t.readString(4), this.selection = t.readShort(), this.firstCharIndex = t.readShort(), this.lastCharIndex = t.readShort(), this.version > 0 && (this.ascent = t.readShort(), this.descent = t.readShort(), this.lineGap = t.readShort(), this.winAscent = t.readShort(), this.winDescent = t.readShort(), this.codePageRange = function() {
      var r, n;
      for (n = [], r = 0; r < 2; r = ++r) n.push(t.readInt());
      return n;
    }(), this.version > 1)) return this.xHeight = t.readShort(), this.capHeight = t.readShort(), this.defaultChar = t.readShort(), this.breakChar = t.readShort(), this.maxContext = t.readShort();
  }, A;
}(), yw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "post", A.prototype.parse = function(t) {
    var r, n, i;
    switch (t.pos = this.offset, this.format = t.readInt(), this.italicAngle = t.readInt(), this.underlinePosition = t.readShort(), this.underlineThickness = t.readShort(), this.isFixedPitch = t.readInt(), this.minMemType42 = t.readInt(), this.maxMemType42 = t.readInt(), this.minMemType1 = t.readInt(), this.maxMemType1 = t.readInt(), this.format) {
      case 65536:
        break;
      case 131072:
        var a;
        for (n = t.readUInt16(), this.glyphNameIndex = [], a = 0; 0 <= n ? a < n : a > n; a = 0 <= n ? ++a : --a) this.glyphNameIndex.push(t.readUInt16());
        for (this.names = [], i = []; t.pos < this.offset + this.length; ) r = t.readByte(), i.push(this.names.push(t.readString(r)));
        return i;
      case 151552:
        return n = t.readUInt16(), this.offsets = t.read(n);
      case 196608:
        break;
      case 262144:
        return this.map = (function() {
          var l, s, f;
          for (f = [], a = l = 0, s = this.file.maxp.numGlyphs; 0 <= s ? l < s : l > s; a = 0 <= s ? ++l : --l) f.push(t.readUInt32());
          return f;
        }).call(this);
    }
  }, A;
}(), bw = function(e, A) {
  this.raw = e, this.length = e.length, this.platformID = A.platformID, this.encodingID = A.encodingID, this.languageID = A.languageID;
}, Cw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "name", A.prototype.parse = function(t) {
    var r, n, i, a, l, s, f, g, p, w, d;
    for (t.pos = this.offset, t.readShort(), r = t.readShort(), s = t.readShort(), n = [], a = 0; 0 <= r ? a < r : a > r; a = 0 <= r ? ++a : --a) n.push({ platformID: t.readShort(), encodingID: t.readShort(), languageID: t.readShort(), nameID: t.readShort(), length: t.readShort(), offset: this.offset + s + t.readShort() });
    for (f = {}, a = p = 0, w = n.length; p < w; a = ++p) i = n[a], t.pos = i.offset, g = t.readString(i.length), l = new bw(g, i), f[d = i.nameID] == null && (f[d] = []), f[i.nameID].push(l);
    this.strings = f, this.copyright = f[0], this.fontFamily = f[1], this.fontSubfamily = f[2], this.uniqueSubfamily = f[3], this.fontName = f[4], this.version = f[5];
    try {
      this.postscriptName = f[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    } catch {
      this.postscriptName = f[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g, "");
    }
    return this.trademark = f[7], this.manufacturer = f[8], this.designer = f[9], this.description = f[10], this.vendorUrl = f[11], this.designerUrl = f[12], this.license = f[13], this.licenseUrl = f[14], this.preferredFamily = f[15], this.preferredSubfamily = f[17], this.compatibleFull = f[18], this.sampleText = f[19];
  }, A;
}(), Fw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "maxp", A.prototype.parse = function(t) {
    return t.pos = this.offset, this.version = t.readInt(), this.numGlyphs = t.readUInt16(), this.maxPoints = t.readUInt16(), this.maxContours = t.readUInt16(), this.maxCompositePoints = t.readUInt16(), this.maxComponentContours = t.readUInt16(), this.maxZones = t.readUInt16(), this.maxTwilightPoints = t.readUInt16(), this.maxStorage = t.readUInt16(), this.maxFunctionDefs = t.readUInt16(), this.maxInstructionDefs = t.readUInt16(), this.maxStackElements = t.readUInt16(), this.maxSizeOfInstructions = t.readUInt16(), this.maxComponentElements = t.readUInt16(), this.maxComponentDepth = t.readUInt16();
  }, A;
}(), Qw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "hmtx", A.prototype.parse = function(t) {
    var r, n, i, a, l, s, f;
    for (t.pos = this.offset, this.metrics = [], r = 0, s = this.file.hhea.numberOfMetrics; 0 <= s ? r < s : r > s; r = 0 <= s ? ++r : --r) this.metrics.push({ advance: t.readUInt16(), lsb: t.readInt16() });
    for (i = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics, this.leftSideBearings = function() {
      var g, p;
      for (p = [], r = g = 0; 0 <= i ? g < i : g > i; r = 0 <= i ? ++g : --g) p.push(t.readInt16());
      return p;
    }(), this.widths = (function() {
      var g, p, w, d;
      for (d = [], g = 0, p = (w = this.metrics).length; g < p; g++) a = w[g], d.push(a.advance);
      return d;
    }).call(this), n = this.widths[this.widths.length - 1], f = [], r = l = 0; 0 <= i ? l < i : l > i; r = 0 <= i ? ++l : --l) f.push(this.widths.push(n));
    return f;
  }, A.prototype.forGlyph = function(t) {
    return t in this.metrics ? this.metrics[t] : { advance: this.metrics[this.metrics.length - 1].advance, lsb: this.leftSideBearings[t - this.metrics.length] };
  }, A;
}(), l1 = [].slice, Uw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "glyf", A.prototype.parse = function() {
    return this.cache = {};
  }, A.prototype.glyphFor = function(t) {
    var r, n, i, a, l, s, f, g, p, w;
    return t in this.cache ? this.cache[t] : (a = this.file.loca, r = this.file.contents, n = a.indexOf(t), (i = a.lengthOf(t)) === 0 ? this.cache[t] = null : (r.pos = this.offset + n, l = (s = new qn(r.read(i))).readShort(), g = s.readShort(), w = s.readShort(), f = s.readShort(), p = s.readShort(), this.cache[t] = l === -1 ? new xw(s, g, w, f, p) : new Ew(s, l, g, w, f, p), this.cache[t]));
  }, A.prototype.encode = function(t, r, n) {
    var i, a, l, s, f;
    for (l = [], a = [], s = 0, f = r.length; s < f; s++) i = t[r[s]], a.push(l.length), i && (l = l.concat(i.encode(n)));
    return a.push(l.length), { table: l, offsets: a };
  }, A;
}(), Ew = function() {
  function e(A, t, r, n, i, a) {
    this.raw = A, this.numberOfContours = t, this.xMin = r, this.yMin = n, this.xMax = i, this.yMax = a, this.compound = !1;
  }
  return e.prototype.encode = function() {
    return this.raw.data;
  }, e;
}(), xw = function() {
  function e(A, t, r, n, i) {
    var a, l;
    for (this.raw = A, this.xMin = t, this.yMin = r, this.xMax = n, this.yMax = i, this.compound = !0, this.glyphIDs = [], this.glyphOffsets = [], a = this.raw; l = a.readShort(), this.glyphOffsets.push(a.pos), this.glyphIDs.push(a.readUInt16()), 32 & l; ) a.pos += 1 & l ? 4 : 2, 128 & l ? a.pos += 8 : 64 & l ? a.pos += 4 : 8 & l && (a.pos += 2);
  }
  return e.prototype.encode = function() {
    var A, t, r;
    for (t = new qn(l1.call(this.raw.data)), A = 0, r = this.glyphIDs.length; A < r; ++A) t.pos = this.glyphOffsets[A];
    return t.data;
  }, e;
}(), Lw = function(e) {
  function A() {
    return A.__super__.constructor.apply(this, arguments);
  }
  return $r(A, _r), A.prototype.tag = "loca", A.prototype.parse = function(t) {
    var r, n;
    return t.pos = this.offset, r = this.file.head.indexToLocFormat, this.offsets = r === 0 ? (function() {
      var i, a;
      for (a = [], n = 0, i = this.length; n < i; n += 2) a.push(2 * t.readUInt16());
      return a;
    }).call(this) : (function() {
      var i, a;
      for (a = [], n = 0, i = this.length; n < i; n += 4) a.push(t.readUInt32());
      return a;
    }).call(this);
  }, A.prototype.indexOf = function(t) {
    return this.offsets[t];
  }, A.prototype.lengthOf = function(t) {
    return this.offsets[t + 1] - this.offsets[t];
  }, A.prototype.encode = function(t, r) {
    for (var n = new Uint32Array(this.offsets.length), i = 0, a = 0, l = 0; l < n.length; ++l) if (n[l] = i, a < r.length && r[a] == l) {
      ++a, n[l] = i;
      var s = this.offsets[l], f = this.offsets[l + 1] - s;
      f > 0 && (i += f);
    }
    for (var g = new Array(4 * n.length), p = 0; p < n.length; ++p) g[4 * p + 3] = 255 & n[p], g[4 * p + 2] = (65280 & n[p]) >> 8, g[4 * p + 1] = (16711680 & n[p]) >> 16, g[4 * p] = (4278190080 & n[p]) >> 24;
    return g;
  }, A;
}(), Sw = function() {
  function e(A) {
    this.font = A, this.subset = {}, this.unicodes = {}, this.next = 33;
  }
  return e.prototype.generateCmap = function() {
    var A, t, r, n, i;
    for (t in n = this.font.cmap.tables[0].codeMap, A = {}, i = this.subset) r = i[t], A[t] = n[r];
    return A;
  }, e.prototype.glyphsFor = function(A) {
    var t, r, n, i, a, l, s;
    for (n = {}, a = 0, l = A.length; a < l; a++) n[i = A[a]] = this.font.glyf.glyphFor(i);
    for (i in t = [], n) (r = n[i]) != null && r.compound && t.push.apply(t, r.glyphIDs);
    if (t.length > 0) for (i in s = this.glyphsFor(t)) r = s[i], n[i] = r;
    return n;
  }, e.prototype.encode = function(A, t) {
    var r, n, i, a, l, s, f, g, p, w, d, C, b, _, m;
    for (n in r = s1.encode(this.generateCmap(), "unicode"), a = this.glyphsFor(A), d = { 0: 0 }, m = r.charMap) d[(s = m[n]).old] = s.new;
    for (C in w = r.maxGlyphID, a) C in d || (d[C] = w++);
    return g = function(y) {
      var H, O;
      for (H in O = {}, y) O[y[H]] = H;
      return O;
    }(d), p = Object.keys(g).sort(function(y, H) {
      return y - H;
    }), b = function() {
      var y, H, O;
      for (O = [], y = 0, H = p.length; y < H; y++) l = p[y], O.push(g[l]);
      return O;
    }(), i = this.font.glyf.encode(a, b, d), f = this.font.loca.encode(i.offsets, b), _ = { cmap: this.font.cmap.raw(), glyf: i.table, loca: f, hmtx: this.font.hmtx.raw(), hhea: this.font.hhea.raw(), maxp: this.font.maxp.raw(), post: this.font.post.raw(), name: this.font.name.raw(), head: this.font.head.encode(t) }, this.font.os2.exists && (_["OS/2"] = this.font.os2.raw()), this.font.directory.encode(_);
  }, e;
}();
WA.API.PDFObject = function() {
  var e;
  function A() {
  }
  return e = function(t, r) {
    return (Array(r + 1).join("0") + t).slice(-r);
  }, A.convert = function(t) {
    var r, n, i, a;
    if (Array.isArray(t)) return "[" + function() {
      var l, s, f;
      for (f = [], l = 0, s = t.length; l < s; l++) r = t[l], f.push(A.convert(r));
      return f;
    }().join(" ") + "]";
    if (typeof t == "string") return "/" + t;
    if (t != null && t.isString) return "(" + t + ")";
    if (t instanceof Date) return "(D:" + e(t.getUTCFullYear(), 4) + e(t.getUTCMonth(), 2) + e(t.getUTCDate(), 2) + e(t.getUTCHours(), 2) + e(t.getUTCMinutes(), 2) + e(t.getUTCSeconds(), 2) + "Z)";
    if ({}.toString.call(t) === "[object Object]") {
      for (n in i = ["<<"], t) a = t[n], i.push("/" + n + " " + A.convert(a));
      return i.push(">>"), i.join(`
`);
    }
    return "" + t;
  }, A;
}();
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var tf = function(e, A) {
  return tf = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
  }, tf(e, A);
};
function Nr(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Class extends value " + String(A) + " is not a constructor or null");
  tf(e, A);
  function t() {
    this.constructor = e;
  }
  e.prototype = A === null ? Object.create(A) : (t.prototype = A.prototype, new t());
}
var rf = function() {
  return rf = Object.assign || function(A) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (A[i] = t[i]);
    }
    return A;
  }, rf.apply(this, arguments);
};
function _t(e, A, t, r) {
  function n(i) {
    return i instanceof t ? i : new t(function(a) {
      a(i);
    });
  }
  return new (t || (t = Promise))(function(i, a) {
    function l(g) {
      try {
        f(r.next(g));
      } catch (p) {
        a(p);
      }
    }
    function s(g) {
      try {
        f(r.throw(g));
      } catch (p) {
        a(p);
      }
    }
    function f(g) {
      g.done ? i(g.value) : n(g.value).then(l, s);
    }
    f((r = r.apply(e, [])).next());
  });
}
function Ut(e, A) {
  var t = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, n, i, a;
  return a = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function l(f) {
    return function(g) {
      return s([f, g]);
    };
  }
  function s(f) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; t; ) try {
      if (r = 1, n && (i = f[0] & 2 ? n.return : f[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, f[1])).done) return i;
      switch (n = 0, i && (f = [f[0] & 2, i.value]), f[0]) {
        case 0:
        case 1:
          i = f;
          break;
        case 4:
          return t.label++, { value: f[1], done: !1 };
        case 5:
          t.label++, n = f[1], f = [0];
          continue;
        case 7:
          f = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (i = t.trys, !(i = i.length > 0 && i[i.length - 1]) && (f[0] === 6 || f[0] === 2)) {
            t = 0;
            continue;
          }
          if (f[0] === 3 && (!i || f[1] > i[0] && f[1] < i[3])) {
            t.label = f[1];
            break;
          }
          if (f[0] === 6 && t.label < i[1]) {
            t.label = i[1], i = f;
            break;
          }
          if (i && t.label < i[2]) {
            t.label = i[2], t.ops.push(f);
            break;
          }
          i[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      f = A.call(e, t);
    } catch (g) {
      f = [6, g], n = 0;
    } finally {
      r = i = 0;
    }
    if (f[0] & 5) throw f[1];
    return { value: f[0] ? f[1] : void 0, done: !0 };
  }
}
function js(e, A, t) {
  if (arguments.length === 2) for (var r = 0, n = A.length, i; r < n; r++)
    (i || !(r in A)) && (i || (i = Array.prototype.slice.call(A, 0, r)), i[r] = A[r]);
  return e.concat(i || A);
}
var wn = (
  /** @class */
  function() {
    function e(A, t, r, n) {
      this.left = A, this.top = t, this.width = r, this.height = n;
    }
    return e.prototype.add = function(A, t, r, n) {
      return new e(this.left + A, this.top + t, this.width + r, this.height + n);
    }, e.fromClientRect = function(A, t) {
      return new e(t.left + A.windowBounds.left, t.top + A.windowBounds.top, t.width, t.height);
    }, e.fromDOMRectList = function(A, t) {
      var r = Array.from(t).find(function(n) {
        return n.width !== 0;
      });
      return r ? new e(r.left + A.windowBounds.left, r.top + A.windowBounds.top, r.width, r.height) : e.EMPTY;
    }, e.EMPTY = new e(0, 0, 0, 0), e;
  }()
), Vl = function(e, A) {
  return wn.fromClientRect(e, A.getBoundingClientRect());
}, Iw = function(e) {
  var A = e.body, t = e.documentElement;
  if (!A || !t)
    throw new Error("Unable to get document size");
  var r = Math.max(Math.max(A.scrollWidth, t.scrollWidth), Math.max(A.offsetWidth, t.offsetWidth), Math.max(A.clientWidth, t.clientWidth)), n = Math.max(Math.max(A.scrollHeight, t.scrollHeight), Math.max(A.offsetHeight, t.offsetHeight), Math.max(A.clientHeight, t.clientHeight));
  return new wn(0, 0, r, n);
}, zl = function(e) {
  for (var A = [], t = 0, r = e.length; t < r; ) {
    var n = e.charCodeAt(t++);
    if (n >= 55296 && n <= 56319 && t < r) {
      var i = e.charCodeAt(t++);
      (i & 64512) === 56320 ? A.push(((n & 1023) << 10) + (i & 1023) + 65536) : (A.push(n), t--);
    } else
      A.push(n);
  }
  return A;
}, Xe = function() {
  for (var e = [], A = 0; A < arguments.length; A++)
    e[A] = arguments[A];
  if (String.fromCodePoint)
    return String.fromCodePoint.apply(String, e);
  var t = e.length;
  if (!t)
    return "";
  for (var r = [], n = -1, i = ""; ++n < t; ) {
    var a = e[n];
    a <= 65535 ? r.push(a) : (a -= 65536, r.push((a >> 10) + 55296, a % 1024 + 56320)), (n + 1 === t || r.length > 16384) && (i += String.fromCharCode.apply(String, r), r.length = 0);
  }
  return i;
}, y0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _w = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Gs = 0; Gs < y0.length; Gs++)
  _w[y0.charCodeAt(Gs)] = Gs;
var b0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", yo = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Vs = 0; Vs < b0.length; Vs++)
  yo[b0.charCodeAt(Vs)] = Vs;
var Nw = function(e) {
  var A = e.length * 0.75, t = e.length, r, n = 0, i, a, l, s;
  e[e.length - 1] === "=" && (A--, e[e.length - 2] === "=" && A--);
  var f = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(A) : new Array(A), g = Array.isArray(f) ? f : new Uint8Array(f);
  for (r = 0; r < t; r += 4)
    i = yo[e.charCodeAt(r)], a = yo[e.charCodeAt(r + 1)], l = yo[e.charCodeAt(r + 2)], s = yo[e.charCodeAt(r + 3)], g[n++] = i << 2 | a >> 4, g[n++] = (a & 15) << 4 | l >> 2, g[n++] = (l & 3) << 6 | s & 63;
  return f;
}, Hw = function(e) {
  for (var A = e.length, t = [], r = 0; r < A; r += 2)
    t.push(e[r + 1] << 8 | e[r]);
  return t;
}, Ow = function(e) {
  for (var A = e.length, t = [], r = 0; r < A; r += 4)
    t.push(e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]);
  return t;
}, pi = 5, Tf = 11, hc = 2, Dw = Tf - pi, u1 = 65536 >> pi, Tw = 1 << pi, dc = Tw - 1, kw = 1024 >> pi, Pw = u1 + kw, Mw = Pw, Rw = 32, Kw = Mw + Rw, jw = 65536 >> Tf, Gw = 1 << Dw, Vw = Gw - 1, C0 = function(e, A, t) {
  return e.slice ? e.slice(A, t) : new Uint16Array(Array.prototype.slice.call(e, A, t));
}, zw = function(e, A, t) {
  return e.slice ? e.slice(A, t) : new Uint32Array(Array.prototype.slice.call(e, A, t));
}, qw = function(e, A) {
  var t = Nw(e), r = Array.isArray(t) ? Ow(t) : new Uint32Array(t), n = Array.isArray(t) ? Hw(t) : new Uint16Array(t), i = 24, a = C0(n, i / 2, r[4] / 2), l = r[5] === 2 ? C0(n, (i + r[4]) / 2) : zw(r, Math.ceil((i + r[4]) / 4));
  return new Ww(r[0], r[1], r[2], r[3], a, l);
}, Ww = (
  /** @class */
  function() {
    function e(A, t, r, n, i, a) {
      this.initialValue = A, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = i, this.data = a;
    }
    return e.prototype.get = function(A) {
      var t;
      if (A >= 0) {
        if (A < 55296 || A > 56319 && A <= 65535)
          return t = this.index[A >> pi], t = (t << hc) + (A & dc), this.data[t];
        if (A <= 65535)
          return t = this.index[u1 + (A - 55296 >> pi)], t = (t << hc) + (A & dc), this.data[t];
        if (A < this.highStart)
          return t = Kw - jw + (A >> Tf), t = this.index[t], t += A >> pi & Vw, t = this.index[t], t = (t << hc) + (A & dc), this.data[t];
        if (A <= 1114111)
          return this.data[this.highValueIndex];
      }
      return this.errorValue;
    }, e;
  }()
), F0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Xw = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var zs = 0; zs < F0.length; zs++)
  Xw[F0.charCodeAt(zs)] = zs;
var $w = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==", Q0 = 50, Jw = 1, c1 = 2, f1 = 3, Yw = 4, Zw = 5, U0 = 7, h1 = 8, E0 = 9, Pn = 10, nf = 11, x0 = 12, af = 13, A5 = 14, bo = 15, of = 16, qs = 17, ho = 18, e5 = 19, L0 = 20, sf = 21, go = 22, gc = 23, ea = 24, $t = 25, Co = 26, Fo = 27, ta = 28, t5 = 29, hi = 30, r5 = 31, Ws = 32, Xs = 33, lf = 34, uf = 35, cf = 36, To = 37, ff = 38, Cl = 39, Fl = 40, pc = 41, d1 = 42, n5 = 43, i5 = [9001, 65288], g1 = "!", se = "×", $s = "÷", hf = qw($w), hn = [hi, cf], df = [Jw, c1, f1, Zw], p1 = [Pn, h1], S0 = [Fo, Co], a5 = df.concat(p1), I0 = [ff, Cl, Fl, lf, uf], o5 = [bo, af], s5 = function(e, A) {
  A === void 0 && (A = "strict");
  var t = [], r = [], n = [];
  return e.forEach(function(i, a) {
    var l = hf.get(i);
    if (l > Q0 ? (n.push(!0), l -= Q0) : n.push(!1), ["normal", "auto", "loose"].indexOf(A) !== -1 && [8208, 8211, 12316, 12448].indexOf(i) !== -1)
      return r.push(a), t.push(of);
    if (l === Yw || l === nf) {
      if (a === 0)
        return r.push(a), t.push(hi);
      var s = t[a - 1];
      return a5.indexOf(s) === -1 ? (r.push(r[a - 1]), t.push(s)) : (r.push(a), t.push(hi));
    }
    if (r.push(a), l === r5)
      return t.push(A === "strict" ? sf : To);
    if (l === d1 || l === t5)
      return t.push(hi);
    if (l === n5)
      return i >= 131072 && i <= 196605 || i >= 196608 && i <= 262141 ? t.push(To) : t.push(hi);
    t.push(l);
  }), [r, t, n];
}, Bc = function(e, A, t, r) {
  var n = r[t];
  if (Array.isArray(e) ? e.indexOf(n) !== -1 : e === n)
    for (var i = t; i <= r.length; ) {
      i++;
      var a = r[i];
      if (a === A)
        return !0;
      if (a !== Pn)
        break;
    }
  if (n === Pn)
    for (var i = t; i > 0; ) {
      i--;
      var l = r[i];
      if (Array.isArray(e) ? e.indexOf(l) !== -1 : e === l)
        for (var s = t; s <= r.length; ) {
          s++;
          var a = r[s];
          if (a === A)
            return !0;
          if (a !== Pn)
            break;
        }
      if (l !== Pn)
        break;
    }
  return !1;
}, _0 = function(e, A) {
  for (var t = e; t >= 0; ) {
    var r = A[t];
    if (r === Pn)
      t--;
    else
      return r;
  }
  return 0;
}, l5 = function(e, A, t, r, n) {
  if (t[r] === 0)
    return se;
  var i = r - 1;
  if (Array.isArray(n) && n[i] === !0)
    return se;
  var a = i - 1, l = i + 1, s = A[i], f = a >= 0 ? A[a] : 0, g = A[l];
  if (s === c1 && g === f1)
    return se;
  if (df.indexOf(s) !== -1)
    return g1;
  if (df.indexOf(g) !== -1 || p1.indexOf(g) !== -1)
    return se;
  if (_0(i, A) === h1)
    return $s;
  if (hf.get(e[i]) === nf || (s === Ws || s === Xs) && hf.get(e[l]) === nf || s === U0 || g === U0 || s === E0 || [Pn, af, bo].indexOf(s) === -1 && g === E0 || [qs, ho, e5, ea, ta].indexOf(g) !== -1 || _0(i, A) === go || Bc(gc, go, i, A) || Bc([qs, ho], sf, i, A) || Bc(x0, x0, i, A))
    return se;
  if (s === Pn)
    return $s;
  if (s === gc || g === gc)
    return se;
  if (g === of || s === of)
    return $s;
  if ([af, bo, sf].indexOf(g) !== -1 || s === A5 || f === cf && o5.indexOf(s) !== -1 || s === ta && g === cf || g === L0 || hn.indexOf(g) !== -1 && s === $t || hn.indexOf(s) !== -1 && g === $t || s === Fo && [To, Ws, Xs].indexOf(g) !== -1 || [To, Ws, Xs].indexOf(s) !== -1 && g === Co || hn.indexOf(s) !== -1 && S0.indexOf(g) !== -1 || S0.indexOf(s) !== -1 && hn.indexOf(g) !== -1 || // (PR | PO) × ( OP | HY )? NU
  [Fo, Co].indexOf(s) !== -1 && (g === $t || [go, bo].indexOf(g) !== -1 && A[l + 1] === $t) || // ( OP | HY ) × NU
  [go, bo].indexOf(s) !== -1 && g === $t || // NU ×	(NU | SY | IS)
  s === $t && [$t, ta, ea].indexOf(g) !== -1)
    return se;
  if ([$t, ta, ea, qs, ho].indexOf(g) !== -1)
    for (var p = i; p >= 0; ) {
      var w = A[p];
      if (w === $t)
        return se;
      if ([ta, ea].indexOf(w) !== -1)
        p--;
      else
        break;
    }
  if ([Fo, Co].indexOf(g) !== -1)
    for (var p = [qs, ho].indexOf(s) !== -1 ? a : i; p >= 0; ) {
      var w = A[p];
      if (w === $t)
        return se;
      if ([ta, ea].indexOf(w) !== -1)
        p--;
      else
        break;
    }
  if (ff === s && [ff, Cl, lf, uf].indexOf(g) !== -1 || [Cl, lf].indexOf(s) !== -1 && [Cl, Fl].indexOf(g) !== -1 || [Fl, uf].indexOf(s) !== -1 && g === Fl || I0.indexOf(s) !== -1 && [L0, Co].indexOf(g) !== -1 || I0.indexOf(g) !== -1 && s === Fo || hn.indexOf(s) !== -1 && hn.indexOf(g) !== -1 || s === ea && hn.indexOf(g) !== -1 || hn.concat($t).indexOf(s) !== -1 && g === go && i5.indexOf(e[l]) === -1 || hn.concat($t).indexOf(g) !== -1 && s === ho)
    return se;
  if (s === pc && g === pc) {
    for (var d = t[i], C = 1; d > 0 && (d--, A[d] === pc); )
      C++;
    if (C % 2 !== 0)
      return se;
  }
  return s === Ws && g === Xs ? se : $s;
}, u5 = function(e, A) {
  A || (A = { lineBreak: "normal", wordBreak: "normal" });
  var t = s5(e, A.lineBreak), r = t[0], n = t[1], i = t[2];
  (A.wordBreak === "break-all" || A.wordBreak === "break-word") && (n = n.map(function(l) {
    return [$t, hi, d1].indexOf(l) !== -1 ? To : l;
  }));
  var a = A.wordBreak === "keep-all" ? i.map(function(l, s) {
    return l && e[s] >= 19968 && e[s] <= 40959;
  }) : void 0;
  return [r, n, a];
}, c5 = (
  /** @class */
  function() {
    function e(A, t, r, n) {
      this.codePoints = A, this.required = t === g1, this.start = r, this.end = n;
    }
    return e.prototype.slice = function() {
      return Xe.apply(void 0, this.codePoints.slice(this.start, this.end));
    }, e;
  }()
), f5 = function(e, A) {
  var t = zl(e), r = u5(t, A), n = r[0], i = r[1], a = r[2], l = t.length, s = 0, f = 0;
  return {
    next: function() {
      if (f >= l)
        return { done: !0, value: null };
      for (var g = se; f < l && (g = l5(t, i, n, ++f, a)) === se; )
        ;
      if (g !== se || f === l) {
        var p = new c5(t, g, s, f);
        return s = f, { value: p, done: !1 };
      }
      return { done: !0, value: null };
    }
  };
}, h5 = 1, d5 = 2, Ro = 4, N0 = 8, Ll = 10, H0 = 47, So = 92, g5 = 9, p5 = 32, Js = 34, po = 61, B5 = 35, w5 = 36, v5 = 37, Ys = 39, Zs = 40, Bo = 41, m5 = 95, Rt = 45, y5 = 33, b5 = 60, C5 = 62, F5 = 64, Q5 = 91, U5 = 93, E5 = 61, x5 = 123, Al = 63, L5 = 125, O0 = 124, S5 = 126, I5 = 128, D0 = 65533, wc = 42, di = 43, _5 = 44, N5 = 58, H5 = 59, ko = 46, O5 = 0, D5 = 8, T5 = 11, k5 = 14, P5 = 31, M5 = 127, Gr = -1, B1 = 48, w1 = 97, v1 = 101, R5 = 102, K5 = 117, j5 = 122, m1 = 65, y1 = 69, b1 = 70, G5 = 85, V5 = 90, Et = function(e) {
  return e >= B1 && e <= 57;
}, z5 = function(e) {
  return e >= 55296 && e <= 57343;
}, ra = function(e) {
  return Et(e) || e >= m1 && e <= b1 || e >= w1 && e <= R5;
}, q5 = function(e) {
  return e >= w1 && e <= j5;
}, W5 = function(e) {
  return e >= m1 && e <= V5;
}, X5 = function(e) {
  return q5(e) || W5(e);
}, $5 = function(e) {
  return e >= I5;
}, el = function(e) {
  return e === Ll || e === g5 || e === p5;
}, Sl = function(e) {
  return X5(e) || $5(e) || e === m5;
}, T0 = function(e) {
  return Sl(e) || Et(e) || e === Rt;
}, J5 = function(e) {
  return e >= O5 && e <= D5 || e === T5 || e >= k5 && e <= P5 || e === M5;
}, Tn = function(e, A) {
  return e !== So ? !1 : A !== Ll;
}, tl = function(e, A, t) {
  return e === Rt ? Sl(A) || Tn(A, t) : Sl(e) ? !0 : !!(e === So && Tn(e, A));
}, vc = function(e, A, t) {
  return e === di || e === Rt ? Et(A) ? !0 : A === ko && Et(t) : Et(e === ko ? A : e);
}, Y5 = function(e) {
  var A = 0, t = 1;
  (e[A] === di || e[A] === Rt) && (e[A] === Rt && (t = -1), A++);
  for (var r = []; Et(e[A]); )
    r.push(e[A++]);
  var n = r.length ? parseInt(Xe.apply(void 0, r), 10) : 0;
  e[A] === ko && A++;
  for (var i = []; Et(e[A]); )
    i.push(e[A++]);
  var a = i.length, l = a ? parseInt(Xe.apply(void 0, i), 10) : 0;
  (e[A] === y1 || e[A] === v1) && A++;
  var s = 1;
  (e[A] === di || e[A] === Rt) && (e[A] === Rt && (s = -1), A++);
  for (var f = []; Et(e[A]); )
    f.push(e[A++]);
  var g = f.length ? parseInt(Xe.apply(void 0, f), 10) : 0;
  return t * (n + l * Math.pow(10, -a)) * Math.pow(10, s * g);
}, Z5 = {
  type: 2
  /* LEFT_PARENTHESIS_TOKEN */
}, Av = {
  type: 3
  /* RIGHT_PARENTHESIS_TOKEN */
}, ev = {
  type: 4
  /* COMMA_TOKEN */
}, tv = {
  type: 13
  /* SUFFIX_MATCH_TOKEN */
}, rv = {
  type: 8
  /* PREFIX_MATCH_TOKEN */
}, nv = {
  type: 21
  /* COLUMN_TOKEN */
}, iv = {
  type: 9
  /* DASH_MATCH_TOKEN */
}, av = {
  type: 10
  /* INCLUDE_MATCH_TOKEN */
}, ov = {
  type: 11
  /* LEFT_CURLY_BRACKET_TOKEN */
}, sv = {
  type: 12
  /* RIGHT_CURLY_BRACKET_TOKEN */
}, lv = {
  type: 14
  /* SUBSTRING_MATCH_TOKEN */
}, rl = {
  type: 23
  /* BAD_URL_TOKEN */
}, uv = {
  type: 1
  /* BAD_STRING_TOKEN */
}, cv = {
  type: 25
  /* CDO_TOKEN */
}, fv = {
  type: 24
  /* CDC_TOKEN */
}, hv = {
  type: 26
  /* COLON_TOKEN */
}, dv = {
  type: 27
  /* SEMICOLON_TOKEN */
}, gv = {
  type: 28
  /* LEFT_SQUARE_BRACKET_TOKEN */
}, pv = {
  type: 29
  /* RIGHT_SQUARE_BRACKET_TOKEN */
}, Bv = {
  type: 31
  /* WHITESPACE_TOKEN */
}, gf = {
  type: 32
  /* EOF_TOKEN */
}, C1 = (
  /** @class */
  function() {
    function e() {
      this._value = [];
    }
    return e.prototype.write = function(A) {
      this._value = this._value.concat(zl(A));
    }, e.prototype.read = function() {
      for (var A = [], t = this.consumeToken(); t !== gf; )
        A.push(t), t = this.consumeToken();
      return A;
    }, e.prototype.consumeToken = function() {
      var A = this.consumeCodePoint();
      switch (A) {
        case Js:
          return this.consumeStringToken(Js);
        case B5:
          var t = this.peekCodePoint(0), r = this.peekCodePoint(1), n = this.peekCodePoint(2);
          if (T0(t) || Tn(r, n)) {
            var i = tl(t, r, n) ? d5 : h5, a = this.consumeName();
            return { type: 5, value: a, flags: i };
          }
          break;
        case w5:
          if (this.peekCodePoint(0) === po)
            return this.consumeCodePoint(), tv;
          break;
        case Ys:
          return this.consumeStringToken(Ys);
        case Zs:
          return Z5;
        case Bo:
          return Av;
        case wc:
          if (this.peekCodePoint(0) === po)
            return this.consumeCodePoint(), lv;
          break;
        case di:
          if (vc(A, this.peekCodePoint(0), this.peekCodePoint(1)))
            return this.reconsumeCodePoint(A), this.consumeNumericToken();
          break;
        case _5:
          return ev;
        case Rt:
          var l = A, s = this.peekCodePoint(0), f = this.peekCodePoint(1);
          if (vc(l, s, f))
            return this.reconsumeCodePoint(A), this.consumeNumericToken();
          if (tl(l, s, f))
            return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
          if (s === Rt && f === C5)
            return this.consumeCodePoint(), this.consumeCodePoint(), fv;
          break;
        case ko:
          if (vc(A, this.peekCodePoint(0), this.peekCodePoint(1)))
            return this.reconsumeCodePoint(A), this.consumeNumericToken();
          break;
        case H0:
          if (this.peekCodePoint(0) === wc)
            for (this.consumeCodePoint(); ; ) {
              var g = this.consumeCodePoint();
              if (g === wc && (g = this.consumeCodePoint(), g === H0))
                return this.consumeToken();
              if (g === Gr)
                return this.consumeToken();
            }
          break;
        case N5:
          return hv;
        case H5:
          return dv;
        case b5:
          if (this.peekCodePoint(0) === y5 && this.peekCodePoint(1) === Rt && this.peekCodePoint(2) === Rt)
            return this.consumeCodePoint(), this.consumeCodePoint(), cv;
          break;
        case F5:
          var p = this.peekCodePoint(0), w = this.peekCodePoint(1), d = this.peekCodePoint(2);
          if (tl(p, w, d)) {
            var a = this.consumeName();
            return { type: 7, value: a };
          }
          break;
        case Q5:
          return gv;
        case So:
          if (Tn(A, this.peekCodePoint(0)))
            return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
          break;
        case U5:
          return pv;
        case E5:
          if (this.peekCodePoint(0) === po)
            return this.consumeCodePoint(), rv;
          break;
        case x5:
          return ov;
        case L5:
          return sv;
        case K5:
        case G5:
          var C = this.peekCodePoint(0), b = this.peekCodePoint(1);
          return C === di && (ra(b) || b === Al) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
        case O0:
          if (this.peekCodePoint(0) === po)
            return this.consumeCodePoint(), iv;
          if (this.peekCodePoint(0) === O0)
            return this.consumeCodePoint(), nv;
          break;
        case S5:
          if (this.peekCodePoint(0) === po)
            return this.consumeCodePoint(), av;
          break;
        case Gr:
          return gf;
      }
      return el(A) ? (this.consumeWhiteSpace(), Bv) : Et(A) ? (this.reconsumeCodePoint(A), this.consumeNumericToken()) : Sl(A) ? (this.reconsumeCodePoint(A), this.consumeIdentLikeToken()) : { type: 6, value: Xe(A) };
    }, e.prototype.consumeCodePoint = function() {
      var A = this._value.shift();
      return typeof A > "u" ? -1 : A;
    }, e.prototype.reconsumeCodePoint = function(A) {
      this._value.unshift(A);
    }, e.prototype.peekCodePoint = function(A) {
      return A >= this._value.length ? -1 : this._value[A];
    }, e.prototype.consumeUnicodeRangeToken = function() {
      for (var A = [], t = this.consumeCodePoint(); ra(t) && A.length < 6; )
        A.push(t), t = this.consumeCodePoint();
      for (var r = !1; t === Al && A.length < 6; )
        A.push(t), t = this.consumeCodePoint(), r = !0;
      if (r) {
        var n = parseInt(Xe.apply(void 0, A.map(function(s) {
          return s === Al ? B1 : s;
        })), 16), i = parseInt(Xe.apply(void 0, A.map(function(s) {
          return s === Al ? b1 : s;
        })), 16);
        return { type: 30, start: n, end: i };
      }
      var a = parseInt(Xe.apply(void 0, A), 16);
      if (this.peekCodePoint(0) === Rt && ra(this.peekCodePoint(1))) {
        this.consumeCodePoint(), t = this.consumeCodePoint();
        for (var l = []; ra(t) && l.length < 6; )
          l.push(t), t = this.consumeCodePoint();
        var i = parseInt(Xe.apply(void 0, l), 16);
        return { type: 30, start: a, end: i };
      } else
        return { type: 30, start: a, end: a };
    }, e.prototype.consumeIdentLikeToken = function() {
      var A = this.consumeName();
      return A.toLowerCase() === "url" && this.peekCodePoint(0) === Zs ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === Zs ? (this.consumeCodePoint(), { type: 19, value: A }) : { type: 20, value: A };
    }, e.prototype.consumeUrlToken = function() {
      var A = [];
      if (this.consumeWhiteSpace(), this.peekCodePoint(0) === Gr)
        return { type: 22, value: "" };
      var t = this.peekCodePoint(0);
      if (t === Ys || t === Js) {
        var r = this.consumeStringToken(this.consumeCodePoint());
        return r.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === Gr || this.peekCodePoint(0) === Bo) ? (this.consumeCodePoint(), { type: 22, value: r.value }) : (this.consumeBadUrlRemnants(), rl);
      }
      for (; ; ) {
        var n = this.consumeCodePoint();
        if (n === Gr || n === Bo)
          return { type: 22, value: Xe.apply(void 0, A) };
        if (el(n))
          return this.consumeWhiteSpace(), this.peekCodePoint(0) === Gr || this.peekCodePoint(0) === Bo ? (this.consumeCodePoint(), { type: 22, value: Xe.apply(void 0, A) }) : (this.consumeBadUrlRemnants(), rl);
        if (n === Js || n === Ys || n === Zs || J5(n))
          return this.consumeBadUrlRemnants(), rl;
        if (n === So)
          if (Tn(n, this.peekCodePoint(0)))
            A.push(this.consumeEscapedCodePoint());
          else
            return this.consumeBadUrlRemnants(), rl;
        else
          A.push(n);
      }
    }, e.prototype.consumeWhiteSpace = function() {
      for (; el(this.peekCodePoint(0)); )
        this.consumeCodePoint();
    }, e.prototype.consumeBadUrlRemnants = function() {
      for (; ; ) {
        var A = this.consumeCodePoint();
        if (A === Bo || A === Gr)
          return;
        Tn(A, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
      }
    }, e.prototype.consumeStringSlice = function(A) {
      for (var t = 5e4, r = ""; A > 0; ) {
        var n = Math.min(t, A);
        r += Xe.apply(void 0, this._value.splice(0, n)), A -= n;
      }
      return this._value.shift(), r;
    }, e.prototype.consumeStringToken = function(A) {
      var t = "", r = 0;
      do {
        var n = this._value[r];
        if (n === Gr || n === void 0 || n === A)
          return t += this.consumeStringSlice(r), { type: 0, value: t };
        if (n === Ll)
          return this._value.splice(0, r), uv;
        if (n === So) {
          var i = this._value[r + 1];
          i !== Gr && i !== void 0 && (i === Ll ? (t += this.consumeStringSlice(r), r = -1, this._value.shift()) : Tn(n, i) && (t += this.consumeStringSlice(r), t += Xe(this.consumeEscapedCodePoint()), r = -1));
        }
        r++;
      } while (!0);
    }, e.prototype.consumeNumber = function() {
      var A = [], t = Ro, r = this.peekCodePoint(0);
      for ((r === di || r === Rt) && A.push(this.consumeCodePoint()); Et(this.peekCodePoint(0)); )
        A.push(this.consumeCodePoint());
      r = this.peekCodePoint(0);
      var n = this.peekCodePoint(1);
      if (r === ko && Et(n))
        for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), t = N0; Et(this.peekCodePoint(0)); )
          A.push(this.consumeCodePoint());
      r = this.peekCodePoint(0), n = this.peekCodePoint(1);
      var i = this.peekCodePoint(2);
      if ((r === y1 || r === v1) && ((n === di || n === Rt) && Et(i) || Et(n)))
        for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), t = N0; Et(this.peekCodePoint(0)); )
          A.push(this.consumeCodePoint());
      return [Y5(A), t];
    }, e.prototype.consumeNumericToken = function() {
      var A = this.consumeNumber(), t = A[0], r = A[1], n = this.peekCodePoint(0), i = this.peekCodePoint(1), a = this.peekCodePoint(2);
      if (tl(n, i, a)) {
        var l = this.consumeName();
        return { type: 15, number: t, flags: r, unit: l };
      }
      return n === v5 ? (this.consumeCodePoint(), { type: 16, number: t, flags: r }) : { type: 17, number: t, flags: r };
    }, e.prototype.consumeEscapedCodePoint = function() {
      var A = this.consumeCodePoint();
      if (ra(A)) {
        for (var t = Xe(A); ra(this.peekCodePoint(0)) && t.length < 6; )
          t += Xe(this.consumeCodePoint());
        el(this.peekCodePoint(0)) && this.consumeCodePoint();
        var r = parseInt(t, 16);
        return r === 0 || z5(r) || r > 1114111 ? D0 : r;
      }
      return A === Gr ? D0 : A;
    }, e.prototype.consumeName = function() {
      for (var A = ""; ; ) {
        var t = this.consumeCodePoint();
        if (T0(t))
          A += Xe(t);
        else if (Tn(t, this.peekCodePoint(0)))
          A += Xe(this.consumeEscapedCodePoint());
        else
          return this.reconsumeCodePoint(t), A;
      }
    }, e;
  }()
), F1 = (
  /** @class */
  function() {
    function e(A) {
      this._tokens = A;
    }
    return e.create = function(A) {
      var t = new C1();
      return t.write(A), new e(t.read());
    }, e.parseValue = function(A) {
      return e.create(A).parseComponentValue();
    }, e.parseValues = function(A) {
      return e.create(A).parseComponentValues();
    }, e.prototype.parseComponentValue = function() {
      for (var A = this.consumeToken(); A.type === 31; )
        A = this.consumeToken();
      if (A.type === 32)
        throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
      this.reconsumeToken(A);
      var t = this.consumeComponentValue();
      do
        A = this.consumeToken();
      while (A.type === 31);
      if (A.type === 32)
        return t;
      throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
    }, e.prototype.parseComponentValues = function() {
      for (var A = []; ; ) {
        var t = this.consumeComponentValue();
        if (t.type === 32)
          return A;
        A.push(t), A.push();
      }
    }, e.prototype.consumeComponentValue = function() {
      var A = this.consumeToken();
      switch (A.type) {
        case 11:
        case 28:
        case 2:
          return this.consumeSimpleBlock(A.type);
        case 19:
          return this.consumeFunction(A);
      }
      return A;
    }, e.prototype.consumeSimpleBlock = function(A) {
      for (var t = { type: A, values: [] }, r = this.consumeToken(); ; ) {
        if (r.type === 32 || vv(r, A))
          return t;
        this.reconsumeToken(r), t.values.push(this.consumeComponentValue()), r = this.consumeToken();
      }
    }, e.prototype.consumeFunction = function(A) {
      for (var t = {
        name: A.value,
        values: [],
        type: 18
        /* FUNCTION */
      }; ; ) {
        var r = this.consumeToken();
        if (r.type === 32 || r.type === 3)
          return t;
        this.reconsumeToken(r), t.values.push(this.consumeComponentValue());
      }
    }, e.prototype.consumeToken = function() {
      var A = this._tokens.shift();
      return typeof A > "u" ? gf : A;
    }, e.prototype.reconsumeToken = function(A) {
      this._tokens.unshift(A);
    }, e;
  }()
), Ko = function(e) {
  return e.type === 15;
}, Sa = function(e) {
  return e.type === 17;
}, Ee = function(e) {
  return e.type === 20;
}, wv = function(e) {
  return e.type === 0;
}, pf = function(e, A) {
  return Ee(e) && e.value === A;
}, Q1 = function(e) {
  return e.type !== 31;
}, ba = function(e) {
  return e.type !== 31 && e.type !== 4;
}, Jr = function(e) {
  var A = [], t = [];
  return e.forEach(function(r) {
    if (r.type === 4) {
      if (t.length === 0)
        throw new Error("Error parsing function args, zero tokens for arg");
      A.push(t), t = [];
      return;
    }
    r.type !== 31 && t.push(r);
  }), t.length && A.push(t), A;
}, vv = function(e, A) {
  return A === 11 && e.type === 12 || A === 28 && e.type === 29 ? !0 : A === 2 && e.type === 3;
}, Wn = function(e) {
  return e.type === 17 || e.type === 15;
}, it = function(e) {
  return e.type === 16 || Wn(e);
}, U1 = function(e) {
  return e.length > 1 ? [e[0], e[1]] : [e[0]];
}, wt = {
  type: 17,
  number: 0,
  flags: Ro
}, kf = {
  type: 16,
  number: 50,
  flags: Ro
}, Mn = {
  type: 16,
  number: 100,
  flags: Ro
}, Qo = function(e, A, t) {
  var r = e[0], n = e[1];
  return [Ne(r, A), Ne(typeof n < "u" ? n : r, t)];
}, Ne = function(e, A) {
  if (e.type === 16)
    return e.number / 100 * A;
  if (Ko(e))
    switch (e.unit) {
      case "rem":
      case "em":
        return 16 * e.number;
      case "px":
      default:
        return e.number;
    }
  return e.number;
}, E1 = "deg", x1 = "grad", L1 = "rad", S1 = "turn", ql = {
  name: "angle",
  parse: function(e, A) {
    if (A.type === 15)
      switch (A.unit) {
        case E1:
          return Math.PI * A.number / 180;
        case x1:
          return Math.PI / 200 * A.number;
        case L1:
          return A.number;
        case S1:
          return Math.PI * 2 * A.number;
      }
    throw new Error("Unsupported angle type");
  }
}, I1 = function(e) {
  return e.type === 15 && (e.unit === E1 || e.unit === x1 || e.unit === L1 || e.unit === S1);
}, _1 = function(e) {
  var A = e.filter(Ee).map(function(t) {
    return t.value;
  }).join(" ");
  switch (A) {
    case "to bottom right":
    case "to right bottom":
    case "left top":
    case "top left":
      return [wt, wt];
    case "to top":
    case "bottom":
      return fr(0);
    case "to bottom left":
    case "to left bottom":
    case "right top":
    case "top right":
      return [wt, Mn];
    case "to right":
    case "left":
      return fr(90);
    case "to top left":
    case "to left top":
    case "right bottom":
    case "bottom right":
      return [Mn, Mn];
    case "to bottom":
    case "top":
      return fr(180);
    case "to top right":
    case "to right top":
    case "left bottom":
    case "bottom left":
      return [Mn, wt];
    case "to left":
    case "right":
      return fr(270);
  }
  return 0;
}, fr = function(e) {
  return Math.PI * e / 180;
}, jn = {
  name: "color",
  parse: function(e, A) {
    if (A.type === 18) {
      var t = mv[A.name];
      if (typeof t > "u")
        throw new Error('Attempting to parse an unsupported color function "' + A.name + '"');
      return t(e, A.values);
    }
    if (A.type === 5) {
      if (A.value.length === 3) {
        var r = A.value.substring(0, 1), n = A.value.substring(1, 2), i = A.value.substring(2, 3);
        return Rn(parseInt(r + r, 16), parseInt(n + n, 16), parseInt(i + i, 16), 1);
      }
      if (A.value.length === 4) {
        var r = A.value.substring(0, 1), n = A.value.substring(1, 2), i = A.value.substring(2, 3), a = A.value.substring(3, 4);
        return Rn(parseInt(r + r, 16), parseInt(n + n, 16), parseInt(i + i, 16), parseInt(a + a, 16) / 255);
      }
      if (A.value.length === 6) {
        var r = A.value.substring(0, 2), n = A.value.substring(2, 4), i = A.value.substring(4, 6);
        return Rn(parseInt(r, 16), parseInt(n, 16), parseInt(i, 16), 1);
      }
      if (A.value.length === 8) {
        var r = A.value.substring(0, 2), n = A.value.substring(2, 4), i = A.value.substring(4, 6), a = A.value.substring(6, 8);
        return Rn(parseInt(r, 16), parseInt(n, 16), parseInt(i, 16), parseInt(a, 16) / 255);
      }
    }
    if (A.type === 20) {
      var l = pn[A.value.toUpperCase()];
      if (typeof l < "u")
        return l;
    }
    return pn.TRANSPARENT;
  }
}, Gn = function(e) {
  return (255 & e) === 0;
}, ft = function(e) {
  var A = 255 & e, t = 255 & e >> 8, r = 255 & e >> 16, n = 255 & e >> 24;
  return A < 255 ? "rgba(" + n + "," + r + "," + t + "," + A / 255 + ")" : "rgb(" + n + "," + r + "," + t + ")";
}, Rn = function(e, A, t, r) {
  return (e << 24 | A << 16 | t << 8 | Math.round(r * 255) << 0) >>> 0;
}, k0 = function(e, A) {
  if (e.type === 17)
    return e.number;
  if (e.type === 16) {
    var t = A === 3 ? 1 : 255;
    return A === 3 ? e.number / 100 * t : Math.round(e.number / 100 * t);
  }
  return 0;
}, P0 = function(e, A) {
  var t = A.filter(ba);
  if (t.length === 3) {
    var r = t.map(k0), n = r[0], i = r[1], a = r[2];
    return Rn(n, i, a, 1);
  }
  if (t.length === 4) {
    var l = t.map(k0), n = l[0], i = l[1], a = l[2], s = l[3];
    return Rn(n, i, a, s);
  }
  return 0;
};
function mc(e, A, t) {
  return t < 0 && (t += 1), t >= 1 && (t -= 1), t < 1 / 6 ? (A - e) * t * 6 + e : t < 1 / 2 ? A : t < 2 / 3 ? (A - e) * 6 * (2 / 3 - t) + e : e;
}
var M0 = function(e, A) {
  var t = A.filter(ba), r = t[0], n = t[1], i = t[2], a = t[3], l = (r.type === 17 ? fr(r.number) : ql.parse(e, r)) / (Math.PI * 2), s = it(n) ? n.number / 100 : 0, f = it(i) ? i.number / 100 : 0, g = typeof a < "u" && it(a) ? Ne(a, 1) : 1;
  if (s === 0)
    return Rn(f * 255, f * 255, f * 255, 1);
  var p = f <= 0.5 ? f * (s + 1) : f + s - f * s, w = f * 2 - p, d = mc(w, p, l + 1 / 3), C = mc(w, p, l), b = mc(w, p, l - 1 / 3);
  return Rn(d * 255, C * 255, b * 255, g);
}, mv = {
  hsl: M0,
  hsla: M0,
  rgb: P0,
  rgba: P0
}, Io = function(e, A) {
  return jn.parse(e, F1.create(A).parseComponentValue());
}, pn = {
  ALICEBLUE: 4042850303,
  ANTIQUEWHITE: 4209760255,
  AQUA: 16777215,
  AQUAMARINE: 2147472639,
  AZURE: 4043309055,
  BEIGE: 4126530815,
  BISQUE: 4293182719,
  BLACK: 255,
  BLANCHEDALMOND: 4293643775,
  BLUE: 65535,
  BLUEVIOLET: 2318131967,
  BROWN: 2771004159,
  BURLYWOOD: 3736635391,
  CADETBLUE: 1604231423,
  CHARTREUSE: 2147418367,
  CHOCOLATE: 3530104575,
  CORAL: 4286533887,
  CORNFLOWERBLUE: 1687547391,
  CORNSILK: 4294499583,
  CRIMSON: 3692313855,
  CYAN: 16777215,
  DARKBLUE: 35839,
  DARKCYAN: 9145343,
  DARKGOLDENROD: 3095837695,
  DARKGRAY: 2846468607,
  DARKGREEN: 6553855,
  DARKGREY: 2846468607,
  DARKKHAKI: 3182914559,
  DARKMAGENTA: 2332068863,
  DARKOLIVEGREEN: 1433087999,
  DARKORANGE: 4287365375,
  DARKORCHID: 2570243327,
  DARKRED: 2332033279,
  DARKSALMON: 3918953215,
  DARKSEAGREEN: 2411499519,
  DARKSLATEBLUE: 1211993087,
  DARKSLATEGRAY: 793726975,
  DARKSLATEGREY: 793726975,
  DARKTURQUOISE: 13554175,
  DARKVIOLET: 2483082239,
  DEEPPINK: 4279538687,
  DEEPSKYBLUE: 12582911,
  DIMGRAY: 1768516095,
  DIMGREY: 1768516095,
  DODGERBLUE: 512819199,
  FIREBRICK: 2988581631,
  FLORALWHITE: 4294635775,
  FORESTGREEN: 579543807,
  FUCHSIA: 4278255615,
  GAINSBORO: 3705462015,
  GHOSTWHITE: 4177068031,
  GOLD: 4292280575,
  GOLDENROD: 3668254975,
  GRAY: 2155905279,
  GREEN: 8388863,
  GREENYELLOW: 2919182335,
  GREY: 2155905279,
  HONEYDEW: 4043305215,
  HOTPINK: 4285117695,
  INDIANRED: 3445382399,
  INDIGO: 1258324735,
  IVORY: 4294963455,
  KHAKI: 4041641215,
  LAVENDER: 3873897215,
  LAVENDERBLUSH: 4293981695,
  LAWNGREEN: 2096890111,
  LEMONCHIFFON: 4294626815,
  LIGHTBLUE: 2916673279,
  LIGHTCORAL: 4034953471,
  LIGHTCYAN: 3774873599,
  LIGHTGOLDENRODYELLOW: 4210742015,
  LIGHTGRAY: 3553874943,
  LIGHTGREEN: 2431553791,
  LIGHTGREY: 3553874943,
  LIGHTPINK: 4290167295,
  LIGHTSALMON: 4288707327,
  LIGHTSEAGREEN: 548580095,
  LIGHTSKYBLUE: 2278488831,
  LIGHTSLATEGRAY: 2005441023,
  LIGHTSLATEGREY: 2005441023,
  LIGHTSTEELBLUE: 2965692159,
  LIGHTYELLOW: 4294959359,
  LIME: 16711935,
  LIMEGREEN: 852308735,
  LINEN: 4210091775,
  MAGENTA: 4278255615,
  MAROON: 2147483903,
  MEDIUMAQUAMARINE: 1724754687,
  MEDIUMBLUE: 52735,
  MEDIUMORCHID: 3126187007,
  MEDIUMPURPLE: 2473647103,
  MEDIUMSEAGREEN: 1018393087,
  MEDIUMSLATEBLUE: 2070474495,
  MEDIUMSPRINGGREEN: 16423679,
  MEDIUMTURQUOISE: 1221709055,
  MEDIUMVIOLETRED: 3340076543,
  MIDNIGHTBLUE: 421097727,
  MINTCREAM: 4127193855,
  MISTYROSE: 4293190143,
  MOCCASIN: 4293178879,
  NAVAJOWHITE: 4292783615,
  NAVY: 33023,
  OLDLACE: 4260751103,
  OLIVE: 2155872511,
  OLIVEDRAB: 1804477439,
  ORANGE: 4289003775,
  ORANGERED: 4282712319,
  ORCHID: 3664828159,
  PALEGOLDENROD: 4008225535,
  PALEGREEN: 2566625535,
  PALETURQUOISE: 2951671551,
  PALEVIOLETRED: 3681588223,
  PAPAYAWHIP: 4293907967,
  PEACHPUFF: 4292524543,
  PERU: 3448061951,
  PINK: 4290825215,
  PLUM: 3718307327,
  POWDERBLUE: 2967529215,
  PURPLE: 2147516671,
  REBECCAPURPLE: 1714657791,
  RED: 4278190335,
  ROSYBROWN: 3163525119,
  ROYALBLUE: 1097458175,
  SADDLEBROWN: 2336560127,
  SALMON: 4202722047,
  SANDYBROWN: 4104413439,
  SEAGREEN: 780883967,
  SEASHELL: 4294307583,
  SIENNA: 2689740287,
  SILVER: 3233857791,
  SKYBLUE: 2278484991,
  SLATEBLUE: 1784335871,
  SLATEGRAY: 1887473919,
  SLATEGREY: 1887473919,
  SNOW: 4294638335,
  SPRINGGREEN: 16744447,
  STEELBLUE: 1182971135,
  TAN: 3535047935,
  TEAL: 8421631,
  THISTLE: 3636451583,
  TOMATO: 4284696575,
  TRANSPARENT: 0,
  TURQUOISE: 1088475391,
  VIOLET: 4001558271,
  WHEAT: 4125012991,
  WHITE: 4294967295,
  WHITESMOKE: 4126537215,
  YELLOW: 4294902015,
  YELLOWGREEN: 2597139199
}, yv = {
  name: "background-clip",
  initialValue: "border-box",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return A.map(function(t) {
      if (Ee(t))
        switch (t.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      return 0;
    });
  }
}, bv = {
  name: "background-color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, Wl = function(e, A) {
  var t = jn.parse(e, A[0]), r = A[1];
  return r && it(r) ? { color: t, stop: r } : { color: t, stop: null };
}, R0 = function(e, A) {
  var t = e[0], r = e[e.length - 1];
  t.stop === null && (t.stop = wt), r.stop === null && (r.stop = Mn);
  for (var n = [], i = 0, a = 0; a < e.length; a++) {
    var l = e[a].stop;
    if (l !== null) {
      var s = Ne(l, A);
      s > i ? n.push(s) : n.push(i), i = s;
    } else
      n.push(null);
  }
  for (var f = null, a = 0; a < n.length; a++) {
    var g = n[a];
    if (g === null)
      f === null && (f = a);
    else if (f !== null) {
      for (var p = a - f, w = n[f - 1], d = (g - w) / (p + 1), C = 1; C <= p; C++)
        n[f + C - 1] = d * C;
      f = null;
    }
  }
  return e.map(function(b, _) {
    var m = b.color;
    return { color: m, stop: Math.max(Math.min(1, n[_] / A), 0) };
  });
}, Cv = function(e, A, t) {
  var r = A / 2, n = t / 2, i = Ne(e[0], A) - r, a = n - Ne(e[1], t);
  return (Math.atan2(a, i) + Math.PI * 2) % (Math.PI * 2);
}, Fv = function(e, A, t) {
  var r = typeof e == "number" ? e : Cv(e, A, t), n = Math.abs(A * Math.sin(r)) + Math.abs(t * Math.cos(r)), i = A / 2, a = t / 2, l = n / 2, s = Math.sin(r - Math.PI / 2) * l, f = Math.cos(r - Math.PI / 2) * l;
  return [n, i - f, i + f, a - s, a + s];
}, Lr = function(e, A) {
  return Math.sqrt(e * e + A * A);
}, K0 = function(e, A, t, r, n) {
  var i = [
    [0, 0],
    [0, A],
    [e, 0],
    [e, A]
  ];
  return i.reduce(function(a, l) {
    var s = l[0], f = l[1], g = Lr(t - s, r - f);
    return (n ? g < a.optimumDistance : g > a.optimumDistance) ? {
      optimumCorner: l,
      optimumDistance: g
    } : a;
  }, {
    optimumDistance: n ? 1 / 0 : -1 / 0,
    optimumCorner: null
  }).optimumCorner;
}, Qv = function(e, A, t, r, n) {
  var i = 0, a = 0;
  switch (e.size) {
    case 0:
      e.shape === 0 ? i = a = Math.min(Math.abs(A), Math.abs(A - r), Math.abs(t), Math.abs(t - n)) : e.shape === 1 && (i = Math.min(Math.abs(A), Math.abs(A - r)), a = Math.min(Math.abs(t), Math.abs(t - n)));
      break;
    case 2:
      if (e.shape === 0)
        i = a = Math.min(Lr(A, t), Lr(A, t - n), Lr(A - r, t), Lr(A - r, t - n));
      else if (e.shape === 1) {
        var l = Math.min(Math.abs(t), Math.abs(t - n)) / Math.min(Math.abs(A), Math.abs(A - r)), s = K0(r, n, A, t, !0), f = s[0], g = s[1];
        i = Lr(f - A, (g - t) / l), a = l * i;
      }
      break;
    case 1:
      e.shape === 0 ? i = a = Math.max(Math.abs(A), Math.abs(A - r), Math.abs(t), Math.abs(t - n)) : e.shape === 1 && (i = Math.max(Math.abs(A), Math.abs(A - r)), a = Math.max(Math.abs(t), Math.abs(t - n)));
      break;
    case 3:
      if (e.shape === 0)
        i = a = Math.max(Lr(A, t), Lr(A, t - n), Lr(A - r, t), Lr(A - r, t - n));
      else if (e.shape === 1) {
        var l = Math.max(Math.abs(t), Math.abs(t - n)) / Math.max(Math.abs(A), Math.abs(A - r)), p = K0(r, n, A, t, !1), f = p[0], g = p[1];
        i = Lr(f - A, (g - t) / l), a = l * i;
      }
      break;
  }
  return Array.isArray(e.size) && (i = Ne(e.size[0], r), a = e.size.length === 2 ? Ne(e.size[1], n) : i), [i, a];
}, Uv = function(e, A) {
  var t = fr(180), r = [];
  return Jr(A).forEach(function(n, i) {
    if (i === 0) {
      var a = n[0];
      if (a.type === 20 && a.value === "to") {
        t = _1(n);
        return;
      } else if (I1(a)) {
        t = ql.parse(e, a);
        return;
      }
    }
    var l = Wl(e, n);
    r.push(l);
  }), {
    angle: t,
    stops: r,
    type: 1
    /* LINEAR_GRADIENT */
  };
}, nl = function(e, A) {
  var t = fr(180), r = [];
  return Jr(A).forEach(function(n, i) {
    if (i === 0) {
      var a = n[0];
      if (a.type === 20 && ["top", "left", "right", "bottom"].indexOf(a.value) !== -1) {
        t = _1(n);
        return;
      } else if (I1(a)) {
        t = (ql.parse(e, a) + fr(270)) % fr(360);
        return;
      }
    }
    var l = Wl(e, n);
    r.push(l);
  }), {
    angle: t,
    stops: r,
    type: 1
    /* LINEAR_GRADIENT */
  };
}, Ev = function(e, A) {
  var t = fr(180), r = [], n = 1, i = 0, a = 3, l = [];
  return Jr(A).forEach(function(s, f) {
    var g = s[0];
    if (f === 0) {
      if (Ee(g) && g.value === "linear") {
        n = 1;
        return;
      } else if (Ee(g) && g.value === "radial") {
        n = 2;
        return;
      }
    }
    if (g.type === 18) {
      if (g.name === "from") {
        var p = jn.parse(e, g.values[0]);
        r.push({ stop: wt, color: p });
      } else if (g.name === "to") {
        var p = jn.parse(e, g.values[0]);
        r.push({ stop: Mn, color: p });
      } else if (g.name === "color-stop") {
        var w = g.values.filter(ba);
        if (w.length === 2) {
          var p = jn.parse(e, w[1]), d = w[0];
          Sa(d) && r.push({
            stop: { type: 16, number: d.number * 100, flags: d.flags },
            color: p
          });
        }
      }
    }
  }), n === 1 ? {
    angle: (t + fr(180)) % fr(360),
    stops: r,
    type: n
  } : { size: a, shape: i, stops: r, position: l, type: n };
}, N1 = "closest-side", H1 = "farthest-side", O1 = "closest-corner", D1 = "farthest-corner", T1 = "circle", k1 = "ellipse", P1 = "cover", M1 = "contain", xv = function(e, A) {
  var t = 0, r = 3, n = [], i = [];
  return Jr(A).forEach(function(a, l) {
    var s = !0;
    if (l === 0) {
      var f = !1;
      s = a.reduce(function(p, w) {
        if (f)
          if (Ee(w))
            switch (w.value) {
              case "center":
                return i.push(kf), p;
              case "top":
              case "left":
                return i.push(wt), p;
              case "right":
              case "bottom":
                return i.push(Mn), p;
            }
          else (it(w) || Wn(w)) && i.push(w);
        else if (Ee(w))
          switch (w.value) {
            case T1:
              return t = 0, !1;
            case k1:
              return t = 1, !1;
            case "at":
              return f = !0, !1;
            case N1:
              return r = 0, !1;
            case P1:
            case H1:
              return r = 1, !1;
            case M1:
            case O1:
              return r = 2, !1;
            case D1:
              return r = 3, !1;
          }
        else if (Wn(w) || it(w))
          return Array.isArray(r) || (r = []), r.push(w), !1;
        return p;
      }, s);
    }
    if (s) {
      var g = Wl(e, a);
      n.push(g);
    }
  }), {
    size: r,
    shape: t,
    stops: n,
    position: i,
    type: 2
    /* RADIAL_GRADIENT */
  };
}, il = function(e, A) {
  var t = 0, r = 3, n = [], i = [];
  return Jr(A).forEach(function(a, l) {
    var s = !0;
    if (l === 0 ? s = a.reduce(function(g, p) {
      if (Ee(p))
        switch (p.value) {
          case "center":
            return i.push(kf), !1;
          case "top":
          case "left":
            return i.push(wt), !1;
          case "right":
          case "bottom":
            return i.push(Mn), !1;
        }
      else if (it(p) || Wn(p))
        return i.push(p), !1;
      return g;
    }, s) : l === 1 && (s = a.reduce(function(g, p) {
      if (Ee(p))
        switch (p.value) {
          case T1:
            return t = 0, !1;
          case k1:
            return t = 1, !1;
          case M1:
          case N1:
            return r = 0, !1;
          case H1:
            return r = 1, !1;
          case O1:
            return r = 2, !1;
          case P1:
          case D1:
            return r = 3, !1;
        }
      else if (Wn(p) || it(p))
        return Array.isArray(r) || (r = []), r.push(p), !1;
      return g;
    }, s)), s) {
      var f = Wl(e, a);
      n.push(f);
    }
  }), {
    size: r,
    shape: t,
    stops: n,
    position: i,
    type: 2
    /* RADIAL_GRADIENT */
  };
}, Lv = function(e) {
  return e.type === 1;
}, Sv = function(e) {
  return e.type === 2;
}, Pf = {
  name: "image",
  parse: function(e, A) {
    if (A.type === 22) {
      var t = {
        url: A.value,
        type: 0
        /* URL */
      };
      return e.cache.addImage(A.value), t;
    }
    if (A.type === 18) {
      var r = R1[A.name];
      if (typeof r > "u")
        throw new Error('Attempting to parse an unsupported image function "' + A.name + '"');
      return r(e, A.values);
    }
    throw new Error("Unsupported image type " + A.type);
  }
};
function Iv(e) {
  return !(e.type === 20 && e.value === "none") && (e.type !== 18 || !!R1[e.name]);
}
var R1 = {
  "linear-gradient": Uv,
  "-moz-linear-gradient": nl,
  "-ms-linear-gradient": nl,
  "-o-linear-gradient": nl,
  "-webkit-linear-gradient": nl,
  "radial-gradient": xv,
  "-moz-radial-gradient": il,
  "-ms-radial-gradient": il,
  "-o-radial-gradient": il,
  "-webkit-radial-gradient": il,
  "-webkit-gradient": Ev
}, _v = {
  name: "background-image",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(e, A) {
    if (A.length === 0)
      return [];
    var t = A[0];
    return t.type === 20 && t.value === "none" ? [] : A.filter(function(r) {
      return ba(r) && Iv(r);
    }).map(function(r) {
      return Pf.parse(e, r);
    });
  }
}, Nv = {
  name: "background-origin",
  initialValue: "border-box",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return A.map(function(t) {
      if (Ee(t))
        switch (t.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      return 0;
    });
  }
}, Hv = {
  name: "background-position",
  initialValue: "0% 0%",
  type: 1,
  prefix: !1,
  parse: function(e, A) {
    return Jr(A).map(function(t) {
      return t.filter(it);
    }).map(U1);
  }
}, Ov = {
  name: "background-repeat",
  initialValue: "repeat",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return Jr(A).map(function(t) {
      return t.filter(Ee).map(function(r) {
        return r.value;
      }).join(" ");
    }).map(Dv);
  }
}, Dv = function(e) {
  switch (e) {
    case "no-repeat":
      return 1;
    case "repeat-x":
    case "repeat no-repeat":
      return 2;
    case "repeat-y":
    case "no-repeat repeat":
      return 3;
    case "repeat":
    default:
      return 0;
  }
}, ya;
(function(e) {
  e.AUTO = "auto", e.CONTAIN = "contain", e.COVER = "cover";
})(ya || (ya = {}));
var Tv = {
  name: "background-size",
  initialValue: "0",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return Jr(A).map(function(t) {
      return t.filter(kv);
    });
  }
}, kv = function(e) {
  return Ee(e) || it(e);
}, Xl = function(e) {
  return {
    name: "border-" + e + "-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color"
  };
}, Pv = Xl("top"), Mv = Xl("right"), Rv = Xl("bottom"), Kv = Xl("left"), $l = function(e) {
  return {
    name: "border-radius-" + e,
    initialValue: "0 0",
    prefix: !1,
    type: 1,
    parse: function(A, t) {
      return U1(t.filter(it));
    }
  };
}, jv = $l("top-left"), Gv = $l("top-right"), Vv = $l("bottom-right"), zv = $l("bottom-left"), Jl = function(e) {
  return {
    name: "border-" + e + "-style",
    initialValue: "solid",
    prefix: !1,
    type: 2,
    parse: function(A, t) {
      switch (t) {
        case "none":
          return 0;
        case "dashed":
          return 2;
        case "dotted":
          return 3;
        case "double":
          return 4;
      }
      return 1;
    }
  };
}, qv = Jl("top"), Wv = Jl("right"), Xv = Jl("bottom"), $v = Jl("left"), Yl = function(e) {
  return {
    name: "border-" + e + "-width",
    initialValue: "0",
    type: 0,
    prefix: !1,
    parse: function(A, t) {
      return Ko(t) ? t.number : 0;
    }
  };
}, Jv = Yl("top"), Yv = Yl("right"), Zv = Yl("bottom"), Am = Yl("left"), em = {
  name: "color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, tm = {
  name: "direction",
  initialValue: "ltr",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "rtl":
        return 1;
      case "ltr":
      default:
        return 0;
    }
  }
}, rm = {
  name: "display",
  initialValue: "inline-block",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return A.filter(Ee).reduce(
      function(t, r) {
        return t | nm(r.value);
      },
      0
      /* NONE */
    );
  }
}, nm = function(e) {
  switch (e) {
    case "block":
    case "-webkit-box":
      return 2;
    case "inline":
      return 4;
    case "run-in":
      return 8;
    case "flow":
      return 16;
    case "flow-root":
      return 32;
    case "table":
      return 64;
    case "flex":
    case "-webkit-flex":
      return 128;
    case "grid":
    case "-ms-grid":
      return 256;
    case "ruby":
      return 512;
    case "subgrid":
      return 1024;
    case "list-item":
      return 2048;
    case "table-row-group":
      return 4096;
    case "table-header-group":
      return 8192;
    case "table-footer-group":
      return 16384;
    case "table-row":
      return 32768;
    case "table-cell":
      return 65536;
    case "table-column-group":
      return 131072;
    case "table-column":
      return 262144;
    case "table-caption":
      return 524288;
    case "ruby-base":
      return 1048576;
    case "ruby-text":
      return 2097152;
    case "ruby-base-container":
      return 4194304;
    case "ruby-text-container":
      return 8388608;
    case "contents":
      return 16777216;
    case "inline-block":
      return 33554432;
    case "inline-list-item":
      return 67108864;
    case "inline-table":
      return 134217728;
    case "inline-flex":
      return 268435456;
    case "inline-grid":
      return 536870912;
  }
  return 0;
}, im = {
  name: "float",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "left":
        return 1;
      case "right":
        return 2;
      case "inline-start":
        return 3;
      case "inline-end":
        return 4;
    }
    return 0;
  }
}, am = {
  name: "letter-spacing",
  initialValue: "0",
  prefix: !1,
  type: 0,
  parse: function(e, A) {
    return A.type === 20 && A.value === "normal" ? 0 : A.type === 17 || A.type === 15 ? A.number : 0;
  }
}, Il;
(function(e) {
  e.NORMAL = "normal", e.STRICT = "strict";
})(Il || (Il = {}));
var om = {
  name: "line-break",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "strict":
        return Il.STRICT;
      case "normal":
      default:
        return Il.NORMAL;
    }
  }
}, sm = {
  name: "line-height",
  initialValue: "normal",
  prefix: !1,
  type: 4
  /* TOKEN_VALUE */
}, j0 = function(e, A) {
  return Ee(e) && e.value === "normal" ? 1.2 * A : e.type === 17 ? A * e.number : it(e) ? Ne(e, A) : A;
}, lm = {
  name: "list-style-image",
  initialValue: "none",
  type: 0,
  prefix: !1,
  parse: function(e, A) {
    return A.type === 20 && A.value === "none" ? null : Pf.parse(e, A);
  }
}, um = {
  name: "list-style-position",
  initialValue: "outside",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "inside":
        return 0;
      case "outside":
      default:
        return 1;
    }
  }
}, Bf = {
  name: "list-style-type",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "disc":
        return 0;
      case "circle":
        return 1;
      case "square":
        return 2;
      case "decimal":
        return 3;
      case "cjk-decimal":
        return 4;
      case "decimal-leading-zero":
        return 5;
      case "lower-roman":
        return 6;
      case "upper-roman":
        return 7;
      case "lower-greek":
        return 8;
      case "lower-alpha":
        return 9;
      case "upper-alpha":
        return 10;
      case "arabic-indic":
        return 11;
      case "armenian":
        return 12;
      case "bengali":
        return 13;
      case "cambodian":
        return 14;
      case "cjk-earthly-branch":
        return 15;
      case "cjk-heavenly-stem":
        return 16;
      case "cjk-ideographic":
        return 17;
      case "devanagari":
        return 18;
      case "ethiopic-numeric":
        return 19;
      case "georgian":
        return 20;
      case "gujarati":
        return 21;
      case "gurmukhi":
        return 22;
      case "hebrew":
        return 22;
      case "hiragana":
        return 23;
      case "hiragana-iroha":
        return 24;
      case "japanese-formal":
        return 25;
      case "japanese-informal":
        return 26;
      case "kannada":
        return 27;
      case "katakana":
        return 28;
      case "katakana-iroha":
        return 29;
      case "khmer":
        return 30;
      case "korean-hangul-formal":
        return 31;
      case "korean-hanja-formal":
        return 32;
      case "korean-hanja-informal":
        return 33;
      case "lao":
        return 34;
      case "lower-armenian":
        return 35;
      case "malayalam":
        return 36;
      case "mongolian":
        return 37;
      case "myanmar":
        return 38;
      case "oriya":
        return 39;
      case "persian":
        return 40;
      case "simp-chinese-formal":
        return 41;
      case "simp-chinese-informal":
        return 42;
      case "tamil":
        return 43;
      case "telugu":
        return 44;
      case "thai":
        return 45;
      case "tibetan":
        return 46;
      case "trad-chinese-formal":
        return 47;
      case "trad-chinese-informal":
        return 48;
      case "upper-armenian":
        return 49;
      case "disclosure-open":
        return 50;
      case "disclosure-closed":
        return 51;
      case "none":
      default:
        return -1;
    }
  }
}, Zl = function(e) {
  return {
    name: "margin-" + e,
    initialValue: "0",
    prefix: !1,
    type: 4
    /* TOKEN_VALUE */
  };
}, cm = Zl("top"), fm = Zl("right"), hm = Zl("bottom"), dm = Zl("left"), gm = {
  name: "overflow",
  initialValue: "visible",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return A.filter(Ee).map(function(t) {
      switch (t.value) {
        case "hidden":
          return 1;
        case "scroll":
          return 2;
        case "clip":
          return 3;
        case "auto":
          return 4;
        case "visible":
        default:
          return 0;
      }
    });
  }
}, pm = {
  name: "overflow-wrap",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "break-word":
        return "break-word";
      case "normal":
      default:
        return "normal";
    }
  }
}, Au = function(e) {
  return {
    name: "padding-" + e,
    initialValue: "0",
    prefix: !1,
    type: 3,
    format: "length-percentage"
  };
}, Bm = Au("top"), wm = Au("right"), vm = Au("bottom"), mm = Au("left"), ym = {
  name: "text-align",
  initialValue: "left",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "right":
        return 2;
      case "center":
      case "justify":
        return 1;
      case "left":
      default:
        return 0;
    }
  }
}, bm = {
  name: "position",
  initialValue: "static",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "relative":
        return 1;
      case "absolute":
        return 2;
      case "fixed":
        return 3;
      case "sticky":
        return 4;
    }
    return 0;
  }
}, Cm = {
  name: "text-shadow",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(e, A) {
    return A.length === 1 && pf(A[0], "none") ? [] : Jr(A).map(function(t) {
      for (var r = {
        color: pn.TRANSPARENT,
        offsetX: wt,
        offsetY: wt,
        blur: wt
      }, n = 0, i = 0; i < t.length; i++) {
        var a = t[i];
        Wn(a) ? (n === 0 ? r.offsetX = a : n === 1 ? r.offsetY = a : r.blur = a, n++) : r.color = jn.parse(e, a);
      }
      return r;
    });
  }
}, Fm = {
  name: "text-transform",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "uppercase":
        return 2;
      case "lowercase":
        return 1;
      case "capitalize":
        return 3;
    }
    return 0;
  }
}, Qm = {
  name: "transform",
  initialValue: "none",
  prefix: !0,
  type: 0,
  parse: function(e, A) {
    if (A.type === 20 && A.value === "none")
      return null;
    if (A.type === 18) {
      var t = xm[A.name];
      if (typeof t > "u")
        throw new Error('Attempting to parse an unsupported transform function "' + A.name + '"');
      return t(A.values);
    }
    return null;
  }
}, Um = function(e) {
  var A = e.filter(function(t) {
    return t.type === 17;
  }).map(function(t) {
    return t.number;
  });
  return A.length === 6 ? A : null;
}, Em = function(e) {
  var A = e.filter(function(s) {
    return s.type === 17;
  }).map(function(s) {
    return s.number;
  }), t = A[0], r = A[1];
  A[2], A[3];
  var n = A[4], i = A[5];
  A[6], A[7], A[8], A[9], A[10], A[11];
  var a = A[12], l = A[13];
  return A[14], A[15], A.length === 16 ? [t, r, n, i, a, l] : null;
}, xm = {
  matrix: Um,
  matrix3d: Em
}, G0 = {
  type: 16,
  number: 50,
  flags: Ro
}, Lm = [G0, G0], Sm = {
  name: "transform-origin",
  initialValue: "50% 50%",
  prefix: !0,
  type: 1,
  parse: function(e, A) {
    var t = A.filter(it);
    return t.length !== 2 ? Lm : [t[0], t[1]];
  }
}, Im = {
  name: "visible",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "hidden":
        return 1;
      case "collapse":
        return 2;
      case "visible":
      default:
        return 0;
    }
  }
}, _o;
(function(e) {
  e.NORMAL = "normal", e.BREAK_ALL = "break-all", e.KEEP_ALL = "keep-all";
})(_o || (_o = {}));
var _m = {
  name: "word-break",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "break-all":
        return _o.BREAK_ALL;
      case "keep-all":
        return _o.KEEP_ALL;
      case "normal":
      default:
        return _o.NORMAL;
    }
  }
}, Nm = {
  name: "z-index",
  initialValue: "auto",
  prefix: !1,
  type: 0,
  parse: function(e, A) {
    if (A.type === 20)
      return { auto: !0, order: 0 };
    if (Sa(A))
      return { auto: !1, order: A.number };
    throw new Error("Invalid z-index number parsed");
  }
}, K1 = {
  name: "time",
  parse: function(e, A) {
    if (A.type === 15)
      switch (A.unit.toLowerCase()) {
        case "s":
          return 1e3 * A.number;
        case "ms":
          return A.number;
      }
    throw new Error("Unsupported time type");
  }
}, Hm = {
  name: "opacity",
  initialValue: "1",
  type: 0,
  prefix: !1,
  parse: function(e, A) {
    return Sa(A) ? A.number : 1;
  }
}, Om = {
  name: "text-decoration-color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, Dm = {
  name: "text-decoration-line",
  initialValue: "none",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return A.filter(Ee).map(function(t) {
      switch (t.value) {
        case "underline":
          return 1;
        case "overline":
          return 2;
        case "line-through":
          return 3;
        case "none":
          return 4;
      }
      return 0;
    }).filter(function(t) {
      return t !== 0;
    });
  }
}, Tm = {
  name: "font-family",
  initialValue: "",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    var t = [], r = [];
    return A.forEach(function(n) {
      switch (n.type) {
        case 20:
        case 0:
          t.push(n.value);
          break;
        case 17:
          t.push(n.number.toString());
          break;
        case 4:
          r.push(t.join(" ")), t.length = 0;
          break;
      }
    }), t.length && r.push(t.join(" ")), r.map(function(n) {
      return n.indexOf(" ") === -1 ? n : "'" + n + "'";
    });
  }
}, km = {
  name: "font-size",
  initialValue: "0",
  prefix: !1,
  type: 3,
  format: "length"
}, Pm = {
  name: "font-weight",
  initialValue: "normal",
  type: 0,
  prefix: !1,
  parse: function(e, A) {
    if (Sa(A))
      return A.number;
    if (Ee(A))
      switch (A.value) {
        case "bold":
          return 700;
        case "normal":
        default:
          return 400;
      }
    return 400;
  }
}, Mm = {
  name: "font-variant",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(e, A) {
    return A.filter(Ee).map(function(t) {
      return t.value;
    });
  }
}, Rm = {
  name: "font-style",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(e, A) {
    switch (A) {
      case "oblique":
        return "oblique";
      case "italic":
        return "italic";
      case "normal":
      default:
        return "normal";
    }
  }
}, st = function(e, A) {
  return (e & A) !== 0;
}, Km = {
  name: "content",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(e, A) {
    if (A.length === 0)
      return [];
    var t = A[0];
    return t.type === 20 && t.value === "none" ? [] : A;
  }
}, jm = {
  name: "counter-increment",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(e, A) {
    if (A.length === 0)
      return null;
    var t = A[0];
    if (t.type === 20 && t.value === "none")
      return null;
    for (var r = [], n = A.filter(Q1), i = 0; i < n.length; i++) {
      var a = n[i], l = n[i + 1];
      if (a.type === 20) {
        var s = l && Sa(l) ? l.number : 1;
        r.push({ counter: a.value, increment: s });
      }
    }
    return r;
  }
}, Gm = {
  name: "counter-reset",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(e, A) {
    if (A.length === 0)
      return [];
    for (var t = [], r = A.filter(Q1), n = 0; n < r.length; n++) {
      var i = r[n], a = r[n + 1];
      if (Ee(i) && i.value !== "none") {
        var l = a && Sa(a) ? a.number : 0;
        t.push({ counter: i.value, reset: l });
      }
    }
    return t;
  }
}, Vm = {
  name: "duration",
  initialValue: "0s",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    return A.filter(Ko).map(function(t) {
      return K1.parse(e, t);
    });
  }
}, zm = {
  name: "quotes",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(e, A) {
    if (A.length === 0)
      return null;
    var t = A[0];
    if (t.type === 20 && t.value === "none")
      return null;
    var r = [], n = A.filter(wv);
    if (n.length % 2 !== 0)
      return null;
    for (var i = 0; i < n.length; i += 2) {
      var a = n[i].value, l = n[i + 1].value;
      r.push({ open: a, close: l });
    }
    return r;
  }
}, V0 = function(e, A, t) {
  if (!e)
    return "";
  var r = e[Math.min(A, e.length - 1)];
  return r ? t ? r.open : r.close : "";
}, qm = {
  name: "box-shadow",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(e, A) {
    return A.length === 1 && pf(A[0], "none") ? [] : Jr(A).map(function(t) {
      for (var r = {
        color: 255,
        offsetX: wt,
        offsetY: wt,
        blur: wt,
        spread: wt,
        inset: !1
      }, n = 0, i = 0; i < t.length; i++) {
        var a = t[i];
        pf(a, "inset") ? r.inset = !0 : Wn(a) ? (n === 0 ? r.offsetX = a : n === 1 ? r.offsetY = a : n === 2 ? r.blur = a : r.spread = a, n++) : r.color = jn.parse(e, a);
      }
      return r;
    });
  }
}, Wm = {
  name: "paint-order",
  initialValue: "normal",
  prefix: !1,
  type: 1,
  parse: function(e, A) {
    var t = [
      0,
      1,
      2
      /* MARKERS */
    ], r = [];
    return A.filter(Ee).forEach(function(n) {
      switch (n.value) {
        case "stroke":
          r.push(
            1
            /* STROKE */
          );
          break;
        case "fill":
          r.push(
            0
            /* FILL */
          );
          break;
        case "markers":
          r.push(
            2
            /* MARKERS */
          );
          break;
      }
    }), t.forEach(function(n) {
      r.indexOf(n) === -1 && r.push(n);
    }), r;
  }
}, Xm = {
  name: "-webkit-text-stroke-color",
  initialValue: "currentcolor",
  prefix: !1,
  type: 3,
  format: "color"
}, $m = {
  name: "-webkit-text-stroke-width",
  initialValue: "0",
  type: 0,
  prefix: !1,
  parse: function(e, A) {
    return Ko(A) ? A.number : 0;
  }
}, Jm = (
  /** @class */
  function() {
    function e(A, t) {
      var r, n;
      this.animationDuration = RA(A, Vm, t.animationDuration), this.backgroundClip = RA(A, yv, t.backgroundClip), this.backgroundColor = RA(A, bv, t.backgroundColor), this.backgroundImage = RA(A, _v, t.backgroundImage), this.backgroundOrigin = RA(A, Nv, t.backgroundOrigin), this.backgroundPosition = RA(A, Hv, t.backgroundPosition), this.backgroundRepeat = RA(A, Ov, t.backgroundRepeat), this.backgroundSize = RA(A, Tv, t.backgroundSize), this.borderTopColor = RA(A, Pv, t.borderTopColor), this.borderRightColor = RA(A, Mv, t.borderRightColor), this.borderBottomColor = RA(A, Rv, t.borderBottomColor), this.borderLeftColor = RA(A, Kv, t.borderLeftColor), this.borderTopLeftRadius = RA(A, jv, t.borderTopLeftRadius), this.borderTopRightRadius = RA(A, Gv, t.borderTopRightRadius), this.borderBottomRightRadius = RA(A, Vv, t.borderBottomRightRadius), this.borderBottomLeftRadius = RA(A, zv, t.borderBottomLeftRadius), this.borderTopStyle = RA(A, qv, t.borderTopStyle), this.borderRightStyle = RA(A, Wv, t.borderRightStyle), this.borderBottomStyle = RA(A, Xv, t.borderBottomStyle), this.borderLeftStyle = RA(A, $v, t.borderLeftStyle), this.borderTopWidth = RA(A, Jv, t.borderTopWidth), this.borderRightWidth = RA(A, Yv, t.borderRightWidth), this.borderBottomWidth = RA(A, Zv, t.borderBottomWidth), this.borderLeftWidth = RA(A, Am, t.borderLeftWidth), this.boxShadow = RA(A, qm, t.boxShadow), this.color = RA(A, em, t.color), this.direction = RA(A, tm, t.direction), this.display = RA(A, rm, t.display), this.float = RA(A, im, t.cssFloat), this.fontFamily = RA(A, Tm, t.fontFamily), this.fontSize = RA(A, km, t.fontSize), this.fontStyle = RA(A, Rm, t.fontStyle), this.fontVariant = RA(A, Mm, t.fontVariant), this.fontWeight = RA(A, Pm, t.fontWeight), this.letterSpacing = RA(A, am, t.letterSpacing), this.lineBreak = RA(A, om, t.lineBreak), this.lineHeight = RA(A, sm, t.lineHeight), this.listStyleImage = RA(A, lm, t.listStyleImage), this.listStylePosition = RA(A, um, t.listStylePosition), this.listStyleType = RA(A, Bf, t.listStyleType), this.marginTop = RA(A, cm, t.marginTop), this.marginRight = RA(A, fm, t.marginRight), this.marginBottom = RA(A, hm, t.marginBottom), this.marginLeft = RA(A, dm, t.marginLeft), this.opacity = RA(A, Hm, t.opacity);
      var i = RA(A, gm, t.overflow);
      this.overflowX = i[0], this.overflowY = i[i.length > 1 ? 1 : 0], this.overflowWrap = RA(A, pm, t.overflowWrap), this.paddingTop = RA(A, Bm, t.paddingTop), this.paddingRight = RA(A, wm, t.paddingRight), this.paddingBottom = RA(A, vm, t.paddingBottom), this.paddingLeft = RA(A, mm, t.paddingLeft), this.paintOrder = RA(A, Wm, t.paintOrder), this.position = RA(A, bm, t.position), this.textAlign = RA(A, ym, t.textAlign), this.textDecorationColor = RA(A, Om, (r = t.textDecorationColor) !== null && r !== void 0 ? r : t.color), this.textDecorationLine = RA(A, Dm, (n = t.textDecorationLine) !== null && n !== void 0 ? n : t.textDecoration), this.textShadow = RA(A, Cm, t.textShadow), this.textTransform = RA(A, Fm, t.textTransform), this.transform = RA(A, Qm, t.transform), this.transformOrigin = RA(A, Sm, t.transformOrigin), this.visibility = RA(A, Im, t.visibility), this.webkitTextStrokeColor = RA(A, Xm, t.webkitTextStrokeColor), this.webkitTextStrokeWidth = RA(A, $m, t.webkitTextStrokeWidth), this.wordBreak = RA(A, _m, t.wordBreak), this.zIndex = RA(A, Nm, t.zIndex);
    }
    return e.prototype.isVisible = function() {
      return this.display > 0 && this.opacity > 0 && this.visibility === 0;
    }, e.prototype.isTransparent = function() {
      return Gn(this.backgroundColor);
    }, e.prototype.isTransformed = function() {
      return this.transform !== null;
    }, e.prototype.isPositioned = function() {
      return this.position !== 0;
    }, e.prototype.isPositionedWithZIndex = function() {
      return this.isPositioned() && !this.zIndex.auto;
    }, e.prototype.isFloating = function() {
      return this.float !== 0;
    }, e.prototype.isInlineLevel = function() {
      return st(
        this.display,
        4
        /* INLINE */
      ) || st(
        this.display,
        33554432
        /* INLINE_BLOCK */
      ) || st(
        this.display,
        268435456
        /* INLINE_FLEX */
      ) || st(
        this.display,
        536870912
        /* INLINE_GRID */
      ) || st(
        this.display,
        67108864
        /* INLINE_LIST_ITEM */
      ) || st(
        this.display,
        134217728
        /* INLINE_TABLE */
      );
    }, e;
  }()
), Ym = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t) {
      this.content = RA(A, Km, t.content), this.quotes = RA(A, zm, t.quotes);
    }
    return e;
  }()
), z0 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t) {
      this.counterIncrement = RA(A, jm, t.counterIncrement), this.counterReset = RA(A, Gm, t.counterReset);
    }
    return e;
  }()
), RA = function(e, A, t) {
  var r = new C1(), n = t !== null && typeof t < "u" ? t.toString() : A.initialValue;
  r.write(n);
  var i = new F1(r.read());
  switch (A.type) {
    case 2:
      var a = i.parseComponentValue();
      return A.parse(e, Ee(a) ? a.value : A.initialValue);
    case 0:
      return A.parse(e, i.parseComponentValue());
    case 1:
      return A.parse(e, i.parseComponentValues());
    case 4:
      return i.parseComponentValue();
    case 3:
      switch (A.format) {
        case "angle":
          return ql.parse(e, i.parseComponentValue());
        case "color":
          return jn.parse(e, i.parseComponentValue());
        case "image":
          return Pf.parse(e, i.parseComponentValue());
        case "length":
          var l = i.parseComponentValue();
          return Wn(l) ? l : wt;
        case "length-percentage":
          var s = i.parseComponentValue();
          return it(s) ? s : wt;
        case "time":
          return K1.parse(e, i.parseComponentValue());
      }
      break;
  }
}, Zm = "data-html2canvas-debug", Ay = function(e) {
  var A = e.getAttribute(Zm);
  switch (A) {
    case "all":
      return 1;
    case "clone":
      return 2;
    case "parse":
      return 3;
    case "render":
      return 4;
    default:
      return 0;
  }
}, wf = function(e, A) {
  var t = Ay(e);
  return t === 1 || A === t;
}, Yr = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t) {
      if (this.context = A, this.textNodes = [], this.elements = [], this.flags = 0, wf(
        t,
        3
        /* PARSE */
      ))
        debugger;
      this.styles = new Jm(A, window.getComputedStyle(t, null)), yf(t) && (this.styles.animationDuration.some(function(r) {
        return r > 0;
      }) && (t.style.animationDuration = "0s"), this.styles.transform !== null && (t.style.transform = "none")), this.bounds = Vl(this.context, t), wf(
        t,
        4
        /* RENDER */
      ) && (this.flags |= 16);
    }
    return e;
  }()
), ey = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", q0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Uo = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var al = 0; al < q0.length; al++)
  Uo[q0.charCodeAt(al)] = al;
var ty = function(e) {
  var A = e.length * 0.75, t = e.length, r, n = 0, i, a, l, s;
  e[e.length - 1] === "=" && (A--, e[e.length - 2] === "=" && A--);
  var f = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(A) : new Array(A), g = Array.isArray(f) ? f : new Uint8Array(f);
  for (r = 0; r < t; r += 4)
    i = Uo[e.charCodeAt(r)], a = Uo[e.charCodeAt(r + 1)], l = Uo[e.charCodeAt(r + 2)], s = Uo[e.charCodeAt(r + 3)], g[n++] = i << 2 | a >> 4, g[n++] = (a & 15) << 4 | l >> 2, g[n++] = (l & 3) << 6 | s & 63;
  return f;
}, ry = function(e) {
  for (var A = e.length, t = [], r = 0; r < A; r += 2)
    t.push(e[r + 1] << 8 | e[r]);
  return t;
}, ny = function(e) {
  for (var A = e.length, t = [], r = 0; r < A; r += 4)
    t.push(e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]);
  return t;
}, Bi = 5, Mf = 11, yc = 2, iy = Mf - Bi, j1 = 65536 >> Bi, ay = 1 << Bi, bc = ay - 1, oy = 1024 >> Bi, sy = j1 + oy, ly = sy, uy = 32, cy = ly + uy, fy = 65536 >> Mf, hy = 1 << iy, dy = hy - 1, W0 = function(e, A, t) {
  return e.slice ? e.slice(A, t) : new Uint16Array(Array.prototype.slice.call(e, A, t));
}, gy = function(e, A, t) {
  return e.slice ? e.slice(A, t) : new Uint32Array(Array.prototype.slice.call(e, A, t));
}, py = function(e, A) {
  var t = ty(e), r = Array.isArray(t) ? ny(t) : new Uint32Array(t), n = Array.isArray(t) ? ry(t) : new Uint16Array(t), i = 24, a = W0(n, i / 2, r[4] / 2), l = r[5] === 2 ? W0(n, (i + r[4]) / 2) : gy(r, Math.ceil((i + r[4]) / 4));
  return new By(r[0], r[1], r[2], r[3], a, l);
}, By = (
  /** @class */
  function() {
    function e(A, t, r, n, i, a) {
      this.initialValue = A, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = i, this.data = a;
    }
    return e.prototype.get = function(A) {
      var t;
      if (A >= 0) {
        if (A < 55296 || A > 56319 && A <= 65535)
          return t = this.index[A >> Bi], t = (t << yc) + (A & bc), this.data[t];
        if (A <= 65535)
          return t = this.index[j1 + (A - 55296 >> Bi)], t = (t << yc) + (A & bc), this.data[t];
        if (A < this.highStart)
          return t = cy - fy + (A >> Mf), t = this.index[t], t += A >> Bi & dy, t = this.index[t], t = (t << yc) + (A & bc), this.data[t];
        if (A <= 1114111)
          return this.data[this.highValueIndex];
      }
      return this.errorValue;
    }, e;
  }()
), X0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", wy = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var ol = 0; ol < X0.length; ol++)
  wy[X0.charCodeAt(ol)] = ol;
var vy = 1, Cc = 2, Fc = 3, $0 = 4, J0 = 5, my = 7, Y0 = 8, Qc = 9, Uc = 10, Z0 = 11, Ad = 12, ed = 13, td = 14, Ec = 15, yy = function(e) {
  for (var A = [], t = 0, r = e.length; t < r; ) {
    var n = e.charCodeAt(t++);
    if (n >= 55296 && n <= 56319 && t < r) {
      var i = e.charCodeAt(t++);
      (i & 64512) === 56320 ? A.push(((n & 1023) << 10) + (i & 1023) + 65536) : (A.push(n), t--);
    } else
      A.push(n);
  }
  return A;
}, by = function() {
  for (var e = [], A = 0; A < arguments.length; A++)
    e[A] = arguments[A];
  if (String.fromCodePoint)
    return String.fromCodePoint.apply(String, e);
  var t = e.length;
  if (!t)
    return "";
  for (var r = [], n = -1, i = ""; ++n < t; ) {
    var a = e[n];
    a <= 65535 ? r.push(a) : (a -= 65536, r.push((a >> 10) + 55296, a % 1024 + 56320)), (n + 1 === t || r.length > 16384) && (i += String.fromCharCode.apply(String, r), r.length = 0);
  }
  return i;
}, Cy = py(ey), lr = "×", xc = "÷", Fy = function(e) {
  return Cy.get(e);
}, Qy = function(e, A, t) {
  var r = t - 2, n = A[r], i = A[t - 1], a = A[t];
  if (i === Cc && a === Fc)
    return lr;
  if (i === Cc || i === Fc || i === $0 || a === Cc || a === Fc || a === $0)
    return xc;
  if (i === Y0 && [Y0, Qc, Z0, Ad].indexOf(a) !== -1 || (i === Z0 || i === Qc) && (a === Qc || a === Uc) || (i === Ad || i === Uc) && a === Uc || a === ed || a === J0 || a === my || i === vy)
    return lr;
  if (i === ed && a === td) {
    for (; n === J0; )
      n = A[--r];
    if (n === td)
      return lr;
  }
  if (i === Ec && a === Ec) {
    for (var l = 0; n === Ec; )
      l++, n = A[--r];
    if (l % 2 === 0)
      return lr;
  }
  return xc;
}, Uy = function(e) {
  var A = yy(e), t = A.length, r = 0, n = 0, i = A.map(Fy);
  return {
    next: function() {
      if (r >= t)
        return { done: !0, value: null };
      for (var a = lr; r < t && (a = Qy(A, i, ++r)) === lr; )
        ;
      if (a !== lr || r === t) {
        var l = by.apply(null, A.slice(n, r));
        return n = r, { value: l, done: !1 };
      }
      return { done: !0, value: null };
    }
  };
}, Ey = function(e) {
  for (var A = Uy(e), t = [], r; !(r = A.next()).done; )
    r.value && t.push(r.value.slice());
  return t;
}, xy = function(e) {
  var A = 123;
  if (e.createRange) {
    var t = e.createRange();
    if (t.getBoundingClientRect) {
      var r = e.createElement("boundtest");
      r.style.height = A + "px", r.style.display = "block", e.body.appendChild(r), t.selectNode(r);
      var n = t.getBoundingClientRect(), i = Math.round(n.height);
      if (e.body.removeChild(r), i === A)
        return !0;
    }
  }
  return !1;
}, Ly = function(e) {
  var A = e.createElement("boundtest");
  A.style.width = "50px", A.style.display = "block", A.style.fontSize = "12px", A.style.letterSpacing = "0px", A.style.wordSpacing = "0px", e.body.appendChild(A);
  var t = e.createRange();
  A.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
  var r = A.firstChild, n = zl(r.data).map(function(s) {
    return Xe(s);
  }), i = 0, a = {}, l = n.every(function(s, f) {
    t.setStart(r, i), t.setEnd(r, i + s.length);
    var g = t.getBoundingClientRect();
    i += s.length;
    var p = g.x > a.x || g.y > a.y;
    return a = g, f === 0 ? !0 : p;
  });
  return e.body.removeChild(A), l;
}, Sy = function() {
  return typeof new Image().crossOrigin < "u";
}, Iy = function() {
  return typeof new XMLHttpRequest().responseType == "string";
}, _y = function(e) {
  var A = new Image(), t = e.createElement("canvas"), r = t.getContext("2d");
  if (!r)
    return !1;
  A.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
  try {
    r.drawImage(A, 0, 0), t.toDataURL();
  } catch {
    return !1;
  }
  return !0;
}, rd = function(e) {
  return e[0] === 0 && e[1] === 255 && e[2] === 0 && e[3] === 255;
}, Ny = function(e) {
  var A = e.createElement("canvas"), t = 100;
  A.width = t, A.height = t;
  var r = A.getContext("2d");
  if (!r)
    return Promise.reject(!1);
  r.fillStyle = "rgb(0, 255, 0)", r.fillRect(0, 0, t, t);
  var n = new Image(), i = A.toDataURL();
  n.src = i;
  var a = vf(t, t, 0, 0, n);
  return r.fillStyle = "red", r.fillRect(0, 0, t, t), nd(a).then(function(l) {
    r.drawImage(l, 0, 0);
    var s = r.getImageData(0, 0, t, t).data;
    r.fillStyle = "red", r.fillRect(0, 0, t, t);
    var f = e.createElement("div");
    return f.style.backgroundImage = "url(" + i + ")", f.style.height = t + "px", rd(s) ? nd(vf(t, t, 0, 0, f)) : Promise.reject(!1);
  }).then(function(l) {
    return r.drawImage(l, 0, 0), rd(r.getImageData(0, 0, t, t).data);
  }).catch(function() {
    return !1;
  });
}, vf = function(e, A, t, r, n) {
  var i = "http://www.w3.org/2000/svg", a = document.createElementNS(i, "svg"), l = document.createElementNS(i, "foreignObject");
  return a.setAttributeNS(null, "width", e.toString()), a.setAttributeNS(null, "height", A.toString()), l.setAttributeNS(null, "width", "100%"), l.setAttributeNS(null, "height", "100%"), l.setAttributeNS(null, "x", t.toString()), l.setAttributeNS(null, "y", r.toString()), l.setAttributeNS(null, "externalResourcesRequired", "true"), a.appendChild(l), l.appendChild(n), a;
}, nd = function(e) {
  return new Promise(function(A, t) {
    var r = new Image();
    r.onload = function() {
      return A(r);
    }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(e));
  });
}, Bt = {
  get SUPPORT_RANGE_BOUNDS() {
    var e = xy(document);
    return Object.defineProperty(Bt, "SUPPORT_RANGE_BOUNDS", { value: e }), e;
  },
  get SUPPORT_WORD_BREAKING() {
    var e = Bt.SUPPORT_RANGE_BOUNDS && Ly(document);
    return Object.defineProperty(Bt, "SUPPORT_WORD_BREAKING", { value: e }), e;
  },
  get SUPPORT_SVG_DRAWING() {
    var e = _y(document);
    return Object.defineProperty(Bt, "SUPPORT_SVG_DRAWING", { value: e }), e;
  },
  get SUPPORT_FOREIGNOBJECT_DRAWING() {
    var e = typeof Array.from == "function" && typeof window.fetch == "function" ? Ny(document) : Promise.resolve(!1);
    return Object.defineProperty(Bt, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: e }), e;
  },
  get SUPPORT_CORS_IMAGES() {
    var e = Sy();
    return Object.defineProperty(Bt, "SUPPORT_CORS_IMAGES", { value: e }), e;
  },
  get SUPPORT_RESPONSE_TYPE() {
    var e = Iy();
    return Object.defineProperty(Bt, "SUPPORT_RESPONSE_TYPE", { value: e }), e;
  },
  get SUPPORT_CORS_XHR() {
    var e = "withCredentials" in new XMLHttpRequest();
    return Object.defineProperty(Bt, "SUPPORT_CORS_XHR", { value: e }), e;
  },
  get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
    var e = !!(typeof Intl < "u" && Intl.Segmenter);
    return Object.defineProperty(Bt, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: e }), e;
  }
}, No = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t) {
      this.text = A, this.bounds = t;
    }
    return e;
  }()
), Hy = function(e, A, t, r) {
  var n = Ty(A, t), i = [], a = 0;
  return n.forEach(function(l) {
    if (t.textDecorationLine.length || l.trim().length > 0)
      if (Bt.SUPPORT_RANGE_BOUNDS) {
        var s = id(r, a, l.length).getClientRects();
        if (s.length > 1) {
          var f = Rf(l), g = 0;
          f.forEach(function(w) {
            i.push(new No(w, wn.fromDOMRectList(e, id(r, g + a, w.length).getClientRects()))), g += w.length;
          });
        } else
          i.push(new No(l, wn.fromDOMRectList(e, s)));
      } else {
        var p = r.splitText(l.length);
        i.push(new No(l, Oy(e, r))), r = p;
      }
    else Bt.SUPPORT_RANGE_BOUNDS || (r = r.splitText(l.length));
    a += l.length;
  }), i;
}, Oy = function(e, A) {
  var t = A.ownerDocument;
  if (t) {
    var r = t.createElement("html2canvaswrapper");
    r.appendChild(A.cloneNode(!0));
    var n = A.parentNode;
    if (n) {
      n.replaceChild(r, A);
      var i = Vl(e, r);
      return r.firstChild && n.replaceChild(r.firstChild, r), i;
    }
  }
  return wn.EMPTY;
}, id = function(e, A, t) {
  var r = e.ownerDocument;
  if (!r)
    throw new Error("Node has no owner document");
  var n = r.createRange();
  return n.setStart(e, A), n.setEnd(e, A + t), n;
}, Rf = function(e) {
  if (Bt.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var A = new Intl.Segmenter(void 0, { granularity: "grapheme" });
    return Array.from(A.segment(e)).map(function(t) {
      return t.segment;
    });
  }
  return Ey(e);
}, Dy = function(e, A) {
  if (Bt.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var t = new Intl.Segmenter(void 0, {
      granularity: "word"
    });
    return Array.from(t.segment(e)).map(function(r) {
      return r.segment;
    });
  }
  return Py(e, A);
}, Ty = function(e, A) {
  return A.letterSpacing !== 0 ? Rf(e) : Dy(e, A);
}, ky = [32, 160, 4961, 65792, 65793, 4153, 4241], Py = function(e, A) {
  for (var t = f5(e, {
    lineBreak: A.lineBreak,
    wordBreak: A.overflowWrap === "break-word" ? "break-word" : A.wordBreak
  }), r = [], n, i = function() {
    if (n.value) {
      var a = n.value.slice(), l = zl(a), s = "";
      l.forEach(function(f) {
        ky.indexOf(f) === -1 ? s += Xe(f) : (s.length && r.push(s), r.push(Xe(f)), s = "");
      }), s.length && r.push(s);
    }
  }; !(n = t.next()).done; )
    i();
  return r;
}, My = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t, r) {
      this.text = Ry(t.data, r.textTransform), this.textBounds = Hy(A, this.text, r, t);
    }
    return e;
  }()
), Ry = function(e, A) {
  switch (A) {
    case 1:
      return e.toLowerCase();
    case 3:
      return e.replace(Ky, jy);
    case 2:
      return e.toUpperCase();
    default:
      return e;
  }
}, Ky = /(^|\s|:|-|\(|\))([a-z])/g, jy = function(e, A, t) {
  return e.length > 0 ? A + t.toUpperCase() : e;
}, G1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n.src = r.currentSrc || r.src, n.intrinsicWidth = r.naturalWidth, n.intrinsicHeight = r.naturalHeight, n.context.cache.addImage(n.src), n;
    }
    return A;
  }(Yr)
), V1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n.canvas = r, n.intrinsicWidth = r.width, n.intrinsicHeight = r.height, n;
    }
    return A;
  }(Yr)
), z1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this, i = new XMLSerializer(), a = Vl(t, r);
      return r.setAttribute("width", a.width + "px"), r.setAttribute("height", a.height + "px"), n.svg = "data:image/svg+xml," + encodeURIComponent(i.serializeToString(r)), n.intrinsicWidth = r.width.baseVal.value, n.intrinsicHeight = r.height.baseVal.value, n.context.cache.addImage(n.svg), n;
    }
    return A;
  }(Yr)
), q1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n.value = r.value, n;
    }
    return A;
  }(Yr)
), mf = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n.start = r.start, n.reversed = typeof r.reversed == "boolean" && r.reversed === !0, n;
    }
    return A;
  }(Yr)
), Gy = [
  {
    type: 15,
    flags: 0,
    unit: "px",
    number: 3
  }
], Vy = [
  {
    type: 16,
    flags: 0,
    number: 50
  }
], zy = function(e) {
  return e.width > e.height ? new wn(e.left + (e.width - e.height) / 2, e.top, e.height, e.height) : e.width < e.height ? new wn(e.left, e.top + (e.height - e.width) / 2, e.width, e.width) : e;
}, qy = function(e) {
  var A = e.type === Wy ? new Array(e.value.length + 1).join("•") : e.value;
  return A.length === 0 ? e.placeholder || "" : A;
}, _l = "checkbox", Nl = "radio", Wy = "password", ad = 707406591, Kf = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      switch (n.type = r.type.toLowerCase(), n.checked = r.checked, n.value = qy(r), (n.type === _l || n.type === Nl) && (n.styles.backgroundColor = 3739148031, n.styles.borderTopColor = n.styles.borderRightColor = n.styles.borderBottomColor = n.styles.borderLeftColor = 2779096575, n.styles.borderTopWidth = n.styles.borderRightWidth = n.styles.borderBottomWidth = n.styles.borderLeftWidth = 1, n.styles.borderTopStyle = n.styles.borderRightStyle = n.styles.borderBottomStyle = n.styles.borderLeftStyle = 1, n.styles.backgroundClip = [
        0
        /* BORDER_BOX */
      ], n.styles.backgroundOrigin = [
        0
        /* BORDER_BOX */
      ], n.bounds = zy(n.bounds)), n.type) {
        case _l:
          n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = Gy;
          break;
        case Nl:
          n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = Vy;
          break;
      }
      return n;
    }
    return A;
  }(Yr)
), W1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this, i = r.options[r.selectedIndex || 0];
      return n.value = i && i.text || "", n;
    }
    return A;
  }(Yr)
), X1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n.value = r.value, n;
    }
    return A;
  }(Yr)
), $1 = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      n.src = r.src, n.width = parseInt(r.width, 10) || 0, n.height = parseInt(r.height, 10) || 0, n.backgroundColor = n.styles.backgroundColor;
      try {
        if (r.contentWindow && r.contentWindow.document && r.contentWindow.document.documentElement) {
          n.tree = Y1(t, r.contentWindow.document.documentElement);
          var i = r.contentWindow.document.documentElement ? Io(t, getComputedStyle(r.contentWindow.document.documentElement).backgroundColor) : pn.TRANSPARENT, a = r.contentWindow.document.body ? Io(t, getComputedStyle(r.contentWindow.document.body).backgroundColor) : pn.TRANSPARENT;
          n.backgroundColor = Gn(i) ? Gn(a) ? n.styles.backgroundColor : a : i;
        }
      } catch {
      }
      return n;
    }
    return A;
  }(Yr)
), Xy = ["OL", "UL", "MENU"], Ql = function(e, A, t, r) {
  for (var n = A.firstChild, i = void 0; n; n = i)
    if (i = n.nextSibling, Z1(n) && n.data.trim().length > 0)
      t.textNodes.push(new My(e, n, t.styles));
    else if (ga(n))
      if (rg(n) && n.assignedNodes)
        n.assignedNodes().forEach(function(l) {
          return Ql(e, l, t, r);
        });
      else {
        var a = J1(e, n);
        a.styles.isVisible() && ($y(n, a, r) ? a.flags |= 4 : Jy(a.styles) && (a.flags |= 2), Xy.indexOf(n.tagName) !== -1 && (a.flags |= 8), t.elements.push(a), n.slot, n.shadowRoot ? Ql(e, n.shadowRoot, a, r) : !Hl(n) && !Ag(n) && !Ol(n) && Ql(e, n, a, r));
      }
}, J1 = function(e, A) {
  return bf(A) ? new G1(e, A) : eg(A) ? new V1(e, A) : Ag(A) ? new z1(e, A) : Yy(A) ? new q1(e, A) : Zy(A) ? new mf(e, A) : Ab(A) ? new Kf(e, A) : Ol(A) ? new W1(e, A) : Hl(A) ? new X1(e, A) : tg(A) ? new $1(e, A) : new Yr(e, A);
}, Y1 = function(e, A) {
  var t = J1(e, A);
  return t.flags |= 4, Ql(e, A, t, t), t;
}, $y = function(e, A, t) {
  return A.styles.isPositionedWithZIndex() || A.styles.opacity < 1 || A.styles.isTransformed() || jf(e) && t.styles.isTransparent();
}, Jy = function(e) {
  return e.isPositioned() || e.isFloating();
}, Z1 = function(e) {
  return e.nodeType === Node.TEXT_NODE;
}, ga = function(e) {
  return e.nodeType === Node.ELEMENT_NODE;
}, yf = function(e) {
  return ga(e) && typeof e.style < "u" && !Ul(e);
}, Ul = function(e) {
  return typeof e.className == "object";
}, Yy = function(e) {
  return e.tagName === "LI";
}, Zy = function(e) {
  return e.tagName === "OL";
}, Ab = function(e) {
  return e.tagName === "INPUT";
}, eb = function(e) {
  return e.tagName === "HTML";
}, Ag = function(e) {
  return e.tagName === "svg";
}, jf = function(e) {
  return e.tagName === "BODY";
}, eg = function(e) {
  return e.tagName === "CANVAS";
}, od = function(e) {
  return e.tagName === "VIDEO";
}, bf = function(e) {
  return e.tagName === "IMG";
}, tg = function(e) {
  return e.tagName === "IFRAME";
}, sd = function(e) {
  return e.tagName === "STYLE";
}, tb = function(e) {
  return e.tagName === "SCRIPT";
}, Hl = function(e) {
  return e.tagName === "TEXTAREA";
}, Ol = function(e) {
  return e.tagName === "SELECT";
}, rg = function(e) {
  return e.tagName === "SLOT";
}, ld = function(e) {
  return e.tagName.indexOf("-") > 0;
}, rb = (
  /** @class */
  function() {
    function e() {
      this.counters = {};
    }
    return e.prototype.getCounterValue = function(A) {
      var t = this.counters[A];
      return t && t.length ? t[t.length - 1] : 1;
    }, e.prototype.getCounterValues = function(A) {
      var t = this.counters[A];
      return t || [];
    }, e.prototype.pop = function(A) {
      var t = this;
      A.forEach(function(r) {
        return t.counters[r].pop();
      });
    }, e.prototype.parse = function(A) {
      var t = this, r = A.counterIncrement, n = A.counterReset, i = !0;
      r !== null && r.forEach(function(l) {
        var s = t.counters[l.counter];
        s && l.increment !== 0 && (i = !1, s.length || s.push(1), s[Math.max(0, s.length - 1)] += l.increment);
      });
      var a = [];
      return i && n.forEach(function(l) {
        var s = t.counters[l.counter];
        a.push(l.counter), s || (s = t.counters[l.counter] = []), s.push(l.reset);
      }), a;
    }, e;
  }()
), ud = {
  integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
  values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
}, cd = {
  integers: [
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "Ք",
    "Փ",
    "Ւ",
    "Ց",
    "Ր",
    "Տ",
    "Վ",
    "Ս",
    "Ռ",
    "Ջ",
    "Պ",
    "Չ",
    "Ո",
    "Շ",
    "Ն",
    "Յ",
    "Մ",
    "Ճ",
    "Ղ",
    "Ձ",
    "Հ",
    "Կ",
    "Ծ",
    "Խ",
    "Լ",
    "Ի",
    "Ժ",
    "Թ",
    "Ը",
    "Է",
    "Զ",
    "Ե",
    "Դ",
    "Գ",
    "Բ",
    "Ա"
  ]
}, nb = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    19,
    18,
    17,
    16,
    15,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "י׳",
    "ט׳",
    "ח׳",
    "ז׳",
    "ו׳",
    "ה׳",
    "ד׳",
    "ג׳",
    "ב׳",
    "א׳",
    "ת",
    "ש",
    "ר",
    "ק",
    "צ",
    "פ",
    "ע",
    "ס",
    "נ",
    "מ",
    "ל",
    "כ",
    "יט",
    "יח",
    "יז",
    "טז",
    "טו",
    "י",
    "ט",
    "ח",
    "ז",
    "ו",
    "ה",
    "ד",
    "ג",
    "ב",
    "א"
  ]
}, ib = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "ჵ",
    "ჰ",
    "ჯ",
    "ჴ",
    "ხ",
    "ჭ",
    "წ",
    "ძ",
    "ც",
    "ჩ",
    "შ",
    "ყ",
    "ღ",
    "ქ",
    "ფ",
    "ჳ",
    "ტ",
    "ს",
    "რ",
    "ჟ",
    "პ",
    "ო",
    "ჲ",
    "ნ",
    "მ",
    "ლ",
    "კ",
    "ი",
    "თ",
    "ჱ",
    "ზ",
    "ვ",
    "ე",
    "დ",
    "გ",
    "ბ",
    "ა"
  ]
}, na = function(e, A, t, r, n, i) {
  return e < A || e > t ? Po(e, n, i.length > 0) : r.integers.reduce(function(a, l, s) {
    for (; e >= l; )
      e -= l, a += r.values[s];
    return a;
  }, "") + i;
}, ng = function(e, A, t, r) {
  var n = "";
  do
    t || e--, n = r(e) + n, e /= A;
  while (e * A >= A);
  return n;
}, We = function(e, A, t, r, n) {
  var i = t - A + 1;
  return (e < 0 ? "-" : "") + (ng(Math.abs(e), i, r, function(a) {
    return Xe(Math.floor(a % i) + A);
  }) + n);
}, ui = function(e, A, t) {
  t === void 0 && (t = ". ");
  var r = A.length;
  return ng(Math.abs(e), r, !1, function(n) {
    return A[Math.floor(n % r)];
  }) + t;
}, fa = 1, On = 2, Dn = 4, Eo = 8, dn = function(e, A, t, r, n, i) {
  if (e < -9999 || e > 9999)
    return Po(e, 4, n.length > 0);
  var a = Math.abs(e), l = n;
  if (a === 0)
    return A[0] + l;
  for (var s = 0; a > 0 && s <= 4; s++) {
    var f = a % 10;
    f === 0 && st(i, fa) && l !== "" ? l = A[f] + l : f > 1 || f === 1 && s === 0 || f === 1 && s === 1 && st(i, On) || f === 1 && s === 1 && st(i, Dn) && e > 100 || f === 1 && s > 1 && st(i, Eo) ? l = A[f] + (s > 0 ? t[s - 1] : "") + l : f === 1 && s > 0 && (l = t[s - 1] + l), a = Math.floor(a / 10);
  }
  return (e < 0 ? r : "") + l;
}, fd = "十百千萬", hd = "拾佰仟萬", dd = "マイナス", Lc = "마이너스", Po = function(e, A, t) {
  var r = t ? ". " : "", n = t ? "、" : "", i = t ? ", " : "", a = t ? " " : "";
  switch (A) {
    case 0:
      return "•" + a;
    case 1:
      return "◦" + a;
    case 2:
      return "◾" + a;
    case 5:
      var l = We(e, 48, 57, !0, r);
      return l.length < 4 ? "0" + l : l;
    case 4:
      return ui(e, "〇一二三四五六七八九", n);
    case 6:
      return na(e, 1, 3999, ud, 3, r).toLowerCase();
    case 7:
      return na(e, 1, 3999, ud, 3, r);
    case 8:
      return We(e, 945, 969, !1, r);
    case 9:
      return We(e, 97, 122, !1, r);
    case 10:
      return We(e, 65, 90, !1, r);
    case 11:
      return We(e, 1632, 1641, !0, r);
    case 12:
    case 49:
      return na(e, 1, 9999, cd, 3, r);
    case 35:
      return na(e, 1, 9999, cd, 3, r).toLowerCase();
    case 13:
      return We(e, 2534, 2543, !0, r);
    case 14:
    case 30:
      return We(e, 6112, 6121, !0, r);
    case 15:
      return ui(e, "子丑寅卯辰巳午未申酉戌亥", n);
    case 16:
      return ui(e, "甲乙丙丁戊己庚辛壬癸", n);
    case 17:
    case 48:
      return dn(e, "零一二三四五六七八九", fd, "負", n, On | Dn | Eo);
    case 47:
      return dn(e, "零壹貳參肆伍陸柒捌玖", hd, "負", n, fa | On | Dn | Eo);
    case 42:
      return dn(e, "零一二三四五六七八九", fd, "负", n, On | Dn | Eo);
    case 41:
      return dn(e, "零壹贰叁肆伍陆柒捌玖", hd, "负", n, fa | On | Dn | Eo);
    case 26:
      return dn(e, "〇一二三四五六七八九", "十百千万", dd, n, 0);
    case 25:
      return dn(e, "零壱弐参四伍六七八九", "拾百千万", dd, n, fa | On | Dn);
    case 31:
      return dn(e, "영일이삼사오육칠팔구", "십백천만", Lc, i, fa | On | Dn);
    case 33:
      return dn(e, "零一二三四五六七八九", "十百千萬", Lc, i, 0);
    case 32:
      return dn(e, "零壹貳參四五六七八九", "拾百千", Lc, i, fa | On | Dn);
    case 18:
      return We(e, 2406, 2415, !0, r);
    case 20:
      return na(e, 1, 19999, ib, 3, r);
    case 21:
      return We(e, 2790, 2799, !0, r);
    case 22:
      return We(e, 2662, 2671, !0, r);
    case 22:
      return na(e, 1, 10999, nb, 3, r);
    case 23:
      return ui(e, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
    case 24:
      return ui(e, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
    case 27:
      return We(e, 3302, 3311, !0, r);
    case 28:
      return ui(e, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", n);
    case 29:
      return ui(e, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", n);
    case 34:
      return We(e, 3792, 3801, !0, r);
    case 37:
      return We(e, 6160, 6169, !0, r);
    case 38:
      return We(e, 4160, 4169, !0, r);
    case 39:
      return We(e, 2918, 2927, !0, r);
    case 40:
      return We(e, 1776, 1785, !0, r);
    case 43:
      return We(e, 3046, 3055, !0, r);
    case 44:
      return We(e, 3174, 3183, !0, r);
    case 45:
      return We(e, 3664, 3673, !0, r);
    case 46:
      return We(e, 3872, 3881, !0, r);
    case 3:
    default:
      return We(e, 48, 57, !0, r);
  }
}, ig = "data-html2canvas-ignore", gd = (
  /** @class */
  function() {
    function e(A, t, r) {
      if (this.context = A, this.options = r, this.scrolledElements = [], this.referenceElement = t, this.counters = new rb(), this.quoteDepth = 0, !t.ownerDocument)
        throw new Error("Cloned element does not have an owner document");
      this.documentElement = this.cloneNode(t.ownerDocument.documentElement, !1);
    }
    return e.prototype.toIFrame = function(A, t) {
      var r = this, n = ab(A, t);
      if (!n.contentWindow)
        return Promise.reject("Unable to find iframe window");
      var i = A.defaultView.pageXOffset, a = A.defaultView.pageYOffset, l = n.contentWindow, s = l.document, f = lb(n).then(function() {
        return _t(r, void 0, void 0, function() {
          var g, p;
          return Ut(this, function(w) {
            switch (w.label) {
              case 0:
                return this.scrolledElements.forEach(hb), l && (l.scrollTo(t.left, t.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (l.scrollY !== t.top || l.scrollX !== t.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(l.scrollX - t.left, l.scrollY - t.top, 0, 0))), g = this.options.onclone, p = this.clonedReferenceElement, typeof p > "u" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : s.fonts && s.fonts.ready ? [4, s.fonts.ready] : [3, 2];
              case 1:
                w.sent(), w.label = 2;
              case 2:
                return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, sb(s)] : [3, 4];
              case 3:
                w.sent(), w.label = 4;
              case 4:
                return typeof g == "function" ? [2, Promise.resolve().then(function() {
                  return g(s, p);
                }).then(function() {
                  return n;
                })] : [2, n];
            }
          });
        });
      });
      return s.open(), s.write(cb(document.doctype) + "<html></html>"), fb(this.referenceElement.ownerDocument, i, a), s.replaceChild(s.adoptNode(this.documentElement), s.documentElement), s.close(), f;
    }, e.prototype.createElementClone = function(A) {
      if (wf(
        A,
        2
        /* CLONE */
      ))
        debugger;
      if (eg(A))
        return this.createCanvasClone(A);
      if (od(A))
        return this.createVideoClone(A);
      if (sd(A))
        return this.createStyleClone(A);
      var t = A.cloneNode(!1);
      return bf(t) && (bf(A) && A.currentSrc && A.currentSrc !== A.src && (t.src = A.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager")), ld(t) ? this.createCustomElementClone(t) : t;
    }, e.prototype.createCustomElementClone = function(A) {
      var t = document.createElement("html2canvascustomelement");
      return Sc(A.style, t), t;
    }, e.prototype.createStyleClone = function(A) {
      try {
        var t = A.sheet;
        if (t && t.cssRules) {
          var r = [].slice.call(t.cssRules, 0).reduce(function(i, a) {
            return a && typeof a.cssText == "string" ? i + a.cssText : i;
          }, ""), n = A.cloneNode(!1);
          return n.textContent = r, n;
        }
      } catch (i) {
        if (this.context.logger.error("Unable to access cssRules property", i), i.name !== "SecurityError")
          throw i;
      }
      return A.cloneNode(!1);
    }, e.prototype.createCanvasClone = function(A) {
      var t;
      if (this.options.inlineImages && A.ownerDocument) {
        var r = A.ownerDocument.createElement("img");
        try {
          return r.src = A.toDataURL(), r;
        } catch {
          this.context.logger.info("Unable to inline canvas contents, canvas is tainted", A);
        }
      }
      var n = A.cloneNode(!1);
      try {
        n.width = A.width, n.height = A.height;
        var i = A.getContext("2d"), a = n.getContext("2d");
        if (a)
          if (!this.options.allowTaint && i)
            a.putImageData(i.getImageData(0, 0, A.width, A.height), 0, 0);
          else {
            var l = (t = A.getContext("webgl2")) !== null && t !== void 0 ? t : A.getContext("webgl");
            if (l) {
              var s = l.getContextAttributes();
              (s == null ? void 0 : s.preserveDrawingBuffer) === !1 && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", A);
            }
            a.drawImage(A, 0, 0);
          }
        return n;
      } catch {
        this.context.logger.info("Unable to clone canvas as it is tainted", A);
      }
      return n;
    }, e.prototype.createVideoClone = function(A) {
      var t = A.ownerDocument.createElement("canvas");
      t.width = A.offsetWidth, t.height = A.offsetHeight;
      var r = t.getContext("2d");
      try {
        return r && (r.drawImage(A, 0, 0, t.width, t.height), this.options.allowTaint || r.getImageData(0, 0, t.width, t.height)), t;
      } catch {
        this.context.logger.info("Unable to clone video as it is tainted", A);
      }
      var n = A.ownerDocument.createElement("canvas");
      return n.width = A.offsetWidth, n.height = A.offsetHeight, n;
    }, e.prototype.appendChildNode = function(A, t, r) {
      (!ga(t) || !tb(t) && !t.hasAttribute(ig) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(t))) && (!this.options.copyStyles || !ga(t) || !sd(t)) && A.appendChild(this.cloneNode(t, r));
    }, e.prototype.cloneChildNodes = function(A, t, r) {
      for (var n = this, i = A.shadowRoot ? A.shadowRoot.firstChild : A.firstChild; i; i = i.nextSibling)
        if (ga(i) && rg(i) && typeof i.assignedNodes == "function") {
          var a = i.assignedNodes();
          a.length && a.forEach(function(l) {
            return n.appendChildNode(t, l, r);
          });
        } else
          this.appendChildNode(t, i, r);
    }, e.prototype.cloneNode = function(A, t) {
      if (Z1(A))
        return document.createTextNode(A.data);
      if (!A.ownerDocument)
        return A.cloneNode(!1);
      var r = A.ownerDocument.defaultView;
      if (r && ga(A) && (yf(A) || Ul(A))) {
        var n = this.createElementClone(A);
        n.style.transitionProperty = "none";
        var i = r.getComputedStyle(A), a = r.getComputedStyle(A, ":before"), l = r.getComputedStyle(A, ":after");
        this.referenceElement === A && yf(n) && (this.clonedReferenceElement = n), jf(n) && pb(n);
        var s = this.counters.parse(new z0(this.context, i)), f = this.resolvePseudoContent(A, n, a, Ho.BEFORE);
        ld(A) && (t = !0), od(A) || this.cloneChildNodes(A, n, t), f && n.insertBefore(f, n.firstChild);
        var g = this.resolvePseudoContent(A, n, l, Ho.AFTER);
        return g && n.appendChild(g), this.counters.pop(s), (i && (this.options.copyStyles || Ul(A)) && !tg(A) || t) && Sc(i, n), (A.scrollTop !== 0 || A.scrollLeft !== 0) && this.scrolledElements.push([n, A.scrollLeft, A.scrollTop]), (Hl(A) || Ol(A)) && (Hl(n) || Ol(n)) && (n.value = A.value), n;
      }
      return A.cloneNode(!1);
    }, e.prototype.resolvePseudoContent = function(A, t, r, n) {
      var i = this;
      if (r) {
        var a = r.content, l = t.ownerDocument;
        if (!(!l || !a || a === "none" || a === "-moz-alt-content" || r.display === "none")) {
          this.counters.parse(new z0(this.context, r));
          var s = new Ym(this.context, r), f = l.createElement("html2canvaspseudoelement");
          Sc(r, f), s.content.forEach(function(p) {
            if (p.type === 0)
              f.appendChild(l.createTextNode(p.value));
            else if (p.type === 22) {
              var w = l.createElement("img");
              w.src = p.value, w.style.opacity = "1", f.appendChild(w);
            } else if (p.type === 18) {
              if (p.name === "attr") {
                var d = p.values.filter(Ee);
                d.length && f.appendChild(l.createTextNode(A.getAttribute(d[0].value) || ""));
              } else if (p.name === "counter") {
                var C = p.values.filter(ba), b = C[0], _ = C[1];
                if (b && Ee(b)) {
                  var m = i.counters.getCounterValue(b.value), y = _ && Ee(_) ? Bf.parse(i.context, _.value) : 3;
                  f.appendChild(l.createTextNode(Po(m, y, !1)));
                }
              } else if (p.name === "counters") {
                var H = p.values.filter(ba), b = H[0], O = H[1], _ = H[2];
                if (b && Ee(b)) {
                  var P = i.counters.getCounterValues(b.value), q = _ && Ee(_) ? Bf.parse(i.context, _.value) : 3, W = O && O.type === 0 ? O.value : "", D = P.map(function(x) {
                    return Po(x, q, !1);
                  }).join(W);
                  f.appendChild(l.createTextNode(D));
                }
              }
            } else if (p.type === 20)
              switch (p.value) {
                case "open-quote":
                  f.appendChild(l.createTextNode(V0(s.quotes, i.quoteDepth++, !0)));
                  break;
                case "close-quote":
                  f.appendChild(l.createTextNode(V0(s.quotes, --i.quoteDepth, !1)));
                  break;
                default:
                  f.appendChild(l.createTextNode(p.value));
              }
          }), f.className = Cf + " " + Ff;
          var g = n === Ho.BEFORE ? " " + Cf : " " + Ff;
          return Ul(t) ? t.className.baseValue += g : t.className += g, f;
        }
      }
    }, e.destroy = function(A) {
      return A.parentNode ? (A.parentNode.removeChild(A), !0) : !1;
    }, e;
  }()
), Ho;
(function(e) {
  e[e.BEFORE = 0] = "BEFORE", e[e.AFTER = 1] = "AFTER";
})(Ho || (Ho = {}));
var ab = function(e, A) {
  var t = e.createElement("iframe");
  return t.className = "html2canvas-container", t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0px", t.style.border = "0", t.width = A.width.toString(), t.height = A.height.toString(), t.scrolling = "no", t.setAttribute(ig, "true"), e.body.appendChild(t), t;
}, ob = function(e) {
  return new Promise(function(A) {
    if (e.complete) {
      A();
      return;
    }
    if (!e.src) {
      A();
      return;
    }
    e.onload = A, e.onerror = A;
  });
}, sb = function(e) {
  return Promise.all([].slice.call(e.images, 0).map(ob));
}, lb = function(e) {
  return new Promise(function(A, t) {
    var r = e.contentWindow;
    if (!r)
      return t("No window assigned for iframe");
    var n = r.document;
    r.onload = e.onload = function() {
      r.onload = e.onload = null;
      var i = setInterval(function() {
        n.body.childNodes.length > 0 && n.readyState === "complete" && (clearInterval(i), A(e));
      }, 50);
    };
  });
}, ub = [
  "all",
  "d",
  "content"
  // Safari shows pseudoelements if content is set
], Sc = function(e, A) {
  for (var t = e.length - 1; t >= 0; t--) {
    var r = e.item(t);
    ub.indexOf(r) === -1 && A.style.setProperty(r, e.getPropertyValue(r));
  }
  return A;
}, cb = function(e) {
  var A = "";
  return e && (A += "<!DOCTYPE ", e.name && (A += e.name), e.internalSubset && (A += e.internalSubset), e.publicId && (A += '"' + e.publicId + '"'), e.systemId && (A += '"' + e.systemId + '"'), A += ">"), A;
}, fb = function(e, A, t) {
  e && e.defaultView && (A !== e.defaultView.pageXOffset || t !== e.defaultView.pageYOffset) && e.defaultView.scrollTo(A, t);
}, hb = function(e) {
  var A = e[0], t = e[1], r = e[2];
  A.scrollLeft = t, A.scrollTop = r;
}, db = ":before", gb = ":after", Cf = "___html2canvas___pseudoelement_before", Ff = "___html2canvas___pseudoelement_after", pd = `{
    content: "" !important;
    display: none !important;
}`, pb = function(e) {
  Bb(e, "." + Cf + db + pd + `
         .` + Ff + gb + pd);
}, Bb = function(e, A) {
  var t = e.ownerDocument;
  if (t) {
    var r = t.createElement("style");
    r.textContent = A, e.appendChild(r);
  }
}, ag = (
  /** @class */
  function() {
    function e() {
    }
    return e.getOrigin = function(A) {
      var t = e._link;
      return t ? (t.href = A, t.href = t.href, t.protocol + t.hostname + t.port) : "about:blank";
    }, e.isSameOrigin = function(A) {
      return e.getOrigin(A) === e._origin;
    }, e.setContext = function(A) {
      e._link = A.document.createElement("a"), e._origin = e.getOrigin(A.location.href);
    }, e._origin = "about:blank", e;
  }()
), wb = (
  /** @class */
  function() {
    function e(A, t) {
      this.context = A, this._options = t, this._cache = {};
    }
    return e.prototype.addImage = function(A) {
      var t = Promise.resolve();
      return this.has(A) || (_c(A) || bb(A)) && (this._cache[A] = this.loadImage(A)).catch(function() {
      }), t;
    }, e.prototype.match = function(A) {
      return this._cache[A];
    }, e.prototype.loadImage = function(A) {
      return _t(this, void 0, void 0, function() {
        var t, r, n, i, a = this;
        return Ut(this, function(l) {
          switch (l.label) {
            case 0:
              return t = ag.isSameOrigin(A), r = !Ic(A) && this._options.useCORS === !0 && Bt.SUPPORT_CORS_IMAGES && !t, n = !Ic(A) && !t && !_c(A) && typeof this._options.proxy == "string" && Bt.SUPPORT_CORS_XHR && !r, !t && this._options.allowTaint === !1 && !Ic(A) && !_c(A) && !n && !r ? [
                2
                /*return*/
              ] : (i = A, n ? [4, this.proxy(i)] : [3, 2]);
            case 1:
              i = l.sent(), l.label = 2;
            case 2:
              return this.context.logger.debug("Added image " + A.substring(0, 256)), [4, new Promise(function(s, f) {
                var g = new Image();
                g.onload = function() {
                  return s(g);
                }, g.onerror = f, (Cb(i) || r) && (g.crossOrigin = "anonymous"), g.src = i, g.complete === !0 && setTimeout(function() {
                  return s(g);
                }, 500), a._options.imageTimeout > 0 && setTimeout(function() {
                  return f("Timed out (" + a._options.imageTimeout + "ms) loading image");
                }, a._options.imageTimeout);
              })];
            case 3:
              return [2, l.sent()];
          }
        });
      });
    }, e.prototype.has = function(A) {
      return typeof this._cache[A] < "u";
    }, e.prototype.keys = function() {
      return Promise.resolve(Object.keys(this._cache));
    }, e.prototype.proxy = function(A) {
      var t = this, r = this._options.proxy;
      if (!r)
        throw new Error("No proxy defined");
      var n = A.substring(0, 256);
      return new Promise(function(i, a) {
        var l = Bt.SUPPORT_RESPONSE_TYPE ? "blob" : "text", s = new XMLHttpRequest();
        s.onload = function() {
          if (s.status === 200)
            if (l === "text")
              i(s.response);
            else {
              var p = new FileReader();
              p.addEventListener("load", function() {
                return i(p.result);
              }, !1), p.addEventListener("error", function(w) {
                return a(w);
              }, !1), p.readAsDataURL(s.response);
            }
          else
            a("Failed to proxy resource " + n + " with status code " + s.status);
        }, s.onerror = a;
        var f = r.indexOf("?") > -1 ? "&" : "?";
        if (s.open("GET", "" + r + f + "url=" + encodeURIComponent(A) + "&responseType=" + l), l !== "text" && s instanceof XMLHttpRequest && (s.responseType = l), t._options.imageTimeout) {
          var g = t._options.imageTimeout;
          s.timeout = g, s.ontimeout = function() {
            return a("Timed out (" + g + "ms) proxying " + n);
          };
        }
        s.send();
      });
    }, e;
  }()
), vb = /^data:image\/svg\+xml/i, mb = /^data:image\/.*;base64,/i, yb = /^data:image\/.*/i, bb = function(e) {
  return Bt.SUPPORT_SVG_DRAWING || !Fb(e);
}, Ic = function(e) {
  return yb.test(e);
}, Cb = function(e) {
  return mb.test(e);
}, _c = function(e) {
  return e.substr(0, 4) === "blob";
}, Fb = function(e) {
  return e.substr(-3).toLowerCase() === "svg" || vb.test(e);
}, kA = (
  /** @class */
  function() {
    function e(A, t) {
      this.type = 0, this.x = A, this.y = t;
    }
    return e.prototype.add = function(A, t) {
      return new e(this.x + A, this.y + t);
    }, e;
  }()
), ia = function(e, A, t) {
  return new kA(e.x + (A.x - e.x) * t, e.y + (A.y - e.y) * t);
}, sl = (
  /** @class */
  function() {
    function e(A, t, r, n) {
      this.type = 1, this.start = A, this.startControl = t, this.endControl = r, this.end = n;
    }
    return e.prototype.subdivide = function(A, t) {
      var r = ia(this.start, this.startControl, A), n = ia(this.startControl, this.endControl, A), i = ia(this.endControl, this.end, A), a = ia(r, n, A), l = ia(n, i, A), s = ia(a, l, A);
      return t ? new e(this.start, r, a, s) : new e(s, l, i, this.end);
    }, e.prototype.add = function(A, t) {
      return new e(this.start.add(A, t), this.startControl.add(A, t), this.endControl.add(A, t), this.end.add(A, t));
    }, e.prototype.reverse = function() {
      return new e(this.end, this.endControl, this.startControl, this.start);
    }, e;
  }()
), ur = function(e) {
  return e.type === 1;
}, Qb = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A) {
      var t = A.styles, r = A.bounds, n = Qo(t.borderTopLeftRadius, r.width, r.height), i = n[0], a = n[1], l = Qo(t.borderTopRightRadius, r.width, r.height), s = l[0], f = l[1], g = Qo(t.borderBottomRightRadius, r.width, r.height), p = g[0], w = g[1], d = Qo(t.borderBottomLeftRadius, r.width, r.height), C = d[0], b = d[1], _ = [];
      _.push((i + s) / r.width), _.push((C + p) / r.width), _.push((a + b) / r.height), _.push((f + w) / r.height);
      var m = Math.max.apply(Math, _);
      m > 1 && (i /= m, a /= m, s /= m, f /= m, p /= m, w /= m, C /= m, b /= m);
      var y = r.width - s, H = r.height - w, O = r.width - p, P = r.height - b, q = t.borderTopWidth, W = t.borderRightWidth, D = t.borderBottomWidth, R = t.borderLeftWidth, Y = Ne(t.paddingTop, A.bounds.width), x = Ne(t.paddingRight, A.bounds.width), I = Ne(t.paddingBottom, A.bounds.width), j = Ne(t.paddingLeft, A.bounds.width);
      this.topLeftBorderDoubleOuterBox = i > 0 || a > 0 ? Te(r.left + R / 3, r.top + q / 3, i - R / 3, a - q / 3, me.TOP_LEFT) : new kA(r.left + R / 3, r.top + q / 3), this.topRightBorderDoubleOuterBox = i > 0 || a > 0 ? Te(r.left + y, r.top + q / 3, s - W / 3, f - q / 3, me.TOP_RIGHT) : new kA(r.left + r.width - W / 3, r.top + q / 3), this.bottomRightBorderDoubleOuterBox = p > 0 || w > 0 ? Te(r.left + O, r.top + H, p - W / 3, w - D / 3, me.BOTTOM_RIGHT) : new kA(r.left + r.width - W / 3, r.top + r.height - D / 3), this.bottomLeftBorderDoubleOuterBox = C > 0 || b > 0 ? Te(r.left + R / 3, r.top + P, C - R / 3, b - D / 3, me.BOTTOM_LEFT) : new kA(r.left + R / 3, r.top + r.height - D / 3), this.topLeftBorderDoubleInnerBox = i > 0 || a > 0 ? Te(r.left + R * 2 / 3, r.top + q * 2 / 3, i - R * 2 / 3, a - q * 2 / 3, me.TOP_LEFT) : new kA(r.left + R * 2 / 3, r.top + q * 2 / 3), this.topRightBorderDoubleInnerBox = i > 0 || a > 0 ? Te(r.left + y, r.top + q * 2 / 3, s - W * 2 / 3, f - q * 2 / 3, me.TOP_RIGHT) : new kA(r.left + r.width - W * 2 / 3, r.top + q * 2 / 3), this.bottomRightBorderDoubleInnerBox = p > 0 || w > 0 ? Te(r.left + O, r.top + H, p - W * 2 / 3, w - D * 2 / 3, me.BOTTOM_RIGHT) : new kA(r.left + r.width - W * 2 / 3, r.top + r.height - D * 2 / 3), this.bottomLeftBorderDoubleInnerBox = C > 0 || b > 0 ? Te(r.left + R * 2 / 3, r.top + P, C - R * 2 / 3, b - D * 2 / 3, me.BOTTOM_LEFT) : new kA(r.left + R * 2 / 3, r.top + r.height - D * 2 / 3), this.topLeftBorderStroke = i > 0 || a > 0 ? Te(r.left + R / 2, r.top + q / 2, i - R / 2, a - q / 2, me.TOP_LEFT) : new kA(r.left + R / 2, r.top + q / 2), this.topRightBorderStroke = i > 0 || a > 0 ? Te(r.left + y, r.top + q / 2, s - W / 2, f - q / 2, me.TOP_RIGHT) : new kA(r.left + r.width - W / 2, r.top + q / 2), this.bottomRightBorderStroke = p > 0 || w > 0 ? Te(r.left + O, r.top + H, p - W / 2, w - D / 2, me.BOTTOM_RIGHT) : new kA(r.left + r.width - W / 2, r.top + r.height - D / 2), this.bottomLeftBorderStroke = C > 0 || b > 0 ? Te(r.left + R / 2, r.top + P, C - R / 2, b - D / 2, me.BOTTOM_LEFT) : new kA(r.left + R / 2, r.top + r.height - D / 2), this.topLeftBorderBox = i > 0 || a > 0 ? Te(r.left, r.top, i, a, me.TOP_LEFT) : new kA(r.left, r.top), this.topRightBorderBox = s > 0 || f > 0 ? Te(r.left + y, r.top, s, f, me.TOP_RIGHT) : new kA(r.left + r.width, r.top), this.bottomRightBorderBox = p > 0 || w > 0 ? Te(r.left + O, r.top + H, p, w, me.BOTTOM_RIGHT) : new kA(r.left + r.width, r.top + r.height), this.bottomLeftBorderBox = C > 0 || b > 0 ? Te(r.left, r.top + P, C, b, me.BOTTOM_LEFT) : new kA(r.left, r.top + r.height), this.topLeftPaddingBox = i > 0 || a > 0 ? Te(r.left + R, r.top + q, Math.max(0, i - R), Math.max(0, a - q), me.TOP_LEFT) : new kA(r.left + R, r.top + q), this.topRightPaddingBox = s > 0 || f > 0 ? Te(r.left + Math.min(y, r.width - W), r.top + q, y > r.width + W ? 0 : Math.max(0, s - W), Math.max(0, f - q), me.TOP_RIGHT) : new kA(r.left + r.width - W, r.top + q), this.bottomRightPaddingBox = p > 0 || w > 0 ? Te(r.left + Math.min(O, r.width - R), r.top + Math.min(H, r.height - D), Math.max(0, p - W), Math.max(0, w - D), me.BOTTOM_RIGHT) : new kA(r.left + r.width - W, r.top + r.height - D), this.bottomLeftPaddingBox = C > 0 || b > 0 ? Te(r.left + R, r.top + Math.min(P, r.height - D), Math.max(0, C - R), Math.max(0, b - D), me.BOTTOM_LEFT) : new kA(r.left + R, r.top + r.height - D), this.topLeftContentBox = i > 0 || a > 0 ? Te(r.left + R + j, r.top + q + Y, Math.max(0, i - (R + j)), Math.max(0, a - (q + Y)), me.TOP_LEFT) : new kA(r.left + R + j, r.top + q + Y), this.topRightContentBox = s > 0 || f > 0 ? Te(r.left + Math.min(y, r.width + R + j), r.top + q + Y, y > r.width + R + j ? 0 : s - R + j, f - (q + Y), me.TOP_RIGHT) : new kA(r.left + r.width - (W + x), r.top + q + Y), this.bottomRightContentBox = p > 0 || w > 0 ? Te(r.left + Math.min(O, r.width - (R + j)), r.top + Math.min(H, r.height + q + Y), Math.max(0, p - (W + x)), w - (D + I), me.BOTTOM_RIGHT) : new kA(r.left + r.width - (W + x), r.top + r.height - (D + I)), this.bottomLeftContentBox = C > 0 || b > 0 ? Te(r.left + R + j, r.top + P, Math.max(0, C - (R + j)), b - (D + I), me.BOTTOM_LEFT) : new kA(r.left + R + j, r.top + r.height - (D + I));
    }
    return e;
  }()
), me;
(function(e) {
  e[e.TOP_LEFT = 0] = "TOP_LEFT", e[e.TOP_RIGHT = 1] = "TOP_RIGHT", e[e.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", e[e.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
})(me || (me = {}));
var Te = function(e, A, t, r, n) {
  var i = 4 * ((Math.sqrt(2) - 1) / 3), a = t * i, l = r * i, s = e + t, f = A + r;
  switch (n) {
    case me.TOP_LEFT:
      return new sl(new kA(e, f), new kA(e, f - l), new kA(s - a, A), new kA(s, A));
    case me.TOP_RIGHT:
      return new sl(new kA(e, A), new kA(e + a, A), new kA(s, f - l), new kA(s, f));
    case me.BOTTOM_RIGHT:
      return new sl(new kA(s, A), new kA(s, A + l), new kA(e + a, f), new kA(e, f));
    case me.BOTTOM_LEFT:
    default:
      return new sl(new kA(s, f), new kA(s - a, f), new kA(e, A + l), new kA(e, A));
  }
}, Dl = function(e) {
  return [e.topLeftBorderBox, e.topRightBorderBox, e.bottomRightBorderBox, e.bottomLeftBorderBox];
}, Ub = function(e) {
  return [
    e.topLeftContentBox,
    e.topRightContentBox,
    e.bottomRightContentBox,
    e.bottomLeftContentBox
  ];
}, Tl = function(e) {
  return [
    e.topLeftPaddingBox,
    e.topRightPaddingBox,
    e.bottomRightPaddingBox,
    e.bottomLeftPaddingBox
  ];
}, Eb = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t, r) {
      this.offsetX = A, this.offsetY = t, this.matrix = r, this.type = 0, this.target = 6;
    }
    return e;
  }()
), ll = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t) {
      this.path = A, this.target = t, this.type = 1;
    }
    return e;
  }()
), xb = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A) {
      this.opacity = A, this.type = 2, this.target = 6;
    }
    return e;
  }()
), Lb = function(e) {
  return e.type === 0;
}, og = function(e) {
  return e.type === 1;
}, Sb = function(e) {
  return e.type === 2;
}, Bd = function(e, A) {
  return e.length === A.length ? e.some(function(t, r) {
    return t === A[r];
  }) : !1;
}, Ib = function(e, A, t, r, n) {
  return e.map(function(i, a) {
    switch (a) {
      case 0:
        return i.add(A, t);
      case 1:
        return i.add(A + r, t);
      case 2:
        return i.add(A + r, t + n);
      case 3:
        return i.add(A, t + n);
    }
    return i;
  });
}, sg = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A) {
      this.element = A, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
    }
    return e;
  }()
), lg = (
  /** @class */
  function() {
    function e(A, t) {
      if (this.container = A, this.parent = t, this.effects = [], this.curves = new Qb(this.container), this.container.styles.opacity < 1 && this.effects.push(new xb(this.container.styles.opacity)), this.container.styles.transform !== null) {
        var r = this.container.bounds.left + this.container.styles.transformOrigin[0].number, n = this.container.bounds.top + this.container.styles.transformOrigin[1].number, i = this.container.styles.transform;
        this.effects.push(new Eb(r, n, i));
      }
      if (this.container.styles.overflowX !== 0) {
        var a = Dl(this.curves), l = Tl(this.curves);
        Bd(a, l) ? this.effects.push(new ll(
          a,
          6
          /* CONTENT */
        )) : (this.effects.push(new ll(
          a,
          2
          /* BACKGROUND_BORDERS */
        )), this.effects.push(new ll(
          l,
          4
          /* CONTENT */
        )));
      }
    }
    return e.prototype.getEffects = function(A) {
      for (var t = [
        2,
        3
        /* FIXED */
      ].indexOf(this.container.styles.position) === -1, r = this.parent, n = this.effects.slice(0); r; ) {
        var i = r.effects.filter(function(s) {
          return !og(s);
        });
        if (t || r.container.styles.position !== 0 || !r.parent) {
          if (n.unshift.apply(n, i), t = [
            2,
            3
            /* FIXED */
          ].indexOf(r.container.styles.position) === -1, r.container.styles.overflowX !== 0) {
            var a = Dl(r.curves), l = Tl(r.curves);
            Bd(a, l) || n.unshift(new ll(
              l,
              6
              /* CONTENT */
            ));
          }
        } else
          n.unshift.apply(n, i);
        r = r.parent;
      }
      return n.filter(function(s) {
        return st(s.target, A);
      });
    }, e;
  }()
), Qf = function(e, A, t, r) {
  e.container.elements.forEach(function(n) {
    var i = st(
      n.flags,
      4
      /* CREATES_REAL_STACKING_CONTEXT */
    ), a = st(
      n.flags,
      2
      /* CREATES_STACKING_CONTEXT */
    ), l = new lg(n, e);
    st(
      n.styles.display,
      2048
      /* LIST_ITEM */
    ) && r.push(l);
    var s = st(
      n.flags,
      8
      /* IS_LIST_OWNER */
    ) ? [] : r;
    if (i || a) {
      var f = i || n.styles.isPositioned() ? t : A, g = new sg(l);
      if (n.styles.isPositioned() || n.styles.opacity < 1 || n.styles.isTransformed()) {
        var p = n.styles.zIndex.order;
        if (p < 0) {
          var w = 0;
          f.negativeZIndex.some(function(C, b) {
            return p > C.element.container.styles.zIndex.order ? (w = b, !1) : w > 0;
          }), f.negativeZIndex.splice(w, 0, g);
        } else if (p > 0) {
          var d = 0;
          f.positiveZIndex.some(function(C, b) {
            return p >= C.element.container.styles.zIndex.order ? (d = b + 1, !1) : d > 0;
          }), f.positiveZIndex.splice(d, 0, g);
        } else
          f.zeroOrAutoZIndexOrTransformedOrOpacity.push(g);
      } else
        n.styles.isFloating() ? f.nonPositionedFloats.push(g) : f.nonPositionedInlineLevel.push(g);
      Qf(l, g, i ? g : t, s);
    } else
      n.styles.isInlineLevel() ? A.inlineLevel.push(l) : A.nonInlineLevel.push(l), Qf(l, A, t, s);
    st(
      n.flags,
      8
      /* IS_LIST_OWNER */
    ) && ug(n, s);
  });
}, ug = function(e, A) {
  for (var t = e instanceof mf ? e.start : 1, r = e instanceof mf ? e.reversed : !1, n = 0; n < A.length; n++) {
    var i = A[n];
    i.container instanceof q1 && typeof i.container.value == "number" && i.container.value !== 0 && (t = i.container.value), i.listValue = Po(t, i.container.styles.listStyleType, !0), t += r ? -1 : 1;
  }
}, _b = function(e) {
  var A = new lg(e, null), t = new sg(A), r = [];
  return Qf(A, t, t, r), ug(A.container, r), t;
}, wd = function(e, A) {
  switch (A) {
    case 0:
      return hr(e.topLeftBorderBox, e.topLeftPaddingBox, e.topRightBorderBox, e.topRightPaddingBox);
    case 1:
      return hr(e.topRightBorderBox, e.topRightPaddingBox, e.bottomRightBorderBox, e.bottomRightPaddingBox);
    case 2:
      return hr(e.bottomRightBorderBox, e.bottomRightPaddingBox, e.bottomLeftBorderBox, e.bottomLeftPaddingBox);
    case 3:
    default:
      return hr(e.bottomLeftBorderBox, e.bottomLeftPaddingBox, e.topLeftBorderBox, e.topLeftPaddingBox);
  }
}, Nb = function(e, A) {
  switch (A) {
    case 0:
      return hr(e.topLeftBorderBox, e.topLeftBorderDoubleOuterBox, e.topRightBorderBox, e.topRightBorderDoubleOuterBox);
    case 1:
      return hr(e.topRightBorderBox, e.topRightBorderDoubleOuterBox, e.bottomRightBorderBox, e.bottomRightBorderDoubleOuterBox);
    case 2:
      return hr(e.bottomRightBorderBox, e.bottomRightBorderDoubleOuterBox, e.bottomLeftBorderBox, e.bottomLeftBorderDoubleOuterBox);
    case 3:
    default:
      return hr(e.bottomLeftBorderBox, e.bottomLeftBorderDoubleOuterBox, e.topLeftBorderBox, e.topLeftBorderDoubleOuterBox);
  }
}, Hb = function(e, A) {
  switch (A) {
    case 0:
      return hr(e.topLeftBorderDoubleInnerBox, e.topLeftPaddingBox, e.topRightBorderDoubleInnerBox, e.topRightPaddingBox);
    case 1:
      return hr(e.topRightBorderDoubleInnerBox, e.topRightPaddingBox, e.bottomRightBorderDoubleInnerBox, e.bottomRightPaddingBox);
    case 2:
      return hr(e.bottomRightBorderDoubleInnerBox, e.bottomRightPaddingBox, e.bottomLeftBorderDoubleInnerBox, e.bottomLeftPaddingBox);
    case 3:
    default:
      return hr(e.bottomLeftBorderDoubleInnerBox, e.bottomLeftPaddingBox, e.topLeftBorderDoubleInnerBox, e.topLeftPaddingBox);
  }
}, Ob = function(e, A) {
  switch (A) {
    case 0:
      return ul(e.topLeftBorderStroke, e.topRightBorderStroke);
    case 1:
      return ul(e.topRightBorderStroke, e.bottomRightBorderStroke);
    case 2:
      return ul(e.bottomRightBorderStroke, e.bottomLeftBorderStroke);
    case 3:
    default:
      return ul(e.bottomLeftBorderStroke, e.topLeftBorderStroke);
  }
}, ul = function(e, A) {
  var t = [];
  return ur(e) ? t.push(e.subdivide(0.5, !1)) : t.push(e), ur(A) ? t.push(A.subdivide(0.5, !0)) : t.push(A), t;
}, hr = function(e, A, t, r) {
  var n = [];
  return ur(e) ? n.push(e.subdivide(0.5, !1)) : n.push(e), ur(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t), ur(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r), ur(A) ? n.push(A.subdivide(0.5, !1).reverse()) : n.push(A), n;
}, cg = function(e) {
  var A = e.bounds, t = e.styles;
  return A.add(t.borderLeftWidth, t.borderTopWidth, -(t.borderRightWidth + t.borderLeftWidth), -(t.borderTopWidth + t.borderBottomWidth));
}, kl = function(e) {
  var A = e.styles, t = e.bounds, r = Ne(A.paddingLeft, t.width), n = Ne(A.paddingRight, t.width), i = Ne(A.paddingTop, t.width), a = Ne(A.paddingBottom, t.width);
  return t.add(r + A.borderLeftWidth, i + A.borderTopWidth, -(A.borderRightWidth + A.borderLeftWidth + r + n), -(A.borderTopWidth + A.borderBottomWidth + i + a));
}, Db = function(e, A) {
  return e === 0 ? A.bounds : e === 2 ? kl(A) : cg(A);
}, Tb = function(e, A) {
  return e === 0 ? A.bounds : e === 2 ? kl(A) : cg(A);
}, Nc = function(e, A, t) {
  var r = Db(ha(e.styles.backgroundOrigin, A), e), n = Tb(ha(e.styles.backgroundClip, A), e), i = kb(ha(e.styles.backgroundSize, A), t, r), a = i[0], l = i[1], s = Qo(ha(e.styles.backgroundPosition, A), r.width - a, r.height - l), f = Pb(ha(e.styles.backgroundRepeat, A), s, i, r, n), g = Math.round(r.left + s[0]), p = Math.round(r.top + s[1]);
  return [f, g, p, a, l];
}, aa = function(e) {
  return Ee(e) && e.value === ya.AUTO;
}, cl = function(e) {
  return typeof e == "number";
}, kb = function(e, A, t) {
  var r = A[0], n = A[1], i = A[2], a = e[0], l = e[1];
  if (!a)
    return [0, 0];
  if (it(a) && l && it(l))
    return [Ne(a, t.width), Ne(l, t.height)];
  var s = cl(i);
  if (Ee(a) && (a.value === ya.CONTAIN || a.value === ya.COVER)) {
    if (cl(i)) {
      var f = t.width / t.height;
      return f < i != (a.value === ya.COVER) ? [t.width, t.width / i] : [t.height * i, t.height];
    }
    return [t.width, t.height];
  }
  var g = cl(r), p = cl(n), w = g || p;
  if (aa(a) && (!l || aa(l))) {
    if (g && p)
      return [r, n];
    if (!s && !w)
      return [t.width, t.height];
    if (w && s) {
      var d = g ? r : n * i, C = p ? n : r / i;
      return [d, C];
    }
    var b = g ? r : t.width, _ = p ? n : t.height;
    return [b, _];
  }
  if (s) {
    var m = 0, y = 0;
    return it(a) ? m = Ne(a, t.width) : it(l) && (y = Ne(l, t.height)), aa(a) ? m = y * i : (!l || aa(l)) && (y = m / i), [m, y];
  }
  var H = null, O = null;
  if (it(a) ? H = Ne(a, t.width) : l && it(l) && (O = Ne(l, t.height)), H !== null && (!l || aa(l)) && (O = g && p ? H / r * n : t.height), O !== null && aa(a) && (H = g && p ? O / n * r : t.width), H !== null && O !== null)
    return [H, O];
  throw new Error("Unable to calculate background-size for element");
}, ha = function(e, A) {
  var t = e[A];
  return typeof t > "u" ? e[0] : t;
}, Pb = function(e, A, t, r, n) {
  var i = A[0], a = A[1], l = t[0], s = t[1];
  switch (e) {
    case 2:
      return [
        new kA(Math.round(r.left), Math.round(r.top + a)),
        new kA(Math.round(r.left + r.width), Math.round(r.top + a)),
        new kA(Math.round(r.left + r.width), Math.round(s + r.top + a)),
        new kA(Math.round(r.left), Math.round(s + r.top + a))
      ];
    case 3:
      return [
        new kA(Math.round(r.left + i), Math.round(r.top)),
        new kA(Math.round(r.left + i + l), Math.round(r.top)),
        new kA(Math.round(r.left + i + l), Math.round(r.height + r.top)),
        new kA(Math.round(r.left + i), Math.round(r.height + r.top))
      ];
    case 1:
      return [
        new kA(Math.round(r.left + i), Math.round(r.top + a)),
        new kA(Math.round(r.left + i + l), Math.round(r.top + a)),
        new kA(Math.round(r.left + i + l), Math.round(r.top + a + s)),
        new kA(Math.round(r.left + i), Math.round(r.top + a + s))
      ];
    default:
      return [
        new kA(Math.round(n.left), Math.round(n.top)),
        new kA(Math.round(n.left + n.width), Math.round(n.top)),
        new kA(Math.round(n.left + n.width), Math.round(n.height + n.top)),
        new kA(Math.round(n.left), Math.round(n.height + n.top))
      ];
  }
}, Mb = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", vd = "Hidden Text", Rb = (
  /** @class */
  function() {
    function e(A) {
      this._data = {}, this._document = A;
    }
    return e.prototype.parseMetrics = function(A, t) {
      var r = this._document.createElement("div"), n = this._document.createElement("img"), i = this._document.createElement("span"), a = this._document.body;
      r.style.visibility = "hidden", r.style.fontFamily = A, r.style.fontSize = t, r.style.margin = "0", r.style.padding = "0", r.style.whiteSpace = "nowrap", a.appendChild(r), n.src = Mb, n.width = 1, n.height = 1, n.style.margin = "0", n.style.padding = "0", n.style.verticalAlign = "baseline", i.style.fontFamily = A, i.style.fontSize = t, i.style.margin = "0", i.style.padding = "0", i.appendChild(this._document.createTextNode(vd)), r.appendChild(i), r.appendChild(n);
      var l = n.offsetTop - i.offsetTop + 2;
      r.removeChild(i), r.appendChild(this._document.createTextNode(vd)), r.style.lineHeight = "normal", n.style.verticalAlign = "super";
      var s = n.offsetTop - r.offsetTop + 2;
      return a.removeChild(r), { baseline: l, middle: s };
    }, e.prototype.getMetrics = function(A, t) {
      var r = A + " " + t;
      return typeof this._data[r] > "u" && (this._data[r] = this.parseMetrics(A, t)), this._data[r];
    }, e;
  }()
), fg = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(A, t) {
      this.context = A, this.options = t;
    }
    return e;
  }()
), Kb = 1e4, jb = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n._activeEffects = [], n.canvas = r.canvas ? r.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), r.canvas || (n.canvas.width = Math.floor(r.width * r.scale), n.canvas.height = Math.floor(r.height * r.scale), n.canvas.style.width = r.width + "px", n.canvas.style.height = r.height + "px"), n.fontMetrics = new Rb(document), n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-r.x, -r.y), n.ctx.textBaseline = "bottom", n._activeEffects = [], n.context.logger.debug("Canvas renderer initialized (" + r.width + "x" + r.height + ") with scale " + r.scale), n;
    }
    return A.prototype.applyEffects = function(t) {
      for (var r = this; this._activeEffects.length; )
        this.popEffect();
      t.forEach(function(n) {
        return r.applyEffect(n);
      });
    }, A.prototype.applyEffect = function(t) {
      this.ctx.save(), Sb(t) && (this.ctx.globalAlpha = t.opacity), Lb(t) && (this.ctx.translate(t.offsetX, t.offsetY), this.ctx.transform(t.matrix[0], t.matrix[1], t.matrix[2], t.matrix[3], t.matrix[4], t.matrix[5]), this.ctx.translate(-t.offsetX, -t.offsetY)), og(t) && (this.path(t.path), this.ctx.clip()), this._activeEffects.push(t);
    }, A.prototype.popEffect = function() {
      this._activeEffects.pop(), this.ctx.restore();
    }, A.prototype.renderStack = function(t) {
      return _t(this, void 0, void 0, function() {
        var r;
        return Ut(this, function(n) {
          switch (n.label) {
            case 0:
              return r = t.element.container.styles, r.isVisible() ? [4, this.renderStackContent(t)] : [3, 2];
            case 1:
              n.sent(), n.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.renderNode = function(t) {
      return _t(this, void 0, void 0, function() {
        return Ut(this, function(r) {
          switch (r.label) {
            case 0:
              if (st(
                t.container.flags,
                16
                /* DEBUG_RENDER */
              ))
                debugger;
              return t.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(t)] : [3, 3];
            case 1:
              return r.sent(), [4, this.renderNodeContent(t)];
            case 2:
              r.sent(), r.label = 3;
            case 3:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.renderTextWithLetterSpacing = function(t, r, n) {
      var i = this;
      if (r === 0)
        this.ctx.fillText(t.text, t.bounds.left, t.bounds.top + n);
      else {
        var a = Rf(t.text);
        a.reduce(function(l, s) {
          return i.ctx.fillText(s, l, t.bounds.top + n), l + i.ctx.measureText(s).width;
        }, t.bounds.left);
      }
    }, A.prototype.createFontStyle = function(t) {
      var r = t.fontVariant.filter(function(a) {
        return a === "normal" || a === "small-caps";
      }).join(""), n = Wb(t.fontFamily).join(", "), i = Ko(t.fontSize) ? "" + t.fontSize.number + t.fontSize.unit : t.fontSize.number + "px";
      return [
        [t.fontStyle, r, t.fontWeight, i, n].join(" "),
        n,
        i
      ];
    }, A.prototype.renderTextNode = function(t, r) {
      return _t(this, void 0, void 0, function() {
        var n, i, a, l, s, f, g, p, w = this;
        return Ut(this, function(d) {
          return n = this.createFontStyle(r), i = n[0], a = n[1], l = n[2], this.ctx.font = i, this.ctx.direction = r.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", s = this.fontMetrics.getMetrics(a, l), f = s.baseline, g = s.middle, p = r.paintOrder, t.textBounds.forEach(function(C) {
            p.forEach(function(b) {
              switch (b) {
                case 0:
                  w.ctx.fillStyle = ft(r.color), w.renderTextWithLetterSpacing(C, r.letterSpacing, f);
                  var _ = r.textShadow;
                  _.length && C.text.trim().length && (_.slice(0).reverse().forEach(function(m) {
                    w.ctx.shadowColor = ft(m.color), w.ctx.shadowOffsetX = m.offsetX.number * w.options.scale, w.ctx.shadowOffsetY = m.offsetY.number * w.options.scale, w.ctx.shadowBlur = m.blur.number, w.renderTextWithLetterSpacing(C, r.letterSpacing, f);
                  }), w.ctx.shadowColor = "", w.ctx.shadowOffsetX = 0, w.ctx.shadowOffsetY = 0, w.ctx.shadowBlur = 0), r.textDecorationLine.length && (w.ctx.fillStyle = ft(r.textDecorationColor || r.color), r.textDecorationLine.forEach(function(m) {
                    switch (m) {
                      case 1:
                        w.ctx.fillRect(C.bounds.left, Math.round(C.bounds.top + f), C.bounds.width, 1);
                        break;
                      case 2:
                        w.ctx.fillRect(C.bounds.left, Math.round(C.bounds.top), C.bounds.width, 1);
                        break;
                      case 3:
                        w.ctx.fillRect(C.bounds.left, Math.ceil(C.bounds.top + g), C.bounds.width, 1);
                        break;
                    }
                  }));
                  break;
                case 1:
                  r.webkitTextStrokeWidth && C.text.trim().length && (w.ctx.strokeStyle = ft(r.webkitTextStrokeColor), w.ctx.lineWidth = r.webkitTextStrokeWidth, w.ctx.lineJoin = window.chrome ? "miter" : "round", w.ctx.strokeText(C.text, C.bounds.left, C.bounds.top + f)), w.ctx.strokeStyle = "", w.ctx.lineWidth = 0, w.ctx.lineJoin = "miter";
                  break;
              }
            });
          }), [
            2
            /*return*/
          ];
        });
      });
    }, A.prototype.renderReplacedElement = function(t, r, n) {
      if (n && t.intrinsicWidth > 0 && t.intrinsicHeight > 0) {
        var i = kl(t), a = Tl(r);
        this.path(a), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(n, 0, 0, t.intrinsicWidth, t.intrinsicHeight, i.left, i.top, i.width, i.height), this.ctx.restore();
      }
    }, A.prototype.renderNodeContent = function(t) {
      return _t(this, void 0, void 0, function() {
        var r, n, i, a, l, s, y, y, f, g, p, w, O, d, C, P, b, _, m, y, H, O, P;
        return Ut(this, function(q) {
          switch (q.label) {
            case 0:
              this.applyEffects(t.getEffects(
                4
                /* CONTENT */
              )), r = t.container, n = t.curves, i = r.styles, a = 0, l = r.textNodes, q.label = 1;
            case 1:
              return a < l.length ? (s = l[a], [4, this.renderTextNode(s, i)]) : [3, 4];
            case 2:
              q.sent(), q.label = 3;
            case 3:
              return a++, [3, 1];
            case 4:
              if (!(r instanceof G1)) return [3, 8];
              q.label = 5;
            case 5:
              return q.trys.push([5, 7, , 8]), [4, this.context.cache.match(r.src)];
            case 6:
              return y = q.sent(), this.renderReplacedElement(r, n, y), [3, 8];
            case 7:
              return q.sent(), this.context.logger.error("Error loading image " + r.src), [3, 8];
            case 8:
              if (r instanceof V1 && this.renderReplacedElement(r, n, r.canvas), !(r instanceof z1)) return [3, 12];
              q.label = 9;
            case 9:
              return q.trys.push([9, 11, , 12]), [4, this.context.cache.match(r.svg)];
            case 10:
              return y = q.sent(), this.renderReplacedElement(r, n, y), [3, 12];
            case 11:
              return q.sent(), this.context.logger.error("Error loading svg " + r.svg.substring(0, 255)), [3, 12];
            case 12:
              return r instanceof $1 && r.tree ? (f = new A(this.context, {
                scale: this.options.scale,
                backgroundColor: r.backgroundColor,
                x: 0,
                y: 0,
                width: r.width,
                height: r.height
              }), [4, f.render(r.tree)]) : [3, 14];
            case 13:
              g = q.sent(), r.width && r.height && this.ctx.drawImage(g, 0, 0, r.width, r.height, r.bounds.left, r.bounds.top, r.bounds.width, r.bounds.height), q.label = 14;
            case 14:
              if (r instanceof Kf && (p = Math.min(r.bounds.width, r.bounds.height), r.type === _l ? r.checked && (this.ctx.save(), this.path([
                new kA(r.bounds.left + p * 0.39363, r.bounds.top + p * 0.79),
                new kA(r.bounds.left + p * 0.16, r.bounds.top + p * 0.5549),
                new kA(r.bounds.left + p * 0.27347, r.bounds.top + p * 0.44071),
                new kA(r.bounds.left + p * 0.39694, r.bounds.top + p * 0.5649),
                new kA(r.bounds.left + p * 0.72983, r.bounds.top + p * 0.23),
                new kA(r.bounds.left + p * 0.84, r.bounds.top + p * 0.34085),
                new kA(r.bounds.left + p * 0.39363, r.bounds.top + p * 0.79)
              ]), this.ctx.fillStyle = ft(ad), this.ctx.fill(), this.ctx.restore()) : r.type === Nl && r.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(r.bounds.left + p / 2, r.bounds.top + p / 2, p / 4, 0, Math.PI * 2, !0), this.ctx.fillStyle = ft(ad), this.ctx.fill(), this.ctx.restore())), Gb(r) && r.value.length) {
                switch (w = this.createFontStyle(i), O = w[0], d = w[1], C = this.fontMetrics.getMetrics(O, d).baseline, this.ctx.font = O, this.ctx.fillStyle = ft(i.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = zb(r.styles.textAlign), P = kl(r), b = 0, r.styles.textAlign) {
                  case 1:
                    b += P.width / 2;
                    break;
                  case 2:
                    b += P.width;
                    break;
                }
                _ = P.add(b, 0, 0, -P.height / 2 + 1), this.ctx.save(), this.path([
                  new kA(P.left, P.top),
                  new kA(P.left + P.width, P.top),
                  new kA(P.left + P.width, P.top + P.height),
                  new kA(P.left, P.top + P.height)
                ]), this.ctx.clip(), this.renderTextWithLetterSpacing(new No(r.value, _), i.letterSpacing, C), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
              }
              if (!st(
                r.styles.display,
                2048
                /* LIST_ITEM */
              )) return [3, 20];
              if (r.styles.listStyleImage === null) return [3, 19];
              if (m = r.styles.listStyleImage, m.type !== 0) return [3, 18];
              y = void 0, H = m.url, q.label = 15;
            case 15:
              return q.trys.push([15, 17, , 18]), [4, this.context.cache.match(H)];
            case 16:
              return y = q.sent(), this.ctx.drawImage(y, r.bounds.left - (y.width + 10), r.bounds.top), [3, 18];
            case 17:
              return q.sent(), this.context.logger.error("Error loading list-style-image " + H), [3, 18];
            case 18:
              return [3, 20];
            case 19:
              t.listValue && r.styles.listStyleType !== -1 && (O = this.createFontStyle(i)[0], this.ctx.font = O, this.ctx.fillStyle = ft(i.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", P = new wn(r.bounds.left, r.bounds.top + Ne(r.styles.paddingTop, r.bounds.width), r.bounds.width, j0(i.lineHeight, i.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new No(t.listValue, P), i.letterSpacing, j0(i.lineHeight, i.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), q.label = 20;
            case 20:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.renderStackContent = function(t) {
      return _t(this, void 0, void 0, function() {
        var r, n, m, i, a, m, l, s, m, f, g, m, p, w, m, d, C, m, b, _, m;
        return Ut(this, function(y) {
          switch (y.label) {
            case 0:
              if (st(
                t.element.container.flags,
                16
                /* DEBUG_RENDER */
              ))
                debugger;
              return [4, this.renderNodeBackgroundAndBorders(t.element)];
            case 1:
              y.sent(), r = 0, n = t.negativeZIndex, y.label = 2;
            case 2:
              return r < n.length ? (m = n[r], [4, this.renderStack(m)]) : [3, 5];
            case 3:
              y.sent(), y.label = 4;
            case 4:
              return r++, [3, 2];
            case 5:
              return [4, this.renderNodeContent(t.element)];
            case 6:
              y.sent(), i = 0, a = t.nonInlineLevel, y.label = 7;
            case 7:
              return i < a.length ? (m = a[i], [4, this.renderNode(m)]) : [3, 10];
            case 8:
              y.sent(), y.label = 9;
            case 9:
              return i++, [3, 7];
            case 10:
              l = 0, s = t.nonPositionedFloats, y.label = 11;
            case 11:
              return l < s.length ? (m = s[l], [4, this.renderStack(m)]) : [3, 14];
            case 12:
              y.sent(), y.label = 13;
            case 13:
              return l++, [3, 11];
            case 14:
              f = 0, g = t.nonPositionedInlineLevel, y.label = 15;
            case 15:
              return f < g.length ? (m = g[f], [4, this.renderStack(m)]) : [3, 18];
            case 16:
              y.sent(), y.label = 17;
            case 17:
              return f++, [3, 15];
            case 18:
              p = 0, w = t.inlineLevel, y.label = 19;
            case 19:
              return p < w.length ? (m = w[p], [4, this.renderNode(m)]) : [3, 22];
            case 20:
              y.sent(), y.label = 21;
            case 21:
              return p++, [3, 19];
            case 22:
              d = 0, C = t.zeroOrAutoZIndexOrTransformedOrOpacity, y.label = 23;
            case 23:
              return d < C.length ? (m = C[d], [4, this.renderStack(m)]) : [3, 26];
            case 24:
              y.sent(), y.label = 25;
            case 25:
              return d++, [3, 23];
            case 26:
              b = 0, _ = t.positiveZIndex, y.label = 27;
            case 27:
              return b < _.length ? (m = _[b], [4, this.renderStack(m)]) : [3, 30];
            case 28:
              y.sent(), y.label = 29;
            case 29:
              return b++, [3, 27];
            case 30:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.mask = function(t) {
      this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(t.slice(0).reverse()), this.ctx.closePath();
    }, A.prototype.path = function(t) {
      this.ctx.beginPath(), this.formatPath(t), this.ctx.closePath();
    }, A.prototype.formatPath = function(t) {
      var r = this;
      t.forEach(function(n, i) {
        var a = ur(n) ? n.start : n;
        i === 0 ? r.ctx.moveTo(a.x, a.y) : r.ctx.lineTo(a.x, a.y), ur(n) && r.ctx.bezierCurveTo(n.startControl.x, n.startControl.y, n.endControl.x, n.endControl.y, n.end.x, n.end.y);
      });
    }, A.prototype.renderRepeat = function(t, r, n, i) {
      this.path(t), this.ctx.fillStyle = r, this.ctx.translate(n, i), this.ctx.fill(), this.ctx.translate(-n, -i);
    }, A.prototype.resizeImage = function(t, r, n) {
      var i;
      if (t.width === r && t.height === n)
        return t;
      var a = (i = this.canvas.ownerDocument) !== null && i !== void 0 ? i : document, l = a.createElement("canvas");
      l.width = Math.max(1, r), l.height = Math.max(1, n);
      var s = l.getContext("2d");
      return s.drawImage(t, 0, 0, t.width, t.height, 0, 0, r, n), l;
    }, A.prototype.renderBackgroundImage = function(t) {
      return _t(this, void 0, void 0, function() {
        var r, n, i, a, l, s;
        return Ut(this, function(f) {
          switch (f.label) {
            case 0:
              r = t.styles.backgroundImage.length - 1, n = function(g) {
                var p, w, d, Y, iA, cA, j, K, D, C, Y, iA, cA, j, K, b, _, m, y, H, O, P, q, W, D, R, Y, x, I, j, K, nA, iA, cA, oA, dA, pA, LA, E, M, z, X;
                return Ut(this, function(eA) {
                  switch (eA.label) {
                    case 0:
                      if (g.type !== 0) return [3, 5];
                      p = void 0, w = g.url, eA.label = 1;
                    case 1:
                      return eA.trys.push([1, 3, , 4]), [4, i.context.cache.match(w)];
                    case 2:
                      return p = eA.sent(), [3, 4];
                    case 3:
                      return eA.sent(), i.context.logger.error("Error loading background-image " + w), [3, 4];
                    case 4:
                      return p && (d = Nc(t, r, [
                        p.width,
                        p.height,
                        p.width / p.height
                      ]), Y = d[0], iA = d[1], cA = d[2], j = d[3], K = d[4], D = i.ctx.createPattern(i.resizeImage(p, j, K), "repeat"), i.renderRepeat(Y, D, iA, cA)), [3, 6];
                    case 5:
                      Lv(g) ? (C = Nc(t, r, [null, null, null]), Y = C[0], iA = C[1], cA = C[2], j = C[3], K = C[4], b = Fv(g.angle, j, K), _ = b[0], m = b[1], y = b[2], H = b[3], O = b[4], P = document.createElement("canvas"), P.width = j, P.height = K, q = P.getContext("2d"), W = q.createLinearGradient(m, H, y, O), R0(g.stops, _).forEach(function(sA) {
                        return W.addColorStop(sA.stop, ft(sA.color));
                      }), q.fillStyle = W, q.fillRect(0, 0, j, K), j > 0 && K > 0 && (D = i.ctx.createPattern(P, "repeat"), i.renderRepeat(Y, D, iA, cA))) : Sv(g) && (R = Nc(t, r, [
                        null,
                        null,
                        null
                      ]), Y = R[0], x = R[1], I = R[2], j = R[3], K = R[4], nA = g.position.length === 0 ? [kf] : g.position, iA = Ne(nA[0], j), cA = Ne(nA[nA.length - 1], K), oA = Qv(g, iA, cA, j, K), dA = oA[0], pA = oA[1], dA > 0 && pA > 0 && (LA = i.ctx.createRadialGradient(x + iA, I + cA, 0, x + iA, I + cA, dA), R0(g.stops, dA * 2).forEach(function(sA) {
                        return LA.addColorStop(sA.stop, ft(sA.color));
                      }), i.path(Y), i.ctx.fillStyle = LA, dA !== pA ? (E = t.bounds.left + 0.5 * t.bounds.width, M = t.bounds.top + 0.5 * t.bounds.height, z = pA / dA, X = 1 / z, i.ctx.save(), i.ctx.translate(E, M), i.ctx.transform(1, 0, 0, z, 0, 0), i.ctx.translate(-E, -M), i.ctx.fillRect(x, X * (I - M) + M, j, K * X), i.ctx.restore()) : i.ctx.fill())), eA.label = 6;
                    case 6:
                      return r--, [
                        2
                        /*return*/
                      ];
                  }
                });
              }, i = this, a = 0, l = t.styles.backgroundImage.slice(0).reverse(), f.label = 1;
            case 1:
              return a < l.length ? (s = l[a], [5, n(s)]) : [3, 4];
            case 2:
              f.sent(), f.label = 3;
            case 3:
              return a++, [3, 1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.renderSolidBorder = function(t, r, n) {
      return _t(this, void 0, void 0, function() {
        return Ut(this, function(i) {
          return this.path(wd(n, r)), this.ctx.fillStyle = ft(t), this.ctx.fill(), [
            2
            /*return*/
          ];
        });
      });
    }, A.prototype.renderDoubleBorder = function(t, r, n, i) {
      return _t(this, void 0, void 0, function() {
        var a, l;
        return Ut(this, function(s) {
          switch (s.label) {
            case 0:
              return r < 3 ? [4, this.renderSolidBorder(t, n, i)] : [3, 2];
            case 1:
              return s.sent(), [
                2
                /*return*/
              ];
            case 2:
              return a = Nb(i, n), this.path(a), this.ctx.fillStyle = ft(t), this.ctx.fill(), l = Hb(i, n), this.path(l), this.ctx.fill(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.renderNodeBackgroundAndBorders = function(t) {
      return _t(this, void 0, void 0, function() {
        var r, n, i, a, l, s, f, g, p = this;
        return Ut(this, function(w) {
          switch (w.label) {
            case 0:
              return this.applyEffects(t.getEffects(
                2
                /* BACKGROUND_BORDERS */
              )), r = t.container.styles, n = !Gn(r.backgroundColor) || r.backgroundImage.length, i = [
                { style: r.borderTopStyle, color: r.borderTopColor, width: r.borderTopWidth },
                { style: r.borderRightStyle, color: r.borderRightColor, width: r.borderRightWidth },
                { style: r.borderBottomStyle, color: r.borderBottomColor, width: r.borderBottomWidth },
                { style: r.borderLeftStyle, color: r.borderLeftColor, width: r.borderLeftWidth }
              ], a = Vb(ha(r.backgroundClip, 0), t.curves), n || r.boxShadow.length ? (this.ctx.save(), this.path(a), this.ctx.clip(), Gn(r.backgroundColor) || (this.ctx.fillStyle = ft(r.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(t.container)]) : [3, 2];
            case 1:
              w.sent(), this.ctx.restore(), r.boxShadow.slice(0).reverse().forEach(function(d) {
                p.ctx.save();
                var C = Dl(t.curves), b = d.inset ? 0 : Kb, _ = Ib(C, -b + (d.inset ? 1 : -1) * d.spread.number, (d.inset ? 1 : -1) * d.spread.number, d.spread.number * (d.inset ? -2 : 2), d.spread.number * (d.inset ? -2 : 2));
                d.inset ? (p.path(C), p.ctx.clip(), p.mask(_)) : (p.mask(C), p.ctx.clip(), p.path(_)), p.ctx.shadowOffsetX = d.offsetX.number + b, p.ctx.shadowOffsetY = d.offsetY.number, p.ctx.shadowColor = ft(d.color), p.ctx.shadowBlur = d.blur.number, p.ctx.fillStyle = d.inset ? ft(d.color) : "rgba(0,0,0,1)", p.ctx.fill(), p.ctx.restore();
              }), w.label = 2;
            case 2:
              l = 0, s = 0, f = i, w.label = 3;
            case 3:
              return s < f.length ? (g = f[s], g.style !== 0 && !Gn(g.color) && g.width > 0 ? g.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(
                g.color,
                g.width,
                l,
                t.curves,
                2
                /* DASHED */
              )] : [3, 11]) : [3, 13];
            case 4:
              return w.sent(), [3, 11];
            case 5:
              return g.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(
                g.color,
                g.width,
                l,
                t.curves,
                3
                /* DOTTED */
              )];
            case 6:
              return w.sent(), [3, 11];
            case 7:
              return g.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(g.color, g.width, l, t.curves)];
            case 8:
              return w.sent(), [3, 11];
            case 9:
              return [4, this.renderSolidBorder(g.color, l, t.curves)];
            case 10:
              w.sent(), w.label = 11;
            case 11:
              l++, w.label = 12;
            case 12:
              return s++, [3, 3];
            case 13:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, A.prototype.renderDashedDottedBorder = function(t, r, n, i, a) {
      return _t(this, void 0, void 0, function() {
        var l, s, f, g, p, w, d, C, b, _, m, y, H, O, P, q, P, q;
        return Ut(this, function(W) {
          return this.ctx.save(), l = Ob(i, n), s = wd(i, n), a === 2 && (this.path(s), this.ctx.clip()), ur(s[0]) ? (f = s[0].start.x, g = s[0].start.y) : (f = s[0].x, g = s[0].y), ur(s[1]) ? (p = s[1].end.x, w = s[1].end.y) : (p = s[1].x, w = s[1].y), n === 0 || n === 2 ? d = Math.abs(f - p) : d = Math.abs(g - w), this.ctx.beginPath(), a === 3 ? this.formatPath(l) : this.formatPath(s.slice(0, 2)), C = r < 3 ? r * 3 : r * 2, b = r < 3 ? r * 2 : r, a === 3 && (C = r, b = r), _ = !0, d <= C * 2 ? _ = !1 : d <= C * 2 + b ? (m = d / (2 * C + b), C *= m, b *= m) : (y = Math.floor((d + b) / (C + b)), H = (d - y * C) / (y - 1), O = (d - (y + 1) * C) / y, b = O <= 0 || Math.abs(b - H) < Math.abs(b - O) ? H : O), _ && (a === 3 ? this.ctx.setLineDash([0, C + b]) : this.ctx.setLineDash([C, b])), a === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = r) : this.ctx.lineWidth = r * 2 + 1.1, this.ctx.strokeStyle = ft(t), this.ctx.stroke(), this.ctx.setLineDash([]), a === 2 && (ur(s[0]) && (P = s[3], q = s[0], this.ctx.beginPath(), this.formatPath([new kA(P.end.x, P.end.y), new kA(q.start.x, q.start.y)]), this.ctx.stroke()), ur(s[1]) && (P = s[1], q = s[2], this.ctx.beginPath(), this.formatPath([new kA(P.end.x, P.end.y), new kA(q.start.x, q.start.y)]), this.ctx.stroke())), this.ctx.restore(), [
            2
            /*return*/
          ];
        });
      });
    }, A.prototype.render = function(t) {
      return _t(this, void 0, void 0, function() {
        var r;
        return Ut(this, function(n) {
          switch (n.label) {
            case 0:
              return this.options.backgroundColor && (this.ctx.fillStyle = ft(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), r = _b(t), [4, this.renderStack(r)];
            case 1:
              return n.sent(), this.applyEffects([]), [2, this.canvas];
          }
        });
      });
    }, A;
  }(fg)
), Gb = function(e) {
  return e instanceof X1 || e instanceof W1 ? !0 : e instanceof Kf && e.type !== Nl && e.type !== _l;
}, Vb = function(e, A) {
  switch (e) {
    case 0:
      return Dl(A);
    case 2:
      return Ub(A);
    case 1:
    default:
      return Tl(A);
  }
}, zb = function(e) {
  switch (e) {
    case 1:
      return "center";
    case 2:
      return "right";
    case 0:
    default:
      return "left";
  }
}, qb = ["-apple-system", "system-ui"], Wb = function(e) {
  return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? e.filter(function(A) {
    return qb.indexOf(A) === -1;
  }) : e;
}, Xb = (
  /** @class */
  function(e) {
    Nr(A, e);
    function A(t, r) {
      var n = e.call(this, t, r) || this;
      return n.canvas = r.canvas ? r.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), n.options = r, n.canvas.width = Math.floor(r.width * r.scale), n.canvas.height = Math.floor(r.height * r.scale), n.canvas.style.width = r.width + "px", n.canvas.style.height = r.height + "px", n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-r.x, -r.y), n.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + r.width + "x" + r.height + " at " + r.x + "," + r.y + ") with scale " + r.scale), n;
    }
    return A.prototype.render = function(t) {
      return _t(this, void 0, void 0, function() {
        var r, n;
        return Ut(this, function(i) {
          switch (i.label) {
            case 0:
              return r = vf(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, t), [4, $b(r)];
            case 1:
              return n = i.sent(), this.options.backgroundColor && (this.ctx.fillStyle = ft(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(n, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
          }
        });
      });
    }, A;
  }(fg)
), $b = function(e) {
  return new Promise(function(A, t) {
    var r = new Image();
    r.onload = function() {
      A(r);
    }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(e));
  });
}, Jb = (
  /** @class */
  function() {
    function e(A) {
      var t = A.id, r = A.enabled;
      this.id = t, this.enabled = r, this.start = Date.now();
    }
    return e.prototype.debug = function() {
      for (var A = [], t = 0; t < arguments.length; t++)
        A[t] = arguments[t];
      this.enabled && (typeof window < "u" && window.console && typeof console.debug == "function" ? console.debug.apply(console, js([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
    }, e.prototype.getTime = function() {
      return Date.now() - this.start;
    }, e.prototype.info = function() {
      for (var A = [], t = 0; t < arguments.length; t++)
        A[t] = arguments[t];
      this.enabled && typeof window < "u" && window.console && typeof console.info == "function" && console.info.apply(console, js([this.id, this.getTime() + "ms"], A));
    }, e.prototype.warn = function() {
      for (var A = [], t = 0; t < arguments.length; t++)
        A[t] = arguments[t];
      this.enabled && (typeof window < "u" && window.console && typeof console.warn == "function" ? console.warn.apply(console, js([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
    }, e.prototype.error = function() {
      for (var A = [], t = 0; t < arguments.length; t++)
        A[t] = arguments[t];
      this.enabled && (typeof window < "u" && window.console && typeof console.error == "function" ? console.error.apply(console, js([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
    }, e.instances = {}, e;
  }()
), Yb = (
  /** @class */
  function() {
    function e(A, t) {
      var r;
      this.windowBounds = t, this.instanceName = "#" + e.instanceCount++, this.logger = new Jb({ id: this.instanceName, enabled: A.logging }), this.cache = (r = A.cache) !== null && r !== void 0 ? r : new wb(this, A);
    }
    return e.instanceCount = 1, e;
  }()
), hg = function(e, A) {
  return A === void 0 && (A = {}), Zb(e, A);
};
typeof window < "u" && ag.setContext(window);
var Zb = function(e, A) {
  return _t(void 0, void 0, void 0, function() {
    var t, r, n, i, a, l, s, f, g, p, w, d, C, b, _, m, y, H, O, P, W, q, W, D, R, Y, x, I, j, K, nA, iA, cA, oA, dA, pA, LA, E, M, z;
    return Ut(this, function(X) {
      switch (X.label) {
        case 0:
          if (!e || typeof e != "object")
            return [2, Promise.reject("Invalid element provided as first argument")];
          if (t = e.ownerDocument, !t)
            throw new Error("Element is not attached to a Document");
          if (r = t.defaultView, !r)
            throw new Error("Document is not attached to a Window");
          return n = {
            allowTaint: (D = A.allowTaint) !== null && D !== void 0 ? D : !1,
            imageTimeout: (R = A.imageTimeout) !== null && R !== void 0 ? R : 15e3,
            proxy: A.proxy,
            useCORS: (Y = A.useCORS) !== null && Y !== void 0 ? Y : !1
          }, i = rf({ logging: (x = A.logging) !== null && x !== void 0 ? x : !0, cache: A.cache }, n), a = {
            windowWidth: (I = A.windowWidth) !== null && I !== void 0 ? I : r.innerWidth,
            windowHeight: (j = A.windowHeight) !== null && j !== void 0 ? j : r.innerHeight,
            scrollX: (K = A.scrollX) !== null && K !== void 0 ? K : r.pageXOffset,
            scrollY: (nA = A.scrollY) !== null && nA !== void 0 ? nA : r.pageYOffset
          }, l = new wn(a.scrollX, a.scrollY, a.windowWidth, a.windowHeight), s = new Yb(i, l), f = (iA = A.foreignObjectRendering) !== null && iA !== void 0 ? iA : !1, g = {
            allowTaint: (cA = A.allowTaint) !== null && cA !== void 0 ? cA : !1,
            onclone: A.onclone,
            ignoreElements: A.ignoreElements,
            inlineImages: f,
            copyStyles: f
          }, s.logger.debug("Starting document clone with size " + l.width + "x" + l.height + " scrolled to " + -l.left + "," + -l.top), p = new gd(s, e, g), w = p.clonedReferenceElement, w ? [4, p.toIFrame(t, l)] : [2, Promise.reject("Unable to find element in cloned iframe")];
        case 1:
          return d = X.sent(), C = jf(w) || eb(w) ? Iw(w.ownerDocument) : Vl(s, w), b = C.width, _ = C.height, m = C.left, y = C.top, H = AC(s, w, A.backgroundColor), O = {
            canvas: A.canvas,
            backgroundColor: H,
            scale: (dA = (oA = A.scale) !== null && oA !== void 0 ? oA : r.devicePixelRatio) !== null && dA !== void 0 ? dA : 1,
            x: ((pA = A.x) !== null && pA !== void 0 ? pA : 0) + m,
            y: ((LA = A.y) !== null && LA !== void 0 ? LA : 0) + y,
            width: (E = A.width) !== null && E !== void 0 ? E : Math.ceil(b),
            height: (M = A.height) !== null && M !== void 0 ? M : Math.ceil(_)
          }, f ? (s.logger.debug("Document cloned, using foreign object rendering"), W = new Xb(s, O), [4, W.render(w)]) : [3, 3];
        case 2:
          return P = X.sent(), [3, 5];
        case 3:
          return s.logger.debug("Document cloned, element located at " + m + "," + y + " with size " + b + "x" + _ + " using computed rendering"), s.logger.debug("Starting DOM parsing"), q = Y1(s, w), H === q.styles.backgroundColor && (q.styles.backgroundColor = pn.TRANSPARENT), s.logger.debug("Starting renderer for element at " + O.x + "," + O.y + " with size " + O.width + "x" + O.height), W = new jb(s, O), [4, W.render(q)];
        case 4:
          P = X.sent(), X.label = 5;
        case 5:
          return (!((z = A.removeContainer) !== null && z !== void 0) || z) && (gd.destroy(d) || s.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), s.logger.debug("Finished rendering"), [2, P];
      }
    });
  });
}, AC = function(e, A, t) {
  var r = A.ownerDocument, n = r.documentElement ? Io(e, getComputedStyle(r.documentElement).backgroundColor) : pn.TRANSPARENT, i = r.body ? Io(e, getComputedStyle(r.body).backgroundColor) : pn.TRANSPARENT, a = typeof t == "string" ? Io(e, t) : t === null ? pn.TRANSPARENT : 4294967295;
  return A === r.documentElement ? Gn(n) ? Gn(i) ? a : i : n : a;
};
const eC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hg
}, Symbol.toStringTag, { value: "Module" })), tC = {
  name: "PtdViewer",
  props: {
    template: {
      type: Object,
      default: () => null
    }
  },
  setup(e) {
    const A = ye(null), t = ye(1), r = ye("preview"), n = ye(!1), i = {
      a4: { width: 595, height: 842, widthPx: 794, heightPx: 1123 },
      letter: { width: 612, height: 792, widthPx: 816, heightPx: 1056 }
    }, a = gn(() => {
      var y;
      return i[((y = e.template) == null ? void 0 : y.pageSize) || "a4"];
    });
    return {
      canvasRef: A,
      zoom: t,
      previewMode: r,
      isExporting: n,
      getElementStyle: (y) => ({
        position: "absolute",
        left: `${y.x}px`,
        top: `${y.y}px`,
        width: `${y.width}px`,
        height: `${y.height}px`
      }),
      getTextStyle: (y) => ({
        fontSize: `${y.fontSize}px`,
        color: y.color,
        fontFamily: y.fontFamily || "inherit",
        lineHeight: "1.2",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        padding: "4px",
        wordWrap: "break-word",
        overflow: "hidden",
        direction: y.textDirection || "ltr",
        textAlign: y.textDirection === "rtl" ? "right" : "left",
        fontWeight: y.fontWeight || "normal",
        fontStyle: y.fontStyle || "normal",
        textDecoration: y.textDecoration || "none"
      }),
      getImageStyle: (y) => ({
        width: "100%",
        height: "100%",
        objectFit: "contain"
      }),
      getTableStyle: (y) => ({
        width: "100%",
        height: "100%",
        borderCollapse: "collapse",
        fontSize: `${y.fontSize || 12}px`,
        fontFamily: y.fontFamily || "inherit",
        direction: y.textDirection || "ltr"
      }),
      getCellStyle: (y) => ({
        border: `${y.borderWidth || 1}px ${y.borderStyle || "solid"} ${y.borderColor || "#000000"}`,
        padding: `${y.cellPadding || 5}px`,
        textAlign: y.textDirection === "rtl" ? "right" : "left",
        verticalAlign: "top",
        direction: y.textDirection || "ltr"
      }),
      zoomIn: () => {
        t.value = Math.min(t.value + 0.1, 2);
      },
      zoomOut: () => {
        t.value = Math.max(t.value - 0.1, 0.1);
      },
      refreshPreview: () => {
        pa(() => {
          console.log("Preview refreshed");
        });
      },
      exportToPDF: async () => {
        if (!(!A.value || !e.template)) {
          n.value = !0;
          try {
            await pa();
            const y = t.value;
            t.value = 1, await pa();
            const H = document.createElement("div");
            H.style.position = "absolute", H.style.left = "-9999px", H.style.top = "-9999px", H.style.width = a.value.widthPx + "px", H.style.height = a.value.heightPx + "px", H.style.backgroundColor = "#ffffff", H.style.overflow = "hidden";
            const O = A.value.cloneNode(!0);
            O.style.transform = "none", O.style.margin = "0", O.style.position = "relative", H.appendChild(O), document.body.appendChild(H);
            const P = await hg(H, {
              scale: 2,
              useCORS: !0,
              allowTaint: !0,
              backgroundColor: "#ffffff",
              width: a.value.widthPx,
              height: a.value.heightPx,
              x: 0,
              y: 0,
              scrollX: 0,
              scrollY: 0
            });
            document.body.removeChild(H);
            const q = P.toDataURL("image/png", 1), W = new WA({
              orientation: a.value.width > a.value.height ? "landscape" : "portrait",
              unit: "pt",
              format: [a.value.width, a.value.height],
              compress: !0
            });
            W.addImage(
              q,
              "PNG",
              0,
              0,
              a.value.width,
              a.value.height,
              void 0,
              "FAST"
            );
            const D = `template_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-")}.pdf`;
            W.save(D), t.value = y;
          } catch (y) {
            console.error("Error exporting PDF:", y), alert("Error exporting PDF. Please try again.");
          } finally {
            n.value = !1;
          }
        }
      },
      printTemplate: () => {
        if (!A.value) return;
        const y = window.open("", "_blank"), H = A.value.cloneNode(!0);
        y.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Template</title>
          <style>
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body { 
              margin: 0 !important; 
              padding: 0 !important; 
              font-family: Arial, sans-serif;
              width: 100%;
              height: 100%;
            }
            .canvas { 
              box-shadow: none !important; 
              margin: 0 !important;
              padding: 0 !important;
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100% !important;
              height: 100% !important;
              transform: none !important;
            }
            .viewer-element { 
              position: absolute !important; 
              page-break-inside: avoid;
            }
            .text-element { 
              font-family: inherit; 
            }
            .image-element { 
              max-width: 100%; 
              max-height: 100%; 
            }
            @page {
              margin: 0;
              size: A4 portrait;
            }
            @media print {
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body { 
                margin: 0 !important; 
                padding: 0 !important; 
                width: 210mm !important;
                height: 297mm !important;
                overflow: hidden !important;
              }
              .canvas { 
                margin: 0 !important; 
                transform: none !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 210mm !important;
                height: 297mm !important;
                box-shadow: none !important;
                background: white !important;
              }
              .viewer-element {
                position: absolute !important;
                transform: none !important;
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box !important;
              }
              .text-element,
              .image-element,
              .line-element,
              .rect-element,
              .circle-element,
              .table-element {
                position: relative !important;
                width: 100% !important;
                height: 100% !important;
                box-sizing: border-box !important;
              }
            }
          </style>
        </head>
        <body>
          ${H.outerHTML}
        </body>
        </html>
      `), y.document.close(), y.focus(), setTimeout(() => {
          y.print(), y.close();
        }, 250);
      },
      handleImageError: (y) => {
        console.warn("Image failed to load:", y.target.src);
      }
    };
  }
}, rC = { class: "viewer-container" }, nC = { class: "viewer-toolbar" }, iC = { class: "d-flex justify-content-between align-items-center" }, aC = { class: "d-flex align-items-center gap-3" }, oC = {
  class: "btn-group",
  role: "group"
}, sC = ["disabled"], lC = { class: "d-flex align-items-center gap-3" }, uC = { class: "zoom-controls" }, cC = { class: "px-2" }, fC = { class: "viewer-canvas" }, hC = ["innerHTML"], dC = ["src"], gC = {
  key: 3,
  class: "line-element"
}, pC = {
  key: 4,
  class: "rect-element"
}, BC = {
  key: 5,
  class: "circle-element"
}, wC = {
  key: 6,
  class: "table-element"
}, vC = {
  key: 1,
  class: "d-flex align-items-center justify-content-center h-100"
}, mC = {
  key: 0,
  class: "loading-spinner"
};
function yC(e, A, t, r, n, i) {
  var a, l;
  return IA(), _A("div", rC, [
    T("div", nC, [
      T("div", iC, [
        T("div", aC, [
          A[10] || (A[10] = T("h5", { class: "mb-0" }, "Template Preview", -1)),
          T("div", oC, [
            T("button", {
              class: "btn btn-outline-primary btn-sm",
              onClick: A[0] || (A[0] = (...s) => r.refreshPreview && r.refreshPreview(...s))
            }, A[7] || (A[7] = [
              T("i", { class: "bi bi-arrow-clockwise" }, null, -1),
              le(" Refresh ", -1)
            ])),
            T("button", {
              class: "btn btn-primary btn-sm",
              onClick: A[1] || (A[1] = (...s) => r.exportToPDF && r.exportToPDF(...s)),
              disabled: r.isExporting
            }, [
              A[8] || (A[8] = T("i", { class: "bi bi-file-earmark-pdf" }, null, -1)),
              le(" " + nt(r.isExporting ? "Exporting..." : "Export PDF"), 1)
            ], 8, sC),
            T("button", {
              class: "btn btn-outline-secondary btn-sm",
              onClick: A[2] || (A[2] = (...s) => r.printTemplate && r.printTemplate(...s))
            }, A[9] || (A[9] = [
              T("i", { class: "bi bi-printer" }, null, -1),
              le(" Print ", -1)
            ]))
          ])
        ]),
        T("div", lC, [
          T("div", uC, [
            T("button", {
              class: "btn btn-sm btn-outline-secondary",
              onClick: A[3] || (A[3] = (...s) => r.zoomOut && r.zoomOut(...s))
            }, A[11] || (A[11] = [
              T("i", { class: "bi bi-zoom-out" }, null, -1)
            ])),
            T("span", cC, nt(Math.round(r.zoom * 100)) + "%", 1),
            T("button", {
              class: "btn btn-sm btn-outline-secondary",
              onClick: A[4] || (A[4] = (...s) => r.zoomIn && r.zoomIn(...s))
            }, A[12] || (A[12] = [
              T("i", { class: "bi bi-zoom-in" }, null, -1)
            ]))
          ]),
          ue(T("select", {
            class: "form-select form-select-sm",
            "onUpdate:modelValue": A[5] || (A[5] = (s) => r.previewMode = s),
            style: { width: "auto" }
          }, A[13] || (A[13] = [
            T("option", { value: "preview" }, "Preview", -1),
            T("option", { value: "print" }, "Print View", -1)
          ]), 512), [
            [sr, r.previewMode]
          ])
        ])
      ])
    ]),
    T("div", fC, [
      T("div", {
        ref: "canvasRef",
        class: zr(["canvas", [((a = t.template) == null ? void 0 : a.pageSize) || "a4", { "print-mode": r.previewMode === "print" }]]),
        style: Be({
          transform: `scale(${r.zoom})`,
          transformOrigin: "top center"
        })
      }, [
        (l = t.template) != null && l.elements ? (IA(!0), _A(Nt, { key: 0 }, dr(t.template.elements, (s) => (IA(), _A("div", {
          key: s.id,
          class: "viewer-element",
          style: Be(r.getElementStyle(s))
        }, [
          s.type === "text" || s.type === "formatted-text" ? (IA(), _A("div", {
            key: 0,
            class: "text-element",
            style: Be(r.getTextStyle(s)),
            innerHTML: s.content
          }, null, 12, hC)) : s.type === "image" && s.src ? (IA(), _A("img", {
            key: 1,
            src: s.src,
            class: "image-element",
            style: Be(r.getImageStyle(s)),
            onError: A[6] || (A[6] = (...f) => r.handleImageError && r.handleImageError(...f))
          }, null, 44, dC)) : s.type === "image" ? (IA(), _A("div", {
            key: 2,
            class: "image-placeholder d-flex align-items-center justify-content-center",
            style: Be(r.getImageStyle(s))
          }, A[14] || (A[14] = [
            T("i", { class: "bi bi-image fs-1 text-muted" }, null, -1)
          ]), 4)) : s.type === "line" ? (IA(), _A("div", gC, [
            T("div", {
              class: "line-shape",
              style: Be({
                width: "100%",
                height: `${s.strokeWidth || 2}px`,
                backgroundColor: s.strokeStyle === "solid" ? s.strokeColor || "#000000" : "transparent",
                border: s.strokeStyle !== "solid" ? `${s.strokeWidth || 2}px ${s.strokeStyle || "solid"} ${s.strokeColor || "#000000"}` : "none",
                borderTop: s.strokeStyle !== "solid" ? `${s.strokeWidth || 2}px ${s.strokeStyle || "solid"} ${s.strokeColor || "#000000"}` : "none",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)"
              })
            }, null, 4)
          ])) : s.type === "rect" ? (IA(), _A("div", pC, [
            T("div", {
              class: "rect-shape",
              style: Be({
                width: "100%",
                height: "100%",
                backgroundColor: s.fillColor || "#ffffff",
                border: `${s.strokeWidth || 1}px ${s.strokeStyle || "solid"} ${s.strokeColor || "#000000"}`
              })
            }, null, 4)
          ])) : s.type === "circle" ? (IA(), _A("div", BC, [
            T("div", {
              class: "circle-shape",
              style: Be({
                width: "100%",
                height: "100%",
                backgroundColor: s.fillColor || "#ffffff",
                border: `${s.strokeWidth || 1}px ${s.strokeStyle || "solid"} ${s.strokeColor || "#000000"}`,
                borderRadius: "50%"
              })
            }, null, 4)
          ])) : s.type === "table" ? (IA(), _A("div", wC, [
            T("table", {
              class: "table-shape",
              style: Be(r.getTableStyle(s))
            }, [
              (IA(!0), _A(Nt, null, dr(s.data, (f, g) => (IA(), _A("tr", { key: g }, [
                (IA(!0), _A(Nt, null, dr(f, (p, w) => (IA(), _A("td", {
                  key: w,
                  style: Be(r.getCellStyle(s))
                }, nt(p), 5))), 128))
              ]))), 128))
            ], 4)
          ])) : de("", !0)
        ], 4))), 128)) : (IA(), _A("div", vC, A[15] || (A[15] = [
          T("div", { class: "text-center text-muted" }, [
            T("i", { class: "bi bi-file-earmark display-1" }),
            T("p", { class: "mt-3" }, "No template loaded")
          ], -1)
        ])))
      ], 6)
    ]),
    r.isExporting ? (IA(), _A("div", mC, A[16] || (A[16] = [
      T("div", {
        class: "spinner-border text-primary",
        role: "status"
      }, [
        T("span", { class: "visually-hidden" }, "Exporting...")
      ], -1)
    ]))) : de("", !0)
  ]);
}
const bC = /* @__PURE__ */ vi(tC, [["render", yC], ["__scopeId", "data-v-fe8678d3"]]), CC = {
  name: "SketchRuler",
  props: {
    canvasWidth: {
      type: Number,
      default: 800
    },
    canvasHeight: {
      type: Number,
      default: 600
    },
    zoom: {
      type: Number,
      default: 1
    },
    scrollLeft: {
      type: Number,
      default: 0
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: "px"
    }
  },
  emits: ["guide-lines-changed"],
  setup(e, { emit: A }) {
    const t = ye(null), r = ye(null), n = ye(20), i = ye([]), a = ye([]), l = ye(null), s = ye(null), f = ye(!1), g = ye(null), p = () => {
      const D = t.value;
      if (!D) return;
      const R = D.getContext("2d"), { canvasWidth: Y, zoom: x } = e;
      R.clearRect(0, 0, Y, n.value), R.fillStyle = "#f8f9fa", R.fillRect(0, 0, Y, n.value), R.strokeStyle = "#dee2e6", R.fillStyle = "#495057", R.font = "10px Arial", R.textAlign = "center", R.textBaseline = "middle";
      const I = 10 * x, j = 50 * x, K = 100 * x;
      for (let nA = 0; nA <= Y; nA += I) {
        const iA = nA % j === 0, cA = nA % K === 0;
        if (R.beginPath(), R.moveTo(nA, n.value), R.lineTo(nA, n.value - (iA ? 8 : 4)), R.stroke(), cA && nA > 0) {
          const oA = Math.round(nA / x);
          R.fillText(oA.toString(), nA, n.value / 2 - 2);
        }
      }
      R.beginPath(), R.moveTo(0, n.value - 0.5), R.lineTo(Y, n.value - 0.5), R.stroke();
    }, w = () => {
      const D = r.value;
      if (!D) return;
      const R = D.getContext("2d"), { canvasHeight: Y, zoom: x } = e;
      R.clearRect(0, 0, n.value, Y), R.fillStyle = "#f8f9fa", R.fillRect(0, 0, n.value, Y), R.strokeStyle = "#dee2e6", R.fillStyle = "#495057", R.font = "10px Arial", R.textAlign = "center", R.textBaseline = "middle";
      const I = 10 * x, j = 50 * x, K = 100 * x;
      for (let nA = 0; nA <= Y; nA += I) {
        const iA = nA % j === 0, cA = nA % K === 0;
        if (R.beginPath(), R.moveTo(n.value, nA), R.lineTo(n.value - (iA ? 8 : 4), nA), R.stroke(), cA && nA > 0) {
          const oA = Math.round(nA / x);
          R.save(), R.translate(n.value / 2 - 2, nA), R.rotate(-Math.PI / 2), R.fillText(oA.toString(), 0, 0), R.restore();
        }
      }
      R.beginPath(), R.moveTo(n.value - 0.5, 0), R.lineTo(n.value - 0.5, Y), R.stroke();
    }, d = (D) => {
      if (f.value) return;
      const R = D.currentTarget.getBoundingClientRect(), Y = D.clientX - R.left + e.scrollLeft;
      l.value = Y;
    }, C = (D) => {
      if (f.value) return;
      const R = D.currentTarget.getBoundingClientRect(), Y = D.clientY - R.top + e.scrollTop;
      s.value = Y;
    }, b = () => {
      f.value || (l.value = null);
    }, _ = () => {
      f.value || (s.value = null);
    }, m = (D) => {
      const R = D.currentTarget.getBoundingClientRect(), Y = D.clientX - R.left + e.scrollLeft;
      i.value.includes(Y) || (i.value.push(Y), q()), l.value = null;
    }, y = (D) => {
      const R = D.currentTarget.getBoundingClientRect(), Y = D.clientY - R.top + e.scrollTop;
      a.value.includes(Y) || (a.value.push(Y), q()), s.value = null;
    }, H = (D, R) => {
      f.value = !0, g.value = { type: "vertical", position: D };
      const Y = (I) => {
        const j = t.value.getBoundingClientRect(), K = I.clientX - j.left + e.scrollLeft, nA = i.value.indexOf(D);
        nA > -1 && (i.value[nA] = K), g.value.position = K;
      }, x = () => {
        f.value = !1, g.value = null, document.removeEventListener("mousemove", Y), document.removeEventListener("mouseup", x), q();
      };
      document.addEventListener("mousemove", Y), document.addEventListener("mouseup", x), R.preventDefault();
    }, O = (D, R) => {
      f.value = !0, g.value = { type: "horizontal", position: D };
      const Y = (I) => {
        const j = r.value.getBoundingClientRect(), K = I.clientY - j.top + e.scrollTop, nA = a.value.indexOf(D);
        nA > -1 && (a.value[nA] = K), g.value.position = K;
      }, x = () => {
        f.value = !1, g.value = null, document.removeEventListener("mousemove", Y), document.removeEventListener("mouseup", x), q();
      };
      document.addEventListener("mousemove", Y), document.addEventListener("mouseup", x), R.preventDefault();
    }, P = () => {
      i.value = [], a.value = [], q();
    }, q = () => {
      A("guide-lines-changed", {
        vertical: [...i.value],
        horizontal: [...a.value]
      });
    }, W = () => {
      pa(() => {
        p(), w();
      });
    };
    return Nf(() => {
      W();
    }), Rl(() => [e.canvasWidth, e.canvasHeight, e.zoom, e.scrollLeft, e.scrollTop], () => {
      W();
    }), {
      horizontalRulerRef: t,
      verticalRulerRef: r,
      rulerSize: n,
      verticalGuideLines: i,
      horizontalGuideLines: a,
      tempVerticalGuide: l,
      tempHorizontalGuide: s,
      handleHorizontalRulerMove: d,
      handleVerticalRulerMove: C,
      hideVerticalGuideLine: b,
      hideHorizontalGuideLine: _,
      addVerticalGuideLine: m,
      addHorizontalGuideLine: y,
      startDragVerticalGuide: H,
      startDragHorizontalGuide: O,
      clearAllGuides: P
    };
  }
}, FC = { class: "sketch-ruler" }, QC = ["width", "height"], UC = ["onMousedown"], EC = ["width", "height"], xC = ["onMousedown"];
function LC(e, A, t, r, n, i) {
  return IA(), _A("div", FC, [
    T("div", {
      class: "ruler horizontal-ruler",
      style: Be({
        width: `${t.canvasWidth}px`,
        left: `${r.rulerSize}px`,
        transform: `translateX(${-t.scrollLeft}px)`
      })
    }, [
      T("canvas", {
        ref: "horizontalRulerRef",
        width: t.canvasWidth,
        height: r.rulerSize,
        onMousemove: A[0] || (A[0] = (...a) => r.handleHorizontalRulerMove && r.handleHorizontalRulerMove(...a)),
        onMouseleave: A[1] || (A[1] = (...a) => r.hideVerticalGuideLine && r.hideVerticalGuideLine(...a)),
        onClick: A[2] || (A[2] = (...a) => r.addVerticalGuideLine && r.addVerticalGuideLine(...a))
      }, null, 40, QC),
      (IA(!0), _A(Nt, null, dr(r.verticalGuideLines, (a) => (IA(), _A("div", {
        key: `v-${a}`,
        class: "guide-line vertical-guide",
        style: Be({ left: `${a}px` }),
        onMousedown: (l) => r.startDragVerticalGuide(a, l)
      }, null, 44, UC))), 128)),
      r.tempVerticalGuide !== null ? (IA(), _A("div", {
        key: 0,
        class: "guide-line vertical-guide temp",
        style: Be({ left: `${r.tempVerticalGuide}px` })
      }, null, 4)) : de("", !0)
    ], 4),
    T("div", {
      class: "ruler vertical-ruler",
      style: Be({
        height: `${t.canvasHeight}px`,
        top: `${r.rulerSize}px`,
        transform: `translateY(${-t.scrollTop}px)`
      })
    }, [
      T("canvas", {
        ref: "verticalRulerRef",
        width: r.rulerSize,
        height: t.canvasHeight,
        onMousemove: A[3] || (A[3] = (...a) => r.handleVerticalRulerMove && r.handleVerticalRulerMove(...a)),
        onMouseleave: A[4] || (A[4] = (...a) => r.hideHorizontalGuideLine && r.hideHorizontalGuideLine(...a)),
        onClick: A[5] || (A[5] = (...a) => r.addHorizontalGuideLine && r.addHorizontalGuideLine(...a))
      }, null, 40, EC),
      (IA(!0), _A(Nt, null, dr(r.horizontalGuideLines, (a) => (IA(), _A("div", {
        key: `h-${a}`,
        class: "guide-line horizontal-guide",
        style: Be({ top: `${a}px` }),
        onMousedown: (l) => r.startDragHorizontalGuide(a, l)
      }, null, 44, xC))), 128)),
      r.tempHorizontalGuide !== null ? (IA(), _A("div", {
        key: 0,
        class: "guide-line horizontal-guide temp",
        style: Be({ top: `${r.tempHorizontalGuide}px` })
      }, null, 4)) : de("", !0)
    ], 4),
    T("div", {
      class: "ruler-corner",
      style: Be({ width: `${r.rulerSize}px`, height: `${r.rulerSize}px` })
    }, [
      T("button", {
        class: "btn btn-sm btn-outline-secondary",
        onClick: A[6] || (A[6] = (...a) => r.clearAllGuides && r.clearAllGuides(...a)),
        title: "Clear all guides"
      }, A[7] || (A[7] = [
        T("i", { class: "bi bi-x" }, null, -1)
      ]))
    ], 4)
  ]);
}
const SC = /* @__PURE__ */ vi(CC, [["render", LC], ["__scopeId", "data-v-4a94c424"]]);
var _x = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function IC(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gf = {}, eu = {}, Ht = {};
Object.defineProperty(Ht, "__esModule", {
  value: !0
});
function _C(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
var NC = function e(A, t) {
  _C(this, e), this.data = A, this.text = t.text || A, this.options = t;
};
Ht.default = NC;
Object.defineProperty(eu, "__esModule", {
  value: !0
});
eu.CODE39 = void 0;
var HC = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), OC = Ht, DC = TC(OC);
function TC(e) {
  return e && e.__esModule ? e : { default: e };
}
function kC(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function PC(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function MC(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var RC = function(e) {
  MC(A, e);
  function A(t, r) {
    return kC(this, A), t = t.toUpperCase(), r.mod43 && (t += GC(VC(t))), PC(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return HC(A, [{
    key: "encode",
    value: function() {
      for (var r = Hc("*"), n = 0; n < this.data.length; n++)
        r += Hc(this.data[n]) + "0";
      return r += Hc("*"), {
        data: r,
        text: this.text
      };
    }
  }, {
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
    }
  }]), A;
}(DC.default), dg = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"], KC = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
function Hc(e) {
  return jC(gg(e));
}
function jC(e) {
  return KC[e].toString(2);
}
function GC(e) {
  return dg[e];
}
function gg(e) {
  return dg.indexOf(e);
}
function VC(e) {
  for (var A = 0, t = 0; t < e.length; t++)
    A += gg(e[t]);
  return A = A % 43, A;
}
eu.CODE39 = RC;
var Wr = {}, Vf = {}, Ia = {}, Oe = {};
Object.defineProperty(Oe, "__esModule", {
  value: !0
});
var wo;
function Oc(e, A, t) {
  return A in e ? Object.defineProperty(e, A, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[A] = t, e;
}
var pg = Oe.SET_A = 0, Bg = Oe.SET_B = 1, wg = Oe.SET_C = 2;
Oe.SHIFT = 98;
var zC = Oe.START_A = 103, qC = Oe.START_B = 104, WC = Oe.START_C = 105;
Oe.MODULO = 103;
Oe.STOP = 106;
Oe.FNC1 = 207;
Oe.SET_BY_CODE = (wo = {}, Oc(wo, zC, pg), Oc(wo, qC, Bg), Oc(wo, WC, wg), wo);
Oe.SWAP = {
  101: pg,
  100: Bg,
  99: wg
};
Oe.A_START_CHAR = "Ð";
Oe.B_START_CHAR = "Ñ";
Oe.C_START_CHAR = "Ò";
Oe.A_CHARS = "[\0-_È-Ï]";
Oe.B_CHARS = "[ -È-Ï]";
Oe.C_CHARS = "(Ï*[0-9]{2}Ï*)";
Oe.BARS = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011];
Object.defineProperty(Ia, "__esModule", {
  value: !0
});
var XC = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), $C = Ht, JC = YC($C), Xt = Oe;
function YC(e) {
  return e && e.__esModule ? e : { default: e };
}
function ZC(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function A4(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function e4(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var t4 = function(e) {
  e4(A, e);
  function A(t, r) {
    ZC(this, A);
    var n = A4(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t.substring(1), r));
    return n.bytes = t.split("").map(function(i) {
      return i.charCodeAt(0);
    }), n;
  }
  return XC(A, [{
    key: "valid",
    value: function() {
      return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
    }
    // The public encoding function
  }, {
    key: "encode",
    value: function() {
      var r = this.bytes, n = r.shift() - 105, i = Xt.SET_BY_CODE[n];
      if (i === void 0)
        throw new RangeError("The encoding does not start with a start character.");
      this.shouldEncodeAsEan128() === !0 && r.unshift(Xt.FNC1);
      var a = A.next(r, 1, i);
      return {
        text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
        data: (
          // Add the start bits
          A.getBar(n) + // Add the encoded bits
          a.result + // Add the checksum
          A.getBar((a.checksum + n) % Xt.MODULO) + // Add the end bits
          A.getBar(Xt.STOP)
        )
      };
    }
    // GS1-128/EAN-128
  }, {
    key: "shouldEncodeAsEan128",
    value: function() {
      var r = this.options.ean128 || !1;
      return typeof r == "string" && (r = r.toLowerCase() === "true"), r;
    }
    // Get a bar symbol by index
  }], [{
    key: "getBar",
    value: function(r) {
      return Xt.BARS[r] ? Xt.BARS[r].toString() : "";
    }
    // Correct an index by a set and shift it from the bytes array
  }, {
    key: "correctIndex",
    value: function(r, n) {
      if (n === Xt.SET_A) {
        var i = r.shift();
        return i < 32 ? i + 64 : i - 32;
      } else return n === Xt.SET_B ? r.shift() - 32 : (r.shift() - 48) * 10 + r.shift() - 48;
    }
  }, {
    key: "next",
    value: function(r, n, i) {
      if (!r.length)
        return { result: "", checksum: 0 };
      var a = void 0, l = void 0;
      if (r[0] >= 200) {
        l = r.shift() - 105;
        var s = Xt.SWAP[l];
        s !== void 0 ? a = A.next(r, n + 1, s) : ((i === Xt.SET_A || i === Xt.SET_B) && l === Xt.SHIFT && (r[0] = i === Xt.SET_A ? r[0] > 95 ? r[0] - 96 : r[0] : r[0] < 32 ? r[0] + 96 : r[0]), a = A.next(r, n + 1, i));
      } else
        l = A.correctIndex(r, i), a = A.next(r, n + 1, i);
      var f = A.getBar(l), g = l * n;
      return {
        result: f + a.result,
        checksum: g + a.checksum
      };
    }
  }]), A;
}(JC.default);
Ia.default = t4;
var zf = {};
Object.defineProperty(zf, "__esModule", {
  value: !0
});
var Vn = Oe, vg = function(A) {
  return A.match(new RegExp("^" + Vn.A_CHARS + "*"))[0].length;
}, mg = function(A) {
  return A.match(new RegExp("^" + Vn.B_CHARS + "*"))[0].length;
}, yg = function(A) {
  return A.match(new RegExp("^" + Vn.C_CHARS + "*"))[0];
};
function qf(e, A) {
  var t = A ? Vn.A_CHARS : Vn.B_CHARS, r = e.match(new RegExp("^(" + t + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
  if (r)
    return r[1] + "Ì" + bg(e.substring(r[1].length));
  var n = e.match(new RegExp("^" + t + "+"))[0];
  return n.length === e.length ? e : n + String.fromCharCode(A ? 205 : 206) + qf(e.substring(n.length), !A);
}
function bg(e) {
  var A = yg(e), t = A.length;
  if (t === e.length)
    return e;
  e = e.substring(t);
  var r = vg(e) >= mg(e);
  return A + String.fromCharCode(r ? 206 : 205) + qf(e, r);
}
zf.default = function(e) {
  var A = void 0, t = yg(e).length;
  if (t >= 2)
    A = Vn.C_START_CHAR + bg(e);
  else {
    var r = vg(e) > mg(e);
    A = (r ? Vn.A_START_CHAR : Vn.B_START_CHAR) + qf(e, r);
  }
  return A.replace(
    /[\xCD\xCE]([^])[\xCD\xCE]/,
    // Any sequence between 205 and 206 characters
    function(n, i) {
      return "Ë" + i;
    }
  );
};
Object.defineProperty(Vf, "__esModule", {
  value: !0
});
var r4 = Ia, n4 = Cg(r4), i4 = zf, a4 = Cg(i4);
function Cg(e) {
  return e && e.__esModule ? e : { default: e };
}
function o4(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function Dc(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function s4(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var l4 = function(e) {
  s4(A, e);
  function A(t, r) {
    if (o4(this, A), /^[\x00-\x7F\xC8-\xD3]+$/.test(t))
      var n = Dc(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, (0, a4.default)(t), r));
    else
      var n = Dc(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
    return Dc(n);
  }
  return A;
}(n4.default);
Vf.default = l4;
var Wf = {};
Object.defineProperty(Wf, "__esModule", {
  value: !0
});
var u4 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), c4 = Ia, f4 = h4(c4), md = Oe;
function h4(e) {
  return e && e.__esModule ? e : { default: e };
}
function d4(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function g4(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function p4(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var B4 = function(e) {
  p4(A, e);
  function A(t, r) {
    return d4(this, A), g4(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, md.A_START_CHAR + t, r));
  }
  return u4(A, [{
    key: "valid",
    value: function() {
      return new RegExp("^" + md.A_CHARS + "+$").test(this.data);
    }
  }]), A;
}(f4.default);
Wf.default = B4;
var Xf = {};
Object.defineProperty(Xf, "__esModule", {
  value: !0
});
var w4 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), v4 = Ia, m4 = y4(v4), yd = Oe;
function y4(e) {
  return e && e.__esModule ? e : { default: e };
}
function b4(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function C4(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function F4(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var Q4 = function(e) {
  F4(A, e);
  function A(t, r) {
    return b4(this, A), C4(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, yd.B_START_CHAR + t, r));
  }
  return w4(A, [{
    key: "valid",
    value: function() {
      return new RegExp("^" + yd.B_CHARS + "+$").test(this.data);
    }
  }]), A;
}(m4.default);
Xf.default = Q4;
var $f = {};
Object.defineProperty($f, "__esModule", {
  value: !0
});
var U4 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), E4 = Ia, x4 = L4(E4), bd = Oe;
function L4(e) {
  return e && e.__esModule ? e : { default: e };
}
function S4(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function I4(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function _4(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var N4 = function(e) {
  _4(A, e);
  function A(t, r) {
    return S4(this, A), I4(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, bd.C_START_CHAR + t, r));
  }
  return U4(A, [{
    key: "valid",
    value: function() {
      return new RegExp("^" + bd.C_CHARS + "+$").test(this.data);
    }
  }]), A;
}(x4.default);
$f.default = N4;
Object.defineProperty(Wr, "__esModule", {
  value: !0
});
Wr.CODE128C = Wr.CODE128B = Wr.CODE128A = Wr.CODE128 = void 0;
var H4 = Vf, O4 = tu(H4), D4 = Wf, T4 = tu(D4), k4 = Xf, P4 = tu(k4), M4 = $f, R4 = tu(M4);
function tu(e) {
  return e && e.__esModule ? e : { default: e };
}
Wr.CODE128 = O4.default;
Wr.CODE128A = T4.default;
Wr.CODE128B = P4.default;
Wr.CODE128C = R4.default;
var Kt = {}, Jf = {}, gr = {};
Object.defineProperty(gr, "__esModule", {
  value: !0
});
gr.SIDE_BIN = "101";
gr.MIDDLE_BIN = "01010";
gr.BINARIES = {
  L: [
    // The L (left) type of encoding
    "0001101",
    "0011001",
    "0010011",
    "0111101",
    "0100011",
    "0110001",
    "0101111",
    "0111011",
    "0110111",
    "0001011"
  ],
  G: [
    // The G type of encoding
    "0100111",
    "0110011",
    "0011011",
    "0100001",
    "0011101",
    "0111001",
    "0000101",
    "0010001",
    "0001001",
    "0010111"
  ],
  R: [
    // The R (right) type of encoding
    "1110010",
    "1100110",
    "1101100",
    "1000010",
    "1011100",
    "1001110",
    "1010000",
    "1000100",
    "1001000",
    "1110100"
  ],
  O: [
    // The O (odd) encoding for UPC-E
    "0001101",
    "0011001",
    "0010011",
    "0111101",
    "0100011",
    "0110001",
    "0101111",
    "0111011",
    "0110111",
    "0001011"
  ],
  E: [
    // The E (even) encoding for UPC-E
    "0100111",
    "0110011",
    "0011011",
    "0100001",
    "0011101",
    "0111001",
    "0000101",
    "0010001",
    "0001001",
    "0010111"
  ]
};
gr.EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"];
gr.EAN5_STRUCTURE = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
gr.EAN13_STRUCTURE = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
var ru = {}, yi = {};
Object.defineProperty(yi, "__esModule", {
  value: !0
});
var K4 = gr, j4 = function(A, t, r) {
  var n = A.split("").map(function(a, l) {
    return K4.BINARIES[t[l]];
  }).map(function(a, l) {
    return a ? a[A[l]] : "";
  });
  if (r) {
    var i = A.length - 1;
    n = n.map(function(a, l) {
      return l < i ? a + r : a;
    });
  }
  return n.join("");
};
yi.default = j4;
Object.defineProperty(ru, "__esModule", {
  value: !0
});
var G4 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), oa = gr, V4 = yi, Cd = Fg(V4), z4 = Ht, q4 = Fg(z4);
function Fg(e) {
  return e && e.__esModule ? e : { default: e };
}
function W4(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function X4(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function $4(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var J4 = function(e) {
  $4(A, e);
  function A(t, r) {
    W4(this, A);
    var n = X4(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
    return n.fontSize = !r.flat && r.fontSize > r.width * 10 ? r.width * 10 : r.fontSize, n.guardHeight = r.height + n.fontSize / 2 + r.textMargin, n;
  }
  return G4(A, [{
    key: "encode",
    value: function() {
      return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
    }
  }, {
    key: "leftText",
    value: function(r, n) {
      return this.text.substr(r, n);
    }
  }, {
    key: "leftEncode",
    value: function(r, n) {
      return (0, Cd.default)(r, n);
    }
  }, {
    key: "rightText",
    value: function(r, n) {
      return this.text.substr(r, n);
    }
  }, {
    key: "rightEncode",
    value: function(r, n) {
      return (0, Cd.default)(r, n);
    }
  }, {
    key: "encodeGuarded",
    value: function() {
      var r = { fontSize: this.fontSize }, n = { height: this.guardHeight };
      return [{ data: oa.SIDE_BIN, options: n }, { data: this.leftEncode(), text: this.leftText(), options: r }, { data: oa.MIDDLE_BIN, options: n }, { data: this.rightEncode(), text: this.rightText(), options: r }, { data: oa.SIDE_BIN, options: n }];
    }
  }, {
    key: "encodeFlat",
    value: function() {
      var r = [oa.SIDE_BIN, this.leftEncode(), oa.MIDDLE_BIN, this.rightEncode(), oa.SIDE_BIN];
      return {
        data: r.join(""),
        text: this.text
      };
    }
  }]), A;
}(q4.default);
ru.default = J4;
Object.defineProperty(Jf, "__esModule", {
  value: !0
});
var Y4 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), vo = function e(A, t, r) {
  A === null && (A = Function.prototype);
  var n = Object.getOwnPropertyDescriptor(A, t);
  if (n === void 0) {
    var i = Object.getPrototypeOf(A);
    return i === null ? void 0 : e(i, t, r);
  } else {
    if ("value" in n)
      return n.value;
    var a = n.get;
    return a === void 0 ? void 0 : a.call(r);
  }
}, Z4 = gr, AF = ru, eF = tF(AF);
function tF(e) {
  return e && e.__esModule ? e : { default: e };
}
function rF(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function nF(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function iF(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var Fd = function(A) {
  var t = A.substr(0, 12).split("").map(function(r) {
    return +r;
  }).reduce(function(r, n, i) {
    return i % 2 ? r + n * 3 : r + n;
  }, 0);
  return (10 - t % 10) % 10;
}, aF = function(e) {
  iF(A, e);
  function A(t, r) {
    rF(this, A), t.search(/^[0-9]{12}$/) !== -1 && (t += Fd(t));
    var n = nF(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
    return n.lastChar = r.lastChar, n;
  }
  return Y4(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === Fd(this.data);
    }
  }, {
    key: "leftText",
    value: function() {
      return vo(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "leftText", this).call(this, 1, 6);
    }
  }, {
    key: "leftEncode",
    value: function() {
      var r = this.data.substr(1, 6), n = Z4.EAN13_STRUCTURE[this.data[0]];
      return vo(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "leftEncode", this).call(this, r, n);
    }
  }, {
    key: "rightText",
    value: function() {
      return vo(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "rightText", this).call(this, 7, 6);
    }
  }, {
    key: "rightEncode",
    value: function() {
      var r = this.data.substr(7, 6);
      return vo(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "rightEncode", this).call(this, r, "RRRRRR");
    }
    // The "standard" way of printing EAN13 barcodes with guard bars
  }, {
    key: "encodeGuarded",
    value: function() {
      var r = vo(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "encodeGuarded", this).call(this);
      return this.options.displayValue && (r.unshift({
        data: "000000000000",
        text: this.text.substr(0, 1),
        options: { textAlign: "left", fontSize: this.fontSize }
      }), this.options.lastChar && (r.push({
        data: "00"
      }), r.push({
        data: "00000",
        text: this.options.lastChar,
        options: { fontSize: this.fontSize }
      }))), r;
    }
  }]), A;
}(eF.default);
Jf.default = aF;
var Yf = {};
Object.defineProperty(Yf, "__esModule", {
  value: !0
});
var oF = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), fl = function e(A, t, r) {
  A === null && (A = Function.prototype);
  var n = Object.getOwnPropertyDescriptor(A, t);
  if (n === void 0) {
    var i = Object.getPrototypeOf(A);
    return i === null ? void 0 : e(i, t, r);
  } else {
    if ("value" in n)
      return n.value;
    var a = n.get;
    return a === void 0 ? void 0 : a.call(r);
  }
}, sF = ru, lF = uF(sF);
function uF(e) {
  return e && e.__esModule ? e : { default: e };
}
function cF(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function fF(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function hF(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var Qd = function(A) {
  var t = A.substr(0, 7).split("").map(function(r) {
    return +r;
  }).reduce(function(r, n, i) {
    return i % 2 ? r + n : r + n * 3;
  }, 0);
  return (10 - t % 10) % 10;
}, dF = function(e) {
  hF(A, e);
  function A(t, r) {
    return cF(this, A), t.search(/^[0-9]{7}$/) !== -1 && (t += Qd(t)), fF(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return oF(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === Qd(this.data);
    }
  }, {
    key: "leftText",
    value: function() {
      return fl(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "leftText", this).call(this, 0, 4);
    }
  }, {
    key: "leftEncode",
    value: function() {
      var r = this.data.substr(0, 4);
      return fl(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "leftEncode", this).call(this, r, "LLLL");
    }
  }, {
    key: "rightText",
    value: function() {
      return fl(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "rightText", this).call(this, 4, 4);
    }
  }, {
    key: "rightEncode",
    value: function() {
      var r = this.data.substr(4, 4);
      return fl(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "rightEncode", this).call(this, r, "RRRR");
    }
  }]), A;
}(lF.default);
Yf.default = dF;
var Zf = {};
Object.defineProperty(Zf, "__esModule", {
  value: !0
});
var gF = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), pF = gr, BF = yi, wF = Qg(BF), vF = Ht, mF = Qg(vF);
function Qg(e) {
  return e && e.__esModule ? e : { default: e };
}
function yF(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function bF(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function CF(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var FF = function(A) {
  var t = A.split("").map(function(r) {
    return +r;
  }).reduce(function(r, n, i) {
    return i % 2 ? r + n * 9 : r + n * 3;
  }, 0);
  return t % 10;
}, QF = function(e) {
  CF(A, e);
  function A(t, r) {
    return yF(this, A), bF(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return gF(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]{5}$/) !== -1;
    }
  }, {
    key: "encode",
    value: function() {
      var r = pF.EAN5_STRUCTURE[FF(this.data)];
      return {
        data: "1011" + (0, wF.default)(this.data, r, "01"),
        text: this.text
      };
    }
  }]), A;
}(mF.default);
Zf.default = QF;
var Ah = {};
Object.defineProperty(Ah, "__esModule", {
  value: !0
});
var UF = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), EF = gr, xF = yi, LF = Ug(xF), SF = Ht, IF = Ug(SF);
function Ug(e) {
  return e && e.__esModule ? e : { default: e };
}
function _F(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function NF(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function HF(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var OF = function(e) {
  HF(A, e);
  function A(t, r) {
    return _F(this, A), NF(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return UF(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]{2}$/) !== -1;
    }
  }, {
    key: "encode",
    value: function() {
      var r = EF.EAN2_STRUCTURE[parseInt(this.data) % 4];
      return {
        // Start bits + Encode the two digits with 01 in between
        data: "1011" + (0, LF.default)(this.data, r, "01"),
        text: this.text
      };
    }
  }]), A;
}(IF.default);
Ah.default = OF;
var jo = {};
Object.defineProperty(jo, "__esModule", {
  value: !0
});
var DF = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}();
jo.checksum = Uf;
var TF = yi, sa = Eg(TF), kF = Ht, PF = Eg(kF);
function Eg(e) {
  return e && e.__esModule ? e : { default: e };
}
function MF(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function RF(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function KF(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var jF = function(e) {
  KF(A, e);
  function A(t, r) {
    MF(this, A), t.search(/^[0-9]{11}$/) !== -1 && (t += Uf(t));
    var n = RF(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
    return n.displayValue = r.displayValue, r.fontSize > r.width * 10 ? n.fontSize = r.width * 10 : n.fontSize = r.fontSize, n.guardHeight = r.height + n.fontSize / 2 + r.textMargin, n;
  }
  return DF(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == Uf(this.data);
    }
  }, {
    key: "encode",
    value: function() {
      return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
    }
  }, {
    key: "flatEncoding",
    value: function() {
      var r = "";
      return r += "101", r += (0, sa.default)(this.data.substr(0, 6), "LLLLLL"), r += "01010", r += (0, sa.default)(this.data.substr(6, 6), "RRRRRR"), r += "101", {
        data: r,
        text: this.text
      };
    }
  }, {
    key: "guardedEncoding",
    value: function() {
      var r = [];
      return this.displayValue && r.push({
        data: "00000000",
        text: this.text.substr(0, 1),
        options: { textAlign: "left", fontSize: this.fontSize }
      }), r.push({
        data: "101" + (0, sa.default)(this.data[0], "L"),
        options: { height: this.guardHeight }
      }), r.push({
        data: (0, sa.default)(this.data.substr(1, 5), "LLLLL"),
        text: this.text.substr(1, 5),
        options: { fontSize: this.fontSize }
      }), r.push({
        data: "01010",
        options: { height: this.guardHeight }
      }), r.push({
        data: (0, sa.default)(this.data.substr(6, 5), "RRRRR"),
        text: this.text.substr(6, 5),
        options: { fontSize: this.fontSize }
      }), r.push({
        data: (0, sa.default)(this.data[11], "R") + "101",
        options: { height: this.guardHeight }
      }), this.displayValue && r.push({
        data: "00000000",
        text: this.text.substr(11, 1),
        options: { textAlign: "right", fontSize: this.fontSize }
      }), r;
    }
  }]), A;
}(PF.default);
function Uf(e) {
  var A = 0, t;
  for (t = 1; t < 11; t += 2)
    A += parseInt(e[t]);
  for (t = 0; t < 11; t += 2)
    A += parseInt(e[t]) * 3;
  return (10 - A % 10) % 10;
}
jo.default = jF;
var eh = {};
Object.defineProperty(eh, "__esModule", {
  value: !0
});
var GF = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), VF = yi, zF = xg(VF), qF = Ht, WF = xg(qF), XF = jo;
function xg(e) {
  return e && e.__esModule ? e : { default: e };
}
function $F(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function Tc(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function JF(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var YF = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"], ZF = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]], A3 = function(e) {
  JF(A, e);
  function A(t, r) {
    $F(this, A);
    var n = Tc(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
    if (n.isValid = !1, t.search(/^[0-9]{6}$/) !== -1)
      n.middleDigits = t, n.upcA = Ud(t, "0"), n.text = r.text || "" + n.upcA[0] + t + n.upcA[n.upcA.length - 1], n.isValid = !0;
    else if (t.search(/^[01][0-9]{7}$/) !== -1)
      if (n.middleDigits = t.substring(1, t.length - 1), n.upcA = Ud(n.middleDigits, t[0]), n.upcA[n.upcA.length - 1] === t[t.length - 1])
        n.isValid = !0;
      else
        return Tc(n);
    else
      return Tc(n);
    return n.displayValue = r.displayValue, r.fontSize > r.width * 10 ? n.fontSize = r.width * 10 : n.fontSize = r.fontSize, n.guardHeight = r.height + n.fontSize / 2 + r.textMargin, n;
  }
  return GF(A, [{
    key: "valid",
    value: function() {
      return this.isValid;
    }
  }, {
    key: "encode",
    value: function() {
      return this.options.flat ? this.flatEncoding() : this.guardedEncoding();
    }
  }, {
    key: "flatEncoding",
    value: function() {
      var r = "";
      return r += "101", r += this.encodeMiddleDigits(), r += "010101", {
        data: r,
        text: this.text
      };
    }
  }, {
    key: "guardedEncoding",
    value: function() {
      var r = [];
      return this.displayValue && r.push({
        data: "00000000",
        text: this.text[0],
        options: { textAlign: "left", fontSize: this.fontSize }
      }), r.push({
        data: "101",
        options: { height: this.guardHeight }
      }), r.push({
        data: this.encodeMiddleDigits(),
        text: this.text.substring(1, 7),
        options: { fontSize: this.fontSize }
      }), r.push({
        data: "010101",
        options: { height: this.guardHeight }
      }), this.displayValue && r.push({
        data: "00000000",
        text: this.text[7],
        options: { textAlign: "right", fontSize: this.fontSize }
      }), r;
    }
  }, {
    key: "encodeMiddleDigits",
    value: function() {
      var r = this.upcA[0], n = this.upcA[this.upcA.length - 1], i = ZF[parseInt(n)][parseInt(r)];
      return (0, zF.default)(this.middleDigits, i);
    }
  }]), A;
}(WF.default);
function Ud(e, A) {
  for (var t = parseInt(e[e.length - 1]), r = YF[t], n = "", i = 0, a = 0; a < r.length; a++) {
    var l = r[a];
    l === "X" ? n += e[i++] : n += l;
  }
  return n = "" + A + n, "" + n + (0, XF.checksum)(n);
}
eh.default = A3;
Object.defineProperty(Kt, "__esModule", {
  value: !0
});
Kt.UPCE = Kt.UPC = Kt.EAN2 = Kt.EAN5 = Kt.EAN8 = Kt.EAN13 = void 0;
var e3 = Jf, t3 = _a(e3), r3 = Yf, n3 = _a(r3), i3 = Zf, a3 = _a(i3), o3 = Ah, s3 = _a(o3), l3 = jo, u3 = _a(l3), c3 = eh, f3 = _a(c3);
function _a(e) {
  return e && e.__esModule ? e : { default: e };
}
Kt.EAN13 = t3.default;
Kt.EAN8 = n3.default;
Kt.EAN5 = a3.default;
Kt.EAN2 = s3.default;
Kt.UPC = u3.default;
Kt.UPCE = f3.default;
var Ca = {}, nu = {}, Go = {};
Object.defineProperty(Go, "__esModule", {
  value: !0
});
Go.START_BIN = "1010";
Go.END_BIN = "11101";
Go.BINARIES = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"];
Object.defineProperty(nu, "__esModule", {
  value: !0
});
var h3 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), hl = Go, d3 = Ht, g3 = p3(d3);
function p3(e) {
  return e && e.__esModule ? e : { default: e };
}
function B3(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function w3(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function v3(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var m3 = function(e) {
  v3(A, e);
  function A() {
    return B3(this, A), w3(this, (A.__proto__ || Object.getPrototypeOf(A)).apply(this, arguments));
  }
  return h3(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^([0-9]{2})+$/) !== -1;
    }
  }, {
    key: "encode",
    value: function() {
      var r = this, n = this.data.match(/.{2}/g).map(function(i) {
        return r.encodePair(i);
      }).join("");
      return {
        data: hl.START_BIN + n + hl.END_BIN,
        text: this.text
      };
    }
    // Calculate the data of a number pair
  }, {
    key: "encodePair",
    value: function(r) {
      var n = hl.BINARIES[r[1]];
      return hl.BINARIES[r[0]].split("").map(function(i, a) {
        return (i === "1" ? "111" : "1") + (n[a] === "1" ? "000" : "0");
      }).join("");
    }
  }]), A;
}(g3.default);
nu.default = m3;
var th = {};
Object.defineProperty(th, "__esModule", {
  value: !0
});
var y3 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), b3 = nu, C3 = F3(b3);
function F3(e) {
  return e && e.__esModule ? e : { default: e };
}
function Q3(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function U3(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function E3(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var Ed = function(A) {
  var t = A.substr(0, 13).split("").map(function(r) {
    return parseInt(r, 10);
  }).reduce(function(r, n, i) {
    return r + n * (3 - i % 2 * 2);
  }, 0);
  return Math.ceil(t / 10) * 10 - t;
}, x3 = function(e) {
  E3(A, e);
  function A(t, r) {
    return Q3(this, A), t.search(/^[0-9]{13}$/) !== -1 && (t += Ed(t)), U3(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return y3(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === Ed(this.data);
    }
  }]), A;
}(C3.default);
th.default = x3;
Object.defineProperty(Ca, "__esModule", {
  value: !0
});
Ca.ITF14 = Ca.ITF = void 0;
var L3 = nu, S3 = Lg(L3), I3 = th, _3 = Lg(I3);
function Lg(e) {
  return e && e.__esModule ? e : { default: e };
}
Ca.ITF = S3.default;
Ca.ITF14 = _3.default;
var cr = {}, bi = {};
Object.defineProperty(bi, "__esModule", {
  value: !0
});
var N3 = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), H3 = Ht, O3 = D3(H3);
function D3(e) {
  return e && e.__esModule ? e : { default: e };
}
function T3(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function k3(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function P3(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var M3 = function(e) {
  P3(A, e);
  function A(t, r) {
    return T3(this, A), k3(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return N3(A, [{
    key: "encode",
    value: function() {
      for (var r = "110", n = 0; n < this.data.length; n++) {
        var i = parseInt(this.data[n]), a = i.toString(2);
        a = R3(a, 4 - a.length);
        for (var l = 0; l < a.length; l++)
          r += a[l] == "0" ? "100" : "110";
      }
      return r += "1001", {
        data: r,
        text: this.text
      };
    }
  }, {
    key: "valid",
    value: function() {
      return this.data.search(/^[0-9]+$/) !== -1;
    }
  }]), A;
}(O3.default);
function R3(e, A) {
  for (var t = 0; t < A; t++)
    e = "0" + e;
  return e;
}
bi.default = M3;
var rh = {}, Ci = {};
Object.defineProperty(Ci, "__esModule", {
  value: !0
});
Ci.mod10 = K3;
Ci.mod11 = j3;
function K3(e) {
  for (var A = 0, t = 0; t < e.length; t++) {
    var r = parseInt(e[t]);
    (t + e.length) % 2 === 0 ? A += r : A += r * 2 % 10 + Math.floor(r * 2 / 10);
  }
  return (10 - A % 10) % 10;
}
function j3(e) {
  for (var A = 0, t = [2, 3, 4, 5, 6, 7], r = 0; r < e.length; r++) {
    var n = parseInt(e[e.length - 1 - r]);
    A += t[r % t.length] * n;
  }
  return (11 - A % 11) % 11;
}
Object.defineProperty(rh, "__esModule", {
  value: !0
});
var G3 = bi, V3 = q3(G3), z3 = Ci;
function q3(e) {
  return e && e.__esModule ? e : { default: e };
}
function W3(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function X3(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function $3(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var J3 = function(e) {
  $3(A, e);
  function A(t, r) {
    return W3(this, A), X3(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t + (0, z3.mod10)(t), r));
  }
  return A;
}(V3.default);
rh.default = J3;
var nh = {};
Object.defineProperty(nh, "__esModule", {
  value: !0
});
var Y3 = bi, Z3 = eQ(Y3), AQ = Ci;
function eQ(e) {
  return e && e.__esModule ? e : { default: e };
}
function tQ(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function rQ(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function nQ(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var iQ = function(e) {
  nQ(A, e);
  function A(t, r) {
    return tQ(this, A), rQ(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t + (0, AQ.mod11)(t), r));
  }
  return A;
}(Z3.default);
nh.default = iQ;
var ih = {};
Object.defineProperty(ih, "__esModule", {
  value: !0
});
var aQ = bi, oQ = sQ(aQ), xd = Ci;
function sQ(e) {
  return e && e.__esModule ? e : { default: e };
}
function lQ(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function uQ(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function cQ(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var fQ = function(e) {
  cQ(A, e);
  function A(t, r) {
    return lQ(this, A), t += (0, xd.mod10)(t), t += (0, xd.mod10)(t), uQ(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return A;
}(oQ.default);
ih.default = fQ;
var ah = {};
Object.defineProperty(ah, "__esModule", {
  value: !0
});
var hQ = bi, dQ = gQ(hQ), Ld = Ci;
function gQ(e) {
  return e && e.__esModule ? e : { default: e };
}
function pQ(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function BQ(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function wQ(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var vQ = function(e) {
  wQ(A, e);
  function A(t, r) {
    return pQ(this, A), t += (0, Ld.mod11)(t), t += (0, Ld.mod10)(t), BQ(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return A;
}(dQ.default);
ah.default = vQ;
Object.defineProperty(cr, "__esModule", {
  value: !0
});
cr.MSI1110 = cr.MSI1010 = cr.MSI11 = cr.MSI10 = cr.MSI = void 0;
var mQ = bi, yQ = Vo(mQ), bQ = rh, CQ = Vo(bQ), FQ = nh, QQ = Vo(FQ), UQ = ih, EQ = Vo(UQ), xQ = ah, LQ = Vo(xQ);
function Vo(e) {
  return e && e.__esModule ? e : { default: e };
}
cr.MSI = yQ.default;
cr.MSI10 = CQ.default;
cr.MSI11 = QQ.default;
cr.MSI1010 = EQ.default;
cr.MSI1110 = LQ.default;
var iu = {};
Object.defineProperty(iu, "__esModule", {
  value: !0
});
iu.pharmacode = void 0;
var SQ = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), IQ = Ht, _Q = NQ(IQ);
function NQ(e) {
  return e && e.__esModule ? e : { default: e };
}
function HQ(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function OQ(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function DQ(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var TQ = function(e) {
  DQ(A, e);
  function A(t, r) {
    HQ(this, A);
    var n = OQ(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
    return n.number = parseInt(t, 10), n;
  }
  return SQ(A, [{
    key: "encode",
    value: function() {
      for (var r = this.number, n = ""; !isNaN(r) && r != 0; )
        r % 2 === 0 ? (n = "11100" + n, r = (r - 2) / 2) : (n = "100" + n, r = (r - 1) / 2);
      return n = n.slice(0, -2), {
        data: n,
        text: this.text
      };
    }
  }, {
    key: "valid",
    value: function() {
      return this.number >= 3 && this.number <= 131070;
    }
  }]), A;
}(_Q.default);
iu.pharmacode = TQ;
var au = {};
Object.defineProperty(au, "__esModule", {
  value: !0
});
au.codabar = void 0;
var kQ = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), PQ = Ht, MQ = RQ(PQ);
function RQ(e) {
  return e && e.__esModule ? e : { default: e };
}
function KQ(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function jQ(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function GQ(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var VQ = function(e) {
  GQ(A, e);
  function A(t, r) {
    KQ(this, A), t.search(/^[0-9\-\$\:\.\+\/]+$/) === 0 && (t = "A" + t + "A");
    var n = jQ(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t.toUpperCase(), r));
    return n.text = n.options.text || n.text.replace(/[A-D]/g, ""), n;
  }
  return kQ(A, [{
    key: "valid",
    value: function() {
      return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
    }
  }, {
    key: "encode",
    value: function() {
      for (var r = [], n = this.getEncodings(), i = 0; i < this.data.length; i++)
        r.push(n[this.data.charAt(i)]), i !== this.data.length - 1 && r.push("0");
      return {
        text: this.text,
        data: r.join("")
      };
    }
  }, {
    key: "getEncodings",
    value: function() {
      return {
        0: "101010011",
        1: "101011001",
        2: "101001011",
        3: "110010101",
        4: "101101001",
        5: "110101001",
        6: "100101011",
        7: "100101101",
        8: "100110101",
        9: "110100101",
        "-": "101001101",
        $: "101100101",
        ":": "1101011011",
        "/": "1101101011",
        ".": "1101101101",
        "+": "1011011011",
        A: "1011001001",
        B: "1001001011",
        C: "1010010011",
        D: "1010011001"
      };
    }
  }]), A;
}(MQ.default);
au.codabar = VQ;
var Fa = {}, ou = {}, zo = {};
Object.defineProperty(zo, "__esModule", {
  value: !0
});
zo.SYMBOLS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "-",
  ".",
  " ",
  "$",
  "/",
  "+",
  "%",
  // Only used for csum and multi-symbols character encodings
  "($)",
  "(%)",
  "(/)",
  "(+)",
  // Start/Stop
  "ÿ"
];
zo.BINARIES = ["100010100", "101001000", "101000100", "101000010", "100101000", "100100100", "100100010", "101010000", "100010010", "100001010", "110101000", "110100100", "110100010", "110010100", "110010010", "110001010", "101101000", "101100100", "101100010", "100110100", "100011010", "101011000", "101001100", "101000110", "100101100", "100010110", "110110100", "110110010", "110101100", "110100110", "110010110", "110011010", "101101100", "101100110", "100110110", "100111010", "100101110", "111010100", "111010010", "111001010", "101101110", "101110110", "110101110", "100100110", "111011010", "111010110", "100110010", "101011110"];
zo.MULTI_SYMBOLS = {
  "\0": ["(%)", "U"],
  "": ["($)", "A"],
  "": ["($)", "B"],
  "": ["($)", "C"],
  "": ["($)", "D"],
  "": ["($)", "E"],
  "": ["($)", "F"],
  "\x07": ["($)", "G"],
  "\b": ["($)", "H"],
  "	": ["($)", "I"],
  "\n": ["($)", "J"],
  "\v": ["($)", "K"],
  "\f": ["($)", "L"],
  "\r": ["($)", "M"],
  "": ["($)", "N"],
  "": ["($)", "O"],
  "": ["($)", "P"],
  "": ["($)", "Q"],
  "": ["($)", "R"],
  "": ["($)", "S"],
  "": ["($)", "T"],
  "": ["($)", "U"],
  "": ["($)", "V"],
  "": ["($)", "W"],
  "": ["($)", "X"],
  "": ["($)", "Y"],
  "": ["($)", "Z"],
  "\x1B": ["(%)", "A"],
  "": ["(%)", "B"],
  "": ["(%)", "C"],
  "": ["(%)", "D"],
  "": ["(%)", "E"],
  "!": ["(/)", "A"],
  '"': ["(/)", "B"],
  "#": ["(/)", "C"],
  "&": ["(/)", "F"],
  "'": ["(/)", "G"],
  "(": ["(/)", "H"],
  ")": ["(/)", "I"],
  "*": ["(/)", "J"],
  ",": ["(/)", "L"],
  ":": ["(/)", "Z"],
  ";": ["(%)", "F"],
  "<": ["(%)", "G"],
  "=": ["(%)", "H"],
  ">": ["(%)", "I"],
  "?": ["(%)", "J"],
  "@": ["(%)", "V"],
  "[": ["(%)", "K"],
  "\\": ["(%)", "L"],
  "]": ["(%)", "M"],
  "^": ["(%)", "N"],
  _: ["(%)", "O"],
  "`": ["(%)", "W"],
  a: ["(+)", "A"],
  b: ["(+)", "B"],
  c: ["(+)", "C"],
  d: ["(+)", "D"],
  e: ["(+)", "E"],
  f: ["(+)", "F"],
  g: ["(+)", "G"],
  h: ["(+)", "H"],
  i: ["(+)", "I"],
  j: ["(+)", "J"],
  k: ["(+)", "K"],
  l: ["(+)", "L"],
  m: ["(+)", "M"],
  n: ["(+)", "N"],
  o: ["(+)", "O"],
  p: ["(+)", "P"],
  q: ["(+)", "Q"],
  r: ["(+)", "R"],
  s: ["(+)", "S"],
  t: ["(+)", "T"],
  u: ["(+)", "U"],
  v: ["(+)", "V"],
  w: ["(+)", "W"],
  x: ["(+)", "X"],
  y: ["(+)", "Y"],
  z: ["(+)", "Z"],
  "{": ["(%)", "P"],
  "|": ["(%)", "Q"],
  "}": ["(%)", "R"],
  "~": ["(%)", "S"],
  "": ["(%)", "T"]
};
Object.defineProperty(ou, "__esModule", {
  value: !0
});
var zQ = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), dl = zo, qQ = Ht, WQ = XQ(qQ);
function XQ(e) {
  return e && e.__esModule ? e : { default: e };
}
function $Q(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function JQ(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function YQ(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var ZQ = function(e) {
  YQ(A, e);
  function A(t, r) {
    return $Q(this, A), JQ(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return zQ(A, [{
    key: "valid",
    value: function() {
      return /^[0-9A-Z\-. $/+%]+$/.test(this.data);
    }
  }, {
    key: "encode",
    value: function() {
      var r = this.data.split("").flatMap(function(l) {
        return dl.MULTI_SYMBOLS[l] || l;
      }), n = r.map(function(l) {
        return A.getEncoding(l);
      }).join(""), i = A.checksum(r, 20), a = A.checksum(r.concat(i), 15);
      return {
        text: this.text,
        data: (
          // Add the start bits
          A.getEncoding("ÿ") + // Add the encoded bits
          n + // Add the checksum
          A.getEncoding(i) + A.getEncoding(a) + // Add the stop bits
          A.getEncoding("ÿ") + // Add the termination bit
          "1"
        )
      };
    }
    // Get the binary encoding of a symbol
  }], [{
    key: "getEncoding",
    value: function(r) {
      return dl.BINARIES[A.symbolValue(r)];
    }
    // Get the symbol for a symbol value
  }, {
    key: "getSymbol",
    value: function(r) {
      return dl.SYMBOLS[r];
    }
    // Get the symbol value of a symbol
  }, {
    key: "symbolValue",
    value: function(r) {
      return dl.SYMBOLS.indexOf(r);
    }
    // Calculate a checksum symbol
  }, {
    key: "checksum",
    value: function(r, n) {
      var i = r.slice().reverse().reduce(function(a, l, s) {
        var f = s % n + 1;
        return a + A.symbolValue(l) * f;
      }, 0);
      return A.getSymbol(i % 47);
    }
  }]), A;
}(WQ.default);
ou.default = ZQ;
var oh = {};
Object.defineProperty(oh, "__esModule", {
  value: !0
});
var AU = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), eU = ou, tU = rU(eU);
function rU(e) {
  return e && e.__esModule ? e : { default: e };
}
function nU(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function iU(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function aU(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var oU = function(e) {
  aU(A, e);
  function A(t, r) {
    return nU(this, A), iU(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return AU(A, [{
    key: "valid",
    value: function() {
      return /^[\x00-\x7f]+$/.test(this.data);
    }
  }]), A;
}(tU.default);
oh.default = oU;
Object.defineProperty(Fa, "__esModule", {
  value: !0
});
Fa.CODE93FullASCII = Fa.CODE93 = void 0;
var sU = ou, lU = Sg(sU), uU = oh, cU = Sg(uU);
function Sg(e) {
  return e && e.__esModule ? e : { default: e };
}
Fa.CODE93 = lU.default;
Fa.CODE93FullASCII = cU.default;
var su = {};
Object.defineProperty(su, "__esModule", {
  value: !0
});
su.GenericBarcode = void 0;
var fU = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), hU = Ht, dU = gU(hU);
function gU(e) {
  return e && e.__esModule ? e : { default: e };
}
function pU(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function BU(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function wU(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var vU = function(e) {
  wU(A, e);
  function A(t, r) {
    return pU(this, A), BU(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, t, r));
  }
  return fU(A, [{
    key: "encode",
    value: function() {
      return {
        data: "10101010101010101010101010101010101010101",
        text: this.text
      };
    }
    // Resturn true/false if the string provided is valid for this encoder
  }, {
    key: "valid",
    value: function() {
      return !0;
    }
  }]), A;
}(dU.default);
su.GenericBarcode = vU;
Object.defineProperty(Gf, "__esModule", {
  value: !0
});
var mU = eu, gl = Wr, la = Kt, Sd = Ca, mo = cr, yU = iu, bU = au, Id = Fa, CU = su;
Gf.default = {
  CODE39: mU.CODE39,
  CODE128: gl.CODE128,
  CODE128A: gl.CODE128A,
  CODE128B: gl.CODE128B,
  CODE128C: gl.CODE128C,
  EAN13: la.EAN13,
  EAN8: la.EAN8,
  EAN5: la.EAN5,
  EAN2: la.EAN2,
  UPC: la.UPC,
  UPCE: la.UPCE,
  ITF14: Sd.ITF14,
  ITF: Sd.ITF,
  MSI: mo.MSI,
  MSI10: mo.MSI10,
  MSI11: mo.MSI11,
  MSI1010: mo.MSI1010,
  MSI1110: mo.MSI1110,
  pharmacode: yU.pharmacode,
  codabar: bU.codabar,
  CODE93: Id.CODE93,
  CODE93FullASCII: Id.CODE93FullASCII,
  GenericBarcode: CU.GenericBarcode
};
var Na = {};
Object.defineProperty(Na, "__esModule", {
  value: !0
});
var FU = Object.assign || function(e) {
  for (var A = 1; A < arguments.length; A++) {
    var t = arguments[A];
    for (var r in t)
      Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
  }
  return e;
};
Na.default = function(e, A) {
  return FU({}, e, A);
};
var sh = {};
Object.defineProperty(sh, "__esModule", {
  value: !0
});
sh.default = QU;
function QU(e) {
  var A = [];
  function t(r) {
    if (Array.isArray(r))
      for (var n = 0; n < r.length; n++)
        t(r[n]);
    else
      r.text = r.text || "", r.data = r.data || "", A.push(r);
  }
  return t(e), A;
}
var lh = {};
Object.defineProperty(lh, "__esModule", {
  value: !0
});
lh.default = UU;
function UU(e) {
  return e.marginTop = e.marginTop || e.margin, e.marginBottom = e.marginBottom || e.margin, e.marginRight = e.marginRight || e.margin, e.marginLeft = e.marginLeft || e.margin, e;
}
var uh = {}, ch = {}, lu = {};
Object.defineProperty(lu, "__esModule", {
  value: !0
});
lu.default = EU;
function EU(e) {
  var A = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
  for (var t in A)
    A.hasOwnProperty(t) && (t = A[t], typeof e[t] == "string" && (e[t] = parseInt(e[t], 10)));
  return typeof e.displayValue == "string" && (e.displayValue = e.displayValue != "false"), e;
}
var uu = {};
Object.defineProperty(uu, "__esModule", {
  value: !0
});
var xU = {
  width: 2,
  height: 100,
  format: "auto",
  displayValue: !0,
  fontOptions: "",
  font: "monospace",
  text: void 0,
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: void 0,
  marginBottom: void 0,
  marginLeft: void 0,
  marginRight: void 0,
  valid: function() {
  }
};
uu.default = xU;
Object.defineProperty(ch, "__esModule", {
  value: !0
});
var LU = lu, SU = Ig(LU), IU = uu, _d = Ig(IU);
function Ig(e) {
  return e && e.__esModule ? e : { default: e };
}
function _U(e) {
  var A = {};
  for (var t in _d.default)
    _d.default.hasOwnProperty(t) && (e.hasAttribute("jsbarcode-" + t.toLowerCase()) && (A[t] = e.getAttribute("jsbarcode-" + t.toLowerCase())), e.hasAttribute("data-" + t.toLowerCase()) && (A[t] = e.getAttribute("data-" + t.toLowerCase())));
  return A.value = e.getAttribute("jsbarcode-value") || e.getAttribute("data-value"), A = (0, SU.default)(A), A;
}
ch.default = _U;
var fh = {}, hh = {}, Jt = {};
Object.defineProperty(Jt, "__esModule", {
  value: !0
});
Jt.getTotalWidthOfEncodings = Jt.calculateEncodingAttributes = Jt.getBarcodePadding = Jt.getEncodingHeight = Jt.getMaximumHeightOfEncodings = void 0;
var NU = Na, HU = OU(NU);
function OU(e) {
  return e && e.__esModule ? e : { default: e };
}
function _g(e, A) {
  return A.height + (A.displayValue && e.text.length > 0 ? A.fontSize + A.textMargin : 0) + A.marginTop + A.marginBottom;
}
function Ng(e, A, t) {
  if (t.displayValue && A < e) {
    if (t.textAlign == "center")
      return Math.floor((e - A) / 2);
    if (t.textAlign == "left")
      return 0;
    if (t.textAlign == "right")
      return Math.floor(e - A);
  }
  return 0;
}
function DU(e, A, t) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r], i = (0, HU.default)(A, n.options), a;
    i.displayValue ? a = PU(n.text, i, t) : a = 0;
    var l = n.data.length * i.width;
    n.width = Math.ceil(Math.max(a, l)), n.height = _g(n, i), n.barcodePadding = Ng(a, l, i);
  }
}
function TU(e) {
  for (var A = 0, t = 0; t < e.length; t++)
    A += e[t].width;
  return A;
}
function kU(e) {
  for (var A = 0, t = 0; t < e.length; t++)
    e[t].height > A && (A = e[t].height);
  return A;
}
function PU(e, A, t) {
  var r;
  if (t)
    r = t;
  else if (typeof document < "u")
    r = document.createElement("canvas").getContext("2d");
  else
    return 0;
  r.font = A.fontOptions + " " + A.fontSize + "px " + A.font;
  var n = r.measureText(e);
  if (!n)
    return 0;
  var i = n.width;
  return i;
}
Jt.getMaximumHeightOfEncodings = kU;
Jt.getEncodingHeight = _g;
Jt.getBarcodePadding = Ng;
Jt.calculateEncodingAttributes = DU;
Jt.getTotalWidthOfEncodings = TU;
Object.defineProperty(hh, "__esModule", {
  value: !0
});
var MU = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), RU = Na, KU = jU(RU), kc = Jt;
function jU(e) {
  return e && e.__esModule ? e : { default: e };
}
function GU(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
var VU = function() {
  function e(A, t, r) {
    GU(this, e), this.canvas = A, this.encodings = t, this.options = r;
  }
  return MU(e, [{
    key: "render",
    value: function() {
      if (!this.canvas.getContext)
        throw new Error("The browser does not support canvas.");
      this.prepareCanvas();
      for (var t = 0; t < this.encodings.length; t++) {
        var r = (0, KU.default)(this.options, this.encodings[t].options);
        this.drawCanvasBarcode(r, this.encodings[t]), this.drawCanvasText(r, this.encodings[t]), this.moveCanvasDrawing(this.encodings[t]);
      }
      this.restoreCanvas();
    }
  }, {
    key: "prepareCanvas",
    value: function() {
      var t = this.canvas.getContext("2d");
      t.save(), (0, kc.calculateEncodingAttributes)(this.encodings, this.options, t);
      var r = (0, kc.getTotalWidthOfEncodings)(this.encodings), n = (0, kc.getMaximumHeightOfEncodings)(this.encodings);
      this.canvas.width = r + this.options.marginLeft + this.options.marginRight, this.canvas.height = n, t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (t.fillStyle = this.options.background, t.fillRect(0, 0, this.canvas.width, this.canvas.height)), t.translate(this.options.marginLeft, 0);
    }
  }, {
    key: "drawCanvasBarcode",
    value: function(t, r) {
      var n = this.canvas.getContext("2d"), i = r.data, a;
      t.textPosition == "top" ? a = t.marginTop + t.fontSize + t.textMargin : a = t.marginTop, n.fillStyle = t.lineColor;
      for (var l = 0; l < i.length; l++) {
        var s = l * t.width + r.barcodePadding;
        i[l] === "1" ? n.fillRect(s, a, t.width, t.height) : i[l] && n.fillRect(s, a, t.width, t.height * i[l]);
      }
    }
  }, {
    key: "drawCanvasText",
    value: function(t, r) {
      var n = this.canvas.getContext("2d"), i = t.fontOptions + " " + t.fontSize + "px " + t.font;
      if (t.displayValue) {
        var a, l;
        t.textPosition == "top" ? l = t.marginTop + t.fontSize - t.textMargin : l = t.height + t.textMargin + t.marginTop + t.fontSize, n.font = i, t.textAlign == "left" || r.barcodePadding > 0 ? (a = 0, n.textAlign = "left") : t.textAlign == "right" ? (a = r.width - 1, n.textAlign = "right") : (a = r.width / 2, n.textAlign = "center"), n.fillText(r.text, a, l);
      }
    }
  }, {
    key: "moveCanvasDrawing",
    value: function(t) {
      var r = this.canvas.getContext("2d");
      r.translate(t.width, 0);
    }
  }, {
    key: "restoreCanvas",
    value: function() {
      var t = this.canvas.getContext("2d");
      t.restore();
    }
  }]), e;
}();
hh.default = VU;
var dh = {};
Object.defineProperty(dh, "__esModule", {
  value: !0
});
var zU = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}(), qU = Na, WU = XU(qU), Pc = Jt;
function XU(e) {
  return e && e.__esModule ? e : { default: e };
}
function $U(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
var pl = "http://www.w3.org/2000/svg", JU = function() {
  function e(A, t, r) {
    $U(this, e), this.svg = A, this.encodings = t, this.options = r, this.document = r.xmlDocument || document;
  }
  return zU(e, [{
    key: "render",
    value: function() {
      var t = this.options.marginLeft;
      this.prepareSVG();
      for (var r = 0; r < this.encodings.length; r++) {
        var n = this.encodings[r], i = (0, WU.default)(this.options, n.options), a = this.createGroup(t, i.marginTop, this.svg);
        this.setGroupOptions(a, i), this.drawSvgBarcode(a, i, n), this.drawSVGText(a, i, n), t += n.width;
      }
    }
  }, {
    key: "prepareSVG",
    value: function() {
      for (; this.svg.firstChild; )
        this.svg.removeChild(this.svg.firstChild);
      (0, Pc.calculateEncodingAttributes)(this.encodings, this.options);
      var t = (0, Pc.getTotalWidthOfEncodings)(this.encodings), r = (0, Pc.getMaximumHeightOfEncodings)(this.encodings), n = t + this.options.marginLeft + this.options.marginRight;
      this.setSvgAttributes(n, r), this.options.background && this.drawRect(0, 0, n, r, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
    }
  }, {
    key: "drawSvgBarcode",
    value: function(t, r, n) {
      var i = n.data, a;
      r.textPosition == "top" ? a = r.fontSize + r.textMargin : a = 0;
      for (var l = 0, s = 0, f = 0; f < i.length; f++)
        s = f * r.width + n.barcodePadding, i[f] === "1" ? l++ : l > 0 && (this.drawRect(s - r.width * l, a, r.width * l, r.height, t), l = 0);
      l > 0 && this.drawRect(s - r.width * (l - 1), a, r.width * l, r.height, t);
    }
  }, {
    key: "drawSVGText",
    value: function(t, r, n) {
      var i = this.document.createElementNS(pl, "text");
      if (r.displayValue) {
        var a, l;
        i.setAttribute("style", "font:" + r.fontOptions + " " + r.fontSize + "px " + r.font), r.textPosition == "top" ? l = r.fontSize - r.textMargin : l = r.height + r.textMargin + r.fontSize, r.textAlign == "left" || n.barcodePadding > 0 ? (a = 0, i.setAttribute("text-anchor", "start")) : r.textAlign == "right" ? (a = n.width - 1, i.setAttribute("text-anchor", "end")) : (a = n.width / 2, i.setAttribute("text-anchor", "middle")), i.setAttribute("x", a), i.setAttribute("y", l), i.appendChild(this.document.createTextNode(n.text)), t.appendChild(i);
      }
    }
  }, {
    key: "setSvgAttributes",
    value: function(t, r) {
      var n = this.svg;
      n.setAttribute("width", t + "px"), n.setAttribute("height", r + "px"), n.setAttribute("x", "0px"), n.setAttribute("y", "0px"), n.setAttribute("viewBox", "0 0 " + t + " " + r), n.setAttribute("xmlns", pl), n.setAttribute("version", "1.1"), n.setAttribute("style", "transform: translate(0,0)");
    }
  }, {
    key: "createGroup",
    value: function(t, r, n) {
      var i = this.document.createElementNS(pl, "g");
      return i.setAttribute("transform", "translate(" + t + ", " + r + ")"), n.appendChild(i), i;
    }
  }, {
    key: "setGroupOptions",
    value: function(t, r) {
      t.setAttribute("style", "fill:" + r.lineColor + ";");
    }
  }, {
    key: "drawRect",
    value: function(t, r, n, i, a) {
      var l = this.document.createElementNS(pl, "rect");
      return l.setAttribute("x", t), l.setAttribute("y", r), l.setAttribute("width", n), l.setAttribute("height", i), a.appendChild(l), l;
    }
  }]), e;
}();
dh.default = JU;
var gh = {};
Object.defineProperty(gh, "__esModule", {
  value: !0
});
var YU = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}();
function ZU(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
var AE = function() {
  function e(A, t, r) {
    ZU(this, e), this.object = A, this.encodings = t, this.options = r;
  }
  return YU(e, [{
    key: "render",
    value: function() {
      this.object.encodings = this.encodings;
    }
  }]), e;
}();
gh.default = AE;
Object.defineProperty(fh, "__esModule", {
  value: !0
});
var eE = hh, tE = ph(eE), rE = dh, nE = ph(rE), iE = gh, aE = ph(iE);
function ph(e) {
  return e && e.__esModule ? e : { default: e };
}
fh.default = { CanvasRenderer: tE.default, SVGRenderer: nE.default, ObjectRenderer: aE.default };
var Ha = {};
Object.defineProperty(Ha, "__esModule", {
  value: !0
});
function Bh(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
function wh(e, A) {
  if (!e)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return A && (typeof A == "object" || typeof A == "function") ? A : e;
}
function vh(e, A) {
  if (typeof A != "function" && A !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof A);
  e.prototype = Object.create(A && A.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(e, A) : e.__proto__ = A);
}
var oE = function(e) {
  vh(A, e);
  function A(t, r) {
    Bh(this, A);
    var n = wh(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this));
    return n.name = "InvalidInputException", n.symbology = t, n.input = r, n.message = '"' + n.input + '" is not a valid input for ' + n.symbology, n;
  }
  return A;
}(Error), sE = function(e) {
  vh(A, e);
  function A() {
    Bh(this, A);
    var t = wh(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this));
    return t.name = "InvalidElementException", t.message = "Not supported type to render on", t;
  }
  return A;
}(Error), lE = function(e) {
  vh(A, e);
  function A() {
    Bh(this, A);
    var t = wh(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this));
    return t.name = "NoElementException", t.message = "No element to render on.", t;
  }
  return A;
}(Error);
Ha.InvalidInputException = oE;
Ha.InvalidElementException = sE;
Ha.NoElementException = lE;
Object.defineProperty(uh, "__esModule", {
  value: !0
});
var uE = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, cE = ch, Ef = Hg(cE), fE = fh, xo = Hg(fE), hE = Ha;
function Hg(e) {
  return e && e.__esModule ? e : { default: e };
}
function mh(e) {
  if (typeof e == "string")
    return dE(e);
  if (Array.isArray(e)) {
    for (var A = [], t = 0; t < e.length; t++)
      A.push(mh(e[t]));
    return A;
  } else {
    if (typeof HTMLCanvasElement < "u" && e instanceof HTMLImageElement)
      return gE(e);
    if (e && e.nodeName && e.nodeName.toLowerCase() === "svg" || typeof SVGElement < "u" && e instanceof SVGElement)
      return {
        element: e,
        options: (0, Ef.default)(e),
        renderer: xo.default.SVGRenderer
      };
    if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement)
      return {
        element: e,
        options: (0, Ef.default)(e),
        renderer: xo.default.CanvasRenderer
      };
    if (e && e.getContext)
      return {
        element: e,
        renderer: xo.default.CanvasRenderer
      };
    if (e && (typeof e > "u" ? "undefined" : uE(e)) === "object" && !e.nodeName)
      return {
        element: e,
        renderer: xo.default.ObjectRenderer
      };
    throw new hE.InvalidElementException();
  }
}
function dE(e) {
  var A = document.querySelectorAll(e);
  if (A.length !== 0) {
    for (var t = [], r = 0; r < A.length; r++)
      t.push(mh(A[r]));
    return t;
  }
}
function gE(e) {
  var A = document.createElement("canvas");
  return {
    element: A,
    options: (0, Ef.default)(e),
    renderer: xo.default.CanvasRenderer,
    afterRender: function() {
      e.setAttribute("src", A.toDataURL());
    }
  };
}
uh.default = mh;
var yh = {};
Object.defineProperty(yh, "__esModule", {
  value: !0
});
var pE = /* @__PURE__ */ function() {
  function e(A, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
    }
  }
  return function(A, t, r) {
    return t && e(A.prototype, t), r && e(A, r), A;
  };
}();
function BE(e, A) {
  if (!(e instanceof A))
    throw new TypeError("Cannot call a class as a function");
}
var wE = function() {
  function e(A) {
    BE(this, e), this.api = A;
  }
  return pE(e, [{
    key: "handleCatch",
    value: function(t) {
      if (t.name === "InvalidInputException")
        if (this.api._options.valid !== this.api._defaults.valid)
          this.api._options.valid(!1);
        else
          throw t.message;
      else
        throw t;
      this.api.render = function() {
      };
    }
  }, {
    key: "wrapBarcodeCall",
    value: function(t) {
      try {
        var r = t.apply(void 0, arguments);
        return this.api._options.valid(!0), r;
      } catch (n) {
        return this.handleCatch(n), this.api;
      }
    }
  }]), e;
}();
yh.default = wE;
var vE = Gf, wi = Xn(vE), mE = Na, qo = Xn(mE), yE = sh, Og = Xn(yE), bE = lh, Nd = Xn(bE), CE = uh, FE = Xn(CE), QE = lu, UE = Xn(QE), EE = yh, xE = Xn(EE), Dg = Ha, LE = uu, Tg = Xn(LE);
function Xn(e) {
  return e && e.__esModule ? e : { default: e };
}
var Bn = function() {
}, cu = function(A, t, r) {
  var n = new Bn();
  if (typeof A > "u")
    throw Error("No element to render on was provided.");
  return n._renderProperties = (0, FE.default)(A), n._encodings = [], n._options = Tg.default, n._errorHandler = new xE.default(n), typeof t < "u" && (r = r || {}, r.format || (r.format = Pg()), n.options(r)[r.format](t, r).render()), n;
};
cu.getModule = function(e) {
  return wi.default[e];
};
for (var Hd in wi.default)
  wi.default.hasOwnProperty(Hd) && SE(wi.default, Hd);
function SE(e, A) {
  Bn.prototype[A] = Bn.prototype[A.toUpperCase()] = Bn.prototype[A.toLowerCase()] = function(t, r) {
    var n = this;
    return n._errorHandler.wrapBarcodeCall(function() {
      r.text = typeof r.text > "u" ? void 0 : "" + r.text;
      var i = (0, qo.default)(n._options, r);
      i = (0, UE.default)(i);
      var a = e[A], l = kg(t, a, i);
      return n._encodings.push(l), n;
    });
  };
}
function kg(e, A, t) {
  e = "" + e;
  var r = new A(e, t);
  if (!r.valid())
    throw new Dg.InvalidInputException(r.constructor.name, e);
  var n = r.encode();
  n = (0, Og.default)(n);
  for (var i = 0; i < n.length; i++)
    n[i].options = (0, qo.default)(t, n[i].options);
  return n;
}
function Pg() {
  return wi.default.CODE128 ? "CODE128" : Object.keys(wi.default)[0];
}
Bn.prototype.options = function(e) {
  return this._options = (0, qo.default)(this._options, e), this;
};
Bn.prototype.blank = function(e) {
  var A = new Array(e + 1).join("0");
  return this._encodings.push({ data: A }), this;
};
Bn.prototype.init = function() {
  if (this._renderProperties) {
    Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]);
    var e;
    for (var A in this._renderProperties) {
      e = this._renderProperties[A];
      var t = (0, qo.default)(this._options, e.options);
      t.format == "auto" && (t.format = Pg()), this._errorHandler.wrapBarcodeCall(function() {
        var r = t.value, n = wi.default[t.format.toUpperCase()], i = kg(r, n, t);
        xf(e, i, t);
      });
    }
  }
};
Bn.prototype.render = function() {
  if (!this._renderProperties)
    throw new Dg.NoElementException();
  if (Array.isArray(this._renderProperties))
    for (var e = 0; e < this._renderProperties.length; e++)
      xf(this._renderProperties[e], this._encodings, this._options);
  else
    xf(this._renderProperties, this._encodings, this._options);
  return this;
};
Bn.prototype._defaults = Tg.default;
function xf(e, A, t) {
  A = (0, Og.default)(A);
  for (var r = 0; r < A.length; r++)
    A[r].options = (0, qo.default)(t, A[r].options), (0, Nd.default)(A[r].options);
  (0, Nd.default)(t);
  var n = e.renderer, i = new n(e.element, A, t);
  i.render(), e.afterRender && e.afterRender();
}
typeof window < "u" && (window.JsBarcode = cu);
typeof jQuery < "u" && (jQuery.fn.JsBarcode = function(e, A) {
  var t = [];
  return jQuery(this).each(function() {
    t.push(this);
  }), cu(t, e, A);
});
var IE = cu;
const Od = /* @__PURE__ */ IC(IE), _E = {
  name: "RoyBarCode",
  props: {
    element: {
      type: Object,
      required: !0
    },
    selected: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["select", "update", "delete"],
  setup(e, { emit: A }) {
    const t = ye(null), r = gn(() => ({
      position: "absolute",
      left: `${e.element.x}px`,
      top: `${e.element.y}px`,
      width: `${e.element.width}px`,
      height: `${e.element.height}px`,
      border: e.selected ? "2px solid #007bff" : "2px dashed transparent",
      zIndex: e.selected ? 1e3 : 1
    })), n = () => {
      pa(() => {
        if (t.value)
          try {
            Od(t.value, e.element.value || "Sample123", {
              format: e.element.format || "CODE128",
              width: e.element.lineWidth || 2,
              height: e.element.height - (e.element.showText ? 20 : 0) - 4,
              displayValue: !1,
              background: e.element.backgroundColor || "#ffffff",
              lineColor: e.element.lineColor || "#000000",
              margin: 2
            });
          } catch {
            console.warn("Invalid barcode value:", e.element.value);
            try {
              Od(t.value, "123456789", {
                format: "CODE128",
                width: 2,
                height: e.element.height - (e.element.showText ? 20 : 0) - 4,
                displayValue: !1,
                background: "#ffffff",
                lineColor: "#000000",
                margin: 2
              });
            } catch (P) {
              console.error("Failed to generate fallback barcode:", P);
            }
          }
      });
    };
    let i = !1, a = !1, l = "", s = 0, f = 0, g = 0, p = 0, w = 0, d = 0;
    const C = (O) => {
      O.target.classList.contains("resize-handle") || (i = !0, s = O.clientX, f = O.clientY, g = e.element.x, p = e.element.y, document.addEventListener("mousemove", b), document.addEventListener("mouseup", _), O.preventDefault());
    }, b = (O) => {
      if (!i) return;
      const P = O.clientX - s, q = O.clientY - f;
      e.element.x = Math.max(0, g + P), e.element.y = Math.max(0, p + q), A("update");
    }, _ = () => {
      i = !1, document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", _);
    }, m = (O) => {
      a = !0, l = O, s = event.clientX, f = event.clientY, g = e.element.x, p = e.element.y, w = e.element.width, d = e.element.height, document.addEventListener("mousemove", y), document.addEventListener("mouseup", H), event.preventDefault();
    }, y = (O) => {
      if (!a) return;
      const P = O.clientX - s, q = O.clientY - f;
      let W = g, D = p, R = w, Y = d;
      l.includes("n") && (D = p + q, Y = d - q), l.includes("s") && (Y = d + q), l.includes("w") && (W = g + P, R = w - P), l.includes("e") && (R = w + P), R >= 50 && Y >= 30 && (e.element.x = Math.max(0, W), e.element.y = Math.max(0, D), e.element.width = R, e.element.height = Y, A("update"));
    }, H = () => {
      a = !1, l = "", document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", H), n();
    };
    return Nf(() => {
      n();
    }), Rl(
      () => [
        e.element.value,
        e.element.format,
        e.element.lineWidth,
        e.element.lineColor,
        e.element.backgroundColor,
        e.element.width,
        e.element.height,
        e.element.showText
      ],
      () => {
        n();
      },
      { deep: !0 }
    ), {
      barcodeCanvas: t,
      elementStyle: r,
      startDrag: C,
      startResize: m
    };
  }
}, NE = { class: "barcode-container" }, HE = {
  ref: "barcodeCanvas",
  class: "barcode-canvas"
}, OE = {
  key: 0,
  class: "barcode-text"
};
function DE(e, A, t, r, n, i) {
  return IA(), _A("div", {
    class: "roy-barcode",
    style: Be(r.elementStyle),
    onMousedown: A[4] || (A[4] = (...a) => r.startDrag && r.startDrag(...a)),
    onClick: A[5] || (A[5] = Ge((a) => e.$emit("select", t.element), ["stop"]))
  }, [
    T("div", NE, [
      T("canvas", HE, null, 512),
      t.element.showText ? (IA(), _A("div", OE, nt(t.element.value), 1)) : de("", !0)
    ]),
    t.selected ? (IA(), _A(Nt, { key: 0 }, [
      T("div", {
        class: "resize-handle nw",
        onMousedown: A[0] || (A[0] = Ge((a) => r.startResize("nw"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle ne",
        onMousedown: A[1] || (A[1] = Ge((a) => r.startResize("ne"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle sw",
        onMousedown: A[2] || (A[2] = Ge((a) => r.startResize("sw"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle se",
        onMousedown: A[3] || (A[3] = Ge((a) => r.startResize("se"), ["stop"]))
      }, null, 32)
    ], 64)) : de("", !0)
  ], 36);
}
const TE = /* @__PURE__ */ vi(_E, [["render", DE], ["__scopeId", "data-v-f512dc98"]]);
var Qa = {}, kE = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, Mg = {}, Zt = {};
let bh;
const PE = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
Zt.getSymbolSize = function(A) {
  if (!A) throw new Error('"version" cannot be null or undefined');
  if (A < 1 || A > 40) throw new Error('"version" should be in range from 1 to 40');
  return A * 4 + 17;
};
Zt.getSymbolTotalCodewords = function(A) {
  return PE[A];
};
Zt.getBCHDigit = function(e) {
  let A = 0;
  for (; e !== 0; )
    A++, e >>>= 1;
  return A;
};
Zt.setToSJISFunction = function(A) {
  if (typeof A != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  bh = A;
};
Zt.isKanjiModeEnabled = function() {
  return typeof bh < "u";
};
Zt.toSJIS = function(A) {
  return bh(A);
};
var fu = {};
(function(e) {
  e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
  function A(t) {
    if (typeof t != "string")
      throw new Error("Param is not a string");
    switch (t.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + t);
    }
  }
  e.isValid = function(r) {
    return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4;
  }, e.from = function(r, n) {
    if (e.isValid(r))
      return r;
    try {
      return A(r);
    } catch {
      return n;
    }
  };
})(fu);
function Rg() {
  this.buffer = [], this.length = 0;
}
Rg.prototype = {
  get: function(e) {
    const A = Math.floor(e / 8);
    return (this.buffer[A] >>> 7 - e % 8 & 1) === 1;
  },
  put: function(e, A) {
    for (let t = 0; t < A; t++)
      this.putBit((e >>> A - t - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(e) {
    const A = Math.floor(this.length / 8);
    this.buffer.length <= A && this.buffer.push(0), e && (this.buffer[A] |= 128 >>> this.length % 8), this.length++;
  }
};
var ME = Rg;
function Wo(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
}
Wo.prototype.set = function(e, A, t, r) {
  const n = e * this.size + A;
  this.data[n] = t, r && (this.reservedBit[n] = !0);
};
Wo.prototype.get = function(e, A) {
  return this.data[e * this.size + A];
};
Wo.prototype.xor = function(e, A, t) {
  this.data[e * this.size + A] ^= t;
};
Wo.prototype.isReserved = function(e, A) {
  return this.reservedBit[e * this.size + A];
};
var RE = Wo, Kg = {};
(function(e) {
  const A = Zt.getSymbolSize;
  e.getRowColCoords = function(r) {
    if (r === 1) return [];
    const n = Math.floor(r / 7) + 2, i = A(r), a = i === 145 ? 26 : Math.ceil((i - 13) / (2 * n - 2)) * 2, l = [i - 7];
    for (let s = 1; s < n - 1; s++)
      l[s] = l[s - 1] - a;
    return l.push(6), l.reverse();
  }, e.getPositions = function(r) {
    const n = [], i = e.getRowColCoords(r), a = i.length;
    for (let l = 0; l < a; l++)
      for (let s = 0; s < a; s++)
        l === 0 && s === 0 || // top-left
        l === 0 && s === a - 1 || // bottom-left
        l === a - 1 && s === 0 || n.push([i[l], i[s]]);
    return n;
  };
})(Kg);
var jg = {};
const KE = Zt.getSymbolSize, Dd = 7;
jg.getPositions = function(A) {
  const t = KE(A);
  return [
    // top-left
    [0, 0],
    // top-right
    [t - Dd, 0],
    // bottom-left
    [0, t - Dd]
  ];
};
var Gg = {};
(function(e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const A = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  e.isValid = function(n) {
    return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
  }, e.from = function(n) {
    return e.isValid(n) ? parseInt(n, 10) : void 0;
  }, e.getPenaltyN1 = function(n) {
    const i = n.size;
    let a = 0, l = 0, s = 0, f = null, g = null;
    for (let p = 0; p < i; p++) {
      l = s = 0, f = g = null;
      for (let w = 0; w < i; w++) {
        let d = n.get(p, w);
        d === f ? l++ : (l >= 5 && (a += A.N1 + (l - 5)), f = d, l = 1), d = n.get(w, p), d === g ? s++ : (s >= 5 && (a += A.N1 + (s - 5)), g = d, s = 1);
      }
      l >= 5 && (a += A.N1 + (l - 5)), s >= 5 && (a += A.N1 + (s - 5));
    }
    return a;
  }, e.getPenaltyN2 = function(n) {
    const i = n.size;
    let a = 0;
    for (let l = 0; l < i - 1; l++)
      for (let s = 0; s < i - 1; s++) {
        const f = n.get(l, s) + n.get(l, s + 1) + n.get(l + 1, s) + n.get(l + 1, s + 1);
        (f === 4 || f === 0) && a++;
      }
    return a * A.N2;
  }, e.getPenaltyN3 = function(n) {
    const i = n.size;
    let a = 0, l = 0, s = 0;
    for (let f = 0; f < i; f++) {
      l = s = 0;
      for (let g = 0; g < i; g++)
        l = l << 1 & 2047 | n.get(f, g), g >= 10 && (l === 1488 || l === 93) && a++, s = s << 1 & 2047 | n.get(g, f), g >= 10 && (s === 1488 || s === 93) && a++;
    }
    return a * A.N3;
  }, e.getPenaltyN4 = function(n) {
    let i = 0;
    const a = n.data.length;
    for (let s = 0; s < a; s++) i += n.data[s];
    return Math.abs(Math.ceil(i * 100 / a / 5) - 10) * A.N4;
  };
  function t(r, n, i) {
    switch (r) {
      case e.Patterns.PATTERN000:
        return (n + i) % 2 === 0;
      case e.Patterns.PATTERN001:
        return n % 2 === 0;
      case e.Patterns.PATTERN010:
        return i % 3 === 0;
      case e.Patterns.PATTERN011:
        return (n + i) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(n / 2) + Math.floor(i / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return n * i % 2 + n * i % 3 === 0;
      case e.Patterns.PATTERN110:
        return (n * i % 2 + n * i % 3) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (n * i % 3 + (n + i) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + r);
    }
  }
  e.applyMask = function(n, i) {
    const a = i.size;
    for (let l = 0; l < a; l++)
      for (let s = 0; s < a; s++)
        i.isReserved(s, l) || i.xor(s, l, t(n, s, l));
  }, e.getBestMask = function(n, i) {
    const a = Object.keys(e.Patterns).length;
    let l = 0, s = 1 / 0;
    for (let f = 0; f < a; f++) {
      i(f), e.applyMask(f, n);
      const g = e.getPenaltyN1(n) + e.getPenaltyN2(n) + e.getPenaltyN3(n) + e.getPenaltyN4(n);
      e.applyMask(f, n), g < s && (s = g, l = f);
    }
    return l;
  };
})(Gg);
var hu = {};
const Kn = fu, Bl = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], wl = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
hu.getBlocksCount = function(A, t) {
  switch (t) {
    case Kn.L:
      return Bl[(A - 1) * 4 + 0];
    case Kn.M:
      return Bl[(A - 1) * 4 + 1];
    case Kn.Q:
      return Bl[(A - 1) * 4 + 2];
    case Kn.H:
      return Bl[(A - 1) * 4 + 3];
    default:
      return;
  }
};
hu.getTotalCodewordsCount = function(A, t) {
  switch (t) {
    case Kn.L:
      return wl[(A - 1) * 4 + 0];
    case Kn.M:
      return wl[(A - 1) * 4 + 1];
    case Kn.Q:
      return wl[(A - 1) * 4 + 2];
    case Kn.H:
      return wl[(A - 1) * 4 + 3];
    default:
      return;
  }
};
var Vg = {}, du = {};
const Oo = new Uint8Array(512), Pl = new Uint8Array(256);
(function() {
  let A = 1;
  for (let t = 0; t < 255; t++)
    Oo[t] = A, Pl[A] = t, A <<= 1, A & 256 && (A ^= 285);
  for (let t = 255; t < 512; t++)
    Oo[t] = Oo[t - 255];
})();
du.log = function(A) {
  if (A < 1) throw new Error("log(" + A + ")");
  return Pl[A];
};
du.exp = function(A) {
  return Oo[A];
};
du.mul = function(A, t) {
  return A === 0 || t === 0 ? 0 : Oo[Pl[A] + Pl[t]];
};
(function(e) {
  const A = du;
  e.mul = function(r, n) {
    const i = new Uint8Array(r.length + n.length - 1);
    for (let a = 0; a < r.length; a++)
      for (let l = 0; l < n.length; l++)
        i[a + l] ^= A.mul(r[a], n[l]);
    return i;
  }, e.mod = function(r, n) {
    let i = new Uint8Array(r);
    for (; i.length - n.length >= 0; ) {
      const a = i[0];
      for (let s = 0; s < n.length; s++)
        i[s] ^= A.mul(n[s], a);
      let l = 0;
      for (; l < i.length && i[l] === 0; ) l++;
      i = i.slice(l);
    }
    return i;
  }, e.generateECPolynomial = function(r) {
    let n = new Uint8Array([1]);
    for (let i = 0; i < r; i++)
      n = e.mul(n, new Uint8Array([1, A.exp(i)]));
    return n;
  };
})(Vg);
const zg = Vg;
function Ch(e) {
  this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
}
Ch.prototype.initialize = function(A) {
  this.degree = A, this.genPoly = zg.generateECPolynomial(this.degree);
};
Ch.prototype.encode = function(A) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const t = new Uint8Array(A.length + this.degree);
  t.set(A);
  const r = zg.mod(t, this.genPoly), n = this.degree - r.length;
  if (n > 0) {
    const i = new Uint8Array(this.degree);
    return i.set(r, n), i;
  }
  return r;
};
var jE = Ch, qg = {}, $n = {}, Fh = {};
Fh.isValid = function(A) {
  return !isNaN(A) && A >= 1 && A <= 40;
};
var Zr = {};
const Wg = "[0-9]+", GE = "[A-Z $%*+\\-./:]+";
let Mo = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
Mo = Mo.replace(/u/g, "\\u");
const VE = "(?:(?![A-Z0-9 $%*+\\-./:]|" + Mo + `)(?:.|[\r
]))+`;
Zr.KANJI = new RegExp(Mo, "g");
Zr.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
Zr.BYTE = new RegExp(VE, "g");
Zr.NUMERIC = new RegExp(Wg, "g");
Zr.ALPHANUMERIC = new RegExp(GE, "g");
const zE = new RegExp("^" + Mo + "$"), qE = new RegExp("^" + Wg + "$"), WE = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
Zr.testKanji = function(A) {
  return zE.test(A);
};
Zr.testNumeric = function(A) {
  return qE.test(A);
};
Zr.testAlphanumeric = function(A) {
  return WE.test(A);
};
(function(e) {
  const A = Fh, t = Zr;
  e.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, e.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, e.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, e.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, e.MIXED = {
    bit: -1
  }, e.getCharCountIndicator = function(i, a) {
    if (!i.ccBits) throw new Error("Invalid mode: " + i);
    if (!A.isValid(a))
      throw new Error("Invalid version: " + a);
    return a >= 1 && a < 10 ? i.ccBits[0] : a < 27 ? i.ccBits[1] : i.ccBits[2];
  }, e.getBestModeForData = function(i) {
    return t.testNumeric(i) ? e.NUMERIC : t.testAlphanumeric(i) ? e.ALPHANUMERIC : t.testKanji(i) ? e.KANJI : e.BYTE;
  }, e.toString = function(i) {
    if (i && i.id) return i.id;
    throw new Error("Invalid mode");
  }, e.isValid = function(i) {
    return i && i.bit && i.ccBits;
  };
  function r(n) {
    if (typeof n != "string")
      throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + n);
    }
  }
  e.from = function(i, a) {
    if (e.isValid(i))
      return i;
    try {
      return r(i);
    } catch {
      return a;
    }
  };
})($n);
(function(e) {
  const A = Zt, t = hu, r = fu, n = $n, i = Fh, a = 7973, l = A.getBCHDigit(a);
  function s(w, d, C) {
    for (let b = 1; b <= 40; b++)
      if (d <= e.getCapacity(b, C, w))
        return b;
  }
  function f(w, d) {
    return n.getCharCountIndicator(w, d) + 4;
  }
  function g(w, d) {
    let C = 0;
    return w.forEach(function(b) {
      const _ = f(b.mode, d);
      C += _ + b.getBitsLength();
    }), C;
  }
  function p(w, d) {
    for (let C = 1; C <= 40; C++)
      if (g(w, C) <= e.getCapacity(C, d, n.MIXED))
        return C;
  }
  e.from = function(d, C) {
    return i.isValid(d) ? parseInt(d, 10) : C;
  }, e.getCapacity = function(d, C, b) {
    if (!i.isValid(d))
      throw new Error("Invalid QR Code version");
    typeof b > "u" && (b = n.BYTE);
    const _ = A.getSymbolTotalCodewords(d), m = t.getTotalCodewordsCount(d, C), y = (_ - m) * 8;
    if (b === n.MIXED) return y;
    const H = y - f(b, d);
    switch (b) {
      case n.NUMERIC:
        return Math.floor(H / 10 * 3);
      case n.ALPHANUMERIC:
        return Math.floor(H / 11 * 2);
      case n.KANJI:
        return Math.floor(H / 13);
      case n.BYTE:
      default:
        return Math.floor(H / 8);
    }
  }, e.getBestVersionForData = function(d, C) {
    let b;
    const _ = r.from(C, r.M);
    if (Array.isArray(d)) {
      if (d.length > 1)
        return p(d, _);
      if (d.length === 0)
        return 1;
      b = d[0];
    } else
      b = d;
    return s(b.mode, b.getLength(), _);
  }, e.getEncodedBits = function(d) {
    if (!i.isValid(d) || d < 7)
      throw new Error("Invalid QR Code version");
    let C = d << 12;
    for (; A.getBCHDigit(C) - l >= 0; )
      C ^= a << A.getBCHDigit(C) - l;
    return d << 12 | C;
  };
})(qg);
var Xg = {};
const Lf = Zt, $g = 1335, XE = 21522, Td = Lf.getBCHDigit($g);
Xg.getEncodedBits = function(A, t) {
  const r = A.bit << 3 | t;
  let n = r << 10;
  for (; Lf.getBCHDigit(n) - Td >= 0; )
    n ^= $g << Lf.getBCHDigit(n) - Td;
  return (r << 10 | n) ^ XE;
};
var Jg = {};
const $E = $n;
function Ua(e) {
  this.mode = $E.NUMERIC, this.data = e.toString();
}
Ua.getBitsLength = function(A) {
  return 10 * Math.floor(A / 3) + (A % 3 ? A % 3 * 3 + 1 : 0);
};
Ua.prototype.getLength = function() {
  return this.data.length;
};
Ua.prototype.getBitsLength = function() {
  return Ua.getBitsLength(this.data.length);
};
Ua.prototype.write = function(A) {
  let t, r, n;
  for (t = 0; t + 3 <= this.data.length; t += 3)
    r = this.data.substr(t, 3), n = parseInt(r, 10), A.put(n, 10);
  const i = this.data.length - t;
  i > 0 && (r = this.data.substr(t), n = parseInt(r, 10), A.put(n, i * 3 + 1));
};
var JE = Ua;
const YE = $n, Mc = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function Ea(e) {
  this.mode = YE.ALPHANUMERIC, this.data = e;
}
Ea.getBitsLength = function(A) {
  return 11 * Math.floor(A / 2) + 6 * (A % 2);
};
Ea.prototype.getLength = function() {
  return this.data.length;
};
Ea.prototype.getBitsLength = function() {
  return Ea.getBitsLength(this.data.length);
};
Ea.prototype.write = function(A) {
  let t;
  for (t = 0; t + 2 <= this.data.length; t += 2) {
    let r = Mc.indexOf(this.data[t]) * 45;
    r += Mc.indexOf(this.data[t + 1]), A.put(r, 11);
  }
  this.data.length % 2 && A.put(Mc.indexOf(this.data[t]), 6);
};
var ZE = Ea;
const Ax = $n;
function xa(e) {
  this.mode = Ax.BYTE, typeof e == "string" ? this.data = new TextEncoder().encode(e) : this.data = new Uint8Array(e);
}
xa.getBitsLength = function(A) {
  return A * 8;
};
xa.prototype.getLength = function() {
  return this.data.length;
};
xa.prototype.getBitsLength = function() {
  return xa.getBitsLength(this.data.length);
};
xa.prototype.write = function(e) {
  for (let A = 0, t = this.data.length; A < t; A++)
    e.put(this.data[A], 8);
};
var ex = xa;
const tx = $n, rx = Zt;
function La(e) {
  this.mode = tx.KANJI, this.data = e;
}
La.getBitsLength = function(A) {
  return A * 13;
};
La.prototype.getLength = function() {
  return this.data.length;
};
La.prototype.getBitsLength = function() {
  return La.getBitsLength(this.data.length);
};
La.prototype.write = function(e) {
  let A;
  for (A = 0; A < this.data.length; A++) {
    let t = rx.toSJIS(this.data[A]);
    if (t >= 33088 && t <= 40956)
      t -= 33088;
    else if (t >= 57408 && t <= 60351)
      t -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[A] + `
Make sure your charset is UTF-8`
      );
    t = (t >>> 8 & 255) * 192 + (t & 255), e.put(t, 13);
  }
};
var nx = La, Yg = { exports: {} };
(function(e) {
  var A = {
    single_source_shortest_paths: function(t, r, n) {
      var i = {}, a = {};
      a[r] = 0;
      var l = A.PriorityQueue.make();
      l.push(r, 0);
      for (var s, f, g, p, w, d, C, b, _; !l.empty(); ) {
        s = l.pop(), f = s.value, p = s.cost, w = t[f] || {};
        for (g in w)
          w.hasOwnProperty(g) && (d = w[g], C = p + d, b = a[g], _ = typeof a[g] > "u", (_ || b > C) && (a[g] = C, l.push(g, C), i[g] = f));
      }
      if (typeof n < "u" && typeof a[n] > "u") {
        var m = ["Could not find a path from ", r, " to ", n, "."].join("");
        throw new Error(m);
      }
      return i;
    },
    extract_shortest_path_from_predecessor_list: function(t, r) {
      for (var n = [], i = r; i; )
        n.push(i), t[i], i = t[i];
      return n.reverse(), n;
    },
    find_path: function(t, r, n) {
      var i = A.single_source_shortest_paths(t, r, n);
      return A.extract_shortest_path_from_predecessor_list(
        i,
        n
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(t) {
        var r = A.PriorityQueue, n = {}, i;
        t = t || {};
        for (i in r)
          r.hasOwnProperty(i) && (n[i] = r[i]);
        return n.queue = [], n.sorter = t.sorter || r.default_sorter, n;
      },
      default_sorter: function(t, r) {
        return t.cost - r.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(t, r) {
        var n = { value: t, cost: r };
        this.queue.push(n), this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  e.exports = A;
})(Yg);
var ix = Yg.exports;
(function(e) {
  const A = $n, t = JE, r = ZE, n = ex, i = nx, a = Zr, l = Zt, s = ix;
  function f(m) {
    return unescape(encodeURIComponent(m)).length;
  }
  function g(m, y, H) {
    const O = [];
    let P;
    for (; (P = m.exec(H)) !== null; )
      O.push({
        data: P[0],
        index: P.index,
        mode: y,
        length: P[0].length
      });
    return O;
  }
  function p(m) {
    const y = g(a.NUMERIC, A.NUMERIC, m), H = g(a.ALPHANUMERIC, A.ALPHANUMERIC, m);
    let O, P;
    return l.isKanjiModeEnabled() ? (O = g(a.BYTE, A.BYTE, m), P = g(a.KANJI, A.KANJI, m)) : (O = g(a.BYTE_KANJI, A.BYTE, m), P = []), y.concat(H, O, P).sort(function(W, D) {
      return W.index - D.index;
    }).map(function(W) {
      return {
        data: W.data,
        mode: W.mode,
        length: W.length
      };
    });
  }
  function w(m, y) {
    switch (y) {
      case A.NUMERIC:
        return t.getBitsLength(m);
      case A.ALPHANUMERIC:
        return r.getBitsLength(m);
      case A.KANJI:
        return i.getBitsLength(m);
      case A.BYTE:
        return n.getBitsLength(m);
    }
  }
  function d(m) {
    return m.reduce(function(y, H) {
      const O = y.length - 1 >= 0 ? y[y.length - 1] : null;
      return O && O.mode === H.mode ? (y[y.length - 1].data += H.data, y) : (y.push(H), y);
    }, []);
  }
  function C(m) {
    const y = [];
    for (let H = 0; H < m.length; H++) {
      const O = m[H];
      switch (O.mode) {
        case A.NUMERIC:
          y.push([
            O,
            { data: O.data, mode: A.ALPHANUMERIC, length: O.length },
            { data: O.data, mode: A.BYTE, length: O.length }
          ]);
          break;
        case A.ALPHANUMERIC:
          y.push([
            O,
            { data: O.data, mode: A.BYTE, length: O.length }
          ]);
          break;
        case A.KANJI:
          y.push([
            O,
            { data: O.data, mode: A.BYTE, length: f(O.data) }
          ]);
          break;
        case A.BYTE:
          y.push([
            { data: O.data, mode: A.BYTE, length: f(O.data) }
          ]);
      }
    }
    return y;
  }
  function b(m, y) {
    const H = {}, O = { start: {} };
    let P = ["start"];
    for (let q = 0; q < m.length; q++) {
      const W = m[q], D = [];
      for (let R = 0; R < W.length; R++) {
        const Y = W[R], x = "" + q + R;
        D.push(x), H[x] = { node: Y, lastCount: 0 }, O[x] = {};
        for (let I = 0; I < P.length; I++) {
          const j = P[I];
          H[j] && H[j].node.mode === Y.mode ? (O[j][x] = w(H[j].lastCount + Y.length, Y.mode) - w(H[j].lastCount, Y.mode), H[j].lastCount += Y.length) : (H[j] && (H[j].lastCount = Y.length), O[j][x] = w(Y.length, Y.mode) + 4 + A.getCharCountIndicator(Y.mode, y));
        }
      }
      P = D;
    }
    for (let q = 0; q < P.length; q++)
      O[P[q]].end = 0;
    return { map: O, table: H };
  }
  function _(m, y) {
    let H;
    const O = A.getBestModeForData(m);
    if (H = A.from(y, O), H !== A.BYTE && H.bit < O.bit)
      throw new Error('"' + m + '" cannot be encoded with mode ' + A.toString(H) + `.
 Suggested mode is: ` + A.toString(O));
    switch (H === A.KANJI && !l.isKanjiModeEnabled() && (H = A.BYTE), H) {
      case A.NUMERIC:
        return new t(m);
      case A.ALPHANUMERIC:
        return new r(m);
      case A.KANJI:
        return new i(m);
      case A.BYTE:
        return new n(m);
    }
  }
  e.fromArray = function(y) {
    return y.reduce(function(H, O) {
      return typeof O == "string" ? H.push(_(O, null)) : O.data && H.push(_(O.data, O.mode)), H;
    }, []);
  }, e.fromString = function(y, H) {
    const O = p(y, l.isKanjiModeEnabled()), P = C(O), q = b(P, H), W = s.find_path(q.map, "start", "end"), D = [];
    for (let R = 1; R < W.length - 1; R++)
      D.push(q.table[W[R]].node);
    return e.fromArray(d(D));
  }, e.rawSplit = function(y) {
    return e.fromArray(
      p(y, l.isKanjiModeEnabled())
    );
  };
})(Jg);
const gu = Zt, Rc = fu, ax = ME, ox = RE, sx = Kg, lx = jg, Sf = Gg, If = hu, ux = jE, Ml = qg, cx = Xg, fx = $n, Kc = Jg;
function hx(e, A) {
  const t = e.size, r = lx.getPositions(A);
  for (let n = 0; n < r.length; n++) {
    const i = r[n][0], a = r[n][1];
    for (let l = -1; l <= 7; l++)
      if (!(i + l <= -1 || t <= i + l))
        for (let s = -1; s <= 7; s++)
          a + s <= -1 || t <= a + s || (l >= 0 && l <= 6 && (s === 0 || s === 6) || s >= 0 && s <= 6 && (l === 0 || l === 6) || l >= 2 && l <= 4 && s >= 2 && s <= 4 ? e.set(i + l, a + s, !0, !0) : e.set(i + l, a + s, !1, !0));
  }
}
function dx(e) {
  const A = e.size;
  for (let t = 8; t < A - 8; t++) {
    const r = t % 2 === 0;
    e.set(t, 6, r, !0), e.set(6, t, r, !0);
  }
}
function gx(e, A) {
  const t = sx.getPositions(A);
  for (let r = 0; r < t.length; r++) {
    const n = t[r][0], i = t[r][1];
    for (let a = -2; a <= 2; a++)
      for (let l = -2; l <= 2; l++)
        a === -2 || a === 2 || l === -2 || l === 2 || a === 0 && l === 0 ? e.set(n + a, i + l, !0, !0) : e.set(n + a, i + l, !1, !0);
  }
}
function px(e, A) {
  const t = e.size, r = Ml.getEncodedBits(A);
  let n, i, a;
  for (let l = 0; l < 18; l++)
    n = Math.floor(l / 3), i = l % 3 + t - 8 - 3, a = (r >> l & 1) === 1, e.set(n, i, a, !0), e.set(i, n, a, !0);
}
function jc(e, A, t) {
  const r = e.size, n = cx.getEncodedBits(A, t);
  let i, a;
  for (i = 0; i < 15; i++)
    a = (n >> i & 1) === 1, i < 6 ? e.set(i, 8, a, !0) : i < 8 ? e.set(i + 1, 8, a, !0) : e.set(r - 15 + i, 8, a, !0), i < 8 ? e.set(8, r - i - 1, a, !0) : i < 9 ? e.set(8, 15 - i - 1 + 1, a, !0) : e.set(8, 15 - i - 1, a, !0);
  e.set(r - 8, 8, 1, !0);
}
function Bx(e, A) {
  const t = e.size;
  let r = -1, n = t - 1, i = 7, a = 0;
  for (let l = t - 1; l > 0; l -= 2)
    for (l === 6 && l--; ; ) {
      for (let s = 0; s < 2; s++)
        if (!e.isReserved(n, l - s)) {
          let f = !1;
          a < A.length && (f = (A[a] >>> i & 1) === 1), e.set(n, l - s, f), i--, i === -1 && (a++, i = 7);
        }
      if (n += r, n < 0 || t <= n) {
        n -= r, r = -r;
        break;
      }
    }
}
function wx(e, A, t) {
  const r = new ax();
  t.forEach(function(s) {
    r.put(s.mode.bit, 4), r.put(s.getLength(), fx.getCharCountIndicator(s.mode, e)), s.write(r);
  });
  const n = gu.getSymbolTotalCodewords(e), i = If.getTotalCodewordsCount(e, A), a = (n - i) * 8;
  for (r.getLengthInBits() + 4 <= a && r.put(0, 4); r.getLengthInBits() % 8 !== 0; )
    r.putBit(0);
  const l = (a - r.getLengthInBits()) / 8;
  for (let s = 0; s < l; s++)
    r.put(s % 2 ? 17 : 236, 8);
  return vx(r, e, A);
}
function vx(e, A, t) {
  const r = gu.getSymbolTotalCodewords(A), n = If.getTotalCodewordsCount(A, t), i = r - n, a = If.getBlocksCount(A, t), l = r % a, s = a - l, f = Math.floor(r / a), g = Math.floor(i / a), p = g + 1, w = f - g, d = new ux(w);
  let C = 0;
  const b = new Array(a), _ = new Array(a);
  let m = 0;
  const y = new Uint8Array(e.buffer);
  for (let W = 0; W < a; W++) {
    const D = W < s ? g : p;
    b[W] = y.slice(C, C + D), _[W] = d.encode(b[W]), C += D, m = Math.max(m, D);
  }
  const H = new Uint8Array(r);
  let O = 0, P, q;
  for (P = 0; P < m; P++)
    for (q = 0; q < a; q++)
      P < b[q].length && (H[O++] = b[q][P]);
  for (P = 0; P < w; P++)
    for (q = 0; q < a; q++)
      H[O++] = _[q][P];
  return H;
}
function mx(e, A, t, r) {
  let n;
  if (Array.isArray(e))
    n = Kc.fromArray(e);
  else if (typeof e == "string") {
    let f = A;
    if (!f) {
      const g = Kc.rawSplit(e);
      f = Ml.getBestVersionForData(g, t);
    }
    n = Kc.fromString(e, f || 40);
  } else
    throw new Error("Invalid data");
  const i = Ml.getBestVersionForData(n, t);
  if (!i)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!A)
    A = i;
  else if (A < i)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + i + `.
`
    );
  const a = wx(A, t, n), l = gu.getSymbolSize(A), s = new ox(l);
  return hx(s, A), dx(s), gx(s, A), jc(s, t, 0), A >= 7 && px(s, A), Bx(s, a), isNaN(r) && (r = Sf.getBestMask(
    s,
    jc.bind(null, s, t)
  )), Sf.applyMask(r, s), jc(s, t, r), {
    modules: s,
    version: A,
    errorCorrectionLevel: t,
    maskPattern: r,
    segments: n
  };
}
Mg.create = function(A, t) {
  if (typeof A > "u" || A === "")
    throw new Error("No input text");
  let r = Rc.M, n, i;
  return typeof t < "u" && (r = Rc.from(t.errorCorrectionLevel, Rc.M), n = Ml.from(t.version), i = Sf.from(t.maskPattern), t.toSJISFunc && gu.setToSJISFunction(t.toSJISFunc)), mx(A, n, r, i);
};
var Zg = {}, Qh = {};
(function(e) {
  function A(t) {
    if (typeof t == "number" && (t = t.toString()), typeof t != "string")
      throw new Error("Color should be defined as hex string");
    let r = t.slice().replace("#", "").split("");
    if (r.length < 3 || r.length === 5 || r.length > 8)
      throw new Error("Invalid hex color: " + t);
    (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(i) {
      return [i, i];
    }))), r.length === 6 && r.push("F", "F");
    const n = parseInt(r.join(""), 16);
    return {
      r: n >> 24 & 255,
      g: n >> 16 & 255,
      b: n >> 8 & 255,
      a: n & 255,
      hex: "#" + r.slice(0, 6).join("")
    };
  }
  e.getOptions = function(r) {
    r || (r = {}), r.color || (r.color = {});
    const n = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin, i = r.width && r.width >= 21 ? r.width : void 0, a = r.scale || 4;
    return {
      width: i,
      scale: i ? 4 : a,
      margin: n,
      color: {
        dark: A(r.color.dark || "#000000ff"),
        light: A(r.color.light || "#ffffffff")
      },
      type: r.type,
      rendererOpts: r.rendererOpts || {}
    };
  }, e.getScale = function(r, n) {
    return n.width && n.width >= r + n.margin * 2 ? n.width / (r + n.margin * 2) : n.scale;
  }, e.getImageWidth = function(r, n) {
    const i = e.getScale(r, n);
    return Math.floor((r + n.margin * 2) * i);
  }, e.qrToImageData = function(r, n, i) {
    const a = n.modules.size, l = n.modules.data, s = e.getScale(a, i), f = Math.floor((a + i.margin * 2) * s), g = i.margin * s, p = [i.color.light, i.color.dark];
    for (let w = 0; w < f; w++)
      for (let d = 0; d < f; d++) {
        let C = (w * f + d) * 4, b = i.color.light;
        if (w >= g && d >= g && w < f - g && d < f - g) {
          const _ = Math.floor((w - g) / s), m = Math.floor((d - g) / s);
          b = p[l[_ * a + m] ? 1 : 0];
        }
        r[C++] = b.r, r[C++] = b.g, r[C++] = b.b, r[C] = b.a;
      }
  };
})(Qh);
(function(e) {
  const A = Qh;
  function t(n, i, a) {
    n.clearRect(0, 0, i.width, i.height), i.style || (i.style = {}), i.height = a, i.width = a, i.style.height = a + "px", i.style.width = a + "px";
  }
  function r() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  e.render = function(i, a, l) {
    let s = l, f = a;
    typeof s > "u" && (!a || !a.getContext) && (s = a, a = void 0), a || (f = r()), s = A.getOptions(s);
    const g = A.getImageWidth(i.modules.size, s), p = f.getContext("2d"), w = p.createImageData(g, g);
    return A.qrToImageData(w.data, i, s), t(p, f, g), p.putImageData(w, 0, 0), f;
  }, e.renderToDataURL = function(i, a, l) {
    let s = l;
    typeof s > "u" && (!a || !a.getContext) && (s = a, a = void 0), s || (s = {});
    const f = e.render(i, a, s), g = s.type || "image/png", p = s.rendererOpts || {};
    return f.toDataURL(g, p.quality);
  };
})(Zg);
var Ap = {};
const yx = Qh;
function kd(e, A) {
  const t = e.a / 255, r = A + '="' + e.hex + '"';
  return t < 1 ? r + " " + A + '-opacity="' + t.toFixed(2).slice(1) + '"' : r;
}
function Gc(e, A, t) {
  let r = e + A;
  return typeof t < "u" && (r += " " + t), r;
}
function bx(e, A, t) {
  let r = "", n = 0, i = !1, a = 0;
  for (let l = 0; l < e.length; l++) {
    const s = Math.floor(l % A), f = Math.floor(l / A);
    !s && !i && (i = !0), e[l] ? (a++, l > 0 && s > 0 && e[l - 1] || (r += i ? Gc("M", s + t, 0.5 + f + t) : Gc("m", n, 0), n = 0, i = !1), s + 1 < A && e[l + 1] || (r += Gc("h", a), a = 0)) : n++;
  }
  return r;
}
Ap.render = function(A, t, r) {
  const n = yx.getOptions(t), i = A.modules.size, a = A.modules.data, l = i + n.margin * 2, s = n.color.light.a ? "<path " + kd(n.color.light, "fill") + ' d="M0 0h' + l + "v" + l + 'H0z"/>' : "", f = "<path " + kd(n.color.dark, "stroke") + ' d="' + bx(a, i, n.margin) + '"/>', g = 'viewBox="0 0 ' + l + " " + l + '"', w = '<svg xmlns="http://www.w3.org/2000/svg" ' + (n.width ? 'width="' + n.width + '" height="' + n.width + '" ' : "") + g + ' shape-rendering="crispEdges">' + s + f + `</svg>
`;
  return typeof r == "function" && r(null, w), w;
};
const Cx = kE, _f = Mg, ep = Zg, Fx = Ap;
function Uh(e, A, t, r, n) {
  const i = [].slice.call(arguments, 1), a = i.length, l = typeof i[a - 1] == "function";
  if (!l && !Cx())
    throw new Error("Callback required as last argument");
  if (l) {
    if (a < 2)
      throw new Error("Too few arguments provided");
    a === 2 ? (n = t, t = A, A = r = void 0) : a === 3 && (A.getContext && typeof n > "u" ? (n = r, r = void 0) : (n = r, r = t, t = A, A = void 0));
  } else {
    if (a < 1)
      throw new Error("Too few arguments provided");
    return a === 1 ? (t = A, A = r = void 0) : a === 2 && !A.getContext && (r = t, t = A, A = void 0), new Promise(function(s, f) {
      try {
        const g = _f.create(t, r);
        s(e(g, A, r));
      } catch (g) {
        f(g);
      }
    });
  }
  try {
    const s = _f.create(t, r);
    n(null, e(s, A, r));
  } catch (s) {
    n(s);
  }
}
Qa.create = _f.create;
Qa.toCanvas = Uh.bind(null, ep.render);
Qa.toDataURL = Uh.bind(null, ep.renderToDataURL);
Qa.toString = Uh.bind(null, function(e, A, t) {
  return Fx.render(e, t);
});
const Qx = {
  name: "RoyQRCode",
  props: {
    element: {
      type: Object,
      required: !0
    },
    selected: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["select", "update", "delete"],
  setup(e, { emit: A }) {
    const t = ye(null), r = gn(() => ({
      position: "absolute",
      left: `${e.element.x}px`,
      top: `${e.element.y}px`,
      width: `${e.element.width}px`,
      height: `${e.element.height}px`,
      border: e.selected ? "2px solid #007bff" : "2px dashed transparent",
      zIndex: e.selected ? 1e3 : 1
    })), n = () => {
      pa(() => {
        if (!t.value) return;
        const O = Math.min(
          e.element.width - 4,
          e.element.height - (e.element.showText ? 20 : 0) - 4
        ), P = {
          width: O,
          height: O,
          margin: e.element.margin || 1,
          color: {
            dark: e.element.foregroundColor || "#000000",
            light: e.element.backgroundColor || "#ffffff"
          },
          errorCorrectionLevel: e.element.errorCorrectionLevel || "M"
        };
        Qa.toCanvas(
          t.value,
          e.element.value || "Sample QR Code",
          P
        ).catch((q) => {
          console.warn("Failed to generate QR code:", q), Qa.toCanvas(
            t.value,
            "Error generating QR code",
            { ...P, width: O, height: O }
          ).catch((W) => {
            console.error("Failed to generate fallback QR code:", W);
          });
        });
      });
    };
    let i = !1, a = !1, l = "", s = 0, f = 0, g = 0, p = 0, w = 0, d = 0;
    const C = (O) => {
      O.target.classList.contains("resize-handle") || (i = !0, s = O.clientX, f = O.clientY, g = e.element.x, p = e.element.y, document.addEventListener("mousemove", b), document.addEventListener("mouseup", _), O.preventDefault());
    }, b = (O) => {
      if (!i) return;
      const P = O.clientX - s, q = O.clientY - f;
      e.element.x = Math.max(0, g + P), e.element.y = Math.max(0, p + q), A("update");
    }, _ = () => {
      i = !1, document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", _);
    }, m = (O) => {
      a = !0, l = O, s = event.clientX, f = event.clientY, g = e.element.x, p = e.element.y, w = e.element.width, d = e.element.height, document.addEventListener("mousemove", y), document.addEventListener("mouseup", H), event.preventDefault();
    }, y = (O) => {
      if (!a) return;
      const P = O.clientX - s, q = O.clientY - f;
      let W = g, D = p, R = w, Y = d;
      l.includes("n") && (D = p + q, Y = d - q), l.includes("s") && (Y = d + q), l.includes("w") && (W = g + P, R = w - P), l.includes("e") && (R = w + P), R >= 50 && Y >= 50 && (e.element.x = Math.max(0, W), e.element.y = Math.max(0, D), e.element.width = R, e.element.height = Y, A("update"));
    }, H = () => {
      a = !1, l = "", document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", H), n();
    };
    return Nf(() => {
      n();
    }), Rl(
      () => [
        e.element.value,
        e.element.foregroundColor,
        e.element.backgroundColor,
        e.element.errorCorrectionLevel,
        e.element.margin,
        e.element.width,
        e.element.height,
        e.element.showText
      ],
      () => {
        n();
      },
      { deep: !0 }
    ), {
      qrcodeCanvas: t,
      elementStyle: r,
      startDrag: C,
      startResize: m
    };
  }
}, Ux = { class: "qrcode-container" }, Ex = {
  ref: "qrcodeCanvas",
  class: "qrcode-canvas"
}, xx = {
  key: 0,
  class: "qrcode-text"
};
function Lx(e, A, t, r, n, i) {
  return IA(), _A("div", {
    class: "roy-qrcode",
    style: Be(r.elementStyle),
    onMousedown: A[4] || (A[4] = (...a) => r.startDrag && r.startDrag(...a)),
    onClick: A[5] || (A[5] = Ge((a) => e.$emit("select", t.element), ["stop"]))
  }, [
    T("div", Ux, [
      T("canvas", Ex, null, 512),
      t.element.showText ? (IA(), _A("div", xx, nt(t.element.value), 1)) : de("", !0)
    ]),
    t.selected ? (IA(), _A(Nt, { key: 0 }, [
      T("div", {
        class: "resize-handle nw",
        onMousedown: A[0] || (A[0] = Ge((a) => r.startResize("nw"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle ne",
        onMousedown: A[1] || (A[1] = Ge((a) => r.startResize("ne"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle sw",
        onMousedown: A[2] || (A[2] = Ge((a) => r.startResize("sw"), ["stop"]))
      }, null, 32),
      T("div", {
        class: "resize-handle se",
        onMousedown: A[3] || (A[3] = Ge((a) => r.startResize("se"), ["stop"]))
      }, null, 32)
    ], 64)) : de("", !0)
  ], 36);
}
const Sx = /* @__PURE__ */ vi(Qx, [["render", Lx], ["__scopeId", "data-v-b0653319"]]);
function Nx() {
  const e = ye([]), A = ye(null), t = ye({}), r = ye([
    {
      name: "👨‍💼 Staff Details",
      items: [
        { type: "placeholder", content: "{employee_name}", icon: "👤", label: "Employee Name" },
        { type: "placeholder", content: "{employee_id}", icon: "🆔", label: "Employee ID" },
        { type: "placeholder", content: "{position}", icon: "💼", label: "Position" },
        { type: "placeholder", content: "{department}", icon: "🏢", label: "Department" },
        { type: "placeholder", content: "{start_date}", icon: "📅", label: "Start Date" },
        { type: "placeholder", content: "{email}", icon: "📧", label: "Email" },
        { type: "placeholder", content: "{phone}", icon: "📞", label: "Phone" },
        { type: "placeholder", content: "{address}", icon: "🏠", label: "Address" }
      ]
    },
    {
      name: "💸 Compensation Package",
      items: [
        { type: "placeholder", content: "{salary}", icon: "💰", label: "Salary" },
        { type: "placeholder", content: "{hourly_rate}", icon: "⏰", label: "Hourly Rate" },
        { type: "placeholder", content: "{bonus}", icon: "🎁", label: "Bonus" },
        { type: "placeholder", content: "{benefits}", icon: "🏥", label: "Benefits" },
        { type: "placeholder", content: "{vacation_days}", icon: "🌴", label: "Vacation Days" },
        { type: "placeholder", content: "{sick_days}", icon: "🏥", label: "Sick Days" }
      ]
    },
    {
      name: "🏭 Organization Info",
      items: [
        { type: "placeholder", content: "{company_name}", icon: "🏢", label: "Company Name" },
        { type: "placeholder", content: "{company_address}", icon: "📍", label: "Company Address" },
        { type: "placeholder", content: "{hr_contact}", icon: "👥", label: "HR Contact" },
        { type: "placeholder", content: "{manager_name}", icon: "👨‍💼", label: "Manager Name" },
        { type: "placeholder", content: "{company_phone}", icon: "📞", label: "Company Phone" },
        { type: "placeholder", content: "{company_email}", icon: "📧", label: "Company Email" }
      ]
    },
    {
      name: "📊 Performance Metrics",
      items: [
        { type: "placeholder", content: "{review_date}", icon: "📅", label: "Review Date" },
        { type: "placeholder", content: "{next_review}", icon: "⏭️", label: "Next Review" },
        { type: "placeholder", content: "{performance_rating}", icon: "⭐", label: "Performance Rating" },
        { type: "placeholder", content: "{goals}", icon: "🎯", label: "Goals" },
        { type: "placeholder", content: "{training_completed}", icon: "🎓", label: "Training Completed" },
        { type: "placeholder", content: "{certifications}", icon: "📜", label: "Certifications" }
      ]
    },
    {
      name: "🖼️ Media Assets",
      items: [
        { type: "image-placeholder", content: "{{employee_image}}", icon: "👤", label: "{{employee_image}}" },
        { type: "image-placeholder", content: "{{company_logo}}", icon: "🏢", label: "{{company_logo}}" },
        { type: "image-placeholder", content: "{{signature_image}}", icon: "✍️", label: "{{signature_image}}" },
        { type: "image", content: "upload", icon: "📁", label: "Upload Image" },
        { type: "image", content: "url", icon: "🌐", label: "Image from URL" }
      ]
    },
    {
      name: "⚡ Quick Labels",
      items: [
        { type: "text", content: "EMPLOYEE RECORD", icon: "📄", label: '"EMPLOYEE RECORD" Title' },
        { type: "text", content: "PERFORMANCE REVIEW", icon: "📋", label: '"PERFORMANCE REVIEW" Title' },
        { type: "text", content: "JOB OFFER LETTER", icon: "💼", label: '"JOB OFFER LETTER" Title' },
        { type: "text", content: "EMPLOYEE HANDBOOK", icon: "📚", label: '"EMPLOYEE HANDBOOK" Title' },
        { type: "text", content: "Employee Details:", icon: "👤", label: '"Employee Details:" Label' },
        { type: "text", content: "Department:", icon: "🏢", label: '"Department:" Label' },
        { type: "text", content: "Salary:", icon: "💰", label: '"Salary:" Label' },
        { type: "text", content: "HR Manager:", icon: "👥", label: '"HR Manager:" Label' },
        { type: "text", content: "Date:", icon: "📅", label: '"Date:" Label' },
        { type: "text", content: "Signature:", icon: "✍️", label: '"Signature:" Label' }
      ]
    }
  ]), n = ye([
    {
      id: "employee_001",
      name: "John Doe - Software Engineer",
      data: {
        employee_name: "John Doe",
        employee_id: "EMP001",
        position: "Senior Software Engineer",
        department: "Engineering",
        start_date: "2023-01-15",
        email: "john.doe@company.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
        salary: "$95,000",
        hourly_rate: "$45.67",
        bonus: "$5,000",
        benefits: "Health, Dental, Vision, 401k",
        vacation_days: "15 days",
        sick_days: "10 days",
        company_name: "TechCorp Solutions",
        company_address: "456 Business Ave, Suite 100, City, State 12345",
        hr_contact: "Sarah Johnson",
        manager_name: "Mike Wilson",
        company_phone: "+1 (555) 987-6543",
        company_email: "hr@techcorp.com",
        review_date: "2024-01-15",
        next_review: "2025-01-15",
        performance_rating: "4.5/5.0",
        goals: "Lead frontend development, Mentor junior developers",
        training_completed: "React Advanced, AWS Certification",
        certifications: "AWS Solutions Architect"
      }
    },
    {
      id: "employee_002",
      name: "Jane Smith - Marketing Manager",
      data: {
        employee_name: "Jane Smith",
        employee_id: "EMP002",
        position: "Marketing Manager",
        department: "Marketing",
        start_date: "2022-03-10",
        email: "jane.smith@company.com",
        phone: "+1 (555) 234-5678",
        address: "789 Oak Street, City, State 12345",
        salary: "$75,000",
        hourly_rate: "$36.06",
        bonus: "$3,500",
        benefits: "Health, Dental, Vision, 401k",
        vacation_days: "20 days",
        sick_days: "12 days",
        company_name: "TechCorp Solutions",
        company_address: "456 Business Ave, Suite 100, City, State 12345",
        hr_contact: "Sarah Johnson",
        manager_name: "Lisa Chen",
        company_phone: "+1 (555) 987-6543",
        company_email: "hr@techcorp.com",
        review_date: "2024-03-10",
        next_review: "2025-03-10",
        performance_rating: "4.2/5.0",
        goals: "Increase brand awareness, Launch new campaigns",
        training_completed: "Digital Marketing Certification, Google Analytics",
        certifications: "Google Ads Certified, HubSpot Certified"
      }
    }
  ]), i = (m, y = "manual") => {
    const H = {
      id: Date.now().toString(),
      name: m,
      type: y,
      // 'manual', 'json', 'csv', 'api'
      fields: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return e.value.push(H), H;
  }, a = (m, y) => {
    const H = e.value.find((O) => O.id === m);
    H && H.fields.push({
      id: Date.now().toString(),
      ...y
    });
  }, l = (m, y, H) => {
    const O = e.value.find((P) => P.id === m);
    if (O) {
      const P = O.fields.find((q) => q.id === y);
      P && Object.assign(P, H);
    }
  }, s = (m, y) => {
    const H = e.value.find((O) => O.id === m);
    if (H) {
      const O = H.fields.findIndex((P) => P.id === y);
      O > -1 && H.fields.splice(O, 1);
    }
  }, f = (m) => {
    t.value = m || {};
  }, g = (m, y = t.value) => {
    if (!m || !y) return m;
    const H = JSON.parse(JSON.stringify(m));
    return H.elements = H.elements.map((O) => ((O.type === "text" || O.type === "formatted-text") && (O.content = p(O.content, y)), O)), H;
  }, p = (m, y = t.value) => !m || !y ? m : m.replace(/\{(\w+)\}/g, (H, O) => y[O] || H), w = gn(() => {
    const m = [];
    return r.value.forEach((y) => {
      y.items.forEach((H) => {
        H.type === "placeholder" && m.push({
          key: H.content.replace(/[{}]/g, ""),
          label: H.label,
          category: y.name,
          icon: H.icon
        });
      });
    }), m;
  });
  return {
    // Data sources
    dataSources: e,
    currentDataSource: A,
    currentDataSet: t,
    sampleDataSets: n,
    customPlaceholders: r,
    // Data source management
    createDataSource: i,
    addFieldToDataSource: a,
    updateFieldInDataSource: l,
    removeFieldFromDataSource: s,
    // Data set management
    setCurrentDataSet: f,
    processTemplateWithData: g,
    replacePlaceholders: p,
    getAvailablePlaceholders: w,
    // Import/Export
    importDataFromJSON: (m) => {
      try {
        const y = typeof m == "string" ? JSON.parse(m) : m;
        return Array.isArray(y) ? y.forEach((H, O) => {
          n.value.push({
            id: `imported_${Date.now()}_${O}`,
            name: `Imported Dataset ${O + 1}`,
            data: H
          });
        }) : n.value.push({
          id: `imported_${Date.now()}`,
          name: "Imported Dataset",
          data: y
        }), !0;
      } catch (y) {
        return console.error("Failed to import JSON data:", y), !1;
      }
    },
    importDataFromCSV: (m) => {
      try {
        const y = m.split(`
`).filter((O) => O.trim());
        if (y.length < 2) return !1;
        const H = y[0].split(",").map((O) => O.trim().replace(/"/g, ""));
        return y.slice(1).forEach((O, P) => {
          const q = O.split(",").map((D) => D.trim().replace(/"/g, "")), W = {};
          H.forEach((D, R) => {
            W[D] = q[R] || "";
          }), n.value.push({
            id: `csv_import_${Date.now()}_${P}`,
            name: `CSV Row ${P + 1}`,
            data: W
          });
        }), !0;
      } catch (y) {
        return console.error("Failed to import CSV data:", y), !1;
      }
    },
    exportDataSet: (m) => {
      const y = n.value.find((H) => H.id === m);
      if (y) {
        const H = JSON.stringify(y.data, null, 2), O = new Blob([H], { type: "application/json" }), P = URL.createObjectURL(O), q = document.createElement("a");
        q.href = P, q.download = `${y.name.replace(/\s+/g, "_")}.json`, document.body.appendChild(q), q.click(), document.body.removeChild(q), URL.revokeObjectURL(P);
      }
    },
    // Initialization
    initializeDataSources: () => {
      const m = i("Employee Records", "manual");
      [
        { name: "employee_name", type: "text", label: "Employee Name" },
        { name: "employee_id", type: "text", label: "Employee ID" },
        { name: "position", type: "text", label: "Position" },
        { name: "department", type: "text", label: "Department" },
        { name: "salary", type: "currency", label: "Salary" },
        { name: "start_date", type: "date", label: "Start Date" }
      ].forEach((H) => {
        a(m.id, H);
      }), A.value = m;
    }
  };
}
function Hx() {
  const e = ye([]), A = ye(null), t = (w, d = null) => {
    const C = d || `Template ${e.value.length + 1}`, b = (/* @__PURE__ */ new Date()).toISOString(), _ = {
      id: Date.now().toString(),
      name: C,
      template: JSON.parse(JSON.stringify(w)),
      createdAt: b,
      updatedAt: b
    };
    return e.value.push(_), A.value = _, s(), _;
  }, r = (w) => {
    const d = e.value.find((C) => C.id === w);
    return d ? (A.value = d, d.template) : null;
  }, n = (w, d) => {
    const C = e.value.findIndex((b) => b.id === w);
    return C > -1 ? (e.value[C].template = JSON.parse(JSON.stringify(d)), e.value[C].updatedAt = (/* @__PURE__ */ new Date()).toISOString(), s(), e.value[C]) : null;
  }, i = (w) => {
    var C;
    const d = e.value.findIndex((b) => b.id === w);
    return d > -1 ? (e.value.splice(d, 1), ((C = A.value) == null ? void 0 : C.id) === w && (A.value = null), s(), !0) : !1;
  }, a = (w) => {
    const d = e.value.find((C) => C.id === w);
    if (d) {
      const C = JSON.stringify(d, null, 2), b = new Blob([C], { type: "application/json" }), _ = document.createElement("a");
      return _.href = URL.createObjectURL(b), _.download = `${d.name.replace(/\s+/g, "_")}.json`, document.body.appendChild(_), _.click(), document.body.removeChild(_), !0;
    }
    return !1;
  }, l = (w) => new Promise((d, C) => {
    const b = new FileReader();
    b.onload = (_) => {
      try {
        const m = JSON.parse(_.target.result);
        if (m.template && m.name) {
          const y = t(m.template, `${m.name} (Imported)`);
          d(y);
        } else
          C(new Error("Invalid template file format"));
      } catch {
        C(new Error("Failed to parse template file"));
      }
    }, b.onerror = () => {
      C(new Error("Failed to read file"));
    }, b.readAsText(w);
  }), s = () => {
    try {
      localStorage.setItem("ptd_templates", JSON.stringify(e.value));
    } catch (w) {
      console.warn("Failed to save templates to localStorage:", w);
    }
  }, f = () => {
    try {
      const w = localStorage.getItem("ptd_templates");
      w && (e.value = JSON.parse(w));
    } catch (w) {
      console.warn("Failed to load templates from localStorage:", w), e.value = [];
    }
  }, g = () => {
    const w = {
      elements: [
        {
          id: 1,
          type: "text",
          x: 50,
          y: 50,
          width: 200,
          height: 40,
          content: "INVOICE",
          fontSize: 24,
          color: "#000000",
          fontWeight: "bold"
        },
        {
          id: 2,
          type: "text",
          x: 50,
          y: 120,
          width: 150,
          height: 25,
          content: "Invoice #: 12345",
          fontSize: 14,
          color: "#000000"
        },
        {
          id: 3,
          type: "text",
          x: 50,
          y: 150,
          width: 150,
          height: 25,
          content: "Date: 2024-01-15",
          fontSize: 14,
          color: "#000000"
        },
        {
          id: 4,
          type: "image",
          x: 400,
          y: 50,
          width: 120,
          height: 80,
          content: "",
          src: "https://via.placeholder.com/120x80/007bff/white?text=LOGO"
        },
        {
          id: 5,
          type: "rect",
          x: 50,
          y: 200,
          width: 500,
          height: 200,
          fillColor: "#ffffff",
          strokeColor: "#000000",
          strokeWidth: 2,
          strokeStyle: "solid"
        },
        {
          id: 6,
          type: "table",
          x: 60,
          y: 220,
          width: 480,
          height: 160,
          rows: 4,
          cols: 4,
          cellPadding: 8,
          borderColor: "#000000",
          borderWidth: 1,
          borderStyle: "solid",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          fontSize: 12,
          textAlign: "left",
          verticalAlign: "top",
          data: [
            ["Item", "Description", "Qty", "Amount"],
            ["Service 1", "Consulting", "10 hrs", "$1,500"],
            ["Service 2", "Development", "20 hrs", "$3,000"],
            ["", "", "Total:", "$4,500"]
          ],
          mergedCells: {}
        }
      ],
      pageSize: "a4"
    }, d = {
      elements: [
        {
          id: 1,
          type: "text",
          x: 30,
          y: 30,
          width: 180,
          height: 60,
          content: `Product Name
SKU: ABC123`,
          fontSize: 16,
          color: "#000000"
        },
        {
          id: 2,
          type: "image",
          x: 250,
          y: 30,
          width: 100,
          height: 60,
          content: "",
          src: "https://via.placeholder.com/100x60/28a745/white?text=QR"
        },
        {
          id: 3,
          type: "rect",
          x: 20,
          y: 20,
          width: 350,
          height: 80,
          fillColor: "transparent",
          strokeColor: "#007bff",
          strokeWidth: 2,
          strokeStyle: "dashed"
        },
        {
          id: 4,
          type: "line",
          x: 30,
          y: 110,
          width: 330,
          height: 2,
          strokeColor: "#28a745",
          strokeWidth: 1,
          strokeStyle: "dotted"
        }
      ],
      pageSize: "a4"
    }, C = {
      elements: [
        {
          id: 1,
          type: "rect",
          x: 20,
          y: 20,
          width: 340,
          height: 200,
          fillColor: "#f8f9fa",
          strokeColor: "#dee2e6",
          strokeWidth: 1,
          strokeStyle: "solid"
        },
        {
          id: 2,
          type: "text",
          x: 40,
          y: 40,
          width: 200,
          height: 30,
          content: "John Doe",
          fontSize: 20,
          color: "#000000",
          fontWeight: "bold"
        },
        {
          id: 3,
          type: "text",
          x: 40,
          y: 75,
          width: 200,
          height: 20,
          content: "Senior Developer",
          fontSize: 14,
          color: "#6c757d"
        },
        {
          id: 4,
          type: "line",
          x: 40,
          y: 105,
          width: 300,
          height: 2,
          strokeColor: "#007bff",
          strokeWidth: 2,
          strokeStyle: "solid"
        },
        {
          id: 5,
          type: "text",
          x: 40,
          y: 120,
          width: 150,
          height: 80,
          content: `john@company.com
+1 (555) 123-4567
www.company.com`,
          fontSize: 12,
          color: "#000000"
        },
        {
          id: 6,
          type: "circle",
          x: 270,
          y: 50,
          width: 60,
          height: 60,
          fillColor: "#007bff",
          strokeColor: "#0056b3",
          strokeWidth: 2,
          strokeStyle: "solid"
        }
      ],
      pageSize: "a4"
    };
    t(w, "Sample Invoice"), t(d, "Sample Label"), t(C, "Sample Business Card");
  };
  return {
    templates: e,
    currentTemplate: A,
    saveTemplate: t,
    loadTemplate: r,
    updateTemplate: n,
    deleteTemplate: i,
    exportTemplate: a,
    importTemplate: l,
    initializeTemplates: () => {
      f(), e.value.length === 0 && g();
    }
  };
}
const Pd = (e) => !e || e === "inherit" ? "Arial, sans-serif" : {
  "Arial, sans-serif": "Arial, Helvetica, sans-serif",
  "'Helvetica Neue', sans-serif": "'Helvetica Neue', Helvetica, Arial, sans-serif",
  "'Times New Roman', serif": "'Times New Roman', Times, serif",
  "Georgia, serif": 'Georgia, "Times New Roman", Times, serif',
  "'Courier New', monospace": "'Courier New', Courier, monospace",
  "Roboto, sans-serif": "Roboto, Arial, Helvetica, sans-serif",
  "'Open Sans', sans-serif": "'Open Sans', Arial, Helvetica, sans-serif",
  "Lato, sans-serif": "Lato, Arial, Helvetica, sans-serif",
  "Montserrat, sans-serif": "Montserrat, Arial, Helvetica, sans-serif",
  "Tahoma, sans-serif": "Tahoma, Arial, Helvetica, sans-serif",
  "Verdana, sans-serif": "Verdana, Arial, Helvetica, sans-serif",
  "'Segoe UI', sans-serif": "'Segoe UI', Tahoma, Arial, Helvetica, sans-serif",
  // Arabic fonts with fallbacks
  "Tajawal, sans-serif": 'Tajawal, "Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
  "Cairo, sans-serif": 'Cairo, "Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
  "'Noto Sans Arabic', sans-serif": '"Noto Sans Arabic", "IBM Plex Sans Arabic", Arial, sans-serif',
  "'IBM Plex Sans Arabic', sans-serif": '"IBM Plex Sans Arabic", "Noto Sans Arabic", Arial, sans-serif',
  "Amiri, serif": 'Amiri, "Times New Roman", Times, serif'
}[e] || `${e}, Arial, sans-serif`, Ox = (e) => {
  const { elements: A, pageSize: t } = e, r = A.map((s) => {
    let f = `
    .element-${s.id} {
      position: absolute;
      left: ${s.x}px;
      top: ${s.y}px;
      width: ${s.width}px;
      height: ${s.height}px;`;
    return (s.type === "text" || s.type === "formatted-text") && (f += `
      font-size: ${s.fontSize}px;
      color: ${s.color};
      font-family: ${Pd(s.fontFamily)};
      font-weight: ${s.fontWeight || "normal"};
      font-style: ${s.fontStyle || "normal"};
      text-decoration: ${s.textDecoration || "none"};
      direction: ${s.textDirection || "ltr"};
      text-align: ${s.textDirection === "rtl" ? "right" : "left"};
      display: flex;
      align-items: flex-start;
      padding: 4px;
      word-wrap: break-word;`), s.type === "line" && (f += `
      background-color: ${s.strokeColor || "#000000"};
      height: ${s.strokeWidth || 2}px;`), s.type === "rect" && (f += `
      background-color: ${s.fillColor || "#ffffff"};
      border: ${s.strokeWidth || 1}px solid ${s.strokeColor || "#000000"};`), s.type === "circle" && (f += `
      background-color: ${s.fillColor || "#ffffff"};
      border: ${s.strokeWidth || 1}px solid ${s.strokeColor || "#000000"};
      border-radius: 50%;`), f += `
    }`, f;
  }).join(`
`), n = A.map((s) => {
    if (s.type === "text" || s.type === "formatted-text")
      return `<div class="element-${s.id}">${s.content}</div>`;
    if (s.type === "image")
      return `<div class="element-${s.id}">
        ${s.src ? `<img src="${s.src}" style="width: 100%; height: 100%; object-fit: contain;" />` : '<div style="background: #f0f0f0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">Image Placeholder</div>'}
      </div>`;
    if (s.type === "line")
      return `<div class="element-${s.id}"></div>`;
    if (s.type === "rect")
      return `<div class="element-${s.id}"></div>`;
    if (s.type === "circle")
      return `<div class="element-${s.id}"></div>`;
    if (s.type === "table") {
      const f = (d, C) => {
        if (!s.mergedCells) return !1;
        for (const [b, _] of Object.entries(s.mergedCells)) {
          const [m, y] = b.split(",").map(Number), { colspan: H = 1, rowspan: O = 1 } = _;
          if ((m !== d || y !== C) && d >= m && d < m + O && C >= y && C < y + H)
            return !0;
        }
        return !1;
      }, g = (d, C) => {
        var _;
        if (!s.mergedCells) return 1;
        const b = `${d},${C}`;
        return ((_ = s.mergedCells[b]) == null ? void 0 : _.colspan) || 1;
      }, p = (d, C) => {
        var _;
        if (!s.mergedCells) return 1;
        const b = `${d},${C}`;
        return ((_ = s.mergedCells[b]) == null ? void 0 : _.rowspan) || 1;
      }, w = `
        <table style="width: 100%; height: 100%; border-collapse: collapse; background-color: ${s.backgroundColor || "#ffffff"}; color: ${s.textColor || "#000000"}; font-size: ${s.fontSize || 12}px; font-family: ${Pd(s.fontFamily)}; direction: ${s.textDirection || "ltr"};">
          ${s.data.map((d, C) => `
            <tr>
              ${d.map((b, _) => {
        if (f(C, _)) return "";
        const m = g(C, _), y = p(C, _), H = m > 1 ? ` colspan="${m}"` : "", O = y > 1 ? ` rowspan="${y}"` : "", P = s.textDirection === "rtl" ? "right" : s.textAlign || "left";
        return `<td style="border: ${s.borderWidth || 1}px ${s.borderStyle || "solid"} ${s.borderColor || "#000000"}; padding: ${s.cellPadding || 5}px; text-align: ${P}; vertical-align: ${s.verticalAlign || "top"}; direction: ${s.textDirection || "ltr"};"${H}${O}>${b}</td>`;
      }).join("")}
            </tr>
          `).join("")}
        </table>`;
      return `<div class="element-${s.id}">${w}</div>`;
    }
    return `<div class="element-${s.id}"></div>`;
  }).join(`
`), i = t === "a4" ? "794px" : "816px", a = t === "a4" ? "1123px" : "1056px";
  return [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "<head>",
    '    <meta charset="UTF-8">',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    "    <title>Print Template</title>",
    '    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">',
    "    <style>",
    "        * {",
    "            margin: 0;",
    "            padding: 0;",
    "            box-sizing: border-box;",
    "            -webkit-print-color-adjust: exact !important;",
    "            color-adjust: exact !important;",
    "            print-color-adjust: exact !important;",
    "        }",
    "        ",
    "        body {",
    "            font-family: Arial, sans-serif;",
    "            background: #f0f0f0;",
    "            padding: 20px;",
    "        }",
    "        ",
    "        .template-container {",
    "            background: white;",
    `            width: ${i};`,
    `            height: ${a};`,
    "            margin: 0 auto;",
    "            position: relative;",
    "            box-shadow: 0 4px 12px rgba(0,0,0,0.15);",
    "        }",
    "        ",
    "        @media print {",
    "            body {",
    "                background: white;",
    "                padding: 0;",
    "            }",
    "            ",
    "            .template-container {",
    "                width: 100% !important;",
    "                height: 100% !important;",
    "                box-shadow: none !important;",
    "                margin: 0 !important;",
    "            }",
    "        }",
    "        ",
    "        @page {",
    "            margin: 0;",
    `            size: ${t.toUpperCase()} portrait;`,
    "        }",
    "        ",
    r,
    "    </style>",
    "</head>",
    "<body>",
    '    <div class="template-container">',
    n,
    "    </div>",
    "    ",
    "    <script>",
    '        window.addEventListener("load", function() {',
    '            console.log("Template loaded and ready for printing");',
    "        });",
    "    <\/script>",
    "</body>",
    "</html>"
  ].join(`
`);
}, Dx = (e) => {
  const A = new Blob([e], { type: "text/html" }), t = URL.createObjectURL(A), r = document.createElement("a");
  return r.href = t, r.download = `template_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-")}.html`, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(t), !0;
}, Tx = {
  PtdDesigner: NB,
  PtdViewer: bC,
  DraggableElement: Rd,
  DataSourcePanel: Kd,
  SketchRuler: SC,
  RoyBarCode: TE,
  RoyQRCode: Sx
};
export {
  Rd as D,
  NB as P,
  TE as R,
  SC as S,
  Fe as _,
  bC as a,
  Kd as b,
  _x as c,
  Sx as d,
  Hx as e,
  Ox as f,
  IC as g,
  Dx as h,
  Tx as i,
  Nx as u
};
