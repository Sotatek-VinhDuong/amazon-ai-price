import { useState, createContext, useContext, useEffect } from "react";

// ════════════════════════════════════════════════════════════════
//  i18n — Japanese (default) / Vietnamese
// ════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  jp: {
    appName: "PriceAI",
    phase: "フェーズ1 · 担当者確認モード",
    marketplace: "Amazon Japan · A1VC38T7YXB528",
    statPending: "確認待ち",
    statApproved: "承認済み",
    statEdited: "価格修正済み",
    statRejected: "却下済み",
    colProduct: "商品",
    colStatus: "ステータス",
    colMyPrice: "自社価格",
    colBuyBox: "Buy Box",
    colAISuggest: "AI提案",
    colPriority: "優先度",
    statusDown: "🔴 値下げ推奨",
    statusUp: "🟢 値上げ可能",
    statusHold: "🟡 現状維持",
    priorityHigh: "高",
    priorityMedium: "中",
    priorityLow: "低",
    selectSKU: "SKUを選択してください",
    selectSKUSub: "左側の商品をクリックしてください",
    myPriceLabel: "自社価格",
    buyBoxLabel: "Buy Box価格",
    marginLabel: "現在の粗利率",
    aiSuggestTitle: "AI提案",
    confidence: "信頼度",
    aiReasonTitle: "💡 AI提案の根拠：",
    marketTitle: "市場状況",
    seller: "セラー",
    sellerCount: "セラー",
    aiLearnDetail: "あなたの判断（承認・修正・却下＋理由）はAIの精度向上に活用されます。",
    aiLearnTitle: "AIはあなたから学習しています：",
    verifyBtn: "✍️ 確認・承認する",
    colPrice: "価格",
    colType: "種別",
    colStock: "在庫",
    meLabel: "自社",
    buyBoxTag: "Buy Box",
    modalTitle: "AI提案の確認",
    currentLabel: "現在価格",
    suggestLabel: "提案価格",
    marginAfter: "粗利率",
    actionTitle: "アクションを選択してください",
    approveLabel: "承認",
    approveSub: "AI提案価格を適用",
    editLabel: "価格修正",
    editSub: "別の価格を入力",
    rejectLabel: "却下",
    rejectSub: "現在価格を維持",
    editPriceTitle: "新しい価格を入力",
    editMarginSafe: "✓ 安全範囲内",
    editMarginWarn: "⚠️ 最低粗利率を下回っています！",
    reasonTitle: "修正理由",
    reasonTitleReject: "却下理由",
    reasonRequired: "必須",
    reasonPlaceholder: "— 理由を選択 —",
    noteOther: "その他の理由を入力...",
    learnHintTitle: "AIはあなたの判断から学習します：",
    learnHint: "承認・価格修正・却下（理由付き）のデータを蓄積し、AIの提案精度を向上させます。",
    cancelBtn: "キャンセル",
    submitApprove: "✅ 承認する",
    submitEdit: "✏️ 修正価格を適用",
    submitReject: "❌ 却下する",
    submitDefault: "アクションを選択",
    reasons: [
      "特定セラーの特殊事情",
      "キャンペーン・セール予定あり",
      "在庫情報が不正確",
      "季節性・タイミングの問題",
      "AIのロジックに同意しない",
      "その他",
    ],
    learnBarTitle: "AIが {n} 件の判断から学習中",
    learnBarSub: "承認・修正・却下のたびにAIの提案精度が向上します。精度85%以上でフェーズ2（自動化）に移行します。",
    notifUp: "SKU-C（REGAL靴）：ShoesKingの在庫残り2点 — 値上げ可能：21,000円",
    notifDown: "SKU-A（COACHウォレット）：Buy Box喪失！FashionJP Storeが3,500円値下げ — 要対応",
    viewNow: "今すぐ確認",
    toastApprove: "✅ {name} の価格 {price} を承認しました",
    toastEdit: "✏️ {name} の価格を {price} に修正しました",
    toastReject: "❌ {name} の提案を却下しました",
    unit: "点",
  },
  vi: {
    appName: "PriceAI",
    phase: "PHASE 1 · HUMAN IN THE LOOP",
    marketplace: "Amazon Japan · A1VC38T7YXB528",
    statPending: "Chờ xử lý",
    statApproved: "Đã duyệt",
    statEdited: "Đã sửa giá",
    statRejected: "Đã từ chối",
    colProduct: "Sản phẩm",
    colStatus: "Trạng thái",
    colMyPrice: "Giá của mình",
    colBuyBox: "Buy Box",
    colAISuggest: "AI đề xuất",
    colPriority: "Ưu tiên",
    statusDown: "🔴 Cần giảm giá",
    statusUp: "🟢 Có thể tăng",
    statusHold: "🟡 Giữ nguyên",
    priorityHigh: "Cao",
    priorityMedium: "Trung bình",
    priorityLow: "Thấp",
    selectSKU: "Chọn một SKU để xem chi tiết",
    selectSKUSub: "Click vào bất kỳ sản phẩm nào bên trái",
    myPriceLabel: "Giá hiện tại",
    buyBoxLabel: "Buy Box",
    marginLabel: "Margin hiện tại",
    aiSuggestTitle: "ĐỀ XUẤT TỪ AI",
    confidence: "Độ tin cậy",
    aiReasonTitle: "💡 Lý do AI đề xuất:",
    marketTitle: "Thị trường",
    seller: "Seller",
    sellerCount: "Seller",
    aiLearnDetail: "Quyết định của bạn (đồng ý / sửa giá / từ chối + lý do) sẽ giúp AI cải thiện theo thời gian.",
    aiLearnTitle: "AI học từ quyết định của bạn:",
    verifyBtn: "✍️ Xem xét & Xác nhận",
    colPrice: "Giá",
    colType: "Loại",
    colStock: "Tồn kho",
    meLabel: "Mình",
    buyBoxTag: "Buy Box",
    modalTitle: "XÁC NHẬN ĐỀ XUẤT AI",
    currentLabel: "Giá hiện tại",
    suggestLabel: "Giá đề xuất",
    marginAfter: "Margin",
    actionTitle: "Chọn hành động của bạn",
    approveLabel: "Đồng ý",
    approveSub: "Áp giá AI đề xuất",
    editLabel: "Sửa giá",
    editSub: "Nhập giá mới",
    rejectLabel: "Từ chối",
    rejectSub: "Giữ giá hiện tại",
    editPriceTitle: "Nhập giá mới",
    editMarginSafe: "✓ An toàn",
    editMarginWarn: "⚠️ Dưới ngưỡng tối thiểu!",
    reasonTitle: "Lý do sửa giá",
    reasonTitleReject: "Lý do từ chối",
    reasonRequired: "Bắt buộc",
    reasonPlaceholder: "— Chọn lý do —",
    noteOther: "Nhập lý do...",
    learnHintTitle: "AI học từ bạn:",
    learnHint: "Quyết định đồng ý / sửa / từ chối (kèm lý do) được lưu để cải thiện độ chính xác của AI.",
    cancelBtn: "Hủy",
    submitApprove: "✅ Xác nhận đồng ý",
    submitEdit: "✏️ Áp giá mới",
    submitReject: "❌ Xác nhận từ chối",
    submitDefault: "Chọn hành động",
    reasons: [
      "Đối thủ đặc biệt — cần xử lý riêng",
      "Sắp có campaign / promotion",
      "Tồn kho chưa chính xác",
      "Yếu tố mùa vụ / thời điểm",
      "Không đồng ý với logic AI",
      "Khác",
    ],
    learnBarTitle: "AI đang học từ {n} quyết định của bạn",
    learnBarSub: "Mỗi lần đồng ý / sửa / từ chối, AI sẽ cải thiện độ chính xác. Cần ≥ 85% để chuyển Phase 2 (tự động hóa).",
    notifUp: "SKU-C (Giày REGAL): ShoesKing chỉ còn 2 đôi — Có thể tăng giá lên 21,000 JPY",
    notifDown: "SKU-A (Ví COACH): Mất Buy Box! FashionJP Store vừa giảm 3,500 JPY — cần phản ứng ngay",
    viewNow: "Xem ngay",
    toastApprove: "✅ Đã duyệt giá {price} cho {name}",
    toastEdit: "✏️ Đã sửa giá thành {price} cho {name}",
    toastReject: "❌ Đã từ chối đề xuất cho {name}",
    unit: "cái",
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKU_DATA = [
  {
    id: "SKU-A",
    name: { jp: "COACHスリムビルフォールド（メンズ）", vi: "Ví da nam COACH Slim Billfold" },
    asin: "B0COACH001",
    myPrice: 32000, buyBoxPrice: 28500, suggestedPrice: 28000,
    suggestedMargin: 31, confidence: 91, status: "down", priority: "high",
    aiReason: {
      jp: "FashionJP Storeが28,500円に値下げし、Buy Boxを獲得しました。競合在庫は残り8点。28,000円への値下げでBuy Boxを奪還可能 — 粗利率31%で安全範囲内です。",
      vi: "FashionJP Store vừa giảm xuống 28,500 JPY và đang giữ Buy Box. Tồn kho đối thủ còn 8 cái. Đề xuất giảm xuống 28,000 JPY để chiếm Buy Box — margin 31%, vẫn an toàn.",
    },
    competitors: [
      { name: "FashionJP Store", price: 28500, isBuyBox: true, isFBA: true, stock: 8 },
      { name: "Taniyama", price: 32000, isBuyBox: false, isFBA: false, stock: 15 },
      { name: "LuxuryBag JP", price: 33000, isBuyBox: false, isFBA: true, stock: 5 },
      { name: "TokyoStyle", price: 35000, isBuyBox: false, isFBA: false, stock: 3 },
    ],
    costPrice: 19500,
  },
  {
    id: "SKU-C",
    name: { jp: "REGALビジネスオックスフォード（メンズ）", vi: "Giày da nam REGAL Business Oxford" },
    asin: "B0REGAL09",
    myPrice: 18000, buyBoxPrice: 17500, suggestedPrice: 21000,
    suggestedMargin: 45, confidence: 87, status: "up", priority: "high",
    aiReason: {
      jp: "Buy Box保持中のShoesKing（26.5cm）の在庫が残り2点 — 1〜2日以内に在庫切れ見込み。OsakaShoes が22,000円に値上げ済み。市場が高価格を受け入れており、21,000円への値上げで粗利率45%を実現できます。",
      vi: "ShoesKing (Buy Box) chỉ còn 2 đôi size 26.5 — dự kiến hết hàng trong 1–2 ngày. OsakaShoes vừa tăng lên 22,000 JPY. Đề xuất tăng lên 21,000 JPY để đạt margin 45%.",
    },
    competitors: [
      { name: "ShoesKing", price: 17500, isBuyBox: true, isFBA: true, stock: 2 },
      { name: "Taniyama", price: 18000, isBuyBox: false, isFBA: false, stock: 20 },
      { name: "OsakaShoes", price: 22000, isBuyBox: false, isFBA: true, stock: 14 },
    ],
    costPrice: 11500,
  },
  {
    id: "SKU-B",
    name: { jp: "Samantha Thavasaキャンバストートバッグ（レディース）", vi: "Túi tote nữ Samantha Thavasa Canvas" },
    asin: "B0STOTE77",
    myPrice: 9800, buyBoxPrice: 9200, suggestedPrice: 9800,
    suggestedMargin: 36, confidence: 74, status: "hold", priority: "medium",
    aiReason: {
      jp: "12セラーが競合中。最安値7,500円は最低粗利率30%を下回るため適用不可。GW明けに市場安定の見込み — 現状価格維持を推奨します。",
      vi: "Thị trường cạnh tranh mạnh với 12 seller. Giá thấp nhất 7,500 JPY vi phạm margin tối thiểu 30%. Sau Golden Week thị trường sẽ ổn định — đề xuất giữ giá.",
    },
    competitors: [
      { name: "BagLover JP", price: 7500, isBuyBox: false, isFBA: false, stock: 40 },
      { name: "StyleShop", price: 9000, isBuyBox: false, isFBA: true, stock: 18 },
      { name: "Taniyama", price: 9200, isBuyBox: true, isFBA: false, stock: 30 },
      { name: "FashionMall", price: 9800, isBuyBox: false, isFBA: false, stock: 10 },
    ],
    costPrice: 6300,
  },
  {
    id: "SKU-D",
    name: { jp: "HERZハンドステッチレザーベルト（メンズ）", vi: "Thắt lưng da nam HERZ Hand-Stitch" },
    asin: "B0HERZ2024",
    myPrice: 12500, buyBoxPrice: 12500, suggestedPrice: 13800,
    suggestedMargin: 43, confidence: 79, status: "up", priority: "medium",
    aiReason: {
      jp: "現在Buy Box獲得中。最近接競合のLeatherCraftより1,800円高い。国産ハンドメイド品の検索数が先月比23%増加しています。10%値上げで粗利率43%を実現可能です。",
      vi: "Mình đang giữ Buy Box. LeatherCraft bán cao hơn 1,800 JPY. Hàng handmade nội địa Nhật được tìm kiếm nhiều hơn 23% so với tháng trước. Đề xuất tăng 10% để đạt margin 43%.",
    },
    competitors: [
      { name: "Taniyama", price: 12500, isBuyBox: true, isFBA: false, stock: 18 },
      { name: "LeatherCraft", price: 14300, isBuyBox: false, isFBA: true, stock: 7 },
      { name: "BeltShop JP", price: 14800, isBuyBox: false, isFBA: false, stock: 5 },
    ],
    costPrice: 7800,
  },
  {
    id: "SKU-E",
    name: { jp: "Paul Smithマルチストライプ コンパクトウォレット（レディース）", vi: "Ví nữ nhỏ Paul Smith Multistripe" },
    asin: "B0PAULS55",
    myPrice: 15000, buyBoxPrice: 15000, suggestedPrice: 15000,
    suggestedMargin: 44, confidence: 95, status: "hold", priority: "low",
    aiReason: {
      jp: "市場は安定しており、Buy Boxを維持中です。過去3日間に大きな変動はありません — 現状価格維持を推奨します。",
      vi: "Thị trường ổn định. Mình đang giữ Buy Box. Không có biến động trong 3 ngày qua. Giữ nguyên giá hiện tại.",
    },
    competitors: [
      { name: "Taniyama", price: 15000, isBuyBox: true, isFBA: false, stock: 25 },
      { name: "PinkWallet", price: 15800, isBuyBox: false, isFBA: false, stock: 8 },
    ],
    costPrice: 8400,
  },
];

// ─── LANG CONTEXT ─────────────────────────────────────────────────────────────
const LangCtx = createContext("jp");
const useLang = () => {
  const lang = useContext(LangCtx);
  const t = (key, vars = {}) => {
    let str = TRANSLATIONS[lang][key] ?? key;
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    return str;
  };
  return { lang, t };
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => "¥" + n?.toLocaleString("ja-JP");
const pct = (cost, sell) => Math.round((1 - cost / sell) * 100);

const STATUS_CFG = { up: { key: "statusUp", bg: "#d1fae5", color: "#065f46" }, down: { key: "statusDown", bg: "#fee2e2", color: "#991b1b" }, hold: { key: "statusHold", bg: "#fef9c3", color: "#92400e" } };
const PRIORITY_CFG = { high: { key: "priorityHigh", bg: "#fef2f2", color: "#dc2626" }, medium: { key: "priorityMedium", bg: "#fffbeb", color: "#d97706" }, low: { key: "priorityLow", bg: "#f0fdf4", color: "#16a34a" } };

// ─── LANG TOGGLE ─────────────────────────────────────────────────────────────
function LangToggle({ lang, setLang }) {
  return (
    <div style={{ display: "flex", background: "#ffffff22", borderRadius: 8, overflow: "hidden", border: "1px solid #ffffff22" }}>
      {[["jp", "🇯🇵 日本語"], ["vi", "🇻🇳 Tiếng Việt"]].map(([l, label]) => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: "5px 14px", border: "none", cursor: "pointer",
          fontWeight: 700, fontSize: 12, transition: "all 0.15s",
          background: lang === l ? "#fff" : "transparent",
          color: lang === l ? "#1e3a5f" : "#93c5fd",
        }}>{label}</button>
      ))}
    </div>
  );
}

