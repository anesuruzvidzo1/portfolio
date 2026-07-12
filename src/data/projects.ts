// Single source of truth for every project on the site.
// Cards and the filter both read from this list. Order matters:
// the first three lead the grid. Right now that is Argus, FlareIQ, BasinIQ
// because all three are instantly viewable (no login wall). Lumin and Munda
// currently redirect to /login, so they sit lower until they get public
// landing pages. Once Lumin has a landing page, promote it back above BasinIQ
// to restore the neutral (non-energy) balance in the first row.

export type Capability =
  | "LLM & Agents"
  | "ML & Data"
  | "Optimization"
  | "Full-Stack";

// Case-study content. Shaped around the entrepreneur lens (Chris Conway's
// "big one"): open with the problem and what it costs someone, then how it
// was built, then the outcome and its value.
export interface CaseStudy {
  problem: string; // the business pain and its cost, who feels it
  build: string[]; // key technical decisions and how it was built
  outcome: string; // the result and its value
}

export interface Project {
  id: string;
  title: string;
  capability: Capability;
  energy: boolean; // surfaced by the "Energy" filter
  metric: string; // short, concrete headline claim
  description: string; // one line
  stack: string[];
  live: string;
  github: string;
  featured?: boolean; // featured projects lead the grid (first row)
  caseStudy?: CaseStudy; // a project only gets a /work/<id> page once this exists
}

