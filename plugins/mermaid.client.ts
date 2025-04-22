import mermaid from 'mermaid'
import { primary, zinc } from '~/utils/colors'

export default defineNuxtPlugin(() => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    securityLevel: 'loose',
    fontFamily: 'Lato, sans-serif',
    themeVariables: {
      // Theme Variables (General)
      darkMode: true,
      background: 'transparent',
      fontFamily: 'Lato, sans-serif',
      fontSize: '16px',
      primaryColor: primary[500],
      primaryTextColor: zinc[100],
      primaryBorderColor: 'transparent',
      secondaryColor: zinc[500],
      secondaryBorderColor: 'transparent',
      secondaryTextColor: zinc[400],
      tertiaryColor: primary[400],
      tertiaryBorderColor: 'transparent',
      tertiaryTextColor: zinc[400],
      lineColor: zinc[800],
      textColor: zinc[400],
      mainBkg: zinc[500],

      // Notes
      noteBkgColor: zinc[700],
      noteTextColor: zinc[400],
      noteBorderColor: 'transparent',

      // Error Messages
      errorBkgColor: primary[400],
      errorTextColor: zinc[950],

      // Flowchart Specific
      nodeBorder: 'transparent',
      nodeBkg: zinc[500],
      clusterBkg: 'transparent',
      clusterBorder: 'transparent',
      defaultLinkColor: zinc[500],
      titleColor: zinc[400],
      edgeLabelBackground: zinc[900],
      nodeTextColor: zinc[400],

      // Sequence Diagram Specific
      actorBkg: zinc[800],
      actorBorder: 'transparent',
      actorTextColor: zinc[400],
      actorLineColor: 'transparent',
      signalColor: zinc[400],
      signalTextColor: zinc[400],
      labelBoxBkgColor: zinc[700],
      labelBoxBorderColor: 'transparent',
      labelTextColor: zinc[400],
      loopTextColor: zinc[400],
      activationBorderColor: 'transparent',
      activationBkgColor: primary[500],
      sequenceNumberColor: zinc[400],

      // Pie Diagram Variables (Commented out - not used yet)
      // pie1: primary[500],
      // pie2: zinc[500],
      // pie3: primary[400],
      // pie4: primary[300],
      // pie5: zinc[400],
      // pie6: primary[600],
      // pie7: primary[700],
      // pie8: zinc[300],
      // pie9: primary[800],
      // pie10: primary[200],
      // pie11: zinc[600],
      // pie12: primary[900],
      // pieTitleTextSize: '25px',
      // pieTitleTextColor: zinc[300],
      // pieSectionTextSize: '17px',
      // pieSectionTextColor: zinc[400],
      // pieLegendTextSize: '17px',
      // pieLegendTextColor: zinc[300],
      // pieStrokeColor: zinc[800],
      // pieStrokeWidth: '2px',
      // pieOuterStrokeWidth: '2px',
      // pieOuterStrokeColor: zinc[800],
      // pieOpacity: 0.7,

      // State Colors (Commented out - not used yet)
      // labelColor: zinc[100],
      // altBackground: primary[400],

      // Class Colors (Commented out - not used yet)
      // classText: zinc[400],

      // User Journey Colors (Commented out - not used yet)
      // fillType0: primary[500],
      // fillType1: zinc[500],
      // fillType2: primary[400],
      // fillType3: zinc[400],
      // fillType4: primary[300],
      // fillType5: zinc[300],
      // fillType6: primary[600],
      // fillType7: zinc[600]
    }
  })

  // Add custom CSS to style the Capacitor participant with primary color
  if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = `

      rect.actor {
        fill: ${zinc[400]} !important;
        stroke: none !important;
      }

      line.actor-line {
        stroke: ${zinc[700]} !important;
      }

      /* Style Capacitor nodes in sequence diagrams */
      [id*="actor-FLUX"] rect,
      [id*="actor-Capacitor"] rect,
      [id*="actor-capacitor"] rect {
        fill: ${primary[500]} !important;
      }

      .nodeLabel p {
        color: ${primary[600]} !important;
      }

      /* Increase contrast for edge labels */
      .edgeLabel p {
        color: ${zinc[400]} !important;
        background-color: ${zinc[900]} !important;
      }

      .default.node p {
        color: ${primary[800]} !important;
      }

      .default.node rect.basic.label-container {
        fill: ${zinc[400]} !important;
        color: ${zinc[900]} !important;
        border: none !important;
        stroke: none !important;
      }

      /* Override default node styling for all nodes first */
      .default.node .nodeLabel p {
        color: ${zinc[900]} !important;
      }

      /* Ensure all text in diagram is visible but not too bright */
      .messageText, .loopText, .labelText, .noteText {
        fill: ${zinc[400]} !important;
        color: ${zinc[400]} !important;
      }

      /* Special styling for text in product nodes */
      [id*="actor-DCP"] .actor,
      [id*="flowchart-DCP"] {
        fill: ${primary[500]} !important;
      }

      /* FLUX node styling in flowcharts - more specific to override other styles */
      [id*="flowchart-FLUX"] rect.basic.label-container,
      [id*="flowchart-Capacitor"] rect.basic.label-container,
      g[id*="flowchart-FLUX"] rect,
      g[id*="flowchart-Capacitor"] rect {
        fill: ${primary[500]} !important;
        stroke: none !important;
        border: none !important;
      }

      /* Make text in FLUX nodes white - more specific to override other styles */
      [id*="flowchart-FLUX"] .nodeLabel span,
      [id*="flowchart-FLUX"] .nodeLabel p,
      [id*="flowchart-Capacitor"] .nodeLabel span,
      [id*="flowchart-Capacitor"] .nodeLabel p,
      g[id*="flowchart-FLUX"] .nodeLabel span,
      g[id*="flowchart-FLUX"] .nodeLabel p {
        color: ${zinc[100]} !important;
        fill: ${zinc[100]} !important;
      }

      /* Direct fix for the specific node structure mentioned by user */
      g.node[id*="flowchart-FLUX"] rect.basic.label-container {
        fill: ${primary[500]} !important;
        stroke: none !important;
        border: none !important;
      }

      g.node[id*="flowchart-FLUX"] .nodeLabel span.nodeLabel,
      g.node[id*="flowchart-FLUX"] .nodeLabel div,
      g.node[id*="flowchart-FLUX"] .nodeLabel p {
        color: ${zinc[100]} !important;
        fill: ${zinc[100]} !important;
      }

      /* Extremely specific fix targeting the exact structure in user's example */
      g.default.node[id="flowchart-FLUX-1"] rect.basic.label-container {
        fill: ${primary[500]} !important;
        stroke: none !important;
      }

      g.default.node[id="flowchart-FLUX-1"] g.label foreignObject div span.nodeLabel p {
        color: ${zinc[100]} !important;
      }

      /* Set diagram background to match site */
      .mermaid {
        background-color: ${zinc[900]} !important;
      }

      /* Force subgraph/cluster backgrounds to be transparent */
      .cluster rect {
        fill: transparent !important;
        stroke: ${zinc[600]} !important;
      }

      /* Add rounded corners to all nodes */
      .node rect,
      rect.basic.label-container,
      .actor {
        rx: 4px !important;
        ry: 4px !important;
      }

      /* Add rounded corners to notes */
      .note {
        rx: 4px !important;
        ry: 4px !important;
      }

      /* Direct targeting of FLUX elements */
      rect.actor-top[name="FLUX"],
      rect.actor-bottom[name="FLUX"] {
        fill: ${primary[500]} !important;
        stroke: none !important;
      }

      line.actor-line[name="FLUX"] {
        stroke: ${primary[500]} !important;
      }

      /* Target text elements specifically for FLUX entities */
      rect.actor-top[name="FLUX"] + text.actor-box,
      rect.actor-top[name="FLUX"] ~ text.actor-box,
      rect.actor-bottom[name="FLUX"] + text.actor-box,
      rect.actor-bottom[name="FLUX"] ~ text.actor-box {
        fill: ${zinc[100]} !important;
      }

      /* Target tspan elements inside FLUX text */
      rect.actor-top[name="FLUX"] + text.actor-box tspan,
      rect.actor-top[name="FLUX"] ~ text.actor-box tspan,
      rect.actor-bottom[name="FLUX"] + text.actor-box tspan,
      rect.actor-bottom[name="FLUX"] ~ text.actor-box tspan {
        fill: ${zinc[100]} !important;
      }

      /* Specific targeting for text containing "Capacitor" */
      text.actor-box:has(> tspan:contains("Capacitor")) {
        fill: ${zinc[100]} !important;
      }
    `
    document.head.appendChild(style)
  }
})