// ─── NOTIFICATION BANNER ─────────────────────────────────────────────────────
function NotifBanner({ items, onDismiss }) {
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
      {items.map((n, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderRadius: 10, border: `1px solid ${n.color}33`, background: n.bg, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{n.icon}</span>
            <span style={{ fontSize: 13, color: n.color, fontWeight: 600 }}>{n.message}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={n.onView} style={{ padding: "4px 12px", borderRadius: 6, border: `1px solid ${n.color}`, background: "transparent", color: n.color, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{n.viewLabel}</button>
            <button onClick={() => onDismiss(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SKU ROW ─────────────────────────────────────────────────────────────────
function SKURow({ sku, selected, onClick, decision }) {
  const { lang, t } = useLang();
  const s = STATUS_CFG[sku.status];
  const p = PRIORITY_CFG[sku.priority];
  const diff = sku.suggestedPrice - sku.myPrice;
  const diffPct = Math.round(Math.abs(diff) / sku.myPrice * 100);
  const isSel = selected?.id === sku.id;

  return (
    <div style={{ position: "relative", marginBottom: 6 }}>
      <div onClick={onClick} style={{
        display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1.2fr 0.9fr",
        alignItems: "center", gap: 10, padding: "13px 18px", borderRadius: 10, cursor: "pointer",
        transition: "all 0.15s",
        background: isSel ? "#eff6ff" : "#fff",
        border: isSel ? "2px solid #3b82f6" : "2px solid transparent",
        boxShadow: isSel ? "0 0 0 3px #3b82f620" : "0 1px 3px #0001",
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b", lineHeight: 1.4 }}>{sku.name[lang]}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{sku.asin} · {sku.id}</div>
        </div>
        <span style={{ display: "inline-block", padding: "4px 9px", borderRadius: 20, background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap" }}>{t(s.key)}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{fmt(sku.myPrice)}</div>
          <div style={{ fontSize: 10, color: "#94a3b8" }}>{t("myPriceLabel")}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed" }}>{fmt(sku.buyBoxPrice)}</div>
          <div style={{ fontSize: 10, color: "#94a3b8" }}>Buy Box</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: diff > 0 ? "#059669" : diff < 0 ? "#dc2626" : "#f59e0b" }}>
            {diff > 0 ? `▲+${diffPct}%` : diff < 0 ? `▼-${diffPct}%` : "—"} {fmt(sku.suggestedPrice)}
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8" }}>{t("aiSuggestTitle")}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: p.bg, color: p.color, fontSize: 10, fontWeight: 700 }}>{t(p.key)}</span>
        </div>
      </div>
      {decision && (
        <div style={{
          position: "absolute", top: 8, right: 10, zIndex: 1,
          fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
          background: decision.action === "approve" ? "#d1fae5" : decision.action === "edit" ? "#dbeafe" : "#fee2e2",
          color: decision.action === "approve" ? "#065f46" : decision.action === "edit" ? "#1d4ed8" : "#991b1b",
        }}>
          {decision.action === "approve" ? "✅ " : decision.action === "edit" ? `✏️ ${fmt(decision.editPrice)}` : "❌"}
        </div>
      )}
    </div>
  );
}

// ─── COMPETITOR TABLE ─────────────────────────────────────────────────────────
function CompTable({ competitors }) {
  const { t } = useLang();
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#f8fafc", padding: "8px 14px", fontSize: 11, fontWeight: 700, color: "#64748b", gap: 8 }}>
        <span>{t("seller")}</span><span style={{ textAlign: "right" }}>{t("colPrice")}</span>
        <span style={{ textAlign: "center" }}>{t("colType")}</span><span style={{ textAlign: "right" }}>{t("colStock")}</span>
      </div>
      {competitors.map((c, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          padding: "10px 14px", gap: 8, alignItems: "center", borderTop: "1px solid #f1f5f9",
          background: c.isBuyBox ? "#faf5ff" : c.name === "Taniyama" ? "#eff6ff" : i % 2 === 0 ? "#fff" : "#fafafa",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
            {c.isBuyBox && <span style={{ fontSize: 10, background: "#7c3aed", color: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>{t("buyBoxTag")}</span>}
            {c.name === "Taniyama" && <span style={{ fontSize: 10, background: "#3b82f6", color: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>{t("meLabel")}</span>}
            <span style={{ fontSize: 13, fontWeight: c.isBuyBox || c.name === "Taniyama" ? 700 : 400 }}>{c.name}</span>
          </div>
          <div style={{ textAlign: "right", fontSize: 13, fontWeight: 700, color: c.isBuyBox ? "#7c3aed" : "#334155" }}>{fmt(c.price)}</div>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, fontWeight: 600, background: c.isFBA ? "#dbeafe" : "#f1f5f9", color: c.isFBA ? "#1d4ed8" : "#64748b" }}>{c.isFBA ? "FBA" : "FBM"}</span>
          </div>
          <div style={{ textAlign: "right", fontSize: 13 }}>
            <span style={{ fontWeight: c.stock <= 3 ? 700 : 400, color: c.stock <= 3 ? "#dc2626" : "#334155" }}>
              {c.stock <= 3 ? `⚠️ ${c.stock}` : c.stock} {t("unit")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── VERIFY MODAL ─────────────────────────────────────────────────────────────
function VerifyModal({ sku, onClose, onDecision }) {
  const { lang, t } = useLang();
  const [action, setAction] = useState(null);
  const [editPrice, setEditPrice] = useState(sku.suggestedPrice);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const reasons = TRANSLATIONS[lang].reasons;
  const editMargin = editPrice > 0 ? pct(sku.costPrice, editPrice) : 0;
  const diff = sku.suggestedPrice - sku.myPrice;
  const canSubmit = action === "approve" || ((action === "edit" || action === "reject") && reason);

  const submitLabel = action === "approve" ? t("submitApprove") : action === "edit" ? t("submitEdit") : action === "reject" ? t("submitReject") : t("submitDefault");

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "#00000077", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 560, boxShadow: "0 25px 60px #0003", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: "#1e3a5f", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{t("modalTitle")}</div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}>{sku.name[lang]}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#93c5fd", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>

        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* AI summary */}
          <div style={{ background: "#f8fafc", borderRadius: 10, padding: 14, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 10 }}>🤖 {t("aiSuggestTitle")}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{t("currentLabel")}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#64748b" }}>{fmt(sku.myPrice)}</div>
              </div>
              <div style={{ fontSize: 22, color: "#cbd5e1" }}>→</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{t("suggestLabel")}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: diff > 0 ? "#059669" : diff < 0 ? "#dc2626" : "#f59e0b" }}>{fmt(sku.suggestedPrice)}</div>
                <div style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>{t("marginAfter")}: {sku.suggestedMargin}%</div>
              </div>
            </div>
            <div style={{ marginTop: 10, padding: "10px 12px", background: "#fff", borderRadius: 8, border: "1px solid #e0e7ff" }}>
              <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 700, marginBottom: 4 }}>{t("aiReasonTitle")}</div>
              <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.7 }}>{sku.aiReason[lang]}</div>
            </div>
          </div>

          {/* Actions */}
          <div>
            <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 8 }}>{t("actionTitle")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { key: "approve", icon: "✅", lk: "approveLabel", sk: "approveSub", c: "#059669", bg: "#d1fae5", bd: "#6ee7b7" },
                { key: "edit", icon: "✏️", lk: "editLabel", sk: "editSub", c: "#2563eb", bg: "#dbeafe", bd: "#93c5fd" },
                { key: "reject", icon: "❌", lk: "rejectLabel", sk: "rejectSub", c: "#dc2626", bg: "#fee2e2", bd: "#fca5a5" },
              ].map((o) => (
                <button key={o.key} onClick={() => setAction(o.key)} style={{
                  padding: "13px 8px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                  border: `2px solid ${action === o.key ? o.bd : "#e2e8f0"}`,
                  background: action === o.key ? o.bg : "#fff", transition: "all 0.15s",
                  boxShadow: action === o.key ? `0 0 0 3px ${o.bd}55` : "none",
                }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{o.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: action === o.key ? o.c : "#334155" }}>{t(o.lk)}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{t(o.sk)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Edit price */}
          {action === "edit" && (
            <div style={{ background: "#eff6ff", borderRadius: 10, padding: 14, border: "1px solid #93c5fd" }}>
              <div style={{ fontSize: 11, color: "#1d4ed8", fontWeight: 700, marginBottom: 10 }}>✏️ {t("editPriceTitle")}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))}
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "2px solid #93c5fd", fontSize: 20, fontWeight: 800, color: "#1e40af", background: "#fff", outline: "none" }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: "#94a3b8" }}>JPY</span>
              </div>
              {editPrice > 0 && (
                <div style={{ display: "flex", gap: 10, fontSize: 12 }}>
                  <span style={{ color: "#64748b" }}>{t("marginAfter")}:</span>
                  <span style={{ fontWeight: 700, color: editMargin >= 30 ? "#059669" : "#dc2626" }}>
                    {editMargin}% {editMargin >= 30 ? t("editMarginSafe") : t("editMarginWarn")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Reason */}
          {(action === "edit" || action === "reject") && (
            <div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6 }}>
                {action === "edit" ? t("reasonTitle") : t("reasonTitleReject")} <span style={{ color: "#dc2626" }}>*</span>
              </div>
              <select value={reason} onChange={(e) => setReason(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "2px solid #e2e8f0", fontSize: 13, color: "#334155", background: "#fff", outline: "none", cursor: "pointer" }}>
                <option value="">{t("reasonPlaceholder")}</option>
                {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {reason === reasons[reasons.length - 1] && (
                <input placeholder={t("noteOther")} value={note} onChange={(e) => setNote(e.target.value)}
                  style={{ width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 8, border: "2px solid #e2e8f0", fontSize: 13, color: "#334155", background: "#fff", outline: "none", boxSizing: "border-box" }} />
              )}
            </div>
          )}

          {/* AI learn hint */}
          <div style={{ display: "flex", gap: 10, padding: "10px 14px", background: "#faf5ff", borderRadius: 8, border: "1px solid #e9d5ff" }}>
            <span style={{ fontSize: 16 }}>🧠</span>
            <div style={{ fontSize: 11, color: "#6d28d9", lineHeight: 1.6 }}>
              <strong>{t("learnHintTitle")}</strong> {t("learnHint")}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "2px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>
              {t("cancelBtn")}
            </button>
            <button onClick={() => canSubmit && onDecision({ action, editPrice, reason, note })} disabled={!canSubmit}
              style={{ flex: 2, padding: "12px", borderRadius: 8, border: "none", background: canSubmit ? "#1e3a5f" : "#e2e8f0", color: canSubmit ? "#fff" : "#94a3b8", fontSize: 14, cursor: canSubmit ? "pointer" : "not-allowed", fontWeight: 700, transition: "all 0.15s" }}>
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ sku, onVerify }) {
  const { lang, t } = useLang();

  if (!sku) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc", borderRadius: 16, border: "2px dashed #e2e8f0", minHeight: 400 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>👈</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#94a3b8" }}>{t("selectSKU")}</div>
      <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 6 }}>{t("selectSKUSub")}</div>
    </div>
  );

  const s = STATUS_CFG[sku.status];
  const diff = sku.suggestedPrice - sku.myPrice;
  const diffPct = Math.round(Math.abs(diff) / sku.myPrice * 100);

  return (
    <div style={{ flex: 1, background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px #0001", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1e3a5f", padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div>
            <div style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{sku.id} · {sku.asin}</div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}>{sku.name[lang]}</div>
          </div>
          <span style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color }}>{t(s.key)}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
          {[
            { label: t("myPriceLabel"), value: fmt(sku.myPrice), color: "#e2e8f0" },
            { label: t("buyBoxLabel"), value: fmt(sku.buyBoxPrice), color: "#c4b5fd" },
            { label: t("marginLabel"), value: `${pct(sku.costPrice, sku.myPrice)}%`, color: "#86efac" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#ffffff15", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* AI hero card */}
        <div style={{ background: "linear-gradient(135deg,#1e40af08,#7c3aed08)", border: "2px solid #818cf833", borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#1e40af", letterSpacing: "0.05em" }}>{t("aiSuggestTitle")}</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#64748b" }}>{t("confidence")}:</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: sku.confidence >= 85 ? "#059669" : sku.confidence >= 70 ? "#f59e0b" : "#dc2626" }}>{sku.confidence}%</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{t("currentLabel").toUpperCase()}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#64748b" }}>{fmt(sku.myPrice)}</div>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ borderTop: "2px dashed #cbd5e1" }} />
              <span style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: diff > 0 ? "#d1fae5" : diff < 0 ? "#fee2e2" : "#fef9c3",
                color: diff > 0 ? "#059669" : diff < 0 ? "#dc2626" : "#f59e0b",
                padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800, whiteSpace: "nowrap",
              }}>
                {diff > 0 ? `▲ +${diffPct}%` : diff < 0 ? `▼ -${diffPct}%` : "→"}
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{t("suggestLabel").toUpperCase()}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: diff > 0 ? "#059669" : diff < 0 ? "#dc2626" : "#f59e0b" }}>{fmt(sku.suggestedPrice)}</div>
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>{t("marginAfter")}: {sku.suggestedMargin}%</div>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "1px solid #e0e7ff" }}>
            <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 700, marginBottom: 6 }}>{t("aiReasonTitle")}</div>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{sku.aiReason[lang]}</div>
          </div>
        </div>

        {/* Market */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>
            📊 {t("marketTitle")} ({sku.competitors.length} {t("sellerCount")})
          </div>
          <CompTable competitors={sku.competitors} />
        </div>

        {/* Learn hint */}
        <div style={{ display: "flex", gap: 10, padding: "10px 14px", background: "#faf5ff", borderRadius: 8, border: "1px solid #e9d5ff" }}>
          <span style={{ fontSize: 14 }}>🧠</span>
          <div style={{ fontSize: 11, color: "#6d28d9", lineHeight: 1.5 }}>
            <strong>{t("aiLearnTitle")}</strong> {t("aiLearnDetail")}
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 20px", borderTop: "1px solid #f1f5f9", background: "#f8fafc" }}>
        <button onClick={onVerify} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "#1e3a5f", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          {t("verifyBtn")}
        </button>
      </div>
    </div>
  );
}

