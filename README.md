# Sme_project[README.md](https://github.com/user-attachments/files/29586455/README.md)
# 🌐 TrustTrade 2.0
### *India's Intelligent B2B Supply Chain Operating System — Powered by GenAI, Multi-Agent Systems & Blockchain*

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-ML-orange.svg)](https://scikit-learn.org)
[![Gemini AI](https://img.shields.io/badge/Gemini-GenAI-green.svg)](https://ai.google.dev)
[![Blockchain](https://img.shields.io/badge/Blockchain-Polygon-purple.svg)](https://polygon.technology)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> *"TrustTrade is not just a marketplace — it's a complete B2B operating system where GenAI agents autonomously handle procurement, negotiation, compliance, logistics and finance for Indian SMEs, while blockchain enforces trust and ML predicts demand — eliminating India's $45 billion annual supply chain loss."*

---

## 🎯 The Problem

India has **63 million SMEs** contributing 30% of GDP — yet **94% have no digital supply chain**.

| Problem | Impact |
|---|---|
| Can't find verified suppliers | $45B lost annually |
| No contract enforcement | 60% face payment delays |
| Zero demand intelligence | Gut-feeling decisions |
| No credit access | 78% rejected by banks |
| Supplier fraud | ₹2.3 lakh crore lost/year |

---

## 🚀 The Solution — TrustTrade 2.0

A **5-layer intelligent platform** with **9 autonomous agents** that fixes all of this:

```
👤 SME Owner: "I need 500kg raw cotton by Friday under ₹80/kg"
                          ↓
        ┌─────────────────────────────────┐
        │    TRUSTTRADE ORCHESTRATOR      │
        │    (Multi-Agent System)         │
        └─────────────────────────────────┘
         ↓          ↓          ↓         ↓          ↓
   PROCUREMENT   RISK      NEGOTIATION  LOGISTICS  FINANCE
     AGENT      AGENT        AGENT       AGENT      AGENT
   Find best   Score &    Autonomous   Optimize   Escrow &
   suppliers   flag risk   price deal   delivery   payment
                          ↓
              ⛓️ BLOCKCHAIN SMART CONTRACT
              ✅ Deal done in 0.08 seconds
```

---

## 📊 Project Results

| Metric | Result |
|---|---|
| **Risk Model Accuracy** | 82% (Random Forest) |
| **Demand Forecast Accuracy** | 95.4% (Gradient Boosting) |
| **Agent Execution Time** | 0.08 seconds for full deal |
| **Suppliers in Database** | 500 across 15 Indian cities |
| **Cities Covered** | 15 major Indian cities |
| **Categories** | 10 product categories |

---

## 🏗️ Architecture

### Phase 1 — Core Intelligence
- ✅ **500-supplier verified database** (synthetic, Indian SME data)
- ✅ **ML Risk Scoring Engine** — Random Forest + Gradient Boosting
- ✅ **Auto Contract Generator** — Blockchain smart contract simulation
- ✅ **Analytics Dashboard** — 6-panel Plotly visualization

### Phase 2 — Multi-Agent Orchestration
- ✅ **Procurement Agent** — Semantic supplier search + filtering
- ✅ **Risk Intelligence Agent** — ML-powered fraud and risk detection
- ✅ **Negotiation Agent** — Autonomous price negotiation (95% confidence threshold)
- ✅ **Logistics Agent** — Multi-modal route optimization (Road/Rail/Air)
- ✅ **Finance Agent** — Credit scoring + blockchain escrow management
- ✅ **Master Orchestrator** — Coordinates all agents end-to-end

### Phase 3 — Predictive Intelligence
- ✅ **Demand Forecasting** — Gradient Boosting with 95.4% accuracy
- ✅ **30-day demand predictions** with confidence bands
- ✅ **AI-generated procurement recommendations**
- ✅ **Festival spike detection** (Diwali, year-end patterns)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Language** | Python 3.10+ |
| **ML Models** | Scikit-learn, Random Forest, Gradient Boosting |
| **GenAI** | Google Gemini API (gemini-1.5-flash) |
| **Agent Design** | LangGraph Architecture Pattern |
| **Data Processing** | Pandas, NumPy |
| **Visualization** | Plotly, Plotly Subplots |
| **Blockchain** | Ethereum/Polygon (Smart Contract Simulation) |
| **Synthetic Data** | Faker (Indian locale) |
| **Environment** | Google Colab |

---

## 📁 Project Structure

```
TrustTrade-2.0/
│
├── TrustTrade_MVP.ipynb          # Main notebook — all phases
│
├── README.md                     # This file
│
└── assets/
    ├── dashboard_screenshot.png  # Analytics dashboard
    ├── deal_summary.png          # Agent orchestration output
    └── forecast_dashboard.png    # Demand forecasting dashboard
```

---

## 🚀 Quick Start

### Run on Google Colab (Recommended)
1. Click the badge above or open `TrustTrade_MVP.ipynb` in Colab
2. Run **Cell 1** — installs all dependencies
3. Add your **Gemini API key** (free at [aistudio.google.com](https://aistudio.google.com))
4. Click **Runtime → Run All**

### Local Setup
```bash
git clone https://github.com/anaswara1000/TrustTrade-2.0
cd TrustTrade-2.0
pip install anthropic pandas numpy scikit-learn faker plotly google-generativeai
jupyter notebook TrustTrade_MVP.ipynb
```

---

## 🤖 Agent Demo

```python
# Initialize the orchestrator
orchestrator = TrustTradeOrchestratorV2()

# Execute a complete procurement deal
result = orchestrator.execute(
    query="I need packaging material suppliers, rating above 4",
    buyer_name="Sharma Textiles Pvt. Ltd.",
    quantity=500,
    destination_city="Bangalore"
)

# Output:
# ✅ TRUSTTRADE — DEAL COMPLETE!
# Supplier:   Mohanty, Purohit and Ravel
# Trust:      97.2/100 | 🟢 LOW RISK
# Price:      ₹376.75/unit (4% discount saved)
# Delivery:   1 day via Rail
# Total:      ₹2,31,995.50
# Escrow:     ₹69,598.65 locked on blockchain
# Time:       0.08 seconds | Confidence: 97%
```

---

## 📈 Key Features

### 🔍 GenAI Supplier Discovery
Natural language procurement queries processed by Gemini AI:
```
"Find verified organic cotton suppliers in Tamil Nadu 
 under ₹75/kg with 48hr delivery and 4+ rating"
```

### 🛡️ ML Risk Intelligence
- Random Forest classifier with **82% accuracy**
- Features: GST verification, delivery rate, credit score, fraud flags
- Real-time risk scoring for every supplier

### 💰 Autonomous Negotiation
- Reinforcement learning-inspired negotiation rounds
- **95% confidence threshold** before blockchain commitment
- Average **4-8% discount** achieved autonomously

### ⛓️ Blockchain Trust Layer
- Smart contract simulation on Polygon PoS
- 30% advance locked in escrow on signing
- 70% auto-released on GPS delivery confirmation

### 🔮 Demand Forecasting
- Gradient Boosting with **95.4% accuracy**
- 30-day ahead predictions with confidence bands
- Festival spike detection (Diwali, year-end)
- Weekly and seasonal pattern recognition

---

## 🌐 The Vision

```
2026 → MVP: 1,000 SMEs | ₹10Cr transactions
2027 → Scale: ONDC integration | 100,000 businesses  
2028 → Expand: Southeast Asia launch
2030 → Infrastructure: India's default B2B operating system
         $500B transactions | 10M businesses | 8 countries
```

> *"Like UPI revolutionized payments, TrustTrade aims to revolutionize B2B commerce for 63 million Indian SMEs."*

---

## 🔗 Connection to Academic Research

This project directly extends my **Final Year Project** at NIT Calicut:

> *"Decentralized Multi-Project Scheduling using Agent-Based Auction Mechanisms with NSGA-II and BF-SSGS"*

| FYP Concept | TrustTrade 2.0 Application |
|---|---|
| Decentralized multi-agent scheduling | Decentralized B2B procurement |
| Agents negotiate resources | Agents negotiate procurement deals |
| No central coordinator | No central marketplace owner |
| Conflict resolution algorithms | Smart contract dispute resolution |
| Optimization (NSGA-II) | ML-powered price optimization |

---

## 👩‍💻 About the Developer

**Anaswara R.**
B.Tech Computer Science & Engineering | NIT Calicut (2026)

- 🔬 Research: Multi-agent systems, decentralized AI, blockchain
- 💡 Interests: Applied AI/ML, GenAI, supply chain technology
- 🌐 GitHub: [@anaswara1000](https://github.com/anaswara1000)

---

## 📄 License

MIT License — feel free to use, modify, and build on this work.

---

*Built with ❤️ to solve a real problem for 63 million Indian businesses.*