export const projects: Project[] = [
  {
    id: "argus",
    title: "Argus",
    capability: "LLM & Agents",
    energy: false,
    featured: true,
    metric: "86% cost cut",
    description:
      "A wrapper for the raw Anthropic SDK that logs every tool call, cost, and error, with a live dashboard for multi turn agent sessions. One caching fix cut token cost 86%.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "SSE", "Docker"],
    live: "https://argus-dashboard-phi.vercel.app",
    github: "https://github.com/anesuruzvidzo1/argus",
    caseStudy: {
      problem:
        "Anyone building AI agents on the raw Anthropic SDK hits the same blind spot: once an agent is running in production, it is hard to see what it is doing, what each session actually costs, or why a call failed. Generic tools like Grafana and Sentry were not built for multi turn agent traces, and the AI native tools mostly assume you are on LangChain. If you call the SDK directly, you are flying blind, and unmonitored token spend is the kind of cost that quietly balloons before anyone notices.",
      build: [
        "Wrote a thin wrapper around the Anthropic SDK that drops in for the normal client with no code rewrite, capturing every tool call: input and output tokens, latency, whether it succeeded, and the arguments passed.",
        "Rolled cost up per session, so you can answer what an entire conversation cost across every call instead of guessing from single requests.",
        "Streamed traces to a live dashboard over server sent events, backed by FastAPI, PostgreSQL and Redis, and made the whole stack run locally with one Docker Compose command.",
        "Classified errors by tool and latency, so a failed call shows what it cost and exactly where it broke.",
      ],
      outcome:
        "Running Argus against my own agents, I found the system prompt was being resent on every turn. One caching change cut token cost by 86%, from 2,693 tokens to 366. That is the whole point of the tool: you cannot cut a cost you cannot see.",
    },
  },
  {
    id: "flareiq",
    title: "FlareIQ",
    capability: "ML & Data",
    energy: true,
    featured: true,
    metric: "782,897 records",
    description:
      "Province wide flare and vent intelligence over Petrinex data. Scores anomalies against AER Directive 060 with an isolation forest and maps every operator in Alberta.",
    stack: ["Python", "Isolation Forest", "Next.js", "Leaflet", "ETL"],
    live: "https://flareiq-vert.vercel.app",
    github: "https://github.com/anesuruzvidzo1/flareiq",
    caseStudy: {
      problem:
        "Alberta publishes flaring and venting volumes for every facility in the province, but the data sits in dozens of monthly Petrinex files that almost nobody opens. So the people who should be able to answer simple questions, who is flaring the most, where are the anomalies, is methane going up or down, cannot answer them without serious data work. Flared and vented gas is wasted product and a climate and regulatory liability, and you cannot manage what you cannot see across a whole province.",
      build: [
        "Built an ETL pipeline that parses 53 monthly Petrinex files into 782,897 facility months of clean, queryable records.",
        "Scored anomalies three ways: against AER Directive 060 thresholds, with a methane weighted CO2e number so venting is not treated the same as flaring, and with an isolation forest plus temporal spike detection to catch cases a fixed threshold misses.",
        "Converted Alberta Township System land descriptions into latitude and longitude so every facility could be placed on a map.",
        "Rendered the whole province as an interactive Next.js and Leaflet map, so an operator or a regulator can find any site and see its history.",
      ],
      outcome:
        "The data showed flaring up about 13% and venting down about 33% since 2022, which lines up with the shift in methane policy. More to the point, anyone can now open the map and read the province at a glance instead of parsing raw government files.",
    },
  },
  {
    id: "basiniq",
    title: "BasinIQ",
    capability: "LLM & Agents",
    energy: true,
    metric: "Grounded hybrid RAG",
    description:
      "Ask questions across 8 AER directives and 200 wells. Hybrid retrieval with a cross encoder reranker grounds every answer in cited source passages.",
    stack: ["FastAPI", "pgvector", "Cross encoder", "Claude tool use", "Next.js"],
    live: "https://basiniq-sigma.vercel.app",
    github: "https://github.com/anesuruzvidzo1/basiniq",
    caseStudy: {
      problem:
        "Energy companies live under the AER's directives, hundreds of pages of dense regulatory text. When an engineer needs to answer a compliance question, say the emergency planning requirements for a facility with H2S potential, they dig through PDFs by hand, and getting it wrong carries real regulatory cost. General purpose chatbots make this worse, because they answer confidently without saying where the answer came from.",
      build: [
        "Indexed 8 AER directives and a set of well records, then answered questions with hybrid retrieval: dense vector search with pgvector alongside keyword search, merged and then reranked by a cross encoder for precision.",
        "Wired it into a Claude tool use loop with two tools, one that runs SQL over the well data and one that searches the documents, so the model picks the right source for each question.",
        "Grounded every answer in cited source passages, so a user can check the directive text themselves instead of trusting the model.",
        "Streamed responses over server sent events and kept session history server side for multi turn context.",
      ],
      outcome:
        "When Elasticsearch fell over in production, I found the cross encoder reranker was doing most of the work and vector only retrieval held its accuracy. The lesson stuck: for grounded answers, the reranker mattered more than the second index.",
    },
  },
  {
    id: "lumin",
    title: "Lumin",
    capability: "Full-Stack",
    energy: false,
    featured: true,
    metric: "Ask your data anything",
    description:
      "Upload a CSV and ask questions in plain English. Lumin answers with auto generated charts, flags anomalies in numeric columns, and exports the findings.",
    stack: ["Next.js", "TypeScript", "Claude API", "Supabase", "Vega-Lite"],
    live: "https://lumin-tau.vercel.app",
    github: "https://github.com/anesuruzvidzo1/lumin",
    caseStudy: {
      problem:
        "Most small companies cannot justify a full time data analyst, so their data just sits there. When I looked into it around Cleveland, more than 60% of the companies I checked were doing their analysis by hand or not at all. The gap is not the data, it is that reading it takes a skill and a salary they do not have.",
      build: [
        "Let a user upload a CSV, JSON or text file and ask questions in plain English, with Claude doing the analysis underneath.",
        "Generated charts automatically with Vega-Lite when a picture answered the question better than text, and flagged anomalies in numeric columns.",
        "Added the things that make it usable day to day: pinning key insights, exporting findings to PDF, and a weekly email digest.",
        "Built the whole product on Next.js and Supabase with real auth and storage, not a throwaway demo.",
      ],
      outcome:
        "Lumin turns a raw file into plain English answers and charts in a couple of questions, which is the work a small business would otherwise pay an analyst for.",
    },
  },
  {
    id: "closureiq",
    title: "ClosureIQ",
    capability: "Optimization",
    energy: true,
    metric: "OR-Tools optimizer",
    description:
      "Picks which inactive wells an operator should close to hit its regulatory quota at lowest cost, using constraint optimization against a live budget slider.",
    stack: ["Python", "OR-Tools", "FastAPI", "Leaflet", "Next.js"],
    live: "https://closureiq.vercel.app",
    github: "https://github.com/anesuruzvidzo1/closureiq",
    caseStudy: {
      problem:
        "In 2025 and 2026 the AER overhauled how it manages well closure. Under Directive 088 every operator now gets a share of a mandatory industry closure quota, against a backdrop of roughly 78,000 inactive wells and tens of billions in cleanup liability. The hard question for each operator is which wells to close this year to hit the quota at the lowest cost, and most teams answer it in spreadsheets.",
      build: [
        "Parsed the public ST37 well list and the inactive well list into a database, which also produces a ranked list of operators by inactive count.",
        "Attached closure cost estimates built from published AER liability values, always labeled as estimates, because the real financial numbers are confidential and I would not claim precision the public data cannot support.",
        "Built the core as a Google OR-Tools constraint optimizer that picks the lowest cost set of wells to meet a quota and budget, using a fixed charge area batching model that provably beats a naive priority sort.",
        "Put it behind a live dashboard with a budget slider that compares the optimized plan against the naive baseline, with obligations cited to the directive text.",
      ],
      outcome:
        "The optimizer consistently beats the sort by priority approach most teams default to, and being upfront that the costs are estimates is a feature, not a weakness, because it is exactly the line a regulator or operator checks first.",
    },
  },
  {
    id: "munda",
    title: "Munda",
    capability: "Full-Stack",
    energy: false,
    metric: "AI crop advisory",
    description:
      "An AI crop advisory built for Zimbabwean smallholder farmers, turning local growing conditions into plain language guidance a farmer can act on.",
    stack: ["Next.js", "TypeScript", "Claude API", "Supabase"],
    live: "https://munda-eight.vercel.app",
    github: "https://github.com/anesuruzvidzo1/munda",
    caseStudy: {
      problem:
        "Smallholder farmers in Zimbabwe make the decisions that determine their harvest, when to plant, when to harvest, what disease to watch for, largely on their own. The agricultural extension officers who are supposed to advise them are stretched thin, so timing mistakes that cost a whole season are common. The advice exists, it just does not reach the person in the field.",
      build: [
        "Built an advisory that turns local growing conditions into plain language guidance a farmer can act on, rather than generic tips.",
        "Named it Munda, the Shona word for farm, and shaped it around the reality of the user, who often has limited connectivity and is not a data person.",
        "Used Claude underneath so a farmer can ask in plain language and get an answer that fits their crop and their situation.",
      ],
      outcome:
        "Munda puts the kind of guidance a scarce extension officer would give into the farmer's hands directly, which is the difference between a good season and a lost one.",
    },
  },
];