// ─── LOGIN COMPONENT ──────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin@123") {
      onLogin();
    } else {
      setError("ユーザー名またはパスワードが正しくありません");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        padding: 40,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🤖</div>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Amazon Price AI</h1>
        <p style={{ color: "#93c5fd", fontSize: 14, marginBottom: 32 }}>続行するにはログインしてください</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, marginLeft: 4, marginBottom: 6, display: "block" }}>USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, marginLeft: 4, marginBottom: 6, display: "block" }}>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                fontSize: 16,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
            />
          </div>

          {error && (
            <div style={{ color: "#f87171", fontSize: 12, fontWeight: 600, marginTop: 8 }}>
              {error}
            </div>
          )}

          <button type="submit" style={{
            marginTop: 16,
            padding: "14px",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(90deg, #3b82f6, #2563eb)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)"
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(59, 130, 246, 0.4)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(59, 130, 246, 0.3)"; }}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState("jp");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [decisions, setDecisions] = useState([]);
  const [toast, setToast] = useState(null);
  const [dismissed, setDismissed] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn");
    if (auth === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const T = TRANSLATIONS[lang];
  const t = (key, vars = {}) => {
    let str = T[key] ?? key;
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    return str;
  };

  const notifItems = [
    { key: "up", icon: "🟢", message: t("notifUp"), bg: "#d1fae5", color: "#065f46", viewLabel: t("viewNow"), onView: () => setSelected(SKU_DATA.find(s => s.id === "SKU-C")) },
    { key: "down", icon: "🔴", message: t("notifDown"), bg: "#fee2e2", color: "#991b1b", viewLabel: t("viewNow"), onView: () => setSelected(SKU_DATA.find(s => s.id === "SKU-A")) },
  ].filter(n => !dismissed.includes(n.key));

  const pendingCount = SKU_DATA.filter(s => !decisions.find(d => d.id === s.id)).length;
  const approvedCount = decisions.filter(d => d.action === "approve").length;
  const editedCount = decisions.filter(d => d.action === "edit").length;
  const rejectedCount = decisions.filter(d => d.action === "reject").length;

  const handleDecision = (decision) => {
    setDecisions(prev => [...prev.filter(d => d.id !== selected.id), { id: selected.id, ...decision }]);
    setShowModal(false);
    const price = decision.action === "edit" ? fmt(decision.editPrice) : fmt(selected.suggestedPrice);
    const name = selected.name[lang];
    const msg = decision.action === "approve" ? t("toastApprove", { price, name }) : decision.action === "edit" ? t("toastEdit", { price, name }) : t("toastReject", { name });
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const stats = [
    { lk: "statPending", v: pendingCount, icon: "⏳", color: "#f59e0b", bg: "#fffbeb" },
    { lk: "statApproved", v: approvedCount, icon: "✅", color: "#059669", bg: "#d1fae5" },
    { lk: "statEdited", v: editedCount, icon: "✏️", color: "#2563eb", bg: "#dbeafe" },
    { lk: "statRejected", v: rejectedCount, icon: "❌", color: "#dc2626", bg: "#fee2e2" },
  ];

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <LangCtx.Provider value={lang}>
      <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

        {/* NAV */}
        <div style={{ background: "#1e3a5f", padding: "0 28px", display: "flex", alignItems: "center", gap: 14, height: 56, boxShadow: "0 2px 8px #0003" }}>
          <span style={{ fontSize: 20 }}>🤖</span>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{t("appName")}</span>
          <span style={{ fontSize: 10, background: "#3b82f6", color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>{t("phase")}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ color: "#93c5fd", fontSize: 12 }}>{t("marketplace")}</span>
            <LangToggle lang={lang} setLang={setLang} />
            <div
              onClick={handleLogout}
              title="Logout"
              style={{ width: 32, height: 32, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              T
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: "24px 28px", maxWidth: 1400, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
            {stats.map(s => (
              <div key={s.lk} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 4px #0001", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{t(s.lk)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <NotifBanner items={notifItems} onDismiss={(i) => setDismissed(prev => [...prev, notifItems[i].key])} />

          {/* Main */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            {/* List */}
            <div style={{ width: 680, flexShrink: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1.2fr 0.9fr", gap: 10, padding: "8px 18px", marginBottom: 4, fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.04em" }}>
                <span>{t("colProduct")}</span>
                <span>{t("colStatus")}</span>
                <span style={{ textAlign: "right" }}>{t("colMyPrice")}</span>
                <span style={{ textAlign: "right" }}>{t("colBuyBox")}</span>
                <span style={{ textAlign: "right" }}>{t("colAISuggest")}</span>
                <span style={{ textAlign: "center" }}>{t("colPriority")}</span>
              </div>
              {SKU_DATA.map(sku => (
                <SKURow key={sku.id} sku={sku} selected={selected}
                  decision={decisions.find(d => d.id === sku.id)}
                  onClick={() => setSelected(selected?.id === sku.id ? null : sku)} />
              ))}

              {/* AI learning bar */}
              <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, background: "#faf5ff", border: "1px solid #e9d5ff", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, marginTop: 2 }}>🧠</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6d28d9", marginBottom: 2 }}>{t("learnBarTitle", { n: decisions.length })}</div>
                  <div style={{ fontSize: 11, color: "#9333ea", lineHeight: 1.5, marginBottom: 8 }}>{t("learnBarSub")}</div>
                  <div style={{ height: 5, background: "#e9d5ff", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#7c3aed,#a855f7)", width: `${Math.min((decisions.length / SKU_DATA.length) * 100, 100)}%`, transition: "width 0.5s" }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#a855f7", marginTop: 4 }}>{decisions.length} / {SKU_DATA.length} SKU</div>
                </div>
              </div>
            </div>

            {/* Detail */}
            <div style={{ flex: 1, position: "sticky", top: 24 }}>
              <DetailPanel sku={selected} onVerify={() => selected && setShowModal(true)} />
            </div>
          </div>
        </div>

        {showModal && selected && <VerifyModal sku={selected} onClose={() => setShowModal(false)} onDecision={handleDecision} />}

        {toast && (
          <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#1e293b", color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 30px #0004", zIndex: 2000, whiteSpace: "nowrap" }}>
            {toast}
          </div>
        )}
      </div>
    </LangCtx.Provider>
  );
}
